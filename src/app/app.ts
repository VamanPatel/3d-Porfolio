import {ChangeDetectionStrategy, Component, OnInit, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollService } from './services/scroll';
import { HeaderComponent } from './components/header/header';
import { HeroComponent } from './components/hero/hero';
import { SkillsComponent } from './components/skills/skills';
import { ExperienceComponent } from './components/experience/experience';
import { ProjectsComponent } from './components/projects/projects';
import { ContactComponent } from './components/contact/contact';
import { CursorComponent } from './components/cursor/cursor';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatIconModule,
    HeaderComponent,
    HeroComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
    CursorComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private scrollService = inject(ScrollService);

  readonly marqueeItems = [
    'Angular 14–20',
    'TypeScript',
    'RxJS',
    'NgRx',
    'Micro Frontends',
    'GitLab CI/CD',
    'Angular Material',
    'PrimeNG',
    'Jasmine / Karma',
    'Cypress E2E',
    'REST APIs',
    'Agile / Scrum',
    'GitHub Copilot',
    'Cursor AI',
  ];

  ngOnInit() {
    this.scrollService.init();
  }

  scrollToContact() {
    this.scrollService.scrollTo('#contact');
  }
}
