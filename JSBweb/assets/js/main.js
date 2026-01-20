document.addEventListener('DOMContentLoaded', () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 2. Dynamic Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // 3. Hero Slider
    const slides = document.querySelectorAll('#hero-slider .slide');
    const dots = document.querySelectorAll('#slider-dots .slider-dot');
    if (slides.length && dots.length) {
        let currentSlide = 0;
        let slideInterval;

        const showSlide = (i) => {
            const exitingSlide = document.querySelector('#hero-slider .slide.active');
            if (exitingSlide) exitingSlide.classList.add('exiting');

            currentSlide = i;
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');

            if (exitingSlide && !prefersReduced) {
                setTimeout(() => exitingSlide.classList.remove('exiting'), 1000);
            } else if (exitingSlide) {
                exitingSlide.classList.remove('exiting');
            }
        };

        const nextSlide = () => showSlide((currentSlide + 1) % slides.length);
        const start = () => { if (!prefersReduced) slideInterval = setInterval(nextSlide, 5000); };
        const stop = () => clearInterval(slideInterval);

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                if (idx !== currentSlide) {
                    stop(); showSlide(idx); start();
                }
            });
        });

        start();
    }

    // 4. Platform Slider
    const platformSlider = document.getElementById('platform-slider');
    if (platformSlider) {
        const slidesContainer = platformSlider.querySelector('.platform-slides');
        const prevButton = document.getElementById('platform-prev');
        const nextButton = document.getElementById('platform-next');
        const slides = slidesContainer.querySelectorAll('.platform-slide-img');
        const slideCount = slides.length;
        let currentIndex = 0;
        let platformInterval;

        function updatePlatformSlider() {
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function nextPlatformSlide() {
            currentIndex = (currentIndex + 1) % slideCount;
            updatePlatformSlider();
        }

        function prevPlatformSlide() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updatePlatformSlider();
        }

        function startPlatformSlider() {
            platformInterval = setInterval(nextPlatformSlide, 4000);
        }

        function stopPlatformSlider() {
            clearInterval(platformInterval);
        }

        nextButton.addEventListener('click', () => {
            stopPlatformSlider();
            nextPlatformSlide();
            startPlatformSlider();
        });

        prevButton.addEventListener('click', () => {
            stopPlatformSlider();
            prevPlatformSlide();
            startPlatformSlider();
        });

        startPlatformSlider();
    }

    // 5. Lightbox for Platform Images
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const platformImages = document.querySelectorAll('.platform-slide-img');

    if (lightbox && lightboxImg && lightboxClose && platformImages.length > 0) {
        const openLightbox = (e) => {
            lightboxImg.src = e.target.src;
            lightbox.classList.remove('hidden');
            setTimeout(() => lightbox.classList.add('active'), 10);
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => lightbox.classList.add('hidden'), 300);
        };

        platformImages.forEach(img => {
            img.addEventListener('click', openLightbox);
        });

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox.querySelector('.lightbox-overlay')) {
                closeLightbox();
            }
        });
    }

    // 6. Form Loader Logic
    const formContainer = document.getElementById('suitedash-form-container');
    const formLoader = document.getElementById('form-loader');

    if (formContainer && formLoader) {
        setTimeout(() => {
            formLoader.style.display = 'none';
        }, 2000);
    }

    // 7. Scroll Reveal / Observer Logic
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => revealOnScroll.observe(el));

    // 8. Testimonial Slider Logic (Workshops Page)
    const track = document.getElementById('testimonial-track');
    if (track) {
        const dots = document.querySelectorAll('.testi-dot');
        const prevBtn = document.getElementById('testi-prev');
        const nextBtn = document.getElementById('testi-next');
        let currentIdx = 0;
        const totalSlides = 3;

        function updateSlider(index) {
            currentIdx = index;
            track.style.transform = `translateX(-${currentIdx * 100}%)`;
            dots.forEach((dot, i) => {
                if (i === currentIdx) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                let next = currentIdx - 1;
                if (next < 0) next = totalSlides - 1;
                updateSlider(next);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                let next = (currentIdx + 1) % totalSlides;
                updateSlider(next);
            });
        }

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.getAttribute('data-index'));
                updateSlider(idx);
            });
        });
    }

    // 9. Sticky Nav Highlighting (Services Page)
    const sections = document.querySelectorAll('.section-stream');
    const navLinks = document.querySelectorAll('.nav-link');
    if (sections.length > 0 && navLinks.length > 0) {
        const highlightNav = () => {
            let current = '';
            const triggerPoint = window.innerHeight * 0.3;
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < triggerPoint) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (current && link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };
        window.addEventListener('scroll', highlightNav);
        highlightNav();
    }

    // 10. Hero Parallax
    const heroImage = document.getElementById('hero-image-layer');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < 800) {
                heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });
    }

}); // <--- END OF DOM CONTENT LOADED. 
// EVERYTHING BELOW THIS LINE IS GLOBAL AND VISIBLE TO YOUR HTML BUTTONS

/* =========================================================
   RESUME MODAL LOGIC (GLOBAL SCOPE)
   ========================================================= */

