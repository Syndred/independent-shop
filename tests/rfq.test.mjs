import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";
// Exercise the real pure validation module without a test-only implementation.
const source = await readFile(
  new URL("../lib/rfq.ts", import.meta.url),
  "utf8",
);
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText;
const { validateRfq, buildRfqMessage } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);
const valid = {
  name: "Test Buyer",
  company: "Example Trading",
  country: "Singapore",
  email: "buyer@example.com",
  whatsapp: "",
  product: "lk87-pulse-oximeter",
  quantity: "120",
  requirements:
    "Sample first. Please confirm packaging & documents.\nNo order placed.",
};
const handles = [valid.product];
test("accepts email-only and WhatsApp-only replies", () => {
  assert.equal(validateRfq(valid, handles), null);
  assert.equal(
    validateRfq({ ...valid, email: "", whatsapp: "+65 8123 4567" }, handles),
    null,
  );
});
test("requires reply channel and trims whitespace requirements", () => {
  assert.match(
    validateRfq({ ...valid, email: "", whatsapp: "" }, handles),
    /email address or WhatsApp/,
  );
  assert.match(validateRfq({ ...valid, name: "   " }, handles), /complete/);
});
test("rejects malformed email, number, quantity and forged product", () => {
  for (const email of ["buyer@", "a b@example.com", "@example.com"])
    assert.ok(validateRfq({ ...valid, email }, handles));
  for (const whatsapp of ["abc1234567", "+12", "1234567890123456"])
    assert.ok(validateRfq({ ...valid, whatsapp }, handles));
  for (const quantity of ["0", "-2", "2.5", "1e3", "1000001", "Infinity"])
    assert.ok(validateRfq({ ...valid, quantity }, handles));
  assert.ok(validateRfq({ ...valid, product: "unlisted-model" }, handles));
  assert.ok(validateRfq({ ...valid, requirements: "x".repeat(1001) }, handles));
});
test("preserves every RFQ field and line break without order-success claims", () => {
  const message = buildRfqMessage(valid, "LK87 Fingertip Pulse Oximeter");
  for (const value of [
    valid.name,
    valid.company,
    valid.country,
    valid.email,
    valid.quantity,
    valid.requirements,
    "LK87 Fingertip Pulse Oximeter",
  ])
    assert.ok(message.includes(value));
  assert.equal(decodeURIComponent(encodeURIComponent(message)), message);
  assert.match(message, /inquiry, not an order/);
  assert.doesNotMatch(message, /order confirmed|successfully sent/i);
});
