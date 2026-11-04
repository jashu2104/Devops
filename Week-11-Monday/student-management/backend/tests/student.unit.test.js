const request = require('supertest');

// Mock StudentModel to isolate unit tests from any real database
jest.mock('../models/studentModel');
const StudentModel = require('../models/studentModel');
const app = require('../app');

describe('Student Backend Unit Tests (Isolated with Mocks)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Health Check Endpoint', () => {
    it('should return 200 and health message', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Student API is running');
    });
  });

  describe('Student Registration Validation (POST /api/students)', () => {
    it('1. should register a valid student successfully', async () => {
      const mockCreated = { id: 1, name: 'Rahul', rollNo: 'CSE101', branch: 'CSE' };
      StudentModel.getByRollNo.mockResolvedValue(null);
      StudentModel.create.mockResolvedValue(mockCreated);

      const res = await request(app)
        .post('/api/students')
        .send({ name: 'Rahul', rollNo: 'CSE101', branch: 'CSE' });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Rahul');
      expect(res.body.data.rollNo).toBe('CSE101');
      expect(StudentModel.create).toHaveBeenCalledWith({
        name: 'Rahul',
        rollNo: 'CSE101',
        branch: 'CSE'
      });
    });

    it('2. should reject student registration when name is missing', async () => {
      const res = await request(app)
        .post('/api/students')
        .send({ rollNo: 'CSE101', branch: 'CSE' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('required');
      expect(StudentModel.create).not.toHaveBeenCalled();
    });

    it('3. should reject student registration when roll number is missing', async () => {
      const res = await request(app)
        .post('/api/students')
        .send({ name: 'Rahul', branch: 'CSE' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('required');
      expect(StudentModel.create).not.toHaveBeenCalled();
    });

    it('4. should reject student registration when branch is missing', async () => {
      const res = await request(app)
        .post('/api/students')
        .send({ name: 'Rahul', rollNo: 'CSE101' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('required');
      expect(StudentModel.create).not.toHaveBeenCalled();
    });

    it('5. should reject student registration with empty or whitespace-only fields', async () => {
      const res = await request(app)
        .post('/api/students')
        .send({ name: '   ', rollNo: '   ', branch: '   ' });

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('required and cannot be empty');
      expect(StudentModel.create).not.toHaveBeenCalled();
    });

    it('6. should reject student registration when roll number already exists (409)', async () => {
      StudentModel.getByRollNo.mockResolvedValue({ id: 2, rollNo: 'CSE101' });

      const res = await request(app)
        .post('/api/students')
        .send({ name: 'Anil', rollNo: 'CSE101', branch: 'ECE' });

      expect(res.statusCode).toBe(409);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('already exists');
      expect(StudentModel.create).not.toHaveBeenCalled();
    });
  });

  describe('Student Retrieval & ID Validation (GET /api/students/:id)', () => {
    it('should reject invalid non-numeric student ID', async () => {
      const res = await request(app).get('/api/students/abc');
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('positive integer');
    });

    it('should reject non-positive student ID (0 or negative)', async () => {
      const res = await request(app).get('/api/students/-5');
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('positive integer');
    });

    it('should return 404 when student does not exist', async () => {
      StudentModel.getById.mockResolvedValue(null);
      const res = await request(app).get('/api/students/999');
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Student not found');
    });

    it('should return 200 with student data when student exists', async () => {
      const mockStudent = { id: 10, name: 'Priya', rollNo: 'ECE201', branch: 'ECE' };
      StudentModel.getById.mockResolvedValue(mockStudent);

      const res = await request(app).get('/api/students/10');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Priya');
    });
  });

  describe('Student Update Validation (PUT /api/students/:id)', () => {
    it('should reject update with invalid ID', async () => {
      const res = await request(app)
        .put('/api/students/xyz')
        .send({ name: 'Updated', rollNo: 'CSE999', branch: 'CSE' });
      expect(res.statusCode).toBe(400);
    });

    it('should return 404 when updating non-existent student', async () => {
      StudentModel.getById.mockResolvedValue(null);
      const res = await request(app)
        .put('/api/students/999')
        .send({ name: 'Updated', rollNo: 'CSE999', branch: 'CSE' });
      expect(res.statusCode).toBe(404);
    });

    it('should reject update with missing fields', async () => {
      StudentModel.getById.mockResolvedValue({ id: 1, name: 'Rahul', rollNo: 'CSE101', branch: 'CSE' });
      const res = await request(app)
        .put('/api/students/1')
        .send({ name: '', rollNo: 'CSE101', branch: 'CSE' });
      expect(res.statusCode).toBe(400);
    });

    it('should reject update if new roll number belongs to another student (409)', async () => {
      StudentModel.getById.mockResolvedValue({ id: 1, name: 'Rahul', rollNo: 'CSE101', branch: 'CSE' });
      StudentModel.getByRollNo.mockResolvedValue({ id: 2, rollNo: 'CSE102' }); // conflicting student

      const res = await request(app)
        .put('/api/students/1')
        .send({ name: 'Rahul', rollNo: 'CSE102', branch: 'CSE' });

      expect(res.statusCode).toBe(409);
      expect(res.body.message).toContain('already exists');
    });

    it('should update successfully when valid data is provided', async () => {
      StudentModel.getById.mockResolvedValue({ id: 1, name: 'Rahul', rollNo: 'CSE101', branch: 'CSE' });
      StudentModel.getByRollNo.mockResolvedValue(null);
      StudentModel.update.mockResolvedValue({ id: 1, name: 'Rahul Reddy', rollNo: 'CSE101', branch: 'AIML' });

      const res = await request(app)
        .put('/api/students/1')
        .send({ name: 'Rahul Reddy', rollNo: 'CSE101', branch: 'AIML' });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Rahul Reddy');
      expect(res.body.data.branch).toBe('AIML');
    });
  });

  describe('Student Deletion (DELETE /api/students/:id)', () => {
    it('should reject delete with invalid ID', async () => {
      const res = await request(app).delete('/api/students/invalid');
      expect(res.statusCode).toBe(400);
    });

    it('should return 404 when deleting non-existent student', async () => {
      StudentModel.getById.mockResolvedValue(null);
      const res = await request(app).delete('/api/students/999');
      expect(res.statusCode).toBe(404);
    });

    it('should return 200 when deleting existing student', async () => {
      const mockStudent = { id: 1, name: 'Rahul', rollNo: 'CSE101', branch: 'CSE' };
      StudentModel.getById.mockResolvedValue(mockStudent);
      StudentModel.delete.mockResolvedValue(mockStudent);

      const res = await request(app).delete('/api/students/1');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toContain('deleted successfully');
    });
  });
});
