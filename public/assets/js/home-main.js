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
  if (form.dataset.hmBound === "1") return;
  form.dataset.hmBound = "1";
  const phoneCodeField = document.getElementById("phone-code");
  const phoneField = document.getElementById("phone");
  const messengerField = document.getElementById("messenger");
  const submitButton = form.querySelector('button[type="submit"]');
  const photoInput = document.getElementById("photo-files");
  const photoAddBtn = document.getElementById("photo-add-btn");
  const photoPreviewStrip = document.getElementById("photo-preview-strip");
  const photoPickerStatus = document.getElementById("photo-picker-status");
  const submitStatus = document.getElementById("lead-submit-status");
  const honeypotField = document.getElementById("honeypot");

  const REQUEST_TIMEOUT_MS = 7000;
  const REDIRECT_DELAY_MS = 1000;
  const defaultSubmitLabel = form.dataset.msgSubmitDefault || (submitButton ? submitButton.textContent.trim() : "Отправить заявку");
  const sendingSubmitLabel = form.dataset.msgSubmitSending || "Отправка...";

  const MAX_PHOTO_COUNT = 8;
  const MAX_PHOTO_SIZE_BYTES = 10 * 1024 * 1024;
  let selectedPhotos = [];
  let previewUrls = [];

  const msg = {
    removePhotoAria: form.dataset.msgRemovePhotoAria || "Удалить фото",
    photoAdded: form.dataset.msgPhotoAdded || "Добавлено фото: {{COUNT}}",
    photoInvalidType: form.dataset.msgPhotoInvalidType || "Файл \"{{NAME}}\" пропущен: нужен формат изображения.",
    photoTooLarge: form.dataset.msgPhotoTooLarge || "Файл \"{{NAME}}\" пропущен: размер больше 10 МБ.",
    photoMaxCount: form.dataset.msgPhotoMaxCount || "Можно добавить не более {{MAX}} фото.",
    nameRequired: form.dataset.msgNameRequired || "Введите имя",
    phoneRequired: form.dataset.msgPhoneRequired || "Введите телефон",
    phoneInvalid: form.dataset.msgPhoneInvalid || "Введите корректный номер",
    regionRequired: form.dataset.msgRegionRequired || "Введите город / регион",
    leadTitle: form.dataset.msgLeadTitle || "Новая заявка с сайта:",
    leadName: form.dataset.msgLeadName || "Имя",
    leadPhone: form.dataset.msgLeadPhone || "Телефон",
    leadRegion: form.dataset.msgLeadRegion || "Регион",
    leadMessenger: form.dataset.msgLeadMessenger || "Предпочтительный канал",
    leadComment: form.dataset.msgLeadComment || "Комментарий",
    leadFiles: form.dataset.msgLeadFiles || "Фото/файлы",
    submitSuccess: form.dataset.msgSubmitSuccess || "Заявка отправлена. Спасибо! Мы свяжемся с вами в ближайшее время.",
    submitError: form.dataset.msgSubmitError || "Не удалось отправить автоматически. Сейчас откроется Telegram, чтобы отправить заявку вручную.",
    submitFallbackBtn: form.dataset.msgSubmitFallbackBtn || "Отправить в Telegram сейчас",
    submitCopyBtn: form.dataset.msgSubmitCopyBtn || "Скопировать текст заявки",
    submitCopySuccess: form.dataset.msgSubmitCopySuccess || "Текст заявки скопирован"
  };

  const endpoint = form.dataset.leadEndpoint || "";
  const formSource = form.dataset.leadSource || "lead_form";
  const fallbackMode = form.dataset.telegramFallbackMode || "auto_redirect";
  const fallbackUsername = form.dataset.telegramFallbackUsername || "";
  const fallbackUrl = form.dataset.telegramFallbackUrl || "https://t.me";

  const applyTokens = (template, tokens) => {
    if (!tokens) return template;
    return Object.entries(tokens).reduce((acc, [key, value]) => {
      return acc.replaceAll(`{{${key}}}`, String(value));
    }, template);
  };

  const isPlaceholder = (value) => typeof value === "string" && value.includes("{{") && value.includes("}}");

  const extractTelegramUsername = (value) => {
    if (!value || isPlaceholder(value)) return "";
    return value
      .trim()
      .replace(/^https?:\/\/t\.me\//, "")
      .replace(/^@/, "")
      .replace(/\?.*$/, "")
      .replace(/\/$/, "");
  };

  const buildTelegramFallbackLink = (text) => {
    const encodedText = encodeURIComponent(text);
    const username = extractTelegramUsername(fallbackUsername) || extractTelegramUsername(fallbackUrl);
    if (username) {
      return `https://t.me/${username}?text=${encodedText}`;
    }
    const base = !isPlaceholder(fallbackUrl) && fallbackUrl ? fallbackUrl : "https://t.me";
    const joinSymbol = base.includes("?") ? "&" : "?";
    return `${base}${joinSymbol}text=${encodedText}`;
  };

  const setSubmitState = ({ type = "idle", message = "", fallbackLink = "", fallbackText = "" } = {}) => {
    if (!submitStatus) return;
    submitStatus.textContent = "";
    submitStatus.classList.remove("is-error", "is-success");
    submitStatus.innerHTML = "";
    if (!message) return;

    submitStatus.classList.add(type === "error" ? "is-error" : type === "success" ? "is-success" : "");
    const textNode = document.createElement("p");
    textNode.textContent = message;
    submitStatus.appendChild(textNode);

    if (type !== "error" || !fallbackLink) return;

    const actions = document.createElement("div");
    actions.className = "lead-fallback-actions";

    const tgBtn = document.createElement("a");
    tgBtn.href = fallbackLink;
    tgBtn.target = "_blank";
    tgBtn.rel = "noreferrer";
    tgBtn.className = "btn btn-small";
    tgBtn.textContent = msg.submitFallbackBtn;
    actions.appendChild(tgBtn);

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "btn btn-small";
    copyBtn.textContent = msg.submitCopyBtn;
    copyBtn.addEventListener("click", async () => {
      try {
        if (!navigator?.clipboard) return;
        await navigator.clipboard.writeText(fallbackText);
        copyBtn.textContent = msg.submitCopySuccess;
      } catch {
        // ignore clipboard errors
      }
    });
    actions.appendChild(copyBtn);
    submitStatus.appendChild(actions);
  };

  const setSubmitting = (loading) => {
    if (!submitButton) return;
    submitButton.disabled = Boolean(loading);
    submitButton.textContent = loading ? sendingSubmitLabel : defaultSubmitLabel;
  };

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
      tile.dataset.index = String(index);

      const img = document.createElement("img");
      const src = URL.createObjectURL(file);
      previewUrls.push(src);
      img.src = src;
      img.alt = `Фото ${index + 1}`;

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "photo-remove-btn";
      removeBtn.setAttribute("aria-label", msg.removePhotoAria);
      removeBtn.textContent = "×";
      removeBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        const removeIndex = Number(tile.dataset.index);
        if (Number.isFinite(removeIndex)) {
          selectedPhotos.splice(removeIndex, 1);
          renderPhotoPreviews();
          if (selectedPhotos.length) {
            setPhotoStatus(applyTokens(msg.photoAdded, { COUNT: selectedPhotos.length }));
          } else {
            setPhotoStatus("");
          }
        }
      });

      tile.appendChild(img);
      tile.appendChild(removeBtn);
      photoPreviewStrip.appendChild(tile);
    });
  };

  const addPhotos = (incomingFiles) => {
    if (!incomingFiles || !incomingFiles.length) return;

    const issues = [];

    Array.from(incomingFiles).forEach((file) => {
      if (!file.type || !file.type.startsWith("image/")) {
        issues.push(applyTokens(msg.photoInvalidType, { NAME: file.name }));
        return;
      }

      if (file.size > MAX_PHOTO_SIZE_BYTES) {
        issues.push(applyTokens(msg.photoTooLarge, { NAME: file.name }));
        return;
      }

      if (selectedPhotos.length >= MAX_PHOTO_COUNT) {
        issues.push(applyTokens(msg.photoMaxCount, { MAX: MAX_PHOTO_COUNT }));
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
      setPhotoStatus(applyTokens(msg.photoAdded, { COUNT: selectedPhotos.length }));
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
    { id: "name", message: msg.nameRequired },
    {
      id: "phone",
      message: msg.phoneRequired,
      invalidMessage: msg.phoneInvalid,
      validate: (value) => {
        const localDigits = value.replace(/\D/g, "");
        const code = phoneCodeField ? phoneCodeField.value : "+375";
        const expectedLocalLength = phoneDigitsByCode[code] || 9;
        return localDigits.length === expectedLocalLength;
      }
    },
    { id: "region", message: msg.regionRequired }
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

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setSubmitState();

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
    const messenger = messengerField ? messengerField.value : "-";
    const message = document.getElementById("message").value.trim();
    const honeypot = honeypotField ? honeypotField.value.trim() : "";
    const photoSummary = selectedPhotos.length
      ? selectedPhotos.map((file) => file.name).join(", ")
      : "-";

    const text = [
      msg.leadTitle,
      `${msg.leadName}: ${name}`,
      `${msg.leadPhone}: ${phone}`,
      `${msg.leadRegion}: ${region}`,
      `${msg.leadMessenger}: ${messenger}`,
      `${msg.leadComment}: ${message || "-"}`,
      `${msg.leadFiles}: ${photoSummary}`
    ].join("\n");

    const telegramLink = buildTelegramFallbackLink(text);
    const payload = {
      name,
      phone,
      city: region,
      message: [
        message || "-",
        `${msg.leadMessenger}: ${messenger}`,
        `${msg.leadFiles}: ${photoSummary}`
      ].join("\n"),
      pageUrl: window.location.href,
      source: formSource,
      honeypot
    };

    const requestBody = new FormData();
    requestBody.append("name", payload.name);
    requestBody.append("phone", payload.phone);
    requestBody.append("city", payload.city);
    requestBody.append("message", payload.message);
    requestBody.append("pageUrl", payload.pageUrl);
    requestBody.append("source", payload.source);
    requestBody.append("honeypot", payload.honeypot);
    selectedPhotos.forEach((file) => {
      requestBody.append("files", file, file.name);
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      setSubmitting(true);
      if (!endpoint || isPlaceholder(endpoint)) {
        throw new Error("LEAD_ENDPOINT_NOT_CONFIGURED");
      }

      const response = await fetch(endpoint, {
        method: "POST",
        body: requestBody,
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP_${response.status}`);
      }

      const result = await response.json();
      if (!result || result.ok !== true) {
        throw new Error("ENDPOINT_RESPONSE_NOT_OK");
      }

      setSubmitState({ type: "success", message: msg.submitSuccess });
      form.reset();
      updatePhoneFormat();
      selectedPhotos = [];
      renderPhotoPreviews();
      setPhotoStatus("");
    } catch {
      setSubmitState({
        type: "error",
        message: msg.submitError,
        fallbackLink: telegramLink,
        fallbackText: text
      });

      if (fallbackMode === "auto_redirect") {
        window.setTimeout(() => {
          window.location.href = telegramLink;
        }, REDIRECT_DELAY_MS);
      }
    } finally {
      clearTimeout(timeoutId);
      setSubmitting(false);
    }
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
  if (modal.dataset.hmGalleryBound === "1") return;
  modal.dataset.hmGalleryBound = "1";

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
  if (section.dataset.hmPrefetchBound === "1") return;
  section.dataset.hmPrefetchBound = "1";
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

function runHomeMainInits() {
  initReveal();
  initLeadForm();
  initFaq();
  initCatalogGallery();
  initCatalogPrefetch();
  initYear();
}

window.__homeMainInitAll = runHomeMainInits;

if (!window.__homeMainRouteListenerBound) {
  window.__homeMainRouteListenerBound = true;
  window.addEventListener("home-main:route-change", runHomeMainInits);
}

runHomeMainInits();
