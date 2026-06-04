"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Single phone-icon button in the navbar. On click, opens a small dropdown
 * with each phone number as a clickable `tel:` link. Closes on outside-click
 * and Escape.
 */
export function PhoneDropdown({ phones }: { phones: readonly string[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Call"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-white shadow-sm transition hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-brand-200"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 00-1.02.24l-2.2 2.2a15.05 15.05 0 01-6.59-6.58l2.2-2.21a1 1 0 00.25-1A11.36 11.36 0 018.5 4a1 1 0 00-1-1H4a1 1 0 00-1 1c0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5a1 1 0 00-1-1z" />
        </svg>
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Phone numbers"
          className="absolute right-0 z-50 mt-2 min-w-[210px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
        >
          {phones.map((phone, i) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/\s/g, "")}`}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={
                "flex items-center gap-3 px-4 py-3 text-sm font-medium text-ink-900 transition hover:bg-cream-50 hover:text-accent-700 " +
                (i > 0 ? "border-t border-slate-100" : "")
              }
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 flex-shrink-0 text-brand-700"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 00-1.02.24l-2.2 2.2a15.05 15.05 0 01-6.59-6.58l2.2-2.21a1 1 0 00.25-1A11.36 11.36 0 018.5 4a1 1 0 00-1-1H4a1 1 0 00-1 1c0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5a1 1 0 00-1-1z" />
              </svg>
              {phone}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
