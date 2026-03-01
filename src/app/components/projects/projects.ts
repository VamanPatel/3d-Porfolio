import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <section id="projects" class="py-20 md:py-32 relative">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
          <div class="max-w-2xl">
            <h2 class="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">Featured <span class="text-accent">Creations</span></h2>
            <p class="text-white/60 text-base md:text-lg">A selection of enterprise-grade applications built with precision and performance in mind.</p>
          </div>
          <button class="px-6 py-3 md:px-8 md:py-4 border border-white/20 rounded-full hover:bg-white/10 transition-colors text-sm md:text-base">
            View All Work
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          @for (project of projects; track project.title) {
            <div class="project-card group cursor-pointer opacity-0 translate-y-20">
              <div class="relative aspect-video rounded-3xl overflow-hidden mb-8 glass">
                <img [src]="project.image" [alt]="project.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" referrerpolicy="no-referrer">
                <div class="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div class="flex gap-4">
                    <span class="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs border border-white/20">Case Study</span>
                    <span class="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs border border-white/20">Live Demo</span>
                  </div>
                </div>
              </div>
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{{project.title}}</h3>
                  <p class="text-white/40">{{project.category}}</p>
                </div>
                <mat-icon class="text-white/20 group-hover:text-accent group-hover:translate-x-2 transition-all">arrow_forward</mat-icon>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ProjectsComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  projects = [
    {
      title: 'Agility Health Portal',
      category: 'Healthcare • Enterprise Architecture',
      image: 'https://picsum.photos/seed/health/1200/800'
    },
    {
      title: 'Truist Wealth Dashboard',
      category: 'Banking • High Performance',
      image: 'https://picsum.photos/seed/bank/1200/800'
    },
    {
      title: 'Charter Comm CRM',
      category: 'Telecom • Micro-frontends',
      image: 'https://picsum.photos/seed/telecom/1200/800'
    },
    {
      title: 'Paragon Patient App',
      category: 'Healthcare • Mobile First',
      image: 'https://picsum.photos/seed/patient/1200/800'
    }
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      this.initAnimations();
    }
  }

  private initAnimations() {
    gsap.to('.project-card', {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: '#projects',
        start: 'top 60%',
      }
    });
  }
}
