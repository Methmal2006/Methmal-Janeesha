/**
 * =========================================================================
 * MAIN APPLICATION LOGIC & GSAP ANIMATIONS
 * =========================================================================
 * Handles dynamic content population from portfolio-data.js,
 * GSAP ScrollTrigger reveals, rotating titles, interactive custom cursor,
 * filtering, and GLightbox modal previews.
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure GSAP and ScrollTrigger are loaded
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Hydrate content from PORTFOLIO_DATA
  initPortfolioContent();

  // 2. Preloader Animation
  initPreloader();

  // 3. Interactive Custom Cursor
  initCustomCursor();

  // 4. Header & Navigation interactions
  initNavigation();

  // 5. Rotating Job Titles with GSAP
  initRotatingTitles();

  // 6. Interactive Card 3D Light Tracker
  initCardGlowEffects();

  // 7. Skills & Projects Filtering
  initFilterNav();

  // 8. Initialize GLightbox for project preview
  initGLightbox();

  // 9. Contact Form Simulation
  initContactForm();

  // 10. GSAP ScrollTrigger Reveals
  initScrollAnimations();

  // 11. Developer Manifest Mini Showcase Carousel
  initManifestCarousel();
  initDownloadCV();
  initServicesFilter();
  initServicesModal();
});

/**
 * Populate dynamic elements from PORTFOLIO_DATA
 */
