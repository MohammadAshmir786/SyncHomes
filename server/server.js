import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
// Routes
import projectRoutes from "./routes/projectRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import connectDB from "./config/db.js";

config();

const app = express();
const requestBodyLimit = process.env.REQUEST_BODY_LIMIT || "2mb";

app.use(express.json({ limit: requestBodyLimit }));
app.use(express.urlencoded({ extended: true, limit: requestBodyLimit }));

// CORS Configuration for production
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend for development
      "http://localhost:3000", // local backend testing
      "https://sync-homes.vercel.app", // MAIN FRONTEND - deployed on Vercel
      "https://sync-homes.onrender.com", // Render backend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // allows cookies or auth headers
  })
);

app.use(cookieParser()); // Parse cookies

// Health check endpoint for deployment
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/admin", adminRoutes);

// 404 Handler - Must be after all routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableRoutes: [
      "GET /api/health",
      "GET /api/projects",
      "GET /api/clients",
      "POST /api/contacts",
      "POST /api/subscribers",
      "POST /api/admin/login",
    ],
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);

  if (err.type === "entity.too.large") {
    return res.status(413).json({
      error: "Payload too large",
      message: `Request body exceeds the ${requestBodyLimit} limit`,
    });
  }

  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Listen on all network interfaces (0.0.0.0) for Docker/Render compatibility
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
