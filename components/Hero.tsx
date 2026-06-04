import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";

export function Hero({ d }: { d: Dictionary }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-cream-50 to-white"
    >
      {/* Subtle navy radial glow behind the visual */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-brand-700/5 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-700/20 bg-accent-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-700">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-700" />
              {d.hero.badge}
            </span>
            <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-brand-700 sm:text-4xl lg:text-5xl">
              {d.hero.title}
            </h1>
            <div className="mt-4 h-[2px] w-20 bg-accent-700" />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-700">
              {d.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#apply"
                className="rounded-full bg-brand-700 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-brand-800"
              >
                {d.hero.ctaPrimary}
              </a>
              <a
                href="#about"
                className="rounded-full border border-brand-700/30 bg-white px-6 py-3 text-base font-semibold text-brand-700 transition hover:bg-brand-50"
              >
                {d.hero.ctaSecondary}
              </a>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {d.hero.stats.map((s) => {
                // Numeric values keep the big display size for impact;
                // text values (e.g. "Waldorf") shrink so they fit the card.
                const isNumeric = /^\d/.test(s.value);
                return (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-slate-200 bg-white p-4 text-center"
                  >
                    <dt
                      className={
                        "font-display font-semibold leading-none text-brand-700 " +
                        (isNumeric ? "text-3xl" : "text-xl")
                      }
                    >
                      {s.value}
                    </dt>
                    <dd className="mt-1 text-xs font-medium leading-tight text-ink-500">
                      {s.label}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          {/* Visual: the navy badge with the white star — clean and iconic */}
          <div className="relative flex items-center justify-center">
            <div className="relative aspect-square w-full max-w-md">
              {/* Soft navy glow behind the badge */}
              <div
                aria-hidden="true"
                className="absolute inset-4 rounded-full bg-brand-700/15 blur-2xl"
              />
              <div className="relative h-full w-full">
                <Image
                  src="/logos/badge.png"
                  alt="East Star Private School"
                  fill
                  priority
                  sizes="(min-width: 1024px) 440px, 80vw"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-2 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:block">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-accent-700">
                est. 2025
              </div>
              <div className="mt-1 font-display text-sm font-semibold text-brand-700">
                {d.hero.tagline}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
