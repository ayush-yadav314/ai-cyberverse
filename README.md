# AI CYBERVERSE

A futuristic personal portfolio for Ayush Yadav, an aspiring Agentic AI Developer
(B.Tech CSE, Artificial Intelligence).

**Live site:** https://YOUR-SITE.vercel.app

## What's inside

- Hero with a canvas neural orb and an illustrative agent terminal
- An interactive Agent Loop diagram: Perceive, Reason, Plan, Use Tools, Act, Observe, Iterate
- About section with a learning timeline
- Skills Universe: an interactive constellation of skills and the projects that use them,
  with learning-stage skills labelled honestly
- Project showcases with architecture flows, limitations and links
- Contact section (the form stays disabled until a form service is connected)

The terminal and the agent loop animations are illustrative. They are not a live AI system.

## Tech stack

React, Vite, plain CSS, Motion for React, Lucide icons. Deployed on Vercel.

## Run it locally

    npm install
    npm run dev

Other commands: `npm run build`, `npm run preview`, `npm run lint`.

## Project structure

    src/
      components/   reusable pieces (Navbar, NeuralOrb, Magnetic, Tilt, ...)
      sections/     page sections (Hero, About, AIUniverse, Projects, Skills, Contact)
      data/         content as data (projects, skills, timeline, agent stages)
      hooks/        custom hooks
      styles/       design tokens, global styles, effects

## Accessibility and performance

Respects reduced-motion settings, has keyboard-friendly navigation and a skip link,
pauses the canvas animation when off-screen, and uses fewer particles on small screens.