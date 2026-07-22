import { CheckoutForm } from "components/checkout/checkout-form";
import Footer from "components/layout/footer";
import { FadeIn } from "components/motion/fade-in";
import { getCart } from "lib/shopify";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Checkout",
  description: "Complete your order.",
};

export default async function CheckoutPage() {
  const cart = await getCart();

  if (!cart || cart.lines.length === 0) {
    redirect("/search/health-care");
  }

  return (
    <>
      <div className="container-site section-pad pb-12 md:pb-14">
        <div className="mx-auto max-w-lg">
          <FadeIn>
            <h1 className="text-3xl font-medium tracking-tight text-ink md:text-4xl">
              Checkout
            </h1>
            <p className="mt-2 text-ink-muted">
              Shipping details and order confirmation.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <CheckoutForm cart={cart} />
          </FadeIn>
          <Link
            href="/search/health-care"
            className="mt-8 inline-block text-sm text-ink-muted transition hover:text-ink"
          >
            Continue shopping
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
