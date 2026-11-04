# College Student Management System — Integration Testing

### B.Tech DEVOPS AND FULLSTACK Lab Assignment 11.1.1
- **Course Name:** DEVOPS AND FULLSTACK
- **Course Code:** 23CS102PE405
- **Assignment:** 11.1.1
- **Topic:** Integration Testing & CI/CD Pipeline Automation

---

## 🎯 1. Project Objective

The **College Student Management System** is a full-stack web application designed to manage student records dynamically with persistent database storage, automated unit testing, comprehensive integration testing, and a continuous integration (CI) pipeline.

The primary objective of this assignment is to extend the existing CI pipeline to verify that the **React frontend**, **Express backend REST APIs**, and **PostgreSQL database** work correctly together.

While unit tests verify individual validation routines and isolated functions using mocks, **integration tests** verify the real communication across the entire architectural chain:
1. Student registration via `POST /api/students` with unique roll number enforcement.
2. Student listing via `GET /api/students`.
3. Student details lookup via `GET /api/students/:id`.
4. Student updates via `PUT /api/students/:id`.
5. Student deletion via `DELETE /api/students/:id`.
6. Database persistence verification across independent API transactions.

---

## 🏗️ 2. Architecture Overview

```text
+-------------------+        HTTP JSON REST API         +---------------------+
|   React Client    | <===============================> | Express.js Backend  |
| (Vite + SPA + UI) |                                   | (Routes/Controllers)|
+-------------------+                                   +----------+----------+
                                                                   |
                                                         pg Pool Client Query
                                                                   |
                                                                   v
                                                        +---------------------+
                                                        | PostgreSQL Database |
                                                        |  (students table)   |
                                                        +---------------------+
```

### Complete End-to-End Request Flow:
```text
Browser Client / Supertest
            ↓
  Express Middleware (cors, express.json)
            ↓
  Student Routes (/api/students)
            ↓
  Student Controller (validation & status codes)
            ↓
  Student Model (SQL parameterized queries)
            ↓
  PostgreSQL Database (Persistent Storage)
```

---

## 🛠️ 3. Technologies Used

- **Frontend:** React 19, Vite 6, JavaScript (ES6+), React Router DOM 7, Vanilla CSS design system.
- **Frontend Testing:** Vitest, React Testing Library, jsdom, `@testing-library/jest-dom`.
- **Backend:** Node.js (v20+), Express 4, CORS, dotenv.
- **Database:** PostgreSQL 16 (`pg` Connection Pool), isolated test database (`student_management_test`).
- **Backend Testing:** Jest, Supertest (HTTP integration testing without port binding conflicts).
- **DevOps & CI/CD:** Git, GitHub Actions, Dockerized PostgreSQL 16 Service Container.

---

## 📁 4. Project Structure

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
│   │   │   ├── frontend.test.jsx
│   │   │   └── setup.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
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
│   ├── package.json
│   └── .env.example
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

## ⚙️ 5. Environment Configuration

The backend reads configuration from environment variables. An example template is provided in `backend/.env.example`:

```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/student_management
TEST_DATABASE_URL=postgresql://postgres:password@localhost:5432/student_management_test
```

> **Security Rule:** Never commit real database credentials or `.env` files to git. Use test-only credentials in CI service containers.

---

## 🚀 6. Installation & Run Instructions

### Prerequisites
- Node.js (v20+ recommended)
- PostgreSQL 16 installed and running
- npm (v10+)

### Step 1: Clone and Navigate
```bash
git clone https://github.com/jashu2104/Devops.git
cd Devops/Week-11-Monday/student-management
```

### Step 2: Configure PostgreSQL Databases
Create the local development and test databases:
```bash
psql -U postgres -c "CREATE DATABASE student_management;"
psql -U postgres -c "CREATE DATABASE student_management_test;"
```

### Step 3: Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 4: Run Application Locally

**Start Backend (Port 5000):**
```bash
cd backend
npm start
```
*Health Check:* `http://localhost:5000/api/health`