function initPortfolioContent() {
  if (typeof PORTFOLIO_DATA === 'undefined') {
    console.warn('PORTFOLIO_DATA is not defined. Using static fallback content.');
    return;
  }

  const { personal, about, services, skills, projects, contact } = PORTFOLIO_DATA;

  // Header & Brand
  document.querySelectorAll('.brand-text').forEach(el => el.textContent = personal.brandLogo || 'Methmal Janeesha');
  
  // Hero Section
  const heroGreeting = document.getElementById('hero-greeting');
  if (heroGreeting) heroGreeting.textContent = personal.greeting;

  const heroName = document.getElementById('hero-name');
  if (heroName) heroName.textContent = personal.name;

  const heroTagline = document.getElementById('hero-tagline');
  if (heroTagline) heroTagline.textContent = personal.tagline;

  const heroPortrait = document.getElementById('hero-portrait');
  if (heroPortrait && personal.profileImage) {
    heroPortrait.src = personal.profileImage;
    heroPortrait.alt = personal.name;
  }

  // Rotating Titles Container
  const rotatingContainer = document.getElementById('rotating-titles');
  if (rotatingContainer && personal.titles && personal.titles.length) {
    if (!rotatingContainer.querySelector('.typing-text')) {
      rotatingContainer.innerHTML = `<span class="typing-text" id="typing-text">${personal.titles[0]}</span><span class="typing-cursor" aria-hidden="true">|</span>`;
    }
  }

  // Hero Social Links
  const heroSocials = document.getElementById('hero-socials');
  if (heroSocials && personal.socials) {
    heroSocials.innerHTML = personal.socials.map(soc => `
      <a href="${soc.url}" target="_blank" rel="noopener noreferrer" class="social-link social-${soc.name.toLowerCase()}" aria-label="${soc.name}" title="${soc.name}" data-tooltip="${soc.name}">
        ${getSocialSvg(soc.name)}
      </a>
    `).join('');
  }

  // About Section Details
  const aboutBadge = document.getElementById('about-badge');
  if (aboutBadge && about.badge) aboutBadge.textContent = about.badge;

  const aboutMainTitle = document.getElementById('about-main-title');
  if (aboutMainTitle && about.mainTitle) {
    aboutMainTitle.innerHTML = about.mainTitle.replace('Digital Experiences.', '<span>Digital Experiences.</span>')
                                              .replace('Digital Experiences', '<span>Digital Experiences</span>');
  }

  const aboutSubtitle = document.getElementById('about-subtitle');
  if (aboutSubtitle && about.subtitle) aboutSubtitle.textContent = about.subtitle;

  const aboutHeading = document.getElementById('about-heading');
  if (aboutHeading) aboutHeading.textContent = about.storyHeading || about.title || "Creative Designer & Digital Creator";

  // Developer Manifest
  const aboutManifest = document.getElementById('about-code-snippet');
  if (aboutManifest && about.manifest) {
    const m = about.manifest;
    aboutManifest.innerHTML = `
      <span class="code-keyword">const</span> <span class="code-var">${m.varName || 'creator'}</span> = {<br>
      &nbsp;&nbsp;name: <span class="code-str">'${m.name}'</span>,<br>
      &nbsp;&nbsp;role: <span class="code-str">'${m.role}'</span>,<br>
      &nbsp;&nbsp;passion: <span class="code-str">'${m.passion}'</span>,<br>
      &nbsp;&nbsp;status: <span class="code-str">'${m.status}'</span><br>
      };
    `;
  }

  // Narrative Paragraphs
  const aboutNarrative = document.getElementById('about-narrative');
  if (aboutNarrative && about.paragraphs && about.paragraphs.length) {
    aboutNarrative.innerHTML = about.paragraphs.map((p, idx) => `
      <p class="about-desc-p" id="about-desc-${idx + 1}">${p}</p>
    `).join('');
  } else {
    const aboutDesc1 = document.getElementById('about-desc-1');
    if (aboutDesc1 && about.description1) aboutDesc1.textContent = about.description1;

    const aboutDesc2 = document.getElementById('about-desc-2');
    if (aboutDesc2 && about.description2) aboutDesc2.textContent = about.description2;
  }

  // About Highlights
  const aboutHighlights = document.getElementById('about-highlights');
  if (aboutHighlights && about.attributes) {
    aboutHighlights.innerHTML = about.attributes.map(attr => `
      <div class="highlight-item">
        <span class="highlight-label">${attr.label}</span>
        <span class="highlight-value">${attr.value}</span>
      </div>
    `).join('');
  }

  // Stats Counters
  const statsContainer = document.getElementById('stats-grid');
  if (statsContainer && personal.stats) {
    statsContainer.innerHTML = personal.stats.map(stat => `
      <div class="stat-item">
        <div class="stat-number-wrap">
          <span class="stat-number" data-target="${stat.value}">0</span>
          <span class="stat-suffix">${stat.suffix || ''}</span>
        </div>
        <div class="stat-label">${stat.label}</div>
      </div>
    `).join('');
  }

  // Qualifications list
  const qualContainer = document.getElementById('about-qualifications');
  if (qualContainer && about.qualifications && about.qualifications.length) {
    qualContainer.innerHTML = about.qualifications.map(q => {
      const title = typeof q === 'string' ? q : q.title;
      return `
        <div class="qualification-card">
          <div class="qual-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          </div>
          <span class="qual-text">${title}</span>
        </div>
      `;
    }).join('');
  }

  // Services Grid
  const servicesContainer = document.getElementById('services-grid');
  if (servicesContainer && services) {
    if (servicesContainer.children.length === 0) {
      servicesContainer.innerHTML = services.map(svc => `
        <div class="service-card reveal-card" data-category="${svc.category}" data-service-id="${svc.id}">
          <div class="service-card-glow"></div>
          <div class="service-card-inner">
            <div class="service-top-row">
              <div class="service-icon-wrap" aria-hidden="true">
                ${getServiceSvg(svc.icon)}
              </div>
              <div class="service-meta">
                <span class="service-category-badge">${svc.categoryName || svc.category}</span>
                <span class="service-number">${svc.number}</span>
              </div>
            </div>
            <h3 class="service-title">${svc.title}</h3>
            <p class="service-description">${svc.description}</p>
            <div class="service-features-wrap">
              <ul class="service-features">
                ${svc.features.map(f => `<li class="service-feature-tag">${f}</li>`).join('')}
              </ul>
            </div>
            <div class="service-card-footer">
              <button type="button" class="service-learn-more-btn" data-service="${svc.id}">
                <span>Learn More</span>
                <svg class="service-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // Skills section is now statically pre-rendered with 4 large premium cards & Creative Toolkit

  // Projects Grid
  renderProjectsGrid('all');

  // Contact Info
  const contactEmail = document.getElementById('contact-email');
  if (contactEmail) {
    contactEmail.href = `mailto:${contact.email}`;
    contactEmail.textContent = contact.email;
  }

  const contactLocation = document.getElementById('contact-location');
  if (contactLocation) contactLocation.textContent = contact.location;

  const contactAvailability = document.getElementById('contact-availability');
  if (contactAvailability) contactAvailability.textContent = contact.status || personal.availability;

  const footerCopyright = document.getElementById('footer-copyright');
  if (footerCopyright) {
    footerCopyright.textContent = `\u00A9 ${new Date().getFullYear()} ${personal.name}. All rights reserved. Crafted with precision.`;
  }
}

/**
 * Render Skills Grid (Legacy fallback safe guard)
 */
function renderSkillsGrid(filterId) {
  const container = document.getElementById('skills-grid');
  if (!container) return;
  // If legacy container exists, leave intact
}

/**
 * Render Projects Grid according to active filter
 */
function renderProjectsGrid(filterCategory) {
  const container = document.getElementById('projects-grid');
  if (!container || !PORTFOLIO_DATA || !PORTFOLIO_DATA.projects) return;

  const projects = PORTFOLIO_DATA.projects.filter(proj => {
    return filterCategory === 'all' || proj.category === filterCategory;
  });

  container.innerHTML = projects.map(proj => `
    <div class="project-card reveal-card" data-category="${proj.category}">
      <div class="project-img-box">
        <img src="${proj.image}" alt="${proj.title}" loading="lazy" />
        <div class="project-overlay">
          <!-- GLightbox Trigger -->
          <a href="${proj.image}" class="project-action-btn glightbox" data-gallery="portfolio-gallery" data-title="${proj.title}" data-description="${proj.description}" title="Zoom Image Preview" aria-label="Zoom Image">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </a>
          <!-- Live Preview Trigger -->
          <a href="${proj.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-action-btn" title="Live Preview" aria-label="View Demo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
          <!-- GitHub Trigger -->
          <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-action-btn" title="Source Code" aria-label="View Code">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </div>
      </div>
      <div class="project-body">
        <div>
          <div class="project-category">${proj.categoryName}</div>
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-description">${proj.description}</p>
        </div>
        <ul class="project-tech-tags">
          ${proj.tech.map(t => `<li class="project-tech-tag">${t}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  // Re-initialize GLightbox for newly rendered project gallery items
  initGLightbox();
}

/**
 * Filter event listeners for Skills & Projects
 */
function initFilterNav() {
  // Skills filter buttons
  const skillsFilter = document.getElementById('skills-filter');
  if (skillsFilter) {
    skillsFilter.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      skillsFilter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterId = btn.getAttribute('data-filter');
      renderSkillsGrid(filterId);
    });
  }

  // Projects filter buttons
  const projectsFilter = document.getElementById('projects-filter');
  if (projectsFilter) {
    projectsFilter.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      projectsFilter.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterId = btn.getAttribute('data-filter');
      
      if (typeof gsap !== 'undefined') {
        gsap.to('#projects-grid .project-card', {
          opacity: 0,
          scale: 0.95,
          duration: 0.25,
          stagger: 0.05,
          onComplete: () => {
            renderProjectsGrid(filterId);
            gsap.from('#projects-grid .project-card', {
              opacity: 0,
              y: 20,
              scale: 0.95,
              duration: 0.4,
              stagger: 0.07,
              ease: 'power2.out'
            });
          }
        });
      } else {
        renderProjectsGrid(filterId);
      }
    });
  }
}

/**
 * Preloader Animation
 */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const bar = document.getElementById('preloader-bar');
  if (!preloader || !bar) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 20) + 15;
    if (progress > 100) progress = 100;
    bar.style.width = `${progress}%`;

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        if (typeof gsap !== 'undefined') {
          gsap.to(preloader, {
            opacity: 0,
            duration: 0.7,
            ease: 'power2.inOut',
            onComplete: () => {
              preloader.style.visibility = 'hidden';
              animateHeroEntrance();
            }
          });
        } else {
          preloader.style.opacity = '0';
          setTimeout(() => preloader.style.visibility = 'hidden', 700);
        }
      }, 300);
    }
  }, 60);
}

/**
 * Hero Section Entrance with GSAP
 */
function animateHeroEntrance() {
  if (typeof gsap === 'undefined') return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.badge-pill', {
    y: 20,
    opacity: 0,
    duration: 0.6
  })
  .from('.hero-greeting', {
    y: 20,
    opacity: 0,
    duration: 0.5
  }, '-=0.3')
  .from('.hero-title', {
    y: 30,
    opacity: 0,
    duration: 0.7
  }, '-=0.3')
  .from('.hero-rotating-wrapper', {
    y: 25,
    opacity: 0,
    duration: 0.6
  }, '-=0.4')
  .from('.hero-tagline', {
    y: 20,
    opacity: 0,
    duration: 0.6
  }, '-=0.4')
  .from('.hero-actions .btn', {
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.15
  }, '-=0.4')
  .from('.hero-socials', {
    opacity: 0,
    y: 15,
    duration: 0.5
  }, '-=0.3')
  .from('.portrait-wrapper', {
    scale: 0.92,
    y: 25,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out'
  }, '-=0.8')
  .from('.portrait-card img', {
    scale: 1.12,
    duration: 1.1,
    ease: 'power2.out'
  }, '-=0.9')
  .from('.corner-bracket', {
    scale: 0.5,
    opacity: 0,
    duration: 0.5,
    stagger: 0.08,
    ease: 'back.out(1.6)'
  }, '-=0.7')
  .from('.floating-pill', {
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
    ease: 'back.out(1.7)'
  }, '-=0.4');
}

/**
 * Typing & Deleting Animated Job Titles
 */
function initRotatingTitles() {
  const container = document.getElementById('rotating-titles');
  if (!container) return;

  const titles = (typeof PORTFOLIO_DATA !== 'undefined' && PORTFOLIO_DATA.personal && PORTFOLIO_DATA.personal.titles)
    ? PORTFOLIO_DATA.personal.titles
    : [
        "Graphic Designer",
        "Web Designer",
        "Web Developer",
        "Video Editor",
        "Thumbnail Designer",
        "AI Image Editor"
      ];

  if (!titles || !titles.length) return;

  // Ensure DOM has typing elements
  let textEl = container.querySelector('.typing-text');
  let cursorEl = container.querySelector('.typing-cursor');

  if (!textEl) {
    container.innerHTML = `<span class="typing-text" id="typing-text"></span><span class="typing-cursor" aria-hidden="true">|</span>`;
    textEl = container.querySelector('.typing-text');
    cursorEl = container.querySelector('.typing-cursor');
  }

  let titleIndex = 0;
  let charIndex = textEl.textContent ? textEl.textContent.length : 0;
  let isDeleting = false;
  let isPaused = false;
  let typewriterTimeout = null;

  const typingSpeed = 85;    // typing speed per character
  const deletingSpeed = 45;  // deletion speed per character
  const pauseEnd = 2000;     // pause when full title is typed
  const pauseStart = 350;    // pause before starting next title

  function typeStep() {
    if (isPaused) return;

    const currentTitle = titles[titleIndex];

    if (!isDeleting) {
      charIndex++;
      textEl.textContent = currentTitle.substring(0, charIndex);

      if (charIndex === currentTitle.length) {
        isDeleting = true;
        typewriterTimeout = setTimeout(typeStep, pauseEnd);
        return;
      }
      typewriterTimeout = setTimeout(typeStep, typingSpeed);
    } else {
      charIndex--;
      textEl.textContent = currentTitle.substring(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typewriterTimeout = setTimeout(typeStep, pauseStart);
        return;
      }
      typewriterTimeout = setTimeout(typeStep, deletingSpeed);
    }
  }

  // Start typewriter loop
  if (textEl.textContent && textEl.textContent === titles[0]) {
    charIndex = titles[0].length;
    isDeleting = true;
    typewriterTimeout = setTimeout(typeStep, pauseEnd);
  } else {
    charIndex = 0;
    textEl.textContent = '';
    isDeleting = false;
    typewriterTimeout = setTimeout(typeStep, pauseStart);
  }

  // Handle visibility change to prevent timer buildup in background tabs
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isPaused = true;
      clearTimeout(typewriterTimeout);
    } else {
      if (isPaused) {
        isPaused = false;
        typewriterTimeout = setTimeout(typeStep, 200);
      }
    }
  });
}

/**
 * Custom Glowing Purple Dot Cursor Logic
 * Powered by mousemove events and 60fps+ requestAnimationFrame
 */
function initCustomCursor() {
  // 1. Detect touch / mobile devices
  const isTouchDevice = ('ontouchstart' in window) || 
                        (navigator.maxTouchPoints > 0) || 
                        window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
                        window.innerWidth <= 768;

  if (isTouchDevice) {
    document.body.classList.add('touch-device');
    const existing = document.getElementById('custom-cursor') || document.querySelector('.custom-cursor');
    if (existing) existing.style.display = 'none';
    return;
  }

  // 2. Ensure cursor element exists
  let cursor = document.getElementById('custom-cursor') || document.querySelector('.custom-cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.className = 'custom-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.prepend(cursor);
  }

  // Remove any legacy follower ring if present
  const oldFollower = document.querySelector('.cursor-follower');
  if (oldFollower) oldFollower.remove();

  // Mouse coordinate tracking
  let mouseX = -100;
  let mouseY = -100;
  let cursorX = -100;
  let cursorY = -100;
  let isVisible = false;
  let isClicking = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      cursorX = mouseX;
      cursorY = mouseY;
      cursor.style.opacity = '1';
    }
  }, { passive: true });

  // Smooth requestAnimationFrame animation loop
  function updateCursor() {
    if (isVisible) {
      // Fluid smoothing factor (0.55 provides ultra-responsive tracking while smoothing frame transitions)
      cursorX += (mouseX - cursorX) * 0.55;
      cursorY += (mouseY - cursorY) * 0.55;

      // Snap to exact coordinates if negligible difference to eliminate micro-jitter
      if (Math.abs(mouseX - cursorX) < 0.1 && Math.abs(mouseY - cursorY) < 0.1) {
        cursorX = mouseX;
        cursorY = mouseY;
      }

      const scaleStr = isClicking ? ' scale(0.72)' : '';
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)${scaleStr}`;
    }
    requestAnimationFrame(updateCursor);
  }
  requestAnimationFrame(updateCursor);

  // Window enter / leave handlers
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    if (isVisible) {
      cursor.style.opacity = '1';
    }
  });

  // Clicking scale feedback
  window.addEventListener('mousedown', () => {
    isClicking = true;
  });

  window.addEventListener('mouseup', () => {
    isClicking = false;
  });

  // Hover states on interactive elements across all sections
  const interactiveTargets = 'a, button, input, textarea, select, label, [role="button"], .filter-btn, .service-card, .project-card, .skill-card, .skill-category-card, .toolkit-chip, .tool-badge, .c-dot, .music-player, .player-btn, .hamburger, .floating-pill, .gl-item, .contact-submit-btn, .nav-link, .stat-item, .qualification-card, .mini-card';

  document.addEventListener('mouseover', (e) => {
    if (e.target && e.target.closest(interactiveTargets)) {
      cursor.classList.add('cursor-hover');
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target && e.target.closest(interactiveTargets)) {
      cursor.classList.remove('cursor-hover');
      document.body.classList.remove('cursor-hover');
    }
  });
}

/**
 * Navigation Bar, Mobile Menu & Active Spy
 */
function initNavigation() {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header blur effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const navBackdrop = document.getElementById('nav-backdrop');

  // Mobile menu toggle & backdrop helper
  if (hamburger && navMenu) {
    const closeMobileMenu = () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      if (navBackdrop) navBackdrop.classList.remove('active');
      document.body.classList.remove('no-scroll');
    };

    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active', isOpen);
      if (navBackdrop) navBackdrop.classList.toggle('active', isOpen);
      document.body.classList.toggle('no-scroll', isOpen);
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMobileMenu);
    }

    // Close when clicking outside drawer on touch/mobile
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
          closeMobileMenu();
        }
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Active section scroll spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Back to top smooth scroll
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * Mouse-tracking Radial Glow Effect for Cards
 */
