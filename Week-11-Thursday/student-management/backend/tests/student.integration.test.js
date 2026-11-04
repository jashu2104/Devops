/**
 * Integration Test Suite for College Student Management System
 * Uses Jest and Supertest to verify:
 * REST API -> Express Routes -> Controller -> Database Layer -> PostgreSQL Test Database
 */

process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const { initDatabase, closePool, pool } = require('../config/database');
const { clearAllStudents } = require('../models/studentModel');

describe('Student Management System - Integration Testing', () => {
  let createdStudentId;

  beforeAll(async () => {
    // Ensure test database schema exists and table is cleared
    await initDatabase();
    await clearAllStudents();
  });

  afterAll(async () => {
    // Clean up test records and release PostgreSQL connection pool
    await clearAllStudents();
    await closePool();
  });

  describe('Health Check API', () => {
    test('GET /api/health should return running status', async () => {
      const response = await request(app).get('/api/health');
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Student API is running');
    });
  });

  describe('Mandatory Test Cases', () => {
    // Test Case 1: Register Student
    test('Test Case 1: POST /api/students should register a new student with status 201', async () => {
      const student = {
        name: 'Rahul',
        rollNo: 'CSE101',
        branch: 'CSE'
      };

      const response = await request(app)
        .post('/api/students')
        .send(student);

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Rahul');
      expect(response.body.data.rollNo).toBe('CSE101');
      expect(response.body.data.branch).toBe('CSE');
      expect(response.body.data.id).toBeDefined();

      createdStudentId = response.body.data.id;
    });

    // Test Case 2: Retrieve Student
    test('Test Case 2: GET /api/students & GET /api/students/:id should retrieve registered student', async () => {
      // 1. Retrieve all students
      const listResponse = await request(app).get('/api/students');

      expect(listResponse.statusCode).toBe(200);
      expect(listResponse.headers['content-type']).toMatch(/json/);
      expect(Array.isArray(listResponse.body.data)).toBe(true);
      expect(
        listResponse.body.data.some((student) => student.rollNo === 'CSE101')
      ).toBe(true);

      // 2. Retrieve student by ID
      const singleResponse = await request(app).get(`/api/students/${createdStudentId}`);
      expect(singleResponse.statusCode).toBe(200);
      expect(singleResponse.body.success).toBe(true);
      expect(singleResponse.body.data.id).toBe(createdStudentId);
      expect(singleResponse.body.data.rollNo).toBe('CSE101');
    });

    // Test Case 3: Update Student
    test('Test Case 3: PUT /api/students/:id should update registered student and reflect in DB', async () => {
      const updatePayload = {
        name: 'Rahul Reddy',
        rollNo: 'CSE101',
        branch: 'AIML'
      };

      const updateResponse = await request(app)
        .put(`/api/students/${createdStudentId}`)
        .send(updatePayload);

      expect(updateResponse.statusCode).toBe(200);
      expect(updateResponse.body.success).toBe(true);
      expect(updateResponse.body.data.name).toBe('Rahul Reddy');
      expect(updateResponse.body.data.branch).toBe('AIML');

      // Verify subsequent GET returns the updated database record
      const verifyResponse = await request(app).get(`/api/students/${createdStudentId}`);
      expect(verifyResponse.statusCode).toBe(200);
      expect(verifyResponse.body.data.name).toBe('Rahul Reddy');
      expect(verifyResponse.body.data.branch).toBe('AIML');
    });

    // Test Case 4: Delete Student
    test('Test Case 4: DELETE /api/students/:id should delete student from database', async () => {
      const deleteResponse = await request(app).delete(`/api/students/${createdStudentId}`);

      expect(deleteResponse.statusCode).toBe(200);
      expect(deleteResponse.body.success).toBe(true);
      expect(deleteResponse.body.message).toContain('deleted successfully');
    });

    // Test Case 5: Verify Deleted Student Cannot Be Retrieved
    test('Test Case 5: GET /api/students/:id should return 404 for deleted student', async () => {
      const response = await request(app).get(`/api/students/${createdStudentId}`);
      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
    });

    // Test Case 6: Reject Invalid Student Data & Duplicate Roll Numbers
    test('Test Case 6: Reject invalid student data (empty fields, duplicates, invalid ID)', async () => {
      // 1. Reject empty fields
      const emptyPayloadResponse = await request(app)
        .post('/api/students')
        .send({
          name: '',
          rollNo: '',
          branch: ''
        });
      expect(emptyPayloadResponse.statusCode).toBe(400);
      expect(emptyPayloadResponse.body.success).toBe(false);

      // 2. Register a student to test duplicate rejection
      const initial = await request(app)
        .post('/api/students')
        .send({ name: 'Priya', rollNo: 'ECE201', branch: 'ECE' });
      expect(initial.statusCode).toBe(201);
      const priyaId = initial.body.data.id;

      // Duplicate roll number in POST
      const duplicatePost = await request(app)
        .post('/api/students')
        .send({ name: 'Priya Copy', rollNo: 'ECE201', branch: 'ECE' });
      expect(duplicatePost.statusCode).toBe(409);
      expect(duplicatePost.body.success).toBe(false);

      // Duplicate roll number in PUT
      const anotherStudent = await request(app)
        .post('/api/students')
        .send({ name: 'Sneha', rollNo: 'IT301', branch: 'IT' });
      expect(anotherStudent.statusCode).toBe(201);

      const duplicatePut = await request(app)
        .put(`/api/students/${anotherStudent.body.data.id}`)
        .send({ name: 'Sneha Renamed', rollNo: 'ECE201', branch: 'IT' });
      expect(duplicatePut.statusCode).toBe(409);

      // 3. Reject invalid non-numeric student ID
      const invalidIdResponse = await request(app).get('/api/students/abc');
      expect(invalidIdResponse.statusCode).toBe(400);

      // 4. Reject negative student ID
      const negativeIdResponse = await request(app).get('/api/students/-99');
      expect(negativeIdResponse.statusCode).toBe(400);

      // Clean up extra students created in this test
      await request(app).delete(`/api/students/${priyaId}`);
      await request(app).delete(`/api/students/${anotherStudent.body.data.id}`);
    });

    // Test Case 7: Database Persistence
    test('Test Case 7: Direct Database Persistence verification', async () => {
      // Create student through POST
      const postResponse = await request(app)
        .post('/api/students')
        .send({
          name: 'Vikas',
          rollNo: 'MECH501',
          branch: 'MECH'
        });
      expect(postResponse.statusCode).toBe(201);
      const vikasId = postResponse.body.data.id;

      // Retrieve via GET endpoint
      const getResponse = await request(app).get(`/api/students/${vikasId}`);
      expect(getResponse.statusCode).toBe(200);
      expect(getResponse.body.data.name).toBe('Vikas');

      // Verify persistent record directly in PostgreSQL database table
      const dbResult = await pool.query('SELECT * FROM students WHERE id = $1', [vikasId]);
      expect(dbResult.rows.length).toBe(1);
      expect(dbResult.rows[0].name).toBe('Vikas');
      expect(dbResult.rows[0].roll_no).toBe('MECH501');
      expect(dbResult.rows[0].branch).toBe('MECH');

      // Clean up
      await pool.query('DELETE FROM students WHERE id = $1', [vikasId]);
    });
  });
});
