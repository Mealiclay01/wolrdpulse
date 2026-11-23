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
    "/integrations",
    "Cursor, Claude, and Windsurf MCP setup",
    "Config file paths and the wolrdpulse SSE block for Cursor, Claude Desktop, and Windsurf. No API key is required.",
    true,
  );
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return <PseoHub section="integrations" locale={locale} nav={t.nav} />;
}
