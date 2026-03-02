import Link from "next/link";

import type { SiteConfig } from "@/lib/content/schemas";
import { thf } from "@/lib/i18n-footer";
import { t } from "@/lib/i18n";

const links = [
  { href: "/portfolio", label: thf("link_portfolio") },
  { href: "/prices", label: thf("link_prices") },
  { href: "/questions", label: thf("link_questions") },
  { href: "/vlog", label: thf("link_vlog") },
  { href: "/contacts", label: thf("link_contacts") },
  { href: "/privacy", label: thf("privacy_label") }
];

export function Footer({ site }: { site: SiteConfig }) {
  return (
    <footer className="border-t border-white/10 bg-[#0b0d10] pb-20 pt-10 text-[#dddbd6] sm:pb-12">
      <div className="mx-auto grid w-full max-w-[1120px] gap-8 px-4 sm:grid-cols-[1.3fr_1fr_1fr] sm:px-6">
        <div>
          <p className="font-heading text-2xl uppercase text-ink">{site.brand.name}</p>
          <p className="mt-3 max-w-sm text-sm text-[#bbb5aa]">{t(site.brand.tagline)}</p>
          <p className="mt-4 text-sm text-[#bbb5aa]">
            {thf("founder_label")}: {site.brand.founder}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#bbb5aa]">{thf("navigation_title")}</p>
          <ul className="mt-3 space-y-2 text-sm text-[#dddbd6]">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#bbb5aa]">{thf("contacts_title")}</p>
          <ul className="mt-3 space-y-2 text-sm text-[#dddbd6]">
            <li>
              {thf("phone_label")}: <a href={`tel:${site.contacts.phoneMain}`}>{site.contacts.phoneMain}</a>
            </li>
            <li>
              Email: <a href={`mailto:${site.contacts.email}`}>{site.contacts.email}</a>
            </li>
            <li>{thf("unp_label")}: {site.legal.unp}</li>
            <li>{site.contacts.address}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
