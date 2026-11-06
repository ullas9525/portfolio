// ============================================================
// Shared utilities used across the 3D scenes and sections.
// ============================================================
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

// Scroll to a section by id (respects reduced motion)
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: motionSafe ? 'smooth' : 'auto', block: 'start' });
}