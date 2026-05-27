import type { Dictionary } from "@/lib/dictionaries";

const ICONS = [
  // small classes
  "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-.97 0-1.82.47-2.36 1.18a4.96 4.96 0 010 5.64A2.99 2.99 0 0016 11zm-8 0a3 3 0 100-6 3 3 0 000 6zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05A4.998 4.998 0 0117 16.5V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  // teachers / cap
  "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z",
  // english / globe
  "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 00-1.38-3.56A8.03 8.03 0 0118.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 015.08 16zm2.95-8H5.08a7.987 7.987 0 014.33-3.56A15.65 15.65 0 008.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 01-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z",
  // safety / shield
  "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z",
  // technology / chip
  "M7 5h10v14H7V5zm-2 4H3v2h2V9zm0 4H3v2h2v-2zm14-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 3h2v2H9V3zm4 0h2v2h-2V3zM9 19h2v2H9v-2zm4 0h2v2h-2v-2z",
  // chat / parents
  "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z",
];

export function WhyUs({ d }: { d: Dictionary }) {
  return (
    <section id="why" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-700">
            {d.whyUs.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand-700 sm:text-4xl">
            {d.whyUs.title}
          </h2>
          <div className="mx-auto mt-5 h-[2px] w-16 bg-accent-700" />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {d.whyUs.items.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-cream-50 p-6 transition hover:border-brand-700/30 hover:bg-white hover:shadow-md"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={ICONS[i % ICONS.length]} />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-brand-700">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-700">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
