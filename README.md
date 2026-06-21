<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=7B2FBE&height=220&section=header&text=Baldwin&fontSize=70&fontColor=ECE6F4&animation=fadeIn&fontAlignY=38&desc=A%20Dark%20Fantasy%20Developer%20Portfolio&descAlignY=58&descSize=18" width="100%"/>

<p>
  <em>Gothic-themed, full-stack developer portfolio — built with React, WebGL, and Supabase.</em>
</p>

<p>
  <a href="https://ais-pre-43hb4ladgt273fbgc6ur3e-105766517539.europe-west3.run.app"><img src="https://img.shields.io/badge/Live%20Demo-Visit%20Site-CC00FF?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"/></a>
  <a href="https://github.com/revolover00/Baldwin-portfolio-"><img src="https://img.shields.io/badge/GitHub-revolover00-7B2FBE?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-CC00FF?style=for-the-badge" alt="License"/></a>
</p>

<p>
  <img src="https://img.shields.io/badge/React-19-CC00FF?style=flat-square&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.8-7B2FBE?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Vite-6-CC00FF?style=flat-square&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/TailwindCSS-4-7B2FBE?style=flat-square&logo=tailwindcss&logoColor=white" alt="TailwindCSS"/>
  <img src="https://img.shields.io/badge/Framer%20Motion-12-CC00FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion"/>
  <img src="https://img.shields.io/badge/Supabase-2-7B2FBE?style=flat-square&logo=supabase&logoColor=white" alt="Supabase"/>
  <img src="https://img.shields.io/badge/WebGL-OGL-CC00FF?style=flat-square" alt="WebGL"/>
</p>

</div>

<br/>

## ✦ Overview

**Baldwin** is a personal developer portfolio built around a *Baldwin IV / plague-doctor* gothic aesthetic — deep purples, magenta glow, and atmospheric motion. It's a single-page React application with hash-based routing, a custom WebGL "ferrofluid" shader background, scroll-driven Framer Motion animation, and a Supabase backend that powers a live project showcase and a rate-limited contact form.

Every interaction — page transitions, hover states, the splash sequence, the project-detail zoom — is tuned to feel like one continuous, deliberate piece of motion design rather than a stitched-together template.

<br/>

## ✦ Table of Contents

