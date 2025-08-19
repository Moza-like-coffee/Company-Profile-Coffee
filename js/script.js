// =======================
// Initialize AOS
// =======================
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});

// =======================
// Navbar scroll effect
// =======================
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =======================
// Back to top button
// =======================
document.addEventListener('DOMContentLoaded', function () {
  const backToTopButton = document.querySelector('.back-to-top');

  // Show/hide button
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('active');
    } else {
      backToTopButton.classList.remove('active');
    }
  });

  // Custom smooth scroll to top
  function smoothScrollToTop() {
    const start = window.scrollY || document.documentElement.scrollTop;
    const duration = 800; // ms
    const startTime = performance.now();

    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // cubic easing
      window.scrollTo(0, start * (1 - ease));
      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }
    requestAnimationFrame(scrollStep);
  }

  backToTopButton.addEventListener('click', function (e) {
    e.preventDefault();
    smoothScrollToTop();
  });
});

// =======================
// Smooth scrolling for anchor links
// =======================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const href = this.getAttribute('href');
    if (!href || href === "#") return; // ⛔ cegah error querySelector('#')

    // Close mobile menu if open
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse);
      bsCollapse.hide();
    }

    // Custom smooth scroll to target
    const target = document.querySelector(href);
    if (target) {
      const targetPos = target.getBoundingClientRect().top + window.scrollY;
      const start = window.scrollY;
      const distance = targetPos - start;
      const duration = 800;
      const startTime = performance.now();

      function scrollStep(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, start + distance * ease);
        if (progress < 1) {
          requestAnimationFrame(scrollStep);
        }
      }
      requestAnimationFrame(scrollStep);
    }
  });
});

// =======================
// Close mobile menu when clicking outside
// =======================
document.addEventListener('click', function (e) {
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navbarToggler = document.querySelector('.navbar-toggler');

  if (
    navbarCollapse &&
    navbarCollapse.classList.contains('show') &&
    !e.target.closest('.navbar-collapse') &&
    !e.target.closest('.navbar-toggler')
  ) {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
    bsCollapse.hide();
  }
});
