import Link from "next/link";
import Navbar from "@/components/Navbar";
import JsonLd from "@/components/JsonLd";
import { relatedLinks, type PseoPage } from "@/lib/pseo";
import { MCP_SSE_URL, SITE_URL } from "@/lib/site";

export default function PseoArticle({
  page,
  locale,
  nav,
}: {
  page: PseoPage;
  locale: string;
  nav: { features?: string; sponsor?: string; connectAgent?: string; backHome?: string };
}) {
  const path = `/${page.section}/${page.slug}`;
  const crumbs = [
    { name: "Home", href: `/${locale}` },
    { name: page.section, href: `/${locale}/${page.section}` },
    { name: page.h1, href: `/${locale}${path}` },
  ];
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.href.startsWith("http") ? crumb.href : `${SITE_URL}${crumb.href}`,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];
  if (page.steps?.length) {
    graph.push({
      "@type": "HowTo",
      name: page.h1,
      step: page.steps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    });
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar t={nav} locale={locale} />
      <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-10">
        <nav className="text-xs text-[var(--muted-foreground)] flex flex-wrap gap-2">
          {crumbs.map((crumb, index) => (
            <span key={crumb.href}>
              {index > 0 && " / "}
              <Link href={crumb.href} className="hover:text-[var(--foreground)]">{crumb.name}</Link>
            </span>
          ))}
        </nav>
        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{page.h1}</h1>
          <p className="text-base leading-relaxed text-[var(--muted-foreground)]">{page.lede}</p>
        </header>

        {page.paths && (
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Config file paths</h2>
            <table className="w-full text-sm border border-[var(--border)]">
              <thead>
                <tr className="bg-[var(--muted)] text-left">
                  <th className="p-3">OS</th>
                  <th className="p-3">Path</th>
                </tr>
              </thead>
              <tbody>
                {page.paths.map((row) => (
                  <tr key={row.os} className="border-t border-[var(--border)]">
                    <td className="p-3">{row.os}</td>
                    <td className="p-3 font-mono text-xs" dir="ltr">{row.path}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {page.inputs && (
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Inputs</h2>
            <table className="w-full text-sm border border-[var(--border)]">
              <thead>
                <tr className="bg-[var(--muted)] text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Required</th>
                  <th className="p-3">Detail</th>
                </tr>
              </thead>
              <tbody>
                {page.inputs.map((row) => (
                  <tr key={row.name} className="border-t border-[var(--border)]">
                    <td className="p-3 font-mono text-xs" dir="ltr">{row.name}</td>
                    <td className="p-3">{row.required}</td>
                    <td className="p-3">{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {page.sample && (
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Example</h2>
            <pre className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-xs leading-relaxed" dir="ltr">{page.sample}</pre>
          </section>
        )}

        {page.prompts && (
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Prompts</h2>
            <ul className="list-disc ps-5 space-y-2 text-sm">
              {page.prompts.map((prompt) => <li key={prompt}>{prompt}</li>)}
            </ul>
          </section>
        )}

        {page.steps && (
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Steps</h2>
            <ol className="list-decimal ps-5 space-y-3 text-sm">
              {page.steps.map((step) => (
                <li key={step.name}><strong>{step.name}.</strong> {step.text}</li>
              ))}
            </ol>
          </section>
        )}

        {page.notes && (
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Notes</h2>
            {page.notes.map((note) => (
              <p key={note} className="text-sm leading-relaxed text-[var(--muted-foreground)]">{note}</p>
            ))}
          </section>
        )}

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Questions</h2>
          {page.faqs.map((faq) => (
            <article key={faq.q} className="rounded-2xl border border-[var(--border)] p-5 space-y-2">
              <h3 className="font-semibold">{faq.q}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{faq.a}</p>
            </article>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Related tools and integrations</h2>
          <ul className="flex flex-wrap gap-3 text-sm">
            {relatedLinks(page).map((link) => (
              <li key={link.href}>
                <Link href={`/${locale}${link.href}`} className="underline">{link.label}</Link>
              </li>
            ))}
          </ul>
          <p className="text-sm">
            Connect at <a className="underline" href={MCP_SSE_URL}>{MCP_SSE_URL}</a>
          </p>
        </section>
      </main>
    </div>
  );
}
