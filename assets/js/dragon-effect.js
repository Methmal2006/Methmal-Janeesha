/**
 * =========================================================================
 * INTERACTIVE DRAGON BACKGROUND EFFECT
 * =========================================================================
 * Handles smooth cursor tracking, 3D perspective parallax, eye glow shifts,
 * mobile fallback floating animation, and prefers-reduced-motion compliance.
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initDragonBackgroundEffect();
});

function initDragonBackgroundEffect() {
  const heroSection = document.getElementById('hero');
  const dragonWrap = document.getElementById('hero-dragon-wrap');
  const dragonEntity = document.getElementById('dragon-entity');
  const eyeMain = document.getElementById('dragon-eye-main');
  const eyeSecondary = document.getElementById('dragon-eye-secondary');

  if (!heroSection || !dragonWrap || !dragonEntity) return;

  // 1. Accessibility: Check for prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    return;
  }

  // 2. Mobile & Touch Check: If touch or small screen, use smooth CSS floating animation
  const isTouchDevice = window.matchMedia('(pointer: coarse), (max-width: 820px)').matches;
  if (isTouchDevice) {
    dragonEntity.classList.add('mobile-float');
    return;
  }

  // Ensure GSAP is available
  if (typeof gsap === 'undefined') {
    return;
  }

  // 3. Smooth Mouse Tracking with GSAP quickTo
  let mouseInside = false;

  // Interpolated targets for buttery-smooth 60fps tracking
  const quickX = gsap.quickTo(dragonEntity, 'x', { duration: 1.1, ease: 'power2.out' });
  const quickY = gsap.quickTo(dragonEntity, 'y', { duration: 1.1, ease: 'power2.out' });
  const quickRotY = gsap.quickTo(dragonEntity, 'rotationY', { duration: 1.2, ease: 'power2.out' });
  const quickRotX = gsap.quickTo(dragonEntity, 'rotationX', { duration: 1.2, ease: 'power2.out' });
  const quickRotZ = gsap.quickTo(dragonEntity, 'rotationZ', { duration: 1.2, ease: 'power2.out' });

  // Eye glows slight parallax shift for 3D depth perception
  const quickEyeMainX = eyeMain ? gsap.quickTo(eyeMain, 'x', { duration: 0.9, ease: 'power2.out' }) : null;
  const quickEyeMainY = eyeMain ? gsap.quickTo(eyeMain, 'y', { duration: 0.9, ease: 'power2.out' }) : null;
  const quickEyeSecX = eyeSecondary ? gsap.quickTo(eyeSecondary, 'x', { duration: 0.9, ease: 'power2.out' }) : null;
  const quickEyeSecY = eyeSecondary ? gsap.quickTo(eyeSecondary, 'y', { duration: 0.9, ease: 'power2.out' }) : null;

  function handleMouseMove(e) {
    if (!mouseInside) {
      mouseInside = true;
      dragonWrap.classList.add('active');
    }

    // Normalized coordinates (-1 to 1) based on viewport
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = (e.clientY / window.innerHeight) * 2 - 1;

    // Subtle, elegant movement parameters
    const targetX = normX * 24;      // max 24px horizontal shift
    const targetY = normY * 18;      // max 18px vertical shift
    const targetRotY = normX * 4.5;  // max 4.5 deg yaw
    const targetRotX = -normY * 3.5; // max 3.5 deg pitch
    const targetRotZ = normX * 1.5;  // max 1.5 deg roll

    quickX(targetX);
    quickY(targetY);
    quickRotY(targetRotY);
    quickRotX(targetRotX);
    quickRotZ(targetRotZ);

    // Subtle 3D eye gaze shift
    if (quickEyeMainX && quickEyeMainY) {
      quickEyeMainX(normX * 8);
      quickEyeMainY(normY * 6);
    }
    if (quickEyeSecX && quickEyeSecY) {
      quickEyeSecX(normX * 6);
      quickEyeSecY(normY * 4.5);
    }
  }

  function handleMouseLeave() {
    mouseInside = false;
    dragonWrap.classList.remove('active');

    // Smoothly return dragon to resting position
    gsap.to(dragonEntity, {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      duration: 1.4,
      ease: 'power2.out',
      overwrite: 'auto'
    });

    if (eyeMain) {
      gsap.to(eyeMain, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }

    if (eyeSecondary) {
      gsap.to(eyeSecondary, {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  }

  // Attach event listeners
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
  window.addEventListener('blur', handleMouseLeave, { passive: true });

  // Handle window resize dynamically switching between mouse-tracking and mobile-float
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const isMobileNow = window.matchMedia('(pointer: coarse), (max-width: 820px)').matches;
      if (isMobileNow) {
        dragonEntity.classList.add('mobile-float');
        handleMouseLeave();
      } else {
        dragonEntity.classList.remove('mobile-float');
      }
    }, 200);
  }, { passive: true });
}
