const products = require("../data/products");

/**
 * Helper function to check if an ID string is a valid positive integer
 */
const isValidPositiveInteger = (idStr) => {
  if (!idStr || typeof idStr !== 'string') return false;
  const num = Number(idStr);
  return Number.isInteger(num) && num > 0 && String(num) === idStr.trim();
};

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidPositiveInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Product ID must be a valid positive integer"
      });
    }

    const productId = parseInt(id, 10);
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Public
 */
const createProduct = (req, res, next) => {
  try {
    const { name, category, price, stock, description } = req.body || {};
    const errors = [];

    // Validation checks
    if (!name || (typeof name === 'string' && name.trim() === '')) {
      errors.push("Product name is required");
    }

    if (!category || (typeof category === 'string' && category.trim() === '')) {
      errors.push("Category is required");
    }

    if (price === undefined || price === null || price === '') {
      errors.push("Price is required");
    } else if (typeof price !== 'number' || isNaN(price) || price < 0) {
      errors.push("Price cannot be negative");
    }

    if (stock === undefined || stock === null || stock === '') {
      errors.push("Stock is required");
    } else if (typeof stock !== 'number' || isNaN(stock) || stock < 0) {
      errors.push("Stock cannot be negative");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid product data",
        errors: errors
      });
    }

    // Auto-generate ID
    const maxId = products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0;
    const newId = maxId + 1;

    const newProduct = {
      id: newId,
      name: name.trim(),
      category: category.trim(),
      price: Number(price),
      stock: Number(stock),
      description: description && typeof description === 'string' ? description.trim() : (description || "")
    };

    products.push(newProduct);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing product
 * @route   PUT /api/products/:id
 * @access  Public
 */
const updateProduct = (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidPositiveInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Product ID must be a valid positive integer"
      });
    }

    const productId = parseInt(id, 10);
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const { name, category, price, stock, description } = req.body || {};
    const errors = [];

    if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
      errors.push("Product name cannot be empty");
    }

    if (category !== undefined && (typeof category !== 'string' || category.trim() === '')) {
      errors.push("Category cannot be empty");
    }

    if (price !== undefined && (typeof price !== 'number' || isNaN(price) || price < 0)) {
      errors.push("Price cannot be negative");
    }

    if (stock !== undefined && (typeof stock !== 'number' || isNaN(stock) || stock < 0)) {
      errors.push("Stock cannot be negative");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid product data",
        errors: errors
      });
    }

    // Apply updates
    if (name !== undefined) product.name = name.trim();
    if (category !== undefined) product.category = category.trim();
    if (price !== undefined) product.price = Number(price);
    if (stock !== undefined) product.stock = Number(stock);
    if (description !== undefined) product.description = typeof description === 'string' ? description.trim() : description;

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Public
 */
const deleteProduct = (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidPositiveInteger(id)) {
      return res.status(400).json({
        success: false,
        message: "Product ID must be a valid positive integer"
      });
    }

    const productId = parseInt(id, 10);
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    products.splice(productIndex, 1);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
