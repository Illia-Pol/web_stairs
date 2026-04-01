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
  const formCard = form.closest(".lead-capture-form-card");
  const photoInput = document.getElementById("photo-files");
  const photoAddBtn = document.getElementById("photo-add-btn");
  const photoPreviewStrip = document.getElementById("photo-preview-strip");
  const photoPickerStatus = document.getElementById("photo-picker-status");
  const submitStatus = document.getElementById("lead-submit-status");
  const honeypotField = document.getElementById("honeypot");

  const REQUEST_TIMEOUT_MS = 7000;
  const AUTO_REDIRECT_SECONDS = 7;
  const AUTO_REDIRECT_MS = AUTO_REDIRECT_SECONDS * 1000;
  const defaultSubmitLabel = form.dataset.msgSubmitDefault || (submitButton ? submitButton.textContent.trim() : "Отправить заявку");
  const sendingSubmitLabel = form.dataset.msgSubmitSending || "Отправка...";
  const isEn = document.documentElement.lang === "en";

  const MAX_PHOTO_COUNT = 8;
  const MAX_PHOTO_SIZE_BYTES = 10 * 1024 * 1024;
  const MAX_TOTAL_PHOTO_BYTES = 4 * 1024 * 1024;
  const MAX_PHOTO_DIMENSION = 1600;
  const PHOTO_QUALITY = 0.82;
  let selectedPhotos = [];
  let previewUrls = [];

  const msg = {
    removePhotoAria: form.dataset.msgRemovePhotoAria || "Удалить фото",
    photoAdded: form.dataset.msgPhotoAdded || "Добавлено фото: {{COUNT}}",
    photoInvalidType: form.dataset.msgPhotoInvalidType || "Файл \"{{NAME}}\" пропущен: нужен формат изображения.",
    photoTooLarge: form.dataset.msgPhotoTooLarge || "Файл \"{{NAME}}\" пропущен: размер больше 10 МБ.",
    photoMaxCount: form.dataset.msgPhotoMaxCount || "Можно добавить не более {{MAX}} фото.",
    photoTotalTooLarge: form.dataset.msgPhotoTotalTooLarge || "Суммарный размер фото слишком большой. Удалите часть фото или выберите изображения меньшего размера.",
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
    submitCopySuccess: form.dataset.msgSubmitCopySuccess || "Текст заявки скопирован",
    submitSuccessTitle: form.dataset.msgSubmitSuccessTitle || (isEn ? "Request sent" : "Заявка отправлена"),
    submitErrorTitle: form.dataset.msgSubmitErrorTitle || (isEn ? "Auto-send failed" : "Автоотправка не удалась"),
    submitStayBtn: form.dataset.msgSubmitStayBtn || (isEn ? "Stay on site" : "Остаться на сайте"),
    submitCountdownPrefix: form.dataset.msgSubmitCountdownPrefix || (isEn ? "Redirect to Telegram in" : "Переход в Telegram через"),
    submitCountdownSuffix: form.dataset.msgSubmitCountdownSuffix || (isEn ? "sec" : "сек."),
    submitCountdownCancelled: form.dataset.msgSubmitCountdownCancelled || (isEn ? "Auto-redirect cancelled." : "Автопереход отменен."),
    successModalTitle: form.dataset.msgSuccessModalTitle || (isEn ? "Request sent" : "Заявка отправлена"),
    successModalClose: form.dataset.msgSuccessModalClose || (isEn ? "Close" : "Закрыть"),
    successModalNextTitle: form.dataset.msgSuccessModalNextTitle || (isEn ? "What happens next" : "Что дальше"),
    successModalNextText:
      form.dataset.msgSuccessModalNextText ||
      (isEn
        ? "We will review your input, assess a realistic budget and timeline scenario, and come back with a specific comment on your project."
        : "Проверим вводные, оценим реалистичный сценарий по бюджету и срокам и вернемся с предметным комментарием по вашему объекту."),
    successModalSpeedTitle: form.dataset.msgSuccessModalSpeedTitle || (isEn ? "How to speed up the reply" : "Как ускорить ответ"),
    successModalSpeedText:
      form.dataset.msgSuccessModalSpeedText ||
      (isEn
        ? "If you have more photos, videos, or an opening plan, send them in messenger. This helps us give a more accurate reply faster."
        : "Если есть еще фото, видео или план проема, отправьте их в мессенджер. Так мы быстрее дадим точный комментарий."),
    successModalTelegramBtn: form.dataset.msgSuccessModalTelegramBtn || (isEn ? "Write in Telegram" : "Написать в Telegram"),
    successModalCallBtn: form.dataset.msgSuccessModalCallBtn || (isEn ? "Call" : "Позвонить"),
    errorModalTitle: form.dataset.msgErrorModalTitle || (isEn ? "Automatic sending failed" : "Автоотправка не удалась"),
    errorModalHelpTitle: form.dataset.msgErrorModalHelpTitle || (isEn ? "What happened" : "Что произошло"),
    errorModalHelpText:
      form.dataset.msgErrorModalHelpText ||
      (isEn
        ? "The request could not be sent automatically. We prepared a manual Telegram fallback so your entered data is not lost."
        : "Автоматически отправить заявку не удалось. Мы подготовили ручной сценарий через Telegram, чтобы вы не потеряли введенные данные."),
    errorModalTimerTitle: form.dataset.msgErrorModalTimerTitle || (isEn ? "What happens next" : "Что будет дальше"),
    errorModalTimerText:
      form.dataset.msgErrorModalTimerText ||
      (isEn
        ? "In a few seconds Telegram will open with a prefilled request text. You can cancel the redirect and stay on the site if needed."
        : "Через несколько секунд откроется Telegram с уже подготовленным текстом заявки. При желании вы можете отменить переход и остаться на сайте."),
    errorModalTelegramBtn: form.dataset.msgErrorModalTelegramBtn || (isEn ? "Send in Telegram" : "Отправить в Telegram"),
    errorModalCopyBtn: form.dataset.msgErrorModalCopyBtn || (isEn ? "Copy request text" : "Скопировать текст заявки"),
    errorModalStayBtn: form.dataset.msgErrorModalStayBtn || (isEn ? "Stay on site" : "Остаться на сайте"),
    errorModalCopySuccess: form.dataset.msgErrorModalCopySuccess || (isEn ? "Request text copied" : "Текст заявки скопирован")
  };

  const endpoint = form.dataset.leadEndpoint || "";
  const formSource = form.dataset.leadSource || "lead_form";
  const successUrl = form.dataset.leadSuccessUrl || "/lead/success";
  const fallbackMode = form.dataset.telegramFallbackMode || "auto_redirect";
  const fallbackUsername = form.dataset.telegramFallbackUsername || "";
  const fallbackUrl = form.dataset.telegramFallbackUrl || "https://t.me";
  const successTelegramUrl = form.dataset.successModalTelegramUrl || fallbackUrl;
  const successCallUrl = form.dataset.successModalCallUrl || "";
  const MOCK_SUCCESS_ENDPOINT = "__mock_success__";
  const MOCK_ERROR_ENDPOINT = "__mock_error__";
  const MIN_SUBMIT_PENDING_MS = 700;
  let redirectTimerId = null;
  let countdownTimerId = null;
  let successRedirectTimerId = null;
  let successModalCleanup = null;
  let successModalRestoreOverflow = "";
  let successModalRestoreUrl = "";

  const applyTokens = (template, tokens) => {
    if (!tokens) return template;
    return Object.entries(tokens).reduce((acc, [key, value]) => {
      return acc.replaceAll(`{{${key}}}`, String(value));
    }, template);
  };

  const isPlaceholder = (value) => typeof value === "string" && value.includes("{{") && value.includes("}}");
  const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
  const waitForMinimumPending = async (startedAt) => {
    const elapsed = Date.now() - startedAt;
    const waitMs = Math.max(0, MIN_SUBMIT_PENDING_MS - elapsed);
    if (waitMs > 0) {
      await sleep(waitMs);
    }
  };

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

  const clearRedirectTimers = () => {
    if (redirectTimerId) {
      window.clearTimeout(redirectTimerId);
      redirectTimerId = null;
    }
    if (countdownTimerId) {
      window.clearInterval(countdownTimerId);
      countdownTimerId = null;
    }
    if (successRedirectTimerId) {
      window.clearTimeout(successRedirectTimerId);
      successRedirectTimerId = null;
    }
  };

  const dispatchLeadSuccessTracking = (targetUrl) => {
    if (typeof window === "undefined") return;

    let resolvedUrl = window.location.href;
    try {
      resolvedUrl = new URL(targetUrl, window.location.origin).href;
    } catch {
      resolvedUrl = targetUrl || window.location.href;
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        event_category: "lead",
        event_label: "lead_success_modal"
      });
      window.gtag("event", "page_view", {
        page_title: msg.successModalTitle,
        page_location: resolvedUrl,
        page_path: new URL(resolvedUrl).pathname + new URL(resolvedUrl).search
      });
    }

    if (typeof window.ym === "function") {
      window.ym(107147477, "reachGoal", "lead_success");
    }
  };

  const closeLeadSuccessModal = ({ restoreHistory = true } = {}) => {
    clearRedirectTimers();
    const modal = document.getElementById("lead-status-modal");
    if (modal) {
      modal.remove();
    }
    document.body.style.overflow = successModalRestoreOverflow;

    if (typeof successModalCleanup === "function") {
      successModalCleanup();
      successModalCleanup = null;
    }

    if (restoreHistory && window.history.state && window.history.state.__leadStatusModal) {
      window.history.back();
      return;
    }

    if (restoreHistory && successModalRestoreUrl && window.location.href !== successModalRestoreUrl) {
      window.history.replaceState(window.history.state, "", successModalRestoreUrl);
    }
  };

  const openLeadSuccessModal = (targetUrl) => {
    if (typeof document === "undefined") return;

    closeLeadSuccessModal({ restoreHistory: false });

    const resolvedUrl = new URL(targetUrl, window.location.origin);
    successModalRestoreUrl = window.location.href;
    successModalRestoreOverflow = document.body.style.overflow || "";
    window.history.pushState({ ...(window.history.state || {}), __leadStatusModal: true }, "", resolvedUrl.href);
    document.body.style.overflow = "hidden";

    const overlay = document.createElement("div");
    overlay.className = "lead-success-overlay lead-success-overlay--success";
    overlay.id = "lead-status-modal";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "lead-success-modal-title");

    const backdrop = document.createElement("div");
    backdrop.className = "lead-success-overlay__backdrop";
    backdrop.dataset.close = "true";

    const dialog = document.createElement("article");
    dialog.className = "guarantee-card lead-success-card lead-success-card-modal";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "lead-success-overlay__close";
    closeBtn.setAttribute("aria-label", msg.successModalClose);
    closeBtn.textContent = "×";

    const badge = document.createElement("div");
    badge.className = "lead-success-badge";
    badge.setAttribute("aria-hidden", "true");
    badge.innerHTML = "<span>✓</span>";

    const title = document.createElement("h2");
    title.className = "kicker lead-success-kicker";
    title.id = "lead-success-modal-title";
    title.textContent = msg.successModalTitle;

    const points = document.createElement("div");
    points.className = "lead-success-points";
    points.innerHTML = `
      <div class="info-card">
        <h3>${msg.successModalNextTitle}</h3>
        <p>${msg.successModalNextText}</p>
      </div>
      <div class="info-card">
        <h3>${msg.successModalSpeedTitle}</h3>
        <p>${msg.successModalSpeedText}</p>
      </div>
    `;

    const actions = document.createElement("div");
    actions.className = "lead-success-actions";
    actions.innerHTML = `
      <a href="${successTelegramUrl}" target="_blank" rel="noreferrer" class="btn btn-small">${msg.successModalTelegramBtn}</a>
      <a href="${successCallUrl}" class="btn btn-ghost btn-small">${msg.successModalCallBtn}</a>
    `;

    dialog.appendChild(closeBtn);
    dialog.appendChild(badge);
    dialog.appendChild(title);
    dialog.appendChild(points);
    dialog.appendChild(actions);
    overlay.appendChild(backdrop);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    const onClick = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.dataset.close === "true" || target === closeBtn) {
        closeLeadSuccessModal();
      }
    };

    const onKeydown = (event) => {
      if (event.key === "Escape") {
        closeLeadSuccessModal();
      }
    };

    const onPopstate = () => {
      if (!(window.history.state && window.history.state.__leadStatusModal)) {
        closeLeadSuccessModal({ restoreHistory: false });
      }
    };

    overlay.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeydown);
    window.addEventListener("popstate", onPopstate);
    successModalCleanup = () => {
      overlay.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeydown);
      window.removeEventListener("popstate", onPopstate);
    };

    closeBtn.focus();
    dispatchLeadSuccessTracking(resolvedUrl.href);
  };

  const openLeadErrorModal = (fallbackLink, fallbackText) => {
    if (typeof document === "undefined") return;

    closeLeadSuccessModal({ restoreHistory: false });
    successModalRestoreUrl = window.location.href;
    successModalRestoreOverflow = document.body.style.overflow || "";
    document.body.style.overflow = "hidden";

    const overlay = document.createElement("div");
    overlay.className = "lead-success-overlay lead-success-overlay--error";
    overlay.id = "lead-status-modal";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "lead-error-modal-title");

    const backdrop = document.createElement("div");
    backdrop.className = "lead-success-overlay__backdrop";
    backdrop.dataset.close = "true";

    const dialog = document.createElement("article");
    dialog.className = "guarantee-card lead-success-card lead-success-card-modal lead-status-card-error";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "lead-success-overlay__close";
    closeBtn.setAttribute("aria-label", msg.successModalClose);
    closeBtn.textContent = "×";

    const badge = document.createElement("div");
    badge.className = "lead-success-badge lead-success-badge-error";
    badge.setAttribute("aria-hidden", "true");
    badge.innerHTML = "<span>!</span>";

    const title = document.createElement("h2");
    title.className = "kicker lead-success-kicker";
    title.id = "lead-error-modal-title";
    title.textContent = msg.errorModalTitle;

    const points = document.createElement("div");
    points.className = "lead-success-points";
    points.innerHTML = `
      <div class="info-card">
        <h3>${msg.errorModalHelpTitle}</h3>
        <p>${msg.errorModalHelpText}</p>
      </div>
      <div class="info-card">
        <h3>${msg.errorModalTimerTitle}</h3>
        <p>${msg.errorModalTimerText}</p>
      </div>
    `;

    const countdown = document.createElement("p");
    countdown.className = "lead-alert-countdown lead-status-countdown";
    countdown.textContent = `${msg.submitCountdownPrefix} ${AUTO_REDIRECT_SECONDS} ${msg.submitCountdownSuffix}`;

    const actions = document.createElement("div");
    actions.className = "lead-success-actions";

    const tgBtn = document.createElement("a");
    tgBtn.href = fallbackLink;
    tgBtn.target = "_blank";
    tgBtn.rel = "noreferrer";
    tgBtn.className = "btn btn-small";
    tgBtn.textContent = msg.errorModalTelegramBtn;
    actions.appendChild(tgBtn);

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "btn btn-ghost btn-small";
    copyBtn.textContent = msg.errorModalCopyBtn;
    copyBtn.addEventListener("click", async () => {
      try {
        if (!navigator?.clipboard) return;
        await navigator.clipboard.writeText(fallbackText);
        copyBtn.textContent = msg.errorModalCopySuccess;
      } catch {
        // ignore clipboard errors
      }
    });
    actions.appendChild(copyBtn);

    const stayBtn = document.createElement("button");
    stayBtn.type = "button";
    stayBtn.className = "btn btn-ghost btn-small";
    stayBtn.textContent = msg.errorModalStayBtn;
    stayBtn.addEventListener("click", () => {
      clearRedirectTimers();
      countdown.textContent = msg.submitCountdownCancelled;
      countdown.classList.add("is-cancelled");
    });
    actions.appendChild(stayBtn);

    dialog.appendChild(closeBtn);
    dialog.appendChild(badge);
    dialog.appendChild(title);
    dialog.appendChild(points);
    dialog.appendChild(countdown);
    dialog.appendChild(actions);
    overlay.appendChild(backdrop);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    const onClick = (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.dataset.close === "true" || target === closeBtn) {
        closeLeadSuccessModal({ restoreHistory: false });
      }
    };

    const onKeydown = (event) => {
      if (event.key === "Escape") {
        closeLeadSuccessModal({ restoreHistory: false });
      }
    };

    overlay.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeydown);
    successModalCleanup = () => {
      overlay.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeydown);
    };

    let secondsLeft = AUTO_REDIRECT_SECONDS;
    countdownTimerId = window.setInterval(() => {
      secondsLeft -= 1;
      if (secondsLeft <= 0) {
        window.clearInterval(countdownTimerId);
        countdownTimerId = null;
        return;
      }
      countdown.textContent = `${msg.submitCountdownPrefix} ${secondsLeft} ${msg.submitCountdownSuffix}`;
    }, 1000);

    redirectTimerId = window.setTimeout(() => {
      window.location.href = fallbackLink;
    }, AUTO_REDIRECT_MS);

    closeBtn.focus();
  };

  const setSubmitState = ({ type = "idle", message = "", fallbackLink = "", fallbackText = "" } = {}) => {
    if (!submitStatus) return;
    clearRedirectTimers();
    submitStatus.textContent = "";
    submitStatus.classList.remove("is-error", "is-success");
    submitStatus.innerHTML = "";
    if (!message) return;

    submitStatus.classList.add(type === "error" ? "is-error" : type === "success" ? "is-success" : "");
    const alert = document.createElement("div");
    alert.className = `lead-alert lead-alert-${type === "error" ? "error" : type === "success" ? "success" : "info"}`;
    const title = document.createElement("p");
    title.className = "lead-alert-title";
    title.textContent = type === "error" ? msg.submitErrorTitle : msg.submitSuccessTitle;
    alert.appendChild(title);

    const textNode = document.createElement("p");
    textNode.className = "lead-alert-text";
    textNode.textContent = message;
    alert.appendChild(textNode);

    if (type !== "error" || !fallbackLink) {
      submitStatus.appendChild(alert);
      return;
    }

    const actions = document.createElement("div");
    actions.className = "lead-fallback-actions";
    let countdownEl = null;

    if (fallbackMode === "auto_redirect") {
      let secondsLeft = AUTO_REDIRECT_SECONDS;
      countdownEl = document.createElement("p");
      countdownEl.className = "lead-alert-countdown";
      countdownEl.textContent = `${msg.submitCountdownPrefix} ${secondsLeft} ${msg.submitCountdownSuffix}`;
      alert.appendChild(countdownEl);

      countdownTimerId = window.setInterval(() => {
        secondsLeft -= 1;
        if (secondsLeft <= 0) {
          window.clearInterval(countdownTimerId);
          countdownTimerId = null;
          return;
        }
        if (countdownEl) {
          countdownEl.textContent = `${msg.submitCountdownPrefix} ${secondsLeft} ${msg.submitCountdownSuffix}`;
        }
      }, 1000);

      redirectTimerId = window.setTimeout(() => {
        window.location.href = fallbackLink;
      }, AUTO_REDIRECT_MS);
    }

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

    if (fallbackMode === "auto_redirect") {
      const stayBtn = document.createElement("button");
      stayBtn.type = "button";
      stayBtn.className = "btn btn-ghost btn-small";
      stayBtn.textContent = msg.submitStayBtn;
      stayBtn.addEventListener("click", () => {
        clearRedirectTimers();
        if (countdownEl) {
          countdownEl.textContent = msg.submitCountdownCancelled;
          countdownEl.classList.add("is-cancelled");
        }
      });
      actions.appendChild(stayBtn);
    }

    alert.appendChild(actions);
    submitStatus.appendChild(alert);
  };

  const setSubmitting = (loading) => {
    if (!submitButton) return;
    submitButton.disabled = Boolean(loading);
    submitButton.textContent = loading ? sendingSubmitLabel : defaultSubmitLabel;
    submitButton.classList.toggle("is-loading", Boolean(loading));
    submitButton.setAttribute("aria-busy", loading ? "true" : "false");
    if (formCard) {
      formCard.classList.toggle("is-loading", Boolean(loading));
      formCard.setAttribute("aria-busy", loading ? "true" : "false");
    }
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

  const resetLeadForm = () => {
    form.reset();
    updatePhoneFormat();
    selectedPhotos = [];
    renderPhotoPreviews();
    setPhotoStatus("");
  };

  const getTotalPhotoSize = () => selectedPhotos.reduce((acc, file) => acc + (file?.size || 0), 0);

  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("FILE_READ_ERROR"));
      reader.readAsDataURL(file);
    });

  const loadImage = (dataUrl) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("IMAGE_LOAD_ERROR"));
      img.src = dataUrl;
    });

  const compressPhoto = async (file) => {
    if (!file?.type?.startsWith("image/")) return file;

    const dataUrl = await readFileAsDataUrl(file);
    const img = await loadImage(dataUrl);

    const width = img.naturalWidth || img.width;
    const height = img.naturalHeight || img.height;
    if (!width || !height) return file;

    const ratio = Math.min(1, MAX_PHOTO_DIMENSION / Math.max(width, height));
    const targetWidth = Math.max(1, Math.round(width * ratio));
    const targetHeight = Math.max(1, Math.round(height * ratio));

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    const blob = await new Promise((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", PHOTO_QUALITY);
    });

    if (!blob) return file;

    // Если сжатие не дало выгоды, оставляем исходник.
    if (blob.size >= file.size * 0.98) return file;

    const safeName = file.name.replace(/\.[^.]+$/, "") || "photo";
    return new File([blob], `${safeName}.jpg`, {
      type: "image/jpeg",
      lastModified: Date.now()
    });
  };

  const addPhotos = async (incomingFiles) => {
    if (!incomingFiles || !incomingFiles.length) return;

    const issues = [];

    for (const file of Array.from(incomingFiles)) {
      if (!file.type || !file.type.startsWith("image/")) {
        issues.push(applyTokens(msg.photoInvalidType, { NAME: file.name }));
        continue;
      }

      if (file.size > MAX_PHOTO_SIZE_BYTES) {
        issues.push(applyTokens(msg.photoTooLarge, { NAME: file.name }));
        continue;
      }

      if (selectedPhotos.length >= MAX_PHOTO_COUNT) {
        issues.push(applyTokens(msg.photoMaxCount, { MAX: MAX_PHOTO_COUNT }));
        continue;
      }

      let prepared = file;
      try {
        prepared = await compressPhoto(file);
      } catch {
        prepared = file;
      }

      const duplicate = selectedPhotos.some(
        (item) => item.name === prepared.name && item.size === prepared.size && item.lastModified === prepared.lastModified
      );
      if (duplicate) continue;

      if (getTotalPhotoSize() + prepared.size > MAX_TOTAL_PHOTO_BYTES) {
        issues.push(msg.photoTotalTooLarge);
        continue;
      }

      selectedPhotos.push(prepared);
    }

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
    photoInput.addEventListener("change", async (event) => {
      await addPhotos(event.target.files);
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

    if (typeof window.gtagSendEvent === "function") {
      window.gtagSendEvent();
    } else if (typeof window.gtag === "function") {
      window.gtag("event", "conversion_event_contact");
    }

    const name = document.getElementById("name").value.trim();
    const localPhone = document.getElementById("phone").value.trim();
    const phoneCode = phoneCodeField ? phoneCodeField.value : "";
    const phone = localPhone.startsWith("+") ? localPhone : `${phoneCode} ${localPhone}`.trim();
    const region = document.getElementById("region").value.trim();
    const messenger = messengerField ? messengerField.value : "-";
    const message = document.getElementById("message").value.trim();
    const honeypot = honeypotField ? honeypotField.value.trim() : "";
    const text = [
      msg.leadTitle,
      `${msg.leadName}: ${name}`,
      `${msg.leadPhone}: ${phone}`,
      `${msg.leadRegion}: ${region}`,
      `${msg.leadMessenger}: ${messenger}`,
      `${msg.leadComment}: ${message || "-"}`
    ].join("\n");

    const telegramLink = buildTelegramFallbackLink(text);
    const payload = {
      name,
      phone,
      city: region,
      message: [
        message || "-",
        `${msg.leadMessenger}: ${messenger}`
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
    const submitStartedAt = Date.now();

    try {
      setSubmitting(true);
      if (!endpoint || isPlaceholder(endpoint)) {
        throw new Error("LEAD_ENDPOINT_NOT_CONFIGURED");
      }

      if (endpoint === MOCK_SUCCESS_ENDPOINT) {
        await waitForMinimumPending(submitStartedAt);
        setSubmitState();
        resetLeadForm();
        const joinSymbol = successUrl.includes("?") ? "&" : "?";
        openLeadSuccessModal(`${successUrl}${joinSymbol}source=${encodeURIComponent(formSource)}`);
        return;
      }

      if (endpoint === MOCK_ERROR_ENDPOINT) {
        throw new Error("MOCK_ERROR");
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

      await waitForMinimumPending(submitStartedAt);
      setSubmitState();
      resetLeadForm();
      const joinSymbol = successUrl.includes("?") ? "&" : "?";
      openLeadSuccessModal(`${successUrl}${joinSymbol}source=${encodeURIComponent(formSource)}`);
    } catch {
      await waitForMinimumPending(submitStartedAt);
      setSubmitState();
      openLeadErrorModal(telegramLink, text);

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
  let wheelLock = false;

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

  const handleWheelStep = (event) => {
    if (!modal.classList.contains("is-open")) return;

    const dominantDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (Math.abs(dominantDelta) < 14) return;

    event.preventDefault();
    if (wheelLock) return;

    wheelLock = true;
    step(dominantDelta > 0 ? 1 : -1);
    window.setTimeout(() => {
      wheelLock = false;
    }, 180);
  };

  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));
  modal.addEventListener("wheel", handleWheelStep, { passive: false });
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
