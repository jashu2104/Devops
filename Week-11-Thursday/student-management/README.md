# College Student Management System — Integration Testing

### B.Tech DEVOPS AND FULLSTACK Lab Assignment 11.1.1
- **Course Name:** DEVOPS AND FULLSTACK
- **Course Code:** 23CS102PE405
- **Assignment:** 11.1.1 — College Student Management System: Integration Testing & CI/CD
- **Architecture:** Full-Stack Architecture (React + Vite + Node.js + Express + PostgreSQL + Jest + Supertest + GitHub Actions)

---

## 1. Project Objective

In modern software engineering, individual software units (like controllers or React components) may function in isolation during unit testing, but can still fail when interacting across process and network boundaries. 

The objective of **Assignment 11.1.1** is to design, implement, and automate a comprehensive **Integration Testing Suite** and an end-to-end **Continuous Integration (CI) Pipeline** for the College Student Management System.

Integration testing verifies:
1. Seamless communication across the complete request-response cycle: **Client / REST API → Express Router → Controller → Data Model → PostgreSQL Database**.
2. Persistence guarantees: Ensuring that records created, updated, and deleted through API calls are directly and accurately mutated in the underlying database table, and that database transactions and constraints (such as unique roll numbers) are respected.
3. Correct HTTP status codes and standard JSON error envelopes for valid, invalid, duplicate, and not-found requests.
4. Continuous automated validation in GitHub Actions, preventing regressions from reaching production.

---

## 2. System Architecture

```text
 ┌────────────────────────────────────────────────────────┐
 │                   React Client SPA                     │
 │          (Vite + React 19 + React Router 7)            │
 └───────────────────────────┬────────────────────────────┘
                             │
                             │ HTTP JSON Requests (fetch)
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │                 Express REST API Server                │
 │    - CORS & express.json() Middleware                  │
 │    - Route Layer: /api/students, /api/health           │
 │    - Controller: Request Validation & Error Handling   │
 └───────────────────────────┬────────────────────────────┘
                             │
                             │ Parameterized SQL Queries
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │                 Data Access Layer (pg)                 │
 │       studentModel.js & PostgreSQL Connection Pool     │
 └───────────────────────────┬────────────────────────────┘
                             │
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │               PostgreSQL Database Engine               │
 │           (student_management / _test)                 │
 └────────────────────────────────────────────────────────┘
```

The application initialization is cleanly decoupled:
- `backend/app.js`: Configures Express middleware, routes, and error handling, exporting the Express application object. This enables Supertest to run fast, in-process HTTP integration tests without spawning a separate listening socket.
- `backend/server.js`: Imports `app.js`, verifies database connectivity, applies schema creation, starts the listening HTTP server on port 5000, and manages graceful shutdowns.

---

## 3. Technologies Used

| Category | Technology | Purpose |
|---|---|---|
| **Frontend** | React 19, Vite 6, React Router 7 | Responsive single-page client interface |
| **Frontend Testing** | Vitest, React Testing Library, JSDOM | Component unit tests and DOM assertion |
| **Backend** | Node.js (v20+ / v24), Express 4 | RESTful API server & routing |
| **Database** | PostgreSQL 15+, `pg` (node-postgres) | Persistent relational storage & constraints |
| **Backend Testing** | Jest 29, Supertest 7 | Unit testing, HTTP integration testing, coverage |
| **DevOps & CI/CD** | GitHub Actions, Git | Automated multi-stage CI pipeline with PostgreSQL container |

---

## 4. Project Directory Structure

```text
student-management/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConfirmModal.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── StudentCard.jsx
│   │   │   ├── StudentDetails.jsx
│   │   │   ├── StudentFilters.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   └── StudentList.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   └── studentApi.js
│   │   ├── tests/
│   │   │   └── frontend.test.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── setupTests.js
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.example
│   └── .gitignore
│
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── studentController.js
│   ├── models/
│   │   └── studentModel.js
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── tests/
│   │   ├── student.unit.test.js
│   │   └── student.integration.test.js
│   ├── app.js
│   ├── server.js
│   ├── jest.config.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── tests/
│   └── README.md
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── .gitignore
└── README.md
```

---

## 5. Environment Configuration

### Backend Configuration (`backend/.env`):
Create `backend/.env` using `backend/.env.example`:

