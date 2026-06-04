import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";

const INSTAGRAM_URL = "https://www.instagram.com/eaststar_privateschool/";

const ICONS = {
  instagram:
    "M12 2.16c3.2 0 3.58.012 4.85.07 1.17.054 1.8.249 2.22.413.56.217.96.477 1.38.896.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.05-.41-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.78.3-1.45.71-2.12 1.38C1.35 2.68.94 3.35.64 4.13.34 4.9.13 5.77.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.71 1.46 1.38 2.13.67.67 1.34 1.08 2.12 1.38.77.3 1.65.51 2.92.57C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.27 2.91-.57.78-.3 1.45-.71 2.12-1.38.67-.67 1.08-1.34 1.38-2.12.3-.77.5-1.65.56-2.92.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.14-.56-2.91-.3-.79-.71-1.46-1.38-2.13C21.32 1.35 20.65.94 19.87.64c-.77-.3-1.65-.5-2.92-.57C15.67.01 15.26 0 12 0zm0 5.84c-3.4 0-6.16 2.76-6.16 6.16s2.76 6.16 6.16 6.16 6.16-2.76 6.16-6.16-2.76-6.16-6.16-6.16zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm6.41-11.85c-.8 0-1.44.65-1.44 1.44s.65 1.44 1.44 1.44 1.44-.65 1.44-1.44-.64-1.44-1.44-1.44z",
  telegram:
    "M21.5 2.5L1.5 10.5l6 2.3 2.3 7 4-4.5 6.5 5L21.5 2.5zM17.2 7.8l-6.7 6.2-2.1-.8 9.2-7.3-.4 1.9z",
};

export function Footer({ d }: { d: Dictionary }) {
  const year = new Date().getFullYear();
  const tgUrl = d.contact.telegram;

  const socialBtn =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-accent-300 hover:bg-accent-700/30 hover:text-accent-300";

  return (
    <footer className="relative bg-brand-700 text-white">
      {/* Crimson hairline at the top */}
      <div className="h-[2px] w-full bg-accent-700" />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]">
              <Image
                src="/logos/wordmark-light.jpg"
                alt="East Star Private School"
                width={120}
                height={120}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="font-display text-2xl font-semibold tracking-wide">
                EAST STAR
              </div>
              <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-300">
                Private School · est. 2025
              </div>
              <div className="mt-2 max-w-xs text-sm text-brand-100">
                {d.footer.tagline}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 text-sm text-brand-100 sm:items-end">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-accent-300">
              {d.footer.followUs}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className={socialBtn}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={ICONS.instagram} />
                </svg>
              </a>
              {tgUrl ? (
                <a
                  href={tgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  title="Telegram"
                  className={socialBtn}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={ICONS.telegram} />
                  </svg>
                </a>
              ) : null}
            </div>

            <span className="mt-2 text-xs text-brand-200">
              © {year}. {d.footer.rights}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
