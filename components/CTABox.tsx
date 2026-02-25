import { ModalLeadForm } from "@/components/ModalLeadForm";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { SiteConfig } from "@/lib/content/schemas";

type CTABoxProps = {
  site: SiteConfig;
  title?: string;
  description?: string;
  source?: string;
};

export function CTABox({
  site,
  title = "Получите расчет по вашему объекту",
  description = "Отправьте план/фото в мессенджер или оставьте заявку через форму.",
  source = "ctabox"
}: CTABoxProps) {
  return (
    <Card className="bg-coal text-white shadow-card">
      <div className="grid gap-6 sm:grid-cols-[1.5fr_1fr] sm:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-bronze">Главный CTA</p>
          <h3 className="mt-2 font-heading text-3xl uppercase">{title}</h3>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">{description}</p>
          <p className="mt-3 text-xs text-slate-400">{site.disclaimer}</p>
        </div>

        <div className="flex flex-col gap-3">
          <ButtonLink href={site.messengers.telegram} target="_blank" rel="noreferrer" className="w-full">
            Отправить план/фото (Telegram)
          </ButtonLink>
          <div className="grid grid-cols-2 gap-2">
            <ButtonLink href={site.messengers.whatsapp} target="_blank" rel="noreferrer" variant="ghost" className="w-full border-white/25 text-white hover:bg-white/10">
              WhatsApp
            </ButtonLink>
            <ButtonLink href={site.messengers.viber} target="_blank" rel="noreferrer" variant="ghost" className="w-full border-white/25 text-white hover:bg-white/10">
              Viber
            </ButtonLink>
          </div>
          <ModalLeadForm triggerLabel="Оставить заявку" source={source} />
        </div>
      </div>
    </Card>
  );
}