```env
# Backend HTTP Port
PORT=5000

# Backend Bind Host (127.0.0.1 avoids macOS AirPlay Receiver port 5000 collision)
HOST=127.0.0.1

# Production / Development PostgreSQL Database Connection URL
DATABASE_URL=postgresql://postgres:password@localhost:5432/student_management

# Dedicated Integration Test Database Connection URL
TEST_DATABASE_URL=postgresql://postgres:password@localhost:5432/student_management_test
```

> **Security Note:** Real database credentials are never committed to version control. Production and test databases are completely separated so test suites never touch production data.

---

## 6. Installation & Local Setup

### Prerequisites
- Node.js (v20 LTS or higher)
- PostgreSQL (v14 or higher) running locally on port 5432

### Step 1: Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Prepare Databases
```bash
# Connect to PostgreSQL and create development and test databases
psql -U postgres -c "CREATE DATABASE student_management;"
psql -U postgres -c "CREATE DATABASE student_management_test;"
```

---

## 7. Running the Application Locally

### Run Backend Server
```bash
cd backend
npm start
```
*The backend server connects to PostgreSQL, ensures the `students` table exists, and starts listening at `http://127.0.0.1:5000`.*

### Run Frontend Development Server
```bash
cd frontend
npm run dev
```
*The Vite frontend starts at `http://localhost:5173` with real-time API proxying to `http://127.0.0.1:5000`.*

---

## 8. REST API Specification

### Student Data Model
```json
{
  "id": 1,
  "name": "Rahul",
  "rollNo": "CSE101",
  "branch": "CSE"
}
```

### Database Schema (PostgreSQL)
```sql
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  roll_no VARCHAR(30) UNIQUE NOT NULL,
  branch VARCHAR(50) NOT NULL
);
```

### Endpoints Overview

| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `GET` | `/api/health` | Health-check endpoint verifying API server status | `200` |
| `GET` | `/api/students` | Retrieve all student records ordered by ID | `200`, `500` |
| `GET` | `/api/students/:id` | Retrieve single student by numeric ID | `200`, `400`, `404`, `500` |
| `POST` | `/api/students` | Register a new student record | `201`, `400`, `409`, `500` |
| `PUT` | `/api/students/:id` | Update existing student record by ID | `200`, `400`, `404`, `409`, `500` |
| `DELETE` | `/api/students/:id` | Delete student record by ID | `200`, `400`, `404`, `500` |

### Sample Request & Response Payloads

#### 1. Register Student (`POST /api/students`)
**Request Body:**
```json
{
  "name": "Rahul",
  "rollNo": "CSE101",
  "branch": "CSE"
}
```
**Response (201 Created):**
```json
{
  "success": true,
  "message": "Student registered successfully",
  "data": {
    "id": 1,
    "name": "Rahul",
    "rollNo": "CSE101",
    "branch": "CSE"
  }
}
```

#### 2. Duplicate Roll Number Rejection (`POST /api/students`)
**Response (409 Conflict):**
```json
{
  "success": false,
  "message": "Student with roll number 'CSE101' already exists"
}
```

#### 3. Update Student (`PUT /api/students/1`)
**Request Body:**
```json
{
  "name": "Rahul Reddy",
  "rollNo": "CSE101",
  "branch": "AIML"
}
```
**Response (200 OK):**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": {
    "id": 1,
    "name": "Rahul Reddy",
    "rollNo": "CSE101",
    "branch": "AIML"
  }
}
```

#### 4. Delete Student (`DELETE /api/students/1`)
**Response (200 OK):**
```json
{
  "success": true,
  "message": "Student deleted successfully",
  "data": {
    "id": 1,
    "name": "Rahul Reddy",
    "rollNo": "CSE101",
    "branch": "AIML"
  }
}
```

#### 5. Deleted Student Retrieval (`GET /api/students/1`)
**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Student with ID 1 not found"
}
```

---

## 9. Testing Suite & Commands

