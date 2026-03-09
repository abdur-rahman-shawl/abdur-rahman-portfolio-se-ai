# Abdur Rahman Portfolio - Architecture & Aesthetic Documentation

## Overview
This documentation provides an architectural and aesthetic breakdown of the Abdur Rahman portfolio site. The site is designed as a high-fidelity, cinematic "1:1 Pixel Perfect" digital experience, heavily influenced by Awwwards and Framer design patterns. It emphasizes intentional scrolling, weighted professional animations, and a premium dark-themed visual language.

## Tech Stack
The application is built using a modern, performance-oriented frontend stack:
- **Framework:** Next.js (App Router, v15.4.9)
- **UI Library:** React (v19.2.1)
- **Styling:** Tailwind CSS (v4) with PostCSS
- **Animation Engine:** 
  - GSAP (v3.14.2) & `@gsap/react` for complex scroll-triggered animations and timelines.
  - Motion (Framer Motion) for fluid component-level transitions.
- **Smooth Scrolling:** Lenis (v1.3.18) for creating a native-feeling, weight-driven scroll experience essential for cinematic sites.
- **Icons:** Lucide React

## Project Structure
The repository is organized following standard Next.js App Router conventions:

- `app/`
  - `layout.tsx`: The root layout implementing global providers (SmoothScroll, LoaderContext, Navbar, CustomCursor) and defining the base dark theme `bg-[#050505] text-[#f5f5f5]`.
  - `page.tsx`: The main landing page orchestrating the sequence of sections (`Hero`, `About`, `Experience`, `Projects`, `Contact`, `Footer`).
  - `globals.css`: Global tailwind directives and base styles.
  
- `components/`
  - **Core Sections:** `Hero.tsx`, `About.tsx`, `Experience.tsx`, `Projects.tsx`, `Contact.tsx`, `Footer.tsx`.
  - **Interactive Elements:** 
    - `CustomCursor.tsx`: Overrides the default cursor for a bespoke digital feel.
    - `SmoothScroll.tsx`: Wrapper utilizing Lenis to enforce the weighted scroll behavior.
    - `LoaderContext.tsx`: Manages the initial loading state and orchestrates entry animations.
    - `Navbar.tsx`: Global navigation.

## Aesthetic Direction & Design Philosophy
The site meticulously avoids generic templates in favor of a "digital instrument" feel:
- **Theme:** Ultra-dark mode (`#050505`) with off-white text (`#f5f5f5`) to reduce eye strain while maintaining stark, premium contrast.
- **Typography:** A pairing of `Inter` (sans-serif, clean, modern) and `Playfair Display` (serif, elegant, editorial). The Hero section utilizes massive viewport-scaled text (`text-[12vw]`) with tight tracking and leading (`leading-[0.85] tracking-tighter`) to create a brutalist yet refined poster-like impact.
- **Motion & Layout:** 
  - **Parallax & Depth:** Achieved via GSAP ScrollTrigger (e.g., in the Hero section where the background and content move at different speeds).
  - **Micro-interactions:** Custom cursors, text reveal lines (`y: 100` to `y: 0` with opacity fades), and ambient glowing orbs (mix-blend-screen blur pulse effects).
  - **Pacing:** Animations are staggered and specifically eased (`power4.out`, `power3.out`) to feel deliberate, avoiding bouncy or overly frantic transitions.

## Conclusion
The architecture is tightly coupled with its animation libraries, relying on GSAP and Lenis at the layout level to dictate the user's journey. This ensures that every interaction feels cohesive, performant, and aligned with world-class creative engineering standards.
