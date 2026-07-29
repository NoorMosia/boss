const videos = document.querySelectorAll('[data-video]');

if (videos.length > 0 && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      
      if (entry.isIntersecting) {
        video.play().catch(() => {
          // Autoplay blocked — could show a play button overlay
          // For now, gracefully do nothing
        });
      } else {
        video.pause();
      }
    });
  }, {
    threshold: 0.5
  });

  videos.forEach(video => observer.observe(video));
}
