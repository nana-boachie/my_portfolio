// Shared behaviour for every page: theme toggle, mobile menu, reveal on scroll, contact form

(function () {
    const root = document.documentElement;

    function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            // Storage can be blocked; the theme still applies for this visit
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        const themeButton = document.querySelector('.theme-toggle');
        if (themeButton) {
            themeButton.addEventListener('click', function () {
                setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
            });
        }

        const menuButton = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav');
        if (menuButton && nav) {
            menuButton.addEventListener('click', function () {
                const open = nav.classList.toggle('open');
                menuButton.setAttribute('aria-expanded', String(open));
            });
        }

        const year = document.querySelector('[data-year]');
        if (year) {
            year.textContent = new Date().getFullYear();
        }

        const revealItems = document.querySelectorAll('.reveal');
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '0px 0px -40px 0px' });
            revealItems.forEach(function (item) {
                observer.observe(item);
            });
        } else {
            revealItems.forEach(function (item) {
                item.classList.add('visible');
            });
        }

        // The site is static, so the form hands the message to the visitor's email app or WhatsApp
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                const data = new FormData(form);
                const name = data.get('name').trim();
                const subject = data.get('subject').trim() || 'Website enquiry';
                const message = data.get('message').trim();
                const body = message + '\n\n' + name + (data.get('email') ? ' (' + data.get('email').trim() + ')' : '');
                const via = event.submitter && event.submitter.value === 'whatsapp' ? 'whatsapp' : 'email';

                if (via === 'whatsapp') {
                    const text = 'Hello Yiadom, ' + subject + '\n\n' + body;
                    window.open('https://wa.me/233559808201?text=' + encodeURIComponent(text), '_blank', 'noopener');
                } else {
                    window.location.href = 'mailto:nana.kwame.yiadom@gmail.com?subject=' +
                        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
                }
            });
        }
    });
})();
