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
    <section id="contact" class="py-20 md:py-32 relative overflow-hidden">
      <div class="bg-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full"></div>
      
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-5xl mx-auto glass rounded-[32px] md:rounded-[40px] p-6 md:p-16 flex flex-col lg:flex-row gap-12 md:gap-16">
          <div class="lg:w-1/2">
            <h2 class="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight">Let's build something <span class="text-primary">extraordinary</span>.</h2>
            <p class="text-white/60 text-base md:text-lg mb-8 md:mb-12">Currently open for senior roles and high-impact freelance projects.</p>
            
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <mat-icon class="text-primary">email</mat-icon>
                </div>
                <div>
                  <p class="text-xs text-white/40 uppercase tracking-widest">Email</p>
                  <p class="text-lg">vamankumar456&#64;gmail.com</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <mat-icon class="text-primary">location_on</mat-icon>
                </div>
                <div>
                  <p class="text-xs text-white/40 uppercase tracking-widest">Location</p>
                  <p class="text-lg">India • Remote</p>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:w-1/2">
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label for="name" class="text-xs uppercase tracking-widest text-white/40">Name</label>
                  <input id="name" type="text" formControlName="name"
                         class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-colors" 
                         [class.border-red-500]="isFieldInvalid('name')"
                         placeholder="John Doe">
                  @if (isFieldInvalid('name')) {
                    <p class="text-red-500 text-[10px] uppercase tracking-widest">Name is required</p>
                  }
                </div>
                <div class="space-y-2">
                  <label for="email" class="text-xs uppercase tracking-widest text-white/40">Email</label>
                  <input id="email" type="email" formControlName="email"
                         class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-colors" 
                         [class.border-red-500]="isFieldInvalid('email')"
                         placeholder="john&#64;example.com">
                  @if (isFieldInvalid('email')) {
                    <p class="text-red-500 text-[10px] uppercase tracking-widest">
                      {{ contactForm.get('email')?.errors?.['required'] ? 'Email is required' : 'Invalid email address' }}
                    </p>
                  }
                </div>
              </div>
              <div class="space-y-2">
                <label for="subject" class="text-xs uppercase tracking-widest text-white/40">Subject</label>
                <input id="subject" type="text" formControlName="subject"
                       class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-colors" 
                       [class.border-red-500]="isFieldInvalid('subject')"
                       placeholder="Project Inquiry">
                @if (isFieldInvalid('subject')) {
                  <p class="text-red-500 text-[10px] uppercase tracking-widest">Subject is required</p>
                }
              </div>
              <div class="space-y-2">
                <label for="message" class="text-xs uppercase tracking-widest text-white/40">Message</label>
                <textarea id="message" rows="4" formControlName="message"
                          class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-colors resize-none" 
                          [class.border-red-500]="isFieldInvalid('message')"
                          placeholder="Tell me about your project..."></textarea>
                @if (isFieldInvalid('message')) {
                  <p class="text-red-500 text-[10px] uppercase tracking-widest">Message is required</p>
                }
              </div>
              <button type="submit" [disabled]="isSubmitting"
                      class="w-full py-4 md:py-5 bg-primary text-dark font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed">
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                <mat-icon>send</mat-icon>
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Toast Notification -->
      <div class="fixed bottom-10 left-1/2 -translate-x-1/2 z-[2000] transition-all duration-500"
           [class.opacity-0]="!showToast && !showErrorToast"
           [class.translate-y-10]="!showToast && !showErrorToast"
           [class.pointer-events-none]="!showToast && !showErrorToast">
        
        @if (showToast) {
          <div class="bg-primary text-dark px-8 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(0,242,255,0.4)] flex items-center gap-3">
            <mat-icon>check_circle</mat-icon>
            Message sent successfully!
          </div>
        }

        @if (showErrorToast) {
          <div class="bg-red-500 text-white px-8 py-4 rounded-full font-bold shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center gap-3">
            <mat-icon>error</mat-icon>
            Something went wrong. Please try again.
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private contactService = inject(ContactService);
  
  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
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
          
          // Hide toast after 2 seconds
          setTimeout(() => {
            this.showToast = false;
            this.cdr.markForCheck();
          }, 2000);
        },
        error: (err) => {
          console.error('Error sending message:', err);
          this.isSubmitting = false;
          this.showErrorToast = true;
          this.cdr.markForCheck();
          
          // Hide error toast after 3 seconds
          setTimeout(() => {
            this.showErrorToast = false;
            this.cdr.markForCheck();
          }, 3000);
        }
      });
    } else {
      Object.values(this.contactForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
