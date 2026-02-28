# SyncHomes Server

Express + MongoDB backend API for the SyncHomes landing page and admin dashboard.

## Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Cookie-based admin session handling

## Setup

```bash
npm install
```

Create `.env` from `.env.example` and update values as needed.

## Environment Variables

```env
MONGO_URI=mongodb://localhost:27017/synchomes
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-in-production
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@synchomes.com
ADMIN_PASSWORD=Admin@123
```

Optional variable used by the server:

```env
REQUEST_BODY_LIMIT=2mb
```

## Available Scripts

- `npm run dev` — Start server with Nodemon
- `npm start` — Start server in production mode
- `npm test` — Placeholder script

## Run Locally

```bash
npm run dev
```

Server runs at `http://localhost:5000`.

## API Overview

Base URL: `http://localhost:5000/api`

- `GET /health` — Health check
- `GET /projects` — Fetch projects
- `POST /projects` — Create project
- `PUT /projects/:id` — Update project
- `DELETE /projects/:id` — Delete project
- `GET /clients` — Fetch clients
- `POST /clients` — Create client
- `GET /contacts` — Fetch contact submissions
- `POST /contacts` — Submit contact form
- `GET /subscribers` — Fetch newsletter subscribers
- `POST /subscribers` — Subscribe email
- `POST /admin/login` — Admin login
- `GET /admin/me` — Get current admin (auth required)
- `POST /admin/logout` — Admin logout
- `POST /admin/reset-password` — Reset admin password (auth required)
- `PUT /admin/profile` — Update admin profile (auth required)

## Auth Notes

- Admin auth uses a JWT stored in an HTTP-only cookie named `adminToken`.
- Cookie security/same-site settings adapt to `NODE_ENV`.