### A. Backend Unit Tests
Executes unit tests verifying validation rules and error edge cases in isolation from database queries:
```bash
cd backend
npm run test:unit
```
**Actual Result:**
```text
PASS tests/student.unit.test.js
  Student Input Validation Logic (Unit)
    ✓ 1. Validate correct student input returns null (no error) (1 ms)
    ✓ 2. Reject missing or empty student name (1 ms)
    ✓ 3. Reject missing or empty roll number
    ✓ 4. Reject missing or empty branch
    ✓ 5. Reject invalid student IDs (non-numeric, negative, zero, decimal) (1 ms)
    ✓ 6. Verify student update validation rejects duplicate roll numbers from another student
    ✓ 7. Reject non-object body payload gracefully (1 ms)

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Time:        0.148 s
```

### B. Backend Integration Tests
Executes the full Supertest integration suite against the isolated PostgreSQL test database:
```bash
cd backend
npm run test:integration
```
**Actual Result:**
```text
PASS tests/student.integration.test.js
  Student Management System - Integration Testing
    Health Check API
      ✓ GET /api/health should return running status (11 ms)
    Mandatory Test Cases
      ✓ Test Case 1: POST /api/students should register a new student with status 201 (19 ms)
      ✓ Test Case 2: GET /api/students & GET /api/students/:id should retrieve registered student (4 ms)
      ✓ Test Case 3: PUT /api/students/:id should update registered student and reflect in DB (5 ms)
      ✓ Test Case 4: DELETE /api/students/:id should delete student from database (1 ms)
      ✓ Test Case 5: GET /api/students/:id should return 404 for deleted student (1 ms)
      ✓ Test Case 6: Reject invalid student data (empty fields, duplicates, invalid ID) (10 ms)
      ✓ Test Case 7: Direct Database Persistence verification (3 ms)

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Time:        0.372 s
```

### C. Backend Test Coverage
Generates detailed statement, branch, function, and line coverage metrics:
```bash
cd backend
npm run test:coverage
```
**Actual Coverage Summary:**
```text
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   85.83 |    77.19 |   88.23 |   85.83 |                   
 backend           |      80 |        0 |   33.33 |      80 |                   
  app.js           |      80 |        0 |   33.33 |      80 | 32,40-41          
 ...nd/controllers |   81.33 |    80.85 |     100 |   81.33 |                   
  ...Controller.js |   81.33 |    80.85 |     100 |   81.33 | ...14,229,237,251 
 backend/models    |     100 |       75 |     100 |     100 |                   
  studentModel.js  |     100 |       75 |     100 |     100 | 71-84             
 backend/routes    |     100 |      100 |     100 |     100 |                   
  studentRoutes.js |     100 |      100 |     100 |     100 |                   
-------------------|---------|----------|---------|---------|-------------------
Test Suites: 2 passed, 2 total
Tests:       15 passed, 15 total
```

### D. Frontend Unit Tests
Executes Vitest component tests with React Testing Library:
```bash
cd frontend
npm test
```
**Actual Result:**
```text
 ✓ src/tests/frontend.test.jsx (6 tests) 109ms
   ✓ Frontend Unit Tests (6)
     ✓ 1. Header renders title, course badge, and navigation links correctly 19ms
     ✓ 2. Student list renders student records in table format 9ms
     ✓ 3. Student form displays all input fields and submit button 51ms
     ✓ 4. Required input validation prevents submission when fields are empty 8ms
     ✓ 5. Loading component renders loading spinner and status message 2ms
     ✓ 6. Error message is displayed when API loading fails on Dashboard 18ms

 Test Files  1 passed (1)
      Tests  6 passed (6)
   Duration  842ms
```

### E. Frontend Production Build
Validates Vite production bundle compilation:
```bash
cd frontend
npm run build
```
**Actual Result:**
```text
vite v6.4.5 building for production...
✓ 52 modules transformed.
dist/index.html                   1.09 kB │ gzip:  0.61 kB
dist/assets/index-BcnkaACo.css   18.77 kB │ gzip:  4.21 kB
dist/assets/index-BIxbvNzs.js   285.33 kB │ gzip: 88.82 kB
✓ built in 597ms
```

---

## 10. Failure Scenario Demonstration

As mandated by Section 13 of the assignment, the integration testing suite was tested for failure sensitivity by temporarily altering the API endpoint.

### Phase 1: Inject Failure
In `backend/tests/student.integration.test.js`, the registration endpoint in Test Case 1 was intentionally modified from `/api/students` to `/api/student`:
```diff
- const response = await request(app).post('/api/students').send(student);
+ const response = await request(app).post('/api/student').send(student);
```

