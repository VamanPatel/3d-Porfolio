import { Component, inject, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollService } from '../../services/scroll';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <header class="fixed top-0 left-0 w-full z-[1000] transition-all duration-500 px-4 sm:px-6 pt-4 sm:pt-6"
            [class.pointer-events-none]="isMenuOpen">
      <div class="max-w-6xl mx-auto flex justify-between items-center pointer-events-auto">
        <a (click)="scrollTo('#top')" (keydown.enter)="scrollTo('#top')" role="link" tabindex="0"
           class="flex items-center gap-2.5 group cursor-pointer z-[1003]">
          <img src="favicon.svg" alt="" width="36" height="36" class="rounded-lg shadow-lg shadow-sky-500/10 group-hover:scale-105 transition-transform" />
          <span class="text-lg sm:text-xl font-display font-bold tracking-tight hidden sm:inline">
            Patel<span class="text-gradient">.</span>
          </span>
        </a>

        <nav class="hidden md:flex items-center gap-1 glass-strong rounded-full px-2 py-2 shadow-2xl shadow-black/40"
             [class.opacity-0]="isMenuOpen"
             [class.-translate-y-4]="isMenuOpen">
          @for (link of navLinks; track link.target) {
            <a (click)="scrollTo(link.target)" (keydown.enter)="scrollTo(link.target)" role="link" tabindex="0"
               class="px-5 py-2.5 rounded-full text-sm font-medium text-white/55 hover:text-white hover:bg-white/5 transition-all cursor-pointer">
              {{ link.label }}
            </a>
          }
          <a (click)="scrollTo('#contact')" (keydown.enter)="scrollTo('#contact')" role="link" tabindex="0"
             class="ml-1 px-5 py-2.5 rounded-full text-sm font-semibold btn-primary !py-2.5 !px-5 cursor-pointer">
            Contact
          </a>
        </nav>

        <button (click)="toggleMenu()" aria-label="Toggle menu"
                class="md:hidden glass-strong p-3 rounded-full text-white relative z-[1003] cursor-pointer">
          <mat-icon>{{ isMenuOpen ? 'close' : 'menu' }}</mat-icon>
        </button>
      </div>
    </header>

    <div class="fixed inset-0 z-[999] md:hidden transition-all duration-500 ease-out flex flex-col justify-center items-center mesh-bg"
         [class.opacity-0]="!isMenuOpen"
         [class.pointer-events-none]="!isMenuOpen"
         [class.scale-95]="!isMenuOpen">
      <div class="absolute inset-0 noise"></div>
      <nav class="relative flex flex-col items-center gap-8 text-3xl font-display font-semibold">
        @for (link of navLinks; track link.target) {
          <a (click)="scrollTo(link.target); toggleMenu()" (keydown.enter)="scrollTo(link.target); toggleMenu()"
             role="link" tabindex="0"
             class="text-white/80 hover:text-gradient transition-all cursor-pointer">
            {{ link.label }}
          </a>
        }
        <a (click)="scrollTo('#contact'); toggleMenu()" (keydown.enter)="scrollTo('#contact'); toggleMenu()"
           role="link" tabindex="0"
           class="mt-4 btn-primary cursor-pointer">
          Contact
        </a>
      </nav>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class HeaderComponent {
  private scrollService = inject(ScrollService);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  isScrolled = false;
  isMenuOpen = false;

  navLinks = [
    { label: 'About', target: '#about' },
    { label: 'Skills', target: '#skills' },
    { label: 'Experience', target: '#experience' },
    { label: 'Work', target: '#projects' },
  ];

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY;
        const scrolled = scrollY > 50;
        if (this.isScrolled !== scrolled) {
          this.isScrolled = scrolled;
          this.cdr.markForCheck();
        }
      }, { passive: true });
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    this.cdr.markForCheck();
  }

  scrollTo(target: string) {
    this.scrollService.scrollTo(target);
    this.cdr.markForCheck();
  }
}