- [Highlights](#-highlights)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Supabase Setup](#-supabase-setup)
- [Performance Notes](#-performance-notes)
- [Limitations](#-limitations)
- [Connect](#-connect)
- [License](#-license)

<br/>

## ✦ Highlights

| | |
|---|---|
| 🧭 **Hash-based SPA routing** | No React Router — `#home`, `#work`, `#about`, `#contact`, `#project/:id`, with scroll-sync via `IntersectionObserver` |
| 🌌 **Interactive WebGL background** | Custom GLSL "ferrofluid" shader (`ogl`) with mouse-reactive glow, fully disabled on mobile in favor of a lightweight gradient fallback |
| ✨ **Canvas ember particle system** | Hand-rolled `<canvas>` particle field, frame-rate-aware on mobile |
| 🎬 **Cinematic transitions** | 3D `rotateY` route transitions, a shared-layout splash → header logo animation, and a dedicated zoom transition into project detail pages |
| 🪶 **Lenis smooth scroll** | Buttery momentum scrolling with reduced intensity tuning on touch devices |
| 🗄️ **Supabase-backed content** | Projects are fetched live (public `SELECT`); falls back to a built-in demo project set if Supabase isn't configured |
| ✉️ **Rate-limited contact form** | Public `INSERT` into Supabase with a client-side cooldown to prevent spam |
| 📱 **Responsive, performance-aware** | Mobile gets reduced shader complexity, fewer particles, and tuned scroll physics — not just a smaller layout |

<br/>

## ✦ Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tool:** Vite 6
- **Styling:** TailwindCSS 4 (`@tailwindcss/vite`)
- **Animation:** Framer Motion (`motion`) + Lenis
- **3D / Shaders:** `ogl` (lightweight WebGL)
- **Backend:** Supabase (Postgres + Row Level Security)
- **Icons:** Lucide React
- **Deployment:** Vercel (static SPA) — see [`vercel.json`](vercel.json)

<br/>

## ✦ Project Structure

```text
src/
├── components/
│   ├── App.tsx           — Root component, routing, scroll orchestration, footer
│   ├── Home.tsx           — Hero section, typewriter effect, ember particles
│   ├── Work.tsx            — Projects grid, sourced from Supabase
│   ├── About.tsx           — Skills, social channels, live stats
│   ├── Contact.tsx        — Contact form with cooldown-based rate limiting
│   ├── ProjectDetail.tsx  — Individual project case-study page
│   ├── Header.tsx          — Fixed nav with active-route indicator
│   ├── Splash.tsx          — Animated intro screen (shared-layout transition into Header)
│   ├── ProfileCard.tsx    — Portrait card used in the About section
│   └── Ferrofluid.tsx      — WebGL shader background + mobile fallback
├── integrations/supabase/
│   ├── client.ts            — Supabase client + config validation
│   └── types.ts             — Database row types
├── store.ts                  — Data layer: project fetching/caching, message submission
└── types.ts                  — Shared UI-facing TypeScript types

public/
├── logo.webp     — Brand mark (add manually, see Limitations)
└── bg-video.mp4  — Reserved asset path (add manually, see Limitations)
```

<br/>

## ✦ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/revolover00/Baldwin-portfolio-.git
cd Baldwin-portfolio-

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# then fill in your Supabase credentials (see below)

# 4. Run the dev server
npm run dev
```

Other useful scripts:

```bash
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint       # type-check with tsc --noEmit
```

<br/>

## ✦ Environment Variables

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Your Supabase project's API gateway URL | `https://xxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public API key | `eyJ...` |

> Without these set, the app still runs fully — `Work.tsx` automatically falls back to a built-in set of demo projects, and the contact form will surface a clear configuration error instead of failing silently.

<br/>

## ✦ Supabase Setup

<details>
<summary><strong>Click to expand — table schema & Row Level Security policies</strong></summary>

**1. Table creation**

```sql
-- Projects shown in the Work section
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  description TEXT,
  subtitle TEXT,
  mediaUrl TEXT,
  websiteUrl TEXT,
  skills JSONB,
  gallery JSONB,
  createdAt BIGINT
);

-- Messages submitted via the Contact form
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  senderEmail TEXT NOT NULL,
  senderName TEXT,
  subject TEXT,
  body TEXT,
  createdAt BIGINT
);
```

**2. Row Level Security**

```sql
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select"
ON projects FOR SELECT
TO anon
USING (true);

CREATE POLICY "Allow anonymous insert"
ON messages FOR INSERT
TO anon
WITH CHECK (true);
```

</details>

<br/>

## ✦ Performance Notes

The app actively degrades animation complexity on smaller/lower-power devices rather than just hiding elements:

- The Ferrofluid WebGL shader is **fully disabled below 1024px** and replaced with a static blurred-gradient fallback.
- The ember particle canvas halves its frame rate and particle ceiling on mobile.
- Lenis smooth-scroll duration and wheel/touch multipliers are tuned down for touch devices.

<br/>

## ✦ Limitations

- **Brand assets are not committed.** `logo.webp` and `bg-video.mp4` are git-ignored and must be added manually to `/public` before building — both have graceful fallbacks (the header/footer render a stylized text wordmark if `logo.webp` is missing).
- `bg-video.mp4` is currently a **reserved asset path** (cache headers are pre-configured in `vercel.json`) — the hero section does not yet render a video background by default.
- The contact form's rate limiting is enforced client-side via `localStorage`; it deters casual spam but is not a substitute for server-side throttling.

<br/>

## ✦ Connect

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-revolover00-7B2FBE?style=for-the-badge&logo=github&logoColor=white)](https://github.com/revolover00/)
[![X](https://img.shields.io/badge/X-@revo__codes-CC00FF?style=for-the-badge&logo=x&logoColor=white)](https://x.com/revo_codes)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-revo--code-7B2FBE?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/revo-code-6181283b5)
[![YouTube](https://img.shields.io/badge/YouTube-@Revo--code-CC00FF?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@Revo-code)

</div>

<br/>

## ✦ License

Licensed under the [MIT License](LICENSE).
© 2025 Baldwin Portfolio.

<br/>

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=7B2FBE&height=120&section=footer" width="100%"/>
</div>