/**
 * Mandaditos Jeshia - Landing Page Script
 * Premium Dark Mode with Animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initParticles();
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initCounters();
    initFlipCards();
    initSmoothScroll();
});

/**
 * Particle System
 * Creates floating particles in the background
 */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = window.innerWidth < 768 ? 20 : 50;
    const colors = [
        'rgba(249, 115, 22, 0.4)',  // Primary orange
        'rgba(251, 146, 60, 0.3)',  // Light orange
        'rgba(234, 88, 12, 0.3)',   // Dark orange
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random color from palette
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        container.appendChild(particle);
    }
}

/**
 * Navbar scroll effect
 * Changes appearance when scrolling
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', debounce(function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, 10));
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animate hamburger
        const spans = toggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const spans = toggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

/**
 * Scroll Animations
 * Reveal elements on scroll using Intersection Observer
 */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.servicios, .cobertura, .testimonios, .nosotros, .contacto, .servicios-extra, .cta-final');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                // Add stagger delay
                setTimeout(function() {
                    entry.target.classList.add('active');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(function(el) {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Add stagger class to service cards
    const serviceCards = document.querySelectorAll('.service-card-flip');
    serviceCards.forEach(function(card, index) {
        card.classList.add('reveal-delay-' + ((index % 6) + 1));
    });
}

/**
 * Animated Counters
 * Counts up to target number
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(function(counter) {
        counterObserver.observe(counter);
    });
}

/**
 * Counter animation helper
 */
function animateCounter(element, target, duration) {
    duration = duration || 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * Flip Cards for Mobile
 * Click to flip on touch devices
 */
function initFlipCards() {
    const cards = document.querySelectorAll('.service-card-flip');
    
    // Check if device supports hover (desktop)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        cards.forEach(function(card) {
            card.addEventListener('click', function(e) {
                // Prevent flip when clicking links inside card
                if (e.target.closest('a')) return;
                
                card.classList.toggle('flipped');
            });
        });
    }
}

/**
 * Smooth Scroll
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just #
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Debounce helper function
 * Limits function execution rate
 */
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

/**
 * Lazy loading for images
 * Only loads images when in viewport
 */
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    images.forEach(function(img) {
        imageObserver.observe(img);
    });
}

/**
 * Add glow effect to primary elements on hover
 */
document.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const sphere = document.querySelector('.sphere');
    if (sphere) {
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// Reset sphere position when mouse leaves window
document.addEventListener('mouseleave', function() {
    const sphere = document.querySelector('.sphere');
    if (sphere) {
        sphere.style.transform = 'translate(0, 0)';
    }
});