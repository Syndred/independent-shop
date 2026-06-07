import Link from "next/link";

const navItems = [
  { title: "Health & Care", path: "/search/health-care" },
  { title: "Hot Deals", path: "/search/seasonal-hot-deals" },
  { title: "Contact", path: "/#contact" },
];

export async function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold uppercase tracking-wide text-neutral-950">
          Independent Shop
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.title} href={item.path} className="text-sm text-neutral-600 hover:text-neutral-950">
              {item.title}
            </Link>
          ))}
        </div>
        <a
          href="https://wa.me/0000000000"
          className="rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-400"
        >
          WhatsApp
        </a>
      </div>
    </nav>
  );
}
