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
    "/tools",
    "WolrdPulse MCP tools for status, SSL, DNS, ping",
    "Index of the four WolrdPulse MCP tools: get_cloud_status, inspect_ssl, query_dns, and ping_endpoint, with schemas and sample calls.",
    true,
  );
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return <PseoHub section="tools" locale={locale} nav={t.nav} />;
}
