(function () {
  "use strict";

  /* ----------------------------------------------------------
     Footer year
  ---------------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----------------------------------------------------------
     Theme toggle (dark / light) with localStorage persistence
  ---------------------------------------------------------- */
  var THEME_KEY = "pa-theme";
  var body = document.body;
  var themeToggle = document.getElementById("themeToggle");

  function applyTheme(theme) {
    body.setAttribute("data-theme", theme);
    if (themeToggle) {
      var isLight = theme === "light";
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
      );
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* localStorage unavailable (private browsing, etc.) — fail silently */
    }
  }

  function getInitialTheme() {
    var stored = null;
    try {
      stored = localStorage.getItem(THEME_KEY);
    } catch (e) {
      stored = null;
    }
    if (stored === "light" || stored === "dark") return stored;

    var prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
  }

  applyTheme(getInitialTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var current = body.getAttribute("data-theme") === "light" ? "light" : "dark";
      applyTheme(current === "light" ? "dark" : "light");
    });
  }

  /* ----------------------------------------------------------
     Mobile navigation
  ---------------------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  function closeMobileNav() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  function openMobileNav() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.contains("is-open");
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMobileNav();
    });
  }

  /* ----------------------------------------------------------
     Fixed nav: scrolled state + scroll progress bar
  ---------------------------------------------------------- */
  var siteNav = document.getElementById("siteNav");
  var scrollProgress = document.getElementById("scrollProgress");

  function onScroll() {
    var scrollY = window.scrollY || window.pageYOffset;

    if (siteNav) {
      siteNav.classList.toggle("is-scrolled", scrollY > 8);
    }

    if (scrollProgress) {
      var docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      scrollProgress.style.width = Math.min(100, Math.max(0, progress)) + "%";
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----------------------------------------------------------
     Reveal-on-scroll animations
  ---------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately if IO isn't supported
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ----------------------------------------------------------
     Project case-study modals
  ---------------------------------------------------------- */
  var openTriggers = document.querySelectorAll("[data-modal-target]");
  var activeModal = null;
  var lastFocusedEl = null;

  function getFocusableEls(container) {
    return container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
  }

  function openModal(modal) {
    if (!modal) return;
    lastFocusedEl = document.activeElement;

    modal.hidden = false;
    // Force reflow so the transition triggers
    void modal.offsetWidth;
    modal.classList.add("is-open");

    document.body.style.overflow = "hidden";
    activeModal = modal;

    var closeBtn = modal.querySelector("[data-modal-close]");
    if (closeBtn) closeBtn.focus();

    document.addEventListener("keydown", onModalKeydown);
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    activeModal = null;

    document.removeEventListener("keydown", onModalKeydown);

    var finish = function () {
      modal.hidden = true;
      modal.removeEventListener("transitionend", finish);
    };
    modal.addEventListener("transitionend", finish);
    // Safety fallback in case transitionend doesn't fire
    setTimeout(function () {
      if (!modal.classList.contains("is-open")) modal.hidden = true;
    }, 400);

    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
      lastFocusedEl.focus();
    }
  }

  function onModalKeydown(e) {
    if (!activeModal) return;

    if (e.key === "Escape") {
      closeModal(activeModal);
      return;
    }

    // Basic focus trap
    if (e.key === "Tab") {
      var focusable = getFocusableEls(activeModal);
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  openTriggers.forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      var targetId = trigger.getAttribute("data-modal-target");
      var modal = document.getElementById(targetId);
      openModal(modal);
    });
  });

  document.querySelectorAll(".modal-overlay").forEach(function (overlay) {
    // Click outside modal content closes it
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeModal(overlay);
    });

    overlay.querySelectorAll("[data-modal-close]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        closeModal(overlay);
      });
    });
  });
})();
