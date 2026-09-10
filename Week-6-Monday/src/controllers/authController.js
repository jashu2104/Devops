const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const jwtConfig = require('../config/jwt');

// 1. POST /register – Register a new user
const register = async (req, res) => {
  const { name, email, password, role, department } = req.body;

  // Validation: Check required fields
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email, and password are required!' });
  }

  // Check if user email already exists
  const existingUser = UserModel.findByEmail(email);
  if (existingUser) {
    return res.status(409).json({ success: false, error: 'DuplicateEmail', message: 'Email is already registered!' });
  }

  // Step 1: Hash the password using bcryptjs
  const hashedPassword = await bcrypt.hash(password, 10);

  // Step 2: Save user to database/store
  const newUser = UserModel.createUser({
    name,
    email,
    password: hashedPassword,
    role: role || 'student',
    department: department || 'Computer Science Engineering'
  });

  // Step 3: Generate JWT Token
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );

  // Print Token in Terminal
  console.log('\n=================================================');
  console.log(`🔐 JWT TOKEN GENERATED FOR REGISTERED USER [${newUser.email}]:`);
  console.log(token);
  console.log('=================================================\n');

  return res.status(201).json({
    success: true,
    message: 'User registered successfully!',
    token,
    user: newUser
  });
};

// 2. POST /login – Authenticate user & generate JWT
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required!' });
  }

  // Step 1: Find user by email
  const user = UserModel.findByEmail(email);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password!' });
  }

  // Step 2: Compare entered password with hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid email or password!' });
  }

  // Step 3: Create JWT payload (User ID, Email, Role)
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    department: user.department
  };

  // Step 4: Sign JWT Token
  const token = jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn
  });

  // Print Token in Terminal
  console.log('\n=================================================');
  console.log(`🔑 JWT TOKEN GENERATED FOR LOGGED IN USER [${user.email}]:`);
  console.log(token);
  console.log('=================================================\n');

  const { password: _, ...userWithoutPassword } = user;

  return res.status(200).json({
    success: true,
    message: 'Login successful!',
    token,
    user: userWithoutPassword
  });
};

// 3. GET /profile – View logged-in user profile
const getProfile = (req, res) => {
  const user = UserModel.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User profile not found!' });
  }

  const { password, ...userWithoutPassword } = user;
  return res.status(200).json({
    success: true,
    user: userWithoutPassword
  });
};

module.exports = { register, login, getProfile };
