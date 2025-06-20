// Theme switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create theme toggle button
    const toggleButton = document.createElement('button');
    toggleButton.id = 'theme-toggle';
    toggleButton.className = 'theme-toggle-btn';
    toggleButton.setAttribute('aria-label', 'Toggle theme');
    toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(toggleButton);

    // Set initial theme based on user preference or default to dark
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = localStorage.getItem('theme') || (prefersDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleButton(currentTheme);

    // Toggle theme on button click
    toggleButton.addEventListener('click', function() {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleButton(newTheme);
    });

    function updateToggleButton(theme) {
        if (theme === 'dark') {
            toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
            toggleButton.title = 'Switch to light theme';
        } else {
            toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
            toggleButton.title = 'Switch to dark theme';
        }
    }
});
