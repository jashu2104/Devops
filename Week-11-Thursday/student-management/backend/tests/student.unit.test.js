/**
 * Unit Tests for Student Management Validation & Controller Logic
 * Tests validation functions and controller error responses in isolation from the real database.
 */

const {
  validateStudentInput,
  validateStudentId,
  createStudent,
  updateStudent,
  getStudentById
} = require('../controllers/studentController');

// Mock studentModel to guarantee unit tests do not query the database
jest.mock('../models/studentModel', () => ({
  getAllStudents: jest.fn(),
  getStudentById: jest.fn(),
  getStudentByRollNo: jest.fn(),
  createStudent: jest.fn(),
  updateStudent: jest.fn(),
  deleteStudent: jest.fn()
}));

const studentModel = require('../models/studentModel');

describe('Student Input Validation Logic (Unit)', () => {
  test('1. Validate correct student input returns null (no error)', () => {
    const validStudent = {
      name: 'Rahul',
      rollNo: 'CSE101',
      branch: 'CSE'
    };
    const error = validateStudentInput(validStudent);
    expect(error).toBeNull();
  });

  test('2. Reject missing or empty student name', () => {
    expect(validateStudentInput({ name: '', rollNo: 'CSE101', branch: 'CSE' }))
      .toContain('Student name is required');
    expect(validateStudentInput({ name: '   ', rollNo: 'CSE101', branch: 'CSE' }))
      .toContain('Student name is required');
    expect(validateStudentInput({ rollNo: 'CSE101', branch: 'CSE' }))
      .toContain('Student name is required');
  });

  test('3. Reject missing or empty roll number', () => {
    expect(validateStudentInput({ name: 'Rahul', rollNo: '', branch: 'CSE' }))
      .toContain('Student roll number is required');
    expect(validateStudentInput({ name: 'Rahul', rollNo: '   ', branch: 'CSE' }))
      .toContain('Student roll number is required');
    expect(validateStudentInput({ name: 'Rahul', branch: 'CSE' }))
      .toContain('Student roll number is required');
  });

  test('4. Reject missing or empty branch', () => {
    expect(validateStudentInput({ name: 'Rahul', rollNo: 'CSE101', branch: '' }))
      .toContain('Student branch is required');
    expect(validateStudentInput({ name: 'Rahul', rollNo: 'CSE101', branch: '   ' }))
      .toContain('Student branch is required');
    expect(validateStudentInput({ name: 'Rahul', rollNo: 'CSE101' }))
      .toContain('Student branch is required');
  });

  test('5. Reject invalid student IDs (non-numeric, negative, zero, decimal)', () => {
    expect(validateStudentId('abc')).toBeNull();
    expect(validateStudentId('-5')).toBeNull();
    expect(validateStudentId('0')).toBeNull();
    expect(validateStudentId('1.5')).toBeNull();
    expect(validateStudentId('')).toBeNull();

    // Valid IDs
    expect(validateStudentId('1')).toBe(1);
    expect(validateStudentId('42')).toBe(42);
    expect(validateStudentId(10)).toBe(10);
  });

  test('6. Verify student update validation rejects duplicate roll numbers from another student', async () => {
    // Student 1 wants to update their rollNo to "CSE102", but student 2 already has "CSE102"
    studentModel.getStudentById.mockResolvedValueOnce({
      id: 1,
      name: 'Rahul',
      rollNo: 'CSE101',
      branch: 'CSE'
    });
    studentModel.getStudentByRollNo.mockResolvedValueOnce({
      id: 2,
      name: 'Priya',
      rollNo: 'CSE102',
      branch: 'CSE'
    });

    const req = {
      params: { id: '1' },
      body: { name: 'Rahul Updated', rollNo: 'CSE102', branch: 'CSE' }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await updateStudent(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: expect.stringContaining('already exists')
      })
    );
  });

  test('7. Reject non-object body payload gracefully', () => {
    expect(validateStudentInput(null)).toContain('must be a valid JSON object');
    expect(validateStudentInput(undefined)).toContain('must be a valid JSON object');
    expect(validateStudentInput('string-payload')).toContain('must be a valid JSON object');
  });
});