function initCardGlowEffects() {
  document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.service-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * Initialize GLightbox Gallery
 */
let lightboxInstance = null;
function initGLightbox() {
  if (typeof GLightbox !== 'undefined') {
    if (lightboxInstance) {
      lightboxInstance.destroy();
    }
    lightboxInstance = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      zoomable: true
    });
  }
}

/**
 * Contact Form Controller (Netlify Serverless Function + Discord Webhook Integration)
 * - Connects Send Message button to /.netlify/functions/contact
 * - Client-side validation for Name, Email, Subject, Message
 * - Honeypot anti-spam protection
 * - Loading state & button disable to prevent duplicate submissions
 * - Shows glowing neon alert & toast on verified delivery
 * - Auto-clears all fields after successful submission
 * - No EmailJS dependencies or warnings
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const alertBox = document.getElementById('contact-status-alert');
  const toast = document.getElementById('contact-toast');

  if (!form || !submitBtn) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email-input');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const honeypot = document.getElementById('contact-honeypot');

  // Input Error Message Elements
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Helper to show inline alerts
  function showAlert(type, messageHtml) {
    if (!alertBox) return;
    alertBox.className = 'contact-status-alert alert-' + type + ' alert-show';
    alertBox.innerHTML = messageHtml;
  }

  function clearAlert() {
    if (!alertBox) return;
    alertBox.className = 'contact-status-alert';
    alertBox.innerHTML = '';
  }

  function showToast(title, desc) {
    if (!toast) return;
    const titleEl = document.getElementById('toast-title');
    const descEl = document.getElementById('toast-desc');
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // Clear errors on field input
  [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      input.classList.remove('input-error');
      const errEl = document.getElementById(input.name + '-error') || 
                    (input.id === 'contact-email-input' ? emailError : null);
      if (errEl) errEl.textContent = '';
      clearAlert();
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Basic Spam Protection: Honeypot check
    if (honeypot && honeypot.value.trim() !== '') {
      console.warn('Spam submission detected and blocked.');
      return;
    }

    // 2. Clear previous errors
    clearAlert();
    let hasError = false;

    // Validate Name
    const nameVal = nameInput ? nameInput.value.trim() : '';
    if (!nameVal || nameVal.length < 2) {
      if (nameInput) nameInput.classList.add('input-error');
      if (nameError) nameError.textContent = 'Please enter your name (at least 2 characters).';
      hasError = true;
    } else {
      if (nameInput) nameInput.classList.remove('input-error');
      if (nameError) nameError.textContent = '';
    }

    // Validate Email
    const emailVal = emailInput ? emailInput.value.trim() : '';
    if (!emailVal || !emailRegex.test(emailVal)) {
      if (emailInput) emailInput.classList.add('input-error');
      if (emailError) emailError.textContent = 'Please enter a valid email address.';
      hasError = true;
    } else {
      if (emailInput) emailInput.classList.remove('input-error');
      if (emailError) emailError.textContent = '';
    }

    // Validate Subject
    const subjectVal = subjectInput ? subjectInput.value.trim() : '';
    if (!subjectVal || subjectVal.length < 2) {
      if (subjectInput) subjectInput.classList.add('input-error');
      if (subjectError) subjectError.textContent = 'Please enter a subject (at least 2 characters).';
      hasError = true;
    } else {
      if (subjectInput) subjectInput.classList.remove('input-error');
      if (subjectError) subjectError.textContent = '';
    }

    // Validate Message
    const messageVal = messageInput ? messageInput.value.trim() : '';
    if (!messageVal || messageVal.length < 5) {
      if (messageInput) messageInput.classList.add('input-error');
      if (messageError) messageError.textContent = 'Please enter a message (at least 5 characters).';
      hasError = true;
    } else {
      if (messageInput) messageInput.classList.remove('input-error');
      if (messageError) messageError.textContent = '';
    }

    if (hasError) {
      showAlert('error', 'Please correct the highlighted fields above before submitting.');
      return;
    }

    // 3. Enter Loading State (Disable button & show spinner animation)
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = `
      <svg class="contact-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      <span>Sending Message...</span>
    `;

    // 4. Send payload to Netlify Serverless Function
    const payload = {
      name: nameVal,
      email: emailVal,
      subject: subjectVal,
      message: messageVal,
      _gotcha_honey: honeypot ? honeypot.value.trim() : ''
    };

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result && result.success) {
        showAlert('success', '<strong>Thank you, ' + escapeHtml(nameVal) + '!</strong> Your message has been sent successfully. I will get back to you promptly.');
        showToast('Message Sent!', 'Thank you, ' + escapeHtml(nameVal) + '! Your inquiry has been delivered.');
        form.reset();
        [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
          if (inp) inp.classList.remove('input-error');
        });
      } else {
        const errorMsg = (result && result.error)
          ? escapeHtml(result.error)
          : 'Failed to deliver message. Please reach out directly to <a href="mailto:methmaljaneesha27@gmail.com" style="color:#c084fc;text-decoration:underline;">methmaljaneesha27@gmail.com</a>.';
        showAlert('error', errorMsg);
        showToast('Submission Failed', 'Message could not be sent. Please try again.');
      }
    } catch (networkError) {
      console.error('Contact Form Network Error:', networkError);
      showAlert('error', 'Unable to reach the server. Please check your network connection or email directly at <a href="mailto:methmaljaneesha27@gmail.com" style="color:#c084fc;text-decoration:underline;">methmaljaneesha27@gmail.com</a>.');
      showToast('Connection Error', 'Please check your internet connection.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      submitBtn.innerHTML = originalBtnContent;
    }
  });
}

/**
 * GSAP ScrollTrigger Section Entrance & Number Counters
 */