### Phase 2: Execution & Captured Failure Output
Running `npm run test:integration` produced immediate test failures and exited with a nonzero status code (`1`):
```text
FAIL tests/student.integration.test.js
  Student Management System - Integration Testing
    Health Check API
      ✓ GET /api/health should return running status (7 ms)
    Mandatory Test Cases
      ✕ Test Case 1: POST /api/students should register a new student with status 201 (6 ms)
      ✕ Test Case 2: GET /api/students & GET /api/students/:id should retrieve registered student (3 ms)
      ✕ Test Case 3: PUT /api/students/:id should update registered student and reflect in DB (2 ms)
      ✕ Test Case 4: DELETE /api/students/:id should delete student from database (1 ms)
      ✕ Test Case 5: GET /api/students/:id should return 404 for deleted student (1 ms)
      ✓ Test Case 6: Reject invalid student data (empty fields, duplicates, invalid ID) (13 ms)
      ✓ Test Case 7: Direct Database Persistence verification (2 ms)

  ● Student Management System - Integration Testing › Mandatory Test Cases › Test Case 1: POST /api/students should register a new student with status 201

    expect(received).toBe(expected) // Object.is equality

    Expected: 201
    Received: 404

      49 |         .send(student);
      50 |
    > 51 |       expect(response.statusCode).toBe(201);
         |                                   ^
      52 |       expect(response.body.success).toBe(true);
      53 |       expect(response.body.data.name).toBe('Rahul');
      54 |       expect(response.body.data.rollNo).toBe('CSE101');

Test Suites: 1 failed, 1 total
Tests:       5 failed, 3 passed, 8 total
```

### Phase 3: Resolution & Verification
The endpoint was immediately restored to `/api/students`:
```diff
- const response = await request(app).post('/api/student').send(student);
+ const response = await request(app).post('/api/students').send(student);
```
Re-running `npm run test:integration` confirmed all 8 tests passed cleanly (Exit Code `0`).

---

## 11. GitHub Actions CI Pipeline

The CI workflow is configured in `.github/workflows/ci.yml`.

### Pipeline Execution Flow
```text
Git Push / Pull Request
          │
          ▼
Checkout Repository
          │
          ▼
Setup Node.js 20 LTS & Cache
          │
          ▼
Install Backend Dependencies (npm ci)
          │
          ▼
Install Frontend Dependencies (npm ci)
          │
          ▼
Launch PostgreSQL 15 Service Container
          │
          ▼
Run Backend Unit Tests (npm run test:unit)
          │
          ▼
Run Frontend Unit Tests (npm test)
          │
          ▼
Start Backend & Poll Health Endpoint (/api/health)
          │
          ▼
Run Backend Integration Tests (npm run test:integration)
          │
          ▼
Build Frontend Production Bundle (npm run build)
          │
          ▼
Generate Backend Coverage Reports (npm run test:coverage)
          │
          ▼
Upload Test Coverage Artifacts (actions/upload-artifact@v4)
          │
          ▼
CI SUCCESS / FAILURE (Exits non-zero on any failure)
```

### Key Workflow Features:
1. **Isolated Service Container:** Spawns a clean `postgres:15` container running with health checks on port 5432.
2. **Deterministic Installs:** Uses `npm ci` with lockfile caching to ensure reproducibility.
3. **Resilient Health Check:** Initiates the server in the background and queries `http://127.0.0.1:5000/api/health` with a 30-second retry loop.
4. **Artifact Retention:** Coverage reports (`coverage/`) are preserved using `actions/upload-artifact@v4` with `if: always()`.

---

## 12. Verification Checklist

- [x] React frontend works with responsive table, mobile cards, search, and modal confirmations.
- [x] Express backend configured with decoupled `app.js` and `server.js`.
- [x] PostgreSQL database integration configured with `pg` pool and schema auto-creation.
- [x] All 5 student CRUD endpoints + health check implemented.
- [x] Backend unit tests pass (7/7 tests).
- [x] Frontend unit tests pass (6/6 tests).
- [x] Backend integration tests pass (8/8 tests).
- [x] Failure demonstration executed and documented.
- [x] Production build generated with Vite (`dist/`).
- [x] Jest test coverage report generated (85.83% statements).
- [x] GitHub Actions workflow `.github/workflows/ci.yml` fully configured.
