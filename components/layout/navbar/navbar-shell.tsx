"use client";

import CartModal from "components/cart/modal";
import { siteConfig } from "lib/site-config";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { title: "Shop All", path: "/search" },
  { title: "Wholesale", path: "/pulse-oximeter-wholesale" },
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
    ? "whitespace-nowrap text-xs font-semibold uppercase tracking-[0.14em] text-white/90 transition hover:text-white lg:text-sm"
    : "whitespace-nowrap text-xs font-semibold uppercase tracking-[0.14em] text-foreground/80 transition hover:text-primary lg:text-sm";

  const iconClass = onLightHero
    ? "text-white/90 transition hover:text-white"
    : "text-foreground/80 transition hover:text-primary";

  const menuButtonClass = onLightHero
    ? "text-white md:hidden"
    : "text-foreground md:hidden";

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
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3 md:flex-none">
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
            <Link
              href="/"
              className="inline-flex shrink-0 items-center"
              aria-label={`${siteConfig.name} home`}
            >
              <Image
                src={
                  onLightHero
                    ? "/brand/health-home-wholesale-logo-light.svg"
                    : "/brand/health-home-wholesale-logo.svg"
                }
                alt={siteConfig.name}
                width={152}
                height={40}
                priority
                className="h-9 w-auto"
              />
            </Link>
          </div>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 md:flex lg:gap-7">
            {navItems.map((item) => (
              <Link key={item.title} href={item.path} className={linkClass}>
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-4 md:flex-none md:gap-6">
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
                <circle cx="11" cy="11" r="7" />
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