function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Staggered reveal for section headers
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  // Staggered reveal for skill category cards
  ScrollTrigger.batch('.skill-category-card', {
    start: 'top 85%',
    onEnter: batch => {
      gsap.from(batch, {
        y: 45,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
      });
    },
    once: true
  });

  // Staggered reveal for toolkit chips
  ScrollTrigger.batch('.toolkit-chip', {
    start: 'top 88%',
    onEnter: batch => {
      gsap.from(batch, {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: 'power3.out'
      });
    },
    once: true
  });

  // Unified reveal for all 6 service cards when Services grid enters view
  const servicesGrid = document.getElementById('services-grid');
  if (servicesGrid) {
    const serviceCards = servicesGrid.querySelectorAll('.service-card');
    ScrollTrigger.create({
      trigger: servicesGrid,
      start: 'top 88%',
      onEnter: () => {
        gsap.fromTo(serviceCards, 
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power3.out',
            clearProps: 'all' // Clears inline transform & opacity so cards and hover remain 100% clean
          }
        );
      },
      once: true
    });
  }

  // Number Counter Animation for Stats in About Section
  const statsContainer = document.getElementById('stats-grid');
  if (statsContainer) {
    ScrollTrigger.create({
      trigger: statsContainer,
      start: 'top 85%',
      onEnter: () => {
        document.querySelectorAll('.stat-number').forEach(statEl => {
          const target = +statEl.getAttribute('data-target') || 0;
          gsap.fromTo(statEl, 
            { innerText: 0 }, 
            { 
              innerText: target, 
              duration: 2, 
              ease: 'power2.out',
              snap: { innerText: 1 },
              onUpdate: function() {
                statEl.innerText = Math.ceil(this.targets()[0].innerText);
              }
            }
          );
        });
      },
      once: true
    });
  }

  // Ambient floating background blur parallax
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    gsap.to('.ambient-glow-1', { x: x, y: y, duration: 2, ease: 'power1.out' });
    gsap.to('.ambient-glow-2', { x: -x, y: -y, duration: 2.5, ease: 'power1.out' });
  });
}

