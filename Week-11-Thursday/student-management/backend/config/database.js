/**
 * Database Configuration & Connection Pool Management
 * Supports PostgreSQL connection pooling, table initialization, and graceful shutdown.
 */

require('dotenv').config();
const { Pool } = require('pg');

const isTestEnv = process.env.NODE_ENV === 'test';

const connectionString = isTestEnv
  ? process.env.TEST_DATABASE_URL || 'postgresql://localhost:5432/student_management_test'
  : process.env.DATABASE_URL || 'postgresql://localhost:5432/student_management';

const pool = new Pool({
  connectionString,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err);
});

/**
 * Initialize database schema if not already created.
 */
async function initDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      roll_no VARCHAR(30) UNIQUE NOT NULL,
      branch VARCHAR(50) NOT NULL
    );
  `;
  try {
    const client = await pool.connect();
    try {
      await client.query(createTableQuery);
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Failed to initialize database schema:', err.message);
    throw err;
  }
}

/**
 * Test connectivity to the database.
 */
async function testConnection() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT current_database(), current_user;');
    return res.rows[0];
  } finally {
    client.release();
  }
}

/**
 * Close database pool connections (used in tests and graceful shutdown).
 */
async function closePool() {
  await pool.end();
}

module.exports = {
  pool,
  initDatabase,
  testConnection,
  closePool,
  connectionString
};
