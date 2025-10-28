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
});
