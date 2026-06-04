import Link from "next/link";
import { LOCALES, type Locale } from "@/lib/dictionaries";

const LABELS: Record<Locale, string> = {
  uz: "UZ",
  ru: "RU",
  en: "EN",
};

export function LanguageSwitcher({ current }: { current: Locale }) {
  return (
    <div className="inline-flex h-9 items-center gap-0.5 rounded-full border border-slate-200 bg-white px-1 text-xs font-semibold">
      {LOCALES.map((loc) => {
        const active = loc === current;
        return (
          <Link
            key={loc}
            href={`/${loc}`}
            className={
              "inline-flex h-7 items-center justify-center leading-none rounded-full px-2.5 transition " +
              (active
                ? "bg-brand-700 text-white"
                : "text-ink-700 hover:bg-slate-100")
            }
            aria-current={active ? "page" : undefined}
          >
            {LABELS[loc]}
          </Link>
        );
      })}
    </div>
  );
}
