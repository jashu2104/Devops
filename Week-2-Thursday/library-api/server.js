const express = require("express");

const app = express();

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Import book routes module
const bookRoutes = require("./routes/books");

// Mount book routes under /books endpoint
app.use("/books", bookRoutes);

// Root route for API welcome and general status check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Library Book Management System REST API",
        endpoint: "http://localhost:5000/books"
    });
});

// Handle 404 Not Found for non-existing routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not found"
    });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
