/**
 * Crochet Radiance - Interactive JS Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Scroll Animations & Intersection Observer
  initScrollAnimations();

  // 2. Mobile Menu Toggle
  initMobileMenu();

  // 3. Navbar Sticky Effect & Scroll spy active links
  initNavbarEffects();

  // 4. Custom SVG Yarn Path Drawing
  initYarnDrawing();

  // 5. Contact Form Submission Handling
  initContactForm();

  // 6. Smooth Scroll for Anchor Links
  initSmoothScroll();
});

/**
 * Handles fade-in scroll animation triggers using Intersection Observer
 */
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in-up');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once animated, stop observing this element
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => scrollObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    fadeElements.forEach(el => el.classList.add('visible'));
  }
}

/**
 * Handles opening and closing the mobile drawer navigation
 */
function initMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    // Toggle active state
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

/**
 * Handles sticky nav scrolling and highlighting active nav links on scroll
 */
function initNavbarEffects() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Sticky navbar check
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Spy active navigation item
    let currentId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // Offset values to trigger highlight slightly early
      if (window.scrollY >= (sectionTop - 120)) {
        const id = section.getAttribute('id');
        currentId = id ? id : '';
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      // If home page or empty id (meaning we are in the header)
      if (currentId === '' && link.getAttribute('href') === '#') {
        link.classList.add('active');
      } else if (currentId !== '' && link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Measures the yarn SVG path and triggers a smooth drawing animation
 */
function initYarnDrawing() {
  const yarnLine = document.getElementById('yarn-draw-line');
  
  if (yarnLine) {
    try {
      const length = yarnLine.getTotalLength();
      
      // Clear style transition for initial setup
      yarnLine.style.transition = 'none';
      yarnLine.style.strokeDasharray = length;
      yarnLine.style.strokeDashoffset = length;
      
      // Trigger reflow/layout recalculation
      yarnLine.getBoundingClientRect();
      
      // Apply smooth transition and draw
      yarnLine.style.transition = 'stroke-dashoffset 8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      yarnLine.style.strokeDashoffset = '0';
    } catch (e) {
      console.warn("Could not calculate SVG path length, using CSS fallback animation.", e);
    }
  }
}

/**
 * Captures form submission, showcases mock validation, and reveals a custom success modal
 */
function initContactForm() {
  const contactForm = document.getElementById('crochet-contact-form');
  const successAlert = document.getElementById('form-success-alert');
  const closeAlertBtn = document.getElementById('close-alert-btn');

  if (contactForm && successAlert) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Capture form input (simulate submission API call)
      const name = document.getElementById('form-name').value;
      const email = document.getElementById('form-email').value;
      const interest = document.getElementById('form-interest').value;
      const message = document.getElementById('form-message').value;

      console.log("Submitting Message:", { name, email, interest, message });

      // Trigger interactive success notification overlay
      successAlert.classList.add('show');
    });

    // Close alert modal
    if (closeAlertBtn) {
      closeAlertBtn.addEventListener('click', () => {
        successAlert.classList.remove('show');
        // Reset form inputs after dismiss
        contactForm.reset();
      });
    }
  }
}

/**
 * Handles smooth scrolling and offset calculations when jumping between page anchors
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Offset scroll distance to account for sticky navbar height
        const navbarHeight = document.getElementById('navbar').clientHeight || 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight + 5;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
