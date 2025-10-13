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
            // Get the current slide and mark it for exit animation
            const exitingSlide = slides[currentSlide];
            if (exitingSlide) {
                exitingSlide.classList.add('exiting');
            }
            
            // Set the new current slide index
            currentSlide = index;
            const newSlide = slides[currentSlide];

            // Remove active class from all slides and dots
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));

            // Activate the new slide and dot
            if (newSlide) {
                newSlide.classList.add('active');
            }
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
            }
            
            // Allow exit animation to complete before resetting its state
            if(exitingSlide) {
                setTimeout(() => {
                    exitingSlide.classList.remove('exiting');
                }, 1000); // This should match the CSS transition duration
            }
        }

        function nextSlide() {
            showSlide((currentSlide + 1) % slides.length);
        }

        function startSlider() {
            slideInterval = setInterval(nextSlide, 4000); // Change slide every 5 seconds
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

        // Initialize Slider
        if (dots[0]) {
            dots[0].classList.add('active');
        }
        startSlider();
    }
});