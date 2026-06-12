function encodePublicPath(path: string): string {
  return (
    "/" +
    path
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/")
  );
}

/** Hero carousel — product main images only (no detail / long-page crops) */
const mainImagePaths = [
  "four/main/主图1.jpg",
  "four/main/主图2.jpg",
  "four/main/主图3.jpg",
  "four/main/主图4.jpg",
  "four/main/主图5.jpg",
  "four/main/主图6.jpg",
  "one/main/主图1.jpg",
  "one/main/主图2.jpg",
  "two/main/主图1.jpg",
  "three/main/主图1.jpg",
];

export const heroSlides = mainImagePaths.map((path, index) => ({
  src: encodePublicPath(path),
  alt: `Product main image ${index + 1}`,
}));
