"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { formatCurrency } from "@/lib/constants/currency";
import type { HomePricesLocaleKey } from "@/lib/i18n-home-prices";
import { thpr } from "@/lib/i18n-home-prices";
import { assetPath } from "@/lib/paths";

type StairType =
  | "straight"
  | "l_landing"
  | "u_landing"
  | "l_winder"
  | "u_winder"
  | "half_spiral"
  | "spiral"
  | "porch";

type BottomType = "smooth" | "mirrored" | "floating";

type StairOption = {
  value: StairType;
  labelKey: HomePricesLocaleKey;
  descriptionKey: HomePricesLocaleKey;
  image: string;
  multiplier: number;
};

type BottomOption = {
  value: BottomType;
  labelKey: HomePricesLocaleKey;
  descriptionKey: HomePricesLocaleKey;
  image: string;
  ratePerCm: number;
};

const MIN_PRICE_BYN = 2700;

const STAIR_OPTIONS: StairOption[] = [
  {
    value: "straight",
    labelKey: "calc_stair_straight",
    descriptionKey: "calc_stair_desc_straight",
    image: "/assets/catalog/catalog-1.png",
    multiplier: 1
  },
  {
    value: "l_landing",
    labelKey: "calc_stair_l_landing",
    descriptionKey: "calc_stair_desc_l_landing",
    image: "/assets/catalog/catalog-2.png",
    multiplier: 1.08
  },
  {
    value: "u_landing",
    labelKey: "calc_stair_u_landing",
    descriptionKey: "calc_stair_desc_u_landing",
    image: "/assets/catalog/catalog-3.png",
    multiplier: 1.14
  },
  {
    value: "l_winder",
    labelKey: "calc_stair_l_winder",
    descriptionKey: "calc_stair_desc_l_winder",
    image: "/assets/catalog/catalog-4.png",
    multiplier: 1.11
  },
  {
    value: "u_winder",
    labelKey: "calc_stair_u_winder",
    descriptionKey: "calc_stair_desc_u_winder",
    image: "/assets/catalog/catalog-5.png",
    multiplier: 1.17
  },
  {
    value: "half_spiral",
    labelKey: "calc_stair_half_spiral",
    descriptionKey: "calc_stair_desc_half_spiral",
    image: "/assets/catalog/catalog-6.png",
    multiplier: 1.22
  },
  {
    value: "spiral",
    labelKey: "calc_stair_spiral",
    descriptionKey: "calc_stair_desc_spiral",
    image: "/assets/catalog/catalog-7.png",
    multiplier: 1.28
  },
  {
    value: "porch",
    labelKey: "calc_stair_porch",
    descriptionKey: "calc_stair_desc_porch",
    image: "/assets/catalog/catalog-8.png",
    multiplier: 0.84
  }
];

const BOTTOM_OPTIONS: BottomOption[] = [
  {
    value: "smooth",
    labelKey: "calc_type_smooth",
    descriptionKey: "calc_type_desc_smooth",
    image: "/assets/calculator/bottom-smooth.png",
    ratePerCm: 9.2
  },
  {
    value: "mirrored",
    labelKey: "calc_type_mirrored",
    descriptionKey: "calc_type_desc_mirrored",
    image: "/assets/calculator/bottom-mirrored.png",
    ratePerCm: 10.2
  },
  {
    value: "floating",
    labelKey: "calc_type_floating",
    descriptionKey: "calc_type_desc_floating",
    image: "/assets/calculator/bottom-floating.png",
    ratePerCm: 12.2
  }
];

function parseHeightCm(raw: string): number {
  const normalized = raw.replace(",", ".").trim();
  const value = Number(normalized);
  if (!Number.isFinite(value) || value <= 0) return 0;
  return value;
}

