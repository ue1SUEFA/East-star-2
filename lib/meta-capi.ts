import { createHash } from "node:crypto";

// Server-side Meta Conversions API (CAPI) sender.
//
// Mirrors the browser Pixel "Lead" event server-to-server so conversions that
// ad-blockers / iOS / network issues drop in the browser are still attributed.
// The browser event and this event share the same `eventId` → Meta deduplicates
// them, so a normal submit is counted exactly once.
//
// Configuration (env):
//   NEXT_PUBLIC_META_PIXEL_ID   — Pixel/dataset ID (already used by the browser pixel)
//   META_CAPI_ACCESS_TOKEN      — token from Events Manager → Settings → Conversions API
//   META_CAPI_TEST_EVENT_CODE   — (optional) shows the event in the "Test events" tab
//   META_GRAPH_VERSION          — (optional) Graph API version, defaults below
//
// If the token (or pixel id) is missing, sending is skipped silently — the rest
// of the lead flow is unaffected.

const DEFAULT_GRAPH_VERSION = "v21.0";

function sha256Hex(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

// Meta requires PII to be trimmed + lowercased before SHA-256 hashing.
function hashNormalized(value: string): string {
  return sha256Hex(value.trim().toLowerCase());
}

type MetaUserData = {
  ph?: string[];
  fn?: string[];
  client_ip_address?: string;
  client_user_agent?: string;
  fbp?: string;
  fbc?: string;
};

export type CapiLeadInput = {
  /** Shared with the browser pixel event for deduplication. */
  eventId: string;
  /** Raw/normalized phone; non-digits and the country "+" are stripped here. */
  phone: string;
  /** Visitor's first/full name — hashed, never sent in clear. */
  name?: string;
  /** Selected grade, forwarded as custom_data.klass for ad reporting. */
  grade?: number;
  ip?: string;
  userAgent?: string;
  /** _fbp cookie set by the browser pixel — strong match key, not hashed. */
  fbp?: string;
  /** _fbc cookie (click id) — strong match key, not hashed. */
  fbc?: string;
  /** Page URL the submit came from (referer). */
  eventSourceUrl?: string;
};

export type CapiResult =
  | { ok: true }
  | { skipped: true }
  | { ok: false; status: number; error: string };

export async function sendLeadToCapi(input: CapiLeadInput): Promise<CapiResult> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !token) return { skipped: true };

  const user_data: MetaUserData = {};

  // Phone: digits only, including country code, no "+" — then hashed.
  const phoneDigits = input.phone.replace(/\D/g, "");
  if (phoneDigits) user_data.ph = [sha256Hex(phoneDigits)];

  if (input.name && input.name.trim()) {
    // Use the first token of the name as first name for matching.
    const first = input.name.trim().split(/\s+/)[0]!;
    user_data.fn = [hashNormalized(first)];
  }
  if (input.ip) user_data.client_ip_address = input.ip;
  if (input.userAgent) user_data.client_user_agent = input.userAgent;
  if (input.fbp) user_data.fbp = input.fbp;
  if (input.fbc) user_data.fbc = input.fbc;

  const event: Record<string, unknown> = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: input.eventId,
    action_source: "website",
    user_data,
    custom_data: {
      content_name: "school_application",
      ...(typeof input.grade === "number" ? { klass: input.grade } : {}),
    },
  };
  if (input.eventSourceUrl) event.event_source_url = input.eventSourceUrl;

  const payload: Record<string, unknown> = { data: [event] };
  const testCode = process.env.META_CAPI_TEST_EVENT_CODE;
  if (testCode) payload.test_event_code = testCode;

  const version = process.env.META_GRAPH_VERSION || DEFAULT_GRAPH_VERSION;
  const url =
    `https://graph.facebook.com/${version}/${pixelId}/events` +
    `?access_token=${encodeURIComponent(token)}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, status: res.status, error: text.slice(0, 500) };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, status: 0, error: String(err) };
  }
}
