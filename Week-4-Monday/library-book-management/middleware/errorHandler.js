/**
 * Global Error Handling Middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Error:", err);

  // Check for Sequelize / PostgreSQL database connection issues
  if (
    err.name === "SequelizeConnectionError" ||
    err.name === "SequelizeConnectionRefusedError" ||
    err.name === "SequelizeHostNotFoundError" ||
    err.name === "SequelizeHostNotReachableError" ||
    err.name === "SequelizeInvalidConnectionError" ||
    err.name === "SequelizeConnectionTimedOutError"
  ) {
    return res.status(503).json({
      success: false,
      message: "Database service is currently unavailable"
    });
  }

  // Handle Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    const errors = err.errors ? err.errors.map(e => e.message) : [err.message];
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors
    });
  }

  // Handle Unique constraint violation (e.g. duplicate ISBN)
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      success: false,
      message: "A book with this ISBN already exists"
    });
  }

  // Default internal server error response
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error"
  });
};

module.exports = errorHandler;
