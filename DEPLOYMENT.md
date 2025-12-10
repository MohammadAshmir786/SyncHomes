# SyncHomes Deployment Guide

## 🚀 Backend Deployment (Render)

### Step 1: Prepare Your Repository

1. Push your code to GitHub
2. Make sure `.env` is in `.gitignore`

### Step 2: Create MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with password
4. Whitelist all IP addresses (0.0.0.0/0) for Render
5. Get your connection string: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/synchomes?retryWrites=true&w=majority`

### Step 3: Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:

   - **Name**: `synchomes-backend` (or any name)
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free

5. Add Environment Variables (click "Advanced" → "Add Environment Variable"):

   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/synchomes?retryWrites=true&w=majority
   PORT=10000
   NODE_ENV=production
   JWT_SECRET=your-super-secure-random-secret-here-change-this
   CLIENT_URL=https://your-frontend-app.vercel.app
   ADMIN_EMAIL=admin@synchomes.com
   ADMIN_PASSWORD=your-secure-admin-password
   ```

6. Click "Create Web Service"
7. Wait for deployment (takes 3-5 minutes)
8. Copy your backend URL: `https://your-backend-app.onrender.com`

### Step 4: Seed Admin User (Optional)

After deployment, you can run the seed script:

1. Go to Render Dashboard → Your Service → "Shell" tab
2. Run: `npm run seed`

---

## 🌐 Frontend Deployment (Vercel/Netlify)

### Option A: Deploy on Vercel (Recommended)

#### Step 1: Install Vercel CLI (Optional)

```bash
npm install -g vercel
```

#### Step 2: Deploy via Vercel Website

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure the project:

   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

5. Add Environment Variable:

   - Click "Environment Variables"
   - Add: `VITE_API_URL` = `https://your-backend-app.onrender.com/api`

6. Click "Deploy"
7. Wait for deployment (takes 1-2 minutes)
8. Copy your frontend URL: `https://your-frontend-app.vercel.app`

#### Step 3: Update Backend CORS

1. Go back to Render Dashboard
2. Update `CLIENT_URL` environment variable with your Vercel URL
3. Service will auto-redeploy

---

### Option B: Deploy on Netlify

#### Step 1: Deploy via Netlify Website

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure the project:

   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`

5. Add Environment Variable:

   - Go to "Site settings" → "Environment variables"
   - Add: `VITE_API_URL` = `https://your-backend-app.onrender.com/api`

6. Click "Deploy site"
7. Wait for deployment
8. Copy your frontend URL: `https://your-site-name.netlify.app`

#### Step 2: Update Backend CORS

1. Go back to Render Dashboard
2. Update `CLIENT_URL` environment variable with your Netlify URL

---

## 🔧 Post-Deployment Checklist

### Backend (Render)

- ✅ Service is running (check "Events" tab)
- ✅ MongoDB connection successful (check "Logs" tab)
- ✅ Environment variables set correctly
- ✅ Health check endpoint works: `https://your-backend-app.onrender.com/api/health`
- ✅ Admin user seeded (run `npm run seed` in Shell if needed)

### Frontend (Vercel/Netlify)

- ✅ Site is live and accessible
- ✅ Environment variable `VITE_API_URL` is set
- ✅ Can load homepage without errors
- ✅ Can submit contact form
- ✅ Can subscribe to newsletter
- ✅ Admin login works at `/admin/login`
- ✅ Admin dashboard accessible at `/admin/dashboard`

### CORS Configuration

- ✅ Backend `CLIENT_URL` matches frontend URL
- ✅ Can make API requests from frontend
- ✅ Cookies work correctly for admin authentication

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Failed:**

- Check if IP whitelist includes `0.0.0.0/0` in MongoDB Atlas
- Verify connection string format is correct
- Check MongoDB cluster is running

**CORS Errors:**

- Make sure `CLIENT_URL` in Render matches your frontend URL exactly
- Check frontend is using HTTPS (not HTTP)
- Verify credentials are enabled in axios requests

**Images Not Loading:**

- Uploads folder might not persist on Render (consider using cloud storage like Cloudinary or AWS S3 for production)

### Frontend Issues

**API Requests Failing:**

- Check `VITE_API_URL` environment variable is set correctly
- Verify backend is running (check Render logs)
- Check browser console for CORS errors

**Admin Login Not Working:**

- Make sure you've run the seed script on backend
- Check JWT_SECRET is set in backend environment variables
- Verify cookies are enabled in browser

**Build Fails:**

- Check all dependencies are in `package.json`
- Verify Node.js version compatibility
- Check for TypeScript errors locally before deploying

---

## 📝 Environment Variables Summary

### Backend (.env on Render)

```env
MONGO_URI=mongodb+srv://...
PORT=10000
NODE_ENV=production
JWT_SECRET=your-secret-key
CLIENT_URL=https://your-frontend-app.vercel.app
ADMIN_EMAIL=admin@synchomes.com
ADMIN_PASSWORD=your-password
```

### Frontend (.env on Vercel/Netlify)

```env
VITE_API_URL=https://your-backend-app.onrender.com/api
```

---

## 🔄 Continuous Deployment

Both Render and Vercel/Netlify support automatic deployments:

- **Push to `main` branch** → Automatic deployment
- **Pull Request** → Preview deployment (Vercel/Netlify)

---

## 📞 Support

If you encounter issues:

1. Check Render logs for backend errors
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Test API endpoints directly using Postman or browser

---

## 🎉 Your App is Live!

**Frontend**: https://your-frontend-app.vercel.app  
**Backend**: https://your-backend-app.onrender.com  
**Admin Panel**: https://your-frontend-app.vercel.app/admin/login

**Default Admin Credentials:**

- Email: admin@synchomes.com
- Password: (as set in ADMIN_PASSWORD env variable)

**⚠️ IMPORTANT:** Change the default admin password after first login!
