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
    "/status",
    "AWS, Vercel, and GitHub status for MCP",
    "How a coding agent calls get_cloud_status for AWS, Vercel, or GitHub before rewriting a deploy that failed during an incident.",
    true,
  );
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return <PseoHub section="status" locale={locale} nav={t.nav} />;
}
