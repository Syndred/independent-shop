import CartModal from "components/cart/modal";
import { siteConfig, whatsappOrderUrl } from "lib/site-config";
import Link from "next/link";

const navItems = [
  { title: "Shop", path: "/search/health-care" },
  { title: "Deals", path: "/search/seasonal-hot-deals" },
  { title: "Contact", path: "/#contact" },
];

export async function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-medium tracking-wide text-neutral-950"
        >
          {siteConfig.name}
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.path}
              className="text-sm text-neutral-500 transition hover:text-neutral-950"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <CartModal />
          <a
            href={whatsappOrderUrl(`Hi, I have a question about ${siteConfig.name}.`)}
            className="hidden rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-600 transition hover:border-neutral-950 hover:text-neutral-950 sm:inline-block"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </nav>
  );
}
