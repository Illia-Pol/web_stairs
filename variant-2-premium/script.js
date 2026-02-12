const CONTACTS = {
  phoneDisplay: "+375 (00) 000-00-00",
  phoneLink: "+375000000000",
  telegram: "https://t.me/username",
  whatsapp: "https://wa.me/000000000000"
};

function initReveal() {
  const blocks = document.querySelectorAll(".reveal");
  if (!blocks.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.22 }
  );

  blocks.forEach((el) => observer.observe(el));
}

function setContacts() {
  const phone = document.getElementById("phone-link");
  const tg = document.getElementById("telegram-link");
  const wa = document.getElementById("whatsapp-link");

  if (phone) {
    phone.textContent = CONTACTS.phoneDisplay;
    phone.href = `tel:${CONTACTS.phoneLink}`;
  }
  if (tg) tg.href = CONTACTS.telegram;
  if (wa) wa.href = CONTACTS.whatsapp;
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

    const payload = [
      "Новая премиальная заявка:",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Город: ${city}`,
      `Запрос: ${message || "-"}`
    ].join("\n");

    const link = `${CONTACTS.telegram}?text=${encodeURIComponent(payload)}`;
    window.open(link, "_blank", "noopener,noreferrer");
  });
}

function setYear() {
  const yearNode = document.getElementById("year");
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());
}

setContacts();
initReveal();
initLeadForm();
setYear();
