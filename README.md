# 🌌 AI-Powered 3D Knowledge Skeleton

An interactive, animated, three-dimensional learning environment that translates natural language inquiries into living concept graphs. Built with **React 19**, **Three.js**, **React Three Fiber (R3F)**, **Drei**, **TypeScript**, **Tailwind CSS**, and **Zod**.

---

## 🚀 Key Features

- **Cinematic 3D Deep-Space Canvas**: Rendered against pure deep black space with subtle ambient particles, controlled emissive bloom, and soft atmospheric halos.
- **Organic 3D Connection Tubes**: Physical 3D curved tubes (`CatmullRomCurve3` & `TubeGeometry`) connecting concepts with progressive growth animations and animated photon pulses.
- **Progressive Construction Animation**: Concepts materialize chronologically:
  1. Central concept orb fades and scales into view.
  2. First curved connection tube reaches outward.
  3. Connected concept sphere forms at the end of the tube with its camera-facing HTML badge.
  4. Secondary sub-concepts branch out in harmonious 3D space.
  5. Interactive controls: **Play**, **Pause**, **Replay**, and **Skip**.
- **Interactive Python Stepper**: A step-by-step visual execution trace for Python loops (`for i in range(1, 4): print(i)`):
  - Active line code highlighter.
  - Live variable inspector (`i`, sequence state).
  - Terminal stdout output simulation.
  - Forward, backward, and auto-play controls.
- **Mastery Verification**: Interactive practice quiz with instant feedback, explanations, and celebratory particle confetti upon solving.
- **Schema Validation & Security**: Zod-enforced schema validation on all graph data to prevent self-loops, orphaned edges, and malformed structures.
- **Resilient AI & Demo Fallback**: Zero-configuration demo mode with pre-baked master lessons (Python Loops, Binary Left Shift, HTML Box Model, HTTP Request) that seamlessly upgrades to live Gemini 1.5/2.0 AI generation when an API key is configured.
- **Dual Persistence Architecture**: Works out of the box with browser `localStorage`, with turnkey support for **Supabase PostgreSQL** cloud sync and Row Level Security (RLS).

---

## 📂 Project Architecture

```
hckton/
├── api/
│   └── generate-lesson.ts          # Serverless AI API handler (Gemini / OpenAI proxy)
├── supabase/
│   └── migrations/
│       └── 20261014_init_knowledge_map.sql # PostgreSQL schema & RLS policies
├── src/
│   ├── types/
│   │   └── knowledge.ts            # Centralized TypeScript definitions
│   ├── services/
│   │   ├── schema.ts               # Strict Zod validation schemas
│   │   ├── layoutEngine.ts         # Deterministic 3D spherical layout calculator
│   │   ├── aiService.ts            # Client-side AI abstraction & generator
│   │   └── supabaseService.ts      # Cloud & LocalStorage dual persistence layer
│   ├── data/
│   │   └── predefinedMaps.ts       # Curated master lessons (Loops, Bitshift, etc.)
│   ├── hooks/
│   │   └── useConstructionAnimation.ts # Progressive timeline animation controller
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── KnowledgeCanvas.tsx # WebGL R3F Scene Root
│   │   │   ├── ConceptSphere.tsx   # Emissive 3D sphere + crisp HTML label
│   │   │   ├── ConnectionTube.tsx  # 3D curved tube + photon pulse
│   │   │   ├── AmbientParticles.tsx# Ambient dust particle field
│   │   │   └── CameraController.tsx# Smooth OrbitControls & camera lerping
│   │   └── ui/
│   │       ├── Navbar.tsx          # Top bar, topic indicator & mastery count
│   │       ├── TopicPrompt.tsx     # Stage A input with example chips
│   │       ├── ConstructionControls.tsx # Play, Pause, Replay, Skip HUD
│   │       ├── CameraControlsOverlay.tsx# View reset & navigation hints
│   │       ├── LessonPanel.tsx     # Curriculum, stepper, and quiz drawer
│   │       ├── CodeTraceViewer.tsx # Line-by-line Python execution trace
│   │       └── PracticeQuiz.tsx    # Multiple-choice quiz + confetti
│   ├── App.tsx                     # Main layout & state coordinator
│   ├── index.css                   # Tailwind v4 setup & dark theme
│   └── main.tsx                    # React root entry point
├── .env.example                    # Environment variable template
├── vite.config.ts                  # Vite + Tailwind + Local Dev API plugin
└── package.json
```

