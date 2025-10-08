// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.getElementById('backToTop');
const accordionHeaders = document.querySelectorAll('.accordion-header');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// FAQ Accordion
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        header.classList.toggle('active');
        const content = header.nextElementSibling;
        if (header.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = 0;
        }
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize AOS (Animate On Scroll)
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.textContent.replace(/,/g, '');
        const count = +counter.textContent.replace(/,/g, '');
        const increment = target / speed;
        
        const updateCount = () => {
            const current = +counter.textContent.replace(/,/g, '');
            
            if (current < target) {
                counter.textContent = Math.ceil(current + increment).toLocaleString();
                setTimeout(updateCount, 1);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCount();
    });
}

// Animated Stats Counter
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/,/g, ''));
        const count = parseInt(stat.textContent.replace(/,/g, ''));
        const increment = target / speed;
        
        const updateCount = () => {
            const current = parseInt(stat.textContent.replace(/,/g, ''));
            
            if (current < target) {
                stat.textContent = Math.ceil(current + increment).toLocaleString();
                setTimeout(updateCount, 1);
            } else {
                stat.textContent = target.toLocaleString();
            }
        };
        
        updateCount();
    });
}

// Initialize animations when elements are in viewport
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats-grid')) {
                animateStats();
            }
            animationObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe sections that need animations
document.querySelectorAll('.stats-grid, .symptoms-grid, .prevention-steps').forEach(section => {
    animationObserver.observe(section);
});

// Tooltip for world map hotspots
document.querySelectorAll('.hotspot').forEach(hotspot => {
    hotspot.addEventListener('mouseenter', () => {
        hotspot.setAttribute('data-tooltip', hotspot.getAttribute('data-region'));
    });
});

// Video placeholder click handler
document.querySelector('.video-placeholder').addEventListener('click', () => {
    // In a real implementation, this would open a modal or replace with an iframe
    alert('Video player would open here in a real implementation');
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Debug: Check if stats section exists
    const statsSection = document.getElementById('stats');
    if (!statsSection) {
        console.error('Stats section not found in DOM');
    } else {
        console.log('Stats section found:', statsSection);
    }
    
    // Initialize animations and counters
    initAOS();
    initCounters();
});
