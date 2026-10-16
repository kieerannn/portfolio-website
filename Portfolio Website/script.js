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

  // Screenshot viewer in the popup: big image, caption and clickable thumbnails
  function renderModalMedia(p, index) {
    const media = $("#modalMedia");
    if (!p.gallery || !p.gallery.length) {
      media.className = "modal__media";
      media.innerHTML = coverHTML(p, index);
      return;
    }
    media.className = "modal__media modal__media--gallery";
    media.innerHTML = `
      <div class="shots">
        <div class="shots__main">
          <img id="shotImg" src="${p.gallery[0].src}" alt="${p.gallery[0].caption}" />
          ${p.gallery.length > 1 ? `
          <button class="carousel__btn shots__btn shots__btn--prev" data-step="-1" aria-label="Previous screenshot">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button class="carousel__btn shots__btn shots__btn--next" data-step="1" aria-label="Next screenshot">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>` : ""}
        </div>
        <p class="shots__caption" id="shotCaption">${p.gallery[0].caption}</p>
        <div class="shots__thumbs">
          ${p.gallery.map((g, i) => `<button class="shots__thumb ${i === 0 ? "is-active" : ""}" data-shot="${i}" aria-label="${g.caption}"><img src="${g.src}" alt="" /></button>`).join("")}
        </div>
      </div>`;
    let shot = 0;
    const show = (i) => {
      shot = (i + p.gallery.length) % p.gallery.length;
      $("#shotImg").src = p.gallery[shot].src;
      $("#shotImg").alt = p.gallery[shot].caption;
      $("#shotCaption").textContent = p.gallery[shot].caption;
      media.querySelectorAll(".shots__thumb").forEach((t, j) => t.classList.toggle("is-active", j === shot));
    };
    media.onclick = (e) => {
      const thumb = e.target.closest("[data-shot]");
      const step = e.target.closest("[data-step]");
      if (thumb) show(+thumb.dataset.shot);
      if (step) show(shot + +step.dataset.step);
    };
  }

  function openModal(index) {
    const p = PROJECTS[index];
    renderModalMedia(p, index);
    $("#modalMeta").textContent = `${p.category} · ${p.year}`;
    $("#modalTitle").textContent = p.title;
    $("#modalDesc").textContent = p.description;
    $("#modalPoints").innerHTML = (p.points || []).map((pt) => `<li>${pt}</li>`).join("");
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
  $("#certs").innerHTML = CERTS.map((c) => `<li>${c}</li>`).join("");

  /* ---------- Experience ---------- */
  $("#experienceList").innerHTML = EXPERIENCE.map(
    (g) => `
    <div class="xp__group reveal">
      <h3 class="xp__heading">${g.group}</h3>
      <ol class="xp__list">
        ${g.items
          .map(
            (it) => `
          <li class="xp__item">
            <div class="xp__top">
              <div>
                <h4 class="xp__role">${it.role}</h4>
                <p class="xp__org">${it.org}</p>
              </div>
              <span class="xp__dates">${it.dates}</span>
            </div>
            <ul class="xp__points">${it.points.map((pt) => `<li>${pt}</li>`).join("")}</ul>
          </li>`
          )
          .join("")}
      </ol>
    </div>`
  ).join("");

  /* ---------- Photo carousel ---------- */
  const carousel = $("#carousel");
  const track = $("#carouselTrack");
  const dots = $("#carouselDots");
  const caption = $("#carouselCaption");
  let current = 0;

  track.innerHTML = PHOTOS.map(
    (ph, i) => `
    <figure class="slide" data-index="${i}">
      <img src="${ph.src}" alt="${ph.caption}" draggable="false" ${i > 1 ? 'loading="lazy"' : ""} />
    </figure>`
  ).join("");
  dots.innerHTML = PHOTOS.map(
    (ph, i) => `<button class="carousel__dot" data-index="${i}" aria-label="Show photo ${i + 1}: ${ph.caption}"></button>`
  ).join("");
  const slides = [...track.children];

  // Each slide gets a position relative to the current one (-1 = previous,
  // 0 = centre, 1 = next). Positions wrap around, so the carousel loops.
  function goTo(index) {
    const n = PHOTOS.length;
    current = (index + n) % n;
    slides.forEach((s, i) => {
      let rel = (((i - current) % n) + n) % n;
      if (rel > n / 2) rel -= n;
      // A slide wrapping from one end to the other jumps there without animating
      if (s._rel !== undefined && Math.abs(rel - s._rel) > 1) {
        s.style.transition = "none";
        s.style.setProperty("--rel", rel);
        s.offsetWidth; // apply instantly
        s.style.transition = "";
      }
      s.style.setProperty("--rel", rel);
      s._rel = rel;
      s.classList.toggle("is-active", rel === 0);
      s.classList.toggle("is-near", Math.abs(rel) === 1);
      s.setAttribute("aria-hidden", rel !== 0);
    });
    [...dots.children].forEach((d, i) => d.classList.toggle("is-active", i === current));
    caption.textContent = PHOTOS[current].caption;
  }

  $("#carouselPrev").addEventListener("click", () => goTo(current - 1));
  $("#carouselNext").addEventListener("click", () => goTo(current + 1));
  dots.addEventListener("click", (e) => {
    const d = e.target.closest(".carousel__dot");
    if (d) goTo(+d.dataset.index);
  });
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(current - 1);
    if (e.key === "ArrowRight") goTo(current + 1);
  });

  // Swipe / drag
  let startX = 0, dx = 0, dragging = false;
  track.addEventListener("pointerdown", (e) => {
    dragging = true;
    startX = e.clientX;
    dx = 0;
    track.classList.add("is-dragging");
    track.setPointerCapture(e.pointerId);
  });
  track.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    dx = e.clientX - startX;
    track.style.setProperty("--drag", `${dx}px`);
  });
  const endDrag = (e) => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove("is-dragging");
    track.style.setProperty("--drag", "0px");
    const threshold = slides[0].offsetWidth * 0.15;
    if (dx < -threshold) goTo(current + 1);
    else if (dx > threshold) goTo(current - 1);
    else if (Math.abs(dx) < 5) {
      // A tap on a side photo brings it to the centre
      const slide = document.elementFromPoint(e.clientX, e.clientY)?.closest(".slide");
      goTo(slide ? +slide.dataset.index : current);
    } else goTo(current);
  };
  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);


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
  goTo(0);
})();
