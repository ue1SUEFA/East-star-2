import { notFound } from "next/navigation";
import { getDictionary, isValidLocale, type Locale } from "@/lib/dictionaries";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Programs } from "@/components/Programs";
import { WhyUs } from "@/components/WhyUs";
import { Facilities } from "@/components/Facilities";
import { Contact } from "@/components/Contact";
import { ApplySection } from "@/components/ApplySection";
import { ApplyModalProvider } from "@/components/ApplyModal";
import { Footer } from "@/components/Footer";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale = lang as Locale;
  const d = getDictionary(locale);

  return (
    <ApplyModalProvider d={d} locale={locale}>
      <Navbar d={d} locale={locale} />
      <main>
        <Hero d={d} />
        <About d={d} />
        <Programs d={d} />
        <WhyUs d={d} />
        <Facilities d={d} />
        <Contact d={d} />
        <ApplySection d={d} locale={locale} />
      </main>
      <Footer d={d} />
    </ApplyModalProvider>
  );
}
