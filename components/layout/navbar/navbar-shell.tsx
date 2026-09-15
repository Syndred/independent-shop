"use client";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { menu } from "lib/data/menu";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
export function NavbarShell() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="border-b border-border bg-background">
      <div className="container-site section-pad flex min-h-24 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Health Home Wholesale home"
          className="text-primary"
        >
          <span className="block font-serif text-xl font-semibold leading-tight">
            Health Home
          </span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.26em]">
            Wholesale · Shenzhen
          </span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 lg:flex"
        >
          {menu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              aria-current={pathname === item.path ? "page" : undefined}
              className="text-sm hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-3 text-xs font-semibold text-white sm:px-5 sm:text-sm"
            href="/contact"
          >
            Request quote{" "}
            <ArrowUpRight
              className="hidden sm:block"
              size={16}
              aria-hidden="true"
            />
          </Link>
          <button
            className="flex size-11 items-center justify-center lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Menu aria-hidden="true" />
          </button>
        </div>
      </div>
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <DialogPanel className="fixed inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-background p-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-serif text-2xl">Explore</DialogTitle>
            <button
              aria-label="Close menu"
              className="flex size-11 items-center justify-center"
              onClick={() => setOpen(false)}
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile navigation" className="mt-10 grid gap-2">
            {[...menu, { title: "Request a Quote", path: "/contact" }].map(
              (item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-4 text-lg"
                >
                  {item.title}
                </Link>
              ),
            )}
          </nav>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
