const app = require('./app');
const { initDb, closePool } = require('./config/database');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

let server;

async function startServer() {
  try {
    // Initialize database schema
    await initDb();
    console.log('Database initialized successfully.');

    server = app.listen(PORT, HOST, () => {
      console.log(`Student Management API server running at http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

// Graceful shutdown
const shutdown = async () => {
  console.log('\nShutting down gracefully...');
  if (server) {
    server.close(async () => {
      console.log('HTTP server closed.');
      await closePool();
      console.log('Database connection pool closed.');
      process.exit(0);
    });
  } else {
    await closePool();
    process.exit(0);
  }
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

startServer();
