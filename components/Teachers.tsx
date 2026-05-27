import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";

export function Teachers({ d }: { d: Dictionary }) {
  return (
    <section
      id="teachers"
      className="relative overflow-hidden bg-brand-700 py-20 text-white"
    >
      {/* Decorative oversized seal in the corner — barely visible */}
      <Image
        src="/logos/badge-icon-navy.jpg"
        alt=""
        aria-hidden="true"
        width={360}
        height={360}
        className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 opacity-10"
      />
      {/* Crimson hairline top */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-accent-700" />

      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-300">
          {d.teachers.eyebrow}
        </span>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {d.teachers.title}
        </h2>
        <div className="mx-auto mt-5 h-[2px] w-16 bg-accent-500" />
        <p className="mt-7 text-base leading-relaxed text-white/85 sm:text-lg">
          {d.teachers.body}
        </p>
      </div>
    </section>
  );
}
