import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const easeOut = 'cubic-bezier(0.23, 1, 0.32, 1)';
const easeInOut = 'cubic-bezier(0.77, 0, 0.175, 1)';

// Page load — reveal wrapper
const wrapper = document.getElementById('page-wrapper');

if (prefersReducedMotion) {
  // Immediately show everything
  if (wrapper) wrapper.classList.add('is-ready');
  document.querySelectorAll('.hero-word').forEach(w => {
    w.style.opacity = '1';
    w.style.transform = 'none';
  });
  document.querySelector('.hero-portrait')?.setAttribute('style', 'opacity:1;transform:none');
  document.querySelectorAll('.session-item').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
  document.querySelectorAll('.timeline-item').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
    el.classList.add('is-revealed');
  });
  const tl = document.querySelector('[data-timeline-line]');
  if (tl) tl.style.clipPath = 'inset(0 0 0 0)';
  document.querySelectorAll('.archive-item').forEach(el => {
    el.style.clipPath = 'inset(0 0 0 0)';
  });
} else {
  // Wait for fonts then animate
  document.fonts.ready.then(() => {
    // Fallback timeout
    initPageAnimation();
  });

  setTimeout(() => {
    initPageAnimation();
  }, 3000);

  let animated = false;

  function initPageAnimation() {
    if (animated) return;
    animated = true;

    if (wrapper) wrapper.classList.add('is-ready');

    // Page fade-in
    gsap.fromTo(wrapper, { opacity: 0 }, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    });

    // Hero entrance sequence
    const tl = gsap.timeline({ delay: 0.2 });

    // Logo in nav
    tl.fromTo('.nav-logo', 
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.25, ease: 'power3.out' }
    );

    // Tagline words stagger
    tl.fromTo('.hero-word',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power3.out' },
      '-=0.1'
    );

    // Portrait
    tl.fromTo('.hero-portrait',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.15'
    );

    // Nav scroll behavior
    ScrollTrigger.create({
      start: 'top -50',
      onUpdate: (self) => {
        const nav = document.querySelector('.nav');
        if (nav) {
          nav.classList.toggle('is-scrolled', self.scroll() > 50);
        }
      }
    });

    // Hero parallax
    gsap.to('.hero-portrait', {
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Discography scroll reveal
    gsap.fromTo('.deck-card', 
      { scale: 0.95, opacity: 0 },
      {
        scale: 1, opacity: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#discography',
          start: 'top 80%',
          once: true
        }
      }
    );

    // After revealing, restore proper stacking styles
    ScrollTrigger.create({
      trigger: '#discography',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        setTimeout(() => {
          const cards = document.querySelectorAll('.deck-card');
          cards.forEach((card, i) => {
            if (i === 0) {
              card.style.transform = '';
              card.style.opacity = '';
            } else if (i === 1) {
              card.style.transform = 'scale(0.96) translateY(10px) rotate(2deg)';
              card.style.opacity = '0.75';
            } else if (i === 2) {
              card.style.transform = 'scale(0.92) translateY(20px) rotate(-1.5deg)';
              card.style.opacity = '0.55';
            } else {
              card.style.transform = 'scale(0.88) translateY(30px) rotate(3deg)';
              card.style.opacity = '0.35';
            }
          });
        }, 500);
      }
    });

    // Archive scroll reveals with clip-path
    gsap.utils.toArray('.archive-item').forEach((item, i) => {
      gsap.fromTo(item, 
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.6,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            once: true
          },
          delay: i * 0.06
        }
      );
    });

    // Mobile stagger archive reveals
    gsap.utils.toArray('.archive-stagger-item').forEach((item, i) => {
      gsap.fromTo(item, 
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.6,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            once: true
          },
          delay: i * 0.06
        }
      );
    });

    // Sessions timeline reveal
    const timelineLine = document.querySelector('[data-timeline-line]');
    if (timelineLine) {
      gsap.fromTo(timelineLine,
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '[data-timeline]',
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: true
          }
        }
      );
    }

    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
      gsap.to(item, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            item.classList.add('is-revealed');
          }
        },
        delay: i * 0.08
      });
    });

    // Bio fade-in
    gsap.fromTo('.bio',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.bio',
          start: 'top 85%',
          once: true
        }
      }
    );

    // Footer fade-in
    gsap.fromTo('.footer',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 95%',
          once: true
        }
      }
    );
  }
}
