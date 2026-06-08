import { CheckoutForm } from "components/checkout/checkout-form";
import Footer from "components/layout/footer";
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
      <div className="mx-auto max-w-lg px-4 py-12 md:px-6 lg:px-8">
        <h1 className="text-3xl font-medium tracking-tight text-neutral-950">Checkout</h1>
        <p className="mt-2 text-neutral-500">Shipping details and order confirmation.</p>
        <CheckoutForm cart={cart} />
        <Link
          href="/search/health-care"
          className="mt-8 inline-block text-sm text-neutral-400 transition hover:text-neutral-950"
        >
          ← Continue shopping
        </Link>
      </div>
      <Footer />
    </>
  );
}
