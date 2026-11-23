import PseoHub from "@/components/PseoHub";
import { getDictionary } from "@/lib/i18n";
import { routeMetadata } from "@/lib/seo";
import { i18n } from "@/middleware";

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return routeMetadata(
    locale,
    "/guides",
    "MCP guides for Vercel, SSL, and DNS checks",
    "Three WolrdPulse workflows: debug a Vercel build, check SSL expiry, and read a DNS answer from Cloudflare 1.1.1.1.",
    true,
  );
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return <PseoHub section="guides" locale={locale} nav={t.nav} />;
}
