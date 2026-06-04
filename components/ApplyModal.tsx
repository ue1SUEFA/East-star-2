"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Dictionary, Locale } from "@/lib/dictionaries";
import { LeadForm } from "./LeadForm";

type Ctx = { open: () => void };
const ApplyModalContext = createContext<Ctx | null>(null);

export function useApplyModal(): Ctx {
  const ctx = useContext(ApplyModalContext);
  if (!ctx) {
    throw new Error("useApplyModal must be used within <ApplyModalProvider>");
  }
  return ctx;
}

/**
 * Wraps the page and renders a single shared "Ariza qoldirish" modal that any
 * <ApplyButton> can open. The LeadForm only mounts while the modal is open, so
 * each open starts with a fresh form.
 */
export function ApplyModalProvider({
  d,
  locale,
  children,
}: {
  d: Dictionary;
  locale: Locale;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    // Lock background scroll while the modal is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  return (
    <ApplyModalContext.Provider value={{ open }}>
      {children}
      {isOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={d.form.title}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition hover:bg-slate-100 hover:text-ink-900"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            </button>

            {d.form.eyebrow ? (
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-700">
                {d.form.eyebrow}
              </span>
            ) : null}
            <h2 className="mt-2 pr-10 font-display text-2xl font-semibold tracking-tight text-brand-700">
              {d.form.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              {d.form.subtitle}
            </p>

            <div className="mt-6">
              <LeadForm d={d} locale={locale} />
            </div>
          </div>
        </div>
      ) : null}
    </ApplyModalContext.Provider>
  );
}

/** A button that opens the shared apply modal. Pass through styling via className. */
export function ApplyButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { open } = useApplyModal();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
