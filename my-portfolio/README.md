# Premium Dark Animated Portfolio â€” Phase 1

A modern, high-performance personal portfolio website built with clean HTML5, CSS3, and Vanilla JavaScript. Features dark aesthetic styling with deep obsidian surfaces, subtle purple ambient lighting, smooth GSAP ScrollTrigger reveals, rotating headlines, interactive card lighting, and GLightbox project previews.

## ðŸš€ Quick Start (Running Locally)

You can run this project in two ways:

### Option A: One-Click Launcher (Recommended)
Double-click `start.bat` in the project folder. This will automatically start a lightweight local web server at `http://localhost:5500` and open your default browser.

### Option B: Open Directly
Double-click `index.html` to open it immediately in Google Chrome, Microsoft Edge, Brave, or any modern web browser.

---

## ðŸ“ File Structure

```
portfolio/
â”œâ”€â”€ index.html                   # Main semantic HTML5 document
â”œâ”€â”€ start.bat                    # One-click Windows server launcher
â”œâ”€â”€ start-server.ps1             # Zero-dependency PowerShell local HTTP server
â”œâ”€â”€ README.md                    # Documentation & customization guide
â””â”€â”€ assets/
    â”œâ”€â”€ css/
    â”‚   â””â”€â”€ style.css            # Dark theme, purple glow, animations & responsive styling
    â”œâ”€â”€ js/
    â”‚   â”œâ”€â”€ portfolio-data.js    # Central editable configuration for all personal data
    â”‚   â””â”€â”€ main.js              # GSAP animations, cursor tracking, filter, & interactions
    â””â”€â”€ images/
        â”œâ”€â”€ profile/
        â”‚   â””â”€â”€ placeholder-hero.svg # Futuristic dark portrait placeholder
        â””â”€â”€ portfolio/
            â”œâ”€â”€ project-1.svg    # NeuralFlow AI Analytics mockup
            â”œâ”€â”€ project-2.svg    # VaultX DeFi Protocol mockup
            â”œâ”€â”€ project-3.svg    # Atelier 3D Spatial Studio mockup
            â”œâ”€â”€ project-4.svg    # Pulse Cloud Orchestrator mockup
            â”œâ”€â”€ project-5.svg    # LumiÃ¨re Noir High-End Audio mockup
            â””â”€â”€ project-6.svg    # Canvas Infinite Collaboration mockup
```

---

## ðŸŽ¨ How to Customize (Phase 2 Preparation)

All personal data, projects, and skills are separated from the markup and stored in `assets/js/portfolio-data.js`.

### 1. Update Personal & Brand Information
Open `assets/js/portfolio-data.js` and edit the `personal` object:
- `name`: Your full name
- `brandLogo`: Your logo initials or badge (e.g., `"AV."`, `"<YN />"`)
- `titles`: Array of job titles that rotate automatically in the hero section
- `tagline`: Your personal intro headline
- `email` & `phone`: Your contact details
- `socials`: Your social links (YouTube, Facebook, Instagram, TikTok)
- `stats`: Key metrics displayed in the About section

### 2. Replace Photos & Mockups
- **Profile Portrait**: Place your photo inside `assets/images/profile/` and update `profileImage` in `portfolio-data.js` (supports `.png`, `.jpg`, `.webp`, `.svg`).
- **Project Mockups**: Place your project screenshots inside `assets/images/portfolio/` and update the `image` paths in the `projects` array.

---

## âœ¨ Features Included

- **Dark & Purple Theme**: Obsidian backgrounds (`#07070a`), glassmorphic cards, and subtle purple/indigo backlights.
- **GSAP & ScrollTrigger**: Smooth entrance timeline, section triggers, and dynamic stat counters.
- **Rotating Titles**: Flip/slide animation across developer titles.
- **GLightbox Gallery**: Click zoom previews on project cards.
- **Interactive Cursor**: Smooth lagging purple halo follower (automatically hidden on mobile/touch screens).
- **Responsive Design**: Flawless experience across mobile, tablet, and widescreen desktop displays.
