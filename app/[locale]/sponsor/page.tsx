import Link from "next/link";
import Navbar from "@/components/Navbar";
import JsonLd from "@/components/JsonLd";
import { getDictionary } from "@/lib/i18n";
import { routeMetadata } from "@/lib/seo";
import { GITHUB_REPO, SITE_URL } from "@/lib/site";
import { i18n } from "@/middleware";

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return routeMetadata(
    locale,
    "/sponsor",
    "Sponsor the WolrdPulse open-source MCP server",
    "WolrdPulse is a free MIT-licensed MCP server. Sponsor the maintainer on GitHub if the status, DNS, and SSL tools save your team time.",
  );
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  const url = `${SITE_URL}/${locale}/sponsor`;
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar t={t.nav} locale={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${locale}` },
            { "@type": "ListItem", position: 2, name: "Sponsor", item: url },
          ],
        }}
      />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Sponsor the WolrdPulse MCP server</h1>
        <p className="text-[var(--muted-foreground)] leading-relaxed">
          {t.developer?.sponsorProjectDesc ||
            "WolrdPulse is free and MIT licensed. Sponsorship keeps the public SSE endpoint available for Cursor, Claude Desktop, and Windsurf."}
        </p>
        <p>
          <a className="underline font-semibold" href="https://github.com/sponsors/Mealiclay01">
            {t.developer?.sponsorGithub || "Sponsor @Mealiclay01 on GitHub"}
          </a>
        </p>
        <p className="text-sm">
          <Link className="underline" href={`/${locale}/developer`}>Developer profile</Link>
          {" · "}
          <a className="underline" href={GITHUB_REPO}>Repository</a>
        </p>
      </main>
    </div>
  );
}
