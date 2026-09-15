import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("public shopping surfaces expose quotation CTAs, not cart or fixed prices", async () => {
  const files = await Promise.all(
    [
      "app/layout.tsx",
      "components/layout/navbar/navbar-shell.tsx",
      "components/layout/product-grid-items.tsx",
      "components/product/lumiere-product-card.tsx",
      "components/product/product-card.tsx",
      "components/product/product-purchase-panel.tsx",
      "app/pulse-oximeter-wholesale/page.tsx",
      "lib/data/products.ts",
    ].map(read),
  );
  const source = files.join("\n");

  assert.doesNotMatch(source, /CartModal|CartProvider|Add to Cart|\$\d/);
  assert.match(source, /Wholesale pricing by quote/);
  assert.match(source, /Request a Quote|Get Wholesale Price/);
  assert.match(source, /Request a Sample/);
  assert.match(source, /Ask MOQ/);
});

test("homepage includes the complete original supplier photo library", async () => {
  const homepage = await readFile(
    new URL("../app/page.tsx", import.meta.url),
    "utf8",
  );
  assert.match(homepage, /NebulizerPhotoRange/);
  const photoManifest = await readFile(
    new URL("../lib/data/product-images.ts", import.meta.url),
    "utf8",
  );
  assert.match(photoManifest, /"detail\.jpg"/);
  assert.match(photoManifest, /"新对话 \(1\)\.png"/);
});

test("checkout routes cannot render a payment flow", async () => {
  const checkout = await read("app/checkout/page.tsx");
  const success = await read("app/checkout/success/page.tsx");

  for (const source of [checkout, success]) {
    assert.match(source, /redirect\("\/pulse-oximeter-wholesale"\)/);
    assert.doesNotMatch(source, /CheckoutForm|getCart|PaymentIntent/);
  }
});

test("CRM tracking is HTTPS and allowlist gated", async () => {
  const config = await read("lib/crm-tracking.ts");
  const route = await read("app/go/whatsapp/route.ts");

  assert.match(config, /CRM_TRACKING_ALLOWED_ORIGINS/);
  assert.match(config, /endpoint\.protocol === "https:"/);
  assert.match(config, /isLoopback\(endpoint\.hostname\)/);
  assert.match(config, /authorization: secure && token/);
  assert.match(route, /if \(response\.ok\) return/);
  assert.match(route, /redirect: "error"/);
  assert.match(route, /after\(\(\) => sendTrackingEvent\(event\)\)/);
  assert.match(route, /attempt <= 3/);
  assert.match(route, /eventId: randomUUID\(\)/);
  const readme = await read("README.md");
  const env = await read(".env.example");
  assert.match(`${readme}\n${env}`, /\/api\/tracking\/ingest/);
});

test("public copy does not promise unverified stock", async () => {
  const search = await read("app/search/page.tsx");
  assert.doesNotMatch(search, /ready to ship|in stock/i);
  assert.match(
    search.replace(/\s+/g, " "),
    /availability is confirmed with each quote/i,
  );
});

test("personalized offers are excluded from search indexing", async () => {
  const offer = await read("lib/offer.ts");
  const page = await read("app/offer/[slug]/page.tsx");
  const sitemap = await read("app/sitemap.ts");
  assert.match(offer, /if \(!valid\) return undefined/);
  assert.match(offer, /return false/);
  assert.match(page, /index: false/);
  assert.doesNotMatch(sitemap, /offer/);
});
