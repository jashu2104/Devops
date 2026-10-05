const app = require("./app");
const sequelize = require("./config/database");
require("dotenv").config();

const DEFAULT_PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("Connecting to PostgreSQL...");
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully.");

    // Synchronize Sequelize models with database (safe sync)
    await sequelize.sync();
    console.log("Database synchronized successfully.");

    const server = app.listen(DEFAULT_PORT, () => {
      console.log(`Server running on http://localhost:${DEFAULT_PORT}`);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        const FALLBACK_PORT = 5001;
        console.warn(`Port ${DEFAULT_PORT} is in use (e.g., AirPlay Receiver on macOS).`);
        console.warn(`Attempting fallback to port ${FALLBACK_PORT}...`);
        
        const fallbackServer = app.listen(FALLBACK_PORT, () => {
          console.log(`Server running on http://localhost:${FALLBACK_PORT}`);
        });

        fallbackServer.on("error", (fbErr) => {
          console.error("Failed to start server on fallback port:", fbErr.message);
          process.exit(1);
        });
      } else {
        console.error("Server startup error:", error.message);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error("Unable to connect to PostgreSQL:", error.message);
    console.error("PostgreSQL connection failed. Server could not start.");
    process.exit(1);
  }
};

startServer();
