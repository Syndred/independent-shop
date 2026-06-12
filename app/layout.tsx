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
    "Elevating your daily health routine with reliable monitors and conscious, quality essentials.",
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
      className={marcellus.variable}
    >
      <body>
        <CartProvider cartPromise={cart}>
          <Navbar />
          <MainShell>{children}</MainShell>
          <Toaster
            closeButton
            position="bottom-right"
          />
        </CartProvider>
      </body>
    </html>
  );
}
