import { Component, ElementRef, OnInit, OnDestroy, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollService } from '../../services/scroll';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="top" class="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div #canvasContainer class="absolute inset-0 z-0"></div>
      
      <div class="container mx-auto px-6 z-10 pointer-events-none">
        <div class="max-w-4xl">
          <h1 class="hero-title text-4xl sm:text-6xl lg:text-8xl font-bold leading-[1.1] mb-6 opacity-0 translate-y-10">
            Crafting <span class="text-primary text-glow">Digital</span><br>
            Experiences
          </h1>
          <p class="hero-subtitle text-base sm:text-lg md:text-2xl text-white/60 mb-8 max-w-2xl opacity-0 translate-y-10">
            Senior Angular Architect with 5+ years of expertise in Healthcare, Banking, and Telecom domains.
          </p>
          <div class="hero-cta flex flex-col sm:flex-row gap-4 opacity-0 translate-y-10 pointer-events-auto">
            <button (click)="scrollTo('#projects')" class="px-6 py-3 md:px-8 md:py-4 bg-primary text-dark font-bold rounded-full hover:scale-105 transition-transform cursor-pointer text-sm md:text-base">
              View Projects
            </button>
            <button (click)="scrollTo('#contact')" class="px-6 py-3 md:px-8 md:py-4 border border-white/20 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-sm md:text-base">
              Contact Me
            </button>
          </div>
        </div>
      </div>

      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div class="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef<HTMLDivElement>;
  
  private platformId = inject(PLATFORM_ID);
  private scrollService = inject(ScrollService);
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private sphere!: THREE.Mesh;
  private particles!: THREE.Points;
  private animationFrameId?: number;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initThree();
      this.animateIntro();
    }
  }

  scrollTo(target: string) {
    this.scrollService.scrollTo(target);
  }

  private initThree() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    // Geometry
    const geometry = new THREE.IcosahedronGeometry(2, 20);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00f2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    this.sphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);

    // Inner core
    const coreGeo = new THREE.IcosahedronGeometry(1.5, 5);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x7000ff,
      emissive: 0x7000ff,
      emissiveIntensity: 2,
      transparent: true,
      opacity: 0.5,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    this.scene.add(core);

    // Particles
    const particlesGeo = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
    });
    this.particles = new THREE.Points(particlesGeo, particlesMat);
    this.scene.add(this.particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00f2ff, 2);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);

    this.camera.position.z = 5;

    const animate = () => {
      this.animationFrameId = requestAnimationFrame(animate);
      this.sphere.rotation.y += 0.002;
      this.sphere.rotation.x += 0.001;
      this.particles.rotation.y -= 0.0005;
      this.renderer.render(this.scene, this.camera);
    };
    animate();

    window.addEventListener('resize', this.onResize.bind(this));
  }

  private onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animateIntro() {
    gsap.to('.hero-title', { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.5 });
    gsap.to('.hero-subtitle', { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.7 });
    gsap.to('.hero-cta', { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.9 });
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.onResize.bind(this));
      this.renderer.dispose();
    }
  }
}
