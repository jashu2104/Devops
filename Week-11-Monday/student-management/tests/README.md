# Testing Documentation — College Student Management System

This directory documents the comprehensive testing strategy for **Assignment 11.1.1: College Student Management System — Integration Testing & CI/CD**.

---

## 🏗️ Testing Architecture Overview

The testing suite consists of two complementary layers:

1. **Unit Testing Layer (Isolated)**:
   - **Backend Unit Tests** (`backend/tests/student.unit.test.js`): Uses Jest and Supertest with mock implementations of `StudentModel` to thoroughly validate input requirements, sanitization, HTTP status code mapping (400, 404, 409), and business constraints without requiring a running database.
   - **Frontend Unit Tests** (`frontend/src/tests/frontend.test.jsx`): Uses Vitest and React Testing Library to verify component rendering (Header, StudentList, StudentForm, Loading), user inputs, form validation, and error alert handling when API calls fail.

2. **Integration Testing Layer (Persistent)**:
   - **Backend Integration Tests** (`backend/tests/student.integration.test.js`): Uses Supertest to send HTTP requests through Express routes and controllers directly into a dedicated PostgreSQL test database (`student_management_test`).
   - Verifies the complete end-to-end request lifecycle:
     ```text
     HTTP Client (Supertest)
             ↓
     Express Routes (/api/students)
             ↓
     Student Controller
             ↓
     Database Access Layer (StudentModel)
             ↓
     PostgreSQL Test Database (student_management_test)
     ```

---

## 🧪 Mandatory Integration Test Cases

| Test Case | Method & Endpoint | Description | Verification Criteria |
|---|---|---|---|
| **Case 1** | `POST /api/students` | Register Student | HTTP 201, `success: true`, returns student data, record persisted in PostgreSQL |
| **Case 2** | `GET /api/students` & `GET /api/students/:id` | Retrieve Students | HTTP 200, JSON array containing registered student roll number (`CSE101`), retrieve by ID returns 200 |
| **Case 3** | `PUT /api/students/:id` | Update Student | HTTP 200, returns updated name/branch (`Rahul Reddy`, `AIML`), subsequent GET returns updated data |
| **Case 4** | `DELETE /api/students/:id` | Delete Student | HTTP 200, success message, record completely removed from PostgreSQL |
| **Case 5** | `GET /api/students/:id` | Verify Deleted Student | HTTP 404 Not Found, `success: false`, message `Student not found` |
| **Case 6** | Validation Cases | Reject Invalid Data | HTTP 400 for empty fields, HTTP 400 for non-numeric ID, HTTP 409 for duplicate roll numbers |
| **Case 7** | Multi-Request Flow | Database Persistence | POST creates student; independent GET confirms record was stored in and retrieved from PostgreSQL |

---

## ⚡ Execution Commands

### Run Backend Unit Tests
```bash
cd backend
npm run test:unit
```

### Run Backend Integration Tests
```bash
cd backend
npm run test:integration
```

### Run Backend Test Coverage
```bash
cd backend
npm run test:coverage
```

### Run Frontend Unit Tests
```bash
cd frontend
npm test
```

### Build Frontend for Production
```bash
cd frontend
npm run build
```

---

## 🛡️ Database Isolation & Safety

- Integration tests execute against a dedicated test database (`student_management_test`).
- `beforeAll` runs table migrations and cleans residual records.
- `afterAll` clears test records and closes the database connection pool (`closePool()`) to prevent resource leaks.
- Production and development databases are never touched during integration tests.
