# Pierre Ashraf — Portfolio

A premium, dark-themed personal portfolio for **Pierre Ashraf** — a Computer Science &amp; Artificial
Intelligence student at Helwan University, focused on Front-End Development and Data Visualization.

Live structure: single-page site built with plain HTML, CSS and JavaScript. No frameworks,
no build step, no backend.

---

## Features

- **Ten core sections** — Hero, About, Education, Skills, Experience, Services, Projects,
  Achievements, Testimonials, Contact — in a fixed, logical order.
- **Dark / light mode toggle** with system-preference detection and persistence via `localStorage`.
- **Fixed, responsive navigation** with a mobile hamburger menu.
- **Scroll progress indicator** pinned to the top of the viewport.
- **Reveal-on-scroll animations** powered by `IntersectionObserver`, with a graceful
  fallback and full support for `prefers-reduced-motion`.
- **Two full project case studies** (Tableau Health Dashboard, Al Tayyar Company Website)
  with CSS-only visual mockups — no stock photography.
- **Accessible modal system** for case studies: focus trap, `Escape` to close, click-outside
  to close, and focus returns to the trigger button on close.
- **Fully responsive** from large desktop down to small mobile, with breakpoints at
  1200px, 950px, 768px, 600px and 480px.
- **No fabricated content** — every project, training program and skill level reflects
  real, provided information only.

## Technologies

- HTML5 (semantic markup, ARIA where needed)
- CSS3 (custom properties, Grid, Flexbox, CSS-only illustrations)
- Vanilla JavaScript (ES5-compatible, no dependencies)
- [Google Fonts](https://fonts.google.com/) — Space Grotesk (display) &amp; Inter (body)

## Projects included

1. **Tableau Health Dashboard** — Data Visualization
   Interactive dashboard analyzing 4,155 health records (BMI, blood pressure, cholesterol,
   smoking status, physical activity, age groups) with calculated fields and KPI cards.

2. **Al Tayyar Company Website** — Front-End Development
   A responsive company website built with HTML, CSS and JavaScript.

3. **AirPlanes Travel Website** — Front-End Development
   A multi-page airline &amp; travel booking platform (13 pages) covering flight search, date
   selection, seat booking, hotels, packages, tickets/receipts, and login, signup and profile pages.

## File structure

```
/
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to run locally

1. Download or clone this repository.
2. Open `index.html` directly in any modern browser.

No server, build tool, or package installation is required.

## How to deploy to GitHub Pages

1. Push these four files to the root of the repository:
   `pierreashraf93-bit/pierreashraf93.github.io`
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **Deploy from a branch**.
4. Choose the `main` branch and the `/ (root)` folder, then click **Save**.
5. Wait a minute for GitHub Pages to build, then visit:
   `https://pierreashraf93-bit.github.io/`

Because the repository is named `<username>.github.io`, no `/repo-name/` path
prefix is needed — all asset paths in this project are already relative and
will work as-is.

## Contact

- **Email:** pierreashraf53@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/pierre-ashraf-1ab72837a
- **GitHub:** https://github.com/pierreashraf93-bit/pierreashraf93.github.io
