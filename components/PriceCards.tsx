import { Card } from "@/components/ui/Card";
import type { SiteConfig } from "@/lib/content/schemas";

export function PriceCards({ site }: { site: SiteConfig }) {
  const cards = [
    {
      name: "Standard",
      value: site.pricing.standardFrom,
      text: "Рациональные решения с прозрачной сметой и предсказуемыми сроками."
    },
    {
      name: "Mid",
      value: site.pricing.midRange,
      text: "Проекты средней сложности с повышенными требованиями к геометрии и деталям."
    },
    {
      name: "Signature",
      value: site.pricing.signatureFrom,
      text: "Сложные инженерные узлы, премиальная архитектура и сопровождение под ключ."
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.name} className="border-slate-200 bg-white">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{card.name}</p>
          <p className="mt-3 font-heading text-3xl uppercase text-coal">{card.value}</p>
          <p className="mt-3 text-sm text-slate-600">{card.text}</p>
        </Card>
      ))}
    </div>
  );
}