---

## 🛠️ Prerequisites & Installation

### Prerequisites
- **Node.js**: v18 or higher (v24 LTS recommended)
- **npm**: v9 or higher

### Installation

1. Clone or open the repository:
   ```bash
   cd hckton
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   *Note: If no `.env` file is created, the application runs automatically in full-featured Demo Mode!*

---

## 💻 Development Commands

| Command | Action |
|---|---|
| `npm run dev` | Starts Vite local development server at `http://localhost:5173` |
| `npm run build` | Validates TypeScript (`tsc -b`) and produces production build in `dist/` |
| `npm run preview` | Previews the production build locally |

---

## 🔑 Environment Variables & AI Setup

Create a `.env.local` file in the root directory:

```env
# Optional: Google Gemini API Key for dynamic real-time AI generation
# (Get from https://aistudio.google.com/)
GEMINI_API_KEY=AIzaSy...

# Optional: Supabase credentials for cloud persistence & synchronization
# (Get from https://supabase.com/dashboard)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

### AI Generation Behavior
- **With `GEMINI_API_KEY`**: Custom user questions (e.g., *"Explain quantum entanglement"*) are sent to the `/api/generate-lesson` serverless endpoint, processed via Gemini 1.5/2.0 Flash with JSON-schema constraints, validated via Zod, positioned via the 3D layout engine, and rendered in 3D.
- **Without `GEMINI_API_KEY`**: Built-in curated master topics (Python Loops, Binary Left Shift, HTML Box Model, HTTP Request) load instantly, and arbitrary queries generate a synthesized demo graph with full 3D layout positioning.

---

## 🗄️ Supabase Database Setup

When you are ready to enable cloud persistence:

1. Create a new project at [supabase.com](https://supabase.com).
2. Navigate to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/migrations/20261014_init_knowledge_map.sql` from this repository and run the SQL commands.
4. Copy your project's URL and Anon Key into `.env.local` (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`).
5. The application will automatically detect the credentials and switch from local storage to cloud synchronization!

---

## 🚀 Deployment

### Deploying to Vercel

1. Push your repository to **GitHub**.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. In **Environment Variables**, add:
   - `GEMINI_API_KEY` (if using live AI)
   - `VITE_SUPABASE_URL` (if using Supabase)
   - `VITE_SUPABASE_ANON_KEY` (if using Supabase)
4. Click **Deploy**. Vercel will automatically build the Vite frontend and host `/api/generate-lesson.ts` as a serverless function!

---

## 🎯 Acceptance Criteria Verification

- [x] **Application Launches**: Vite dev server and production builds execute cleanly without errors.
- [x] **Python Loops Master Topic**: Curated default curriculum with glowing central `LOOPS` sphere and connected `FOR LOOP`, `WHILE LOOP`, `ITERATION`, `LOOP CONDITIONS`, and `NESTED LOOPS` nodes.
- [x] **Organic 3D Curved Tubes**: Built with `CatmullRomCurve3` and `TubeGeometry` featuring progressive growth and photon pulse animations.
- [x] **Camera Controls**: Interactive rotate, zoom, and pan with smooth camera targeting when selecting nodes and a one-click **Reset View** action.
- [x] **Animation Controls**: Floating HUD with Play, Pause, Replay, Skip, and real-time timeline progress percentage.
- [x] **Step-by-Step Python Stepper**: Visual execution trace for `for i in range(1, 4): print(i)` tracking variables, active line numbers, and stdout.
- [x] **Practice Quiz**: Interactive knowledge check with evaluation, explanations, and confetti on correct answers.
- [x] **Demo Fallback**: Works 100% offline and without API keys.
