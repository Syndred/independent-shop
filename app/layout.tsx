import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { GeistSans } from "geist/font/sans";
import { getCart } from "lib/shopify";
import { siteConfig } from "lib/site-config";
import { baseUrl } from "lib/utils";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: "Pulse oximeters and health essentials, shipped worldwide.",
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const cart = getCart();

  return (
    <html
      lang="en"
      className={GeistSans.variable}
    >
      <body className="bg-white text-neutral-950 antialiased selection:bg-neutral-200">
        <CartProvider cartPromise={cart}>
          <Navbar />
          <main>{children}</main>
          <Toaster
            closeButton
            position="bottom-right"
          />
        </CartProvider>
      </body>
    </html>
  );
}
