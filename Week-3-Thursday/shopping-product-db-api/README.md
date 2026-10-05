# Online Shopping Product Database Management API

**Course:** DEVOPS AND FULLSTACK  
**Course Code:** 23CS102PE405  
**Assignment:** 3.1.2  
**Database:** PostgreSQL  
**ORM:** Sequelize  
**Backend:** Node.js + Express.js  
**API Testing:** Postman  

---

## 📌 Project Scenario

The Online Shopping application previously relied on temporary **in-memory product storage** (JavaScript array), which lost all product records whenever the server restarted. 

This project migrates the existing REST API to a production-grade backend architecture powered by a persistent **PostgreSQL database** using **Sequelize Object-Relational Mapping (ORM)**.

### Storage Architecture Migration
```text
[BEFORE]
Postman ➔ Express REST API ➔ Controllers ➔ In-Memory JavaScript Array (Transient)

[AFTER]
Postman ➔ Express REST API ➔ Controllers ➔ Sequelize ORM ➔ PostgreSQL Database (Persistent)
```

---

## 🏗 System Architecture Diagram

```text
                 Postman
                    │
                    ▼
             REST API Request
                    │
                    ▼
              Express Server
                    │
                    ▼
                Routes
                    │
                    ▼
              Controllers
                    │
                    ▼
             Sequelize ORM
                    │
                    ▼
              PostgreSQL
                    │
                    ▼
              shopping_db
                    │
                    ▼
              products table
```

---

## 🔄 CRUD Execution Flow

### 1. Create Product (POST)
```text
POST /api/products ➔ Route ➔ ProductController.createProduct ➔ Product.create() ➔ PostgreSQL INSERT ➔ 201 Created JSON
```

### 2. Read All Products (GET)
```text
GET /api/products ➔ Route ➔ ProductController.getProducts ➔ Product.findAll() ➔ PostgreSQL SELECT ➔ 200 OK JSON
```

### 3. Read Product by ID (GET)
```text
GET /api/products/:id ➔ Route ➔ ProductController.getProductById ➔ Product.findByPk() ➔ PostgreSQL SELECT ➔ 200 OK JSON
```

### 4. Update Product (PUT)
```text
PUT /api/products/:id ➔ Route ➔ ProductController.updateProduct ➔ Product.findByPk() ➔ product.save() ➔ PostgreSQL UPDATE ➔ 200 OK JSON
```

### 5. Delete Product (DELETE)
```text
DELETE /api/products/:id ➔ Route ➔ ProductController.deleteProduct ➔ Product.findByPk() ➔ product.destroy() ➔ PostgreSQL DELETE ➔ 200 OK JSON
```

---

## 🛠 Technology Stack

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building HTTP REST endpoints.
- **PostgreSQL**: Relational Database Management System (RDBMS).
- **Sequelize ORM**: Object-Relational Mapper for database interaction.
- **pg & pg-hstore**: PostgreSQL client driver for Node.js.
- **dotenv**: Environment variable management.
- **cors**: Cross-Origin Resource Sharing middleware.
- **nodemon**: Development auto-reload tool.
- **Postman**: API testing client and test script automation.

---

## 📂 Project Directory Structure

```text
shopping-product-db-api/
│
├── config/
│   └── database.js               # Sequelize database connection setup
│
├── controllers/
│   └── productController.js      # Product CRUD, search & sorting logic
│
├── models/
│   └── Product.js                # Sequelize model definition & validation
│
├── routes/
│   └── productRoutes.js          # REST API endpoints mapping
│
├── middleware/
│   └── errorHandler.js           # Centralized error handling
│
├── postman/
│   ├── Shopping-Product-DB-API.postman_collection.json   # Postman API Collection
│   └── Shopping-Product-DB-API.postman_environment.json  # Postman Environment Config
│
├── .env                          # Local environment variables (not committed)
├── .env.example                  # Template for environment variables
├── .gitignore                    # Ignored files (node_modules, .env, etc.)
├── app.js                        # Express application configuration
├── server.js                     # Server entry point & DB authentication/sync
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation & viva guide
```

---

## ⚙️ Installation & Setup

### 1. Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v18+)
- **PostgreSQL** (v14+)
- **pgAdmin** or `psql` CLI

