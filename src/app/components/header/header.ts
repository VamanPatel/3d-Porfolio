import { Component, inject, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollService } from '../../services/scroll';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <header class="fixed top-0 left-0 w-full z-[1000] transition-all duration-500 border-b" 
            [style.backgroundColor]="(isScrolled && !isMenuOpen) ? 'rgba(5, 5, 5, 0.95)' : 'transparent'"
            [ngClass]="{
              'border-transparent': !isScrolled || isMenuOpen,
              'border-white/10': isScrolled && !isMenuOpen,
              'py-8': !isScrolled && !isMenuOpen,
              'py-4': isScrolled || isMenuOpen,
              'backdrop-blur-xl': isScrolled && !isMenuOpen,
              'shadow-2xl': isScrolled && !isMenuOpen
            }">
      <div class="container mx-auto px-4 sm:px-6 flex justify-between items-center relative z-[1002]">
        <a (click)="scrollTo('#top')" (keydown.enter)="scrollTo('#top')" role="link" tabindex="0" class="text-xl sm:text-2xl font-display font-bold tracking-tighter group cursor-pointer">
          VAMAN<span class="text-primary group-hover:text-accent transition-colors">.</span>
        </a>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-10">
          <a (click)="scrollTo('#about')" (keydown.enter)="scrollTo('#about')" role="link" tabindex="0" class="text-sm font-medium text-white/60 hover:text-white transition-colors cursor-pointer">About</a>
          <a (click)="scrollTo('#skills')" (keydown.enter)="scrollTo('#skills')" role="link" tabindex="0" class="text-sm font-medium text-white/60 hover:text-white transition-colors cursor-pointer">Skills</a>
          <a (click)="scrollTo('#experience')" (keydown.enter)="scrollTo('#experience')" role="link" tabindex="0" class="text-sm font-medium text-white/60 hover:text-white transition-colors cursor-pointer">Experience</a>
          <a (click)="scrollTo('#projects')" (keydown.enter)="scrollTo('#projects')" role="link" tabindex="0" class="text-sm font-medium text-white/60 hover:text-white transition-colors cursor-pointer">Projects</a>
          <a (click)="scrollTo('#contact')" (keydown.enter)="scrollTo('#contact')" role="link" tabindex="0" class="px-6 py-2 bg-white text-dark rounded-full text-sm font-bold hover:bg-primary transition-colors cursor-pointer">Hire Me</a>
        </nav>

        <!-- Mobile Menu Button -->
        <button (click)="toggleMenu()" class="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors relative z-[1003]">
          <mat-icon class="text-3xl">{{ isMenuOpen ? 'close' : 'menu' }}</mat-icon>
        </button>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    <div class="fixed inset-0 w-screen h-screen bg-[#050505] z-[999] md:hidden transition-all duration-500 ease-in-out flex items-center justify-center"
         [class.opacity-0]="!isMenuOpen"
         [class.pointer-events-none]="!isMenuOpen"
         [class.translate-y-0]="isMenuOpen"
         [class.-translate-y-full]="!isMenuOpen">
      <div class="flex flex-col items-center gap-10 text-4xl font-display">
        <a (click)="scrollTo('#about'); toggleMenu()" (keydown.enter)="scrollTo('#about'); toggleMenu()" role="link" tabindex="0" class="hover:text-primary transition-all duration-300 cursor-pointer hover:scale-110">About</a>
        <a (click)="scrollTo('#skills'); toggleMenu()" (keydown.enter)="scrollTo('#skills'); toggleMenu()" role="link" tabindex="0" class="hover:text-primary transition-all duration-300 cursor-pointer hover:scale-110">Skills</a>
        <a (click)="scrollTo('#experience'); toggleMenu()" (keydown.enter)="scrollTo('#experience'); toggleMenu()" role="link" tabindex="0" class="hover:text-primary transition-all duration-300 cursor-pointer hover:scale-110">Experience</a>
        <a (click)="scrollTo('#projects'); toggleMenu()" (keydown.enter)="scrollTo('#projects'); toggleMenu()" role="link" tabindex="0" class="hover:text-primary transition-all duration-300 cursor-pointer hover:scale-110">Projects</a>
        <a (click)="scrollTo('#contact'); toggleMenu()" (keydown.enter)="scrollTo('#contact'); toggleMenu()" role="link" tabindex="0" class="mt-6 px-16 py-6 bg-primary text-dark rounded-full font-bold cursor-pointer hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,242,255,0.3)]">Hire Me</a>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class HeaderComponent {
  private scrollService = inject(ScrollService);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);
  
  isScrolled = false;
  isMenuOpen = false;

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
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    this.cdr.markForCheck();
  }

  scrollTo(target: string) {
    this.scrollService.scrollTo(target);
    this.cdr.markForCheck();
  }
}
