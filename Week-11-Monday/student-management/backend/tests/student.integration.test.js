const request = require('supertest');
const app = require('../app');
const { initDb, closePool, query } = require('../config/database');
const StudentModel = require('../models/studentModel');

describe('Student REST API & PostgreSQL Integration Tests', () => {
  let createdStudentId;

  beforeAll(async () => {
    // Ensure test database schema exists
    await initDb();
    // Clean up any residual test records
    await StudentModel.clear();
  });

  afterAll(async () => {
    // Clean up test records and close database pool
    await StudentModel.clear();
    await closePool();
  });

  // TEST CASE 1: Register Student
  describe('Test Case 1: Register Student (POST /api/students)', () => {
    it('should successfully create a new student and persist in PostgreSQL', async () => {
      const student = {
        name: 'Rahul',
        rollNo: 'CSE101',
        branch: 'CSE'
      };

      const response = await request(app)
        .post('/api/students')
        .send(student);

      expect(response.statusCode).toBe(201);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBeDefined();
      expect(response.body.data.name).toBe('Rahul');
      expect(response.body.data.rollNo).toBe('CSE101');
      expect(response.body.data.branch).toBe('CSE');

      createdStudentId = response.body.data.id;

      // Verify direct PostgreSQL persistence
      const dbCheck = await query('SELECT * FROM students WHERE id = $1', [createdStudentId]);
      expect(dbCheck.rows.length).toBe(1);
      expect(dbCheck.rows[0].roll_no).toBe('CSE101');
    });
  });

  // TEST CASE 2: Retrieve Student
  describe('Test Case 2: Retrieve Students (GET /api/students & GET /api/students/:id)', () => {
    it('should retrieve all students and confirm registered student exists', async () => {
      const response = await request(app).get('/api/students');

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(
        response.body.data.some(
          student => student.rollNo === 'CSE101'
        )
      ).toBe(true);
    });

    it('should retrieve student details by ID', async () => {
      const response = await request(app).get(`/api/students/${createdStudentId}`);

      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/json/);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(createdStudentId);
      expect(response.body.data.rollNo).toBe('CSE101');
      expect(response.body.data.name).toBe('Rahul');
    });
  });

  // TEST CASE 3: Update Student
  describe('Test Case 3: Update Student (PUT /api/students/:id)', () => {
    it('should update the registered student record in database', async () => {
      const updateData = {
        name: 'Rahul Reddy',
        rollNo: 'CSE101',
        branch: 'AIML'
      };

      const response = await request(app)
        .put(`/api/students/${createdStudentId}`)
        .send(updateData);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Rahul Reddy');
      expect(response.body.data.branch).toBe('AIML');

      // Verify subsequent GET returns updated database record
      const getResponse = await request(app).get(`/api/students/${createdStudentId}`);
      expect(getResponse.statusCode).toBe(200);
      expect(getResponse.body.data.name).toBe('Rahul Reddy');
      expect(getResponse.body.data.branch).toBe('AIML');
    });
  });

  // TEST CASE 4: Delete Student
  describe('Test Case 4: Delete Student (DELETE /api/students/:id)', () => {
    it('should delete the student from database and return success message', async () => {
      const response = await request(app)
        .delete(`/api/students/${createdStudentId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('deleted successfully');

      // Verify record is removed from PostgreSQL table
      const dbCheck = await query('SELECT * FROM students WHERE id = $1', [createdStudentId]);
      expect(dbCheck.rows.length).toBe(0);
    });
  });

  // TEST CASE 5: Verify Deleted Student Cannot Be Retrieved
  describe('Test Case 5: Verify Deleted Student (GET /api/students/:id -> 404)', () => {
    it('should return 404 Not Found for deleted student', async () => {
      const response = await request(app).get(`/api/students/${createdStudentId}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Student not found');
    });
  });

  // TEST CASE 6: Reject Invalid Student Data
  describe('Test Case 6: Reject Invalid Student Data', () => {
    it('should reject registration with empty strings (400)', async () => {
      const invalidStudent = {
        name: '',
        rollNo: '',
        branch: ''
      };

      const response = await request(app)
        .post('/api/students')
        .send(invalidStudent);

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should reject duplicate roll numbers (409 Conflict)', async () => {
      // First create a student
      await request(app)
        .post('/api/students')
        .send({ name: 'Sneha', rollNo: 'ECE301', branch: 'ECE' });

      // Attempt creating another student with the identical roll number
      const duplicateResponse = await request(app)
        .post('/api/students')
        .send({ name: 'Vikram', rollNo: 'ECE301', branch: 'ECE' });

      expect(duplicateResponse.statusCode).toBe(409);
      expect(duplicateResponse.body.success).toBe(false);
      expect(duplicateResponse.body.message).toContain('already exists');
    });

    it('should reject invalid non-numeric student ID (400)', async () => {
      const response = await request(app).get('/api/students/abc');
      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  // TEST CASE 7: Database Persistence Verification
  describe('Test Case 7: Database Persistence Verification', () => {
    it('should persist student record in PostgreSQL across independent API calls', async () => {
      const persistentStudent = {
        name: 'Kavya',
        rollNo: 'MECH401',
        branch: 'MECH'
      };

      // 1. POST request creates the record
      const postResponse = await request(app)
        .post('/api/students')
        .send(persistentStudent);

      expect(postResponse.statusCode).toBe(201);
      const newId = postResponse.body.data.id;

      // 2. Query direct DB layer to confirm committed persistence
      const directDbResult = await query('SELECT * FROM students WHERE id = $1', [newId]);
      expect(directDbResult.rows.length).toBe(1);
      expect(directDbResult.rows[0].name).toBe('Kavya');
      expect(directDbResult.rows[0].roll_no).toBe('MECH401');

      // 3. Independent GET request returns the identical persisted data
      const getResponse = await request(app).get(`/api/students/${newId}`);
      expect(getResponse.statusCode).toBe(200);
      expect(getResponse.body.data.id).toBe(newId);
      expect(getResponse.body.data.name).toBe('Kavya');
      expect(getResponse.body.data.rollNo).toBe('MECH401');
      expect(getResponse.body.data.branch).toBe('MECH');
    });
  });
});
