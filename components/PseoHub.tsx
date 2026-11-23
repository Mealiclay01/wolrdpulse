import Link from "next/link";
import Navbar from "@/components/Navbar";
import JsonLd from "@/components/JsonLd";
import { sections, type SectionKey } from "@/lib/pseo";
import { SITE_URL } from "@/lib/site";

const copy: Record<SectionKey, { h1: string; lede: string }> = {
  tools: {
    h1: "MCP tools",
    lede: "Four tools an agent can call on the public SSE server: cloud status, TLS inspection, DNS-over-HTTPS, and an HTTP edge probe.",
  },
  integrations: {
    h1: "IDE integrations",
    lede: "Paste the wolrdpulse server into Cursor, Claude Desktop, or Windsurf. The URL is the same. The config file path depends on the OS.",
  },
  status: {
    h1: "Cloud status MCP",
    lede: "Provider pages for the get_cloud_status call. Read the public incident text before rewriting a deploy that failed because AWS, Vercel, or GitHub is degraded.",
  },
  guides: {
    h1: "Developer guides",
    lede: "Three workflows: a red Vercel build, an SSL expiry check, and a DNS answer from 1.1.1.1.",
  },
};

export default function PseoHub({
  section,
  locale,
  nav,
}: {
  section: SectionKey;
  locale: string;
  nav: { features?: string; sponsor?: string; connectAgent?: string; backHome?: string };
}) {
  const hub = sections[section];
  const text = copy[section];
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar t={nav} locale={locale} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${locale}` },
            { "@type": "ListItem", position: 2, name: text.h1, item: `${SITE_URL}/${locale}/${section}` },
          ],
        }}
      />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">{text.h1}</h1>
        <p className="text-[var(--muted-foreground)] leading-relaxed">{text.lede}</p>
        <ul className="space-y-4">
          {hub.pages.map((page) => (
            <li key={page.slug} className="rounded-2xl border border-[var(--border)] p-5">
              <Link href={`/${locale}/${section}/${page.slug}`} className="font-semibold underline">
                {page.h1}
              </Link>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">{page.description}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
