import type { Dictionary } from "@/lib/dictionaries";

const ICON = {
  pin: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z",
  phone:
    "M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 00-1.02.24l-2.2 2.2a15.05 15.05 0 01-6.59-6.58l2.2-2.21a1 1 0 00.25-1A11.36 11.36 0 018.5 4a1 1 0 00-1-1H4a1 1 0 00-1 1c0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5a1 1 0 00-1-1z",
  mail: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  clock:
    "M12 2a10 10 0 100 20 10 10 0 000-20zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z",
};

function Icon({ d, className = "h-5 w-5" }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function telHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

const cardBase =
  "flex items-center gap-4 rounded-2xl border border-brand-700/10 bg-white p-5 transition hover:border-brand-700/30 hover:shadow-md";
const iconChip =
  "inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white shadow-sm";

export function Contact({ d }: { d: Dictionary }) {
  return (
    <section id="contact" className="bg-cream-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-700">
            {d.contact.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-brand-700 sm:text-4xl">
            {d.contact.title}
          </h2>
          <div className="mx-auto mt-5 h-[2px] w-16 bg-accent-700" />
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
          {/* Address */}
          <div className={cardBase}>
            <span className={iconChip}>
              <Icon d={ICON.pin} />
            </span>
            <div className="text-sm font-medium text-ink-900">
              {d.contact.address}
            </div>
          </div>

          {/* Phones — both numbers as clickable tel: links */}
          <div className={cardBase}>
            <span className={iconChip}>
              <Icon d={ICON.phone} />
            </span>
            <div className="flex flex-col gap-1 text-sm font-medium text-ink-900">
              {d.contact.phones.map((p) => (
                <a
                  key={p}
                  href={telHref(p)}
                  className="transition hover:text-accent-700"
                >
                  {p}
                </a>
              ))}
            </div>
          </div>

          {/* Email */}
          <div className={cardBase}>
            <span className={iconChip}>
              <Icon d={ICON.mail} />
            </span>
            <a
              href={`mailto:${d.contact.email}`}
              className="text-sm font-medium text-ink-900 transition hover:text-accent-700"
            >
              {d.contact.email}
            </a>
          </div>

          {/* Hours */}
          <div className={cardBase}>
            <span className={iconChip}>
              <Icon d={ICON.clock} />
            </span>
            <div className="text-sm font-medium text-ink-900">
              {d.contact.hours}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