/**
 * Helper: SVG icons for social platforms
 */
function getSocialSvg(name) {
  const icons = {
    YouTube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    Facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    Instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
    TikTok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.87-4.47V8.76a8.28 8.28 0 0 0 4.9 1.58V6.9a4.84 4.84 0 0 1-1-.21z"/></svg>`
  };
  return icons[name] || icons.YouTube;
}

/**
 * Helper: Bespoke 3D/Futuristic SVG icons for services
 */
function getServiceSvg(type) {
  const icons = {
    'graphic-design': `<svg viewBox="0 0 64 64" fill="none" class="service-3d-svg">
      <defs>
        <linearGradient id="gd-grad-1-dyn" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#c084fc"/><stop offset="100%" stop-color="#7c3aed"/></linearGradient>
        <linearGradient id="gd-grad-2-dyn" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#38bdf8"/><stop offset="100%" stop-color="#a855f7"/></linearGradient>
        <filter id="gd-glow-dyn" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
      </defs>
      <rect x="12" y="14" width="34" height="34" rx="8" transform="rotate(-6 12 14)" stroke="url(#gd-grad-1-dyn)" stroke-width="2" fill="rgba(124, 58, 237, 0.12)" filter="url(#gd-glow-dyn)"/>
      <rect x="18" y="16" width="34" height="34" rx="8" stroke="url(#gd-grad-2-dyn)" stroke-width="2" fill="rgba(9, 14, 32, 0.7)"/>
      <path d="M30 40 L44 26 L48 30 L34 44 Z" fill="url(#gd-grad-1-dyn)"/>
      <circle cx="27" cy="43" r="3" fill="#22d3ee" filter="url(#gd-glow-dyn)"/>
      <circle cx="48" cy="22" r="3" fill="#c084fc"/>
      <circle cx="22" cy="22" r="2.5" fill="#a855f7"/>
      <path d="M22 22 Q35 12 48 22" stroke="#38bdf8" stroke-width="1.8" stroke-dasharray="3 3"/>
    </svg>`,
    'video-editing': `<svg viewBox="0 0 64 64" fill="none" class="service-3d-svg">
      <defs>
        <linearGradient id="ve-grad-1-dyn" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#e879f9"/><stop offset="100%" stop-color="#9333ea"/></linearGradient>
        <linearGradient id="ve-grad-2-dyn" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#a855f7"/><stop offset="100%" stop-color="#3b82f6"/></linearGradient>
        <filter id="ve-glow-dyn" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
      </defs>
      <rect x="10" y="18" width="44" height="32" rx="7" fill="rgba(13, 11, 26, 0.75)" stroke="url(#ve-grad-1-dyn)" stroke-width="2" filter="url(#ve-glow-dyn)"/>
      <circle cx="16" cy="24" r="1.8" fill="#e879f9"/><circle cx="16" cy="34" r="1.8" fill="#e879f9"/><circle cx="16" cy="44" r="1.8" fill="#e879f9"/>
      <circle cx="48" cy="24" r="1.8" fill="#e879f9"/><circle cx="48" cy="34" r="1.8" fill="#e879f9"/><circle cx="48" cy="44" r="1.8" fill="#e879f9"/>
      <polygon points="28,26 40,34 28,42" fill="url(#ve-grad-1-dyn)"/>
      <path d="M12 12 L52 12" stroke="url(#ve-grad-2-dyn)" stroke-width="2" stroke-linecap="round"/>
      <line x1="22" y1="8" x2="26" y2="12" stroke="#c084fc" stroke-width="2"/><line x1="34" y1="8" x2="38" y2="12" stroke="#c084fc" stroke-width="2"/><line x1="46" y1="8" x2="50" y2="12" stroke="#c084fc" stroke-width="2"/>
    </svg>`,
    'thumbnail-design': `<svg viewBox="0 0 64 64" fill="none" class="service-3d-svg">
      <defs>
        <linearGradient id="th-grad-1-dyn" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f43f5e"/><stop offset="50%" stop-color="#c084fc"/><stop offset="100%" stop-color="#7c3aed"/></linearGradient>
        <filter id="th-glow-dyn" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.5" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
      </defs>
      <rect x="8" y="16" width="46" height="30" rx="6" transform="rotate(-3 8 16)" fill="rgba(15, 12, 30, 0.75)" stroke="url(#th-grad-1-dyn)" stroke-width="2" filter="url(#th-glow-dyn)"/>
      <path d="M25 25 L38 31 L25 37 Z" fill="#f43f5e"/>
      <path d="M44 14 L46 20 L52 22 L46 24 L44 30 L42 24 L36 22 L42 20 Z" fill="#fbbf24" filter="url(#th-glow-dyn)"/>
      <circle cx="18" cy="22" r="3" fill="#38bdf8"/>
      <rect x="15" y="36" width="22" height="3" rx="1.5" fill="rgba(255, 255, 255, 0.4)"/>
    </svg>`,
    'ai-creative': `<svg viewBox="0 0 64 64" fill="none" class="service-3d-svg">
      <defs>
        <linearGradient id="ai-grad-1-dyn" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#22d3ee"/><stop offset="50%" stop-color="#a855f7"/><stop offset="100%" stop-color="#ec4899"/></linearGradient>
        <filter id="ai-glow-dyn" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3.5" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
      </defs>
      <circle cx="32" cy="32" r="18" stroke="url(#ai-grad-1-dyn)" stroke-width="2" fill="rgba(124, 58, 237, 0.12)" filter="url(#ai-glow-dyn)"/>
      <circle cx="32" cy="32" r="5" fill="#22d3ee" filter="url(#ai-glow-dyn)"/>
      <circle cx="32" cy="18" r="2.5" fill="#c084fc"/><circle cx="32" cy="46" r="2.5" fill="#c084fc"/><circle cx="18" cy="32" r="2.5" fill="#ec4899"/><circle cx="46" cy="32" r="2.5" fill="#38bdf8"/>
      <line x1="32" y1="20.5" x2="32" y2="27" stroke="#c084fc" stroke-width="1.8"/><line x1="32" y1="37" x2="32" y2="43.5" stroke="#c084fc" stroke-width="1.8"/>
      <line x1="20.5" y1="32" x2="27" y2="32" stroke="#ec4899" stroke-width="1.8"/><line x1="37" y1="32" x2="43.5" y2="32" stroke="#38bdf8" stroke-width="1.8"/>
      <path d="M46 12 L47.5 16 L51.5 17.5 L47.5 19 L46 23 L44.5 19 L40.5 17.5 L44.5 16 Z" fill="#22d3ee" filter="url(#ai-glow-dyn)"/>
    </svg>`,
    'social-media': `<svg viewBox="0 0 64 64" fill="none" class="service-3d-svg">
      <defs>
        <linearGradient id="sm-grad-1-dyn" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f43f5e"/><stop offset="50%" stop-color="#a855f7"/><stop offset="100%" stop-color="#6366f1"/></linearGradient>
        <filter id="sm-glow-dyn" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
      </defs>
      <rect x="14" y="10" width="32" height="46" rx="8" fill="rgba(15, 12, 30, 0.8)" stroke="url(#sm-grad-1-dyn)" stroke-width="2" filter="url(#sm-glow-dyn)"/>
      <rect x="25" y="14" width="10" height="2" rx="1" fill="#c084fc"/><circle cx="23" cy="24" r="4" fill="url(#sm-grad-1-dyn)"/>
      <rect x="30" y="22" width="10" height="2" rx="1" fill="#ffffff"/><rect x="30" y="26" width="6" height="2" rx="1" fill="rgba(255,255,255,0.4)"/>
      <rect x="19" y="32" width="22" height="15" rx="3" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" stroke-width="1"/>
      <circle cx="44" cy="20" r="7" fill="#f43f5e" filter="url(#sm-glow-dyn)"/>
      <path d="M41.5 19.5 C40.5 17.5 44 16.5 44 19 C44 16.5 47.5 17.5 46.5 19.5 L44 22 Z" fill="#ffffff"/>
    </svg>`,
    'web-dev': `<svg viewBox="0 0 64 64" fill="none" class="service-3d-svg">
      <defs>
        <linearGradient id="fe-grad-1-dyn" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#06b6d4"/><stop offset="50%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#8b5cf6"/></linearGradient>
        <filter id="fe-glow-dyn" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
      </defs>
      <rect x="8" y="14" width="48" height="36" rx="7" fill="rgba(10, 14, 28, 0.85)" stroke="url(#fe-grad-1-dyn)" stroke-width="2" filter="url(#fe-glow-dyn)"/>
      <circle cx="16" cy="20" r="2" fill="#ef4444"/><circle cx="22" cy="20" r="2" fill="#eab308"/><circle cx="28" cy="20" r="2" fill="#22c55e"/>
      <line x1="8" y1="26" x2="56" y2="26" stroke="rgba(255, 255, 255, 0.1)"/>
      <path d="M22 33 L17 38 L22 43" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" filter="url(#fe-glow-dyn)"/>
      <path d="M42 33 L47 38 L42 43" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" filter="url(#fe-glow-dyn)"/>
      <line x1="34" y1="31" x2="30" y2="45" stroke="#a855f7" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    layout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`
  };
  return icons[type] || icons['web-dev'] || icons.layout;
}

