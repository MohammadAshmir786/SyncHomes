# SyncHomes Client

Frontend application for SyncHomes, built with React, TypeScript, and Vite.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- React Query
- Recharts

## Setup

```bash
npm install
```

Create `.env` from `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Available Scripts

- `npm run dev` — Start development server (default: `http://localhost:5173`)
- `npm run build` — Type-check and build production bundle
- `npm run lint` — Run ESLint checks
- `npm run preview` — Preview production build

## Import Aliases

Configured in `vite.config.ts`:

- `@` → `src`
- `@components` → `src/components`
- `@pages` → `src/pages`
- `@utils` → `src/utils`
- `@assets` → `src/assets`
- `@types` → `src/types`

## Main App Routes

- `/` — Landing page
- `/admin/login` — Admin login
- `/admin/dashboard` — Admin dashboard (protected)

## Build Output

Production files are generated in `dist/`.
