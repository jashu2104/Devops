const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define(
    "Product",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Product name is required"
                },
                notEmpty: {
                    msg: "Product name is required"
                }
            }
        },

        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Category is required"
                },
                notEmpty: {
                    msg: "Category is required"
                }
            }
        },

        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Price is required"
                },
                min: {
                    args: [0],
                    msg: "Price cannot be negative"
                }
            }
        },

        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Stock quantity is required"
                },
                min: {
                    args: [0],
                    msg: "Stock cannot be negative"
                }
            }
        }
    },
    {
        tableName: "products",
        timestamps: true
    }
);

module.exports = Product;
