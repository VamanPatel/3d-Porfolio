import { Component, ElementRef, OnInit, OnDestroy, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #cursorDot class="cursor-dot fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[9999] hidden md:block opacity-0"></div>
    <div #cursorFollower class="cursor-follower fixed top-0 left-0 w-10 h-10 border border-primary/30 rounded-full pointer-events-none z-[9998] hidden md:block opacity-0"></div>
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

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initCursor();
    }
  }

  private initCursor() {
    const dot = this.cursorDot.nativeElement;
    const follower = this.cursorFollower.nativeElement;

    // Set initial position off-screen
    gsap.set([dot, follower], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const xDotSetter = gsap.quickSetter(dot, "x", "px");
    const yDotSetter = gsap.quickSetter(dot, "y", "px");
    const xFollowerSetter = gsap.quickSetter(follower, "x", "px");
    const yFollowerSetter = gsap.quickSetter(follower, "y", "px");

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

    // Hover effects
    const onMouseEnter = () => {
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.3 });
      gsap.to(follower, { 
        scale: 1.8, 
        backgroundColor: 'rgba(0, 242, 255, 0.1)', 
        borderColor: 'rgba(0, 242, 255, 0.8)',
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const onMouseLeave = () => {
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(follower, { 
        scale: 1, 
        backgroundColor: 'transparent',
        borderColor: 'rgba(0, 242, 255, 0.3)', 
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    // Use event delegation or re-query if needed, but for now let's just add to existing
    // Since this is a portfolio, most elements are static or in components.
    // A better way is to use a global listener for hover.
    
    window.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="link"], .cursor-pointer')) {
        onMouseEnter();
      }
    });

    window.addEventListener('mouseout', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="link"], .cursor-pointer')) {
        onMouseLeave();
      }
    });

    window.addEventListener('mousedown', () => {
      gsap.to(follower, { scale: 0.8, duration: 0.1 });
    });

    window.addEventListener('mouseup', () => {
      const isHovering = !!document.querySelector('a:hover, button:hover, [role="link"]:hover, .cursor-pointer:hover');
      gsap.to(follower, { scale: isHovering ? 1.8 : 1, duration: 0.3 });
    });

    // Hide default cursor
    document.body.style.cursor = 'none';
    // Ensure interactive elements also don't show default cursor
    const style = document.createElement('style');
    style.innerHTML = `
      a, button, [role="link"], .cursor-pointer { cursor: none !important; }
      @media (max-width: 768px) {
        body, a, button, [role="link"], .cursor-pointer { cursor: auto !important; }
      }
    `;
    document.head.appendChild(style);
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.cursor = 'auto';
    }
  }
}
