import Image from "next/image";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { PhoneDropdown } from "./PhoneDropdown";
import { ApplyButton } from "./ApplyModal";
import type { Dictionary, Locale } from "@/lib/dictionaries";

// Quick-action icon buttons in the navbar right side:
// - Telegram (direct link)
// - Phone (opens a dropdown with the school's numbers)
function ContactIconButtons({ d }: { d: Dictionary }) {
  const tgHref = d.contact.telegram;

  const tgButton = (
    <a
      href={tgHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Telegram"
      title="Telegram"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-white shadow-sm transition hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-brand-200"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 -translate-x-px"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M21.5 2.5L1.5 10.5l6 2.3 2.3 7 4-4.5 6.5 5L21.5 2.5zM17.2 7.8l-6.7 6.2-2.1-.8 9.2-7.3-.4 1.9z" />
      </svg>
    </a>
  );

  return (
    <div className="flex items-center gap-2">
      {tgHref ? tgButton : null}
      <PhoneDropdown phones={d.contact.phones} />
    </div>
  );
}

export function Navbar({ d, locale }: { d: Dictionary; locale: Locale }) {
  const links = [
    { href: "#about", label: d.nav.about },
    { href: "#programs", label: d.nav.programs },
    { href: "#why", label: d.nav.whyUs },
    { href: "#facilities", label: d.nav.facilities },
    { href: "#contact", label: d.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" className="flex items-center gap-2">
          {/* Circular badge PNG (transparent corners) — sits edge-to-edge. */}
          <span className="relative inline-flex h-11 w-11 flex-shrink-0 items-center justify-center self-center">
            <Image
              src="/logos/badge.png"
              alt="East Star"
              width={56}
              height={56}
              priority
              className="h-full w-full object-contain"
            />
          </span>
          <span className="flex flex-col self-center leading-none">
            <span className="font-display text-xl font-semibold tracking-wide text-brand-700">
              EAST STAR
            </span>
            <span className="-mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-700/80">
              Private School
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-ink-700 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap transition hover:text-accent-700"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher current={locale} />
          <ContactIconButtons d={d} />
          <ApplyButton className="hidden h-9 items-center whitespace-nowrap rounded-full bg-brand-700 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800 sm:inline-flex">
            {d.nav.cta}
          </ApplyButton>
        </div>
      </div>
    </header>
  );
}
