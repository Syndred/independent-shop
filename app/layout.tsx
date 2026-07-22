import { CartProvider } from "components/cart/cart-context";
import { MainShell } from "components/layout/main-shell";
import { Navbar } from "components/layout/navbar";
import { getCart } from "lib/shopify";
import { siteConfig } from "lib/site-config";
import { baseUrl } from "lib/utils";
import { Marcellus } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Wholesale health devices and sourcing support for clinics, distributors, pharmacies, and retailers worldwide.",
  robots: {
    follow: true,
    index: true,
  },
  icons: {
    icon: [
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/apple-icon.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cart = getCart();
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.companyName,
    url: baseUrl,
    email: siteConfig.supportEmail,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["English"],
      url: `https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`,
    },
  };

  return (
    <html lang="en" className={marcellus.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <CartProvider cartPromise={cart}>
          <Navbar />
          <MainShell>{children}</MainShell>
          <Toaster closeButton position="bottom-right" />
        </CartProvider>
      </body>
    </html>
  );
}
