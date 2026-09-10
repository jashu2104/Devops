const bcrypt = require('bcryptjs');

// In-memory User Data Store initialized with hashed passwords
const users = [
  {
    id: 'USR-1001',
    name: 'Dr. Mohammed Ali Shaik',
    email: 'ali.shaik@cse.college.edu',
    password: bcrypt.hashSync('faculty123', 10),
    role: 'faculty',
    department: 'CSE & AI',
    registeredAt: new Date('2025-08-01T10:00:00Z').toISOString()
  },
  {
    id: 'USR-1002',
    name: 'Dr. N. Venkatesh',
    email: 'n.venkatesh@cse.college.edu',
    password: bcrypt.hashSync('faculty123', 10),
    role: 'faculty',
    department: 'CSE & AI',
    registeredAt: new Date('2025-08-01T10:30:00Z').toISOString()
  },
  {
    id: 'USR-1003',
    name: 'Mr. Kranthi Srivani',
    email: 'kranthi.srivani@cse.college.edu',
    password: bcrypt.hashSync('faculty123', 10),
    role: 'faculty',
    department: 'CSE & AI',
    registeredAt: new Date('2025-08-01T11:00:00Z').toISOString()
  },
  {
    id: 'USR-1004',
    name: 'System Admin',
    email: 'admin@college.edu',
    password: bcrypt.hashSync('admin123', 10),
    role: 'admin',
    department: 'IT Infrastructure',
    registeredAt: new Date('2025-01-15T09:00:00Z').toISOString()
  },
  {
    id: 'STU-202601',
    name: 'Alex Johnson',
    email: 'alex.j@student.college.edu',
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    department: 'Computer Science & AI',
    rollNumber: '23CS102PE405-01',
    semester: 'ODD (Sem 5)',
    academicYear: '2026-27',
    gpa: 3.85,
    registeredAt: new Date('2026-01-10T08:30:00Z').toISOString()
  },
  {
    id: 'STU-202602',
    name: 'Priya Sharma',
    email: 'priya.s@student.college.edu',
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    department: 'Computer Science & AI',
    rollNumber: '23CS102PE405-02',
    semester: 'ODD (Sem 5)',
    academicYear: '2026-27',
    gpa: 3.92,
    registeredAt: new Date('2026-01-12T09:15:00Z').toISOString()
  },
  {
    id: 'STU-202603',
    name: 'Rahul Verma',
    email: 'rahul.v@student.college.edu',
    password: bcrypt.hashSync('student123', 10),
    role: 'student',
    department: 'Artificial Intelligence',
    rollNumber: '23CS102PE405-03',
    semester: 'ODD (Sem 5)',
    academicYear: '2026-27',
    gpa: 3.68,
    registeredAt: new Date('2026-01-15T11:45:00Z').toISOString()
  }
];

class UserModel {
  static findByEmail(email) {
    if (!email) return null;
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
  }

  static findById(id) {
    if (!id) return null;
    return users.find(user => user.id === id);
  }

  static getAllUsers() {
    // Return safe copy omitting passwords for general list if needed
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  static getStudentsOnly() {
    return users
      .filter(user => user.role === 'student')
      .map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
  }

  static createUser(userData) {
    const isStudent = (userData.role || 'student').toLowerCase() === 'student';
    const prefix = isStudent ? 'STU-' : 'USR-';
    const id = prefix + (Math.floor(100000 + Math.random() * 900000));

    const newUser = {
      id,
      name: userData.name,
      email: userData.email.toLowerCase(),
      password: userData.password, // already hashed by controller
      role: userData.role || 'student',
      department: userData.department || 'Computer Science Engineering',
      ...(isStudent ? {
        rollNumber: userData.rollNumber || `23CS102PE405-${users.length + 1}`,
        semester: userData.semester || 'ODD (Sem 5)',
        academicYear: userData.academicYear || '2026-27',
        gpa: userData.gpa || 3.5
      } : {}),
      registeredAt: new Date().toISOString()
    };

    users.push(newUser);
    
    // Return sanitized object without password
    const { password, ...sanitizedUser } = newUser;
    return sanitizedUser;
  }

  static updateUser(id, updateData) {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    // Prevent direct password overwrite via simple profile update
    const { password, id: _, email: __, ...allowedUpdates } = updateData;

    users[userIndex] = {
      ...users[userIndex],
      ...allowedUpdates,
      updatedAt: new Date().toISOString()
    };

    const { password: pwd, ...sanitizedUser } = users[userIndex];
    return sanitizedUser;
  }

  static deleteUser(id) {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;
    users.splice(userIndex, 1);
    return true;
  }
}

module.exports = UserModel;
