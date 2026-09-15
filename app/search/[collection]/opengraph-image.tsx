import OpengraphImage from "components/opengraph-image";
import { collections } from "lib/data/collections";
import { notFound } from "next/navigation";
export default async function Image({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  const { collection: handle } = await params;
  const collection = collections.find((c) => c.handle === handle);
  if (!collection) notFound();
  return OpengraphImage({ title: collection.title });
}
