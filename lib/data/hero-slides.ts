function encodePublicPath(path: string): string {
  return (
    "/" +
    path
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/")
  );
}

type HeroSlide = {
  path: string;
  alt: string;
  kicker: string;
  title: string;
  body: string;
};

const slides: [HeroSlide, ...HeroSlide[]] = [
  {
    path: "four/main/主图2.jpg",
    alt: "Wholesale nebulizer product hero image",
    kicker: "Wholesale health devices",
    title: "Reliable Devices for Clinics and Distributors",
    body: "Source compact monitors and respiratory care products with low MOQ, quick catalog support, and export-ready communication.",
  },
  {
    path: "one/main/主图1.jpg",
    alt: "Portable mesh nebulizer hero image",
    kicker: "Export-ready catalog",
    title: "Health Essentials Built for Repeat Orders",
    body: "Browse practical home-care devices and request bulk pricing through WhatsApp when you are ready to compare models.",
  },
  {
    path: "two/main/主图1.jpg",
    alt: "Family respiratory device hero image",
    kicker: "Fast sourcing support",
    title: "Simple Procurement for Growing Sellers",
    body: "Tell us your destination market and quantity. We will help match the right product line, MOQ, and shipping path.",
  },
];

export const heroSlides = slides.map((slide) => ({
  ...slide,
  src: encodePublicPath(slide.path),
}));
