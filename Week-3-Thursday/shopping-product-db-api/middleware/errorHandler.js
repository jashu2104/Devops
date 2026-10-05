const { Sequelize } = require("sequelize");

const errorHandler = (err, req, res, next) => {
    // Console log for server debugging
    console.error("Error encountered:", err.name, err.message);

    // Handle JSON parsing syntax errors
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON format in request body"
        });
    }

    // Handle Sequelize Validation Errors & Unique Constraint Errors
    if (
        err instanceof Sequelize.ValidationError || 
        err.name === 'SequelizeValidationError' || 
        err.name === 'SequelizeUniqueConstraintError'
    ) {
        const errorMessages = err.errors ? err.errors.map((e) => e.message) : [err.message];
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errorMessages
        });
    }

    // Handle Database Connection Errors
    if (
        err instanceof Sequelize.ConnectionError ||
        err.name === 'SequelizeConnectionError' ||
        err.name === 'SequelizeConnectionRefusedError' ||
        err.name === 'SequelizeHostNotFoundError' ||
        err.name === 'SequelizeAccessDeniedError' ||
        err.name === 'SequelizeDatabaseError' && err.message.includes('connect')
    ) {
        return res.status(503).json({
            success: false,
            message: "Database service is currently unavailable"
        });
    }

    // Custom operational errors with explicit status code
    if (err.statusCode) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message || "An error occurred"
        });
    }

    // Generic unexpected errors
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal server error"
    });
};

module.exports = errorHandler;
