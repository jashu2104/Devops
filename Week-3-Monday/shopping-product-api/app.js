const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Shopping Product API is running"
  });
});

// Product API routes
app.use("/api/products", productRoutes);

// Centralized Error Handler Middleware (must be registered last)
app.use(errorHandler);

module.exports = app;
