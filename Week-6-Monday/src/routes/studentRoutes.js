const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// GET /students - Protected (All authenticated users)
router.get('/', authenticateToken, studentController.getAllStudents);

// GET /students/:id - Protected
router.get('/:id', authenticateToken, studentController.getStudentById);

// PUT /students/:id - Protected (Only Faculty & Admin allowed)
router.put('/:id', authenticateToken, authorizeRoles('faculty', 'admin'), studentController.updateStudent);

module.exports = router;
