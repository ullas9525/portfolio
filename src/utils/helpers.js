// ============================================================
// Shared utilities used across the 3D scenes and sections.
// ============================================================
import { useEffect, useState } from 'react';

export const motionSafe =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function isMobileAgent() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 820 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

export function getDPRCap() {
  if (typeof window === 'undefined') return 2;
  const width = window.innerWidth;
  if (width < 768) return [1, 1.5];
  if (width < 1440) return [1, 2];
  return [1, 2];
}

// Smooth lerp helper (frame-rate independent)
export function damp(current, target, lambda, delta) {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}

// Animate a number for count-up stats
export function formatNumber(n) {
  return new Intl.NumberFormat('en-IN').format(n);
}

// Scroll to a section by id (respects reduced motion)
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: motionSafe ? 'smooth' : 'auto', block: 'start' });
}

export function useElementInView(ref, rootMargin = '0px') {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin, threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, rootMargin]);
  return inView;
}