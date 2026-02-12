const CONTACTS = {
  phoneDisplay: "+375 (00) 000-00-00",
  phoneLink: "+375000000000",
  telegram: "https://t.me/username",
  whatsapp: "https://wa.me/000000000000"
};

function setContacts() {
  const phoneLink = document.getElementById("phone-link");
  const telegramLink = document.getElementById("telegram-link");
  const whatsappLink = document.getElementById("whatsapp-link");

  if (phoneLink) {
    phoneLink.textContent = CONTACTS.phoneDisplay;
    phoneLink.href = `tel:${CONTACTS.phoneLink}`;
  }

  if (telegramLink) telegramLink.href = CONTACTS.telegram;
  if (whatsappLink) whatsappLink.href = CONTACTS.whatsapp;
}

function initReveal() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  nodes.forEach((node) => observer.observe(node));
}

function initLeadForm() {
  const form = document.getElementById("lead-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const city = document.getElementById("city").value.trim();
    const message = document.getElementById("message").value.trim();

    const leadText = [
      "Новая заявка (premium dark):",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Город: ${city}`,
      `Комментарий: ${message || "-"}`
    ].join("\n");

    const target = `${CONTACTS.telegram}?text=${encodeURIComponent(leadText)}`;
    window.open(target, "_blank", "noopener,noreferrer");
  });
}

function setYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

setContacts();
initReveal();
initLeadForm();
setYear();
