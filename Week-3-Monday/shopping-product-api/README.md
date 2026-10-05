# Online Shopping Product API Testing and Documentation

![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![Express.js](https://img.shields.io/badge/Express.js-v4.19.2-blue.svg)
![Postman](https://img.shields.io/badge/Postman-v10+-orange.svg)
![DevOps](https://img.shields.io/badge/DevOps-Lab_3.1-purple.svg)

A complete, production-quality **Online Shopping Product REST API** and comprehensive **Postman testing suite** built with Node.js and Express.js for B.Tech DevOps and FullStack laboratory coursework.

---

## 1. Assignment Information

- **Course:** DEVOPS AND FULLSTACK
- **Course Code:** 23CS102PE405
- **Assignment:** 3.1
- **Scenario:** Online Shopping Product API Testing and Documentation
- **Project Name:** `shopping-product-api`

---

## 2. Project Architecture & Directory Structure

```text
shopping-product-api/
│
├── controllers/
│   └── productController.js     # REST API CRUD controller logic & validations
│
├── data/
│   └── products.js              # In-memory product dataset
│
├── middleware/
│   └── errorHandler.js          # Centralized Express error handler
│
├── postman/
│   ├── Shopping-Product-API.postman_collection.json   # Exported Postman Collection (v2.1)
│   └── Shopping-Product-API.postman_environment.json  # Exported Postman Environment
│
├── routes/
│   └── productRoutes.js         # Product API route mappings
│
├── .env                         # Environment variables (PORT=5000)
├── .env.example                 # Example environment config
├── .gitignore                   # Git ignore settings
├── app.js                       # Express app configuration & middleware
├── server.js                    # Server entry point & listener
├── package.json                 # Project manifest & dependencies
└── README.md                    # Project documentation & Postman testing guide
```

---

## 3. Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Utility Modules:** `cors`, `dotenv`
- **Development Engine:** `nodemon`
- **Testing & Documentation:** Postman v2.1 Collection & Environment

---

## 4. Getting Started

### Prerequisites

Ensure you have **Node.js** (v14 or higher) installed on your system.

### Step 1: Clone or Navigate to Project

```bash
cd shopping-product-api
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Verify `.env` exists (or copy from `.env.example`):

```bash
cp .env.example .env
```

Default content of `.env`:
```env
PORT=5000
```

### Step 4: Run the Backend Server

Start development mode with automatic reload:

```bash
npm run dev
```

Expected Startup Output:
```text
Shopping Product API running on http://localhost:5000
```

To run in production mode:

```bash
npm start
```

---

## 5. API Summary Table

| Endpoint | Method | Description / Purpose | Success Status | Error Status |
|---|---|---|---|---|
| `/api/health` | `GET` | Health check endpoint | `200 OK` | `500` |
| `/api/products` | `GET` | Retrieve all products | `200 OK` | `500` |
| `/api/products/:id` | `GET` | Retrieve a product by ID | `200 OK` | `400 / 404` |
| `/api/products` | `POST` | Create a new product | `201 Created` | `400 Bad Request` |
| `/api/products/:id` | `PUT` | Update an existing product | `200 OK` | `400 / 404` |
| `/api/products/:id` | `DELETE` | Delete a product by ID | `200 OK` | `400 / 404` |

---

## 6. Detailed API Documentation

---

### 1. Health Check

Checks the operational status of the server.

- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/health`
- **Headers:** None
- **Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Shopping Product API is running"
  }
  ```

---

### 2. Get All Products

Retrieves all available products.

- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/products`
- **Headers:** None
- **Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "count": 5,
    "data": [
      {
        "id": 1,
        "name": "Laptop",
        "category": "Electronics",
        "price": 60000,
        "stock": 10,
        "description": "High-performance laptop for work and study"
      },
      {
        "id": 2,
        "name": "Wireless Headphones",
        "category": "Electronics",
        "price": 2000,
        "stock": 25,
        "description": "Wireless headphones with clear sound"
      }
    ]
  }
  ```

---

### 3. Get Product By ID

Retrieves details for a single product matching the given ID.

- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/products/:id` (e.g. `{{baseUrl}}/api/products/1`)
- **Headers:** None
- **Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "Laptop",
      "category": "Electronics",
      "price": 60000,
      "stock": 10,
      "description": "High-performance laptop for work and study"
    }
  }
  ```
- **Product Not Found (`404 Not Found`):**
  - Example URL: `{{baseUrl}}/api/products/9999`
  ```json
  {
    "success": false,
    "message": "Product not found"
  }
  ```
- **Invalid ID Format (`400 Bad Request`):**
  - Example URL: `{{baseUrl}}/api/products/abc`
  ```json
  {
    "success": false,
    "message": "Product ID must be a valid positive integer"
  }
  ```

---

### 4. Create Product

Adds a new product to the catalog. The `id` is generated automatically.

- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/products`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "Mechanical Keyboard",
    "category": "Electronics",
    "price": 2500,
    "stock": 20,
    "description": "RGB mechanical keyboard"
  }
  ```
- **Success Response (`201 Created`):**
  ```json
  {
    "success": true,
    "message": "Product created successfully",
    "data": {
      "id": 6,
      "name": "Mechanical Keyboard",
      "category": "Electronics",
      "price": 2500,
      "stock": 20,
      "description": "RGB mechanical keyboard"
    }
  }
  ```
- **Validation Failure (`400 Bad Request`):**
  - Request Body:
    ```json
    {
      "name": "",
      "category": "",
      "price": -500,
      "stock": -2
    }
    ```
  - Response:
    ```json
    {
      "success": false,
      "message": "Invalid product data",
      "errors": [
        "Product name is required",
        "Category is required",
        "Price cannot be negative",
        "Stock cannot be negative"
      ]
    }
    ```

---

### 5. Update Product

Updates existing product attributes by ID.

- **Method:** `PUT`
- **URL:** `{{baseUrl}}/api/products/:id` (e.g. `{{baseUrl}}/api/products/1`)
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "Gaming Laptop",
    "category": "Electronics",
    "price": 75000,
    "stock": 8,
    "description": "High-performance gaming laptop"
  }
  ```
