import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Lenis from 'lenis';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private lenis?: Lenis;
  private platformId = inject(PLATFORM_ID);

  init() {
    if (!isPlatformBrowser(this.platformId)) return;

    // Force scroll to top on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Clear hash from URL to prevent browser jumping
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }

    // Immediate scroll reset
    window.scrollTo(0, 0);

    // Secondary scroll reset after a tiny delay to catch any late browser jumps
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    const raf = (time: number) => {
      this.lenis?.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }

  scrollTo(target: string | HTMLElement) {
    this.lenis?.scrollTo(target, {
      duration: 1.5,
      offset: -80, // Account for fixed header height
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
  }
}
