import type { Dictionary } from "@/lib/dictionaries";

export function About({ d }: { d: Dictionary }) {
  return (
    <section id="about" className="relative bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-700">
            {d.about.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand-700 sm:text-4xl">
            {d.about.title}
          </h2>
          <div className="mx-auto mt-5 h-[2px] w-16 bg-accent-700" />
          <div className="mt-7 space-y-4 text-base leading-relaxed text-ink-700">
            {d.about.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
