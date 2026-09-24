# Vamankumar Patel | Angular 3D Portfolio

A cinematic portfolio website built with Angular 21 to present my work, experience, and technical strengths in a modern, high-end format. The project is designed to feel premium, performant, and recruiter-friendly while also demonstrating real-world frontend engineering skills across enterprise UI development, animation, and interaction design.

## Overview

This portfolio is more than a visual landing page — it is a technology showcase. It communicates:

- Angular expertise across enterprise products and component-driven development
- Experience in banking, telecom, and healthcare domains
- UI/UX craftsmanship with motion, scroll-based storytelling, and immersive visuals
- Ability to build polished user experiences that balance design quality with production stability
- Frontend delivery skills spanning architecture, testing, accessibility, and deployment workflows

It is structured to help hiring managers, recruiters, and project stakeholders quickly understand my profile and the quality of my work without needing a long explanation.

## Why this portfolio exists

The site is built to act as a professional digital profile and proof of capability. It highlights:

- Senior UI engineering experience in Angular
- Strong understanding of component architecture and scalable frontend patterns
- Experience working in enterprise environments with cross-functional collaboration
- Ability to deliver polished interfaces using animation, micro-interactions, and immersive storytelling
- A practical understanding of modern frontend tooling and development workflows

## Core features

- Cinematic landing experience with dynamic 3D background animation
- Smooth, premium scroll interactions and animated section reveals
- Reusable, structured Angular components for a clean portfolio architecture
- Skills and experience section tailored to enterprise UI and frontend engineering work
- Project showcase with real-world domain examples across banking, telecom, and healthcare
- Contact form integration for lead capture and professional communication
- Responsive design optimized for desktop, tablet, and mobile viewing
- Modern styling with Tailwind CSS and glassmorphism-inspired visual design

## Tech stack

- Angular 21
- TypeScript
- RxJS
- Angular Material
- Tailwind CSS
- Three.js
- GSAP
- Lenis
- Google Apps Script integration for form submission
- Angular SSR support

## Project structure

```text
src/
├── app/
│   ├── components/
│   │   ├── contact/
│   │   ├── cursor/
│   │   ├── experience/
│   │   ├── header/
│   │   ├── hero/
│   │   ├── projects/
│   │   └── skills/
│   ├── services/
│   │   ├── contact.ts
│   │   └── scroll.ts
│   ├── app.css
│   ├── app.html
│   ├── app.routes.ts
│   ├── app.ts
│   └── app.config.ts
├── styles.css
├── main.ts
├── main.server.ts
└── server.ts
```

## Showcase sections

### Hero
The hero section establishes the portfolio identity with a bold introduction, role positioning, and immersive 3D motion background.

### Skills
The skills area communicates technical depth and frontend capability in a concise, visual way that is easy to scan.

### Experience
A structured experience timeline presents professional growth, business context, and impact-oriented contributions.

### Projects
The project section demonstrates domain experience and real-world work across multiple industries, helping recruiters and managers assess problem-solving and product thinking.

### Contact
The contact section enables quick communication and supports a professional outreach flow.

## Professional value

This project demonstrates that I can:

- Build polished, production-grade Angular applications
- Turn business requirements into engaging user-facing solutions
- Balance design quality with maintainable architecture
- Work effectively in enterprise engineering teams
- Deliver high-visibility frontend experiences that align with business goals

## Getting started

### Prerequisites

- Node.js 18+ or latest LTS recommended
- npm

### Installation

```bash
git clone https://github.com/your-username/your-portfolio-repo.git
cd your-portfolio-repo
npm install
```

### Run locally

```bash
npm run start
```

Or for a custom dev setup:

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Serve production build

```bash
npm run serve:ssr:app
```

## Contact form setup

The contact form is configured to submit data to a Google Apps Script endpoint, which can be connected to a Google Sheet for form capture.

To configure it:

1. Create a Google Sheet
2. Open Google Apps Script
3. Create a script that accepts POST requests and writes the submitted data to the sheet
4. Deploy it as a Web App
5. Update the endpoint URL in the contact service file

Relevant service file:

- src/app/services/contact.ts

## Personal profile summary

I am a frontend-focused engineer with experience building scalable, user-centric Angular applications in enterprise settings. My work spans product delivery, UI architecture, performance-sensitive interfaces, and collaborative implementation across domains such as banking, telecom, and healthcare.

## License

This project is available for portfolio and professional showcase purposes.

## Connect

- Portfolio: [Add your portfolio URL]
- LinkedIn: [Add your LinkedIn profile]
- GitHub: [Add your GitHub profile]
- Email: [Add your email]

---

If you want, I can also turn this into a more premium GitHub version with a cleaner badge section, project screenshot placeholders, and a stronger “about me / value proposition” style for hiring managers.