**Start Frontend (Port 5173):**
```bash
cd frontend
npm run dev
```
*Frontend UI:* `http://localhost:5173`

---

## 📡 7. REST API Documentation

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `GET` | `/health` | Server Health Status | `200` |
| `GET` | `/students` | Retrieve all student records | `200`, `500` |
| `GET` | `/students/:id` | Retrieve single student by ID | `200`, `400`, `404`, `500` |
| `POST` | `/students` | Register a new student | `201`, `400`, `409`, `500` |
| `PUT` | `/students/:id` | Update an existing student | `200`, `400`, `404`, `409`, `500` |
| `DELETE` | `/students/:id` | Delete a student by ID | `200`, `400`, `404`, `500` |

### Sample Payloads & Responses

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
  "message": "Student added successfully",
  "data": {
    "id": 1,
    "name": "Rahul",
    "rollNo": "CSE101",
    "branch": "CSE"
  }
}
```

#### 2. Duplicate Roll Number Rejection
**Response (409 Conflict):**
```json
{
  "success": false,
  "message": "Student with roll number 'CSE101' already exists"
}
```

#### 3. Update Student (`PUT /api/students/:id`)
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

#### 4. Delete Student (`DELETE /api/students/:id`)
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

#### 5. Deleted Student Retrieval (`GET /api/students/:id`)
**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Student not found"
}
```

---

## 🧪 8. Unit Testing

### Backend Unit Tests
Executes unit tests isolated from the database using mock models:
```bash
cd backend
npm run test:unit
```
**Coverage:**
- Health check returns 200
- Valid student registration
- Missing name rejection (400)
- Missing roll number rejection (400)
- Missing branch rejection (400)
- Whitespace-only values rejection (400)
- Duplicate roll number rejection (409)
- Non-numeric ID rejection (400)
- Non-positive ID rejection (400)
- Non-existent student retrieval (404)
- Student update validation & conflicts
- Student deletion validation & 404 handling

### Frontend Unit Tests
Executes React component tests using Vitest and React Testing Library:
```bash
cd frontend
npm test
```
**Coverage:**
- Header renders correctly with branding and navigation
- Student list renders student table rows
- Student form displays all input fields (Name, Roll No, Branch)
- Required field validation prevents submission of empty form
- Loading spinner displays custom loading text
- Error message displays when API is unreachable

---

## 🔬 9. Integration Testing

Supertest sends actual HTTP requests against Express and tests real persistence in the PostgreSQL test database (`student_management_test`).

```bash
cd backend
npm run test:integration
```

### Verification Flow
```text
START
  |
  v
Prepare Test Database (initDb & clear table)
  |
  v
POST /api/students (Case 1: Register)
  |
  v
Verify HTTP 201 & Database Persistence
  |
  v
GET /api/students (Case 2: List Students)
  |
  v
Verify Registered Student Exists
  |
  v
GET /api/students/:id (Case 2: Student Details)
  |
  v
PUT /api/students/:id (Case 3: Update Student)
  |
  v
Verify HTTP 200 & Updated Database Record
  |
  v
DELETE /api/students/:id (Case 4: Delete Student)
  |
  v
GET /api/students/:id (Case 5: Verify 404)
  |
  v
Validation Checks (Case 6: Empty fields 400, Duplicate 409, Invalid ID 400)
  |
  v
Multi-Call Verification (Case 7: DB Persistence)
  |
  v
Clean Up & Close Database Pool
  |
  v
END
```

---

## ⚠️ 10. Failure Scenario Demonstration

As mandated by Section 13 of the assignment, the integration test suite was verified to catch incorrect API endpoints and fail gracefully with non-zero exit code.

### Step 1: Temporarily Intentionally Altered Endpoint
The integration test was temporarily changed:
```diff
- const response = await request(app).post("/api/students").send(student);
+ const response = await request(app).post("/api/student").send(student);
```

