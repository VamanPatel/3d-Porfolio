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
    <section id="skills" class="py-24 md:py-32 relative">
      <div class="container mx-auto px-6">
        <div class="max-w-3xl mb-16 md:mb-20">
          <span class="section-label">Expertise</span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Technical <span class="text-gradient">arsenal</span>
          </h2>
          <p class="text-lg text-white/50">
            Angular through CI/CD, testing, micro frontends, and AI-assisted development.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[minmax(140px,auto)]">
          @for (cell of bentoCells; track cell.title) {
            <div class="skill-cell glass-strong rounded-3xl p-6 md:p-8 opacity-0 translate-y-8 flex flex-col justify-between group hover:border-primary/25 transition-colors duration-500"
                 [class.md:col-span-3]="cell.span === 3"
                 [class.md:col-span-2]="cell.span === 2"
                 [class.md:col-span-4]="cell.span === 4"
                 [class.md:row-span-2]="cell.tall">
              <div>
                <div class="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                     [class]="cell.iconBg">
                  <mat-icon [class]="cell.iconColor">{{ cell.icon }}</mat-icon>
                </div>
                <h3 class="text-xl font-bold mb-2">{{ cell.title }}</h3>
                <p class="text-sm text-white/45 leading-relaxed">{{ cell.description }}</p>
              </div>
              <div class="flex flex-wrap gap-2 mt-6">
                @for (tag of cell.tags; track tag) {
                  <span class="px-3 py-1 text-xs rounded-full border border-white/10 bg-white/[0.03] text-white/60">{{ tag }}</span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`]
})
export class SkillsComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  bentoCells = [
    {
      title: 'Frontend Core',
      description: 'Angular v14–20, TypeScript, JavaScript, HTML5, SCSS, and responsive enterprise UI patterns.',
      icon: 'code',
      iconBg: 'bg-sky-500/15',
      iconColor: 'text-primary',
      span: 4,
      tall: true,
      tags: ['Angular CLI', 'Lazy Loading', 'DI', 'RWD'],
    },
    {
      title: 'State & Architecture',
      description: 'RxJS reactive flows, component architecture, NgRx, and micro frontend boundaries via Nx (personal projects).',
      icon: 'hub',
      iconBg: 'bg-violet-500/15',
      iconColor: 'text-secondary',
      span: 2,
      tall: false,
      tags: ['RxJS', 'NgRx', 'Nx Monorepo'],
    },
    {
      title: 'UI Libraries',
      description: 'Production experience with Angular Material and PrimeNG for scalable design systems.',
      icon: 'palette',
      iconBg: 'bg-amber-500/15',
      iconColor: 'text-amber-300',
      span: 2,
      tall: false,
      tags: ['Angular Material', 'PrimeNG', 'SCSS'],
    },
    {
      title: 'Testing',
      description: 'Jasmine/Karma in professional delivery; Jest and Cypress E2E through self-directed practice.',
      icon: 'science',
      iconBg: 'bg-emerald-500/15',
      iconColor: 'text-emerald-400',
      span: 2,
      tall: false,
      tags: ['Jasmine', 'Karma', 'Jest', 'Cypress'],
    },
    {
      title: 'DevOps & Collaboration',
      description: 'GitLab CI/CD in production, REST integration, Agile rituals, mentoring, and stakeholder communication.',
      icon: 'groups',
      iconBg: 'bg-rose-500/15',
      iconColor: 'text-accent',
      span: 2,
      tall: false,
      tags: ['GitLab CI/CD', 'REST', 'Agile', 'Mentoring'],
    },
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to('.skill-cell', {
        opacity: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#skills',
          start: 'top 72%',
        },
      });
    }
  }
}
