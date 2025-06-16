// Back to Top Button functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('back-to-top');

    // Show/hide back-to-top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get navbar height if it exists, otherwise use 0
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if it's open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                
                if (navbarCollapse && navbarToggler && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Add active class to nav links based on scroll position or current page
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Check if we're on a specific page and highlight its nav link
        const currentPath = window.location.pathname;
        let isSpecificPage = false;
        
        navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (!href) return;
            
            // Remove active class from all links first
            link.classList.remove('active');
            
            // If current URL path contains the href and it's not just the index or root
            if (currentPath.includes(href) && href !== '/' && href !== 'index.html' && href.indexOf('#') === -1) {
                link.classList.add('active');
                isSpecificPage = true;
            }
        });
        
        // If we're not on a specific page, use scroll position for active state
        if (!isSpecificPage) {
            let current = '';
            
            sections.forEach((section) => {
                if (!section.id) return;
                
                const sectionTop = section.offsetTop;
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                
                if (window.pageYOffset >= sectionTop - navbarHeight - 10) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach((link) => {
                const href = link.getAttribute('href');
                if (href && href.includes('#') && href.substring(href.indexOf('#') + 1) === current) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
});

// Enable lazy loading with Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // If there's a data-src attribute, use it as the src
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach((img) => {
            imageObserver.observe(img);
        });
    }
});

// Skills Radar Chart
document.addEventListener('DOMContentLoaded', function() {
    const skillsRadarChart = document.getElementById('skillsRadarChart');
    
    if (skillsRadarChart) {
        // Create radar chart for skills
        new Chart(skillsRadarChart, {
            type: 'radar',
            data: {
                labels: ['Web Development', 'Electrical Engineering', 'IT Support', 'Troubleshooting', 'System Administration', 'Security'],
                datasets: [{
                    label: 'Expertise Level',
                    data: [85, 90, 88, 95, 85, 80],
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                }]
            },
            options: {
                elements: {
                    line: {
                        borderWidth: 3
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 50,
                        suggestedMax: 100
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.formattedValue + '%';
                            }
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: true
            }
        });
    }
});
