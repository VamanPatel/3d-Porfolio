import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  template: `
    <section id="contact" class="py-24 md:py-32 relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,700px)] h-[min(90vw,700px)] rounded-full opacity-30 pointer-events-none"
           style="background: radial-gradient(circle, rgba(125,211,252,0.25) 0%, transparent 65%);"></div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-14">
            <span class="section-label">Contact</span>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Let's <span class="text-gradient">connect</span>
            </h2>
            <p class="text-white/50 text-lg max-w-xl mx-auto">Recruiters and teams — reach out for senior UI roles or Angular-led engagements.</p>
          </div>

          <div class="glass-strong rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 lg:p-16 grid lg:grid-cols-5 gap-12 lg:gap-16">
            <div class="lg:col-span-2 space-y-8">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <mat-icon class="text-primary">mail</mat-icon>
                </div>
                <div>
                  <p class="text-xs font-mono uppercase tracking-widest text-white/35 mb-1">Email</p>
                  <a href="mailto:vamankumar456@gmail.com" class="text-lg font-medium hover:text-primary transition-colors">vamankumar456&#64;gmail.com</a>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <mat-icon class="text-secondary">call</mat-icon>
                </div>
                <div>
                  <p class="text-xs font-mono uppercase tracking-widest text-white/35 mb-1">Phone</p>
                  <a href="tel:+919725576960" class="text-lg font-medium hover:text-primary transition-colors">+91 97255 76960</a>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                  <mat-icon class="text-accent">location_on</mat-icon>
                </div>
                <div>
                  <p class="text-xs font-mono uppercase tracking-widest text-white/35 mb-1">Location</p>
                  <p class="text-lg font-medium">Pune, India · Remote</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                  <mat-icon class="text-white/70">link</mat-icon>
                </div>
                <div>
                  <p class="text-xs font-mono uppercase tracking-widest text-white/35 mb-1">LinkedIn</p>
                  <a href="https://linkedin.com/in/vamanpatel" target="_blank" rel="noopener noreferrer"
                     class="text-lg font-medium hover:text-primary transition-colors">linkedin.com/in/vamanpatel</a>
                </div>
              </div>
            </div>

            <div class="lg:col-span-3">
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-5">
                <div class="grid sm:grid-cols-2 gap-5">
                  <div class="space-y-2">
                    <label for="name" class="text-xs uppercase tracking-widest text-white/40">Name</label>
                    <input id="name" type="text" formControlName="name"
                           class="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-3.5 focus:border-primary/60 outline-none transition-colors"
                           [class.border-red-500/80]="isFieldInvalid('name')"
                           placeholder="Your name">
                    @if (isFieldInvalid('name')) {
                      <p class="text-red-400 text-xs">Name is required</p>
                    }
                  </div>
                  <div class="space-y-2">
                    <label for="email" class="text-xs uppercase tracking-widest text-white/40">Email</label>
                    <input id="email" type="email" formControlName="email"
                           class="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-3.5 focus:border-primary/60 outline-none transition-colors"
                           [class.border-red-500/80]="isFieldInvalid('email')"
                           placeholder="you&#64;company.com">
                    @if (isFieldInvalid('email')) {
                      <p class="text-red-400 text-xs">
                        {{ contactForm.get('email')?.errors?.['required'] ? 'Email is required' : 'Invalid email' }}
                      </p>
                    }
                  </div>
                </div>
                <div class="space-y-2">
                  <label for="subject" class="text-xs uppercase tracking-widest text-white/40">Subject</label>
                  <input id="subject" type="text" formControlName="subject"
                         class="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-3.5 focus:border-primary/60 outline-none transition-colors"
                         [class.border-red-500/80]="isFieldInvalid('subject')"
                         placeholder="Role or project">
                  @if (isFieldInvalid('subject')) {
                    <p class="text-red-400 text-xs">Subject is required</p>
                  }
                </div>
                <div class="space-y-2">
                  <label for="message" class="text-xs uppercase tracking-widest text-white/40">Message</label>
                  <textarea id="message" rows="5" formControlName="message"
                            class="w-full bg-white/[0.04] border border-white/10 rounded-xl px-5 py-3.5 focus:border-primary/60 outline-none transition-colors resize-none"
                            [class.border-red-500/80]="isFieldInvalid('message')"
                            placeholder="Tell me about the opportunity…"></textarea>
                  @if (isFieldInvalid('message')) {
                    <p class="text-red-400 text-xs">Message is required</p>
                  }
                </div>
                <button type="submit" [disabled]="isSubmitting"
                        class="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none">
                  {{ isSubmitting ? 'Sending…' : 'Send message' }}
                  <mat-icon>send</mat-icon>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="fixed bottom-10 left-1/2 -translate-x-1/2 z-[2000] transition-all duration-500"
           [class.opacity-0]="!showToast && !showErrorToast"
           [class.translate-y-10]="!showToast && !showErrorToast"
           [class.pointer-events-none]="!showToast && !showErrorToast">
        @if (showToast) {
          <div class="glass-strong px-8 py-4 rounded-full font-semibold flex items-center gap-3 border-primary/30 text-primary">
            <mat-icon>check_circle</mat-icon>
            Message sent successfully
          </div>
        }
        @if (showErrorToast) {
          <div class="bg-red-500/90 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-3">
            <mat-icon>error</mat-icon>
            Something went wrong. Please try again.
          </div>
        }
      </div>
    </section>
  `,
  styles: [`:host { display: block; }`]
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private contactService = inject(ContactService);

  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  isSubmitting = false;
  showToast = false;
  showErrorToast = false;

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.showToast = false;
      this.showErrorToast = false;
      this.cdr.markForCheck();

      this.contactService.sendPost(this.contactForm.value).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.showToast = true;
          this.contactForm.reset();
          this.cdr.markForCheck();
          setTimeout(() => {
            this.showToast = false;
            this.cdr.markForCheck();
          }, 2500);
        },
        error: (err) => {
          console.error('Error sending message:', err);
          this.isSubmitting = false;
          this.showErrorToast = true;
          this.cdr.markForCheck();
          setTimeout(() => {
            this.showErrorToast = false;
            this.cdr.markForCheck();
          }, 3000);
        },
      });
    } else {
      Object.values(this.contactForm.controls).forEach((control) => control.markAsTouched());
    }
  }
}
