// ====================================
// 1. Preloader
// ====================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
    }
});

// ====================================
// 2. Sticky Header & Active Link
// ====================================
const header = document.getElementById('header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.href.includes(current)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
    updateActiveLink();
});

// ====================================
// 3. Typing Effect for Hero Section
// ====================================
const typedTextElement = document.getElementById('typed-text');
const taglines = [
    "A Full-Stack Developer",
    "A UI/UX Designer",
    "A Problem Solver"
];
let taglineIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typedTextElement) return;

    const currentTagline = taglines[taglineIndex];
    if (isDeleting) {
        typedTextElement.textContent = currentTagline.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentTagline.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentTagline.length) {
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        taglineIndex = (taglineIndex + 1) % taglines.length;
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(type, typingSpeed);
}

document.addEventListener('DOMContentLoaded', type);

// ====================================
// 4. Hamburger Menu for Mobile
// ====================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    navLinksContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            navLinksContainer.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// ====================================
// 5. Animated Counters
// ====================================
const counters = document.querySelectorAll('.stat-counter');
const observerOptions = {
    root: null,
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.dataset.target;
            let currentCount = 0;
            const updateCounter = () => {
                const increment = target / 200;
                if (currentCount < target) {
                    currentCount += increment;
                    counter.textContent = Math.ceil(currentCount);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
            observer.unobserve(counter);
        }
    });
}, observerOptions);

counters.forEach(counter => {
    observer.observe(counter);
});

// ====================================
// 6. Project Filter
// ====================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.dataset.filter;
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ====================================
// 7. Auto-update Footer Year
// ====================================
const currentYearSpan = document.getElementById('current-year');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// ====================================
// 8. Back to Top Button
// ====================================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});