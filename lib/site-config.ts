export const siteConfig = {
  name: process.env.SITE_NAME || "Health Home Wholesale",
  companyName: process.env.COMPANY_NAME || "Health Home Wholesale",
  whatsappNumber: process.env.WHATSAPP_NUMBER || "8615014135583",
  supportEmail: process.env.SUPPORT_EMAIL || "sales@healthhomewholesale.com",
  currency: "USD",
};

export function whatsappOrderUrl(message: string): string {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