/**
 * Developer Manifest Mini Showcase Carousel
 * Automatically slides horizontally every 3 seconds, pauses on hover,
 * seamlessly loops through 4 design cards, and handles pagination dots.
 */
function initManifestCarousel() {
  const track = document.getElementById('carousel-track');
  const dotsContainer = document.getElementById('carousel-dots');
  const carouselBox = document.getElementById('manifest-carousel-box');

  if (!track || !carouselBox) return;

  const slides = track.querySelectorAll('.carousel-slide');
  const dots = dotsContainer ? dotsContainer.querySelectorAll('.c-dot') : [];
  const totalSlides = slides.length;
  if (totalSlides <= 1) return;

  let currentIndex = 0;
  let autoSlideTimer = null;
  const slideInterval = 3000; // 3 seconds

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(nextSlide, slideInterval);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  // Pause on mouse hover
  carouselBox.addEventListener('mouseenter', stopAutoSlide);
  carouselBox.addEventListener('mouseleave', startAutoSlide);

  // Pagination dot click handlers
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        goToSlide(idx);
        startAutoSlide(); // Reset 3s timer on manual interaction
      }
    });
  });

  // Pause on tab visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
  });

  // Start initial auto-slide
  startAutoSlide();
}


/**
 * Download CV with Confirmation Dialog
 * Shows browser confirmation modal and triggers download if accepted
 */
