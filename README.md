# CivicSathi

An AI-assisted civic grievance triage and participatory budgeting platform — a working frontend prototype built for **Smart India Hackathon 2026**, Problem Statement **SOAIDEATHON-S36** ("Evidence-Grounded Civic Grievance Triage and Participatory Budgeting Platform").

> This is a hackathon prototype. All complaint data, the city of "Basantnagar," its departments, and the AI pipeline are simulated with realistic mock data and local React state — there is no live backend, and no real government integration. See **How It Works** in the app for the intended production architecture.

## What it does

CivicSathi lets citizens report civic issues (potholes, water leaks, garbage, broken street lights, and more) via text, voice, or photo, in English, Hindi, or Odia. Reports are run through a simulated AI pipeline that detects category, priority, and language, groups duplicate reports together, and routes each case to the right municipal department. Citizens can track resolution progress with photo evidence at every stage, and vote on which local infrastructure projects should be funded next.

Follow the flow: **Report → Understand → Group → Route → Track → Participate**

## Getting started

Requires [Node.js](https://nodejs.org/) 18 or later.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

Other commands:

```bash
npm run build      # production build to /dist
npm run preview    # preview the production build locally
```

## Project structure

```
civicsathi/
├── src/
│   ├── components/   # shared UI: nav, cards, timeline, stamps, toasts
│   ├── pages/         # one file per route/screen
│   ├── context/        # global app state (auth, theme, language, mock data mutations)
│   ├── data/            # centralized mock data (complaints, departments, projects)
│   ├── utils/            # the simulated AI pipeline (category/priority/duplicate detection)
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── tailwind.config.js
└── package.json
```

## Pages

| Route | Description |
|---|---|
| `/` | Landing page — value proposition, workflow, differentiators |
| `/report` | Report an issue — multi-step form with simulated AI analysis |
| `/track` | Search and filter all reported complaints |
| `/track/:id` | Complaint detail — status timeline and evidence |
| `/dashboard` | Citizen dashboard — your complaints, notifications, nearby issues |
| `/map` | Community issues map (stylized mock map, no live Maps API) |
| `/participate` | Participatory budgeting — vote on proposed projects |
| `/transparency` | Public transparency dashboard with charts |
| `/admin` | Department officer dashboard — priority queue and case actions |
| `/how-it-works` | Architecture, tech stack, feasibility, and impact |
| `/login` | Mocked citizen / department officer sign-in |

Sign in from `/login` — choose "Department officer" to unlock `/admin`.

## Swapping in real services

The mock pipeline in `src/utils/aiSimulation.js` and the mutable state in `src/context/AppContext.jsx` are the two places to connect to a real backend: replace the heuristic functions with API calls to your NLP/routing service, and replace the local `useState` calls with API-backed data fetching. The proposed production stack (React, Tailwind, Node/Express, PostgreSQL/MongoDB, Python/spaCy/Hugging Face, OpenCV, Google Maps API, Firebase Auth/JWT, Firebase/AWS S3) is documented on the **How It Works** page.

## License

Prototype for hackathon evaluation purposes.
