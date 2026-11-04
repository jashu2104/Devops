const StudentModel = require('../models/studentModel');

/**
 * Controller: Get all students
 * GET /api/students
 */
const getStudents = async (req, res) => {
  try {
    const students = await StudentModel.getAll();
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
};

/**
 * Controller: Get a single student by ID
 * GET /api/students/:id
 */
const getStudentById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID. ID must be a positive integer'
      });
    }

    const student = await StudentModel.getById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
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
};

/**
 * Controller: Create a new student
 * POST /api/students
 */
const createStudent = async (req, res) => {
  try {
    const { name, rollNo, branch } = req.body;

    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedRollNo = typeof rollNo === 'string' ? rollNo.trim() : '';
    const trimmedBranch = typeof branch === 'string' ? branch.trim() : '';

    if (!trimmedName || !trimmedRollNo || !trimmedBranch) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, rollNo, branch) are required and cannot be empty'
      });
    }

    // Check for duplicate roll number (case-insensitive)
    const duplicate = await StudentModel.getByRollNo(trimmedRollNo);

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: `Student with roll number '${trimmedRollNo}' already exists`
      });
    }

    const newStudent = await StudentModel.create({
      name: trimmedName,
      rollNo: trimmedRollNo,
      branch: trimmedBranch
    });

    return res.status(201).json({
      success: true,
      message: 'Student added successfully',
      data: newStudent
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
};

/**
 * Controller: Update an existing student
 * PUT /api/students/:id
 */
const updateStudent = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID. ID must be a positive integer'
      });
    }

    const existingStudent = await StudentModel.getById(id);

    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const { name, rollNo, branch } = req.body;

    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedRollNo = typeof rollNo === 'string' ? rollNo.trim() : '';
    const trimmedBranch = typeof branch === 'string' ? branch.trim() : '';

    if (!trimmedName || !trimmedRollNo || !trimmedBranch) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, rollNo, branch) are required and cannot be empty'
      });
    }

    // Check for duplicate roll number among other students
    const duplicate = await StudentModel.getByRollNo(trimmedRollNo, id);

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: `Student with roll number '${trimmedRollNo}' already exists`
      });
    }

    const updatedStudent = await StudentModel.update(id, {
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
    return res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message
    });
  }
};

/**
 * Controller: Delete a student
 * DELETE /api/students/:id
 */
const deleteStudent = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid student ID. ID must be a positive integer'
      });
    }

    const existingStudent = await StudentModel.getById(id);

    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const deletedStudent = await StudentModel.delete(id);

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
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