function initDownloadCV() {
  const cvBtn = document.getElementById('download-cv-btn') || document.querySelector('.about-cta-row a');
  if (!cvBtn) return;

  cvBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const confirmed = window.confirm("Do you want to download Methmal Janeesha's CV?");
    if (!confirmed) {
      return;
    }

    const downloadUrl = 'assets/files/Methmal_Janeesha_CV.pdf';
    const downloadName = 'Methmal_Janeesha_CV.pdf';

    const tempLink = document.createElement('a');
    tempLink.href = downloadUrl;
    tempLink.download = downloadName;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  });
}


/**
 * Functional Services Category Filter
 */
function initServicesFilter() {
  const filterNav = document.getElementById('services-filter');
  const cards = document.querySelectorAll('#services-grid .service-card');
  if (!filterNav || !cards.length) return;

  // Initial load: ensure all 6 service cards are visible, active and correctly positioned
  cards.forEach(card => {
    card.classList.remove('service-item-hidden');
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });

  filterNav.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    filterNav.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.getAttribute('data-filter');

    cards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.classList.remove('service-item-hidden');
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      } else {
        card.classList.add('service-item-hidden');
      }
    });
  });
}

/**
 * Service Details Modal Interactions
 */
function initServicesModal() {
  const modal = document.getElementById('service-modal');
  const closeBtn = document.getElementById('service-modal-close');
  const modalContactBtn = document.getElementById('modal-contact-btn');
  if (!modal) return;

  function closeModal() {
    modal.classList.remove('modal-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openModal(serviceId) {
    if (typeof PORTFOLIO_DATA === 'undefined' || !PORTFOLIO_DATA.services) return;
    const svc = PORTFOLIO_DATA.services.find(s => s.id === serviceId);
    if (!svc) return;

    const modalIconWrap = document.getElementById('modal-icon-wrap');
    const modalCategory = document.getElementById('modal-category');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalFeatures = document.getElementById('modal-features');

    if (modalIconWrap) modalIconWrap.innerHTML = getServiceSvg(svc.icon);
    if (modalCategory) modalCategory.textContent = svc.categoryName || svc.category;
    if (modalTitle) modalTitle.textContent = svc.title;
    if (modalDescription) modalDescription.textContent = svc.modalDetails || svc.description;

    if (modalFeatures && svc.features) {
      modalFeatures.innerHTML = svc.features.map(f => `
        <li class="service-modal-list-item">
          <svg class="service-modal-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${f}</span>
        </li>
      `).join('');
    }

    modal.classList.add('modal-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  // Click on any Learn More button
  document.addEventListener('click', (e) => {
    const learnBtn = e.target.closest('.service-learn-more-btn');
    if (learnBtn) {
      e.preventDefault();
      const serviceId = learnBtn.getAttribute('data-service');
      openModal(serviceId);
    }
  });

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (modalContactBtn) {
    modalContactBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal-open')) {
      closeModal();
    }
  });
}