(function () {
    'use strict';

    function init() {

        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const t = document.querySelector(a.getAttribute('href'));
                if (t) {
                    e.preventDefault();
                    t.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, i * 80);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px'
        });


        const cards = document.querySelectorAll('.project-card, .skill-card, .service-card');
        cards.forEach(el => {
            revealObserver.observe(el);
        });


        if (cards.length === 0) {
            console.warn('No cards found to observe! Check your selectors.');
        } else {
            console.log(`Found ${cards.length} cards to animate.`);
        }
    }


    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }




})();

