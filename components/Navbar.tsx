import Image from "next/image";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Dictionary, Locale } from "@/lib/dictionaries";

export function Navbar({ d, locale }: { d: Dictionary; locale: Locale }) {
  const links = [
    { href: "#about", label: d.nav.about },
    { href: "#programs", label: d.nav.programs },
    { href: "#why", label: d.nav.whyUs },
    { href: "#teachers", label: d.nav.teachers },
    { href: "#facilities", label: d.nav.facilities },
    { href: "#contact", label: d.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" className="flex items-center gap-3">
          <Image
            src="/logos/badge-icon-navy.jpg"
            alt="East Star"
            width={44}
            height={44}
            priority
            className="h-11 w-11 rounded-full"
          />
          <span className="font-display text-xl font-semibold leading-none tracking-wide text-brand-700">
            EAST STAR
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm font-medium text-ink-700 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition hover:text-accent-700"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher current={locale} />
          <a
            href="#apply"
            className="hidden rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800 sm:inline-flex"
          >
            {d.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
