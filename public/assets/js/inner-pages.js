(function () {
  const fallbackContacts = {
    PHONE_E164: "+375296512022",
    PHONE_DISPLAY: "+375 (29) 651 20 22",
    WHATSAPP_LINK: "https://wa.me/375296512022",
    TELEGRAM_LINK: "https://t.me/Sokolmaxxx",
    INSTAGRAM_LINK: "https://www.instagram.com/betostep?igsh=cGQ0MjBzNzJ6cXlv",
    VIBER_LINK: "viber://chat?number=%2B375296512022",
    EMAIL: "monolithic.stair@gmail.com",
    ADDRESS: "г. Минск, б-р Шевченко, 15, кв. 38",
    OWNER_NAME: "ИП Соколовский Максим Владимирович",
    SITE_URL: "https://betostep.by"
  };

  const contacts = Object.assign({}, fallbackContacts, window.BETOSTEP_CONTACTS || {});

  function applyContactData() {
    const textMap = {
      "phone-display": contacts.PHONE_DISPLAY,
      email: contacts.EMAIL,
      address: contacts.ADDRESS,
      owner: contacts.OWNER_NAME
    };

    const linkMap = {
      phone: `tel:${contacts.PHONE_E164}`,
      whatsapp: contacts.WHATSAPP_LINK,
      telegram: contacts.TELEGRAM_LINK,
      instagram: contacts.INSTAGRAM_LINK,
      viber: contacts.VIBER_LINK,
      email: `mailto:${contacts.EMAIL}`
    };

    document.querySelectorAll("[data-contact-text]").forEach((node) => {
      const key = node.getAttribute("data-contact-text");
      if (!key || !textMap[key]) return;
      node.textContent = textMap[key];
    });

    document.querySelectorAll("[data-contact-link]").forEach((node) => {
      const key = node.getAttribute("data-contact-link");
      if (!key || !linkMap[key]) return;
      node.setAttribute("href", linkMap[key]);
      if (key === "phone") {
        const currentText = (node.textContent || "").trim();
        if (!currentText || currentText === "Позвонить") {
          node.textContent = contacts.PHONE_DISPLAY;
        }
      }
    });
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
        if (item.open) answer.style.height = "auto";
      });
    });
  }

  function initYear() {
    const yearNode = document.getElementById("year");
    if (yearNode) yearNode.textContent = new Date().getFullYear();
  }

  function renderProjectCard(project) {
    const hasImage = Array.isArray(project.images) && project.images.length > 0;
    const imageSrc = hasImage ? project.images[0] : "/assets/slider/slider-1.jpeg";
    const tags = Array.isArray(project.tags) ? project.tags : [];

    return `
      <article class="project-card project-card-detailed ${hasImage ? "" : "project-card-placeholder"}">
        <div class="project-image">
          <img src="${imageSrc}" alt="${project.title}" loading="lazy">
        </div>
        <div class="project-body">
          <p class="project-city">${project.city} · ${project.type}</p>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tags">${tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        </div>
      </article>
    `;
  }

  function initPortfolioFilter() {
    const root = document.querySelector("[data-portfolio-root]");
    if (!root) return;

    const projects = Array.isArray(window.BETOSTEP_PROJECTS) ? window.BETOSTEP_PROJECTS : [];
    const grid = root.querySelector("[data-project-grid]");
    const empty = root.querySelector("[data-project-empty]");
    const filters = Array.from(root.querySelectorAll("[data-city-filter]"));
    if (!grid || !filters.length) return;

    const query = new URLSearchParams(window.location.search);
    const cityFromQuery = (query.get("city") || "").trim();
    const cityFromHash = (window.location.hash || "").replace("#", "").trim();
    const requested = cityFromQuery || cityFromHash;
    const available = new Set(["all", ...projects.map((item) => item.citySlug)]);

    let activeCity = available.has(requested) ? requested : "all";

    const render = () => {
      const visible = activeCity === "all"
        ? projects
        : projects.filter((project) => project.citySlug === activeCity);

      grid.innerHTML = visible.map(renderProjectCard).join("");

      filters.forEach((filter) => {
        const filterCity = filter.getAttribute("data-city-filter");
        filter.classList.toggle("is-active", filterCity === activeCity);
      });

      if (empty) empty.hidden = visible.length > 0;

      const nextUrl = new URL(window.location.href);
      if (activeCity === "all") {
        nextUrl.searchParams.delete("city");
      } else {
        nextUrl.searchParams.set("city", activeCity);
      }
      window.history.replaceState({}, "", nextUrl);
    };

    filters.forEach((filter) => {
      filter.addEventListener("click", () => {
        const city = filter.getAttribute("data-city-filter") || "all";
        activeCity = available.has(city) ? city : "all";
        render();
      });
    });

    render();
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyContactData();
    initNavDropdowns();
    initFaq();
    initPortfolioFilter();
    initYear();
  });
})();
