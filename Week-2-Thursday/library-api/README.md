# Library Book Management REST API

**Course:** DEVOPS AND FULLSTACK  
**Course Code:** 23CS102PE405  
**Practical:** LAB PRACTICAL-02  
**Scenario:** Library Book Management System — RESTful CRUD APIs  

---

## 📖 Overview

The **Library Book Management System** is a complete, lightweight, RESTful CRUD API built using Node.js and Express.js. Designed specifically for university lab practicals and viva examinations, this application demonstrates core backend concepts without over-engineering or external database dependencies. It uses an **in-memory JavaScript array** as a data store.

---

## 🎯 Objectives

- Develop RESTful APIs for book management (Create, Read, Update, Delete).
- Implement input validation and error handling with standard HTTP status codes.
- Support auto-incrementing ID generation and duplicate ISBN prevention.
- Handle edge cases like unavailable books (`available: false`) gracefully.
- Provide a full testing workflow with Postman.

---

## 🛠️ Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Dev Tool:** Nodemon (automatic server restarts during development)
- **Language:** JavaScript (ES6+)
- **API Client:** Postman / cURL

---

## 📁 Project Structure

```text
library-api/
│
├── routes/
│   └── books.js       # In-memory data store and CRUD route handlers
│
├── server.js          # Express app initialisation, middleware, server listener
├── package.json       # Dependencies and run scripts
├── .gitignore         # Ignored files (node_modules, logs)
└── README.md          # Practical documentation & Postman testing guide
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure [Node.js](https://nodejs.org/) (v14+) is installed on your machine.

### 2. Installation
Navigate to the project root and install dependencies:

```bash
cd library-api
npm install
```

### 3. Running the Server

- **Development Mode (with Nodemon auto-reload):**
  ```bash
  npm run dev
  ```

- **Production Mode:**
  ```bash
  npm start
  ```

The server will start at:
```text
http://localhost:5000
```

---

## 🏗️ REST API Architecture

```text
                  Client
                    │
                    ▼
                 Postman
                    │
                    ▼
              HTTP Request
                    │
                    ▼
             Express Server (server.js)
                    │
                    ▼
             Books Router (routes/books.js)
                    │
                    ▼
             CRUD Operations
                    │
                    ▼
            In-Memory Array (books)
                    │
                    ▼
              JSON Response
```

---

## 🔄 CRUD Mapping

| Operation | HTTP Method | Endpoint | Description | Status Code |
|---|---|---|---|---|
| **CREATE** | `POST` | `/books` | Add a new book to the library | `201 Created` |
| **READ** | `GET` | `/books` | Retrieve all books (supports `?available=true/false`) | `200 OK` |
| **READ** | `GET` | `/books/:id` | Retrieve a single book by ID | `200 OK` |
| **UPDATE** | `PUT` | `/books/:id` | Update an existing book's details | `200 OK` |
| **DELETE** | `DELETE` | `/books/:id` | Remove a book from the library | `200 OK` |

---

## 📡 API Endpoints & Specification

### 1. Get All Books
- **Method:** `GET`
- **URL:** `http://localhost:5000/books`
- **Optional Query Parameter:** `?available=true` or `?available=false`
- **Success Response (200 OK):**
```json
{
    "success": true,
    "count": 3,
    "data": [
        {
            "id": 1,
            "title": "Clean Code",
            "author": "Robert C. Martin",
            "isbn": "9780132350884",
            "price": 650,
            "available": true
        },
        {
            "id": 2,
            "title": "The Pragmatic Programmer",
            "author": "Andrew Hunt",
            "isbn": "9780135957059",
            "price": 800,
            "available": true
        },
        {
            "id": 3,
            "title": "Introduction to Algorithms",
            "author": "Thomas H. Cormen",
            "isbn": "9780262046305",
            "price": 1200,
            "available": false
        }
    ]
}
```

---

