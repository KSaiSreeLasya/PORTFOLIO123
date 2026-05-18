// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced Custom Cursor with Magnetic Effects
    const cursorFollower = document.getElementById('cursor-follower');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;
    let isHovering = false;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Magnetic effect for interactive elements
        const interactiveElements = document.querySelectorAll('button, a, .project-card, .skill-category');
        let magneticTarget = null;

        interactiveElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));

            if (distance < 100) {
                magneticTarget = { x: centerX, y: centerY };
                if (!isHovering) {
                    cursorFollower.classList.add('cursor-hover');
                    isHovering = true;
                }
            }
        });

        if (!magneticTarget && isHovering) {
            cursorFollower.classList.remove('cursor-hover');
            isHovering = false;
        }

        // Apply magnetic pull
        if (magneticTarget) {
            const pullStrength = 0.3;
            mouseX += (magneticTarget.x - mouseX) * pullStrength;
            mouseY += (magneticTarget.y - mouseY) * pullStrength;
        }
    });

    document.addEventListener('mousedown', () => {
        cursorFollower.classList.add('cursor-click');
    });

    document.addEventListener('mouseup', () => {
        cursorFollower.classList.remove('cursor-click');
    });

    function animateCursor() {
        // Smooth following animation with easing
        dotX += (mouseX - dotX) * 0.95;
        dotY += (mouseY - dotY) * 0.95;
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;

        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hide cursor follower on mobile
    if (window.innerWidth <= 768) {
        cursorFollower.style.display = 'none';
    }

    // Active navigation highlight
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Call once on load


    // Enhanced Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Add animate class for horizontal animations
                if (element.hasAttribute('data-animation')) {
                    element.classList.add('animate');
                } else {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }

                // Animate skill progress bars
                if (element.classList.contains('skill-category')) {
                    const progressBar = element.querySelector('.skill-progress');
                    if (progressBar) {
                        const progress = progressBar.getAttribute('data-progress');
                        setTimeout(() => {
                            progressBar.style.width = progress + '%';
                        }, 300);
                    }
                }

                // Stagger animation for skill tags
                if (element.classList.contains('skill-category')) {
                    const skillTags = element.querySelectorAll('.skill-tag');
                    skillTags.forEach((tag, index) => {
                        setTimeout(() => {
                            tag.style.transform = 'scale(1.1)';
                            setTimeout(() => {
                                tag.style.transform = 'scale(1)';
                            }, 200);
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .project-card, .skill-category, .education-item');
    animateElements.forEach(el => {
        if (!el.hasAttribute('data-animation')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
        }
        observer.observe(el);
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(26, 27, 58, 0.98)';
        } else {
            navbar.style.background = 'rgba(26, 27, 58, 0.95)';
        }
    }

    window.addEventListener('scroll', updateNavbar);
    updateNavbar();

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }

    window.addEventListener('scroll', parallaxEffect);

    // Add smooth hover effects to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-tertiary, .project-link, .btn-submit');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add typing effect to hero title (optional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }

    // Mobile menu toggle (if needed)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Enhanced Social Media Link Interactions
    const socialLinks = document.querySelectorAll('.social-icon, .footer-social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(5deg) scale(1.1)';

            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '50px';
            ripple.style.height = '50px';
            ripple.style.marginLeft = '-25px';
            ripple.style.marginTop = '-25px';

            this.appendChild(ripple);

            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        });
    });

    // Section Scroll Indicators
    function createScrollIndicators() {
        const sections = ['home', 'about', 'skills', 'projects', 'contact'];
        const indicators = [];

        sections.forEach((section, index) => {
            if (index < sections.length - 1) {
                const nextSection = sections[index + 1];
                const indicator = document.createElement('div');
                indicator.className = 'section-scroll-indicator';
                indicator.innerHTML = `
                    <div class="scroll-arrow">↓</div>
                    <span>${nextSection.charAt(0).toUpperCase() + nextSection.slice(1)}</span>
                `;

                indicator.addEventListener('click', () => {
                    document.getElementById(nextSection).scrollIntoView({
                        behavior: 'smooth'
                    });
                });

                document.body.appendChild(indicator);
                indicators.push({ element: indicator, section });
            }
        });

        // Show/hide indicators based on current section
        function updateIndicators() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            indicators.forEach(({ element, section }) => {
                const sectionElement = document.getElementById(section);
                const sectionTop = sectionElement.offsetTop;
                const sectionBottom = sectionTop + sectionElement.offsetHeight;

                if (scrollY >= sectionTop - 100 && scrollY < sectionBottom - 100) {
                    element.style.opacity = '1';
                    element.style.pointerEvents = 'auto';
                } else {
                    element.style.opacity = '0';
                    element.style.pointerEvents = 'none';
                }
            });
        }

        window.addEventListener('scroll', updateIndicators);
        updateIndicators();
    }

    createScrollIndicators();

    // Download Resume Button Toggle
    const downloadBtn = document.querySelector('.btn-download-enhanced');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const btnText = this.querySelector('span:not(.btn-icon)');
            const btnIcon = this.querySelector('.btn-icon');

            if (btnText.textContent === 'Download Resume') {
                btnText.textContent = 'Giving Resume';
                btnIcon.textContent = '⬇️';
                this.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)';
                this.style.boxShadow = '0 8px 30px rgba(59, 130, 246, 0.5)';

                // Use Google Drive export link
                const googleDriveId = '1-iMSCWhciSmsixfcsZ5BLvwEdDn8tVkm';
                const pdfUrl = `https://drive.google.com/uc?export=download&id=${googleDriveId}`;
                const link = document.createElement('a');
                link.href = pdfUrl;
                link.download = 'Kotte_Sai_Sree_Lasya_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Reset after a moment
                setTimeout(() => {
                    btnText.textContent = 'Download Resume';
                    btnIcon.textContent = '📄';
                    this.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                    this.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.3)';
                }, 2000);
            }
        });
    }

    // Hero Stats Counter Animation
    function animateCounters() {
        const heroStats = document.querySelectorAll('.hero-stat');

        heroStats.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-count'));
            const numberElement = stat.querySelector('.stat-number');
            let current = 0;
            const increment = target / 50;
            const isDecimal = target % 1 !== 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }

                if (isDecimal) {
                    numberElement.textContent = current.toFixed(2);
                } else {
                    numberElement.textContent = Math.floor(current);
                }
            }, 40);
        });
    }

    // Trigger counter animation when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // Skills Horizontal Scroll
    let skillsCurrentIndex = 0;
    const skillsTrack = document.querySelector('.skills-scroll-track');
    const skillsItems = document.querySelectorAll('.skill-category');
    const skillsPrevBtn = document.getElementById('skillsPrev');
    const skillsNextBtn = document.getElementById('skillsNext');

    // Duplicate skills for infinite scroll effect
    if (skillsTrack && skillsItems.length > 0) {
        const originalHTML = skillsTrack.innerHTML;
        skillsTrack.innerHTML = originalHTML + originalHTML;

        function updateSkillsPosition() {
            const itemWidth = 370; // 350px + 20px gap
            const translateX = -skillsCurrentIndex * itemWidth;
            skillsTrack.style.transform = `translateX(${translateX}px)`;
        }

        skillsPrevBtn?.addEventListener('click', () => {
            skillsCurrentIndex = Math.max(0, skillsCurrentIndex - 1);
            updateSkillsPosition();
        });

        skillsNextBtn?.addEventListener('click', () => {
            const maxIndex = skillsItems.length - 1;
            if (skillsCurrentIndex >= maxIndex) {
                skillsCurrentIndex = 0;
                skillsTrack.style.transition = 'none';
                updateSkillsPosition();
                setTimeout(() => {
                    skillsTrack.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }, 50);
            } else {
                skillsCurrentIndex++;
                updateSkillsPosition();
            }
        });
    }

    // Projects Carousel
    let projectsCurrentIndex = 0;
    const projectsCarousel = document.querySelector('.projects-carousel');
    const projectsItems = document.querySelectorAll('.project-card');
    const projectsPrevBtn = document.getElementById('projectsPrev');
    const projectsNextBtn = document.getElementById('projectsNext');
    const projectsDots = document.getElementById('projectsDots');

    // Create dots for projects
    if (projectsDots && projectsItems.length > 0) {
        projectsItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                projectsCurrentIndex = index;
                updateProjectsPosition();
                updateProjectsDots();
            });
            projectsDots.appendChild(dot);
        });
    }

    function updateProjectsPosition() {
        if (projectsCarousel) {
            const itemWidth = 420; // 400px + 20px gap
            const translateX = -projectsCurrentIndex * itemWidth;
            projectsCarousel.style.transform = `translateX(${translateX}px)`;
        }
    }

    function updateProjectsDots() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === projectsCurrentIndex);
        });
    }

    projectsPrevBtn?.addEventListener('click', () => {
        projectsCurrentIndex = projectsCurrentIndex > 0 ? projectsCurrentIndex - 1 : projectsItems.length - 1;
        updateProjectsPosition();
        updateProjectsDots();
    });

    projectsNextBtn?.addEventListener('click', () => {
        projectsCurrentIndex = projectsCurrentIndex < projectsItems.length - 1 ? projectsCurrentIndex + 1 : 0;
        updateProjectsPosition();
        updateProjectsDots();
    });

    // Auto-advance projects carousel
    setInterval(() => {
        if (projectsItems.length > 0) {
            projectsCurrentIndex = projectsCurrentIndex < projectsItems.length - 1 ? projectsCurrentIndex + 1 : 0;
            updateProjectsPosition();
            updateProjectsDots();
        }
    }, 5000);

    // Enhanced Project Card Interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateY(5deg)';
            this.style.boxShadow = '0 25px 50px rgba(96, 165, 250, 0.25)';

            // Animate tech icons
            const techIcons = this.querySelectorAll('.tech-icon');
            techIcons.forEach((icon, index) => {
                setTimeout(() => {
                    icon.style.transform = 'scale(1.2) rotate(360deg)';
                }, index * 100);
            });
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) rotateY(0deg)';
            this.style.boxShadow = '0 20px 40px rgba(96, 165, 250, 0.15)';

            const techIcons = this.querySelectorAll('.tech-icon');
            techIcons.forEach(icon => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    });

    // Enhanced Skill Tag Interactions
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) translateY(-3px)';
            this.style.boxShadow = '0 8px 20px rgba(96, 165, 250, 0.3)';

            // Add level indicator animation
            const level = this.getAttribute('data-level');
            if (level) {
                this.setAttribute('title', `Skill Level: ${level.charAt(0).toUpperCase() + level.slice(1)}`);
            }
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Parallax Effect for Background Elements
    function createParallaxStars() {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars-background';
        starsContainer.style.position = 'fixed';
        starsContainer.style.top = '0';
        starsContainer.style.left = '0';
        starsContainer.style.width = '100%';
        starsContainer.style.height = '100%';
        starsContainer.style.pointerEvents = 'none';
        starsContainer.style.zIndex = '-1';

        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.style.position = 'absolute';
            star.style.width = Math.random() * 3 + 'px';
            star.style.height = star.style.width;
            star.style.backgroundColor = 'rgba(96, 165, 250, 0.5)';
            star.style.borderRadius = '50%';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animation = `twinkle ${2 + Math.random() * 3}s infinite`;
            starsContainer.appendChild(star);
        }

        document.body.appendChild(starsContainer);
    }

    createParallaxStars();

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Social icons hover effect
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });

    // Scroll progress indicator (optional)
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // You can use this to show a progress bar if needed
        // document.querySelector('.progress-bar').style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);
});

// Add custom cursor effect (optional)
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Performance optimization: debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(function() {
    // Debounced scroll functions here
}, 10));

// Global functions for carousel navigation (called from HTML onclick)
function scrollSkills(direction) {
    const carousel = document.getElementById('skillsCarousel');
    const scrollAmount = 400; // Width of one skill card + gap

    if (direction === 'left') {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

function scrollProjects(direction) {
    const carousel = document.getElementById('projectsCarousel');
    const scrollAmount = 440; // Width of one project card + gap

    if (direction === 'left') {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}
