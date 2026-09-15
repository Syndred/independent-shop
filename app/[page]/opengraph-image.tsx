import OpengraphImage from "components/opengraph-image";
import { pages } from "lib/data/pages";
import { notFound } from "next/navigation";
export default async function Image({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: handle } = await params;
  const page = pages.find((p) => p.handle === handle);
  if (!page) notFound();
  return OpengraphImage({ title: page.title });
}
