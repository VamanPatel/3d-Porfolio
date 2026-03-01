import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <section id="skills" class="py-20 md:py-32 bg-white/[0.02]">
      <div class="container mx-auto px-6">
        <div class="max-w-4xl mx-auto text-center mb-12 md:mb-20">
          <h2 class="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">Technical <span class="text-secondary">Arsenal</span></h2>
          <p class="text-white/60 text-base md:text-lg">Specialized in building high-performance, scalable enterprise applications with modern web technologies.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (category of skillCategories; track category.title) {
            <div class="skill-card glass p-8 rounded-3xl hover:border-secondary/50 transition-all duration-500 group opacity-0 translate-y-10">
              <div class="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <mat-icon class="text-secondary">{{category.icon}}</mat-icon>
              </div>
              <h3 class="text-2xl font-bold mb-6">{{category.title}}</h3>
              <ul class="space-y-4">
                @for (skill of category.skills; track skill.name) {
                  <li>
                    <div class="flex justify-between mb-2">
                      <span class="text-sm font-medium">{{skill.name}}</span>
                      <span class="text-xs text-white/40">{{skill.level}}%</span>
                    </div>
                    <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div class="h-full bg-secondary rounded-full transition-all duration-1000 ease-out" 
                           [style.width.%]="skill.level"></div>
                    </div>
                  </li>
                }
              </ul>
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
export class SkillsComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  skillCategories = [
    {
      title: 'Core Architecture',
      icon: 'architecture',
      skills: [
        { name: 'Angular (Latest)', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'RxJS / Signals', level: 88 },
        { name: 'SSR / Universal', level: 85 }
      ]
    },
    {
      title: 'UI & Design',
      icon: 'palette',
      skills: [
        { name: 'Tailwind CSS', level: 92 },
        { name: 'SCSS / CSS4', level: 90 },
        { name: 'Three.js / GSAP', level: 75 },
        { name: 'Responsive Design', level: 95 }
      ]
    },
    {
      title: 'Tools & DevOps',
      icon: 'terminal',
      skills: [
        { name: 'Git / CI/CD', level: 85 },
        { name: 'REST / GraphQL', level: 88 },
        { name: 'Unit Testing', level: 80 },
        { name: 'Performance Opt.', level: 90 }
      ]
    }
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      this.initAnimations();
    }
  }

  private initAnimations() {
    gsap.to('.skill-card', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '#skills',
        start: 'top 70%',
      }
    });
  }
}
