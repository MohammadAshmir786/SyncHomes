# SyncHomes Landing Page

A full-stack MERN application with a modern landing page and secure admin dashboard. This repository hosts both the React frontend and Express backend we deploy to production.

## 🎯 Quick Start

### Local Development

**Prerequisites:** Node.js (v18+), MongoDB

**Backend Setup:**

```bash
cd server
npm install
cp .env.example .env  # Configure your MongoDB URI
npm run seed          # Seed admin user
npm run dev           # Start on http://localhost:5000
```

**Frontend Setup:**

```bash
cd client
npm install
cp .env.example .env  # Default API: http://localhost:5000/api
npm run dev           # Start on http://localhost:5173
```

**Access:**

- Frontend: http://localhost:5173
- Admin Panel: http://localhost:5173/admin/login
- Credentials: admin@synchomes.com / Admin123

---

## 🛰️ Repository Guide

- **Structure:** Frontend lives in [client/](client) and backend in [server/](server); both ship from this repo.
- **Branching:** `main` is production-ready; open PRs against `main` for changes.
- **Deploys:** Production deploys are triggered from `main`. Keep environment variables in synced `.env` files (examples in each package) and secrets in your hosting provider.
- **Running checks:** Use `npm run build` in `client` and `npm run start` in `server` to mirror production builds.
- **Issues/PRs:** Add concise descriptions, reproduction steps, and screenshots for UI changes to keep the repo history clear.

---

## 🌟 Features

- 🏠 Modern responsive landing page
- 📊 Project showcase with filtering
- 👥 Client testimonials
- 📬 Contact form and newsletter
- 🔐 Secure JWT authentication
- 📈 Admin dashboard with analytics
- 🖼️ Image upload and management
- 📊 Real-time charts (Recharts)

---

## 🛠️ Tech Stack

**Frontend:** React 19, TypeScript, Vite, TailwindCSS, React Router, Recharts  
**Backend:** Node.js, Express, MongoDB, JWT, Multer, bcrypt

---

## 📁 Project Structure

```
SyncHomes_Landing_Page/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/            # UI building blocks
│   │   │   ├── layout/            # Site-wide UI: Navbar, Footer, Loading, Logo, ErrorBox
│   │   │   ├── sections/          # Landing page sections: Hero, AboutUs, Projects, Clients, ContactForm, Newsletter
│   │   │   ├── admin/             # Admin-dashboard re-exports for convenience (source in AdminComponents)
│   │   │   └── AdminComponents/   # Admin-dashboard components (existing)
│   │   ├── pages/                 # Route-level pages (Landing, AdminDashboard, etc.)
│   │   ├── utils/                 # Utilities & hooks
│   │   ├── assets/                # Images, icons, fonts
│   │   └── types.ts               # Shared TypeScript types
│   └── .env.example               # Environment template
│
├── server/              # Express backend
│   ├── controllers/     # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── .env.example     # Environment template
### 🧭 Frontend Import Aliases

To simplify imports and keep structure scalable, the frontend supports the following aliases (existing relative imports continue to work):

```

@/_ -> client/src/_
@components/_ -> client/src/components/_
@pages/_ -> client/src/pages/_
@utils/_ -> client/src/utils/_
@assets/_ -> client/src/assets/_
@types -> client/src/types

```

Examples:

```

import { Navbar } from '@components/layout'
import { Hero, AboutUs } from '@components/sections'
import { ImageCropper } from '@components/admin'
import { usePageMeta } from '@utils/usePageMeta'

```

```

---

## 🔑 Environment Variables

**Backend (.env):**

```env
MONGO_URI=mongodb://localhost:27017/synchomes
PORT=5000
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@synchomes.com
ADMIN_PASSWORD=Admin123
```

**Frontend (.env):**

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📦 Scripts

**Backend:**

- `npm run dev` - Development server
- `npm start` - Production server
- `npm run seed` - Seed admin user

**Frontend:**

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview build

---

## 📞 Support

Open an issue with logs, steps to reproduce, and environment details when you need help.
