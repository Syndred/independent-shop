import { products } from "lib/data/products";
import { getCrmTrackingConfig } from "lib/crm-tracking";
import { siteConfig } from "lib/site-config";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

const MAX_PARAM_LENGTH = 160;
const MAX_MESSAGE_LENGTH = 1_200;
const TRACKING_TIMEOUT_MS = 800;
const allowedIntents = new Set(["quote", "sample", "moq", "general"]);

function cleanParam(
  value: string | null,
  maxLength = MAX_PARAM_LENGTH,
): string {
  return (value || "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function cleanIdentifier(value: string | null): string {
  const cleaned = cleanParam(value);
  return /^[a-zA-Z0-9._:-]+$/.test(cleaned) ? cleaned : "";
}

function cleanMessage(value: string | null): string {
  return (value || "")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH);
}

function productForParam(value: string): (typeof products)[number] | undefined {
  return products.find(
    (product) => product.handle === value || product.id === value,
  );
}

function displayProductName(
  productParam: string,
  product?: (typeof products)[number],
): string {
  if (product) return product.title;
  if (!productParam) return "the product shown on your website";
  return productParam.replace(/[-_]+/g, " ").slice(0, 80);
}

function defaultMessage(
  intent: string,
  productName: string,
  variant: string,
): string {
  const variantText = variant ? ` (${variant})` : "";
  if (intent === "sample") {
    return `Hi, I'm interested in a sample of ${productName}${variantText}. Could you share sample availability and shipping options?`;
  }
  if (intent === "moq") {
    return `Hi, I'm interested in ${productName}${variantText}. Could you share the MOQ and wholesale terms?`;
  }
  if (intent === "quote") {
    return `Hi, I'm interested in ${productName}${variantText}. Could you send me wholesale pricing and MOQ details?`;
  }
  return `Hi, I'd like to learn more about ${productName}${variantText} for wholesale sourcing.`;
}

type TrackingEvent = {
  eventId: string;
  event: "whatsapp_click";
  product_id: string | null;
  product_handle: string | null;
  lead_id: string | null;
  source: string;
  content: string;
  path: string;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
};

async function sendTrackingEvent(event: TrackingEvent): Promise<void> {
  const config = getCrmTrackingConfig();
  if (!config) return;

  const headers: HeadersInit = { "content-type": "application/json" };
  if (config.authorization) headers.authorization = config.authorization;

  try {
    const response = await fetch(config.endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(event),
      signal: AbortSignal.timeout(TRACKING_TIMEOUT_MS),
      cache: "no-store",
      redirect: "error",
    });
    if (!response.ok) {
      console.warn(
        `[crm-tracking] delivery failed with status ${response.status}`,
      );
    }
  } catch {
    // Tracking must never prevent a buyer from reaching WhatsApp.
    console.warn("[crm-tracking] delivery failed");
  }
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const productParam = cleanIdentifier(
    params.get("product") || params.get("product_id"),
  );
  const leadId = cleanIdentifier(params.get("lead") || params.get("lead_id"));
  const source = cleanParam(params.get("source")) || "website";
  const intentParam = cleanParam(params.get("intent"));
  const intent = allowedIntents.has(intentParam) ? intentParam : "general";
  const variant = cleanParam(params.get("variant"));
  const country = cleanParam(params.get("country"));
  const buyerType = cleanParam(params.get("buyer_type"));
  const product = productForParam(productParam);
  const productName = displayProductName(productParam, product);
  const message =
    cleanMessage(params.get("message")) ||
    defaultMessage(intent, productName, variant);
  const number = siteConfig.whatsappNumber.replace(/\D/g, "");

  if (!number) {
    return NextResponse.json(
      { error: "WhatsApp contact is not configured" },
      { status: 500 },
    );
  }

  const event: TrackingEvent = {
    eventId: randomUUID(),
    event: "whatsapp_click",
    product_id: product?.id || productParam || null,
    product_handle: product?.handle || productParam || null,
    lead_id: leadId || null,
    source,
    content: [intent, variant, country, buyerType]
      .filter(Boolean)
      .join(":")
      .slice(0, 300),
    path: request.headers.get("referer") || request.nextUrl.pathname,
    referrer: request.headers.get("referer"),
    utm_source: cleanParam(params.get("utm_source")) || source,
    utm_medium: cleanParam(params.get("utm_medium")) || "whatsapp",
    utm_campaign: cleanParam(params.get("utm_campaign")) || null,
    utm_content: cleanParam(params.get("utm_content")) || intent,
  };

  await sendTrackingEvent(event);

  const destination = new URL(`https://wa.me/${number}`);
  destination.searchParams.set("text", message);
  const response = NextResponse.redirect(destination, 302);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