const teamData = {
    keith: {
        name: "Keith Davidson",
        role: "Founder & Lead Strategist",
        img: "assets/img/handsomeman.png",
        specialties: [
            "Strategic planning and business clarity",
            "Financial forecasting and cash-flow modelling",
            "Commercial model and pricing design",
            "Funding and investment readiness",
            "Founder and executive mentoring"
        ],
        bio: `
            <p class="mb-4">Keith Davidson is the founder of Just Smart Business and a highly experienced small business strategist with an accounting background and more than three decades of leadership across corporate, government-supported programs, and privately owned enterprises.</p>
            <p class="mb-4">Keith began his career leading major business units within Telstra before building and exiting his own ventures across Queensland. His work with the Northern Rivers Chamber of Commerce on a Small Business Professional Development initiative supported more than 9,000 start-ups and small businesses, using a practical adaptation of the Balanced Scorecard to help participants clarify strategy and priorities. That program was independently evaluated as delivering exceptional value.</p>
            <p>Today, Keith works directly with business owners who want clarity, confidence, and control. Through the JSB Create → Refine → Achieve framework, he helps founders align strategy, financial direction, and accountability — moving from reactive firefighting to focused, measurable progress.</p>
        `,
        impact: [
            "Supported 9,000+ start-ups and small businesses through structured programs",
            "Coached 1,000+ business owners from growth through to scale and exit",
            "Guided 40+ Brisbane SMEs through post-pandemic recovery and expansion"
        ]
    },
    patrick: {
        name: "Patrick Comerford",
        role: "Business Coach & Transformation Lead",
        img: "assets/img/patrick.png",
        specialties: [
            "Operational optimisation and systemisation",
            "Leadership development and accountability cultures",
            "Change management and transformation delivery",
            "Workforce effectiveness and service design"
        ],
        bio: `
            <p class="mb-4">Patrick Comerford is a senior business coach and transformation specialist known for helping individuals and organisations navigate change with practical structure and confidence.</p>
            <p class="mb-4">A former General Manager with Spotless Services and a multi-site business owner, Patrick brings a rare blend of corporate discipline and entrepreneurial insight. He works closely with business owners and leadership teams to embed operational systems, strengthen accountability, and build cultures that support consistent execution.</p>
            <p>Patrick’s coaching style is collaborative, grounded, and action-focused. He helps teams turn strategy into behaviours — ensuring priorities are clear, responsibilities are owned, and results are delivered.</p>
        `,
        impact: [
            "Enabled service businesses to achieve up to 20% productivity gains",
            "Supported leadership teams through complex operational change",
            "Helped owners transition from people-dependent operations to scalable systems"
        ]
    },
    mike: {
        name: "Mike Avey",
        role: "Capital & Governance Advisor",
        img: "assets/img/Mike_Avey_Profile.jpg",
        specialties: [
            "Investment readiness and capital strategy",
            "Commercialisation and scaling pathways",
            "Board advisory and governance frameworks",
            "Investor engagement, M&A, and exit planning"
        ],
        bio: `
            <p class="mb-4">Mike Avey is a seasoned corporate advisor and “deep generalist” with extensive experience across commercialisation, investment banking, governance, and capital strategy.</p>
            <p class="mb-4">As Managing Director of Pachira Capital, Mike has supported founders, boards, and investors across multiple industries — guiding ventures from early ideation through to scale, investment, and exit. His background spans venture capital, angel investing, advisory board leadership, and global commercialisation.</p>
            <p>Within the JSB ecosystem, Mike provides strategic depth in investment readiness, governance, and capital decision-making — helping businesses scale with discipline and long-term value in mind.</p>
        `,
        impact: [
            "Advised founders and investors across multiple funding cycles",
            "Supported ventures from concept through to funded scale-up and exit",
            "Strengthened governance and decision-making in high-growth businesses"
        ]
    }
};

// Explicitly attach functions to window to ensure HTML access
window.openResume = function(memberId) {
    const data = teamData[memberId];
    if (!data) {
        console.error("No data found for ID:", memberId);
        return;
    }

    const modal = document.getElementById('resume-modal');
    if (!modal) {
        console.error("Resume modal not found in DOM");
        return;
    }

    // Populate Images & Text
    document.getElementById('resume-img').src = data.img;
    document.getElementById('resume-name').textContent = data.name;
    document.getElementById('resume-role').textContent = data.role;
    document.getElementById('resume-bio').innerHTML = data.bio;

    // Populate Specialties List
    const specList = document.getElementById('resume-specialties');
    specList.innerHTML = data.specialties.map(item => 
        `<li class="flex items-start gap-2">
            <svg class="w-5 h-5 text-jsb-main flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <span>${item}</span>
        </li>`
    ).join('');

    // Populate Impact List
    const impactList = document.getElementById('resume-impact');
    impactList.innerHTML = data.impact.map(item => 
        `<li class="flex items-start gap-3 text-gray-700 text-sm">
             <span class="w-1.5 h-1.5 bg-jsb-secondary rounded-full mt-2 flex-shrink-0"></span>
            <span>${item}</span>
        </li>`
    ).join('');

    // Show Modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
};

window.closeResume = function() {
    const modal = document.getElementById('resume-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }
};

// Close on Escape Key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        window.closeResume();
    }
});