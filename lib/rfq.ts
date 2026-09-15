export type RfqData = {
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp: string;
  product: string;
  quantity: string;
  requirements: string;
};
export const rfqLimits: Record<keyof RfqData, number> = {
  name: 80,
  company: 120,
  country: 80,
  email: 160,
  whatsapp: 40,
  product: 120,
  quantity: 7,
  requirements: 1000,
};
export function validateRfq(
  data: RfqData,
  productHandles: string[],
): string | null {
  for (const key of Object.keys(rfqLimits) as (keyof RfqData)[]) {
    if (data[key].length > rfqLimits[key])
      return "Please shorten the fields to their stated limits.";
  }
  if (
    ![data.name, data.company, data.country, data.product, data.quantity].every(
      (v) => v.trim(),
    )
  )
    return "Please complete your name, company, country, product and quantity.";
  if (!productHandles.includes(data.product) && data.product !== "multiple")
    return "Please choose a product from the catalog.";
  if (!/^[1-9]\d{0,6}$/.test(data.quantity) || Number(data.quantity) > 1000000)
    return "Enter a whole-number quantity between 1 and 1,000,000.";
  if (!data.email.trim() && !data.whatsapp.trim())
    return "Provide an email address or WhatsApp number so we can reply.";
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return "Enter a valid email address.";
  if (
    data.whatsapp &&
    (!/^\+?[\d ()-]+$/.test(data.whatsapp) ||
      data.whatsapp.replace(/\D/g, "").length < 7 ||
      data.whatsapp.replace(/\D/g, "").length > 15)
  )
    return "Enter a WhatsApp number with country code (7–15 digits).";
  return null;
}
export function buildRfqMessage(data: RfqData, productTitle: string): string {
  return [
    "Wholesale inquiry — Health Home Wholesale",
    "",
    `Name: ${data.name}`,
    `Company: ${data.company}`,
    `Country: ${data.country}`,
    `Email: ${data.email || "Not provided"}`,
    `WhatsApp: ${data.whatsapp || "Not provided"}`,
    `Product: ${productTitle}`,
    `Estimated quantity: ${data.quantity} units`,
    "",
    "Requirements:",
    data.requirements ||
      "Please confirm standard configuration, MOQ, sample costs, lead time and available documents.",
    "",
    "Please send a current quotation. This is an inquiry, not an order.",
  ].join("\n");
}
