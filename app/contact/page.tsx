import Footer from "components/layout/footer";
import { Breadcrumbs } from "components/b2b/breadcrumbs";
import { RfqForm } from "components/b2b/rfq-form";
import { products } from "lib/data/products";
import { siteConfig } from "lib/site-config";
import { baseUrl } from "lib/utils";
export const metadata = {
  title: "Request a Wholesale Quote",
  description:
    "Send your company, destination, product, quantity and requirements. Prepare a wholesale RFQ for blood pressure monitors, pulse oximeters or mesh nebulizers.",
  alternates: { canonical: `${baseUrl}/contact` },
};
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const query = await searchParams;
  const selected = products.some((p) => p.handle === query.product)
    ? query.product!
    : "";
  return (
    <>
      <div className="container-site section-pad py-12 md:py-16">
        <Breadcrumbs items={[{ name: "Request a Quote", path: "/contact" }]} />
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-primary">
              Let's talk sourcing
            </p>
            <h1 className="text-4xl leading-tight md:text-5xl">
              Your next order starts here.
            </h1>
            <p className="mt-6 leading-7 text-ink-muted">
              Share your product, destination and planned quantity. Ask about
              standard configurations, low MOQ options, samples, OEM/ODM
              feasibility and the documents you need.
            </p>
            <div className="mt-8 rounded-xl bg-secondary/50 p-6">
              <h2 className="text-xl">Prefer to contact us directly?</h2>
              <div className="mt-5 grid gap-4 text-sm">
                <a
                  className="font-semibold text-primary underline underline-offset-4"
                  href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp +{siteConfig.whatsappNumber.replace(/\D/g, "")}
                </a>
                <a
                  className="break-all font-semibold text-primary underline underline-offset-4"
                  href={`mailto:${siteConfig.supportEmail}`}
                >
                  {siteConfig.supportEmail}
                </a>
              </div>
              <p className="mt-5 text-sm leading-6 text-ink-muted">
                Sales and sourcing inquiries · Shenzhen, China
              </p>
            </div>
            <h2 className="mt-8 text-xl">What happens next</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-ink-muted">
              <li>Complete the form and review the prepared message.</li>
              <li>Choose WhatsApp or email and send it in that app.</li>
              <li>
                Discuss the exact configuration, current MOQ, sample and
                quotation terms with sales.
              </li>
            </ol>
          </div>
          <div>
            <RfqForm
              products={products.map((p) => ({
                handle: p.handle,
                title: p.title,
              }))}
              selectedProduct={selected}
              email={siteConfig.supportEmail}
              whatsapp={siteConfig.whatsappNumber}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
