const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Parses JSON request bodies

// Serve HTML frontend
app.use(express.static(path.join(__dirname, '../public')));

// Mount API Routes
app.use('/', authRoutes);         // /register, /login, /profile
app.use('/students', studentRoutes); // /students, /students/:id

// Start Server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`🎓 Student Portal API Running on http://localhost:${PORT}`);
  console.log(`=================================================`);
});

module.exports = app;
