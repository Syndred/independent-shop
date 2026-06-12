"use client";

import CartModal from "components/cart/modal";
import { siteConfig } from "lib/site-config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { title: "Shop All", path: "/search" },
  { title: "Health & Care", path: "/search/health-care" },
  { title: "Deals", path: "/search/seasonal-hot-deals" },
  { title: "About", path: "/#brand-story" },
];

export function NavbarShell() {
  const pathname = usePathname();
  const onHomeHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const onLightHero = onHomeHero && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClass = onLightHero
    ? "text-sm font-medium uppercase tracking-wider text-white/90 transition hover:text-white"
    : "text-sm font-medium uppercase tracking-wider text-foreground/80 transition hover:text-primary";

  const iconClass = onLightHero
    ? "text-white/90 transition hover:text-white"
    : "text-foreground/80 transition hover:text-primary";

  const logoClass = onLightHero
    ? "font-serif text-xl tracking-widest text-white drop-shadow-sm md:text-2xl"
    : "font-serif text-xl tracking-widest text-foreground md:text-2xl";

  const menuButtonClass = onLightHero ? "text-white md:hidden" : "text-foreground md:hidden";

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-border bg-background/95 py-4 backdrop-blur-md"
          : onLightHero
            ? "bg-black/20 py-5 backdrop-blur-[2px]"
            : "border-b border-transparent bg-background/80 py-5 backdrop-blur-sm"
      }`}
    >
      <div className="container-site section-pad">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex items-center gap-6 md:gap-8">
            <button
              type="button"
              className={menuButtonClass}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>

            <nav className="hidden items-center gap-6 md:flex lg:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.path}
                  className={linkClass}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          <Link
            href="/"
            className={`${logoClass} text-center`}
          >
            {siteConfig.name.toUpperCase()}
          </Link>

          <div className="flex items-center justify-end gap-4 md:gap-6">
            <Link
              href="/search"
              className={`hidden sm:block ${iconClass}`}
              aria-label="Search"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                />
                <path d="M20 20l-3-3" />
              </svg>
            </Link>
            <CartModal light={onLightHero} />
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-background pt-24 transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="container-site section-pad flex flex-col gap-6">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.path}
              className="text-lg uppercase tracking-wider text-foreground"
              onClick={() => setMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
