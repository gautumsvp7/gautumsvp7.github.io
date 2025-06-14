// Scroll-triggered Fade-in Animation
const fadeInElements = document.querySelectorAll('.fade-in-scroll');

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Optional: unobserve after animation
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of the element is visible

fadeInElements.forEach(element => {
    scrollObserver.observe(element);
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or use system preference
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
    body.classList.add("dark-mode");
} else if (currentTheme === "light") {
    body.classList.remove("dark-mode");
} else if (prefersDarkScheme.matches) {
    body.classList.add("dark-mode");
}


themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    let theme = "light";
    if (body.classList.contains("dark-mode")) {
        theme = "dark";
    }
    localStorage.setItem("theme", theme);
});

// Responsive Navbar - Hamburger Menu
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon && navLinks) { // Ensure elements exist
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked (optional, good for SPA-like feel)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
} else {
    console.log("Menu icon or nav links not found. Ensure they are in your HTML.");
}
console.log("Portfolio script loaded and theme/navbar logic attached.");
// Reminder: Page load fade-in is handled by CSS animation on the body tag.
