document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Dynamic Year for Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Hero Slider
    const slides = document.querySelectorAll('#hero-slider .slide');
    const dots = document.querySelectorAll('#slider-dots .slider-dot');
    if (slides.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            const exitingSlide = document.querySelector('#hero-slider .slide.active');
            if(exitingSlide) exitingSlide.classList.add('exiting');
            
            currentSlide = index;
            const newSlide = slides[currentSlide];

            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));

            newSlide.classList.add('active');
            dots[currentSlide].classList.add('active');
            
            if(exitingSlide) {
                setTimeout(() => {
                    exitingSlide.classList.remove('exiting');
                }, 1000); 
            }
        }

        function nextSlide() {
            showSlide((currentSlide + 1) % slides.length);
        }

        function startSlider() {
            slideInterval = setInterval(nextSlide, 3500);
        }

        function stopSlider() {
            clearInterval(slideInterval);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (index !== currentSlide) {
                    stopSlider();
                    showSlide(index);
                    startSlider();
                }
            });
        });
        
        startSlider();
    }

     // Video Modal Logic
    const videoTrigger = document.getElementById('keith-video-trigger');
    const modal = document.getElementById('video-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const video = document.getElementById('keith-video');
    const modalOverlay = document.querySelector('.video-modal-overlay'); // Correctly select the overlay

    if(videoTrigger && modal && closeModalBtn && video && modalOverlay) {
        const openModal = () => {
            modal.classList.remove('hidden');
            setTimeout(() => modal.classList.add('active'), 10);
            video.play();
        };

        const closeModal = () => {
            modal.classList.remove('active');
            video.pause();
            video.currentTime = 0;
            setTimeout(() => modal.classList.add('hidden'), 300);
        };

        videoTrigger.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);
        // Correctly listen for clicks on the overlay
        modalOverlay.addEventListener('click', closeModal);
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
});

