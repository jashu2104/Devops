const db = require('../config/database');

/**
 * Student Model: handles persistent database queries
 */
const StudentModel = {
  /**
   * Retrieve all students
   */
  async getAll() {
    const query = `
      SELECT id, name, roll_no AS "rollNo", branch
      FROM students
      ORDER BY id ASC;
    `;
    const result = await db.query(query);
    return result.rows;
  },

  /**
   * Retrieve a single student by ID
   */
  async getById(id) {
    const query = `
      SELECT id, name, roll_no AS "rollNo", branch
      FROM students
      WHERE id = $1;
    `;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  },

  /**
   * Check for duplicate roll number, optionally excluding a specific student ID
   */
  async getByRollNo(rollNo, excludeId = null) {
    let query = `
      SELECT id, name, roll_no AS "rollNo", branch
      FROM students
      WHERE LOWER(TRIM(roll_no)) = LOWER(TRIM($1))
    `;
    const params = [rollNo];

    if (excludeId !== null) {
      query += ` AND id != $2`;
      params.push(excludeId);
    }

    const result = await db.query(query, params);
    return result.rows[0] || null;
  },

  /**
   * Register a new student
   */
  async create({ name, rollNo, branch }) {
    const query = `
      INSERT INTO students (name, roll_no, branch)
      VALUES ($1, $2, $3)
      RETURNING id, name, roll_no AS "rollNo", branch;
    `;
    const result = await db.query(query, [name, rollNo, branch]);
    return result.rows[0];
  },

  /**
   * Update an existing student
   */
  async update(id, { name, rollNo, branch }) {
    const query = `
      UPDATE students
      SET name = $1, roll_no = $2, branch = $3
      WHERE id = $4
      RETURNING id, name, roll_no AS "rollNo", branch;
    `;
    const result = await db.query(query, [name, rollNo, branch, id]);
    return result.rows[0] || null;
  },

  /**
   * Delete a student by ID
   */
  async delete(id) {
    const query = `
      DELETE FROM students
      WHERE id = $1
      RETURNING id, name, roll_no AS "rollNo", branch;
    `;
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  },

  /**
   * Clear all records (used for test isolation)
   */
  async clear() {
    await db.query('DELETE FROM students;');
  }
};

module.exports = StudentModel;
