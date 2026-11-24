/**
 * =========================================================================
 * FLOATING BACKGROUND MUSIC PLAYER
 * =========================================================================
 * Handles audio playback, volume controls, localStorage persistence,
 * user-interaction autoplay compliance, visualizer states, and minimize/expand.
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundMusicPlayer();
});

function initBackgroundMusicPlayer() {
  const player = document.getElementById('music-player');
  const audio = document.getElementById('bg-audio');
  const playBtn = document.getElementById('player-play-btn');
  const miniPlayBtn = document.getElementById('mini-play-btn');
  const muteBtn = document.getElementById('player-mute-btn');
  const volumeSlider = document.getElementById('volume-slider');
  const sliderProgress = document.getElementById('slider-progress');
  const volumePercentage = document.getElementById('volume-percentage');
  const trackStatus = document.getElementById('track-status');
  const minimizeBtn = document.getElementById('player-minimize-btn');
  const expandBtn = document.getElementById('player-expand-btn');
  const miniView = document.getElementById('player-minimized-btn');

  if (!player || !audio) return;

  // Configuration & State
  const STORAGE_KEY_VOL = 'portfolio_music_vol';
  const STORAGE_KEY_MUTED = 'portfolio_music_muted';
  const STORAGE_KEY_MIN = 'portfolio_music_minimized';

  let hasStarted = false;
  let hasUserPaused = false;
  let savedVolume = 50;

  // 1. Ensure loop is set
  audio.loop = true;

  // 2. Load stored preferences
  const storedVolume = localStorage.getItem(STORAGE_KEY_VOL);
  if (storedVolume !== null) {
    const parsed = parseInt(storedVolume, 10);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 100) {
      savedVolume = parsed;
    }
  }

  const storedMuted = localStorage.getItem(STORAGE_KEY_MUTED) === '1';
  const storedMinimized = localStorage.getItem(STORAGE_KEY_MIN);

  // Apply volume & mute
  applyVolume(savedVolume, storedMuted);

  // Apply minimized state (default minimized on mobile < 600px if no stored preference)
  if (storedMinimized === '1' || (storedMinimized === null && window.innerWidth <= 600)) {
    player.classList.add('minimized');
  }

  // 3. Audio State Listeners
  audio.addEventListener('play', () => {
    player.classList.add('playing');
    if (trackStatus) trackStatus.textContent = 'Playing â€¢ Ambient';
    hasStarted = true;
    hasUserPaused = false;
    removeInteractionListeners();
  });

  audio.addEventListener('pause', () => {
    player.classList.remove('playing');
    if (trackStatus) trackStatus.textContent = 'Paused';
  });

  audio.addEventListener('ended', () => {
    // Loop safety fallback
    audio.currentTime = 0;
    audio.play().catch(() => {});
  });

  // 4. Play / Pause Actions
  function togglePlay() {
    if (audio.paused) {
      hasUserPaused = false;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      hasUserPaused = true;
      audio.pause();
    }
  }

  if (playBtn) playBtn.addEventListener('click', togglePlay);
  if (miniPlayBtn) {
    miniPlayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePlay();
    });
  }

  // 5. Volume Slider Control
  function applyVolume(val, isMuted = false) {
    savedVolume = val;
    audio.volume = val / 100;
    audio.muted = isMuted;

    if (volumeSlider) volumeSlider.value = val;
    if (sliderProgress) sliderProgress.style.width = `${val}%`;
    if (volumePercentage) volumePercentage.textContent = isMuted ? '0%' : `${val}%`;

    // Update volume icon state
    if (isMuted || val === 0) {
      player.setAttribute('data-volume-state', 'muted');
    } else if (val <= 50) {
      player.setAttribute('data-volume-state', 'low');
    } else {
      player.setAttribute('data-volume-state', 'high');
    }

    localStorage.setItem(STORAGE_KEY_VOL, val);
    localStorage.setItem(STORAGE_KEY_MUTED, isMuted ? '1' : '0');
  }

  if (volumeSlider) {
    const handleSliderInput = (e) => {
      const val = parseInt(e.target.value, 10);
      applyVolume(val, false);
      if (audio.muted) audio.muted = false;
    };

    volumeSlider.addEventListener('input', handleSliderInput);
    volumeSlider.addEventListener('change', handleSliderInput);
  }

  // 6. Mute / Unmute Action
  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      if (audio.muted || audio.volume === 0) {
        // Unmute
        const restoreVol = savedVolume > 0 ? savedVolume : 50;
        applyVolume(restoreVol, false);
      } else {
        // Mute
        applyVolume(savedVolume, true);
      }
    });
  }

  // 7. Minimize / Expand Actions
  function setMinimized(minimized) {
    if (minimized) {
      player.classList.add('minimized');
    } else {
      player.classList.remove('minimized');
    }
    localStorage.setItem(STORAGE_KEY_MIN, minimized ? '1' : '0');
  }

  if (minimizeBtn) {
    minimizeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setMinimized(true);
    });
  }

  if (expandBtn) {
    expandBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setMinimized(false);
    });
  }

  if (miniView) {
    miniView.addEventListener('click', (e) => {
      // Don't expand if user tapped the mini play button
      if (e.target.closest('#mini-play-btn')) return;
      setMinimized(false);
    });
  }

  // 8. Autoplay On Page Load with Fallback to First User Interaction
  const interactionEvents = ['pointerdown', 'touchstart', 'keydown'];
  let interactionListenersActive = false;

  function removeInteractionListeners() {
    if (!interactionListenersActive) return;
    interactionEvents.forEach(evt => {
      window.removeEventListener(evt, handleFirstInteraction, { capture: true });
    });
    interactionListenersActive = false;
  }

  function handleFirstInteraction() {
    removeInteractionListeners();

    if (!hasStarted && !hasUserPaused && audio.paused) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handled gracefully without console errors
        });
      }
    }
  }

  function attachInteractionListeners() {
    if (interactionListenersActive) return;
    interactionListenersActive = true;
    interactionEvents.forEach(evt => {
      window.addEventListener(evt, handleFirstInteraction, { capture: true, once: true });
    });
  }

  // Attempt autoplay immediately on page load
  function attemptAutoplay() {
    if (hasStarted || hasUserPaused || !audio.paused) return;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Autoplay succeeded immediately on load
          removeInteractionListeners();
        })
        .catch(() => {
          // Autoplay blocked by browser policy -> gracefully fall back to first user interaction
          attachInteractionListeners();
        });
    } else {
      attachInteractionListeners();
    }
  }

  // Execute autoplay attempt
  attemptAutoplay();
}