export function PriceEstimator() {
  const [stairType, setStairType] = useState<StairType | null>(null);
  const [bottomType, setBottomType] = useState<BottomType | null>(null);
  const [heightCm, setHeightCm] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStairMenuOpen, setIsStairMenuOpen] = useState(false);
  const [isBottomMenuOpen, setIsBottomMenuOpen] = useState(false);

  const stairDropdownRef = useRef<HTMLDivElement | null>(null);
  const bottomDropdownRef = useRef<HTMLDivElement | null>(null);

  const selectedStair = stairType ? STAIR_OPTIONS.find((option) => option.value === stairType) ?? null : null;
  const selectedBottom = bottomType ? BOTTOM_OPTIONS.find((option) => option.value === bottomType) ?? null : null;

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (stairDropdownRef.current && !stairDropdownRef.current.contains(target)) {
        setIsStairMenuOpen(false);
      }
      if (bottomDropdownRef.current && !bottomDropdownRef.current.contains(target)) {
        setIsBottomMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    if (!selectedStair || !selectedBottom) {
      setIsLoading(false);
      setResult(null);
      return;
    }

    const height = parseHeightCm(heightCm);
    if (!height) {
      setIsLoading(false);
      setResult(null);
      return;
    }

    setIsLoading(true);

    const timer = window.setTimeout(() => {
      const rawTotal = height * selectedBottom.ratePerCm * selectedStair.multiplier;
      const total = Math.max(MIN_PRICE_BYN, Math.round(rawTotal));
      setResult(formatCurrency(total, "BYN"));
      setIsLoading(false);
    }, 760);

    return () => window.clearTimeout(timer);
  }, [heightCm, selectedBottom, selectedStair]);

  return (
    <article className="calculator-card reveal-up">
      <p className="kicker">{thpr("calculator_kicker")}</p>
      <h3>{thpr("calculator_title")}</h3>
      <p>{thpr("calculator_note")}</p>
      <p className="calc-signature-hint">
        {thpr("calculator_signature_hint")}{" "}
        <a className="inline-link" href="#contact">{thpr("calculator_signature_link")}</a>.
      </p>

      <div className="calc-form">
        <label className="calc-field">
          <span className="calc-label">{thpr("calc_label_stair_type")}</span>
          <div className="calc-type-select" ref={stairDropdownRef}>
            <button
              type="button"
              className="calc-type-trigger"
              onClick={() => setIsStairMenuOpen((prev) => !prev)}
              aria-expanded={isStairMenuOpen}
              aria-haspopup="listbox"
            >
              {selectedStair ? (
                <span className="calc-choice-card calc-choice-card-stair is-active is-static">
                  <span className="calc-choice-media">
                    <Image src={assetPath(selectedStair.image)} alt={thpr(selectedStair.labelKey)} width={40} height={30} />
                  </span>
                  <span>
                    <strong>{thpr(selectedStair.labelKey)}</strong>
                    <small>{thpr(selectedStair.descriptionKey)}</small>
                  </span>
                </span>
              ) : (
                <span className="calc-type-placeholder">{thpr("calc_select_stair_placeholder")}</span>
              )}
              <span className={`calc-type-arrow ${isStairMenuOpen ? "is-open" : ""}`}>▾</span>
            </button>

            <div className={`calc-type-menu calc-type-menu-stairs ${isStairMenuOpen ? "is-open" : ""}`} role="listbox">
              {STAIR_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`calc-choice-card calc-choice-card-stair ${option.value === stairType ? "is-active" : ""}`}
                  onClick={() => {
                    setStairType(option.value);
                    setIsStairMenuOpen(false);
                  }}
                >
                  <span className="calc-choice-media">
                    <Image src={assetPath(option.image)} alt={thpr(option.labelKey)} width={40} height={30} />
                  </span>
                  <span>
                    <strong>{thpr(option.labelKey)}</strong>
                    <small>{thpr(option.descriptionKey)}</small>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </label>

        <label className="calc-field">
          <span className="calc-label">{thpr("calc_label_bottom_type")}</span>
          <div className="calc-type-select" ref={bottomDropdownRef}>
            <button
              type="button"
              className="calc-type-trigger"
              onClick={() => setIsBottomMenuOpen((prev) => !prev)}
              aria-expanded={isBottomMenuOpen}
              aria-haspopup="listbox"
            >
              {selectedBottom ? (
                <span className="calc-choice-card is-active is-static">
                  <span className="calc-choice-media">
                    <Image src={assetPath(selectedBottom.image)} alt={thpr(selectedBottom.labelKey)} width={64} height={40} />
                  </span>
                  <span>
                    <strong>{thpr(selectedBottom.labelKey)}</strong>
                    <small>{thpr(selectedBottom.descriptionKey)}</small>
                  </span>
                </span>
              ) : (
                <span className="calc-type-placeholder">{thpr("calc_select_bottom_placeholder")}</span>
              )}
              <span className={`calc-type-arrow ${isBottomMenuOpen ? "is-open" : ""}`}>▾</span>
            </button>

            <div className={`calc-type-menu calc-type-menu-bottom ${isBottomMenuOpen ? "is-open" : ""}`} role="listbox">
              {BOTTOM_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`calc-choice-card ${option.value === bottomType ? "is-active" : ""}`}
                  onClick={() => {
                    setBottomType(option.value);
                    setIsBottomMenuOpen(false);
                  }}
                >
                  <span className="calc-choice-media">
                    <Image src={assetPath(option.image)} alt={thpr(option.labelKey)} width={64} height={40} />
                  </span>
                  <span>
                    <strong>{thpr(option.labelKey)}</strong>
                    <small>{thpr(option.descriptionKey)}</small>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </label>

        <label className="calc-field">
          <span className="calc-label">{thpr("calc_label_height")}</span>
          <input
            type="number"
            step={1}
            value={heightCm}
            onChange={(event) => setHeightCm(event.target.value)}
            placeholder={thpr("calc_placeholder_height")}
          />
        </label>
      </div>

      <div className={`calc-result calc-result-live ${isLoading ? "is-loading" : ""}`}>
        <p className="calc-result-title">{thpr("calc_result_title")}</p>
        {isLoading ? (
          <div className="calc-result-skeleton" aria-hidden="true" />
        ) : result ? (
          <p className="calc-result-value">{thpr("calc_result_value", { VALUE: result })}</p>
        ) : (
          <p className="calc-result-empty">{thpr("calc_result_empty")}</p>
        )}
        <p className="calc-result-note">
          {thpr("calc_result_note")}{" "}
          <a className="inline-link" href="#contact">{thpr("calc_result_link_text")}</a>.
        </p>
      </div>
    </article>
  );
}
