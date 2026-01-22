/* ============================================
   LFAM Blog JavaScript
   Smooth Scrolling & Section Highlighting
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  // Get all sections with IDs
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".blog-sidebar-link");

  // Highlight active section on scroll
  function highlightActiveSection() {
    let scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Add scroll event listener
  window.addEventListener("scroll", highlightActiveSection);

  // Initial highlight
  highlightActiveSection();

  // Smooth scroll for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add subtle animation to feature cards on scroll
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe cards for animation
  const animatedElements = document.querySelectorAll(
    ".feature-card, .stat-card, .resource-card, .mode-card, .timeline-modern-item",
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  // Add hover effect to split layout images
  const splitImages = document.querySelectorAll(".split-layout img");
  splitImages.forEach((img) => {
    img.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.02)";
      this.style.transition = "transform 0.3s ease";
    });
    img.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });

  // Enhance table rows with hover effect
  const tableRows = document.querySelectorAll("table tbody tr");
  tableRows.forEach((row) => {
    row.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "#f8fafc";
      this.style.transition = "background-color 0.2s ease";
    });
    row.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });
  });
});
