import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Site-wide scroll animations, driven by data attributes so any section can opt in:
 *
 *   data-split            → heading words slide up one by one (use <SplitWords>)
 *   data-reveal="up"      → fade + rise (default). Also "left", "right", "zoom"
 *   data-stagger          → its direct children reveal one after another
 *   data-clip             → image wipes in from bottom while zooming out
 *   data-parallax="0.15"  → moves slower than the scroll (subtle depth)
 *
 * Everything is skipped for users who prefer reduced motion.
 */
export default function useScrollAnimations(scope) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1. Split headings
        gsap.utils.toArray('[data-split]').forEach((el) => {
          gsap.from(el.querySelectorAll('.word > span'), {
            yPercent: 110,
            rotate: 4,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.06,
            scrollTrigger: { trigger: el, start: 'top 88%' },
          });
        });

        // 2. Single reveals
        const offsets = {
          up: { y: 60 },
          left: { x: -80 },
          right: { x: 80 },
          zoom: { scale: 0.88 },
        };
        gsap.utils.toArray('[data-reveal]').forEach((el) => {
          const from = offsets[el.dataset.reveal] || offsets.up;
          gsap.from(el, {
            ...from,
            autoAlpha: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          });
        });

        // 3. Staggered groups (cards, grids)
        gsap.utils.toArray('[data-stagger]').forEach((group) => {
          gsap.from(group.children, {
            y: 70,
            autoAlpha: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: { trigger: group, start: 'top 85%' },
          });
        });

        // 4. Image clip reveals
        gsap.utils.toArray('[data-clip]').forEach((el) => {
          const img = el.querySelector('img');
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%' } });
          tl.fromTo(
            el,
            { clipPath: 'inset(100% 0% 0% 0% round 24px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.3, ease: 'power4.inOut' }
          );
          if (img) tl.from(img, { scale: 1.35, duration: 1.6, ease: 'power3.out' }, 0);
        });

        // 5. Parallax
        gsap.utils.toArray('[data-parallax]').forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.15;
          gsap.fromTo(
            el,
            { yPercent: -speed * 100 },
            {
              yPercent: speed * 100,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            }
          );
        });
      });

      // Recalculate positions once images/fonts have loaded
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('load', refresh);
      document.fonts?.ready.then(refresh);
      return () => window.removeEventListener('load', refresh);
    },
    { scope }
  );
}