### Step 2: Observed Test Failure Output
```text
FAIL tests/student.integration.test.js
  ● Student REST API & PostgreSQL Integration Tests › Test Case 1: Register Student (POST /api/students) › should successfully create a new student and persist in PostgreSQL

    expect(received).toBe(expected) // Object.is equality

    Expected: 201
    Received: 404

      33 |         .send(student);
      34 |
    > 35 |       expect(response.statusCode).toBe(201);
         |                                   ^
      36 |       expect(response.headers['content-type']).toMatch(/json/);

Test Suites: 1 failed, 1 total
Tests:       6 failed, 4 passed, 10 total
Snapshots:   0 total
Time:        0.423 s
Exit Code:   1 (Process terminated with error)
```

### Step 3: Endpoint Restored & Verification
The endpoint was restored to `/api/students`. Upon re-running `npm run test:integration`:
```text
PASS tests/student.integration.test.js
  Student REST API & PostgreSQL Integration Tests
    ✓ Test Case 1: Register Student (POST /api/students) (19 ms)
    ✓ Test Case 2: Retrieve Students (GET /api/students & GET /api/students/:id) (5 ms)
    ✓ Test Case 3: Update Student (PUT /api/students/:id) (3 ms)
    ✓ Test Case 4: Delete Student (DELETE /api/students/:id) (5 ms)
    ✓ Test Case 5: Verify Deleted Student (GET /api/students/:id -> 404) (1 ms)
    ✓ Test Case 6: Reject Invalid Student Data (5 ms)
    ✓ Test Case 7: Database Persistence Verification (3 ms)

Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        0.317 s
Exit Code:   0 (SUCCESS)
```

---

## 🔄 11. GitHub Actions CI Pipeline

The CI workflow is defined in `.github/workflows/ci.yml`. It runs automatically on `push` and `pull_request` to `main`.

### Pipeline Stages
```text
Git Push / Pull Request
          |
          v
Checkout Repository (actions/checkout@v4)
          |
          v
Setup Node.js 20.x & npm cache (actions/setup-node@v4)
          |
          v
Install Backend Dependencies (npm ci)
          |
          v
Install Frontend Dependencies (npm ci)
          |
          v
PostgreSQL Service Container Ready (postgres:16-alpine)
          |
          v
Run Backend Unit Tests (npm run test:unit) -> PASS (19 tests)
          |
          v
Run Frontend Unit Tests (npm test) -> PASS (6 tests)
          |
          v
Start Backend & Health Check Retry Loop (GET /api/health)
          |
          v
Run Backend Integration Tests (npm run test:integration) -> PASS (10 tests)
          |
          v
Build Frontend Production Bundle (npm run build) -> dist/
          |
          v
Generate Backend Coverage (npm run test:coverage) -> >92% Statements
          |
          v
Upload Test Reports & Build Artifacts (actions/upload-artifact@v4)
          |
          v
CI PIPELINE SUCCESS
```

---

## 📊 12. Actual Test Results & Coverage

### Backend Unit Test Results
```text
PASS tests/student.unit.test.js
  Student Backend Unit Tests (Isolated with Mocks)
    Health Check Endpoint
      ✓ should return 200 and health message (14 ms)
    Student Registration Validation (POST /api/students)
      ✓ 1. should register a valid student successfully (12 ms)
      ✓ 2. should reject student registration when name is missing (2 ms)
      ✓ 3. should reject student registration when roll number is missing (1 ms)
      ✓ 4. should reject student registration when branch is missing (1 ms)
      ✓ 5. should reject student registration with empty or whitespace-only fields (1 ms)
      ✓ 6. should reject student registration when roll number already exists (409) (1 ms)
    Student Retrieval & ID Validation (GET /api/students/:id)
      ✓ should reject invalid non-numeric student ID (1 ms)
      ✓ should reject non-positive student ID (0 or negative) (1 ms)
      ✓ should return 404 when student does not exist (1 ms)
      ✓ should return 200 with student data when student exists
    Student Update Validation (PUT /api/students/:id)
      ✓ should reject update with invalid ID (1 ms)
      ✓ should return 404 when updating non-existent student (1 ms)
      ✓ should reject update with missing fields (1 ms)
      ✓ should reject update if new roll number belongs to another student (409) (1 ms)
      ✓ should update successfully when valid data is provided
    Student Deletion (DELETE /api/students/:id)
      ✓ should reject delete with invalid ID
      ✓ should return 404 when deleting non-existent student (1 ms)
      ✓ should return 200 when deleting existing student (1 ms)

Test Suites: 1 passed, 1 total
Tests:       19 passed, 19 total
Snapshots:   0 total
Time:        0.41 s
```

