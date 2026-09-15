import { siteConfig, whatsappOrderUrl } from "lib/site-config";
import Link from "next/link";
export default function Footer() {
  const groups = [
    {
      title: "Product sourcing",
      links: [
        ["Blood pressure monitors", "/blood-pressure-monitor-wholesale"],
        ["Pulse oximeters", "/pulse-oximeter-wholesale"],
        ["Mesh nebulizers", "/mesh-nebulizer-supplier"],
      ],
    },
    {
      title: "Buying with us",
      links: [
        ["Low MOQ buying guide", "/low-moq-home-health-devices"],
        ["Company & supply chain", "/about"],
        ["Quality & documents", "/quality-compliance"],
        ["Shipping & order terms", "/shipping"],
      ],
    },
  ];
  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="container-site section-pad">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-2xl text-primary">
              Health Home Wholesale
            </p>
            <p className="mt-4 text-sm leading-6 text-ink-muted">
              Home health device sourcing through our Shenzhen supply chain.
              Product details and order terms confirmed by quote.
            </p>
          </div>
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-lg">{group.title}</h2>
              <ul className="mt-4 space-y-3 text-sm text-ink-muted">
                {group.links.map(([title, path]) => (
                  <li key={path}>
                    <Link href={path!} className="hover:underline">
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="text-lg">Talk to sales</h2>
            <div className="mt-4 grid gap-3 break-words text-sm text-ink-muted">
              <Link href="/contact">Request a Quote</Link>
              <a
                href={whatsappOrderUrl(
                  "Hi, I would like to discuss wholesale sourcing.",
                )}
              >
                WhatsApp +{siteConfig.whatsappNumber.replace(/\D/g, "")}
              </a>
              <a
                className="break-all"
                href={`mailto:${siteConfig.supportEmail}`}
              >
                {siteConfig.supportEmail}
              </a>
              <p>Shenzhen, Guangdong, China</p>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-border pt-6 text-xs text-ink-muted">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Inquiry terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
