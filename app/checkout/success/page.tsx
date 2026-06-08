"use client";

import Footer from "components/layout/footer";
import Price from "components/price";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type StoredOrder = {
  orderId: string;
  cart: {
    lines: Array<{
      quantity: number;
      cost: { totalAmount: { amount: string; currencyCode: string } };
      merchandise: {
        sku: string;
        product: { title: string };
      };
    }>;
    cost: { totalAmount: { amount: string; currencyCode: string } };
  };
  checkout: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
  };
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    if (!orderId) return;
    const raw = sessionStorage.getItem(`order:${orderId}`);
    if (raw) {
      setOrder(JSON.parse(raw) as StoredOrder);
    }
  }, [orderId]);

  if (!orderId) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-medium text-neutral-950">Order not found</h1>
        <Link
          href="/search/health-care"
          className="mt-8 inline-block rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-neutral-400">{orderId}</p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight text-neutral-950">Order placed</h1>
      <p className="mt-3 text-neutral-500">
        We received your order. Confirm on WhatsApp to finalize shipping.
      </p>

      {order ? (
        <div className="mt-10 space-y-8 border-t border-neutral-200 pt-10">
          <div className="text-sm">
            <p className="text-neutral-400">Ship to</p>
            <p className="mt-2 font-medium text-neutral-950">{order.checkout.fullName}</p>
            <p className="text-neutral-500">{order.checkout.email}</p>
            <p className="text-neutral-500">{order.checkout.phone}</p>
            <p className="mt-2 text-neutral-500">
              {order.checkout.address}, {order.checkout.city}, {order.checkout.state}{" "}
              {order.checkout.postalCode}, {order.checkout.country}
            </p>
          </div>

          <div>
            <ul className="space-y-3 text-sm">
              {order.cart.lines.map((item) => (
                <li
                  key={item.merchandise.sku}
                  className="flex justify-between gap-4"
                >
                  <span className="text-neutral-600">
                    {item.quantity}× {item.merchandise.product.title}
                  </span>
                  <Price
                    amount={item.cost.totalAmount.amount}
                    currencyCode={item.cost.totalAmount.currencyCode}
                  />
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 font-medium">
              <span>Total</span>
              <Price
                amount={order.cart.cost.totalAmount.amount}
                currencyCode={order.cart.cost.totalAmount.currencyCode}
              />
            </div>
          </div>
        </div>
      ) : null}

      <Link
        href="/search/health-care"
        className="mt-10 inline-block rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
      >
        Continue shopping
      </Link>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <div className="mx-auto max-w-lg px-4 py-12 md:px-6 lg:px-8">
        <Suspense fallback={null}>
          <SuccessContent />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}
