import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Manrope, Inter } from "next/font/google";
import { MetaPixel } from "@/components/MetaPixel";
import {
  LOCALES,
  getDictionary,
  isValidLocale,
  type Locale,
} from "@/lib/dictionaries";

// Display grotesque used for headings and accent type.
// Per customer feedback: clean, sans-serif (без засечек).
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

// Clean modern sans for body copy and UI
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const d = getDictionary(lang as Locale);
  return {
    title: d.meta.title,
    description: d.meta.description,
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
  return (
    <html lang={lang} className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <MetaPixel pixelId={pixelId} />
        {children}
      </body>
    </html>
  );
}
