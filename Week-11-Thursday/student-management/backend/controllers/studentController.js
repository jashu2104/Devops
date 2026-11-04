/**
 * Student Controller
 * Handles request validation, calls data model, and sends standard JSON responses.
 */

const studentModel = require('../models/studentModel');

/**
 * Validation helper: Validates student payload fields.
 * Returns null if valid, or an error message string if invalid.
 */
function validateStudentInput(payload) {
  if (!payload || typeof payload !== 'object') {
    return 'Request body must be a valid JSON object';
  }

  const { name, rollNo, branch } = payload;

  if (typeof name !== 'string' || name.trim().length === 0) {
    return 'Student name is required and cannot be empty';
  }

  if (typeof rollNo !== 'string' || rollNo.trim().length === 0) {
    return 'Student roll number is required and cannot be empty';
  }

  if (typeof branch !== 'string' || branch.trim().length === 0) {
    return 'Student branch is required and cannot be empty';
  }

  return null;
}

/**
 * Validation helper: Validates numeric student ID.
 * Returns positive integer or null if invalid.
 */
function validateStudentId(idParam) {
  const parsed = parseInt(idParam, 10);
  if (isNaN(parsed) || parsed <= 0 || String(parsed) !== String(idParam).trim()) {
    return null;
  }
  return parsed;
}

/**
 * Controller: Get all students
 * GET /api/students
 */
async function getStudents(req, res) {
  try {
    const students = await studentModel.getAllStudents();
    return res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve students: ' + error.message
    });
  }
}

/**
 * Controller: Get a single student by ID
 * GET /api/students/:id
 */
async function getStudentById(req, res) {
  try {
    const id = validateStudentId(req.params.id);
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID. ID must be a positive integer'
      });
    }

    const student = await studentModel.getStudentById(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${id} not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
}

/**
 * Controller: Register a new student
 * POST /api/students
 */
async function createStudent(req, res) {
  try {
    const validationError = validateStudentInput(req.body);
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError
      });
    }

    const trimmedName = req.body.name.trim();
    const trimmedRollNo = req.body.rollNo.trim();
    const trimmedBranch = req.body.branch.trim();

    // Check duplicate roll number
    const existing = await studentModel.getStudentByRollNo(trimmedRollNo);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `Student with roll number '${trimmedRollNo}' already exists`
      });
    }

    const createdStudent = await studentModel.createStudent({
      name: trimmedName,
      rollNo: trimmedRollNo,
      branch: trimmedBranch
    });

    return res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: createdStudent
    });
  } catch (error) {
    // Check PostgreSQL unique violation code 23505
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        message: 'Student with this roll number already exists'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
}

/**
 * Controller: Update an existing student
 * PUT /api/students/:id
 */
async function updateStudent(req, res) {
  try {
    const id = validateStudentId(req.params.id);
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID. ID must be a positive integer'
      });
    }

    const validationError = validateStudentInput(req.body);
    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError
      });
    }

    const existingStudent = await studentModel.getStudentById(id);
    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${id} not found`
      });
    }

    const trimmedName = req.body.name.trim();
    const trimmedRollNo = req.body.rollNo.trim();
    const trimmedBranch = req.body.branch.trim();

    // Check duplicate roll number against other students
    const duplicate = await studentModel.getStudentByRollNo(trimmedRollNo);
    if (duplicate && duplicate.id !== id) {
      return res.status(409).json({
        success: false,
        message: `Student with roll number '${trimmedRollNo}' already exists`
      });
    }

    const updatedStudent = await studentModel.updateStudent(id, {
      name: trimmedName,
      rollNo: trimmedRollNo,
      branch: trimmedBranch
    });

    return res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        message: 'Student with this roll number already exists'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
}

/**
 * Controller: Delete a student
 * DELETE /api/students/:id
 */
async function deleteStudent(req, res) {
  try {
    const id = validateStudentId(req.params.id);
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID. ID must be a positive integer'
      });
    }

    const existingStudent = await studentModel.getStudentById(id);
    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        message: `Student with ID ${id} not found`
      });
    }

    const deletedStudent = await studentModel.deleteStudent(id);

    return res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: deletedStudent
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
}

module.exports = {
  validateStudentInput,
  validateStudentId,
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
