const CONTACTS = {
  phoneDisplay: "+375 (29) 651 20 22",
  phoneLink: "+375296512022",
  telegram: "https://t.me/Sokolmaxxx",
  whatsapp: "https://wa.me/375296512022",
  viber: "viber://chat?number=%2B375296512022",
  instagram: "https://www.instagram.com/betostep?igsh=cGQ0MjBzNzJ6cXlv"
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

  const requiredFields = [
    { id: "name", message: "Введите имя" },
    {
      id: "phone",
      message: "Введите телефон",
      invalidMessage: "Введите корректный номер",
      validate: (value) => {
        const digits = value.replace(/\\D/g, "");
        return digits.length >= 9 && digits.length <= 15;
      }
    },
    { id: "region", message: "Введите город / регион" }
  ];

  const getFieldLabel = (field) => field.closest(".field");

  const showError = (field, message) => {
    const label = getFieldLabel(field);
    if (!label) return;
    const error = label.querySelector(".field-error");
    if (error) error.textContent = message;
    label.classList.add("has-error");
  };

  const clearError = (field) => {
    const label = getFieldLabel(field);
    if (!label) return;
    const error = label.querySelector(".field-error");
    if (error) error.textContent = "";
    label.classList.remove("has-error");
  };

  const validateField = (field, message, validator, invalidMessage) => {
    if (!field.value.trim()) {
      showError(field, message);
      return false;
    }
    if (validator && !validator(field.value)) {
      showError(field, invalidMessage || message);
      return false;
    }
    clearError(field);
    return true;
  };

  requiredFields.forEach(({ id, message, validate, invalidMessage }) => {
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener("input", () => validateField(field, message, validate, invalidMessage));
    field.addEventListener("blur", () => validateField(field, message, validate, invalidMessage));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;
    let firstInvalid = null;

    requiredFields.forEach(({ id, message, validate, invalidMessage }) => {
      const field = document.getElementById(id);
      if (!field) return;
      const fieldValid = validateField(field, message, validate, invalidMessage);
      if (!fieldValid && !firstInvalid) {
        firstInvalid = field;
      }
      isValid = isValid && fieldValid;
    });

    if (!isValid) {
      if (firstInvalid) firstInvalid.focus();
      return;
    }

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

function initFaq() {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach((item) => {
    const answer = item.querySelector(".faq-answer");
    if (!answer) return;

    if (item.open) {
      answer.style.height = `${answer.scrollHeight}px`;
    } else {
      answer.style.height = "0px";
    }

    item.addEventListener("toggle", () => {
      if (item.open) {
        answer.style.height = "0px";
        requestAnimationFrame(() => {
          answer.style.height = `${answer.scrollHeight}px`;
        });
      } else {
        answer.style.height = `${answer.scrollHeight}px`;
        requestAnimationFrame(() => {
          answer.style.height = "0px";
        });
      }
    });

    answer.addEventListener("transitionend", (event) => {
      if (event.propertyName !== "height") return;
      if (item.open) {
        answer.style.height = "auto";
      }
    });
  });
}

function initYear() {
  const yearNode = document.getElementById("year");
  if (yearNode) yearNode.textContent = new Date().getFullYear();
}

setContactLinks();
initReveal();
initLeadForm();
initFaq();
initYear();
