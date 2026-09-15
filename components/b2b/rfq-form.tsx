"use client";
import { useRef, useState, type FormEvent } from "react";
import { buildRfqMessage, validateRfq, rfqLimits, type RfqData } from "lib/rfq";
import { Mail, MessageCircle, Copy, Check } from "lucide-react";
type Props = {
  products: { handle: string; title: string }[];
  selectedProduct: string;
  email: string;
  whatsapp: string;
};
const inputClass =
  "mt-2 w-full rounded-lg border border-border bg-white px-3 py-3 text-base text-foreground";
export function RfqForm({ products, selectedProduct, email, whatsapp }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const data = Object.fromEntries(
      Object.keys(rfqLimits).map((key) => [
        key,
        String(fields.get(key) || "").trim(),
      ]),
    ) as RfqData;
    const problem = validateRfq(
      data,
      products.map((p) => p.handle),
    );
    setError(problem);
    setMessage(null);
    setCopyStatus("");
    if (problem) {
      requestAnimationFrame(() => errorRef.current?.focus());
      return;
    }
    const title =
      products.find((p) => p.handle === data.product)?.title ||
      "Multiple products / sourcing help";
    setMessage(buildRfqMessage(data, title));
    requestAnimationFrame(() => previewRef.current?.focus());
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(message!);
      setCopyStatus(
        "Copied. Paste the request into your preferred sales channel.",
      );
    } catch {
      setCopyStatus(
        "Copy is unavailable. Select and copy the request text below.",
      );
    }
  }
  return (
    <>
      <form
        onSubmit={prepare}
        onChange={() => {
          setMessage(null);
          setCopyStatus("");
          setError(null);
        }}
        className="rounded-xl border border-border bg-card p-5 sm:p-8"
      >
        <h2 className="text-2xl">Tell us what you need</h2>
        <p id="form-help" className="mt-3 text-sm leading-6 text-ink-muted">
          Fields marked * are required. Add an email or WhatsApp number.
          Preparing your request does not send it.
        </p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {[
            { name: "name", label: "Your name *", auto: "name" },
            {
              name: "company",
              label: "Company / business name *",
              auto: "organization",
            },
            {
              name: "country",
              label: "Destination country *",
              auto: "country-name",
            },
            { name: "email", label: "Email", auto: "email" },
            {
              name: "whatsapp",
              label: "WhatsApp (include country code)",
              auto: "tel",
            },
          ].map((field) => (
            <label
              key={field.name}
              className="text-sm font-medium"
              htmlFor={`rfq-${field.name}`}
            >
              {field.label}
              <input
                id={`rfq-${field.name}`}
                name={field.name}
                type={
                  field.name === "email"
                    ? "email"
                    : field.name === "whatsapp"
                      ? "tel"
                      : "text"
                }
                autoComplete={field.auto}
                maxLength={rfqLimits[field.name as keyof RfqData]}
                required={["name", "company", "country"].includes(field.name)}
                aria-describedby={
                  field.name === "email" || field.name === "whatsapp"
                    ? "form-help"
                    : undefined
                }
                className={inputClass}
              />
            </label>
          ))}
          <label htmlFor="rfq-quantity" className="text-sm font-medium">
            Estimated quantity (units) *
            <input
              id="rfq-quantity"
              name="quantity"
              type="number"
              inputMode="numeric"
              min="1"
              max="1000000"
              step="1"
              required
              className={inputClass}
            />
          </label>
          <label
            htmlFor="rfq-product"
            className="text-sm font-medium sm:col-span-2"
          >
            Product *
            <select
              id="rfq-product"
              name="product"
              defaultValue={selectedProduct}
              required
              className={inputClass}
            >
              <option value="">Select a product</option>
              {products.map((p) => (
                <option key={p.handle} value={p.handle}>
                  {p.title}
                </option>
              ))}
              <option value="multiple">
                Multiple products / sourcing help
              </option>
            </select>
          </label>
          <label
            htmlFor="rfq-requirements"
            className="text-sm font-medium sm:col-span-2"
          >
            Requirements (optional, up to 1,000 characters)
            <textarea
              id="rfq-requirements"
              name="requirements"
              rows={5}
              maxLength={1000}
              className={inputClass}
              placeholder="Sample quantity, packaging or logo, required documents, delivery city and any other specifications."
            />
          </label>
        </div>
        {error && (
          <p
            ref={errorRef}
            tabIndex={-1}
            role="alert"
            className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-800"
          >
            {error}
          </p>
        )}
        <button type="submit" className="btn-accent mt-6 w-full rounded-lg">
          Prepare my request →
        </button>
        <p className="mt-4 text-xs leading-5 text-ink-muted">
          Review your request next, then choose WhatsApp or email. Please
          provide business details only.{" "}
          <a className="underline" href="/privacy">
            Privacy details
          </a>
        </p>
        <noscript>
          <p className="mt-4">
            Enable JavaScript to prepare this form, or use the WhatsApp and
            email contacts on this page.
          </p>
        </noscript>
      </form>
      {message && (
        <div
          ref={previewRef}
          tabIndex={-1}
          className="mt-6 rounded-xl border border-primary bg-card p-5 sm:p-8"
        >
          <p className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Check size={18} aria-hidden="true" />
            Request prepared — not sent yet
          </p>
          <h2 className="mt-4 text-2xl">Review, then send</h2>
          <label htmlFor="rfq-preview" className="mt-4 block text-sm">
            Your inquiry message
          </label>
          <textarea
            id="rfq-preview"
            readOnly
            value={message}
            rows={13}
            className={inputClass}
          />
          <div className="mt-5 grid gap-3">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`}
              className="btn-accent gap-2 rounded-lg"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Open WhatsApp
            </a>
            <a
              href={`mailto:${email}?subject=${encodeURIComponent("Wholesale inquiry")}&body=${encodeURIComponent(message)}`}
              className="btn-secondary gap-2 rounded-lg"
            >
              <Mail size={18} aria-hidden="true" />
              Open email draft
            </a>
            <button
              onClick={copy}
              type="button"
              className="btn-secondary gap-2 rounded-lg"
            >
              <Copy size={18} aria-hidden="true" />
              Copy request
            </button>
          </div>
          <p className="mt-4 text-sm leading-6 text-ink-muted">
            Send the message in WhatsApp or your email app to reach sales. If
            either app cannot open, copy the request and send it to {email}.
          </p>
          <p role="status" className="mt-3 text-sm text-primary">
            {copyStatus}
          </p>
        </div>
      )}
    </>
  );
}
