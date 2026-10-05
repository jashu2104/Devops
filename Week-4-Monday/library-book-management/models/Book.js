const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title is required"
        },
        notEmpty: {
          msg: "Title cannot be empty"
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Author is required"
        },
        notEmpty: {
          msg: "Author cannot be empty"
        }
      }
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "ISBN is required"
        },
        notEmpty: {
          msg: "ISBN cannot be empty"
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
    availableCopies: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Available copies is required"
        },
        min: {
          args: [0],
          msg: "Available copies cannot be negative"
        }
      }
    }
  },
  {
    tableName: "Books",
    timestamps: true
  }
);

module.exports = Book;
