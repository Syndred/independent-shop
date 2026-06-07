import Link from "next/link";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 text-sm text-neutral-500">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <div>
          <Link className="text-base font-semibold uppercase text-neutral-950" href="/">
            Independent Shop
          </Link>
          <p className="mt-2 max-w-md text-neutral-600">
            Health-first ecommerce for pulse oximeters, kids pulse oximeters, and seasonal add-ons.
          </p>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <a href="https://wa.me/0000000000" className="text-neutral-700 hover:text-neutral-950">
            WhatsApp support
          </a>
          <a href="mailto:support@independent-shop.com" className="text-neutral-700 hover:text-neutral-950">
            support@independent-shop.com
          </a>
          <p className="text-neutral-500">© {currentYear} Independent Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
