document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Dynamic Year
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Hero Slider
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
     
     // Platform Slider
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
            platformInterval = setInterval(nextPlatformSlide, 4000); // Auto-slide every 4 seconds
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

    // Lightbox for Platform Images
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
   
  // Form Loader Logic (using a 2-second timer)
    const formContainer = document.getElementById('suitedash-form-container');
    const formLoader = document.getElementById('form-loader');

  if (formContainer && formLoader) {
        setTimeout(() => {
            formLoader.style.display = 'none'; // Hide the loader after 2 seconds
        }, 2000); // 2000 milliseconds = 2 seconds
    }

  // Scroll-triggered reveal for service cards
  const scrollCards = document.querySelectorAll('[data-scroll-reveal]');
  if (scrollCards.length) {
    if (prefersReduced || !('IntersectionObserver' in window)) {
      scrollCards.forEach(card => card.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

      scrollCards.forEach(card => observer.observe(card));
    }
  }
});
//testimonial video
        document.getElementById('year').textContent = new Date().getFullYear();
        
        // Testimonial Slider Logic
        const track = document.getElementById('testimonial-track');
        const dots = document.querySelectorAll('.testi-dot');
        const prevBtn = document.getElementById('testi-prev');
        const nextBtn = document.getElementById('testi-next');
        let currentIdx = 0;
        const totalSlides = 3;

        function updateSlider(index) {
            currentIdx = index;
            // Update Position
            track.style.transform = `translateX(-${currentIdx * 100}%)`;
            
            // Update Dots
            dots.forEach((dot, i) => {
                if(i === currentIdx) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        }

        prevBtn.addEventListener('click', () => {
            let next = currentIdx - 1;
            if (next < 0) next = totalSlides - 1;
            updateSlider(next);
        });

        nextBtn.addEventListener('click', () => {
            let next = (currentIdx + 1) % totalSlides;
            updateSlider(next);
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const idx = parseInt(dot.getAttribute('data-index'));
                updateSlider(idx);
            });
        });

        // Mobile Menu
        const menuBtn = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

        //services page
         document.addEventListener('DOMContentLoaded', () => {
            const sections = document.querySelectorAll('.section-stream');
            const navLinks = document.querySelectorAll('.nav-link');

            const highlightNav = () => {
                let current = '';
                const triggerPoint = window.innerHeight * 0.3; // Trigger at 30% down the screen

                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    // If the top of the section has passed the trigger point (is above it)
                    // It means we are "in" this section (or a later one)
                    if (rect.top < triggerPoint) {
                        current = section.getAttribute('id');
                    }
                });
                
                // Fallback for very top of page (before first section hits trigger)
                if (window.scrollY < 100 && sections.length > 0) {
                     // Optionally keep first one active or none. 
                     // Usually first one is strategic advisory, which is at top.
                     // The loop above might pick it up if rect.top < trigger.
                }

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (current && link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            };

            window.addEventListener('scroll', highlightNav);
            // Run once on load to set initial state
            highlightNav();
        });
        document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SETUP THE OBSERVER
    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Offset slightly so it triggers before hitting the exact bottom
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class that forces the CSS transition
                entry.target.classList.add('is-visible');
                // Stop watching this element (so it doesn't fade out again when scrolling up)
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // 2. TARGET ELEMENTS
    // Select all elements with the 'scroll-reveal' class
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => revealOnScroll.observe(el));

    // 3. HERO PARALLAX (The effect from the previous step)
    const heroImage = document.getElementById('hero-image-layer');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            // Only animate if near top to save performance
            if (scrolled < 800) {
                // Image moves at 10% speed of scroll
                heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });
    }
});