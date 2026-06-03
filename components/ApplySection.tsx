import type { Dictionary, Locale } from "@/lib/dictionaries";
import { LeadForm } from "./LeadForm";

export function ApplySection({
  d,
  locale,
}: {
  d: Dictionary;
  locale: Locale;
}) {
  return (
    <section
      id="apply"
      className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 py-20"
    >
      {/* Crimson hairline */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-accent-700" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:items-center">
        <div className="text-white">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-300">
            {d.form.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {d.form.title}
          </h2>
          <div className="mt-5 h-[2px] w-16 bg-accent-500" />
          <p className="mt-7 max-w-lg text-base leading-relaxed text-white/85">
            {d.form.subtitle}
          </p>

          <ul className="mt-8 space-y-3 text-sm text-white/90">
            {d.contact.phones.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-700 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </span>
                <a
                  href={`tel:${p.replace(/\s/g, "")}`}
                  className="transition hover:text-accent-300"
                >
                  {p}
                </a>
              </li>
            ))}
            <li className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent-700 text-white">
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </span>
              <span>{d.contact.hours}</span>
            </li>
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white p-6 shadow-2xl sm:p-8">
          <LeadForm d={d} locale={locale} />
        </div>
      </div>
    </section>
  );
}