### 2. Get Book by ID
- **Method:** `GET`
- **URL:** `http://localhost:5000/books/1`
- **Success Response (200 OK - Available):**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "title": "Clean Code",
        "author": "Robert C. Martin",
        "isbn": "9780132350884",
        "price": 650,
        "available": true
    }
}
```

- **Success Response (200 OK - Unavailable Book):**
```json
{
    "success": true,
    "message": "Book is currently unavailable",
    "data": {
        "id": 3,
        "title": "Introduction to Algorithms",
        "author": "Thomas H. Cormen",
        "isbn": "9780262046305",
        "price": 1200,
        "available": false
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

- **Error Response (400 Bad Request):**
```json
{
    "success": false,
    "message": "Book ID must be a valid positive integer"
}
```

---

### 3. Add New Book
- **Method:** `POST`
- **URL:** `http://localhost:5000/books`
- **Header:** `Content-Type: application/json`
- **Request Body:**
```json
{
    "title": "Database System Concepts",
    "author": "Abraham Silberschatz",
    "isbn": "9780078022159",
    "price": 950,
    "available": true
}
```
- **Success Response (201 Created):**
```json
{
    "success": true,
    "message": "Book added successfully",
    "data": {
        "id": 4,
        "title": "Database System Concepts",
        "author": "Abraham Silberschatz",
        "isbn": "9780078022159",
        "price": 950,
        "available": true
    }
}
```
- **Validation Error Response (400 Bad Request):**
```json
{
    "success": false,
    "message": "Invalid book data",
    "errors": [
        "Title is required",
        "Author is required",
        "ISBN is required",
        "Price must be greater than or equal to 0"
    ]
}
```
- **Duplicate ISBN Error Response (409 Conflict):**
```json
{
    "success": false,
    "message": "A book with this ISBN already exists"
}
```

---

### 4. Update Book
- **Method:** `PUT`
- **URL:** `http://localhost:5000/books/1`
- **Header:** `Content-Type: application/json`
- **Request Body:**
```json
{
    "title": "Clean Code - Updated Edition",
    "author": "Robert C. Martin",
    "isbn": "9780132350884",
    "price": 700,
    "available": true
}
```
- **Success Response (200 OK):**
```json
{
    "success": true,
    "message": "Book updated successfully",
    "data": {
        "id": 1,
        "title": "Clean Code - Updated Edition",
        "author": "Robert C. Martin",
        "isbn": "9780132350884",
        "price": 700,
        "available": true
    }
}
```

---

### 5. Delete Book
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/books/2`
- **Success Response (200 OK):**
```json
{
    "success": true,
    "message": "Book deleted successfully"
}
```

---

## 🚦 HTTP Status Codes Summary

- `200 OK`: Successful GET, PUT, DELETE requests.
- `201 Created`: Successful POST request (new resource created).
- `400 Bad Request`: Validation failure or invalid ID parameter (e.g. non-numeric ID).
- `404 Not Found`: Requested book ID does not exist in the array.
- `409 Conflict`: Attempted to insert or update a book with a duplicate ISBN.
- `500 Internal Server Error`: Server-side runtime errors (handled gracefully).

---

## 🧪 Postman Testing Guide

### Standard Test Workflow

1. **GET All Books**
   - **Method:** `GET`
   - **URL:** `http://localhost:5000/books`
   - **Expected Code:** `200 OK`

2. **GET Book by ID**
   - **Method:** `GET`
   - **URL:** `http://localhost:5000/books/1`
   - **Expected Code:** `200 OK`

3. **CREATE Book**
   - **Method:** `POST`
   - **URL:** `http://localhost:5000/books`
   - **Headers:** `Content-Type: application/json`
   - **Body (raw JSON):**
     ```json
     {
         "title": "Operating Systems",
         "author": "Abraham Silberschatz",
         "isbn": "9781119456339",
         "price": 850,
         "available": true
     }
     ```
   - **Expected Code:** `201 Created`

4. **UPDATE Book**
   - **Method:** `PUT`
   - **URL:** `http://localhost:5000/books/1`
   - **Body (raw JSON):**
     ```json
     {
         "title": "Clean Code Updated",
         "author": "Robert C. Martin",
         "isbn": "9780132350884",
         "price": 750,
         "available": true
     }
     ```
   - **Expected Code:** `200 OK`

5. **DELETE Book**
   - **Method:** `DELETE`
   - **URL:** `http://localhost:5000/books/2`
   - **Expected Code:** `200 OK`

---

### Error & Edge Case Postman Tests

| Test Case | Method | URL | Body / Details | Expected Status |
|---|---|---|---|---|
| **Nonexistent Book** | `GET` | `http://localhost:5000/books/9999` | None | `404 Not Found` |
| **Invalid ID** | `GET` | `http://localhost:5000/books/abc` | None | `400 Bad Request` |
| **Invalid POST Data** | `POST` | `http://localhost:5000/books` | `{"title":"","price":-100}` | `400 Bad Request` |
| **Duplicate ISBN** | `POST` | `http://localhost:5000/books` | ISBN `9780132350884` | `409 Conflict` |
| **Unavailable Book** | `GET` | `http://localhost:5000/books/3` | None | `200 OK` (`"available": false`) |

---

### ⚙️ Postman Environment Configuration

Create an environment named `Library API Local` in Postman with the following variables:

| Variable | Initial Value | Current Value |
|---|---|---|
| `baseUrl` | `http://localhost:5000` | `http://localhost:5000` |
| `bookId` | `1` | `1` |

Use URL format in Postman:
- `{{baseUrl}}/books`
- `{{baseUrl}}/books/{{bookId}}`

---

### 🧪 Automated Postman Test Scripts

Add these scripts under the **Tests** tab of your Postman requests:

#### For `GET`, `PUT`, `DELETE`:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response indicates success", function () {
    const data = pm.response.json();
    pm.expect(data.success).to.eql(true);
});
```

#### For `POST` (Creation):
```javascript
pm.test("Status code is 201 Created", function () {
    pm.response.to.have.status(201);
});

pm.test("Book contains generated ID", function () {
    const data = pm.response.json();
    pm.expect(data.data).to.have.property("id");
});
```

---

## 🎓 Viva Questions & Key Concepts

1. **What is Node.js?**
   - Node.js is a server-side JavaScript runtime environment built on Chrome's V8 JavaScript engine.

2. **What is Express.js?**
   - Express.js is a minimal and flexible Node.js web application framework that simplifies HTTP routing and request handling.

3. **What is a REST API?**
   - Representational State Transfer (REST) is an architectural style for designing networked applications using standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).

4. **What is the role of `express.json()`?**
   - It is a built-in middleware in Express that parses incoming requests with JSON payloads and populates `req.body`.

5. **What is Express Router?**
   - `express.Router()` creates modular, mountable route handlers. In this project, `routes/books.js` defines endpoints relative to `/books`.

6. **What is `req.params` vs `req.body` vs `req.query`?**
   - `req.params`: Route parameters captured from URL paths (e.g., `:id` in `/books/1`).
   - `req.body`: Data sent in the request body (e.g., JSON payload in `POST`/`PUT`).
   - `req.query`: Query parameters appended to URL (e.g., `?available=true`).

7. **Why use an in-memory array for this practical?**
   - It provides temporary state management without requiring database installation or complex ORM configuration, keeping the focus strictly on REST principles.
