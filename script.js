const CONTACTS = Object.assign(
  {
    PHONE_E164: "+375296512022",
    PHONE_DISPLAY: "+375 (29) 651 20 22",
    TELEGRAM_LINK: "https://t.me/Sokolmaxxx",
    WHATSAPP_LINK: "https://wa.me/375296512022",
    VIBER_LINK: "viber://chat?number=%2B375296512022",
    INSTAGRAM_LINK: "https://www.instagram.com/betostep?igsh=cGQ0MjBzNzJ6cXlv"
  },
  window.BETOSTEP_CONTACTS || {}
);

function setContactLinks() {
  const phoneLink = document.getElementById("phone-link");
  const consultPhoneLink = document.getElementById("phone-consult-link");
  const telegramLink = document.getElementById("telegram-link");
  const whatsappLink = document.getElementById("whatsapp-link");
  const viberLink = document.getElementById("viber-link");
  const instagramLink = document.getElementById("instagram-link");

  if (phoneLink) {
    phoneLink.textContent = CONTACTS.PHONE_DISPLAY;
    phoneLink.href = `tel:${CONTACTS.PHONE_E164}`;
  }
  if (consultPhoneLink) {
    consultPhoneLink.textContent = CONTACTS.PHONE_DISPLAY;
    consultPhoneLink.href = `tel:${CONTACTS.PHONE_E164}`;
  }
  if (telegramLink) telegramLink.href = CONTACTS.TELEGRAM_LINK;
  if (whatsappLink) whatsappLink.href = CONTACTS.WHATSAPP_LINK;
  if (viberLink) viberLink.href = CONTACTS.VIBER_LINK;
  if (instagramLink) instagramLink.href = CONTACTS.INSTAGRAM_LINK;
}

function initNavDropdowns() {
  const dropdowns = Array.from(document.querySelectorAll(".nav-dropdown"));
  if (!dropdowns.length) return;

  const closeAll = () => {
    dropdowns.forEach((dropdown) => dropdown.classList.remove("is-open"));
  };

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".nav-toggle");
    if (!button) return;
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const isOpen = dropdown.classList.contains("is-open");
      closeAll();
      if (!isOpen) dropdown.classList.add("is-open");
    });
  });

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    if (!event.target.closest(".nav-dropdown")) closeAll();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAll();
  });
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
  const phoneCodeField = document.getElementById("phone-code");
  const phoneField = document.getElementById("phone");

  const phoneFormats = {
    "+375": "29 123-45-67",
    "+7": "999 123-45-67",
    "+48": "123 456 789",
    "+370": "612 34567",
    "+371": "22 123 456"
  };

  const phoneDigitsByCode = {
    "+375": 9,
    "+7": 10,
    "+48": 9,
    "+370": 8,
    "+371": 8
  };

  const updatePhoneFormat = () => {
    if (!phoneField || !phoneCodeField) return;
    const code = phoneCodeField.value;
    const sample = phoneFormats[code] || "123 456 789";
    phoneField.placeholder = sample;
  };

  updatePhoneFormat();
  if (phoneCodeField) phoneCodeField.addEventListener("change", updatePhoneFormat);

  const requiredFields = [
    { id: "name", message: "Введите имя" },
    {
      id: "phone",
      message: "Введите телефон",
      invalidMessage: "Введите корректный номер",
      validate: (value) => {
        const localDigits = value.replace(/\D/g, "");
        const code = phoneCodeField ? phoneCodeField.value : "+375";
        const expectedLocalLength = phoneDigitsByCode[code] || 9;
        return localDigits.length === expectedLocalLength;
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
    const localPhone = document.getElementById("phone").value.trim();
    const phoneCode = phoneCodeField ? phoneCodeField.value : "";
    const phone = localPhone.startsWith("+") ? localPhone : `${phoneCode} ${localPhone}`.trim();
    const region = document.getElementById("region").value.trim();
    const message = document.getElementById("message").value.trim();

    const text = [
      "Новая заявка с сайта:",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Регион: ${region}`,
      `Комментарий: ${message || "-"}`
    ].join("\n");

    const url = `${CONTACTS.TELEGRAM_LINK}?text=${encodeURIComponent(text)}`;
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

function initCatalogGallery() {
  const cards = document.querySelectorAll(".type-card[data-gallery]");
  if (!cards.length) return;

  const modal = document.getElementById("catalog-modal");
  const modalImg = document.getElementById("catalog-modal-image");
  const caption = document.getElementById("catalog-caption");
  const prevBtn = document.getElementById("catalog-prev");
  const nextBtn = document.getElementById("catalog-next");
  if (!modal || !modalImg || !caption || !prevBtn || !nextBtn) return;

  let activeSlides = [];
  let activeTitle = "";
  let currentIndex = 0;

  const renderModal = () => {
    const src = activeSlides[currentIndex];
    if (!src) return;
    modalImg.src = src;
    caption.textContent = `${activeTitle} · Фото ${currentIndex + 1} из ${activeSlides.length}`;
  };

  const openModal = (slides, title) => {
    activeSlides = slides;
    activeTitle = title;
    currentIndex = 0;
    renderModal();
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const step = (delta) => {
    if (!activeSlides.length) return;
    currentIndex = (currentIndex + delta + activeSlides.length) % activeSlides.length;
    renderModal();
  };

  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));
  modal.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.dataset.close === "true") {
      closeModal();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("is-open")) return;
    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  });

  cards.forEach((card) => {
    const title = card.querySelector("h3")?.textContent?.trim() || "Лестница";
    const raw = card.dataset.gallery || "";
    const gallery = raw.split("|").map((item) => item.trim()).filter(Boolean);
    if (!gallery.length) return;

    const dots = card.querySelector(".type-dots");
    if (dots && !dots.querySelector(".type-open-btn")) {
      const openBtn = document.createElement("button");
      openBtn.type = "button";
      openBtn.className = "type-open-btn";
      openBtn.textContent = "Открыть фото";
      dots.appendChild(openBtn);
      openBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        openModal(gallery, title);
      });
    }

    card.addEventListener("click", () => openModal(gallery, title));
  });
}

function initCatalogPrefetch() {
  const section = document.getElementById("types");
  if (!section) return;
  const cards = section.querySelectorAll(".type-card[data-gallery]");
  if (!cards.length) return;

  const preload = () => {
    cards.forEach((card) => {
      const raw = card.dataset.gallery || "";
      const gallery = raw.split("|").map((item) => item.trim()).filter(Boolean);
      gallery.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const isVisible = entries.some((entry) => entry.isIntersecting);
      if (!isVisible) return;
      preload();
      observer.disconnect();
    },
    { rootMargin: "200px 0px", threshold: 0.1 }
  );

  observer.observe(section);
}

setContactLinks();
initReveal();
initLeadForm();
initFaq();
initCatalogGallery();
initCatalogPrefetch();
initNavDropdowns();
initYear();
