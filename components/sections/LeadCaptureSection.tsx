import { thls } from "@/lib/i18n-lead-section";
import type { Locale } from "@/lib/i18n";
import type { SiteConfig } from "@/lib/content/schemas";
import { cn } from "@/lib/cn";

type LeadCaptureSectionProps = {
  site: SiteConfig;
  locale: Locale;
  id?: string;
  className?: string;
  source: string;
};

function hasRealValue(value: string | undefined): value is string {
  return Boolean(value && !value.includes("{{") && value.trim());
}

export function LeadCaptureSection({ site, locale, id = "contact", className, source }: LeadCaptureSectionProps) {
  const tr = (key: Parameters<typeof thls>[0], tokens?: Record<string, string | number>) =>
    thls(key, tokens, locale);
  const hasPhone = hasRealValue(site.contacts.phoneMain);
  const hasEmail = hasRealValue(site.contacts.email);
  const hasAddress = hasRealValue(site.contacts.address);
  const hasAnyContacts = hasPhone || hasEmail || hasAddress;

  return (
    <section className={cn("section section-accent", className)} id={id}>
      <div className="container contact-grid lead-capture-grid">
        <article className="guarantee-card lead-capture-info-card">
          <p className="kicker">{tr("info_kicker")}</p>
          <h2 className="contact-title">{tr("info_title")}</h2>
          <p>{tr("info_text")}</p>

          <ul className="contacts-list">
            {hasPhone ? (
              <li>
                {tr("phone_label")}: <a href={`tel:${site.contacts.phoneMain}`}>{site.contacts.phoneMain}</a>
              </li>
            ) : null}
            {hasEmail ? (
              <li>
                {tr("email_label")}: <a href={`mailto:${site.contacts.email}`}>{site.contacts.email}</a>
              </li>
            ) : null}
            {hasAddress ? <li>{tr("address_label")}: {site.contacts.address}</li> : null}
            <li>{tr("regions_label")}: {tr("regions_value")}</li>
            {!hasAnyContacts ? <li>{tr("contacts_todo")}</li> : null}
          </ul>

          <div className="contact-links">
            <a id="phone-link" className="btn btn-small contact-link-btn" href={`tel:${site.contacts.phoneMain}`}>
              {site.contacts.phoneMain}
            </a>
            <a id="telegram-link" className="btn btn-small contact-link-btn" href={site.messengers.telegram} target="_blank" rel="noreferrer">
              Telegram
            </a>
            <a id="whatsapp-link" className="btn btn-small contact-link-btn" href={site.messengers.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a id="viber-link" className="btn btn-small contact-link-btn" href={site.messengers.viber} target="_blank" rel="noreferrer">
              Viber
            </a>
          </div>
        </article>

        <article className="guarantee-card lead-capture-form-card">
          <p className="kicker">{tr("form_kicker")}</p>
          <h2 className="contact-title">{tr("form_title")}</h2>
          <p>{tr("form_text")}</p>

          <form
            className="lead-form lead-form-flat"
            id="lead-form"
            noValidate
            data-lead-endpoint={site.leadEndpoint}
            data-lead-source={source}
            data-telegram-fallback-username={site.telegramFallback.username}
            data-telegram-fallback-url={site.telegramFallback.url}
            data-telegram-fallback-mode={site.telegramFallbackMode}
            data-msg-remove-photo-aria={tr("form_msg_remove_photo_aria")}
            data-msg-photo-added={tr("form_msg_photo_added")}
            data-msg-photo-invalid-type={tr("form_msg_photo_invalid_type")}
            data-msg-photo-too-large={tr("form_msg_photo_too_large")}
            data-msg-photo-max-count={tr("form_msg_photo_max_count")}
            data-msg-name-required={tr("form_msg_name_required")}
            data-msg-phone-required={tr("form_msg_phone_required")}
            data-msg-phone-invalid={tr("form_msg_phone_invalid")}
            data-msg-region-required={tr("form_msg_region_required")}
            data-msg-lead-title={tr("form_msg_lead_title")}
            data-msg-lead-name={tr("form_msg_lead_name")}
            data-msg-lead-phone={tr("form_msg_lead_phone")}
            data-msg-lead-region={tr("form_msg_lead_region")}
            data-msg-lead-messenger={tr("form_msg_lead_messenger")}
            data-msg-lead-comment={tr("form_msg_lead_comment")}
            data-msg-lead-files={tr("form_msg_lead_files")}
            data-msg-submit-success={tr("form_msg_submit_success")}
            data-msg-submit-error={tr("form_msg_submit_error")}
            data-msg-submit-fallback-btn={tr("form_msg_submit_fallback_btn")}
            data-msg-submit-copy-btn={tr("form_msg_submit_copy_btn")}
            data-msg-submit-copy-success={tr("form_msg_submit_copy_success")}
            data-msg-submit-sending={tr("form_msg_submit_sending")}
            data-msg-submit-default={tr("form_msg_submit_default")}
          >
            <div className="lead-form-grid">
              <label className="field">
                <span className="field-label">{tr("form_name")}</span>
                <input type="text" id="name" required />
                <span className="field-error" aria-live="polite" />
              </label>
              <label className="field">
                <span className="field-label">{tr("form_region")}</span>
                <input type="text" id="region" required />
                <span className="field-error" aria-live="polite" />
              </label>
              <label className="field">
                <span className="field-label">{tr("form_phone")}</span>
                <div className="phone-input-row">
                  <select id="phone-code" aria-label="Country code">
                    <option value="+375" defaultValue="+375">{tr("form_country_by")}</option>
                    <option value="+7">{tr("form_country_ru")}</option>
                    <option value="+48">{tr("form_country_pl")}</option>
                    <option value="+370">{tr("form_country_lt")}</option>
                    <option value="+371">{tr("form_country_lv")}</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    required
                    inputMode="tel"
                    autoComplete="tel-national"
                    placeholder={tr("form_phone_placeholder")}
                    pattern="[\d\s()\-]{6,20}"
                    title={tr("form_phone_title")}
                  />
                </div>
                <span className="field-error" aria-live="polite" />
              </label>
              <label className="field">
                <span className="field-label">{tr("form_messenger")}</span>
                <select id="messenger">
                  <option value="telegram">{tr("form_messenger_telegram")}</option>
                  <option value="whatsapp">{tr("form_messenger_whatsapp")}</option>
                  <option value="viber">{tr("form_messenger_viber")}</option>
                  <option value="call">{tr("form_messenger_call")}</option>
                </select>
              </label>
            </div>
            <label>
              {tr("form_message")}
              <textarea id="message" rows={4} placeholder={tr("form_message_placeholder")} />
            </label>
            <input id="honeypot" className="honeypot-field" type="text" autoComplete="off" tabIndex={-1} aria-hidden="true" />

            <div className="photo-picker-row">
              <input id="photo-files" className="photo-input" type="file" accept="image/*" multiple />
              <button type="button" className="photo-add-tile" id="photo-add-btn" aria-label={tr("form_add_photo_aria")}>
                +
              </button>
              <div className="photo-preview-strip" id="photo-preview-strip" aria-live="polite" />
            </div>
            <p className="photo-picker-note">{tr("form_add_photo_hint")}</p>
            <p className="photo-picker-status" id="photo-picker-status" aria-live="polite" />

            <div className="lead-form-actions">
              <button type="submit" className="btn full">{tr("form_submit")}</button>
            </div>
            <div className="lead-submit-status" id="lead-submit-status" aria-live="polite" />
            <p className="form-note">
              {tr("form_policy_prefix")} <a className="inline-link" href="/privacy">{tr("form_policy_link")}</a>.
            </p>
          </form>
        </article>
      </div>
    </section>
  );
}
