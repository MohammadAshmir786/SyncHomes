# SyncHomes Landing Page

A full-stack MERN application with a modern landing page and secure admin dashboard. Features include project management, client testimonials, contact forms, newsletter subscriptions, and real-time analytics.

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
- Credentials: admin@synchomes.com / admin123

---

## 🚀 Production Deployment

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide:**

- Backend on Render
- Frontend on Vercel/Netlify
- MongoDB Atlas setup
- Environment configuration

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
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── utils/       # Utilities
│   └── .env.example     # Environment template
│
├── server/              # Express backend
│   ├── controllers/     # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── .env.example     # Environment template
│
└── DEPLOYMENT.md        # Deployment guide
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
ADMIN_PASSWORD=admin123
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

For deployment help, see [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section.
