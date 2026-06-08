import { siteConfig, whatsappOrderUrl } from "lib/site-config";
import Link from "next/link";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <Link
          className="font-medium text-neutral-950"
          href="/"
        >
          {siteConfig.name}
        </Link>
        <div className="flex flex-wrap gap-6">
          <a
            href={whatsappOrderUrl(`Hi, I have a question about ${siteConfig.name}.`)}
            className="transition hover:text-neutral-950"
          >
            WhatsApp
          </a>
          <a
            href={`mailto:${siteConfig.supportEmail}`}
            className="transition hover:text-neutral-950"
          >
            Email
          </a>
        </div>
        <p>© {currentYear}</p>
      </div>
    </footer>
  );
}
