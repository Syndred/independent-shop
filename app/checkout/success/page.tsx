import { redirect } from "next/navigation";

export const metadata = {
  title: "Request a Wholesale Quote",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  redirect("/pulse-oximeter-wholesale");
}
