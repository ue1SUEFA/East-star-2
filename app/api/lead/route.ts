import { NextResponse } from "next/server";
import { isValidName, isValidUzPhone, normalizePhone } from "@/lib/validation";

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

  const { name, phone, grade, locale, website } = (body ?? {}) as {
    name?: unknown;
    phone?: unknown;
    grade?: unknown;
    locale?: unknown;
    website?: unknown;
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

  const ip = getIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429 },
    );
  }

  const safeName = escapeHtml(name.trim()).slice(0, 80);
  const safePhone = escapeHtml(normalizePhone(phone));
  const localeTag =
    typeof locale === "string" && /^[a-z]{2}$/.test(locale) ? locale : "uz";
  const ts = new Date().toLocaleString("ru-RU", {
    timeZone: "Asia/Tashkent",
  });

  const gradeLabel = grade === 0 ? "0 (дошкольный)" : String(grade);

  const text =
    `<b>🎓 East Star — новая заявка</b>\n\n` +
    `<b>Имя:</b> ${safeName}\n` +
    `<b>Телефон:</b> <a href="tel:${safePhone}">${safePhone}</a>\n` +
    `<b>Класс:</b> ${gradeLabel}\n` +
    `<b>Язык формы:</b> ${localeTag}\n` +
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] fetch error:", err);
    return NextResponse.json(
      { ok: false, error: "Network error" },
      { status: 500 },
    );
  }
}
