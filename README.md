# AI CYBERVERSE

**A futuristic, interactive portfolio for Ayush Yadav, an aspiring Agentic AI Developer.**

[![Live site](https://img.shields.io/badge/live-ai--cyberverse.vercel.app-22d3ee?style=flat-square)](https://ai-cyberverse.vercel.app)
![React](https://img.shields.io/badge/React-20232a?style=flat-square&logo=react&logoColor=61dafb)
![Vite](https://img.shields.io/badge/Vite-1a1a2e?style=flat-square&logo=vite&logoColor=a78bfa)
![Motion](https://img.shields.io/badge/Motion_for_React-0a0f24?style=flat-square)
![Deployed on Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

**Live:** https://ai-cyberverse.vercel.app

<!--
Add screenshots: create a docs/screenshots folder, put real images in it,
then remove this comment and use lines like these:

![Hero](docs/screenshots/hero.png)
![Agent loop](docs/screenshots/agent-loop.png)
![Projects](docs/screenshots/projects.png)
-->

## What this is

A portfolio that tries to show how I think about AI systems, not just list them.
It is built around the agent lifecycle: **Perceive, Reason, Plan, Use Tools, Act,
Observe, Iterate**. Every project is written up with the problem, my approach, an
architecture flow and its limitations.

## Features

- **Hero** with an animated name, a canvas neural orb that follows the pointer, and an
  illustrative agent terminal
- **Agent Loop**: an interactive diagram of the seven-stage agent lifecycle
- **About**: a profile card, a learning timeline, a "currently learning" list and a
  **DSA Lab**, a step-by-step binary search visualizer synced with Java code
- **Skills Universe**: a constellation of skills grouped into clusters, labelled
  *hands-on* or *learning*, with lines to the projects that use them
- **Projects**: featured case studies with clickable architecture flows, tech badges,
  expandable technical details and limitations, plus smaller project cards
- **Contact** section with social links and an optional form
- **Motion**: scroll reveals, magnetic buttons, tilt cards, scroll progress bar, cursor
  glow and a one-time boot loader

## Honest notes

- The terminal and the agent loop animations are **illustrative**. They are not a live AI
  system.
- The contact form stays **disabled** until it is connected to a form service, so it
  never pretends to send a message.
- Skills are labelled *hands-on* only when I have used them in a project. Everything else
  is marked *learning*.

## Featured projects

| Project | What it is | Stack | Links |
|---|---|---|---|
| Autonomous Browser Agent | Plain-English goals turned into browser actions with a local LLM | Python, Ollama, Playwright, Streamlit | [GitHub](https://github.com/ayush-yadav314/autonomous-browser-agent) |
| Multi-Agent Financial Research Assistant | Multi-agent market research with live data and sentiment analysis | LangGraph, Gemini 2.5 Flash, yfinance, Plotly, Streamlit | [GitHub](https://github.com/ayush-yadav314/financial-agent-ai) · [Live demo](https://financial-agent-ai-a.streamlit.app/) |
| PlateLog | Full-stack workout tracker with progress charts and an AI coach | React, FastAPI, PostgreSQL, Groq API | [GitHub](https://github.com/ayush-yadav314/platelog) · [Live demo](https://platelog-alpha.vercel.app/) |
| AI CYBERVERSE | This portfolio | React, Vite, Motion, Canvas, SVG | [Live site](https://ai-cyberverse.vercel.app) |

Smaller projects: [Quant Strategy Pipeline](https://github.com/ayush-yadav314/crowdwisdom-quant-pipeline)
(uses synthetic data, as its README explains) and
[Breast Cancer Prediction](https://github.com/ayush-yadav314/breast-cancer-prediction)
(a learning project, not a medical tool).

## Tech stack

| Area | Tools |
|---|---|
| Framework | React, Vite |
| Styling | Plain CSS with design tokens (custom properties) |
| Animation | Motion for React, CSS animations |
| Visuals | HTML Canvas (neural orb), SVG (agent loop, skills map) |
| Icons | Lucide |
| Hosting | Vercel, auto-deployed from `main` |

No 3D library is used. A canvas particle sphere gives the 3D feel while keeping the page
light.

## Design system

| Token | Value |
|---|---|
| Background | `#05060f` (deep black), `#0a0f24` (midnight navy) |
| Accents | cyan `#22d3ee`, blue `#3b82f6`, violet `#8b5cf6`, magenta `#ec4899` |
| Highlights | lime `#a3e635`, orange `#fb923c` |
| Display font | Space Grotesk |
| Mono font | JetBrains Mono |

All colors and fonts live in `src/styles/tokens.css`.

## Accessibility and performance

- Respects `prefers-reduced-motion` (animations, tilt, glow and loader are turned off)
- Keyboard navigation, visible focus rings, a skip link and `Esc` to close the mobile menu
- Semantic HTML with a single `h1` and labelled landmarks
- The canvas animation pauses when off-screen and uses fewer particles on small screens
- Touch devices skip the cursor glow and tilt effects
- SEO meta tags, Open Graph and Twitter card tags

## Getting started

You need a recent version of Node.js (developed with v24).

```bash
git clone https://github.com/ayush-yadav314/ai-cyberverse.git
cd ai-cyberverse
npm install
npm run dev
```

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server at `http://localhost:5173` |
| `npm run build` | Create a production build in `dist` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check the code with ESLint |

## Project structure

```
src/
  components/   reusable pieces: Navbar, NeuralOrb, HeroTerminal, DsaLab, ProjectCard,
                MiniProjectCard, Magnetic, Tilt, CursorGlow, ScrollProgress, Loader
  sections/     page sections: Hero, About, AIUniverse, Projects, Skills, Contact
  data/         content as data: projects, skills, timeline, agentStages, navLinks,
                binarySearch
  hooks/        useActiveSection
  styles/       tokens.css, global.css, effects.css
public/         favicon and static files
```

## Customizing the content

Content lives in data files, so layout code rarely needs to change.

| To change... | Edit |
|---|---|
| Projects and their links | `src/data/projects.js` |
| Skills, and hands-on or learning status | `src/data/skills.js` |
| Learning timeline | `src/data/timeline.js` |
| Agent loop stage text | `src/data/agentStages.js` |
| Navigation items | `src/data/navLinks.js` |
| Colors and fonts | `src/styles/tokens.css` |
| Profile photo | `PHOTO` constant in `src/sections/About.jsx` |
| Project screenshots | `screenshot` field in `src/data/projects.js` |
| Contact form | `FORM_ENDPOINT` in `src/sections/Contact.jsx` |

## Deployment

Pushing to `main` deploys automatically on Vercel. Vercel detects the Vite preset, so no
extra configuration is needed.

## Known limitations

- The contact form is not connected to a form service yet.
- Some project cards show generated artwork until real screenshots are added.
- The DSA Lab currently covers one algorithm (binary search).

## Author

**Ayush Yadav**, B.Tech CSE (Artificial Intelligence), Galgotias College of Engineering
and Technology.

[GitHub](https://github.com/ayush-yadav314) ·
[LinkedIn](https://www.linkedin.com/in/ayush-yadav-634644321/) ·
[LeetCode](https://leetcode.com/u/cseayush/)