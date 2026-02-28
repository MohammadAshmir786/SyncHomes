# SyncHomes Landing Page

Full-stack MERN project for the SyncHomes marketing site and admin dashboard.

## Project Structure

```text
SyncHomes_Landing_Page/
├── client/   # React + TypeScript + Vite frontend
└── server/   # Node.js + Express + MongoDB backend API
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB instance (local or hosted)

## Quick Start

### 1) Install dependencies

```bash
cd server
npm install

cd ../client
npm install
```

### 2) Configure environment variables

Create local `.env` files from the examples:

- `server/.env.example` → `server/.env`
- `client/.env.example` → `client/.env`

### 3) Run the backend

```bash
cd server
npm run dev
```

Backend runs at `http://localhost:5000`.

### 4) Run the frontend

```bash
cd client
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Main URLs

- Landing page: `http://localhost:5173`
- Admin login: `http://localhost:5173/admin/login`
- API health check: `http://localhost:5000/api/health`

## Scripts

### Client (`client/package.json`)

- `npm run dev` — Start Vite dev server
- `npm run build` — Type-check and build production bundle
- `npm run lint` — Run ESLint
- `npm run preview` — Preview production build locally

### Server (`server/package.json`)

- `npm run dev` — Start backend with Nodemon
- `npm start` — Start backend in production mode
- `npm test` — Placeholder test script

## Stack

- Frontend: React 19, TypeScript, Vite, Tailwind CSS, React Router, Recharts
- Backend: Node.js, Express, MongoDB (Mongoose), JWT auth, cookie-based sessions

## Documentation

- Frontend docs: [client/README.md](client/README.md)
- Backend docs: [server/README.md](server/README.md)
