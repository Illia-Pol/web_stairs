"use client";

import { PriceEstimator } from "@/components/home/PriceEstimator";
import { thpr } from "@/lib/i18n-home-prices";

const priceCards = [
  {
    nameKey: "price_classic_name" as const,
    noteKey: "price_classic_note" as const,
    href: "/prices/tariffs/classic"
  },
  {
    nameKey: "price_signature_name" as const,
    noteKey: "price_signature_note" as const,
    href: "/prices/tariffs/signature"
  }
];

export function HomePricesSection() {
  return (
    <section className="section section-dark" id="prices">
      <div className="container">
        <div className="section-head reveal-up">
          <p className="kicker">{thpr("prices_kicker")}</p>
          <h2>{thpr("prices_title")}</h2>
        </div>

        <div className="prices-wrap">
          <div className="price-grid tariff-grid">
            {priceCards.map((card, index) => (
              <a
                key={card.nameKey}
                className={`price-card price-card-link reveal-up ${index === 1 ? "delay-1" : ""}`.trim()}
                href={card.href}
              >
                <p className="price-label">{thpr(card.nameKey)}</p>
                <p className="price-note">{thpr(card.noteKey)}</p>
              </a>
            ))}
          </div>

          <PriceEstimator />
        </div>
      </div>
    </section>
  );
}
