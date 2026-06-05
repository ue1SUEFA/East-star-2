import { NextResponse } from "next/server";
import { isValidName, isValidUzPhone, normalizePhone } from "@/lib/validation";
import { sendLeadToCapi } from "@/lib/meta-capi";

export const runtime = "nodejs";

// Simple in-memory rate limit: max 5 submissions per IP per 10 minutes.
// Good enough for a low-traffic landing page. For production scale, swap in
// Upstash Redis or similar.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX_PER_WINDOW) return false;
  arr.push(now);
  hits.set(ip, arr);
  return true;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function getCookie(req: Request, name: string): string | undefined {
  const header = req.headers.get("cookie");
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    if (part.slice(0, eq).trim() === name) {
      return decodeURIComponent(part.slice(eq + 1).trim());
    }
  }
  return undefined;
}

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("[lead] missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID env");
    return NextResponse.json(
      { ok: false, error: "Server not configured" },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const { name, phone, grade, district, website, eventId } = (body ?? {}) as {
    name?: unknown;
    phone?: unknown;
    grade?: unknown;
    district?: unknown;
    website?: unknown;
    eventId?: unknown;
  };

  // Honeypot: real humans never fill this hidden field. Pretend success so bots
  // don't learn it failed.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (typeof name !== "string" || typeof phone !== "string") {
    return NextResponse.json(
      { ok: false, error: "Missing fields" },
      { status: 400 },
    );
  }

  if (!isValidName(name) || !isValidUzPhone(phone)) {
    return NextResponse.json(
      { ok: false, error: "Validation failed" },
      { status: 400 },
    );
  }

  if (
    typeof grade !== "number" ||
    !Number.isInteger(grade) ||
    grade < 0 ||
    grade > 11
  ) {
    return NextResponse.json(
      { ok: false, error: "Invalid grade" },
      { status: 400 },
    );
  }

  // Geo confirmation — required gate, must be explicitly true.
  if (district !== true) {
    return NextResponse.json(
      { ok: false, error: "District not confirmed" },
      { status: 400 },
    );
  }

  const ip = getIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429 },
    );
  }

  const safeName = escapeHtml(name.trim()).slice(0, 80);
  const safePhone = escapeHtml(normalizePhone(phone));
  const ts = new Date().toLocaleString("ru-RU", {
    timeZone: "Asia/Tashkent",
  });

  const gradeLabel = grade === 0 ? "0 (дошкольный)" : String(grade);

  const text =
    `<b>🎓 East Star – новая заявка</b>\n\n` +
    `<b>Имя:</b> ${safeName}\n` +
    `<b>Телефон:</b> <a href="tel:${safePhone}">${safePhone}</a>\n` +
    `<b>Класс:</b> ${gradeLabel}\n` +
    `<b>Район:</b> Ташкент (Сергели / Янгихаёт) ✅\n` +
    `<b>Время (Ташкент):</b> ${ts}`;

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );

    if (!tgRes.ok) {
      const errText = await tgRes.text();
      console.error("[lead] telegram error:", tgRes.status, errText);
      return NextResponse.json(
        { ok: false, error: "Telegram delivery failed" },
        { status: 502 },
      );
    }

    // Mirror the browser pixel "Lead" event server-side (Conversions API).
    // Best-effort: a CAPI failure must not affect the lead the school receives.
    // Shares `eventId` with the browser event so Meta deduplicates the pair.
    const capi = await sendLeadToCapi({
      eventId:
        typeof eventId === "string" && eventId ? eventId : crypto.randomUUID(),
      phone: normalizePhone(phone),
      name: name.trim(),
      grade,
      ip: ip !== "unknown" ? ip : undefined,
      userAgent: req.headers.get("user-agent") ?? undefined,
      fbp: getCookie(req, "_fbp"),
      fbc: getCookie(req, "_fbc"),
      eventSourceUrl: req.headers.get("referer") ?? undefined,
    });
    if ("ok" in capi && capi.ok === false) {
      console.error("[lead] CAPI error:", capi.status, capi.error);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] fetch error:", err);
    return NextResponse.json(
      { ok: false, error: "Network error" },
      { status: 500 },
    );
  }
}
