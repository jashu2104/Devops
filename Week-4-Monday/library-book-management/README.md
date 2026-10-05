# Library Book Management System

**Course:** DEVOPS AND FULLSTACK  
**Course Code:** 23CS102PE405  
**Assignment:** 4.1.1  
**Database:** PostgreSQL  
**ORM:** Sequelize  
**Backend:** Node.js + Express.js  

---

## 📖 Scenario & Project Overview

This project is a RESTful **Library Book Management System** built for a public library domain. It allows librarians and management systems to maintain the library catalogue electronically. 

The system provides robust RESTful APIs to:
- Register new books in the library inventory with mandatory input validation.
- Enforce business rules such as **unique ISBN numbers**, non-negative prices, and valid copy numbers.
- Perform quick catalogue searches (case-insensitive author lookup), filter books by availability status, and sort books alphabetically by title.
- Manage book details (retrieve, update, and delete entries safely).
- Ensure high availability and database connection safety with standardized error handling and clean status codes.

---

## ✨ Features Checklist

```text
✓ Create new books with field validation
✓ Retrieve all books or a single book by ID
✓ Update existing book details safely
✓ Delete books from the catalogue
✓ Enforce ISBN uniqueness across all operations (409 Conflict)
✓ Validate input types and ranges (Price >= 0, Available Copies >= 0)
✓ Search books by author (Case-insensitive ILIKE search)
✓ Filter books by availability status (available=true / available=false)
✓ Alphabetical sorting by book title (asc/desc)
✓ Combined query parameter handling
✓ Graceful PostgreSQL error handling & 503 database unavailable handling
✓ Safe database auto-synchronization using Sequelize ORM
```

---

## 🛠️ Technology Stack

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** PostgreSQL (v12+)
- **ORM:** Sequelize ORM (v6+)
- **Database Driver:** `pg` & `pg-hstore`
- **Environment Management:** `dotenv`
- **Middleware:** `cors`
- **Dev Tool:** `nodemon`

---

## 📁 Project Structure

```text
library-book-management/
│
├── config/
│   └── database.js         # Sequelize PostgreSQL connection setup
│
├── controllers/
│   └── bookController.js   # Main CRUD & query business logic
│
├── models/
│   └── Book.js             # Sequelize Book model schema & validations
│
├── routes/
│   └── bookRoutes.js       # Express routes mounting endpoints
│
├── middleware/
│   └── errorHandler.js     # Centralized global error handling middleware
│
├── seeders/
│   └── seed.js             # Seed script for initial sample books
│
├── .env                    # Environment variables (Credentials)
├── .env.example            # Environment variables placeholder template
├── .gitignore              # Files excluded from git
├── app.js                  # Express app setup & middleware mounting
├── server.js               # Application entry point & DB sync handler
├── package.json            # Dependencies and scripts configuration
└── README.md               # Comprehensive documentation
```

---

## 🏗️ System Architecture

```text
                   CLIENT
                     |
                     |
                  Postman / Browser
                     |
                     ↓
              Express Server (app.js / server.js)
                     |
                     ↓
               Routes Layer (routes/bookRoutes.js)
                     |
                     ↓
             Controller Layer (controllers/bookController.js)
                     |
                     ↓
              Sequelize ORM (models/Book.js)
                     |
                     ↓
              PostgreSQL DB (library_db)
                     |
                     ↓
                Books Table
```

### CRUD Request Flow Architecture

**Create (POST):**
```text
POST Request → Express → Book Route → Controller (Validation + ISBN Check) → Sequelize → PostgreSQL → 201 Created Response
```

**Read (GET):**
```text
GET Request → Express → Book Route → Controller (Filter/Sort/Search Query) → Sequelize → PostgreSQL → 200 OK JSON Response
```

**Update (PUT):**
```text
PUT Request → Express → Book Route → Controller (Validate ID & ISBN) → Find Book → Update → PostgreSQL → 200 OK Response
```

**Delete (DELETE):**
```text
DELETE Request → Express → Book Route → Controller → Find Book → Destroy → PostgreSQL → 200 OK Success Message
```

---

## 🗄️ Database Table Schema

Sequelize automatically synchronizes and manages the `Books` table:

```sql
CREATE TABLE IF NOT EXISTS "Books" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "isbn" VARCHAR(255) NOT NULL UNIQUE,
    "price" NUMERIC(10, 2) NOT NULL,
    "availableCopies" INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);
```

---

## 🚀 Database Setup & Installation Guide

### Step 1: Install PostgreSQL
Ensure PostgreSQL is installed and running on your system.

