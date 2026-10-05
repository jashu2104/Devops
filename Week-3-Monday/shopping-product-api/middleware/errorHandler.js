/**
 * Centralized Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  // Handle JSON syntax parsing errors from body-parser/express.json()
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON format in request body"
    });
  }

  // Log error internally for server-side debugging (not sent to client)
  console.error("Unhandled Error:", err.message);

  // Return generic 500 error response without exposing stack traces
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error"
  });
};

module.exports = errorHandler;
