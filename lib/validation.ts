// Accepts +998 followed by 9 digits, with optional spaces / dashes / parens.
// Examples that pass:
//   +998901234567
//   +998 90 123 45 67
//   +998-90-123-45-67
//   +998 (90) 123-45-67
const PHONE_RE = /^\+998[\s\-()]*\d[\s\-()]*\d[\s\-()]*\d[\s\-()]*\d[\s\-()]*\d[\s\-()]*\d[\s\-()]*\d[\s\-()]*\d[\s\-()]*\d$/;

export function normalizePhone(raw: string): string {
  return raw.replace(/[\s\-()]/g, "");
}

export function isValidUzPhone(raw: string): boolean {
  const trimmed = raw.trim();
  if (!PHONE_RE.test(trimmed)) return false;
  return normalizePhone(trimmed).length === 13; // +998 + 9 digits
}

export function isValidName(raw: string): boolean {
  const t = raw.trim();
  return t.length >= 2 && t.length <= 80;
}

// Live input mask: takes whatever the user typed/pasted and reformats it to
// "+998 XX XXX XX XX". Strips all non-digits, handles a leading "998" or "+998"
// prefix from paste, and caps the local part at 9 digits.
export function formatUzPhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");

  // Strip "+998" / "998" country prefix if present.
  if (digits.startsWith("998")) {
    digits = digits.slice(3);
  } else if (digits.length > 9) {
    // Paste of something longer (e.g. "8 90 ..." or noise) — keep the last 9.
    digits = digits.slice(-9);
  }
  digits = digits.slice(0, 9);

  if (digits.length === 0) return "+998 ";

  let out = "+998 " + digits.slice(0, 2);
  if (digits.length > 2) out += " " + digits.slice(2, 5);
  if (digits.length > 5) out += " " + digits.slice(5, 7);
  if (digits.length > 7) out += " " + digits.slice(7, 9);
  return out;
}
