import Link from "next/link";
import { LOCALES, type Locale } from "@/lib/dictionaries";

const LABELS: Record<Locale, string> = {
  uz: "UZ",
  ru: "RU",
  en: "EN",
};

export function LanguageSwitcher({ current }: { current: Locale }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 text-xs font-semibold">
      {LOCALES.map((loc) => {
        const active = loc === current;
        return (
          <Link
            key={loc}
            href={`/${loc}`}
            className={
              "rounded-full px-2.5 py-1 transition " +
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
