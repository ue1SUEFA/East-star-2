"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const GRADES = Array.from({ length: 12 }, (_, i) => i); // 0..11

type Props = {
  id?: string;
  /** id of the visible label element, wired via aria-labelledby. */
  labelId?: string;
  value: string; // "" | "0".."11"
  onChange: (v: string) => void;
  placeholder: string;
  zeroLabel: string;
  hasError?: boolean;
};

type Pos = { left: number; top: number; width: number; maxHeight: number };

/**
 * Custom grade dropdown. The option list is rendered in a portal with fixed
 * positioning so it always opens downward and paints above everything (footer,
 * modal, section `overflow-hidden`) instead of being clipped.
 */
export function GradeSelect({
  id,
  labelId,
  value,
  onChange,
  placeholder,
  zeroLabel,
  hasError,
}: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1); // highlighted index into GRADES
  const [pos, setPos] = useState<Pos | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const labelFor = (g: number) => (g === 0 ? zeroLabel : String(g));
  const selectedLabel = value === "" ? placeholder : labelFor(Number(value));

  // Position the portal list under the button; follow scroll/resize.
  useLayoutEffect(() => {
    if (!open) return;
    function update() {
      const el = buttonRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const gap = 8;
      const available = window.innerHeight - r.bottom - gap - 8;
      setPos({
        left: r.left,
        top: r.bottom + gap,
        width: r.width,
        maxHeight: Math.max(140, Math.min(256, available)),
      });
    }
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true); // capture: any ancestor scroll
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

  // Outside-click / Escape to close (button + portal list both count as inside).
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      const t = e.target as Node;
      const insideButton = buttonRef.current?.contains(t);
      const insideList = listRef.current?.contains(t);
      if (!insideButton && !insideList) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // On open, highlight the current selection (or the first item).
  useEffect(() => {
    if (!open) return;
    const idx = value === "" ? 0 : GRADES.indexOf(Number(value));
    setActive(idx < 0 ? 0 : idx);
  }, [open, value]);

  // Keep the highlighted item scrolled into view.
  useEffect(() => {
    if (!open || active < 0 || !listRef.current) return;
    const el = listRef.current.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function choose(g: number) {
    onChange(String(g));
    setOpen(false);
    buttonRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(GRADES.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (active >= 0) choose(GRADES[active]!);
    }
  }

  const list =
    open && pos && typeof document !== "undefined"
      ? createPortal(
          <ul
            ref={listRef}
            role="listbox"
            style={{
              position: "fixed",
              left: pos.left,
              top: pos.top,
              width: pos.width,
              maxHeight: pos.maxHeight,
            }}
            className="brand-scroll z-[200] overflow-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-xl"
          >
            {GRADES.map((g, i) => {
              const selected = String(g) === value;
              const isActive = i === active;
              return (
                <li
                  key={g}
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(g)}
                  className={
                    "cursor-pointer rounded-lg px-3 py-2 text-base transition " +
                    (selected
                      ? "bg-brand-700 text-white"
                      : isActive
                        ? "bg-cream-50 text-ink-900"
                        : "text-ink-900")
                  }
                >
                  {labelFor(g)}
                </li>
              );
            })}
          </ul>,
          document.body,
        )
      : null;

  return (
    <div>
      <button
        type="button"
        id={id}
        ref={buttonRef}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId ? `${labelId} ${id ?? ""}`.trim() : undefined}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className={
          "flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3 text-left text-base outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200 " +
          (hasError ? "border-accent-500 " : "border-slate-300 ") +
          (value === "" ? "text-ink-500" : "text-ink-900")
        }
      >
        <span>{selectedLabel}</span>
        <svg
          viewBox="0 0 24 24"
          className={
            "ml-2 h-5 w-5 flex-shrink-0 text-ink-500 transition-transform " +
            (open ? "rotate-180" : "")
          }
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {list}
    </div>
  );
}