### Step 2: Create PostgreSQL Database
You can create the database via `psql` command line or `pgAdmin`:

**Using Terminal:**
```bash
psql -U postgres -c "CREATE DATABASE library_db;"
```

**Using pgAdmin:**
1. Open pgAdmin.
2. Right-click **Databases** -> **Create** -> **Database...**
3. Set Database name: `library_db`
4. Click **Save**.

### Step 3: Configure `.env` File
Create a `.env` file in the project root directory (or update the provided `.env`):

```env
PORT=5000

DB_NAME=library_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
```

### Step 4: Install Dependencies
Run the following command in the project root:

```bash
npm install
```

### Step 5: Seed Sample Data
Populate the database with sample library books:

```bash
npm run seed
```

Output:
```text
Connected to PostgreSQL for seeding...
✓ Seeded book: "Clean Code" by Robert C. Martin
✓ Seeded book: "The Pragmatic Programmer" by Andrew Hunt
✓ Seeded book: "Introduction to Algorithms" by Thomas H. Cormen
✓ Seeded book: "Database System Concepts" by Abraham Silberschatz

Seeding completed! 4 new book(s) added.
```

### Step 6: Start the Development Server

```bash
npm run dev
```

Expected Startup Console Logs:
```text
Connecting to PostgreSQL...
PostgreSQL connected successfully.
Database synchronized successfully.
Server running on http://localhost:5000
```

*(Note: If port 5000 is occupied by macOS AirPlay, the server automatically falls back to port 5001).*

---

## 🔌 API Endpoints Documentation

### 1. Health Check
- **Endpoint:** `GET /api/health`
- **Description:** Verifies API status and database system.
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Library API is running",
  "database": "PostgreSQL"
}
```

---

### 2. Create Book
- **Endpoint:** `POST /api/books`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "9780132350884",
  "price": 650,
  "availableCopies": 5
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "9780132350884",
    "price": "650.00",
    "availableCopies": 5,
    "createdAt": "2026-10-05T07:51:41.587Z",
    "updatedAt": "2026-10-05T07:51:41.587Z"
  }
}
```
- **Error Response - Duplicate ISBN (409 Conflict):**
```json
{
  "success": false,
  "message": "A book with this ISBN already exists"
}
```
- **Error Response - Validation Failure (400 Bad Request):**
```json
{
  "success": false,
  "message": "Invalid book data",
  "errors": [
    "Price cannot be negative"
  ]
}
```

---

### 3. Get All Books (With Search, Filter, Sort, & Pagination)
- **Endpoint:** `GET /api/books`
- **Query Parameters:**
  - `author` (string): Case-insensitive search on author name (e.g., `author=Martin`).
  - `available` (boolean): `true` (copies > 0) or `false` (copies = 0).
  - `sort` (string): Field to sort by (`title`, `price`, `author`, `id`).
  - `order` (string): `asc` (default) or `desc`.
  - `page` (integer): Page number for pagination.
  - `limit` (integer): Number of items per page.

- **Example Request - Search by Author:**
  `GET /api/books?author=Martin`

- **Example Request - Available Books:**
  `GET /api/books?available=true`

- **Example Request - Alphabetical Sort:**
  `GET /api/books?sort=title&order=asc`

- **Example Request - Combined Query:**
  `GET /api/books?author=Martin&available=true&sort=title`

