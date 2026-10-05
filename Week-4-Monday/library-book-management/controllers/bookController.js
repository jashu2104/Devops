const { Op, Sequelize } = require("sequelize");
const Book = require("../models/Book");

/**
 * Helper function to validate book input payload
 */
const validateBookInput = ({ title, author, isbn, price, availableCopies }, isUpdate = false) => {
  const errors = [];

  if (!isUpdate || title !== undefined) {
    if (!title || typeof title !== "string" || title.trim() === "") {
      errors.push("Title is required");
    }
  }

  if (!isUpdate || author !== undefined) {
    if (!author || typeof author !== "string" || author.trim() === "") {
      errors.push("Author is required");
    }
  }

  if (!isUpdate || isbn !== undefined) {
    if (!isbn || (typeof isbn !== "string" && typeof isbn !== "number") || String(isbn).trim() === "") {
      errors.push("ISBN is required");
    }
  }

  if (!isUpdate || price !== undefined) {
    if (price === undefined || price === null || price === "" || isNaN(Number(price))) {
      errors.push("Price is required");
    } else if (Number(price) < 0) {
      errors.push("Price cannot be negative");
    }
  }

  if (!isUpdate || availableCopies !== undefined) {
    if (availableCopies === undefined || availableCopies === null || availableCopies === "" || isNaN(Number(availableCopies))) {
      errors.push("Available copies is required");
    } else if (Number(availableCopies) < 0) {
      errors.push("Available copies cannot be negative");
    }
  }

  return errors;
};

/**
 * Create a new book
 * POST /api/books
 */
const createBook = async (req, res, next) => {
  try {
    const { title, author, isbn, price, availableCopies } = req.body;

    // Validate request body
    const errors = validateBookInput({ title, author, isbn, price, availableCopies });
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid book data",
        errors
      });
    }

    // Check for duplicate ISBN explicitly before insert
    const existingBook = await Book.findOne({ where: { isbn: String(isbn).trim() } });
    if (existingBook) {
      return res.status(409).json({
        success: false,
        message: "A book with this ISBN already exists"
      });
    }

    // Create book
    const book = await Book.create({
      title: title.trim(),
      author: author.trim(),
      isbn: String(isbn).trim(),
      price: Number(price),
      availableCopies: Number(availableCopies)
    });

    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "A book with this ISBN already exists"
      });
    }
    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages
      });
    }
    next(error);
  }
};

/**
 * Get all books with filtering, searching, sorting, and optional pagination
 * GET /api/books
 */
const getBooks = async (req, res, next) => {
  try {
    const { author, available, sort, order, page, limit } = req.query;

    const where = {};

    // Filter by author (case-insensitive search)
    if (author && author.trim() !== "") {
      where.author = {
        [Op.iLike]: `%${author.trim()}%`
      };
    }

    // Filter by availability
    if (available !== undefined) {
      if (available === "true" || available === true) {
        where.availableCopies = {
          [Op.gt]: 0
        };
      } else if (available === "false" || available === false) {
        where.availableCopies = 0;
      }
    }

    // Sort options
    let orderArray = [["id", "ASC"]]; // default sorting by ID
    if (sort) {
      const sortField = sort.trim();
      const sortOrder = order && order.toLowerCase() === "desc" ? "DESC" : "ASC";
      // Validate sorting column to prevent invalid fields
      const validColumns = ["id", "title", "author", "isbn", "price", "availableCopies", "createdAt"];
      if (validColumns.includes(sortField)) {
        orderArray = [[sortField, sortOrder]];
      }
    }

    // Pagination configuration
    const isPaginated = page !== undefined || limit !== undefined;
    let queryOptions = { where, order: orderArray };

    if (isPaginated) {
      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const limitNum = Math.max(1, parseInt(limit, 10) || 10);
      const offset = (pageNum - 1) * limitNum;

      queryOptions.limit = limitNum;
      queryOptions.offset = offset;

      const { count, rows } = await Book.findAndCountAll(queryOptions);
      const totalPages = Math.ceil(count / limitNum);

      return res.status(200).json({
        success: true,
        count: rows.length,
        totalItems: count,
        page: pageNum,
        limit: limitNum,
        totalPages: totalPages,
        data: rows
      });
    } else {
      const books = await Book.findAll(queryOptions);
      return res.status(200).json({
        success: true,
        count: books.length,
        data: books
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single book by ID
 * GET /api/books/:id
 */
const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID parameter"
      });
    }

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: book
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a book by ID
 * PUT /api/books/:id
 */
const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID parameter"
      });
    }

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    const { title, author, isbn, price, availableCopies } = req.body;

    // Validate inputs for update
    const errors = validateBookInput({ title, author, isbn, price, availableCopies }, true);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid book data",
        errors
      });
    }

    // Check duplicate ISBN if ISBN is changing
    if (isbn !== undefined && String(isbn).trim() !== book.isbn) {
      const existingIsbnBook = await Book.findOne({
        where: {
          isbn: String(isbn).trim(),
          id: { [Op.ne]: id }
        }
      });

      if (existingIsbnBook) {
        return res.status(409).json({
          success: false,
          message: "A book with this ISBN already exists"
        });
      }
    }

    // Perform update
    const updatedData = {};
    if (title !== undefined) updatedData.title = title.trim();
    if (author !== undefined) updatedData.author = author.trim();
    if (isbn !== undefined) updatedData.isbn = String(isbn).trim();
    if (price !== undefined) updatedData.price = Number(price);
    if (availableCopies !== undefined) updatedData.availableCopies = Number(availableCopies);

    await book.update(updatedData);

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "A book with this ISBN already exists"
      });
    }
    if (error.name === "SequelizeValidationError") {
      const messages = error.errors.map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages
      });
    }
    next(error);
  }
};

/**
 * Delete a book by ID
 * DELETE /api/books/:id
 */
const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      return res.status(400).json({
        success: false,
        message: "Invalid book ID parameter"
      });
    }

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    await book.destroy();

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
};