- **Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Product updated successfully",
    "data": {
      "id": 1,
      "name": "Gaming Laptop",
      "category": "Electronics",
      "price": 75000,
      "stock": 8,
      "description": "High-performance gaming laptop"
    }
  }
  ```
- **Product Not Found (`404 Not Found`):**
  - Example URL: `{{baseUrl}}/api/products/9999`
  ```json
  {
    "success": false,
    "message": "Product not found"
  }
  ```

---

### 6. Delete Product

Removes a product from the system.

- **Method:** `DELETE`
- **URL:** `{{baseUrl}}/api/products/:id` (e.g. `{{baseUrl}}/api/products/5`)
- **Headers:** None
- **Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Product deleted successfully"
  }
  ```
- **Product Not Found (`404 Not Found`):**
  - Example URL: `{{baseUrl}}/api/products/9999`
  ```json
  {
    "success": false,
    "message": "Product not found"
  }
  ```

---

## 7. CRUD Flow Architecture

```text
CREATE FLOW
[Postman POST Request] ──> [Express Router] ──> [productController.createProduct] ──> [Validation] ──> [Auto ID & Array Push] ──> [201 Created Response]

READ FLOW
[Postman GET Request] ──> [Express Router] ──> [productController.getProducts] ──> [Fetch from Data Store] ──> [200 OK Response]

UPDATE FLOW
[Postman PUT Request] ──> [Express Router] ──> [productController.updateProduct] ──> [Find Product & Validate] ──> [Update Fields] ──> [200 OK Response]

DELETE FLOW
[Postman DELETE Request] ──> [Express Router] ──> [productController.deleteProduct] ──> [Find Index & Splice] ──> [200 OK Response]
```

---

## 8. Postman Import & Setup Guide

### Step 1: Open Postman
Launch the Postman Desktop application or Postman Web Agent.

### Step 2: Import Collection
1. Click **Import** in Postman.
2. Select the exported file: `postman/Shopping-Product-API.postman_collection.json`.
3. Click **Import**.

### Step 3: Import Environment
1. Click **Import** again.
2. Select the exported environment file: `postman/Shopping-Product-API.postman_environment.json`.
3. Click **Import**.

### Step 4: Select Environment
In the upper right corner of Postman, change the environment dropdown from *No Environment* to **Shopping API Local**.

### Step 5: Verify Environment Variables
Ensure the following variables are configured:
- `baseUrl`: `http://localhost:5000`
- `productId`: `1`

### Step 6: Automated Postman Workflow & Product ID Capture
When you run **Create Product** (POST), the collection executes an automated test script:

```javascript
const jsonData = pm.response.json();
if (jsonData.data && jsonData.data.id) {
    pm.environment.set("productId", jsonData.data.id.toString());
}
```

This dynamically saves the newly created product's ID into the environment so subsequent **PUT** and **DELETE** requests execute against the new item automatically!

### Step 7: Run Postman Collection Runner
1. Click on **Online Shopping Product API** collection.
2. Click **Run Collection**.
3. Ensure all requests are selected.
4. Click **Run Online Shopping Product API**.
5. All tests will run sequentially and show `PASS` results for status codes and response schemas.

---

## 9. Viva Voce & Concept Explanation Guide

For lab evaluations and viva examinations, here are plain-English explanations for key concepts:

1. **What is a REST API?**
   Representational State Transfer (REST) is an architectural style for designing web services that interact over HTTP using standard methods (GET, POST, PUT, DELETE) and standard formats like JSON.

2. **What is GET?**
   HTTP GET is a safe and idempotent method used to retrieve data from a server without modifying server state.

3. **What is POST?**
   HTTP POST is used to send data to the server to create a new resource. It returns HTTP status `201 Created` upon success.

4. **What is PUT?**
   HTTP PUT is used to update or replace an existing resource identified by its unique ID.

5. **What is DELETE?**
   HTTP DELETE is used to remove a specified resource from the server.

6. **What is an Endpoint?**
   An endpoint is a specific URL path (e.g. `/api/products/1`) where an API receives requests to perform operations.

7. **What are Headers?**
   Headers carry metadata about the request or response, such as `Content-Type: application/json` which informs Express how to parse incoming data.

8. **What is a Request Body?**
   The payload sent by the client containing data needed to create or update a resource (used in POST and PUT requests).

9. **What is a Response?**
   The JSON data and HTTP status code returned by the Express server after processing a client request.

10. **What is a Status Code?**
    A 3-digit HTTP code indicating the result of a request:
    - `200 OK`: Request succeeded.
    - `201 Created`: Resource successfully created.
    - `400 Bad Request`: Client validation error.
    - `404 Not Found`: Requested resource does not exist.
    - `500 Internal Server Error`: Server error.

11. **What is Postman?**
    Postman is an API platform used by QA and backend engineers to construct, document, test, and automate API requests.

12. **What is an Environment Variable in Postman?**
    A variable (e.g. `{{baseUrl}}`) stored outside the request body that can be reused across multiple requests to prevent hardcoding URLs or IDs.

13. **What is CRUD?**
    An acronym for the four basic operations of persistent storage: **C**reate (`POST`), **R**ead (`GET`), **U**pdate (`PUT`), and **D**elete (`DELETE`).
