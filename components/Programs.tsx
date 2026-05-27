import type { Dictionary } from "@/lib/dictionaries";

export function Programs({ d }: { d: Dictionary }) {
  return (
    <section id="programs" className="bg-cream-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-700">
            {d.programs.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand-700 sm:text-4xl">
            {d.programs.title}
          </h2>
          <div className="mx-auto mt-5 h-[2px] w-16 bg-accent-700" />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {d.programs.items.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-brand-700/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-700/30 hover:shadow-lg"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-50 transition group-hover:bg-accent-50" />
              <div className="relative">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-700 font-display text-lg font-semibold text-white shadow-sm">
                  {i + 1}
                </div>
                <h3 className="font-display text-xl font-semibold text-brand-700">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
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
