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
  const [toastShown, setToastShown] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // On a successful submit: close the modal and pop a success toast.
  const handleSuccess = useCallback(() => {
    setIsOpen(false);
    setToastShown(true);
  }, []);

  // Auto-dismiss the toast after a few seconds.
  useEffect(() => {
    if (!toastShown) return;
    const id = window.setTimeout(() => setToastShown(false), 5000);
    return () => window.clearTimeout(id);
  }, [toastShown]);

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
              <LeadForm d={d} locale={locale} onSuccess={handleSuccess} />
            </div>
          </div>
        </div>
      ) : null}

      {/* Success toast — shown after the modal closes on a successful submit. */}
      {toastShown ? (
        <div
          className="pointer-events-none fixed inset-x-0 top-5 z-[120] flex justify-center px-4"
          role="status"
          aria-live="polite"
        >
          <div className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border border-emerald-200 bg-white px-4 py-3.5 shadow-2xl">
            <span className="mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-emerald-900">
                {d.form.successTitle}
              </p>
              <p className="mt-0.5 text-sm text-emerald-800">
                {d.form.successMessage}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setToastShown(false)}
              aria-label="Close"
              className="-mr-1 -mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-ink-500 transition hover:bg-slate-100 hover:text-ink-900"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
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
