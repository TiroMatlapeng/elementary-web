import Link from "next/link";

const COMPANY_LINKS = [
  { label: "About Elementary", href: "#about" },
  { label: "Our approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

const SERVICE_LINKS = [
  { label: "Software Engineering", href: "#services" },
  { label: "App Modernisation", href: "#services" },
  { label: "Cloud Migration", href: "#services" },
  { label: "Data Warehousing & Lakes", href: "#services" },
  { label: "Data Management", href: "#services" },
  { label: "BI & Analytics", href: "#services" },
  { label: "Data Virtualisation", href: "#services" },
];

const PRODUCT_LINKS = [
  { label: "Dickson App", href: "/dickson" },
  { label: "For homeowners", href: "/dickson#homeowners" },
  { label: "For tradespeople", href: "/dickson#tradespeople" },
  { label: "Join the waitlist", href: "/dickson#waitlist" },
];

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
        {heading}
      </h3>
      <ul className="flex flex-col gap-3">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-base border-t border-border">
      <div
        className="mx-auto px-6 pt-16 pb-10"
        style={{ maxWidth: "var(--width-content)" }}
      >
        {/* Four-column grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              className="flex items-center gap-2 font-display font-bold text-text-primary text-lg tracking-tight w-fit"
            >
              <span
                className="rounded-full bg-accent flex-shrink-0"
                style={{ width: 7, height: 7 }}
                aria-hidden="true"
              />
              Elementary
            </Link>
            <p className="text-sm text-text-muted leading-relaxed max-w-[220px]">
              Elementary Data &amp; Software Solutions. Engineering from the
              ground up.
            </p>
            {/* Built in South Africa badge */}
            <span className="inline-flex items-center gap-2 text-xs font-medium text-text-muted border border-border rounded-full px-3 py-1.5 w-fit">
              <span aria-hidden="true">🇿🇦</span>
              Built in South Africa
            </span>
          </div>

          <FooterColumn heading="Company" links={COMPANY_LINKS} />
          <FooterColumn heading="Services" links={SERVICE_LINKS} />
          <FooterColumn heading="Products" links={PRODUCT_LINKS} />
        </div>

        {/* Divider */}
        <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Elementary Data &amp; Software
            Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-text-muted hover:text-text-secondary transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-text-muted hover:text-text-secondary transition-colors duration-200"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
