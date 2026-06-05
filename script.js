// ============================================
// DELIGHT INN STAYS KONDAPUR - WEBSITE SCRIPTS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MOBILE MENU
    // ============================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-links a');

    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // IMAGE GALLERY LIGHTBOX
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentImageIndex = 0;
    let galleryImages = [];

    // Collect all gallery image sources
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            galleryImages.push({
                src: img.src,
                alt: img.alt
            });
        }
    });

    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close">&times;</button>
        <button class="lightbox-nav lightbox-prev" aria-label="Previous">&#10094;</button>
        <img src="" alt="" />
        <button class="lightbox-nav lightbox-next" aria-label="Next">&#10095;</button>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            updateLightboxImage();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navigate lightbox
    lightboxPrev.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    });

    lightboxNext.addEventListener('click', function(e) {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightboxImage();
        }
        if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateLightboxImage();
        }
    });

    function updateLightboxImage() {
        if (galleryImages[currentImageIndex]) {
            lightboxImg.src = galleryImages[currentImageIndex].src;
            lightboxImg.alt = galleryImages[currentImageIndex].alt;
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item (if it wasn't already open)
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const stayType = formData.get('stay_type');
            const message = formData.get('message');
            
            // Create WhatsApp message
            let whatsappMessage = `Hi, I'm ${name}.\n`;
            whatsappMessage += `I'm interested in: ${stayType}\n`;
            if (message) {
                whatsappMessage += `Details: ${message}\n`;
            }
            whatsappMessage += `My phone: ${phone}`;
            
            // Encode and open WhatsApp
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/91XXXXXXXXXX?text=${encodedMessage}`;
            
            // Show confirmation
            alert('Thank you for your enquiry! Redirecting you to WhatsApp for quick response.');
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            this.reset();
        });
    }

    // ============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.room-card, .amenity-card, .gallery-item, .testimonial-card, .platform-card, .partner-card, .faq-item, .stat'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add CSS class for animated elements
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // ACTIVE NAV LINK HIGHLIGHT
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPos = window.pageYOffset + header.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

});
