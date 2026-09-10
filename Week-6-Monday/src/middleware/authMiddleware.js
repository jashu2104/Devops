const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

// Middleware 1: Verify JWT Bearer Token
const authenticateToken = (req, res, next) => {
  // 1. Read 'Authorization' header (Format: "Bearer <token>")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // 2. Reject if no token is sent
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access Denied: No JWT token provided!' 
    });
  }

  // 3. Verify the token signature
  try {
    const decodedPayload = jwt.verify(token, jwtConfig.secret);
    req.user = decodedPayload; // Attach payload (id, email, role) to request object
    next(); // Pass control to the next function/controller
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        error: 'TokenExpired',
        message: 'JWT token has expired!' 
      });
    }
    return res.status(403).json({ 
      success: false, 
      error: 'InvalidToken',
      message: 'Invalid or Expired Token!' 
    });
  }
};

// Middleware 2: Check User Role (Bonus Challenge)
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if logged-in user's role is permitted
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Access Denied: Role '${req.user.role}' is not allowed to perform this action!` 
      });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRoles
};
