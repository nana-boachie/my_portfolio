/**
 * Optimized JavaScript for Portfolio Website
 * Combines functionality from script.js, ui-components.js, and theme-switcher.js
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  setupMobileMenu();
  setupBackToTop();
  setupThemeToggle();
  setupFormValidation();
  setupSmoothScroll();
  
  // Initialize any page-specific components
  const currentPage = window.location.pathname;
  if (currentPage.includes('/contact.html')) {
    setupContactForm();
  }
});

/**
 * Theme Toggle Functionality
 */
function setupThemeToggle() {
  // Check for saved theme preference or use default (dark)
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Create theme toggle button if it doesn't exist
  if (!document.querySelector('.theme-toggle-btn')) {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle-btn';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    themeToggle.innerHTML = savedTheme === 'dark' 
      ? '<i class="fas fa-sun"></i>' 
      : '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);
    
    // Add event listener to toggle theme
    themeToggle.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  // Update theme
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update icon
  const themeToggle = document.querySelector('.theme-toggle-btn');
  if (themeToggle) {
    themeToggle.innerHTML = newTheme === 'dark' 
      ? '<i class="fas fa-sun"></i>' 
      : '<i class="fas fa-moon"></i>';
  }
}

/**
 * UI Components
 */
function setupMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      // Improve accessibility
      const expanded = mobileMenu.classList.contains('hidden') ? 'false' : 'true';
      mobileMenuButton.setAttribute('aria-expanded', expanded);
    });
  }
}

function setupBackToTop() {
  const backToTopButton = document.createElement('button');
  backToTopButton.className = 'back-to-top';
  backToTopButton.setAttribute('aria-label', 'Back to top');
  backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backToTopButton);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });
  
  // Scroll to top when clicked
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Smooth scrolling for anchor links
 */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Contact Form Functionality
 */
function setupContactForm() {
  const form = document.querySelector('form[id="contactForm"]');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      let valid = true;
      const nameInput = form.querySelector('input[name="name"]');
      const emailInput = form.querySelector('input[name="email"]');
      const messageInput = form.querySelector('textarea[name="message"]');
      
      // Reset previous error states
      form.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
      });
      
      // Validate name (required)
      if (!nameInput.value.trim()) {
        nameInput.classList.add('is-invalid');
        valid = false;
      }
      
      // Validate email (required and format)
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        emailInput.classList.add('is-invalid');
        valid = false;
      }
      
      // Validate message (required)
      if (!messageInput.value.trim()) {
        messageInput.classList.add('is-invalid');
        valid = false;
      }
      
      if (valid) {
        // In a real application, you would submit to a backend here
        // For now, show a success message
        showFormSubmitResult(true, 'Message sent successfully! I\'ll get back to you soon.');
        form.reset();
      } else {
        showFormSubmitResult(false, 'Please complete all required fields correctly.');
      }
    });
  }
}

function isValidEmail(email) {
  // Basic email validation regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormSubmitResult(success, message) {
  const resultDiv = document.getElementById('form-result') || document.createElement('div');
  
  if (!document.getElementById('form-result')) {
    resultDiv.id = 'form-result';
    document.querySelector('form[id="contactForm"]').after(resultDiv);
  }
  
  resultDiv.className = success ? 'alert alert-success mt-3' : 'alert alert-danger mt-3';
  resultDiv.textContent = message;
  
  // Auto-hide message after 5 seconds
  setTimeout(() => {
    resultDiv.style.opacity = '0';
    setTimeout(() => resultDiv.remove(), 500);
  }, 5000);
}

/**
 * Helper Functions
 */
function setupFormValidation() {
  // Add form validation behavior for all forms
  document.querySelectorAll('form').forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Validate on blur
      input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
          this.classList.add('is-invalid');
        } else {
          this.classList.remove('is-invalid');
        }
        
        // Email validation
        if (this.type === 'email' && this.value.trim() && !isValidEmail(this.value)) {
          this.classList.add('is-invalid');
        }
      });
      
      // Clear validation on focus
      input.addEventListener('focus', function() {
        this.classList.remove('is-invalid');
      });
    });
  });
}

// Performance optimization: Use passive event listeners where possible
document.addEventListener('scroll', function() {}, { passive: true });
document.addEventListener('touchstart', function() {}, { passive: true });

// Preload key images for better performance
function preloadImages() {
  const imagesToPreload = [
    'path/to/important-image-1.jpg',
    'path/to/important-image-2.jpg'
  ];
  
  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Execute non-critical functions after page load
window.addEventListener('load', function() {
  preloadImages();
});
