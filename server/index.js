const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectMongo = require("./db/mongodb");

const assignmentRoutes = require("./routes/assignments");
const executeQueryRoutes = require("./routes/executeQuery");
const trackerRoutes = require("./routes/tracker");

const app = express();

// =========================
// CORS
// =========================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sql-sandbox-plum.vercel.app",
    ],
    credentials: true,
  })
);

// =========================
// Middleware
// =========================
app.use(express.json());

// =========================
// Database Connection
// =========================
connectMongo();

// =========================
// Health Route
// =========================
app.get("/", async (req, res) => {
  res.json({
    status: 200,
    message: "SQL Sandbox Server Running",
  });
});

// =========================
// API Routes
// =========================
app.use("/api/assignments", assignmentRoutes);
app.use("/api/execute-query", executeQueryRoutes);
app.use("/api/tracker", trackerRoutes);

// =========================
// PORT
// =========================
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});