import { LumiereBrandStory } from "components/home/lumiere-brand-story";
import { LumiereCategories } from "components/home/lumiere-categories";
import { LumiereFeatured } from "components/home/lumiere-featured";
import { LumiereHero } from "components/home/lumiere-hero";
import { LumiereNewsletter } from "components/home/lumiere-newsletter";
import Footer from "components/layout/footer";
import { getCollectionProducts } from "lib/shopify";

export default async function HomePage() {
  const products = await getCollectionProducts({ collection: "" });
  const heroProduct = products[0];

  return (
    <>
      <LumiereHero heroProduct={heroProduct} />
      <LumiereFeatured products={products} />
      <LumiereBrandStory />
      <LumiereCategories />
      <LumiereNewsletter />
      <Footer />
    </>
  );
}
