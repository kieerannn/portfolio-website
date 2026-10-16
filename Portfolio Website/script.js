(() => {
  const $ = (sel) => document.querySelector(sel);

  /* ---------- Generated gradient covers for projects without an image ---------- */
  const PALETTES = [
    ["#1c1d20", "#16241b"], // grey → hint of green
    ["#1c1d20", "#161e2c"], // grey → hint of blue
    ["#1c1d20", "#2a1f16"], // grey → hint of brown
    ["#1c1d20", "#0d0d0e"], // plain grey
    ["#1c1d20", "#16241b"],
    ["#1c1d20", "#2a1f16"],
  ];

  function coverHTML(project, index) {
    if (project.image) {
      return `<img src="${project.image}" alt="${project.title}" loading="lazy" />`;
    }
    const [a, b] = PALETTES[index % PALETTES.length];
    const initials = project.title
      .split(/\s+/)
      .filter((w) => /^[A-Za-z]/.test(w))
      .slice(0, 2)
      .map((w) => w[0])
      .join("");
    return `<div class="cover" style="--a:${a};--b:${b}"><span>${initials}</span></div>`;
  }

  /* ---------- Render projects ---------- */
  const grid = $("#projectGrid");
  const filtersEl = $("#filters");
  const emptyState = $("#emptyState");

  function renderProjects(filter = "All") {
    const list = PROJECTS.map((p, i) => ({ ...p, _i: i })).filter(
      (p) => filter === "All" || p.category === filter
    );

    grid.innerHTML = list
      .map(
        (p) => `
        <article class="card reveal ${p.featured ? "card--featured" : ""}" tabindex="0" data-index="${p._i}" role="button" aria-label="Open ${p.title}">
          <div class="card__media">${coverHTML(p, p._i)}</div>
          <div class="card__body">
            <div class="card__meta"><span>${p.category}</span><span>${p.year}</span></div>
            <h3 class="card__title">${p.title}</h3>
            <p class="card__summary">${p.summary}</p>
            <ul class="chips chips--sm">${p.tags.map((t) => `<li>${t}</li>`).join("")}</ul>
          </div>
        </article>`
      )
      .join("");

    emptyState.hidden = list.length > 0;
    observeReveals();
  }

  function renderFilters() {
    const cats = ["All", ...new Set(PROJECTS.map((p) => p.category))];
    filtersEl.innerHTML = cats
      .map(
        (c, i) =>
          `<button class="filter ${i === 0 ? "is-active" : ""}" role="tab" aria-selected="${i === 0}" data-filter="${c}">${c}</button>`
      )
      .join("");

    filtersEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      filtersEl.querySelectorAll(".filter").forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-selected", b === btn);
      });
      renderProjects(btn.dataset.filter);
    });
  }

  /* ---------- Modal ---------- */
  const modal = $("#projectModal");

  function openModal(index) {
    const p = PROJECTS[index];
    $("#modalMedia").innerHTML = coverHTML(p, index);
    $("#modalMeta").textContent = `${p.category} · ${p.year}`;
    $("#modalTitle").textContent = p.title;
    $("#modalDesc").textContent = p.description;
    $("#modalTags").innerHTML = p.tags.map((t) => `<li>${t}</li>`).join("");
    const links = [];
    if (p.live) links.push(`<a class="btn btn--primary" href="${p.live}" target="_blank" rel="noopener">View live ↗</a>`);
    if (p.code) links.push(`<a class="btn btn--ghost" href="${p.code}" target="_blank" rel="noopener">Source code</a>`);
    $("#modalLinks").innerHTML = links.join("");
    modal.showModal();
  }

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) openModal(+card.dataset.index);
  });
  grid.addEventListener("keydown", (e) => {
    const card = e.target.closest(".card");
    if (card && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openModal(+card.dataset.index);
    }
  });
  $("#modalClose").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.close(); // click on backdrop
  });

  /* ---------- Skills ---------- */
  $("#skills").innerHTML = SKILLS.map((s) => `<li>${s}</li>`).join("");


  /* ---------- Mobile menu ---------- */
  const menuBtn = $("#menuToggle");
  const navLinks = $("#navLinks");
  menuBtn.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", false);
    }
  });

  /* ---------- Nav shadow on scroll ---------- */
  const nav = $(".nav");
  addEventListener("scroll", () => nav.classList.toggle("is-scrolled", scrollY > 8), { passive: true });

  /* ---------- Reveal on scroll ---------- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) =>
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("is-visible");
              io.unobserve(en.target);
            }
          }),
        { threshold: 0.12 }
      )
    : null;

  function observeReveals() {
    document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
      io ? io.observe(el) : el.classList.add("is-visible");
    });
  }

  /* ---------- Init ---------- */
  $("#year").textContent = new Date().getFullYear();
  renderFilters();
  renderProjects();
})();
