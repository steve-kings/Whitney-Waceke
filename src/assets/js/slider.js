
// Auto-slide mobile card sliders (scroll-snap rows)
document.addEventListener('DOMContentLoaded', () => {
  const AUTO_SLIDE_MS = 2800;
  const RESUME_MS = 5000;
  const MOBILE_MAX = 767;

  document.querySelectorAll('.mobile-slider').forEach((slider) => {
    const items = Array.from(slider.children);
    if (items.length < 2) return;

    let paused = false;
    let resumeTimer = null;

    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { paused = false; }, RESUME_MS);
    };

    slider.addEventListener('pointerdown', pause);
    slider.addEventListener('touchmove', pause, { passive: true });

    setInterval(() => {
      if (paused || window.innerWidth > MOBILE_MAX) return;

      const sliderLeft = slider.getBoundingClientRect().left;
      const current = slider.scrollLeft;

      // Find the first card that starts beyond the current scroll position
      const next = items.find((item) =>
        item.getBoundingClientRect().left - sliderLeft + current > current + 8
      );

      slider.scrollTo({
        left: next
          ? next.getBoundingClientRect().left - sliderLeft + current
          : 0,
        behavior: 'smooth'
      });
    }, AUTO_SLIDE_MS);
  });
});
