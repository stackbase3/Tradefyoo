export function initVideoManager() {
  const videos = document.querySelectorAll('video[data-jarvis-video]');
  if (!videos.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(() => {
          // Autoplay was blocked; silent fallback handled gracefully
        });
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.15 });

  videos.forEach(video => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.removeAttribute('autoplay');
      video.pause();
    } else {
      observer.observe(video);
    }
  });
}
