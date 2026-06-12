import type { Product } from "lib/shopify/types";
import { LumiereHeroCarousel } from "./lumiere-hero-carousel";

export function LumiereHero({ heroProduct }: { heroProduct?: Product }) {
  const shopHref = heroProduct ? `/product/${heroProduct.handle}` : "/search";

  return <LumiereHeroCarousel shopHref={shopHref} />;
}
