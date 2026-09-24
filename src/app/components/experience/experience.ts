import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="py-24 md:py-32 relative overflow-hidden bg-surface/30">
      <div class="container mx-auto px-6">
        <div class="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span class="section-label">Experience</span>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold">
            Professional <span class="text-gradient-warm">journey</span>
          </h2>
        </div>

        <div class="max-w-4xl mx-auto space-y-6">
          @for (exp of experiences; track exp.company; let i = $index) {
            <article class="experience-item glass-strong rounded-3xl p-8 md:p-10 opacity-0 translate-y-12 hover:border-primary/20 transition-colors duration-500">
              <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                <div>
                  <p class="font-mono text-sm text-primary mb-2">{{ exp.period }}</p>
                  <h3 class="text-2xl md:text-3xl font-bold mb-1">{{ exp.role }}</h3>
                  <p class="text-white/50">{{ exp.company }}</p>
                  <p class="text-sm text-white/35 mt-1">{{ exp.location }}</p>
                </div>
                <span class="shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-display font-bold text-white/30">
                  {{ formatIndex(i) }}
                </span>
              </div>
              <ul class="space-y-3 mb-8 text-white/45 leading-relaxed list-none">
                @for (point of exp.highlights; track point) {
                  <li class="flex gap-3">
                    <span class="text-primary mt-1.5 shrink-0">▸</span>
                    <span>{{ point }}</span>
                  </li>
                }
              </ul>
              <div class="flex flex-wrap gap-2">
                @for (tech of exp.tech; track tech) {
                  <span class="px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/10 text-white/60">{{ tech }}</span>
                }
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`]
})
export class ExperienceComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  experiences = [
    {
      period: 'Jul 2022 — Present',
      role: 'Technology Analyst',
      company: 'Infosys Limited',
      location: 'Pune, India',
      highlights: [
        'Develop and maintain enterprise Angular applications for banking and telecommunications clients using component architecture, RxJS, and reusable UI patterns.',
        'Use GitLab CI/CD pipelines for automated build and deployment workflows in the current production environment.',
        'Act as senior-most technical resource — onboarding, mentoring junior developers, and structured code reviews when no dedicated lead is assigned.',
        'Partner with Product Owners, PMs, and backend teams on REST integration, requirements clarity, and Agile sprint delivery.',
      ],
      tech: ['Angular 14–20', 'RxJS', 'TypeScript', 'GitLab CI/CD', 'REST APIs', 'Agile/Scrum'],
    },
    {
      period: 'Mar 2021 — Jul 2022',
      role: 'Angular Developer',
      company: 'MSP IT Concepts Pvt. Limited',
      location: 'Pune, India',
      highlights: [
        'Designed modular, reusable Angular components for healthcare applications, improving usability and long-term maintainability.',
        'Implemented RxJS-based asynchronous data handling for responsive state management.',
        'Maintained quality through Jasmine unit testing and on-time delivery against coding standards.',
      ],
      tech: ['Angular', 'RxJS', 'Jasmine', 'Healthcare UI', 'SCSS'],
    },
  ];

  formatIndex(i: number): string {
    return String(i + 1).padStart(2, '0');
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray<HTMLElement>('.experience-item').forEach((item) => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
          },
        });
      });
    }
  }
}
