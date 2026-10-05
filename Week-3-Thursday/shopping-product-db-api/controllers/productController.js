const { Op } = require("sequelize");
const Product = require("../models/Product");

/**
 * @desc    Create a new product
 * @route   POST /api/products
 */
exports.createProduct = async (req, res, next) => {
    try {
        const { name, category, price, stock } = req.body;

        const product = await Product.create({
            name,
            category,
            price,
            stock
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all products (supports category search & price sorting)
 * @route   GET /api/products
 * @query   category - Filter by product category (case-insensitive)
 * @query   sort - Field to sort by (e.g., price)
 * @query   order - Sorting order (asc | desc)
 */
exports.getProducts = async (req, res, next) => {
    try {
        const { category, sort, order } = req.query;
        const queryOptions = {};

        // 1. Filtering by category
        if (category) {
            queryOptions.where = {
                category: {
                    [Op.iLike]: `%${category}%`
                }
            };
        }

        // 2. Sorting by price or other valid columns
        if (sort) {
            const sortField = sort.toLowerCase() === "price" ? "price" : sort;
            const sortOrder = order && order.toLowerCase() === "desc" ? "DESC" : "ASC";
            queryOptions.order = [[sortField, sortOrder]];
        } else {
            // Default ordering by id ASC
            queryOptions.order = [["id", "ASC"]];
        }

        const products = await Product.findAll(queryOptions);

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
 */
exports.getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

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
 * @desc    Update product details (e.g. price, name, category, stock)
 * @route   PUT /api/products/:id
 */
exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const { name, category, price, stock } = req.body;

        // Apply fields to update if provided
        if (name !== undefined) product.name = name;
        if (category !== undefined) product.category = category;
        if (price !== undefined) product.price = price;
        if (stock !== undefined) product.stock = stock;

        await product.save();

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
 * @desc    Delete product by ID
 * @route   DELETE /api/products/:id
 */
exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await product.destroy();

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
