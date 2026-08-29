export const siteConfig = {
  name: process.env.SITE_NAME || "Health Home Wholesale",
  companyName: process.env.COMPANY_NAME || "Health Home Wholesale",
  whatsappNumber: process.env.WHATSAPP_NUMBER || "8615014135583",
  supportEmail: process.env.SUPPORT_EMAIL || "sales@homehealthwholesale.com",
  currency: "USD",
};

export type WhatsAppIntent = "quote" | "sample" | "moq" | "general";

export type WhatsAppTrackingParams = {
  product?: string;
  lead?: string;
  source?: string;
  intent?: WhatsAppIntent;
  variant?: string;
  country?: string;
  buyerType?: string;
  message?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
};

/**
 * Build an internal tracking URL. The server route is the only place that
 * knows the WhatsApp number, so callers cannot turn this into an open redirect.
 */
export function whatsappTrackingUrl(
  params: WhatsAppTrackingParams = {},
): string {
  const query = new URLSearchParams();
  const source = params.source || "website";
  const intent = params.intent || "general";

  const values: Array<[string, string | undefined]> = [
    ["product", params.product],
    ["lead", params.lead],
    ["source", source],
    ["intent", intent],
    ["variant", params.variant],
    ["country", params.country],
    ["buyer_type", params.buyerType],
    ["message", params.message],
    ["utm_source", params.utmSource || source],
    ["utm_medium", params.utmMedium || "whatsapp"],
    ["utm_campaign", params.utmCampaign || "wholesale_inquiry"],
    ["utm_content", params.utmContent || intent],
  ];

  for (const [key, value] of values) {
    if (value) query.set(key, value);
  }

  return `/go/whatsapp?${query.toString()}`;
}

export function whatsappOrderUrl(
  message: string,
  params: Omit<WhatsAppTrackingParams, "message"> = {},
): string {
  return whatsappTrackingUrl({ ...params, message });
}
