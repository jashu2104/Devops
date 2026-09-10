const UserModel = require('../models/userModel');

// 1. GET /students – View student information
const getAllStudents = (req, res) => {
  const { role, id } = req.user;

  // Student role: can only view their own student info
  if (role === 'student') {
    const student = UserModel.findById(id);
    const { password, ...sanitized } = student;
    return res.status(200).json({
      success: true,
      message: 'Student personal profile retrieved.',
      data: [sanitized]
    });
  }

  // Faculty & Admin role: can view all student records
  const students = UserModel.getStudentsOnly();
  return res.status(200).json({
    success: true,
    message: 'All student records retrieved.',
    data: students
  });
};

// 2. GET /students/:id – View student by ID
const getStudentById = (req, res) => {
  const { id } = req.params;

  // Students can only view their own profile
  if (req.user.role === 'student' && id !== req.user.id) {
    return res.status(403).json({ success: false, message: 'Students can only view their own profile!' });
  }

  const student = UserModel.findById(id);
  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found!' });
  }

  const { password, ...sanitized } = student;
  return res.status(200).json({ success: true, data: sanitized });
};

// 3. PUT /students/:id – Update student information (Faculty / Admin)
const updateStudent = (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const student = UserModel.findById(id);
  if (!student) {
    return res.status(404).json({ success: false, message: 'Student not found!' });
  }

  // Update record
  const updatedStudent = UserModel.updateUser(id, updateData);

  return res.status(200).json({
    success: true,
    message: 'Student record updated successfully!',
    data: updatedStudent
  });
};

module.exports = { getAllStudents, getStudentById, updateStudent };
