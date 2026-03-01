import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="py-20 md:py-32 relative overflow-hidden">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl sm:text-4xl md:text-6xl font-bold mb-12 md:mb-20 text-center">
          Professional <span class="text-primary">Journey</span>
        </h2>

        <div class="relative max-w-4xl mx-auto">
          <!-- Timeline Line -->
          <div class="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block"></div>

          @for (exp of experiences; track exp.company) {
            <div class="experience-item relative mb-24 md:mb-32 opacity-0 translate-y-20">
              <div class="flex flex-col md:flex-row items-center">
                <div class="w-full md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0" [class.md:order-1]="exp.id % 2 === 0" [class.md:order-2]="exp.id % 2 !== 0">
                  <span class="text-primary font-mono text-sm mb-2 block">{{exp.period}}</span>
                  <h3 class="text-xl md:text-2xl font-bold mb-2">{{exp.role}}</h3>
                  <h4 class="text-white/60 text-sm md:text-base mb-4">{{exp.company}}</h4>
                  <p class="text-white/40 text-sm md:text-base leading-relaxed">{{exp.description}}</p>
                </div>
                
                <div class="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 z-10 hidden md:block shadow-[0_0_15px_rgba(0,242,255,0.8)]"></div>

                <div class="w-full md:w-1/2 md:pl-12" [class.md:order-2]="exp.id % 2 === 0" [class.md:order-1]="exp.id % 2 !== 0">
                  <div class="glass p-6 rounded-2xl hover:border-primary/50 transition-colors group">
                    <h5 class="text-sm font-bold uppercase tracking-widest mb-4 text-white/40 group-hover:text-primary transition-colors">Key Tech</h5>
                    <div class="flex flex-wrap gap-2">
                      @for (tech of exp.tech; track tech) {
                        <span class="px-3 py-1 bg-white/5 rounded-full text-xs border border-white/10">{{tech}}</span>
                      }
                    </div>
                  </div>
                </div>
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
export class ExperienceComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  experiences = [
    {
      id: 1,
      period: '2022 - Present',
      role: 'Senior Angular Developer',
      company: 'Infosys (Truist Bank USA / Charter Communications)',
      description: 'Leading frontend architecture for high-scale banking and telecom applications. Focused on performance optimization, SSR implementation, and complex state management using RxJS and Signals.',
      tech: ['Angular 18+', 'RxJS', 'TypeScript', 'SSR', 'Tailwind CSS', 'Micro-frontends']
    },
    {
      id: 2,
      period: '2020 - 2022',
      role: 'Angular Developer',
      company: 'Agility Healthcare / Paragon Healthcare',
      description: 'Developed mission-critical healthcare management systems. Implemented HIPAA-compliant interfaces and optimized data-heavy dashboards for real-time patient monitoring.',
      tech: ['Angular', 'NgRx', 'REST APIs', 'D3.js', 'SCSS', 'Unit Testing']
    },
    {
      id: 3,
      period: '2019 - 2020',
      role: 'Frontend Developer',
      company: 'Tech Solutions Inc.',
      description: 'Built responsive web applications for various clients. Focused on UI/UX implementation and cross-browser compatibility.',
      tech: ['JavaScript', 'HTML5/CSS3', 'Angular', 'Bootstrap']
    }
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
      this.initAnimations();
    }
  }

  private initAnimations() {
    const items = document.querySelectorAll('.experience-item');
    items.forEach((item) => {
      gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  }
}
