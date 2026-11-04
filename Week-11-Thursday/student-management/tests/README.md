# Testing Guide — College Student Management System

This document outlines the testing architecture, suites, execution workflows, and failure demonstration for **Assignment 11.1.1: Integration Testing**.

---

## 1. Testing Architecture Overview

The testing strategy follows a tiered verification pyramid:

```text
                  ┌───────────────────────────────┐
                  │   Frontend Unit Tests         │
                  │   (Vitest + React Testing Lib)│
                  └───────────────┬───────────────┘
                                  │
                                  ▼
                  ┌───────────────────────────────┐
                  │   Backend Unit Tests          │
                  │   (Jest - Validation & Logic) │
                  └───────────────┬───────────────┘
                                  │
                                  ▼
                  ┌───────────────────────────────┐
                  │   Backend Integration Tests   │
                  │   (Jest + Supertest + PG DB)  │
                  └───────────────────────────────┘
```

---

## 2. Test Suites Detailed

### A. Backend Unit Tests (`backend/tests/student.unit.test.js`)
- **Framework:** Jest
- **Isolation:** Fully isolated from the database using `jest.mock('../models/studentModel')`.
- **Coverage:**
  1. Validates standard student object `{ name, rollNo, branch }`.
  2. Rejects missing or whitespace-only student name.
  3. Rejects missing or whitespace-only roll number.
  4. Rejects missing or whitespace-only branch.
  5. Rejects non-numeric, negative, zero, and decimal student IDs.
  6. Rejects duplicate roll numbers when updating an existing student.
  7. Rejects non-object payloads.

### B. Frontend Unit Tests (`frontend/src/tests/frontend.test.jsx`)
- **Framework:** Vitest + React Testing Library + jsdom
- **Isolation:** API network calls mocked with `vi.mock('../services/studentApi')`.
- **Coverage:**
  1. Header renders title, course badge (`23CS102PE405`), and navigation links.
  2. Student list renders student records in responsive table and card layouts.
  3. Student form renders all input fields (`name`, `rollNo`, `branch`) and submit button.
  4. Form validation displays errors when submitting empty fields.
  5. Loading component renders spinner and polite aria-live status message.
  6. Dashboard displays error banner when backend API connection fails.

### C. Backend Integration Tests (`backend/tests/student.integration.test.js`)
- **Framework:** Jest + Supertest
- **Database:** Dedicated PostgreSQL test database (`student_management_test`).
- **Workflow:**
  1. **Before All:** Connects to test database, ensures table schema, and clears existing rows.
  2. **Test 1 (POST /api/students):** Registers student `{ name: "Rahul", rollNo: "CSE101", branch: "CSE" }`, asserts HTTP 201 and created object.
  3. **Test 2 (GET /api/students & GET /api/students/:id):** Retrieves all students and by ID, verifies status 200 and JSON structure.
  4. **Test 3 (PUT /api/students/:id):** Updates record to `{ name: "Rahul Reddy", branch: "AIML" }`, asserts HTTP 200 and verifies updated record in database.
  5. **Test 4 (DELETE /api/students/:id):** Deletes student by ID, asserts HTTP 200 and removal message.
  6. **Test 5 (GET /api/students/:id on deleted):** Asserts HTTP 404 for removed student.
  7. **Test 6 (Validation & Constraints):** Asserts HTTP 400 for empty payloads and invalid IDs; asserts HTTP 409 for duplicate roll numbers on POST and PUT.
  8. **Test 7 (Database Persistence):** Creates student via REST API, queries table directly with `pool.query('SELECT * FROM students WHERE id = $1')`, verifying persistent storage.
  9. **After All:** Cleans test database and releases PostgreSQL connection pool.

---

## 3. Failure Scenario Demonstration

To prove that integration tests detect broken endpoints:

1. **Failure Injection:**
   In `backend/tests/student.integration.test.js`, the endpoint was changed from:
   ```javascript
   request(app).post("/api/students")
   ```
   to an invalid endpoint:
   ```javascript
   request(app).post("/api/student")
   ```
2. **Observed Failure:**
   - Express router caught the unknown route and returned `HTTP 404 Route not found`.
   - Jest assertion `expect(response.statusCode).toBe(201)` failed with:
     ```text
     Expected: 201
     Received: 404
     ```
   - Jest terminated with exit code `1`.
3. **Resolution:**
   - Restored the endpoint to `/api/students`.
   - Re-executed `npm run test:integration`.
   - All 8 tests passed successfully with exit code `0`.

---

## 4. How to Execute Tests Locally

### Backend Unit Tests
```bash
cd backend
npm run test:unit
```

### Backend Integration Tests
```bash
cd backend
npm run test:integration
```

### Backend Coverage Report
```bash
cd backend
npm run test:coverage
```

### Frontend Unit Tests
```bash
cd frontend
npm test
```
