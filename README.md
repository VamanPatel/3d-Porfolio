# Cinematic Portfolio - Angular 21

A high-performance, visually stunning portfolio application built with the latest web technologies. This project showcases a "cinematic" user experience with smooth animations, 3D elements, and a modern architectural approach.

## 🚀 Tech Stack

- **Framework:** [Angular 21](https://angular.dev/) (Zoneless)
- **Styling:** [Tailwind CSS 4+](https://tailwindcss.com/)
- **3D Graphics:** [Three.js](https://threejs.org/)
- **Animations:** [GSAP](https://gsap.com/) & [Motion](https://motion.dev/)
- **Smooth Scrolling:** [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons:** [Angular Material Icons](https://material.io/resources/icons/)
- **Forms:** Angular Reactive Forms

## ✨ Key Features

- **Zoneless Angular:** Leverages the latest Angular performance features for a faster, more efficient application without `zone.js`.
- **Cinematic UI/UX:** Implements custom cursor effects, noise overlays, and layered background glows for a premium aesthetic.
- **Interactive 3D Elements:** Integrated Three.js components for immersive visual storytelling.
- **Smooth Navigation:** Custom `ScrollService` using Lenis for a fluid, high-end scrolling experience.
- **Reactive Contact Form:** A fully validated contact form integrated with **Google Apps Script** to store submissions directly in a Google Sheet.
- **Responsive Design:** Desktop-first precision with a mobile-first code approach using Tailwind CSS.
- **Dynamic Header:** A smart header that transitions from transparent to a glassmorphism effect on scroll.

## 🛠️ Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the development server on port 3000:
```bash
npm run dev
```
Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

### Build

Run the build command to compile the project:
```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory.

## 📝 Contact Form Integration

The contact form is configured to send data to a Google Sheets backend via a Web App URL. 

**Setup Instructions:**
1. Create a Google Sheet.
2. Open Extensions > Apps Script.
3. Paste the provided Google Apps Script code.
4. Deploy as a Web App (set access to "Anyone").
5. Update the `googleAppUrl` in `src/app/services/contact.ts`.

## 📄 License

This project is licensed under the MIT License.
