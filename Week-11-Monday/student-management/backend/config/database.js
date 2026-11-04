const { Pool } = require('pg');
require('dotenv').config();

const isTest = process.env.NODE_ENV === 'test';

const connectionString = isTest
  ? process.env.TEST_DATABASE_URL || 'postgresql://postgres@localhost:5432/student_management_test'
  : process.env.DATABASE_URL || 'postgresql://postgres@localhost:5432/student_management';

const pool = new Pool({
  connectionString,
  // Automatically handle SSL if URL contains sslmode=require
  ssl: connectionString.includes('sslmode=require') ? { rejectUnauthorized: false } : false
});

/**
 * Helper to execute SQL queries
 */
const query = (text, params) => pool.query(text, params);

/**
 * Initialize database schema
 */
const initDb = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      roll_no VARCHAR(30) UNIQUE NOT NULL,
      branch VARCHAR(50) NOT NULL
    );
  `;
  await pool.query(createTableQuery);
};

/**
 * Gracefully close the database pool
 */
const closePool = async () => {
  await pool.end();
};

module.exports = {
  pool,
  query,
  initDb,
  closePool
};