- **Response (200 OK):**
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "id": 1,
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "isbn": "9780132350884",
      "price": "650.00",
      "availableCopies": 5
    }
  ]
}
```

---

### 4. Get Single Book
- **Endpoint:** `GET /api/books/:id`
- **Example Request:** `GET /api/books/1`
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "9780132350884",
    "price": "650.00",
    "availableCopies": 5
  }
}
```
- **Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Book not found"
}
```

---

### 5. Update Book
- **Endpoint:** `PUT /api/books/:id`
- **Example Request:** `PUT /api/books/1`
- **Request Body:**
```json
{
  "title": "Clean Code - Second Edition",
  "author": "Robert C. Martin",
  "isbn": "9780132350884",
  "price": 750,
  "availableCopies": 10
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "id": 1,
    "title": "Clean Code - Second Edition",
    "author": "Robert C. Martin",
    "isbn": "9780132350884",
    "price": 750,
    "availableCopies": 10
  }
}
```

---

### 6. Delete Book
- **Endpoint:** `DELETE /api/books/:id`
- **Example Request:** `DELETE /api/books/1`
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

---

## 🧪 Postman Test Scenarios Matrix

| Test Case | HTTP Method | Endpoint | Request Body / Query Params | Expected Status | Expected Output / Behavior |
|---|---|---|---|---|---|
| **Health Check** | GET | `/api/health` | None | `200 OK` | `{"success": true, "database": "PostgreSQL"}` |
| **Create Book** | POST | `/api/books` | Valid Book JSON | `201 Created` | `{"success": true, "message": "Book created successfully"}` |
| **Get All Books** | GET | `/api/books` | None | `200 OK` | `{"success": true, "count": N, "data": [...]}` |
| **Get Single Book** | GET | `/api/books/1` | None | `200 OK` | Book object with ID 1 |
| **Update Book** | PUT | `/api/books/1` | Updated JSON payload | `200 OK` | Updated book data |
| **Delete Book** | DELETE | `/api/books/1` | None | `200 OK` | `{"success": true, "message": "Book deleted successfully"}` |
| **Invalid ID** | GET | `/api/books/9999` | None | `404 Not Found` | `{"success": false, "message": "Book not found"}` |
| **Duplicate ISBN** | POST | `/api/books` | Existing ISBN (`9780132350884`) | `409 Conflict` | `{"success": false, "message": "A book with this ISBN already exists"}` |
| **Invalid Price** | POST | `/api/books` | `"price": -100` | `400 Bad Request` | `{"success": false, "errors": ["Price cannot be negative"]}` |
| **Search Author** | GET | `/api/books?author=Martin` | Query: `author=Martin` | `200 OK` | Books authored by Robert C. Martin |
| **Availability Filter** | GET | `/api/books?available=true` | Query: `available=true` | `200 OK` | Books where `availableCopies > 0` |
| **Sort Title** | GET | `/api/books?sort=title` | Query: `sort=title` | `200 OK` | Books sorted alphabetically by title |
| **Combined Query** | GET | `/api/books?author=Martin&available=true&sort=title` | Combined params | `200 OK` | Filtered and sorted books matching all criteria |

---

## 🔍 SQL Verification Queries (For pgAdmin / psql)

Students can verify database contents directly in pgAdmin or psql:

```sql
-- 1. Select all books
SELECT * FROM "Books";

-- 2. Count total books
SELECT COUNT(*) FROM "Books";

-- 3. Case-insensitive author search (ILIKE)
SELECT * FROM "Books" WHERE author ILIKE '%Martin%';

-- 4. Select available books (copies > 0)
SELECT * FROM "Books" WHERE "availableCopies" > 0;

-- 5. Select books sorted alphabetically by title
SELECT * FROM "Books" ORDER BY title ASC;
```

---

## 🎓 Lab Examination Viva & Code Explanation Guide

When presenting this project during a lab exam, be prepared to explain the following key code constructs:

### 1. Sequelize Data Types Import (`models/Book.js`)
```javascript
const { DataTypes } = require("sequelize");
```
*Explanation:* `DataTypes` defines column types in PostgreSQL (e.g., `STRING`, `INTEGER`, `DECIMAL`).

### 2. Model Definition (`models/Book.js`)
```javascript
const Book = sequelize.define("Book", { ... });
```
*Explanation:* `sequelize.define()` registers the model schema with Sequelize, mapping to the `"Books"` database table.

### 3. Model Validations (`models/Book.js`)
```javascript
price: {
  type: DataTypes.DECIMAL(10, 2),
  allowNull: false,
  validate: { min: { args: [0], msg: "Price cannot be negative" } }
}
```
*Explanation:* Enforces backend-level rules before PostgreSQL queries are executed.

### 4. Database Operations Used in Controller (`controllers/bookController.js`)
- `Book.create({...})` -> Generates `INSERT INTO "Books" ...`
- `Book.findAll({ where, order })` -> Generates `SELECT * FROM "Books" WHERE ... ORDER BY ...`
- `Book.findByPk(id)` -> Generates `SELECT * FROM "Books" WHERE id = :id`
- `Book.update(data, { where })` -> Generates `UPDATE "Books" SET ... WHERE id = :id`
- `Book.destroy({ where })` -> Generates `DELETE FROM "Books" WHERE id = :id`
- `Op.iLike` -> PostgreSQL specific operator for case-insensitive pattern matching.

---

## 🛡️ HTTP Status Code Summary

- `200 OK` - Successful GET, PUT, DELETE operations.
- `201 Created` - Successful POST book creation.
- `400 Bad Request` - Missing mandatory fields or negative input values.
- `404 Not Found` - Book ID does not exist.
- `409 Conflict` - Duplicate ISBN detection.
- `500 Internal Server Error` - Server execution error.
- `503 Service Unavailable` - Database connection failure.

---

## 📄 License
This project is created for B.Tech DevOps & FullStack Academic Coursework.
