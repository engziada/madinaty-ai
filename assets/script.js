(function initializeSite() {
  "use strict";

  const menuToggleButton = document.querySelector("[data-menu-toggle]");
  const menuContainer = document.querySelector("[data-menu]");

  function toggleMobileMenu() {
    if (!menuContainer) {
      return;
    }
    menuContainer.classList.toggle("open");
  }

  function closeMobileMenuOnResize() {
    if (!menuContainer) {
      return;
    }
    if (window.innerWidth > 900) {
      menuContainer.classList.remove("open");
    }
  }

  function setupScrollReveal() {
    const revealTargets = document.querySelectorAll(".reveal");
    if (!revealTargets.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
      }
    );

    revealTargets.forEach((target) => observer.observe(target));
  }

  function setupMapInteractions() {
    const mapDots = document.querySelectorAll(".map-dot");
    mapDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        dot.animate(
          [
            { transform: "scale(1)", opacity: 1 },
            { transform: "scale(1.35)", opacity: 0.75 },
            { transform: "scale(1)", opacity: 1 },
          ],
          {
            duration: 500,
            easing: "ease-out",
          }
        );
      });
    });
  }

  if (menuToggleButton) {
    menuToggleButton.addEventListener("click", toggleMobileMenu);
  }

  window.addEventListener("resize", closeMobileMenuOnResize);
  setupScrollReveal();
  setupMapInteractions();
})();
