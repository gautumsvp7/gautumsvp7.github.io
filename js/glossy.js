// Shared interactions for the "Glossy Noir" light theme pages.
document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);

    document.querySelectorAll('.glass-card').forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardX = (e.clientX - rect.left) / rect.width;
        const cardY = (e.clientY - rect.top) / rect.height;

        if (cardX > 0 && cardX < 1 && cardY > 0 && cardY < 1) {
            card.style.background = `radial-gradient(circle at ${cardX * 100}% ${cardY * 100}%, rgba(0, 105, 111, 0.08) 0%, rgba(255, 255, 255, 0.7) 70%)`;
        } else {
            card.style.background = 'rgba(255, 255, 255, 0.7)';
        }
    });
});

// threshold: 0 fires as soon as any part of a section enters the viewport.
// A ratio-based threshold (e.g. 0.1) requires 10% of the section's OWN height
// to be visible, which very tall sections (like the projects grid) can never
// reach on short mobile viewports, leaving them stuck at opacity:0 forever.
const glossyRevealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                glossyRevealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0, rootMargin: '0px 0px -5% 0px' }
);

document.querySelectorAll('section').forEach((section) => {
    section.classList.add('reveal');
    glossyRevealObserver.observe(section);
});

// Mobile hamburger menu toggle (shared markup: #mobile-menu-toggle / #mobile-menu)
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuToggle && mobileMenu) {
    const menuIcon = mobileMenuToggle.querySelector('.material-symbols-outlined');

    const closeMobileMenu = () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        if (menuIcon) menuIcon.textContent = 'menu';
    };

    const openMobileMenu = () => {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        mobileMenuToggle.setAttribute('aria-expanded', 'true');
        if (menuIcon) menuIcon.textContent = 'close';
    };

    mobileMenuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('flex');
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMobileMenu);
    });
}
