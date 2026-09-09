# Hi, I'm Ullas B R — this is my portfolio 👋

I built this as a futuristic, interactive 3D developer portfolio with **React + Vite + React Three Fiber + Framer Motion**. It's modular, data-driven, fast, responsive, and recruiter-friendly.

🔗 **Live:** https://ullas9525.github.io/portfolio/

I'm a code-crafting student building intelligent web apps, sleek Flutter apps, and quirky Python games — practical software that connects technology, creativity, and real-world impact.

---

## ✨ What I built into it

- **3D everywhere** — my Hero workstation, About desk, Skills node clusters, Projects gallery, DSA terminal, and Contact backdrop are all real-time Three.js scenes (procedural canvas textures, zero external 3D assets).
- **Live LeetCode stats** — my DSA section and Achievements pull my real solved count, difficulty split, ranking, and streaks from a LeetCode API mirror chain. If the API is slow or down, you'll never see an error on screen — I fall back to my last-good cached numbers (localStorage), then to my static snapshot. Failures only log to the console.
- **Achievements stay in sync** — my "LeetCode Problems Solved" and "Day Coding Streak" cards render from the same live hook, with exact numbers (no `+` suffixes on live counts).
- **Animated 3D DSA terminal** — the terminal in the 3D scene re-renders its canvas frames when my live stats arrive.
- **Contact without a backend** — my contact form opens a pre-filled `mailto:` to `ullasbr.2005@gmail.com`, plus a success state. No server needed.
- **Performance-conscious** — sections are code-split with `React.lazy`, 3D scenes simplify on mobile, respect `prefers-reduced-motion`, and cap devicePixelRatio.
- **CI/CD on GitHub Actions** — every push to `main` runs my `CI` build check, and my `Deploy to GitHub Pages` workflow publishes `dist/` automatically.

## 🛠️ My tech stack

| Layer | What I used |
| --- | --- |
| Frontend | React 18, Vite 6, Framer Motion, GSAP, Lenis |
| 3D | Three.js, React Three Fiber, React Three Fiber Drei |
| Icons | React Icons |
| Styling | Design-token CSS (`src/styles/`) |
| Data | Plain JS modules in `src/data/` — no CMS |
| CI/CD | GitHub Actions → GitHub Pages |

## 🧭 My sections (in order)

Hero → About → Skills → Projects → Flutter → AI/ML → IoT → DSA → GitHub → Education → Experience → Achievements → Resume → Contact.

- **Hero** — my workstation monitor, keyboard, phone, floating code + project cards, parallax camera, typed keyword rotation.
- **About** — 7 profile blocks inside a 3D desk interaction.
- **Skills** — 3D node clusters per category; hover a node to read my note on it.
- **Projects** — my 3D gallery; clicking a card brings up the full detail panel with GitHub + live demo links.
- **Flutter / AI / IoT** — deep-dives into my mobile apps, ML pipeline (preprocess → train → evaluate → ship), and embedded hardware.
- **DSA** — my animated coding terminal, count-up stats, streaks, ranking, badges, and topic coverage.
- **GitHub** — my repo spotlight + contribution snapshot.
- **Education + Experience** — my degree at P.E.S. College of Engineering, Mandya, plus my timeline.
- **Achievements + Resume** — my proof-of-consistency cards and downloadable resume.

## 🚀 My projects

| Project | What it is | Type | Status |
| --- | --- | --- | --- |
| [IntelliThreat System](https://github.com/ullas9525/IntelliThreat-System) | Unsupervised AI insider-threat detection for FinTech SMEs | AI / Web | Live ([demo](https://intelli-threat-system.vercel.app)) |
| [AI-Based-Navigation-System](https://github.com/ullas9525/AI-Based-Navigation-System) | Blueprints → interactive 3D indoor maps with Gemini vision AI + Dijkstra routing | AI / Web | Live |
| [Dictation App](https://github.com/ullas9525/Dictation_App) | Voice notes → cleaned text and summaries with Groq AI, Material 3 UI | Flutter / AI | Live |
| [PillDoze](https://github.com/ullas9525/PillDoze) | Arduino + Flutter smart pill reminder for elderly care | IoT / Flutter | Live |
| [Career-Pilot](https://github.com/ullas9525/Career-Pilot) | AI mock interviewer with real-time answer scoring | AI / Web | Coming soon |

## 🚀 Quick start

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## 🗂️ How I update my content

Everything lives in **`src/data/`** — I just edit a file and push:

| File | What it holds |
| --- | --- |
| `profile.js` | My name, titles, tagline, intro, photo, logo, resume path, social links, nav items, About blocks |
| `skills.js` | My skill categories + each technology + hover note |
| `projects.js` | All my projects — I add one object and get a new 3D card |
| `leetcode.js` | My static LeetCode snapshot (fallback when the live API is unreachable) |
| `education.js` | My degree + timeline entries |
| `achievements.js` | My achievements grid, GitHub snapshot, AI/ML pipeline |

My public assets live in `public/` and are referenced base-aware (`import.meta.env.BASE_URL`) so they work both locally and under the `/portfolio/` subpath in production:

- My photo → `public/profile.jpg`
- My logo → `public/Logo.png`
- My resume → `public/resume.pdf`
- My project screenshots → `public/projects/*.png`

---

## 🌐 My deployment

I host on **GitHub Pages** (project site → `https://ullas9525.github.io/portfolio/`):

- `vite.config.js` sets `base: '/portfolio/'` so all asset URLs resolve under the subpath.
- `.github/workflows/ci.yml` — my build check (`npm ci` + `npm run build` on Node 20) on pushes and PRs.
- `.github/workflows/deploy.yml` — builds `dist/` and deploys via `upload-pages-artifact` + `deploy-pages`. One-time setup: repo Settings → Pages → Source: **GitHub Actions**.

## 🗺️ Repo map

```
src/
├── data/                 # all my editable content
├── components/
│   ├── three/            # one 3D scene per section (procedural, no external assets)
│   │   ├── CanvasScene.jsx   # my shared <Canvas> scaffolding
│   │   ├── common.jsx        # lights, pointer rig, particles, glow disc, lazy mount
│   │   └── textures.js       # my procedural canvas textures (screens, covers, UI)
│   ├── ui/               # Loader, Navbar, Icons, SectionHeading/Reveal/CountUp
│   └── sections/         # DOM content layered over each scene
├── hooks/
│   └── useLeetCodeStats.js   # my live LeetCode fetch: API → localStorage cache → static fallback
├── styles/               # my design-token CSS (base + per-section)
└── utils/helpers.js      # mobile/reduced-motion detection, damp, scroll helpers
```

---

Find me here: [GitHub](https://github.com/ullas9525) · [LinkedIn](https://www.linkedin.com/in/ullas-b-r-624a29294/) · [LeetCode](https://leetcode.com/u/Ullas_9525/) · ullasbr.2005@gmail.com

Built with React 18, Three.js / React Three Fiber, Framer Motion and a lot of coffee ☕
