import type { Image, ProductMedia } from "lib/shopify/types";

// Preserve the original supplier catalog associations (one/SY108, two/ZS101).
// Photos illustrate the catalog configuration; current model labels and specs
// remain subject to the buyer's quotation. Other designs stay category-level.
function photo(path: string, altText: string): Image {
  return {
    url: "/" + path.split("/").map(encodeURIComponent).join("/"),
    altText,
    width: 800,
    height: 800,
  };
}

function supplierMedia(
  folder: string,
  title: string,
  count: number,
): ProductMedia {
  const photos = Array.from({ length: count }, (_, index) =>
    photo(
      `${folder}/sku/${index + 1}.jpg`,
      `${title} — supplier photo ${index + 1}`,
    ),
  );
  return { main: photos, sku: [], detail: null };
}

export const nebulizerPhotos = [
  {
    title: "SY108 catalog photos",
    href: "/product/sy108-mesh-nebulizer",
    media: supplierMedia("one", "Handheld mesh nebulizer", 5),
  },
  {
    title: "ZS101 catalog photos",
    href: "/product/zs101-mesh-nebulizer",
    media: supplierMedia("two", "Compact mesh nebulizer", 5),
  },
  {
    title: "Compact nebulizer designs",
    href: "/contact?product=multiple",
    media: supplierMedia("three", "Compact nebulizer design", 10),
  },
  {
    title: "Handheld nebulizer design",
    href: "/contact?product=multiple",
    media: {
      main: [
        photo(
          "four/main/主图6.jpg",
          "White handheld nebulizer — supplier catalog photo",
        ),
      ],
      sku: [],
      detail: null,
    },
  },
];

export const productMedia: Record<string, ProductMedia> = {
  "sy108-mesh-nebulizer": nebulizerPhotos[0]!.media,
  "zs101-mesh-nebulizer": nebulizerPhotos[1]!.media,
};
