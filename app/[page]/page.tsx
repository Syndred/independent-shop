import { FadeIn } from "components/motion/fade-in";
import Prose from "components/prose";
import { getPage } from "lib/shopify";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = await getPage(params.page);

  if (!page) return notFound();

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: "article",
    },
  };
}

export default async function Page(props: {
  params: Promise<{ page: string }>;
}) {
  const params = await props.params;
  const page = await getPage(params.page);

  if (!page) return notFound();

  const updatedLabel = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(page.updatedAt));

  return (
    <FadeIn>
      <h1 className="text-3xl font-medium tracking-tight text-ink md:text-4xl">
        {page.title}
      </h1>
      <Prose className="mt-8" html={page.body} />
      <p className="mt-8 text-sm text-ink-muted">
        Last updated {updatedLabel}.
      </p>
    </FadeIn>
  );
}
