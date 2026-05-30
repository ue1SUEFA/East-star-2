"use client";

import { useRef, useState } from "react";
import type { Dictionary, Locale } from "@/lib/dictionaries";
import { formatUzPhone, isValidName, isValidUzPhone } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function makeEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function LeadForm({ d, locale }: { d: Dictionary; locale: Locale }) {
  const t = d.form;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [grade, setGrade] = useState<string>("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    grade?: string;
  }>({});
  const [status, setStatus] = useState<Status>("idle");
  const phoneRef = useRef<HTMLInputElement | null>(null);

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(formatUzPhone(e.target.value));
  }

  function handlePhoneFocus(e: React.FocusEvent<HTMLInputElement>) {
    // If the field is empty / just the prefix, drop the cursor after "+998 ".
    if (!phone || phone === "+998 ") {
      requestAnimationFrame(() => {
        const el = phoneRef.current;
        if (el) el.setSelectionRange(el.value.length, el.value.length);
      });
    }
  }

  function handlePhoneKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // Prevent backspace from eating into the "+998 " prefix.
    if (e.key === "Backspace") {
      const el = e.currentTarget;
      const start = el.selectionStart ?? 0;
      const end = el.selectionEnd ?? 0;
      if (start <= 5 && end <= 5 && start === end) {
        e.preventDefault();
      }
    }
  }

  function validate(): boolean {
    const next: { name?: string; phone?: string; grade?: string } = {};
    if (!isValidName(name)) next.name = t.validation.nameRequired;
    if (!phone.trim()) {
      next.phone = t.validation.phoneRequired;
    } else if (!isValidUzPhone(phone)) {
      next.phone = t.validation.phoneInvalid;
    }
    const gradeNum = Number(grade);
    if (
      grade === "" ||
      !Number.isInteger(gradeNum) ||
      gradeNum < 0 ||
      gradeNum > 11
    ) {
      next.grade = t.validation.gradeRequired;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!validate()) return;

    setStatus("submitting");
    const eventId = makeEventId();
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          grade: Number(grade),
          locale,
          eventId, // shared with Meta Pixel below for CAPI dedup
          website, // honeypot — server discards if non-empty
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (typeof window !== "undefined" && typeof window.fbq === "function") {
        window.fbq("track", "Lead", { content_name: "school_application" }, {
          eventID: eventId,
        });
      }
      setStatus("success");
      setName("");
      setPhone("+998 ");
      setGrade("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-emerald-900">{t.successTitle}</h3>
        <p className="mt-2 text-sm text-emerald-800">{t.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {/* Honeypot — hidden from real users; bots that fill all fields will be filtered out */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label
          htmlFor="lead-name"
          className="mb-1.5 block text-sm font-semibold text-ink-900"
        >
          {t.nameLabel}
        </label>
        <input
          id="lead-name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          autoComplete="name"
          required
          className={
            "w-full rounded-xl border bg-white px-4 py-3 text-base text-ink-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200 " +
            (errors.name ? "border-accent-500" : "border-slate-300")
          }
        />
        {errors.name ? (
          <p className="mt-1 text-sm font-medium text-accent-700">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="lead-phone"
          className="mb-1.5 block text-sm font-semibold text-ink-900"
        >
          {t.phoneLabel}
        </label>
        <input
          id="lead-phone"
          name="phone"
          ref={phoneRef}
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          onFocus={handlePhoneFocus}
          onKeyDown={handlePhoneKeyDown}
          placeholder={t.phonePlaceholder}
          autoComplete="tel"
          inputMode="numeric"
          maxLength={17}
          required
          className={
            "w-full rounded-xl border bg-white px-4 py-3 text-base text-ink-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200 " +
            (errors.phone ? "border-accent-500" : "border-slate-300")
          }
        />
        {errors.phone ? (
          <p className="mt-1 text-sm font-medium text-accent-700">
            {errors.phone}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="lead-grade"
          className="mb-1.5 block text-sm font-semibold text-ink-900"
        >
          {t.gradeLabel}
        </label>
        <select
          id="lead-grade"
          name="grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
          className={
            "w-full rounded-xl border bg-white px-4 py-3 text-base text-ink-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200 " +
            (errors.grade ? "border-accent-500" : "border-slate-300")
          }
        >
          <option value="" disabled>
            {t.gradePlaceholder}
          </option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={String(i)}>
              {i === 0 ? t.gradeZero : String(i)}
            </option>
          ))}
        </select>
        {errors.grade ? (
          <p className="mt-1 text-sm font-medium text-accent-700">
            {errors.grade}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-xl bg-brand-700 px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? t.submitting : t.submit}
      </button>

      {status === "error" ? (
        <div className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-800">
          <strong className="font-semibold">{t.errorTitle}:</strong>{" "}
          {t.errorMessage}
        </div>
      ) : null}

      <p className="text-center text-xs text-ink-500">{t.privacy}</p>
    </form>
  );
}
