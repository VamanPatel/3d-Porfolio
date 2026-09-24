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
    <section id="top" class="relative min-h-[100svh] w-full flex items-center overflow-hidden pt-24 pb-16">
      <div #canvasContainer class="absolute inset-0 z-0 opacity-90"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-dark/20 to-dark z-[1] pointer-events-none"></div>

      <div class="container mx-auto px-6 z-10 relative">
        <div class="grid lg:grid-cols-12 gap-12 items-end">
          <div class="lg:col-span-8">
            <p class="hero-badge font-mono text-xs sm:text-sm uppercase tracking-[0.4em] text-primary/90 mb-6 opacity-0 translate-y-6">
              Senior UI Developer · Angular & Micro Frontends
            </p>
            <h1 class="hero-title text-[clamp(2.25rem,7vw,5rem)] font-bold leading-[0.95] mb-8 opacity-0 translate-y-10">
              <span class="block text-white/95">Vamankumar</span>
              <span class="block text-gradient mt-1">Patel</span>
            </h1>
            <p class="hero-subtitle text-lg sm:text-xl text-white/50 max-w-2xl leading-relaxed mb-10 opacity-0 translate-y-10">
              5+ years building enterprise Angular applications for banking, telecommunications, and healthcare —
              from reusable component libraries to GitLab CI/CD delivery and mentoring junior developers.
            </p>
            <div class="hero-cta flex flex-wrap gap-4 opacity-0 translate-y-10 pointer-events-auto">
              <button type="button" (click)="scrollTo('#projects')" class="btn-primary cursor-pointer">
                View key projects
              </button>
              <button type="button" (click)="scrollTo('#contact')" class="btn-ghost cursor-pointer">
                Get in touch
              </button>
            </div>
          </div>
          <div class="lg:col-span-4 hidden lg:block hero-side opacity-0 translate-y-8">
            <div class="glass-strong rounded-3xl p-6 space-y-5">
              <div>
                <p class="text-xs font-mono text-white/35 uppercase tracking-widest mb-1">Role</p>
                <p class="font-semibold">Technology Analyst · Infosys</p>
              </div>
              <div class="h-px bg-white/10"></div>
              <div>
                <p class="text-xs font-mono text-white/35 uppercase tracking-widest mb-1">Location</p>
                <p class="text-sm text-white/55">Pune, India · Open to remote</p>
              </div>
              <div class="h-px bg-white/10"></div>
              <div>
                <p class="text-xs font-mono text-white/35 uppercase tracking-widest mb-1">Stack</p>
                <p class="text-sm text-white/55">Angular 14–20 · RxJS · NgRx · GitLab CI/CD</p>
              </div>
              <div class="flex gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="text-xs text-emerald-400/90 font-mono">Open to senior UI roles</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <span class="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
        <div class="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`]
})
export class HeroComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private scrollService = inject(ScrollService);
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private group!: THREE.Group;
  private particles!: THREE.Points;
  private animationFrameId?: number;
  private resizeHandler = () => this.onResize();

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
    const container = this.canvasContainer.nativeElement;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);

    this.group = new THREE.Group();

    const torusGeo = new THREE.TorusKnotGeometry(1.2, 0.35, 128, 16);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xa5b4fc,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    this.group.add(torus);

    const innerGeo = new THREE.IcosahedronGeometry(0.85, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x7dd3fc,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.8,
      metalness: 0.6,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    this.group.add(inner);

    const ringGeo = new THREE.TorusGeometry(2.2, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xfda4af, transparent: true, opacity: 0.4 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    this.group.add(ring);

    this.group.position.set(2.5, 0.2, 0);
    this.scene.add(this.group);

    const particlesGeo = new THREE.BufferGeometry();
    const count = 1500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 18;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.particles = new THREE.Points(
      particlesGeo,
      new THREE.PointsMaterial({ size: 0.015, color: 0xffffff, transparent: true, opacity: 0.35 })
    );
    this.scene.add(this.particles);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambient);
    const key = new THREE.PointLight(0x7dd3fc, 2.5, 20);
    key.position.set(4, 3, 5);
    this.scene.add(key);
    const fill = new THREE.PointLight(0xc4b5fd, 1.5, 20);
    fill.position.set(-3, -2, 4);
    this.scene.add(fill);

    this.camera.position.set(0, 0, 7);

    const animate = () => {
      this.animationFrameId = requestAnimationFrame(animate);
      this.group.rotation.y += 0.004;
      this.group.rotation.x += 0.001;
      ring.rotation.z += 0.002;
      this.particles.rotation.y -= 0.0003;
      this.renderer.render(this.scene, this.camera);
    };
    animate();

    window.addEventListener('resize', this.resizeHandler);
  }

  private onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    if (window.innerWidth < 1024) {
      this.group.position.set(0, -0.5, 0);
    } else {
      this.group.position.set(2.5, 0.2, 0);
    }
  }

  private animateIntro() {
    gsap.to('.hero-badge', { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 });
    gsap.to('.hero-title', { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.35 });
    gsap.to('.hero-subtitle', { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.55 });
    gsap.to('.hero-cta', { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.75 });
    gsap.to('.hero-side', { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', delay: 0.9 });
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.resizeHandler);
      this.renderer?.dispose();
    }
  }
}
