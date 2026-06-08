export const siteConfig = {
  name: process.env.SITE_NAME || "Independent Shop",
  companyName: process.env.COMPANY_NAME || "Independent Shop",
  whatsappNumber: process.env.WHATSAPP_NUMBER || "8615014135583",
  supportEmail: process.env.SUPPORT_EMAIL || "support@independent-shop.com",
  currency: "USD",
};

export function whatsappOrderUrl(message: string): string {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
