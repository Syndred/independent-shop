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

type ProductFolder = "one" | "two" | "three" | "four";

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
  four: [
    "主图1.jpg",
    "主图2.jpg",
    "主图3.jpg",
    "主图4.jpg",
    "主图5.jpg",
    "主图6.jpg",
  ],
};

const skuCounts: Record<ProductFolder, number> = {
  one: 5,
  two: 5,
  three: 10,
  four: 0,
};

export function buildProductMedia(
  folder: ProductFolder,
  productTitle: string,
): ProductMedia {
  const main = mainFiles[folder].map((file, index) =>
    publicImage(`${folder}/main/${file}`, `${productTitle} main image ${index + 1}`),
  );

  const skuCount = skuCounts[folder];
  const sku =
    skuCount > 0
      ? Array.from({ length: skuCount }, (_, index) => {
        const num = index + 1;
        return publicImage(`${folder}/sku/${num}.jpg`, `${productTitle} SKU ${num}`);
      })
      : [];

  const detail = publicImage(`${folder}/detail.jpg`, `${productTitle} detail`);

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
  const variantImages = count > 0 ? media.sku : [media.main[0]!];
  const variantCount = variantImages.length;

  return {
    options: [
      {
        id: `opt-${folder}`,
        name: optionName,
        values:
          variantCount === 1
            ? ["Default"]
            : variantImages.map((_, index) => `${optionName} ${index + 1}`),
      },
    ],
    variants: variantImages.map((image, index) => {
      const value =
        variantCount === 1 ? "Default" : `${optionName} ${index + 1}`;
      return {
        id: `var-${folder}-${index + 1}`,
        sku:
          variantCount === 1
            ? baseSku
            : `${baseSku}-${String(index + 1).padStart(2, "0")}`,
        title: value,
        availableForSale: true,
        selectedOptions: [{ name: optionName, value }],
        price: { amount: basePrice, currencyCode: "USD" },
        image,
      };
    }),
  };
}
