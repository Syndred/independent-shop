import { ContentPage } from "components/b2b/content-page";
import { pages } from "lib/data/pages";
import { baseUrl } from "lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
export function generateStaticParams() {
  return pages
    .filter((p) => p.handle !== "pulse-oximeter-wholesale")
    .map((p) => ({ page: p.handle }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page: handle } = await params;
  const page = pages.find((p) => p.handle === handle);
  if (!page) notFound();
  return {
    title: page.seo?.title || page.title,
    description: page.bodySummary,
    alternates: { canonical: `${baseUrl}/${page.handle}` },
    openGraph: {
      title: page.title,
      description: page.bodySummary,
      url: `${baseUrl}/${page.handle}`,
      type: "website",
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: handle } = await params;
  const page = pages.find((p) => p.handle === handle);
  if (!page) notFound();
  return <ContentPage page={page} />;
}
