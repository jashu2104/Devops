const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get("/api/health", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Shopping Product API is running",
        database: "PostgreSQL"
    });
});

// Mount Product Routes
app.use("/api/products", productRoutes);

// Handle Undefined Routes (404)
app.use((req, res, next) => {
    return res.status(404).json({
        success: false,
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

module.exports = app;
