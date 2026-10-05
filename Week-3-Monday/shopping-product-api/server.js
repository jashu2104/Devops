require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Shopping Product API running on http://localhost:${PORT}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.warn(`Port ${PORT} is in use (e.g. macOS AirPlay Receiver). Starting on port 5001 instead...`);
    const ALT_PORT = 5001;
    app.listen(ALT_PORT, () => {
      console.log(`Shopping Product API running on http://localhost:${ALT_PORT}`);
    });
  } else {
    console.error("Server error:", err);
  }
});
