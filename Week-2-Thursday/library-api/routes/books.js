const express = require("express");
const router = express.Router();

// In-Memory Book Storage (Data resets on server restart)
let books = [
    {
        id: 1,
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "9780132350884",
        price: 650,
        available: true
    },
    {
        id: 2,
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        isbn: "9780135957059",
        price: 800,
        available: true
    },
    {
        id: 3,
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        isbn: "9780262046305",
        price: 1200,
        available: false
    }
];

/**
 * Reusable ID Validation Helper
 * Ensures book ID is a positive integer
 */
const validateBookId = (idParam) => {
    const num = Number(idParam);
    return Boolean(idParam && !isNaN(num) && Number.isInteger(num) && num > 0);
};

/**
 * Reusable Input Validation Helper
 * Validates title, author, isbn, price, and availability
 */
const validateBookInput = (body) => {
    const { title, author, isbn, price, available } = body;
    const errors = [];

    if (title === undefined || title === null || String(title).trim() === "") {
        errors.push("Title is required");
    }

    if (author === undefined || author === null || String(author).trim() === "") {
        errors.push("Author is required");
    }

    if (isbn === undefined || isbn === null || String(isbn).trim() === "") {
        errors.push("ISBN is required");
    }

    if (price === undefined || price === null || typeof price !== "number" || price < 0) {
        errors.push("Price must be greater than or equal to 0");
    }

    if (available === undefined || available === null || typeof available !== "boolean") {
        errors.push("Available status must be true or false");
    }

    return errors;
};

// 1. GET /books - Retrieve all books (with optional ?available=true/false query filter)
router.get("/", (req, res) => {
    let result = [...books];

    if (req.query.available !== undefined) {
        if (req.query.available === "true") {
            result = result.filter(book => book.available === true);
        } else if (req.query.available === "false") {
            result = result.filter(book => book.available === false);
        }
    }

    res.status(200).json({
        success: true,
        count: result.length,
        data: result
    });
});

// 2. GET /books/:id - Retrieve a book by ID
router.get("/:id", (req, res) => {
    if (!validateBookId(req.params.id)) {
        return res.status(400).json({
            success: false,
            message: "Book ID must be a valid positive integer"
        });
    }

    const bookId = parseInt(req.params.id, 10);
    const book = books.find(b => b.id === bookId);

    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }

    if (!book.available) {
        return res.status(200).json({
            success: true,
            message: "Book is currently unavailable",
            data: book
        });
    }

    res.status(200).json({
        success: true,
        data: book
    });
});

// 3. POST /books - Add a new book
router.post("/", (req, res) => {
    const errors = validateBookInput(req.body);

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid book data",
            errors: errors
        });
    }

    const { title, author, isbn, price, available } = req.body;

    // Check duplicate ISBN
    const isDuplicate = books.some(b => b.isbn.trim() === isbn.trim());
    if (isDuplicate) {
        return res.status(409).json({
            success: false,
            message: "A book with this ISBN already exists"
        });
    }

    // Generate new ID automatically
    const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;

    const newBook = {
        id: newId,
        title: title.trim(),
        author: author.trim(),
        isbn: isbn.trim(),
        price: Number(price),
        available: Boolean(available)
    };

    books.push(newBook);

    res.status(201).json({
        success: true,
        message: "Book added successfully",
        data: newBook
    });
});

// 4. PUT /books/:id - Update existing book information
router.put("/:id", (req, res) => {
    if (!validateBookId(req.params.id)) {
        return res.status(400).json({
            success: false,
            message: "Book ID must be a valid positive integer"
        });
    }

    const bookId = parseInt(req.params.id, 10);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }

    const errors = validateBookInput(req.body);
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid book data",
            errors: errors
        });
    }

    const { title, author, isbn, price, available } = req.body;

    // Check if updated ISBN collides with another book
    const isDuplicate = books.some(b => b.id !== bookId && b.isbn.trim() === isbn.trim());
    if (isDuplicate) {
        return res.status(409).json({
            success: false,
            message: "A book with this ISBN already exists"
        });
    }

    const updatedBook = {
        id: bookId,
        title: title.trim(),
        author: author.trim(),
        isbn: isbn.trim(),
        price: Number(price),
        available: Boolean(available)
    };

    books[bookIndex] = updatedBook;

    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook
    });
});

// 5. DELETE /books/:id - Delete a book by ID
router.delete("/:id", (req, res) => {
    if (!validateBookId(req.params.id)) {
        return res.status(400).json({
            success: false,
            message: "Book ID must be a valid positive integer"
        });
    }

    const bookId = parseInt(req.params.id, 10);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }

    books.splice(bookIndex, 1);

    res.status(200).json({
        success: true,
        message: "Book deleted successfully"
    });
});

module.exports = router;
