(function () {
    'use strict';

    function init() {

        // ─── SMOOTH SCROLL ───
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const t = document.querySelector(a.getAttribute('href'));
                if (t) {
                    e.preventDefault();
                    t.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // ─── SCROLL REVEAL ───
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
        cards.forEach(el => revealObserver.observe(el));

        // ─── HAMBURGER MENU ───
        const toggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (toggle && navLinks) {
            toggle.addEventListener('click', () => {
                const isOpen = navLinks.classList.toggle('open');
                toggle.classList.toggle('open');
                toggle.setAttribute('aria-expanded', isOpen);
            });

            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    toggle.classList.remove('open');
                    navLinks.classList.remove('open');
                    toggle.setAttribute('aria-expanded', 'false');
                });
            });
        }

        // ─── STICKY NAV ON SCROLL ───
        const nav = document.querySelector('nav');
        if (nav) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 20) {
                    nav.style.background = 'rgba(13,13,13,0.95)';
                    nav.style.backdropFilter = 'blur(12px)';
                    nav.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
                } else {
                    nav.style.background = 'transparent';
                    nav.style.backdropFilter = 'none';
                    nav.style.borderBottom = 'none';
                }
            }, { passive: true });
        }

        // ─── MAILTO MODAL ───
        const mailModal = document.getElementById('mailModal');
        const modalClose = document.getElementById('modalClose');
        const copyBtn = document.getElementById('copyBtn');

        // Guard: modal elements must exist
        if (!mailModal) return;

        function openModal() {
            mailModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            mailModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // PC → open modal | Mobile/Tablet → redirect to mail app
        document.querySelectorAll('.btn-ghost').forEach(btn => {
            if (btn.getAttribute('href')?.startsWith('mailto:')) {
                btn.addEventListener('click', e => {
                    e.preventDefault();
                    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

                    if (!isMobile) {
                        openModal();
                    } else {
                        window.location.href = 'mailto:jamesreybrizuela513@gmail.com?subject=Project%20Inquiry&body=Hi%20James%2C%20I%27d%20like%20to%20work%20with%20you%20on...';
                    }
                });
            }
        });

        // Close on ✕ button
        if (modalClose) modalClose.addEventListener('click', closeModal);

        // Close on overlay click
        mailModal.addEventListener('click', e => {
            if (e.target === mailModal) closeModal();
        });

        // Close on Escape key
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && mailModal.classList.contains('active')) closeModal();
        });

        // Copy email to clipboard
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText('jamesreybrizuela513@gmail.com').then(() => {
                    copyBtn.textContent = 'Copied!';
                    copyBtn.classList.add('copied');
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy';
                        copyBtn.classList.remove('copied');
                    }, 2000);
                });
            });
        }


        // ─── PROJECT MODAL DATA ───
        const projects = {
            strawberry: {
                title: 'Strawberry SMP Minecraft Website',
                image: 'assets/images/strawberry.png',
                tags: ['Community', 'Gaming', 'Web'],
                desc: 'A custom website built for a Minecraft SMP server community. Features information pages, server rules, player guides, and a dynamic layout designed to reflect the server\'s unique identity and attract new players.',
                stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel'],
                features: [
                    'Custom server information and rules pages',
                    'Player guide section for new members',
                    'Responsive layout for mobile and desktop',
                    'Dynamic content powered by Laravel backend',
                ],
                github: 'https://github.com/Nyaaxie',
                demo: 'https://strawberry-smp.up.railway.app/'
            },
            cashsync: {
                title: 'CashSync E-Wallet',
                image: 'assets/images/cashbytes.png',
                tags: ['Fintech', 'Web App', 'PHP'],
                desc: 'A modern e-wallet web application featuring secure money transfers, full transaction history, and a clean simplified UI. Designed to make digital payments easy and accessible for everyday users.',
                stack: ['PHP', 'Laravel', 'MySQL', 'HTML', 'CSS'],
                features: [
                    'Secure peer-to-peer money transfers',
                    'Full transaction history with filters',
                    'Clean and minimal dashboard UI',
                    'User authentication and account management',
                ],
                github: 'https://github.com/Nyaaxie',
                demo: '#'
            },
            edukatrack: {
                title: 'Edukur Track System',
                image: 'assets/images/edukatrack.png',
                tags: ['Education', 'System', 'Python'],
                desc: 'An educational tracking system designed to help teachers and administrators manage student progress, grades, and curriculum data efficiently — all in one centralized platform.',
                stack: ['Python', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
                features: [
                    'Student progress and grade tracking',
                    'Curriculum and subject management',
                    'Admin dashboard with data overview',
                    'Exportable reports for academic records',
                ],
                github: 'https://github.com/Nyaaxie',
                demo: '#'
            }
        };

        // ─── OPEN PROJECT MODAL ───
        const projectModal = document.getElementById('projectModal');
        const projectModalClose = document.getElementById('projectModalClose');

        function openProjectModal(key) {
            const data = projects[key];
            if (!data) return;

            // Populate content
            document.getElementById('pmImage').src = data.image;
            document.getElementById('pmImage').alt = data.title;
            document.getElementById('pmTitle').textContent = data.title;
            document.getElementById('pmDesc').textContent = data.desc;
            document.getElementById('pmGithub').href = data.github;

            // ─── LIVE DEMO BUTTON ───
            const demoBtn = document.getElementById('pmDemo');
            if (data.demo && data.demo !== '#') {
                demoBtn.href = data.demo;
                demoBtn.classList.remove('btn-disabled');
                demoBtn.removeAttribute('title');
                demoBtn.style.pointerEvents = '';
                demoBtn.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo';
            } else {
                demoBtn.href = '#';
                demoBtn.classList.add('btn-disabled');
                demoBtn.setAttribute('title', 'Live demo not available yet');
                demoBtn.style.pointerEvents = 'none';
                demoBtn.innerHTML = '<i class="fa-solid fa-ban"></i> Not Available';
            }

            // Tags
            const tagsEl = document.getElementById('pmTags');
            tagsEl.innerHTML = data.tags.map(t =>
                `<span class="tag">${t}</span>`
            ).join('');

            // Stack
            const stackEl = document.getElementById('pmStack');
            stackEl.innerHTML = data.stack.map(s =>
                `<span class="pm-stack-item">${s}</span>`
            ).join('');

            // Features
            const featuresEl = document.getElementById('pmFeatures');
            featuresEl.innerHTML = data.features.map(f =>
                `<li>${f}</li>`
            ).join('');

            // Open
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeProjectModal() {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Wire up View Details buttons
        document.querySelectorAll('.project-card').forEach((card, i) => {
            const keys = ['strawberry', 'cashsync', 'edukatrack'];
            const detailBtn = card.querySelector('.btn-outline');
            if (detailBtn) {
                detailBtn.addEventListener('click', e => {
                    e.preventDefault();
                    openProjectModal(keys[i]);
                });
            }
        });

        // Close handlers
        if (projectModalClose) projectModalClose.addEventListener('click', closeProjectModal);
        projectModal.addEventListener('click', e => {
            if (e.target === projectModal) closeProjectModal();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && projectModal.classList.contains('active')) closeProjectModal();
        });

        // ─── LIVE DEMO BUTTONS ON CARDS ───
        document.querySelectorAll('.btn-demo').forEach(btn => {
            const url = btn.getAttribute('data-demo');
            if (!url || url === '#' || url.trim() === '') {
                // No URL set — disable it
                btn.classList.add('btn-disabled');
                btn.classList.remove('btn-red');
                btn.setAttribute('title', 'Live demo not available yet');
                btn.innerHTML = '<i class="fa-solid fa-ban"></i> Not Available';
                btn.addEventListener('click', e => e.preventDefault());
            } else {
                // URL set — make it work
                btn.href = url;
                btn.target = '_blank';
                btn.rel = 'noopener';
            }
        });



    } // ← end of init()

    // ─── SAFE DOM READY CHECK ───
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();