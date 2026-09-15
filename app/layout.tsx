import { MainShell } from "components/layout/main-shell";
import { Navbar } from "components/layout/navbar";
import { siteConfig } from "lib/site-config";
import { baseUrl } from "lib/utils";
import { JsonLd } from "components/b2b/breadcrumbs";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Wholesale sourcing for blood pressure monitors, fingertip pulse oximeters and mesh nebulizers. Request MOQ, samples and current product information.",
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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    "@id": `${baseUrl}/#organization`,
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
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4"
        >
          Skip to content
        </a>
        <JsonLd data={organizationSchema} />
        <Navbar />
        <MainShell>{children}</MainShell>
        <Toaster closeButton position="bottom-right" />
      </body>
    </html>
  );
}
