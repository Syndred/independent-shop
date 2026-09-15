import type { NextConfig } from "next";
const config: NextConfig = {
  images: { formats: ["image/webp"] },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/product/premium-pulse-oximeter",
        destination: "/product/sy108-mesh-nebulizer",
        permanent: true,
      },
      {
        source: "/product/kids-pulse-oximeter",
        destination: "/product/zs101-mesh-nebulizer",
        permanent: true,
      },
      {
        source: "/product/mini-speaker",
        destination: "/search/mesh-nebulizers",
        permanent: true,
      },
      {
        source: "/product/advanced-pulse-oximeter",
        destination: "/search/mesh-nebulizers",
        permanent: true,
      },
      {
        source: "/search/health-care",
        destination: "/search",
        permanent: true,
      },
      {
        source: "/search/seasonal-hot-deals",
        destination: "/search",
        permanent: true,
      },
      { source: "/products", destination: "/search", permanent: true },
    ];
  },
};
export default config;
