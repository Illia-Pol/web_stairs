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
  const phoneCodeField = document.getElementById("phone-code");
  const phoneField = document.getElementById("phone");
  const photoInput = document.getElementById("photo-files");
  const photoAddBtn = document.getElementById("photo-add-btn");
  const photoPreviewStrip = document.getElementById("photo-preview-strip");
  const photoPickerStatus = document.getElementById("photo-picker-status");

  const MAX_PHOTO_COUNT = 8;
  const MAX_PHOTO_SIZE_BYTES = 10 * 1024 * 1024;
  let selectedPhotos = [];
  let previewUrls = [];

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

  const setPhotoStatus = (message = "", isError = false) => {
    if (!photoPickerStatus) return;
    photoPickerStatus.textContent = message;
    photoPickerStatus.classList.toggle("is-error", Boolean(isError));
  };

  const renderPhotoPreviews = () => {
    if (!photoPreviewStrip) return;

    previewUrls.forEach((url) => URL.revokeObjectURL(url));
    previewUrls = [];
    photoPreviewStrip.innerHTML = "";

    selectedPhotos.forEach((file, index) => {
      const tile = document.createElement("div");
      tile.className = "photo-preview-tile";

      const img = document.createElement("img");
      const src = URL.createObjectURL(file);
      previewUrls.push(src);
      img.src = src;
      img.alt = `Фото ${index + 1}`;

      tile.appendChild(img);
      photoPreviewStrip.appendChild(tile);
    });
  };

  const addPhotos = (incomingFiles) => {
    if (!incomingFiles || !incomingFiles.length) return;

    const issues = [];

    Array.from(incomingFiles).forEach((file) => {
      if (!file.type || !file.type.startsWith("image/")) {
        issues.push(`Файл "${file.name}" пропущен: нужен формат изображения.`);
        return;
      }

      if (file.size > MAX_PHOTO_SIZE_BYTES) {
        issues.push(`Файл "${file.name}" пропущен: размер больше 10 МБ.`);
        return;
      }

      if (selectedPhotos.length >= MAX_PHOTO_COUNT) {
        issues.push(`Можно добавить не более ${MAX_PHOTO_COUNT} фото.`);
        return;
      }

      const duplicate = selectedPhotos.some(
        (item) => item.name === file.name && item.size === file.size && item.lastModified === file.lastModified
      );
      if (duplicate) return;

      selectedPhotos.push(file);
    });

    renderPhotoPreviews();

    if (issues.length) {
      setPhotoStatus(issues[0], true);
      return;
    }

    if (selectedPhotos.length) {
      setPhotoStatus(`Добавлено фото: ${selectedPhotos.length}`);
    } else {
      setPhotoStatus("");
    }
  };

  updatePhoneFormat();
  if (phoneCodeField) phoneCodeField.addEventListener("change", updatePhoneFormat);
  if (photoAddBtn && photoInput) {
    photoAddBtn.addEventListener("click", () => photoInput.click());
  }
  if (photoInput) {
    photoInput.addEventListener("change", (event) => {
      addPhotos(event.target.files);
      photoInput.value = "";
    });
  }

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
    const photoSummary = selectedPhotos.length
      ? selectedPhotos.map((file) => file.name).join(", ")
      : "-";

    const text = [
      "Новая заявка с сайта:",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Регион: ${region}`,
      `Комментарий: ${message || "-"}`,
      `Фото/файлы: ${photoSummary}`
    ].join("\n");

    const url = `${CONTACTS.telegram}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    selectedPhotos = [];
    renderPhotoPreviews();
    setPhotoStatus("");
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

  const allSlides = [];
  const cardEntries = [];
  let currentIndex = 0;

  const renderModal = () => {
    const slide = allSlides[currentIndex];
    if (!slide) return;
    modalImg.src = slide.src;
    caption.textContent = `Фото ${currentIndex + 1} из ${allSlides.length} · ${slide.title}`;
  };

  const openModal = (startIndex) => {
    if (!allSlides.length) return;
    currentIndex = startIndex;
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
    if (!allSlides.length) return;
    currentIndex = (currentIndex + delta + allSlides.length) % allSlides.length;
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

    const globalIndexes = gallery.map((src) => {
      allSlides.push({ src, title });
      return allSlides.length - 1;
    });
    cardEntries.push({ card, gallery, globalIndexes, title });
  });

  cardEntries.forEach(({ card, gallery, globalIndexes }) => {
    const firstSlideIndex = globalIndexes[0];

    const dots = card.querySelector(".type-dots");
    if (dots && !dots.querySelector(".type-open-btn")) {
      const openBtn = document.createElement("button");
      openBtn.type = "button";
      openBtn.className = "type-open-btn";
      openBtn.textContent = card.dataset.openLabel || "Открыть фото";
      dots.appendChild(openBtn);
      openBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        openModal(firstSlideIndex);
      });
    }

    card.addEventListener("click", () => openModal(firstSlideIndex));
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
initYear();
