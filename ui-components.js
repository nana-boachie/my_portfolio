/**
 * UI Components JavaScript
 * Contains shared functionality for navigation and UI elements
 */

// Mobile menu toggle
function setupMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

// Back to top button functionality
function setupBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  
  if (backToTopButton) {
    // Initially hide the button
    backToTopButton.style.display = 'none';
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    });
    
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Run all setup functions when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  setupMobileMenu();
  setupBackToTop();
});
