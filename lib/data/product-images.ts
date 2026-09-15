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
  mainFiles: string[],
  skuCount: number,
): ProductMedia {
  const files = [
    ...Array.from({ length: skuCount }, (_, index) => `sku/${index + 1}.jpg`),
    ...mainFiles.map((file) => `main/${file}`),
    "detail.jpg",
  ];
  const photos = files.map((file, index) =>
    photo(
      `${folder}/${file}`,
      `${title} — original supplier image ${index + 1}`,
    ),
  );
  return { main: photos, sku: [], detail: null };
}

export const nebulizerPhotos = [
  {
    title: "SY108 catalog photos",
    href: "/product/sy108-mesh-nebulizer",
    media: supplierMedia(
      "one",
      "Handheld mesh nebulizer",
      [
        "主图1.jpg",
        "主图2.jpg",
        "主图3.jpg",
        "主图4.jpg",
        "主图5.jpg",
        "主图6包装图.jpg",
      ],
      5,
    ),
  },
  {
    title: "ZS101 catalog photos",
    href: "/product/zs101-mesh-nebulizer",
    media: supplierMedia(
      "two",
      "Compact mesh nebulizer",
      ["主图1.jpg", "主图2.jpg", "主图3.jpg", "主图4.jpg", "主图5.jpg"],
      5,
    ),
  },
  {
    title: "Compact nebulizer designs",
    href: "/contact?product=multiple",
    media: supplierMedia(
      "three",
      "Compact nebulizer design",
      ["主图1.jpg", "主图2.jpg", "主图3.jpg", "主图4.jpg", "主图5.jpg"],
      10,
    ),
  },
  {
    title: "Handheld nebulizer design",
    href: "/contact?product=multiple",
    media: supplierMedia(
      "four",
      "Handheld nebulizer design",
      [
        "主图6.jpg",
        "主图1.jpg",
        "主图2.jpg",
        "主图3.jpg",
        "主图4.jpg",
        "主图5.jpg",
        "f1a0e61c27aed31bf2e260135137398b.jpg",
        "新对话.png",
        "新对话 (1).png",
        "详情页-恢复的_16.jpg",
      ],
      0,
    ),
  },
];

export const productMedia: Record<string, ProductMedia> = {
  "sy108-mesh-nebulizer": nebulizerPhotos[0]!.media,
  "zs101-mesh-nebulizer": nebulizerPhotos[1]!.media,
};
