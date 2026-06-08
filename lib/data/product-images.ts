import type { Image, ProductMedia } from "lib/shopify/types";

function publicImage(path: string, altText: string): Image {
  const url =
    "/" +
    path
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");

  return { url, altText, width: 1200, height: 1200 };
}

type ProductFolder = "one" | "two" | "three";

const mainFiles: Record<ProductFolder, string[]> = {
  one: [
    "主图1.jpg",
    "主图2.jpg",
    "主图3.jpg",
    "主图4.jpg",
    "主图5.jpg",
    "主图6包装图.jpg",
  ],
  two: ["主图1.jpg", "主图2.jpg", "主图3.jpg", "主图4.jpg", "主图5.jpg"],
  three: ["主图1.jpg", "主图2.jpg", "主图3.jpg", "主图4.jpg", "主图5.jpg"],
};

const skuCounts: Record<ProductFolder, number> = {
  one: 5,
  two: 5,
  three: 10,
};

export function buildProductMedia(
  folder: ProductFolder,
  productTitle: string,
): ProductMedia {
  const main = mainFiles[folder].map((file, index) =>
    publicImage(`${folder}/main/${file}`, `${productTitle} — 主图 ${index + 1}`),
  );

  const sku = Array.from({ length: skuCounts[folder] }, (_, index) => {
    const num = index + 1;
    return publicImage(`${folder}/sku/${num}.jpg`, `${productTitle} — SKU ${num}`);
  });

  const detail = publicImage(`${folder}/detail.jpg`, `${productTitle} — 详情`);

  return { main, sku, detail };
}

export function buildSkuVariants(
  folder: ProductFolder,
  productTitle: string,
  baseSku: string,
  basePrice: string,
  optionName = "Style",
) {
  const count = skuCounts[folder];
  const media = buildProductMedia(folder, productTitle);

  return {
    options: [
      {
        id: `opt-${folder}`,
        name: optionName,
        values: media.sku.map((_, index) => `${optionName} ${index + 1}`),
      },
    ],
    variants: media.sku.map((image, index) => {
      const value = `${optionName} ${index + 1}`;
      return {
        id: `var-${folder}-${index + 1}`,
        sku: `${baseSku}-${String(index + 1).padStart(2, "0")}`,
        title: value,
        availableForSale: true,
        selectedOptions: [{ name: optionName, value }],
        price: { amount: basePrice, currencyCode: "USD" },
        image,
      };
    }),
  };
}
