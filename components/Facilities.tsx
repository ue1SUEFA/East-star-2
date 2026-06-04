import type { Dictionary } from "@/lib/dictionaries";

export function Facilities({ d }: { d: Dictionary }) {
  return (
    <section
      id="facilities"
      className="relative overflow-hidden bg-brand-700 py-20 text-white"
    >
      {/* Crimson hairline top — echoes the inner ring on the logo */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-accent-700" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-300">
            {d.facilities.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {d.facilities.title}
          </h2>
          <div className="mx-auto mt-5 h-[2px] w-16 bg-accent-500" />
        </div>

        <ul className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
          {d.facilities.items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
            >
              <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent-700 text-white shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </span>
              <span className="text-sm font-medium text-white/95">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
