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

function hasRealValue(value: string | undefined): value is string {
  return Boolean(value && !value.includes("{{") && value.trim());
}

export function Footer({ site }: { site: SiteConfig }) {
  const brandName = hasRealValue(site.brand.name) ? site.brand.name : "BETOSTEP";
  const hasFounder = hasRealValue(site.brand.founder);
  const hasPhone = hasRealValue(site.contacts.phoneMain);
  const hasEmail = hasRealValue(site.contacts.email);
  const hasUnp = hasRealValue(site.legal.unp);
  const hasAddress = hasRealValue(site.contacts.address);
  const hasTelegram = hasRealValue(site.messengers.telegram) && site.messengers.telegram !== "#";
  const hasWhatsApp = hasRealValue(site.messengers.whatsapp) && site.messengers.whatsapp !== "#";
  const hasViber = hasRealValue(site.messengers.viber) && site.messengers.viber !== "#";
  const hasAnyContactLine =
    hasPhone || hasEmail || hasUnp || hasAddress || hasTelegram || hasWhatsApp || hasViber;

  return (
    <footer className="border-t border-white/10 bg-[#0b0d10] pb-20 pt-10 text-[#dddbd6] sm:pb-12">
      <div className="mx-auto grid w-full max-w-[1120px] gap-8 px-4 sm:grid-cols-[1.3fr_1fr_1fr] sm:px-6">
        <div>
          <p className="font-heading text-2xl uppercase text-ink">{brandName}</p>
          <p className="mt-3 max-w-sm text-sm text-[#bbb5aa]">{t(site.brand.tagline)}</p>
          {hasFounder ? (
            <p className="mt-4 text-sm text-[#bbb5aa]">
              {thf("founder_label")}: {site.brand.founder}
            </p>
          ) : null}
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
            {hasPhone ? (
              <li>
                {thf("phone_label")}: <a href={`tel:${site.contacts.phoneMain}`}>{site.contacts.phoneMain}</a>
              </li>
            ) : null}
            {hasEmail ? (
              <li>
                Email: <a href={`mailto:${site.contacts.email}`}>{site.contacts.email}</a>
              </li>
            ) : null}
            {hasUnp ? <li>{thf("unp_label")}: {site.legal.unp}</li> : null}
            {hasAddress ? <li>{site.contacts.address}</li> : null}
            {hasTelegram ? (
              <li>
                Telegram: <a href={site.messengers.telegram} target="_blank" rel="noreferrer">Telegram</a>
              </li>
            ) : null}
            {hasWhatsApp ? (
              <li>
                WhatsApp: <a href={site.messengers.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
              </li>
            ) : null}
            {hasViber ? (
              <li>
                Viber: <a href={site.messengers.viber} target="_blank" rel="noreferrer">Viber</a>
              </li>
            ) : null}
            {!hasAnyContactLine ? <li>{t("[TODO: заполните контактные данные в content/site.json]")}</li> : null}
          </ul>
        </div>
      </div>
    </footer>
  );
}
