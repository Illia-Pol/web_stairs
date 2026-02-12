const CONTACTS = {
  phoneDisplay: "+375 (00) 000-00-00",
  phoneLink: "+375000000000",
  telegram: "https://t.me/username",
  whatsapp: "https://wa.me/000000000000"
};

function setContactLinks() {
  const phoneLink = document.getElementById("phone-link");
  const telegramLink = document.getElementById("telegram-link");
  const whatsappLink = document.getElementById("whatsapp-link");

  phoneLink.textContent = CONTACTS.phoneDisplay;
  phoneLink.href = `tel:${CONTACTS.phoneLink}`;
  telegramLink.href = CONTACTS.telegram;
  whatsappLink.href = CONTACTS.whatsapp;
}

function initReveal() {
  const targets = document.querySelectorAll(".reveal-up");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  targets.forEach((target) => observer.observe(target));
}

function initCalc() {
  const form = document.getElementById("calc-form");
  const result = document.getElementById("calc-result");
  if (!form || !result) return;

  const baseByType = {
    standard: 950,
    floating: 1300,
    cantilever: 1650,
    complex: 2100
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const type = document.getElementById("stair-type").value;
    const steps = Number(document.getElementById("steps").value);
    const complexity = Number(document.getElementById("complexity").value);

    const base = baseByType[type] || baseByType.standard;
    const estimate = Math.round(base * steps * complexity);

    const low = Math.round(estimate * 0.9);
    const high = Math.round(estimate * 1.15);

    result.textContent = `Ориентировочный диапазон: ${low.toLocaleString("ru-RU")} - ${high.toLocaleString("ru-RU")} ₽ / BYN (после замера и ТЗ расчет уточняется).`;
  });
}

function initLeadForm() {
  const form = document.getElementById("lead-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const region = document.getElementById("region").value.trim();
    const message = document.getElementById("message").value.trim();

    const text = [
      "Новая заявка с сайта:",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Регион: ${region}`,
      `Комментарий: ${message || "-"}`
    ].join("\n");

    const url = `${CONTACTS.telegram}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

function initYear() {
  const yearNode = document.getElementById("year");
  if (yearNode) yearNode.textContent = new Date().getFullYear();
}

setContactLinks();
initReveal();
initCalc();
initLeadForm();
initYear();
