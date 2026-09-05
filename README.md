# Ullas B R — Premium 3D Developer Portfolio

A futuristic, interactive 3D developer portfolio built with **React + Vite + React Three Fiber (Three.js) + Framer Motion**. Modular, data-driven, fast, responsive, and recruiter-friendly.

---

## 🚀 Quick start

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## 🗂️ Editing your content (no rebuild needed)

All content lives in **`src/data/`** — edit these files to update the site:

| File | What it holds |
| --- | --- |
| `profile.js` | Name, titles, tagline, intro, photo, resume path, social links, nav items |
| `about.js` → `profile.js` | The 7 About blocks rendered in the 3D desk |
| `skills.js` | Skill categories + each technology + hover explanation |
| `projects.js` | All projects (name, description, features, tech, links). Add a new object → new 3D card |
| `leetcode.js` | LeetCode stats, badges, topics, terminal snippet |
| `education.js` | Degree, institution, duration; also `experienceList` (timeline entries) |
| `achievements.js` | Achievements grid, GitHub snapshot, AI/ML pipeline + concepts |

### Assets
- Profile photo → `public/profile.jpg` (copy from `assets/MY PHOTO.jpeg`)
- Resume → `public/resume.pdf` (copy from `assets/DevOps Resume.pdf`)

### Making GitHub data live
`src/components/sections/GitHubSection.jsx` currently renders the static snapshot in
`src/data/achievements.js`. To use the live GitHub API, fetch
`https://api.github.com/users/{githubData.username}` (only ~60 requests/hour unauthenticated; consider caching) and map `public_repos`, `followers`, etc. into the same display.

## 🧩 Architecture

```
src/
├── data/                 # all editable content
├── components/
│   ├── three/            # one 3D scene per section (procedural, no external assets)
│   │   ├── CanvasScene.jsx   # shared <Canvas> scaffolding
│   │   ├── common.jsx        # lights, pointer rig, particles, glow disc, lazy mount
│   │   └── textures.js       # procedural canvas textures (screens, covers, UI)
│   ├── ui/               # Loader, Navbar, Icons, SectionHeading/Reveal/CountUp
│   └── sections/         # DOM content layered over each scene
├── styles/               # design-token CSS (base + per-section)
└── utils/helpers.js      # mobile/reduced-motion detection, damp, scroll helpers
```

- Sections are **code-split** with `React.lazy` and only render when scrolled near.
- 3D scenes **simplify on mobile**, respect `prefers-reduced-motion`, and cap devicePixelRatio.
- The contact form opens a pre-filled `mailto:` to your inbox — no backend needed.

## 🔑 Key interactions

- **Hero** — workstation monitor, keyboard, phone, floating code + project cards, parallax camera.
- **About** — floating cubes that highlight in sync with the profile cards (hover/cards stay in sync).
- **Skills** — category clusters of connected 3D nodes; hover a node to read its note.
- **Projects** — 3D gallery; clicking a card eases it forward while the full detail panel appears below with GitHub + live demo links.
- **DSA** — animated coding terminal + count-up stats + topic chips.
- **Contact** — ambient 3D backdrop over the contact form and links.

## 🌐 Deployment

Any static host works (Vercel, Netlify, Cloudflare Pages, GitHub Pages). The build outputs a plain
static site to `dist/`.

---

Built with React 18, Three.js / React Three Fiber, Framer Motion and a lot of coffee ☕