### 2. Create PostgreSQL Database
Open **pgAdmin** or terminal (`psql`) and create a database named `shopping_db`:

```sql
CREATE DATABASE shopping_db;
```

### 3. Clone / Navigate to Project Directory
```bash
cd shopping-product-db-api
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Configure Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`):

```env
PORT=5000

DB_NAME=shopping_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
```

### 6. Start the Server
For development mode with auto-reload:
```bash
npm run dev
```

For production mode:
```bash
npm start
```

**Expected Terminal Startup Output:**
```text
Connecting to PostgreSQL...
PostgreSQL connected successfully.
Product table synchronized successfully.
Server running on http://localhost:5000
```

---

## 📡 REST API Documentation

### Base URL
`http://localhost:5000/api`

| Method | Endpoint | Description | Request Body / Query Params | Status Code |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/health` | API Health & DB Status Check | None | `200 OK` |
| **POST** | `/products` | Create a new product | JSON Product Object | `201 Created` |
| **GET** | `/products` | Retrieve all products | Optional Query: `category`, `sort`, `order` | `200 OK` |
| **GET** | `/products/:id` | Retrieve single product by ID | None | `200 OK` / `404 Not Found` |
| **PUT** | `/products/:id` | Update product details / price | JSON containing fields to update | `200 OK` / `404 Not Found` |
| **DELETE** | `/products/:id` | Delete product by ID | None | `200 OK` / `404 Not Found` |

---

### Request & Response Examples

#### 1. Health Check
`GET /api/health`

**Response (`200 OK`):**
```json
{
    "success": true,
    "message": "Shopping Product API is running",
    "database": "PostgreSQL"
}
```

---

#### 2. Create Product
`POST /api/products`

**Request Body:**
```json
{
    "name": "Laptop",
    "category": "Electronics",
    "price": 60000,
    "stock": 10
}
```

**Response (`201 Created`):**
```json
{
    "success": true,
    "message": "Product created successfully",
    "data": {
        "id": 1,
        "name": "Laptop",
        "category": "Electronics",
        "price": "60000.00",
        "stock": 10,
        "createdAt": "2026-10-05T08:21:41.262Z",
        "updatedAt": "2026-10-05T08:21:41.262Z"
    }
}
```

---

#### 3. Get All Products
`GET /api/products`

**Response (`200 OK`):**
```json
{
    "success": true,
    "count": 6,
    "data": [
        {
            "id": 1,
            "name": "Laptop",
            "category": "Electronics",
            "price": "60000.00",
            "stock": 10,
            "createdAt": "2026-10-05T08:21:41.262Z",
            "updatedAt": "2026-10-05T08:21:41.262Z"
        }
    ]
}
```

---

#### 4. Search by Category (Bonus Feature)
`GET /api/products?category=Electronics`

Performs case-insensitive category searching using Sequelize `Op.iLike`.

**Response (`200 OK`):**
```json
{
    "success": true,
    "count": 4,
    "data": [ ... ]
}
```

---

#### 5. Sort Products by Price (Bonus Feature)
`GET /api/products?sort=price` (Ascending)  
`GET /api/products?sort=price&order=desc` (Descending)

**Response (`200 OK`):**
```json
{
    "success": true,
    "count": 6,
    "data": [ ... ]
}
```

---

#### 6. Combined Query Filtering & Sorting
`GET /api/products?category=Electronics&sort=price`

Combines category filtering and ascending price sorting seamlessly.

---

#### 7. Update Product Price
`PUT /api/products/1`

**Request Body:**
```json
{
    "price": 65000
}
```

**Response (`200 OK`):**
```json
{
    "success": true,
    "message": "Product updated successfully",
    "data": {
        "id": 1,
        "name": "Laptop",
        "category": "Electronics",
        "price": 65000,
        "stock": 10,
        "createdAt": "2026-10-05T08:21:41.262Z",
        "updatedAt": "2026-10-05T08:27:43.357Z"
    }
}
```

---

#### 8. Delete Product
`DELETE /api/products/1`

**Response (`200 OK`):**
```json
{
    "success": true,
    "message": "Product deleted successfully"
}
```

---

#### 9. Validation Error Response
`POST /api/products` with invalid data:
```json
{
    "name": "",
    "category": "",
    "price": -500,
    "stock": -10
}
```

**Response (`400 Bad Request`):**
```json
{
    "success": false,
    "message": "Validation failed",
    "errors": [
        "Product name is required",
        "Category is required",
        "Price cannot be negative",
        "Stock cannot be negative"
    ]
}
```

---

#### 10. Product Not Found Response
`GET /api/products/9999`

**Response (`404 Not Found`):**
```json
{
    "success": false,
    "message": "Product not found"
}
```

---

## 🧪 Postman Collection & Automated Testing

### How to Import and Test
1. Open **Postman**.
2. Click **Import** and select:
   - `postman/Shopping-Product-DB-API.postman_collection.json`
   - `postman/Shopping-Product-DB-API.postman_environment.json`
3. Select the environment **Shopping Database API Local**.
4. Run the Collection runner or individual requests.

### Automatic Variable Capture
When running `Create Product`, Postman automatically captures the generated product ID using test scripts:
```javascript
const response = pm.response.json();
if (response.data && response.data.id) {
    pm.environment.set("productId", response.data.id);
}
```
Subsequent `GET`, `PUT`, and `DELETE` requests automatically use `{{productId}}`.

---

## 🔍 Database Verification using pgAdmin / SQL

While the Node.js application uses **Sequelize ORM**, you can verify table contents directly in **pgAdmin** or `psql` using standard SQL:

### 1. View All Products
```sql
SELECT * FROM products;
```

### 2. Count Total Products
```sql
SELECT COUNT(*) FROM products;
```

### 3. Search Products by Category (Case-Insensitive)
```sql
SELECT * FROM products WHERE category ILIKE '%electronics%';
```

### 4. Sort Products by Price Ascending
```sql
SELECT * FROM products ORDER BY price ASC;
```

---

## 🎓 Academic Viva Questions & Concepts Guide

### Q1: What is Sequelize ORM and why use it instead of raw SQL queries?
> **Answer:** Sequelize is a promise-based Object-Relational Mapper (ORM) for Node.js. It maps database tables to JavaScript objects/models. Using an ORM abstracts SQL queries into JavaScript methods (`create`, `findAll`, `update`, `destroy`), prevents SQL injection, enforces schema validation at the code level, and simplifies cross-database migrations.

### Q2: What is a Model in Sequelize and what does `sequelize.define()` do?
> **Answer:** A Model represents a table in the database. `sequelize.define('Product', attributes, options)` defines the model schema, specifies data types (`INTEGER`, `STRING`, `DECIMAL`), primary keys, auto-increment rules, table name (`products`), timestamp tracking, and validation constraints.

### Q3: What is the purpose of `sequelize.authenticate()` and `sequelize.sync()`?
> **Answer:** 
> - `sequelize.authenticate()` tests the connection to PostgreSQL by trying to connect to the database host.
> - `sequelize.sync()` synchronizes defined Sequelize models with the database tables. If the `products` table does not exist in PostgreSQL, Sequelize automatically creates it according to model attributes.

### Q4: Explain the difference between `findAll()`, `findByPk()`, `create()`, `update()`, and `destroy()`.
> - `Product.findAll()`: Executes `SELECT * FROM products` and returns an array of product objects. Supports `where` filtering and `order` sorting.
> - `Product.findByPk(id)`: Executes `SELECT * FROM products WHERE id = <id>` to retrieve a single record by primary key.
> - `Product.create(data)`: Executes `INSERT INTO products ...` to create a new product.
> - `product.save()` / `product.update(data)`: Executes `UPDATE products SET ... WHERE id = <id>`.
> - `product.destroy()`: Executes `DELETE FROM products WHERE id = <id>`.

### Q5: What role do `pg` and `pg-hstore` packages play?
> **Answer:** 
> - `pg`: The official PostgreSQL client library for Node.js. Sequelize uses `pg` internally to establish TCP socket connections with PostgreSQL.
> - `pg-hstore`: A module for serializing and deserializing JSON/Key-Value data to Postgres `hstore` format.

---

## 📝 License
This project is built for **B.Tech DevOps & FullStack Practical Lab Submission & Viva Evaluation**.
