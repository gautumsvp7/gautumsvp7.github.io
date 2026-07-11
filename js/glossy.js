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

const glossyRevealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll('section').forEach((section) => {
    section.classList.add('reveal');
    glossyRevealObserver.observe(section);
});
