/**
 * Enhanced Theme Switcher
 * Supports multiple themes: Dark (default), Light, and Solarized
 */

// Available themes
const THEMES = [
  {
    name: 'dark',
    label: 'Dark',
    icon: '<i class="fas fa-moon"></i>'
  },
  {
    name: 'light',
    label: 'Light',
    icon: '<i class="fas fa-sun"></i>'
  },
  {
    name: 'solarized',
    label: 'Solarized',
    icon: '<i class="fas fa-palette"></i>'
  }
];

// Initialize theme system
document.addEventListener('DOMContentLoaded', function() {
  initializeThemeSystem();
});

/**
 * Set up the theme system with toggle button and theme menu
 */
function initializeThemeSystem() {
  // Check for saved theme preference or use default (dark)
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);
  
  // Create theme toggle button if it doesn't exist
  createThemeToggleButton();
  
  // Create theme menu if it doesn't exist
  createThemeMenu();
}

/**
 * Create the theme toggle button
 */
function createThemeToggleButton() {
  if (!document.querySelector('.theme-toggle-btn')) {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle-btn';
    themeToggle.id = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle theme menu');
    themeToggle.setAttribute('title', 'Change theme');
    
    // Set icon based on current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const theme = THEMES.find(t => t.name === currentTheme) || THEMES[0];
    themeToggle.innerHTML = theme.icon;
    
    // Add to body
    document.body.appendChild(themeToggle);
    
    // Add event listener to open the theme menu
    themeToggle.addEventListener('click', toggleThemeMenu);
  }
}

/**
 * Create the theme selection menu
 */
function createThemeMenu() {
  if (!document.querySelector('.theme-menu')) {
    const themeMenu = document.createElement('div');
    themeMenu.className = 'theme-menu';
    themeMenu.id = 'theme-menu';
    
    // Generate menu options for each theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    THEMES.forEach(theme => {
      const option = document.createElement('div');
      option.className = `theme-option ${theme.name === currentTheme ? 'active' : ''}`;
      option.setAttribute('data-theme', theme.name);
      option.innerHTML = `
        <span class="theme-icon">${theme.icon}</span>
        ${theme.label}
      `;
      option.addEventListener('click', () => {
        setTheme(theme.name);
        closeThemeMenu();
        
        // Update button icon
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
          themeToggle.innerHTML = theme.icon;
        }
        
        // Update active state in menu
        document.querySelectorAll('.theme-option').forEach(opt => {
          opt.classList.toggle('active', opt.getAttribute('data-theme') === theme.name);
        });
      });
      
      themeMenu.appendChild(option);
    });
    
    // Add to body
    document.body.appendChild(themeMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const themeToggle = document.getElementById('theme-toggle');
      const themeMenu = document.getElementById('theme-menu');
      
      if (themeMenu && 
          themeToggle && 
          !themeMenu.contains(event.target) && 
          !themeToggle.contains(event.target)) {
        closeThemeMenu();
      }
    });
  }
}

/**
 * Toggle the theme menu visibility
 */
function toggleThemeMenu() {
  const themeMenu = document.getElementById('theme-menu');
  if (themeMenu) {
    themeMenu.classList.toggle('show');
    
    // Set aria-expanded for accessibility
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      const isExpanded = themeMenu.classList.contains('show');
      themeToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    }
  }
}

/**
 * Close the theme menu
 */
function closeThemeMenu() {
  const themeMenu = document.getElementById('theme-menu');
  if (themeMenu) {
    themeMenu.classList.remove('show');
    
    // Update aria-expanded
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.setAttribute('aria-expanded', 'false');
    }
  }
}

/**
 * Set the active theme
 * 
 * @param {string} themeName - Name of the theme to set
 */
function setTheme(themeName) {
  // Validate theme name
  if (!THEMES.some(theme => theme.name === themeName)) {
    console.error(`Theme "${themeName}" not found. Using default dark theme.`);
    themeName = 'dark';
  }
  
  // Apply theme to document
  document.documentElement.setAttribute('data-theme', themeName);
  
  // Save preference to localStorage
  localStorage.setItem('theme', themeName);
  
  // Dispatch custom event for theme change
  document.dispatchEvent(new CustomEvent('themeChanged', { 
    detail: { theme: themeName }
  }));
  
  // Update theme toggle icon
  updateThemeToggleIcon(themeName);
}

/**
 * Update the theme toggle button icon based on current theme
 * 
 * @param {string} themeName - Current theme name
 */
function updateThemeToggleIcon(themeName) {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const theme = THEMES.find(t => t.name === themeName) || THEMES[0];
    themeToggle.innerHTML = theme.icon;
  }
}

/**
 * Get the current active theme
 * 
 * @returns {string} Current theme name
 */
function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'dark';
}
