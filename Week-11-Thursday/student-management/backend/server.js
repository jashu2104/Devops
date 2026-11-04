/**
 * Backend Server Entrypoint
 * Initializes database connection, starts listening on port 5000, and manages graceful shutdown.
 */

require('dotenv').config();
const app = require('./app');
const { initDatabase, testConnection, closePool } = require('./config/database');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '127.0.0.1';

let server;

async function startServer() {
  try {
    console.log('Connecting to PostgreSQL database...');
    const dbInfo = await testConnection();
    console.log(`Connected to database '${dbInfo.current_database}' as user '${dbInfo.current_user}'.`);

    console.log('Ensuring database schema exists...');
    await initDatabase();
    console.log('Database schema verified.');

    server = app.listen(PORT, HOST, () => {
      console.log(`Student Management Server running at http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

// Graceful shutdown handling
async function shutdown(signal) {
  console.log(`\nReceived ${signal}. Starting graceful shutdown...`);
  if (server) {
    server.close(async () => {
      console.log('HTTP server closed.');
      try {
        await closePool();
        console.log('Database connection pool closed.');
        process.exit(0);
      } catch (err) {
        console.error('Error during database pool shutdown:', err.message);
        process.exit(1);
      }
    });
  } else {
    process.exit(0);
  }
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

startServer();
