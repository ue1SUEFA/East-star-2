import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";

export function Footer({ d }: { d: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-brand-700 text-white">
      {/* Crimson hairline at the top — echoes the inner ring on the logo */}
      <div className="h-[2px] w-full bg-accent-700" />

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <Image
              src="/logos/full-dark.jpg"
              alt="East Star Private School"
              width={88}
              height={88}
              className="h-20 w-20 rounded-full"
            />
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

          <div className="flex flex-col items-center gap-2 text-sm text-brand-100 sm:items-end">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-accent-300">
              {d.footer.followUs}
            </div>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white transition hover:text-accent-300"
            >
              Instagram
            </a>
            <span className="mt-2 text-xs text-brand-200">
              © {year}. {d.footer.rights}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
