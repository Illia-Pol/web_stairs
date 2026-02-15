const CONTACTS = {
  phoneDisplay: "+375 (29) 651 20 22",
  phoneLink: "+375296512022",
  telegram: "https://t.me/Sokolmaxxx",
  whatsapp: "https://wa.me/375296512022",
  viber: "viber://chat?number=%2B375296512022",
  instagram: "https://www.instagram.com/bettolestnica.by/"
};

function setContactLinks() {
  const phoneLink = document.getElementById("phone-link");
  const telegramLink = document.getElementById("telegram-link");
  const whatsappLink = document.getElementById("whatsapp-link");
  const viberLink = document.getElementById("viber-link");
  const instagramLink = document.getElementById("instagram-link");

  if (phoneLink) {
    phoneLink.textContent = CONTACTS.phoneDisplay;
    phoneLink.href = `tel:${CONTACTS.phoneLink}`;
  }
  if (telegramLink) telegramLink.href = CONTACTS.telegram;
  if (whatsappLink) whatsappLink.href = CONTACTS.whatsapp;
  if (viberLink) viberLink.href = CONTACTS.viber;
  if (instagramLink) instagramLink.href = CONTACTS.instagram;
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
initLeadForm();
initYear();
