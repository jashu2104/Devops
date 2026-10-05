const sequelize = require("../config/database");
const Book = require("../models/Book");

const sampleBooks = [
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    price: 650.00,
    availableCopies: 5
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    isbn: "9780135957059",
    price: 800.00,
    availableCopies: 3
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    isbn: "9780262046305",
    price: 1200.00,
    availableCopies: 0
  },
  {
    title: "Database System Concepts",
    author: "Abraham Silberschatz",
    isbn: "9780078022159",
    price: 950.00,
    availableCopies: 4
  }
];

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connected to PostgreSQL for seeding...");

    let createdCount = 0;
    for (const bookData of sampleBooks) {
      const [book, created] = await Book.findOrCreate({
        where: { isbn: bookData.isbn },
        defaults: bookData
      });

      if (created) {
        console.log(`✓ Seeded book: "${book.title}" by ${book.author}`);
        createdCount++;
      } else {
        console.log(`- Book with ISBN ${bookData.isbn} already exists ("${book.title}")`);
      }
    }

    console.log(`\nSeeding completed! ${createdCount} new book(s) added.`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();
