require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// CORS configuration
app.use(cors({
    origin: [
        "http://localhost:5173",  // Vite default
        "http://localhost:3000",
        process.env.FRONTEND_URL
    ].filter(Boolean),
    methods: ["GET", "POST"],
    credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Rate limiting for AI endpoints
const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 AI requests per 15 min window
    message: {
        error: "Too many trip generation requests",
        details: "Please try again after 15 minutes"
    }
});

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "trip-planner-ai-backend" });
});

// AI routes with rate limiting
app.use("/api", aiLimiter, aiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("[Server Error]", err.stack);
    res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Trip Planner Backend running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});
