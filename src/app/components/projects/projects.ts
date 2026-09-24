import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type ProjectCols = 5 | 7 | 12;

interface PortfolioProject {
  title: string;
  category: string;
  client: string;
  duration?: string;
  summary: string;
  image: string;
  cols: ProjectCols;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <section id="projects" class="py-24 md:py-32 relative">
      <div class="container mx-auto px-6">
        <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div class="max-w-2xl">
            <span class="section-label">Selected work</span>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Key <span class="text-gradient">projects</span>
            </h2>
            <p class="text-lg text-white/50">
              Long-running enterprise engagements across banking, telecom, healthcare, plus hands-on architecture experiments.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          @for (project of projects; track project.title) {
            <article class="project-card group cursor-pointer opacity-0 translate-y-16"
                     [class.lg:col-span-7]="project.cols === 7"
                     [class.lg:col-span-5]="project.cols === 5"
                     [class.lg:col-span-12]="project.cols === 12">
              <div class="relative overflow-hidden rounded-3xl glass-strong aspect-[16/10] mb-5"
                   [class.lg:aspect-[21/9]]="project.cols === 12">
                <img [src]="project.image" [alt]="project.title"
                     class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     loading="lazy"
                     referrerpolicy="no-referrer" />
                <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-90"></div>
                @if (project.duration) {
                  <span class="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-dark/60 border border-white/10 text-white/70">
                    {{ project.duration }}
                  </span>
                }
                <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p class="text-xs font-mono uppercase tracking-widest text-primary/90 mb-1">{{ project.category }} · {{ project.client }}</p>
                  <h3 class="text-xl md:text-3xl font-bold group-hover:text-gradient transition-all duration-300">{{ project.title }}</h3>
                </div>
              </div>
              <p class="text-sm text-white/45 px-1 leading-relaxed max-w-3xl">{{ project.summary }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`]
})
export class ProjectsComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  projects: PortfolioProject[] = [
    {
      title: 'Consumer Deposit, Business Deposit & Teammate Portal',
      category: 'Banking',
      client: 'Truist Bank',
      duration: '517 days',
      summary:
        'Translated UX into responsive, reusable Angular components adopted across platform modules. Led Angular version upgrades for maintainability, collaborated with product and QA, and optimized performance for enterprise banking users.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1400&q=80',
      cols: 7,
    },
    {
      title: 'UCC Dashboard',
      category: 'Telecommunications',
      client: 'Enterprise Client',
      duration: '212 days',
      summary:
        'Unified dashboard integrating multiple backend databases into one Angular application for enterprise data visualization, streamlined deployments, and post-launch stability support.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      cols: 5,
    },
    {
      title: 'Paragon Healthcare Platform',
      category: 'Healthcare',
      client: 'Paragon Healthcare',
      duration: '365 days',
      summary:
        'Healthcare Angular application with separate user and admin modules, secure authentication flows, and operational workflows that protect sensitive patient-related data.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
      cols: 5,
    },
    {
      title: 'Modular E-Commerce Platform',
      category: 'Personal · Architecture',
      client: 'Nx Monorepo',
      summary:
        'Self-directed micro frontend-style boundaries with NgRx state management — exploring scalable enterprise patterns beyond day-to-day client work.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=80',
      cols: 7,
    },
    {
      title: 'Test Automation Practice Suite',
      category: 'Personal · Quality',
      client: 'Cypress & Jest',
      summary:
        'End-to-end Cypress suites and Jest unit tests to deepen modern JavaScript testing beyond the Jasmine/Karma stack used in production.',
      image: 'https://images.unsplash.com/photo-1461740680684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80',
      cols: 12,
    },
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to('.project-card', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 65%',
        },
      });
    }
  }
}
