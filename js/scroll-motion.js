/**
 * Quiet scroll reveals + proximity tint for .accent-gratis.
 * CSS-only transforms/opacity; one IntersectionObserver, no per-pixel scroll.
 */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function hostForAccent(el) {
    return el.closest("a, button, h2, h3, h4, p, label") || el;
  }

  function setNear(el, on) {
    el.classList.toggle("is-hot", on);
    hostForAccent(el).classList.toggle("is-near", on);
  }

  function isChrome(el) {
    return !!(el.closest("#navPill") || el.closest("header.fixed") || el.closest("header.sticky"));
  }

  function isOverlay(el) {
    return !!(el.closest("#mobileMenu") || el.closest(".lead-popup"));
  }

  function canFadeOut(el) {
    if (reduce) return false;
    if (!el.classList.contains("bento") && !el.classList.contains("reveal-fade")) return false;
    if (el.matches("form, .btn-primary") || el.querySelector("form, .form-field, [data-product-finish], [data-open-lead-popup]")) return false;
    if (el.closest("#navPill, header, #contact, #lead-form, #mobileMenu, .lead-popup")) return false;
    return true;
  }

  function staggerGridSiblings() {
    if (reduce) return;
    document.querySelectorAll(".grid, .reveal-stagger").forEach((grid) => {
      const kids = [...grid.children].filter((c) => c.classList.contains("reveal"));
      if (kids.length < 2) return;
      kids.forEach((el, i) => {
        if (/reveal-delay/.test(el.className) || el.style.transitionDelay) return;
        el.style.transitionDelay = (0.03 + i * 0.07).toFixed(2) + "s";
      });
    });
  }

  function initReveals() {
    const els = document.querySelectorAll(".reveal, .line-draw");
    if (!els.length) return;

    if (reduce) {
      els.forEach((el) => {
        el.classList.add("visible");
        el.classList.remove("is-away");
      });
      return;
    }

    staggerGridSiblings();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            e.target.classList.remove("is-away");
          } else if (e.target.classList.contains("visible") && canFadeOut(e.target)) {
            e.target.classList.add("is-away");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => {
      observer.observe(el);
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("visible");
    });
  }

  function syncNavGratis() {
    const nav = document.getElementById("navPill") || document.querySelector("header.fixed, header.sticky");
    const hot = !!(nav && (nav.classList.contains("scrolled") || (nav.id !== "navPill" && window.scrollY > 60)));
    (nav || document).querySelectorAll("#navPill .accent-gratis, header.fixed .accent-gratis, header.sticky .accent-gratis").forEach((el) => {
      if (el.closest("#mobileMenu")) return;
      setNear(el, hot);
    });
  }

  function syncOverlays() {
    const menu = document.getElementById("mobileMenu");
    const menuOpen = !!(menu && !menu.classList.contains("translate-x-full") && getComputedStyle(menu).visibility !== "hidden");
    menu?.querySelectorAll(".accent-gratis").forEach((el) => setNear(el, menuOpen));

    const popupOpen = !!document.querySelector(".lead-popup.is-open");
    document.querySelectorAll(".lead-popup .accent-gratis").forEach((el) => setNear(el, popupOpen));
  }

  function initAccents() {
    const seen = new WeakSet();

    const nearObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const span = e.target.classList.contains("accent-gratis")
            ? e.target
            : e.target.querySelector(":scope > .accent-gratis") || e.target.querySelector(".accent-gratis");
          if (!span) return;
          setNear(span, e.isIntersecting);
        });
      },
      { threshold: 0.01, rootMargin: "160px 0px 160px 0px" }
    );

    function watch(el) {
      if (!el || seen.has(el)) return;
      seen.add(el);
      if (isChrome(el) || isOverlay(el)) return;
      nearObs.observe(hostForAccent(el));
    }

    function scan(root) {
      (root.querySelectorAll ? root : document).querySelectorAll(".accent-gratis").forEach(watch);
    }

    scan(document);
    syncNavGratis();
    syncOverlays();

    const navPill = document.getElementById("navPill");
    if (navPill) {
      const onScroll = () => {
        const cm = 96 / 2.54;
        const t = Math.min(1, Math.max(0, window.scrollY / cm));
        navPill.style.setProperty("--nav-shade", t.toFixed(3));
        navPill.classList.toggle("scrolled", window.scrollY > 60);
        syncNavGratis();
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    const menu = document.getElementById("mobileMenu");
    if (menu) {
      new MutationObserver(syncOverlays).observe(menu, { attributes: true, attributeFilter: ["class"] });
    }

    const popup = document.getElementById("leadPopup");
    if (popup) {
      new MutationObserver(() => {
        scan(popup);
        syncOverlays();
      }).observe(popup, { attributes: true, attributeFilter: ["class", "hidden"], childList: true, subtree: true });
    }

    new MutationObserver((records) => {
      records.forEach((r) => {
        r.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          if (n.matches && n.matches(".accent-gratis")) watch(n);
          if (n.querySelectorAll) n.querySelectorAll(".accent-gratis").forEach(watch);
        });
      });
      syncOverlays();
    }).observe(document.body, { childList: true, subtree: true });
  }

  function initScrollCanvas() {
    const root = document.documentElement;
    if (reduce) {
      root.style.setProperty("--scroll-blue", "0.22");
      return;
    }

    let ticking = false;
    function update() {
      ticking = false;
      const vh = window.innerHeight || 1;
      const max = Math.max(root.scrollHeight - vh, 1);
      const y = window.scrollY || root.scrollTop || 0;
      const byDoc = y / max;
      const byView = y / (vh * 2.6);
      const p = Math.min(1, Math.max(0, Math.max(byDoc, byView)));
      root.style.setProperty("--scroll-blue", p.toFixed(4));
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  function initSwooshUnderline() {
    const els = document.querySelectorAll(".swoosh-underline");
    if (!els.length) return;

    if (reduce) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-drawn");
          observer.unobserve(e.target);
        });
      },
      { threshold: 0.45, rootMargin: "0px 0px -12% 0px" }
    );

    els.forEach((el) => observer.observe(el));
  }

  function init() {
    initScrollCanvas();
    initReveals();
    initAccents();
    initSwooshUnderline();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
