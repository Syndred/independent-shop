import { siteConfig, whatsappOrderUrl } from "lib/site-config";
import Link from "next/link";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-secondary pt-20 pb-10 text-secondary-foreground">
      <div className="container-site section-pad">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-6 font-serif text-lg">Shop</p>
            <ul className="space-y-3 text-sm text-secondary-foreground/80">
              <li>
                <Link
                  href="/search"
                  className="transition hover:text-foreground"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/search/health-care"
                  className="transition hover:text-foreground"
                >
                  Health & Care
                </Link>
              </li>
              <li>
                <Link
                  href="/search/seasonal-hot-deals"
                  className="transition hover:text-foreground"
                >
                  Seasonal Deals
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-6 font-serif text-lg">About</p>
            <ul className="space-y-3 text-sm text-secondary-foreground/80">
              <li>
                <Link
                  href="/#brand-story"
                  className="transition hover:text-foreground"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/#newsletter"
                  className="transition hover:text-foreground"
                >
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-6 font-serif text-lg">Support</p>
            <ul className="space-y-3 text-sm text-secondary-foreground/80">
              <li>
                <a
                  href={whatsappOrderUrl(`Hi, I have a question about ${siteConfig.name}.`)}
                  className="transition hover:text-foreground"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="transition hover:text-foreground"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-6 font-serif text-lg">Contact</p>
            <p className="text-sm leading-relaxed text-secondary-foreground/80">
              Elevating your daily health routine with reliable monitors and essentials.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-secondary-foreground/10 pt-8 md:flex-row">
          <p className="text-sm text-secondary-foreground/60">
            © {currentYear} {siteConfig.companyName}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-secondary-foreground/60">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
