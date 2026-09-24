import { Component, ElementRef, OnInit, OnDestroy, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #cursorDot class="cursor-dot fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] hidden md:block opacity-0"
         style="background: linear-gradient(135deg, #7dd3fc, #c4b5fd);"></div>
    <div #cursorFollower class="cursor-follower fixed top-0 left-0 w-11 h-11 rounded-full pointer-events-none z-[9998] hidden md:block opacity-0 border border-white/20"></div>
  `,
  styles: [`
    :host { display: block; }
    .cursor-dot, .cursor-follower {
      transform: translate(-50%, -50%);
      will-change: transform;
    }
  `]
})
export class CursorComponent implements OnInit, OnDestroy {
  @ViewChild('cursorDot', { static: true }) cursorDot!: ElementRef<HTMLDivElement>;
  @ViewChild('cursorFollower', { static: true }) cursorFollower!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private mouseX = 0;
  private mouseY = 0;
  private styleEl?: HTMLStyleElement;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initCursor();
    }
  }

  private initCursor() {
    const dot = this.cursorDot.nativeElement;
    const follower = this.cursorFollower.nativeElement;

    gsap.set([dot, follower], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const xDotSetter = gsap.quickSetter(dot, 'x', 'px');
    const yDotSetter = gsap.quickSetter(dot, 'y', 'px');
    const xFollowerSetter = gsap.quickSetter(follower, 'x', 'px');
    const yFollowerSetter = gsap.quickSetter(follower, 'y', 'px');

    let currentX = -100;
    let currentY = -100;

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      gsap.to([dot, follower], { opacity: 1, duration: 0.3 });
      xDotSetter(this.mouseX);
      yDotSetter(this.mouseY);
    });

    window.addEventListener('mouseleave', () => {
      gsap.to([dot, follower], { opacity: 0, duration: 0.3 });
    });

    gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio());
      currentX += (this.mouseX - currentX) * dt;
      currentY += (this.mouseY - currentY) * dt;
      xFollowerSetter(currentX);
      yFollowerSetter(currentY);
    });

    const onMouseEnter = () => {
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.3 });
      gsap.to(follower, {
        scale: 2,
        backgroundColor: 'rgba(125, 211, 252, 0.08)',
        borderColor: 'rgba(125, 211, 252, 0.6)',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(follower, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="link"], .cursor-pointer, input, textarea')) {
        onMouseEnter();
      }
    });

    window.addEventListener('mouseout', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="link"], .cursor-pointer, input, textarea')) {
        onMouseLeave();
      }
    });

    window.addEventListener('mousedown', () => {
      gsap.to(follower, { scale: 0.85, duration: 0.1 });
    });

    window.addEventListener('mouseup', () => {
      const isHovering = !!document.querySelector('a:hover, button:hover, [role="link"]:hover, .cursor-pointer:hover, input:hover, textarea:hover');
      gsap.to(follower, { scale: isHovering ? 2 : 1, duration: 0.3 });
    });

    document.body.style.cursor = 'none';
    this.styleEl = document.createElement('style');
    this.styleEl.innerHTML = `
      a, button, [role="link"], .cursor-pointer { cursor: none !important; }
      input, textarea { cursor: none !important; }
      @media (max-width: 768px) {
        body, a, button, [role="link"], .cursor-pointer, input, textarea { cursor: auto !important; }
      }
    `;
    document.head.appendChild(this.styleEl);
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.cursor = 'auto';
      this.styleEl?.remove();
    }
  }
}
