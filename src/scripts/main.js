// JavaScript for Dunnis Haven Jewelry Website

// Function to handle hover effects on elements
const addHoverEffect = (element) => {
  element.addEventListener("mouseenter", () => {
    element.style.transform = "scale(1.05)";
    element.style.transition = "transform 0.3s ease";
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "scale(1)";
  });
};

// Apply hover effects to all elements with the class 'hover-effect'
document.querySelectorAll(".hover-effect").forEach(addHoverEffect);

// Function to animate elements on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".animate-on-scroll");
  const windowHeight = window.innerHeight;

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("fade-in");
    }
  });
};

// Event listener for scroll
window.addEventListener("scroll", animateOnScroll);

// Initialize animations on page load
window.addEventListener("load", animateOnScroll);

// Smooth scroll implementation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Parallax effect for hero section
const heroSection = document.querySelector(".hero-section");
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  heroSection.style.backgroundPositionY = scrolled * 0.5 + "px";
});

// Navigation scroll effect
const header = document.querySelector("header");
const scrollThreshold = 50;

window.addEventListener("scroll", () => {
  if (window.scrollY > scrollThreshold) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Hero section parallax effect
const heroImage = document.querySelector(".hero-image img");
const heroDecorations = document.querySelectorAll(".hero-decoration");

window.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth - 0.5;
  const mouseY = e.clientY / window.innerHeight - 0.5;

  heroImage.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;

  heroDecorations.forEach((decoration) => {
    const speed = decoration.dataset.speed || 1;
    decoration.style.transform = `translate(${mouseX * 30 * speed}px, ${
      mouseY * 30 * speed
    }px)`;
  });
});

// Intersection Observer for elegant fade-ins
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((element) => {
  observer.observe(element);
});

// Mobile navigation toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("nav");

const toggleNav = () => {
  const isOpen = nav.classList.contains("active");
  nav.classList.toggle("active");
  navToggle.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", !isOpen);
  document.body.style.overflow = isOpen ? "" : "hidden";
};

// Update navigation toggle
navToggle?.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleNav();
});

// Close navigation on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav.classList.contains("active")) {
    toggleNav();
  }
});

// Close navigation when clicking outside
document.addEventListener("click", (e) => {
  if (
    nav.classList.contains("active") &&
    !nav.contains(e.target) &&
    !navToggle.contains(e.target)
  ) {
    toggleNav();
  }
});

// Close navigation after clicking a link
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    if (nav.classList.contains("active")) {
      toggleNav();
    }
  });
});

// Touch events for hero parallax
let touchStartX = 0;
let touchStartY = 0;

heroSection.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

heroSection.addEventListener("touchmove", (e) => {
  if (!touchStartX || !touchStartY) return;

  const touchEndX = e.touches[0].clientX;
  const touchEndY = e.touches[0].clientY;
  const deltaX = touchStartX - touchEndX;
  const deltaY = touchStartY - touchEndY;

  heroImage.style.transform = `translate(${-deltaX * 0.1}px, ${
    -deltaY * 0.1
  }px)`;
});

heroSection.addEventListener("touchend", () => {
  touchStartX = 0;
  touchStartY = 0;
  heroImage.style.transform = "translate(0, 0)";
});

// Debounced resize handler
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const handleResize = debounce(() => {
  if (window.innerWidth > 768) {
    nav.classList.remove("active");
  }
}, 250);

window.addEventListener("resize", handleResize);

// Theme toggle functionality
const themeToggle = document.querySelector(".theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector("i");
  icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

// Initialize theme
const savedTheme =
  localStorage.getItem("theme") ||
  (prefersDarkScheme.matches ? "dark" : "light");
setTheme(savedTheme);

// Theme toggle event listener
themeToggle?.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

// Listen for system theme changes
prefersDarkScheme.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    setTheme(e.matches ? "dark" : "light");
  }
});

// Initialize product links
document.querySelectorAll(".btn-luxury").forEach((button) => {
  button.addEventListener("click", () => {
    const productTitle =
      button.closest(".product")?.querySelector(".product-title")
        ?.textContent || "this item";
    alert(
      `Thank you for your interest in ${productTitle}. Please use the contact form to inquire about this item.`
    );
  });
});

// Enhanced scroll animations
const animateElements = () => {
  const elements = {
    ".feature-card:nth-child(odd)": "animate-slide-left",
    ".feature-card:nth-child(even)": "animate-slide-right",
    ".product": "animate-fade-up",
    ".testimonial-card": "animate-fade-up",
  };

  for (let [selector, animation] of Object.entries(elements)) {
    document.querySelectorAll(selector).forEach((element) => {
      element.classList.add(animation);
      observer.observe(element);
    });
  }
};

// Smooth scroll with speed control
const smoothScroll = (target, duration = 1000) => {
  const targetPosition = target.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, targetPosition, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  const ease = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(animation);
};

// Enhanced smooth scroll implementation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    smoothScroll(target);
  });
});

// Initialize animations
document.addEventListener("DOMContentLoaded", () => {
  animateElements();

  // Add loading animation to images
  document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
    img.parentElement.classList.add("loading");
    img.addEventListener("load", () => {
      img.parentElement.classList.remove("loading");
    });
  });
});

// Enhanced responsive handlers
const handleResponsive = () => {
  const isMobile = window.innerWidth <= 768;
  const header = document.querySelector("header");
  const heroSection = document.querySelector(".hero-section");

  // Adjust hero height for mobile
  if (isMobile) {
    const viewportHeight = window.innerHeight;
    heroSection.style.minHeight = `${viewportHeight * 0.8}px`;

    // Disable parallax on mobile for better performance
    heroSection.style.backgroundAttachment = "scroll";
  } else {
    heroSection.style.minHeight = "";
    heroSection.style.backgroundAttachment = "fixed";
  }

  // Reset nav state on resize
  if (window.innerWidth > 768 && nav.classList.contains("active")) {
    nav.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  }
};

// Throttle resize handler
const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Initialize responsive handlers
window.addEventListener("resize", throttle(handleResponsive, 100));
window.addEventListener("orientationchange", handleResponsive);
document.addEventListener("DOMContentLoaded", handleResponsive);
