const player = document.querySelector('[data-player]');

if (player) {
  const playBtn = player.querySelector('[data-player-play]');
  const progressWrapper = player.querySelector('[data-player-progress]');
  const progressFill = player.querySelector('[data-player-progress-fill]');
  const trackTitle = player.querySelector('[data-player-track]');
  const waveformBars = player.querySelectorAll('.player-waveform-bar');
  const playIcon = player.querySelector('.play-icon');
  const pauseIcon = player.querySelector('.pause-icon');

  // Create audio element
  const audio = new Audio();
  let isPlaying = false;
  let currentTrackId = null;
  let waveformAnimation = null;

  // Track sources — maps track IDs to audio file paths
  // Will gracefully handle missing files
  const trackSources = {
    'track-1': '/tracks/track-1.mp3',
    'track-2': '/tracks/track-2.mp3',
    'track-3': '/tracks/track-3.mp3',
    'track-4': '/tracks/track-4.mp3'
  };

  function loadTrack(trackId) {
    if (currentTrackId === trackId && audio.src && !audio.src.endsWith('/')) return;
    currentTrackId = trackId;
    const src = trackSources[trackId];
    if (src) {
      audio.src = src;
      audio.load();
    }
    resetProgress();
  }

  function togglePlay() {
    if (!audio.src || audio.src.endsWith('/')) {
      // Load the current track based on the deck state
      const activeCard = document.querySelector('[data-card]');
      if (activeCard) {
        loadTrack(activeCard.dataset.trackId);
      }
    }

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        console.warn('Audio playback failed:', err);
      });
    }
  }

  function resetProgress() {
    if (progressFill) progressFill.style.width = '0%';
    waveformBars.forEach(bar => bar.classList.remove('is-active'));
  }

  function updateProgress() {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    if (progressFill) progressFill.style.width = `${pct}%`;

    // Update waveform active state
    const activeBars = Math.floor((pct / 100) * waveformBars.length);
    waveformBars.forEach((bar, i) => {
      bar.classList.toggle('is-active', i < activeBars);
    });
  }

  function onPlay() {
    isPlaying = true;
    if (playIcon) playIcon.style.display = 'none';
    if (pauseIcon) pauseIcon.style.display = 'block';
    startWaveformPulse();
  }

  function onPause() {
    isPlaying = false;
    if (playIcon) playIcon.style.display = 'block';
    if (pauseIcon) pauseIcon.style.display = 'none';
    stopWaveformPulse();
  }

  // Store original bar heights
  const barHeights = Array.from(waveformBars).map(bar => parseInt(bar.style.height));

  function startWaveformPulse() {
    stopWaveformPulse();
    waveformAnimation = setInterval(() => {
      waveformBars.forEach((bar, i) => {
        const base = barHeights[i];
        const pulse = Math.random() * 6 - 3;
        bar.style.height = `${Math.max(4, base + pulse)}px`;
      });
    }, 150);
  }

  function stopWaveformPulse() {
    if (waveformAnimation) {
      clearInterval(waveformAnimation);
      waveformAnimation = null;
    }
    // Reset to original heights
    waveformBars.forEach((bar, i) => {
      bar.style.height = `${barHeights[i]}px`;
    });
  }

  function seek(e) {
    if (!audio.duration) return;
    const rect = progressWrapper.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  }

  // Event listeners
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('play', onPlay);
  audio.addEventListener('pause', onPause);
  audio.addEventListener('ended', () => {
    onPause();
    resetProgress();
  });

  if (playBtn) playBtn.addEventListener('click', togglePlay);
  if (progressWrapper) progressWrapper.addEventListener('click', seek);

  // Keyboard controls
  if (playBtn) {
    playBtn.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        togglePlay();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    if (e.key === 'ArrowLeft' && audio.src) {
      audio.currentTime = Math.max(0, audio.currentTime - 5);
    } else if (e.key === 'ArrowRight' && audio.src) {
      audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
    }
  });

  // Listen for track changes from the card deck
  window.addEventListener('trackchange', (e) => {
    const newTrackId = e.detail.trackId;
    if (newTrackId && newTrackId !== currentTrackId) {
      const wasPlaying = isPlaying;
      if (isPlaying) {
        audio.pause();
      }
      currentTrackId = null; // Reset so loadTrack doesn't skip
      loadTrack(newTrackId);
      if (wasPlaying) {
        // Small delay to let the new source load
        audio.addEventListener('canplay', function onCanPlay() {
          audio.removeEventListener('canplay', onCanPlay);
          audio.play().catch(() => {});
        });
      }
    }
  });

  // Load first track
  loadTrack('track-1');
}