### Backend Integration Test Results
```text
PASS tests/student.integration.test.js
  Student REST API & PostgreSQL Integration Tests
    Test Case 1: Register Student (POST /api/students)
      ✓ should successfully create a new student and persist in PostgreSQL (19 ms)
    Test Case 2: Retrieve Students (GET /api/students & GET /api/students/:id)
      ✓ should retrieve all students and confirm registered student exists (3 ms)
      ✓ should retrieve student details by ID (2 ms)
    Test Case 3: Update Student (PUT /api/students/:id)
      ✓ should update the registered student record in database (3 ms)
    Test Case 4: Delete Student (DELETE /api/students/:id)
      ✓ should delete the student from database and return success message (5 ms)
    Test Case 5: Verify Deleted Student (GET /api/students/:id -> 404)
      ✓ should return 404 Not Found for deleted student (1 ms)
    Test Case 6: Reject Invalid Student Data
      ✓ should reject registration with empty strings (400) (1 ms)
      ✓ should reject duplicate roll numbers (409 Conflict) (3 ms)
      ✓ should reject invalid non-numeric student ID (400) (1 ms)
    Test Case 7: Database Persistence Verification
      ✓ should persist student record in PostgreSQL across independent API calls (3 ms)

Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        0.317 s
```

### Frontend Unit Test Results
```text
✓ src/tests/frontend.test.jsx (6 tests) 86ms
   ✓ Frontend React Unit Tests > 1. Header renders correctly with title, subtitle, and navigation 19ms
   ✓ Frontend React Unit Tests > 2. Student list renders student records in table format 7ms
   ✓ Frontend React Unit Tests > 3. Student form displays all required input fields and buttons 37ms
   ✓ Frontend React Unit Tests > 4. Required input validation works when fields are empty or whitespace 9ms
   ✓ Frontend React Unit Tests > 5. Loading state is displayed with appropriate message 1ms
   ✓ Frontend React Unit Tests > 6. Error message is displayed when API loading fails 13ms

Test Files  1 passed (1)
Tests       6 passed (6)
Duration    906ms
```

### Backend Code Coverage Table
```text
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   92.85 |    87.71 |   86.66 |   92.85 |                   
 backend           |      80 |        0 |   33.33 |      80 |                   
  app.js           |      80 |        0 |   33.33 |      80 | 26,34-35          
 ...nd/controllers |   91.93 |    93.18 |     100 |   91.93 |                   
  ...Controller.js |   91.93 |    93.18 |     100 |   91.93 | 16,52,100,166,205 
 backend/models    |     100 |    81.81 |     100 |     100 |                   
  studentModel.js  |     100 |    81.81 |     100 |     100 | 77-90             
 backend/routes    |     100 |      100 |     100 |     100 |                   
  studentRoutes.js |     100 |      100 |     100 |     100 |                   
-------------------|---------|----------|---------|---------|-------------------
```

### Frontend Production Build Output
```text
dist/index.html                   1.10 kB │ gzip:  0.62 kB
dist/assets/index-BcnkaACo.css   18.77 kB │ gzip:  4.21 kB
dist/assets/index-ClIwSW0S.js   285.33 kB │ gzip: 88.82 kB
✓ built in 588ms
```
