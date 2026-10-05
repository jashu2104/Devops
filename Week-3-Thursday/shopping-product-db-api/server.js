require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/database");
require("./models/Product");

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        console.log("Connecting to PostgreSQL...");
        
        // Step 1: Authenticate DB Connection
        await sequelize.authenticate();
        console.log("PostgreSQL connected successfully.");

        // Step 2: Synchronize Models with Database
        await sequelize.sync();
        console.log("Product table synchronized successfully.");

        // Step 3: Start Express Server
        const server = app.listen(PORT, "127.0.0.1", () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

        server.on("error", (err) => {
            console.error(`Failed to start server on port ${PORT}:`, err.message);
            process.exit(1);
        });
    } catch (error) {
        console.error("PostgreSQL connection failed.");
        console.error("Unable to start the application.");
        console.error("Error detail:", error.message);
        process.exit(1);
    }
}

startServer();
