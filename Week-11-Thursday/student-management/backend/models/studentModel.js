/**
 * Student Model: PostgreSQL Data Access Layer
 * Handles all database operations for students.
 */

const { pool } = require('../config/database');

/**
 * Fetch all students ordered by ID ascending.
 */
async function getAllStudents() {
  const query = `
    SELECT id, name, roll_no AS "rollNo", branch
    FROM students
    ORDER BY id ASC;
  `;
  const result = await pool.query(query);
  return result.rows;
}

/**
 * Fetch a single student by numeric ID.
 */
async function getStudentById(id) {
  const query = `
    SELECT id, name, roll_no AS "rollNo", branch
    FROM students
    WHERE id = $1;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}

/**
 * Find student by roll number (case-insensitive).
 */
async function getStudentByRollNo(rollNo) {
  const query = `
    SELECT id, name, roll_no AS "rollNo", branch
    FROM students
    WHERE LOWER(roll_no) = LOWER($1);
  `;
  const result = await pool.query(query, [rollNo]);
  return result.rows[0] || null;
}

/**
 * Insert a new student record into the database.
 */
async function createStudent({ name, rollNo, branch }) {
  const query = `
    INSERT INTO students (name, roll_no, branch)
    VALUES ($1, $2, $3)
    RETURNING id, name, roll_no AS "rollNo", branch;
  `;
  const result = await pool.query(query, [name, rollNo, branch]);
  return result.rows[0];
}

/**
 * Update an existing student record by ID.
 */
async function updateStudent(id, { name, rollNo, branch }) {
  const query = `
    UPDATE students
    SET name = $1, roll_no = $2, branch = $3
    WHERE id = $4
    RETURNING id, name, roll_no AS "rollNo", branch;
  `;
  const result = await pool.query(query, [name, rollNo, branch, id]);
  return result.rows[0] || null;
}

/**
 * Delete a student record by ID.
 */
async function deleteStudent(id) {
  const query = `
    DELETE FROM students
    WHERE id = $1
    RETURNING id, name, roll_no AS "rollNo", branch;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}

/**
 * Clear all records and reset the sequence (used in test suite teardown/setup).
 */
async function clearAllStudents() {
  await pool.query('TRUNCATE TABLE students RESTART IDENTITY CASCADE;');
}

module.exports = {
  getAllStudents,
  getStudentById,
  getStudentByRollNo,
  createStudent,
  updateStudent,
  deleteStudent,
  clearAllStudents
};
