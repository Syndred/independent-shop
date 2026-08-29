import { redirect } from "next/navigation";

export const metadata = {
  title: "Request a Wholesale Quote",
  description: "Wholesale orders are confirmed by quotation.",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
  redirect("/pulse-oximeter-wholesale");
}
