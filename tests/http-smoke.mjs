import assert from "node:assert/strict";
import { writeFile, mkdir } from "node:fs/promises";
const origin = process.env.TEST_ORIGIN || "http://localhost:3100";
const publicOrigin = "https://homehealthwholesale.com";
const checked = [];
const mapResponse = await fetch(`${origin}/sitemap.xml`);
assert.equal(mapResponse.status, 200);
const sitemap = await mapResponse.text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
assert.equal(new Set(urls).size, 21);
assert.ok(
  urls.every((url) => url.startsWith(publicOrigin) && !url.includes("/offer/")),
);
const forbidden =
  /Direct Manufacturer|Ships to 50\+|trusted.{0,20}worldwide|Add to Cart|Thank you for subscribing|ZS102|ZS103/i;
const localLinks = new Set();
const assets = new Set();
const productPhotos = new Set();
for (const url of urls) {
  const pathname = new URL(url).pathname;
  const response = await fetch(`${origin}${pathname}`);
  assert.equal(response.status, 200, pathname);
  const html = await response.text();
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `one h1 on ${pathname}`);
  assert.equal(
    (html.match(/<main\b/g) || []).length,
    1,
    `one main on ${pathname}`,
  );
  assert.match(html, /<meta name="description" content="[^\"]+"/);
  const canonical = html.match(/<link rel="canonical" href="([^\"]+)"/)[1];
  assert.equal(canonical.replace(/\/$/, ""), url.replace(/\/$/, ""));
  assert.doesNotMatch(html, forbidden);
  const schemas = [
    ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
  ].map((m) => JSON.parse(m[1]));
  assert.ok(schemas.some((s) => s["@type"] === "Organization"));
  if (pathname !== "/")
    assert.ok(
      schemas.some((s) => s["@type"] === "BreadcrumbList"),
      pathname,
    );
  if (pathname.startsWith("/product/")) {
    const product = schemas.find((s) => s["@type"] === "Product");
    assert.ok(product);
    assert.ok(
      !product.offers &&
        !product.aggregateRating &&
        !product.review &&
        !product.image,
    );
  }
  for (const m of html.matchAll(/href="(\/[^\"]*)"/g)) {
    const href = m[1].replace(/&amp;/g, "&");
    if (
      !href.startsWith("/_next/") &&
      !href.startsWith("/go/") &&
      !href.includes("opengraph-image")
    )
      localLinks.add(href.split("#")[0]);
  }
  for (const match of html.matchAll(/(?:src|href)="(\/_next\/static\/[^"]+)"/g))
    assets.add(match[1]);
  for (const match of html.matchAll(/<img\b[^>]*src="([^"]+)"/g)) {
    const src = match[1].replace(/&amp;/g, "&");
    if (src.startsWith("/")) productPhotos.add(src);
  }
  checked.push({
    path: pathname,
    status: response.status,
    canonical,
    schemas: schemas.map((s) => s["@type"]),
  });
}
for (const path of assets) {
  const response = await fetch(origin + path);
  assert.equal(response.status, 200, `Missing deployment asset ${path}`);
  if (path.endsWith(".css")) {
    assert.match(await response.text(), /bg-primary/);
  }
}
assert.ok(
  productPhotos.size >= 4,
  "Supplier photos must remain visible in rendered pages",
);
for (const path of productPhotos) {
  const response = await fetch(origin + path);
  assert.equal(response.status, 200, `Missing catalog photo ${path}`);
  assert.match(response.headers.get("content-type") || "", /^image\//);
}
for (const path of localLinks) {
  const response = await fetch(origin + path);
  assert.ok(response.ok, `Broken internal link ${path}: ${response.status}`);
}
for (const path of [
  "/does-not-exist",
  "/product/unknown",
  "/search/unknown",
  "/offer/unknown",
  "/offer/lk87-pulse-oximeter-invalid",
])
  assert.equal((await fetch(origin + path)).status, 404, path);
for (const [path, expected] of [
  ["/product/premium-pulse-oximeter", "/product/sy108-mesh-nebulizer"],
  ["/product/kids-pulse-oximeter", "/product/zs101-mesh-nebulizer"],
  ["/product/mini-speaker", "/search/mesh-nebulizers"],
  ["/product/advanced-pulse-oximeter", "/search/mesh-nebulizers"],
  ["/search/health-care", "/search"],
  ["/search/seasonal-hot-deals", "/search"],
]) {
  const response = await fetch(origin + path, { redirect: "manual" });
  assert.equal(response.status, 308, path);
  assert.equal(
    new URL(response.headers.get("location"), origin).pathname,
    expected,
  );
}
const offer = await fetch(origin + "/offer/lk87-pulse-oximeter-usa-wholesaler");
assert.equal(offer.status, 200);
assert.match(await offer.text(), /noindex/);
const wa = await fetch(
  origin +
    "/go/whatsapp?product=sy108-mesh-nebulizer&intent=sample&source=qa_validation",
  { redirect: "manual" },
);
assert.equal(wa.status, 302);
const dest = new URL(wa.headers.get("location"));
assert.equal(dest.origin, "https://wa.me");
assert.equal(dest.pathname, "/8615014135583");
assert.match(dest.searchParams.get("text"), /sample of SY108 Mesh Nebulizer/);
const catalog = await (await fetch(origin + "/api/catalog")).json();
assert.equal(catalog.products.length, 6);
const robots = await (await fetch(origin + "/robots.txt")).text();
assert.match(robots, /Sitemap: https:\/\/homehealthwholesale.com\/sitemap.xml/);
await mkdir("docs/verification", { recursive: true });
await writeFile(
  `docs/verification/${origin.includes("localhost") ? "local" : "production"}-http.json`,
  JSON.stringify(
    {
      at: new Date().toISOString(),
      origin,
      pages: checked,
      internalLinks: localLinks.size,
      staticAssets: assets.size,
      renderedPhotoUrls: productPhotos.size,
      checks: [
        "canonical",
        "sitemap",
        "robots",
        "Organization/Product/Breadcrumb",
        "no invented merchant offers",
        "legacy redirects",
        "real 404s",
        "personalized noindex",
        "WhatsApp target and message",
        "six-product catalog",
      ],
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `PASS: ${checked.length} pages; ${localLinks.size} internal links; metadata, redirects, 404, WhatsApp and catalog checks.`,
);
