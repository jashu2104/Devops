require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET || 'fallback_secret_key_student_portal_2026',
  expiresIn: process.env.JWT_EXPIRES_IN || '1h'
};
