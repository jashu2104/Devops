# College Student Management System

### B.Tech DEVOPS AND FULLSTACK Lab Assignment 10.1.1
- **Course Name:** DEVOPS AND FULLSTACK
- **Course Code:** 23CS102PE405
- **Assignment:** 10.1.1
- **Architecture:** Decoupled Full-Stack Web Application (React + Vite + Node.js + Express)

---

## 📖 1. Project Objective

The **College Student Management System** is a complete full-stack web application designed to manage college student records dynamically. The system provides complete CRUD (Create, Read, Update, Delete) functionality, real-time search, multi-department filtering, dashboard summary metrics, and dedicated student profile detail routing via React Router DOM.

Communication between the React single-page application and the Express backend is achieved using a RESTful API powered by standard JavaScript `fetch()`.

---

## 🛠️ 2. Technology Stack

### Frontend
- **Framework:** React 19 (SPA)
- **Tooling & Bundler:** Vite
- **Language:** JavaScript (ES6+) & JSX
- **Routing:** React Router DOM v7 (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`, `useParams`, `useNavigate`)
- **Styling:** Vanilla CSS with custom modern design system (Indigo/Slate palette)
- **API Client:** Native `fetch()` API centralized in `studentApi.js`

### Backend
- **Runtime:** Node.js
- **Server Framework:** Express 4
- **Middleware:** `cors` (Cross-Origin Resource Sharing), `express.json()` (Body Parsing)
- **Dev Tooling:** `nodemon` (auto server restart on file edit)
- **Data Source:** In-Memory JavaScript Array (`data/students.js`)

---

## 📁 3. Project Folder Structure

```text
college-student-management/
│
├── student-frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx          # Application header & navigation
│   │   │   ├── StudentList.jsx     # Tabular list of student records
│   │   │   ├── StudentCard.jsx     # Mobile card presentation
│   │   │   ├── StudentForm.jsx     # Reusable Add & Update form
│   │   │   ├── StudentDetails.jsx  # Dynamic /students/:id details view
│   │   │   ├── StudentFilters.jsx  # Search & Branch filter inputs
│   │   │   └── Loading.jsx         # Animated loading spinner
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx       # Main dashboard page with metrics
│   │   │   └── NotFound.jsx        # 404 fallback page
│   │   ├── services/
│   │   │   └── studentApi.js       # Centralized REST API fetch service
│   │   ├── App.jsx                 # App routing configuration
│   │   ├── main.jsx                # React root mount point
│   │   └── index.css               # Design system & styles
│   ├── .env                        # Frontend environment variables
│   ├── package.json
│   └── README.md
│
├── student-backend/
│   ├── routes/
│   │   └── studentRoutes.js        # Express route definitions
│   ├── controllers/
│   │   └── studentController.js    # CRUD controller logic & validations
│   ├── data/
│   │   └── students.js             # Initial in-memory student array
│   ├── server.js                   # Express server entry point
│   ├── package.json
│   ├── .env                        # Backend environment configuration
│   └── README.md
│
├── College_Student_Management.postman_collection.json # Postman test suite
└── README.md
```

---

## ⚙️ 4. Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v18.x or later)
- **npm** (v9.x or later)
- Web browser (Chrome, Edge, Firefox, or Safari)
- Optional: Postman or `curl` for API testing

---

## 🚀 5. Installation & Execution Guide

Open two separate terminal windows or tabs.

### Terminal 1 — Start Backend Server
```bash
cd college-student-management/student-backend
npm install
npm run dev
```

**Expected Startup Output:**
```text
Student backend running at http://localhost:5000
```
- Backend Base URL: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`

### Terminal 2 — Start Frontend Application
```bash
cd college-student-management/student-frontend
npm install
npm run dev
```

**Expected Startup Output:**
```text
  VITE v8.x.x  ready in 150 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```
- Open your browser at `http://localhost:5173`

---

## 📡 6. REST API Endpoints & Specifications

Base API URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `GET` | `/api/health` | Backend server health check | `200 OK` |
| `GET` | `/api/students` | Retrieve all student records | `200 OK`, `500 Internal Error` |
| `GET` | `/api/students/:id` | Retrieve single student by ID | `200 OK`, `400 Bad Request`, `404 Not Found` |
| `POST` | `/api/students` | Add a new student | `201 Created`, `400 Bad Request`, `409 Conflict` |
| `PUT` | `/api/students/:id` | Update an existing student | `200 OK`, `400 Bad Request`, `404 Not Found`, `409 Conflict` |
| `DELETE` | `/api/students/:id` | Delete a student by ID | `200 OK`, `400 Bad Request`, `404 Not Found` |

---

## 📋 7. Request & Response Examples

### 1. Health Check
- **Request:** `GET http://localhost:5000/api/health`
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Student backend is running smoothly",
  "timestamp": "2026-10-12T07:15:00.000Z"
}
```

### 2. Get All Students
- **Request:** `GET http://localhost:5000/api/students`
- **Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Rahul",
      "rollNo": "CSE101",
      "branch": "CSE"
    },
    {
      "id": 2,
      "name": "Priya",
      "rollNo": "CSE102",
      "branch": "CSE"
    }
  ]
}
```

### 3. Add Student
- **Request:** `POST http://localhost:5000/api/students`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "name": "Arjun",
  "rollNo": "CSE103",
  "branch": "CSE"
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "message": "Student added successfully",
  "data": {
    "id": 3,
    "name": "Arjun",
    "rollNo": "CSE103",
    "branch": "CSE"
  }
}
```

### 4. Update Student
- **Request:** `PUT http://localhost:5000/api/students/3`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "name": "Arjun Reddy",
  "rollNo": "CSE103",
  "branch": "CSE"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": {
    "id": 3,
    "name": "Arjun Reddy",
    "rollNo": "CSE103",
    "branch": "CSE"
  }
}
```

### 5. Delete Student
- **Request:** `DELETE http://localhost:5000/api/students/3`
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Student deleted successfully",
  "data": {
    "id": 3,
    "name": "Arjun Reddy",
    "rollNo": "CSE103",
    "branch": "CSE"
  }
}
```

### 6. Error Responses
- **Missing / Empty Fields (400 Bad Request):**
```json
{
  "success": false,
  "message": "All fields (name, rollNo, branch) are required and cannot be empty"
}
```
- **Duplicate Roll Number (409 Conflict):**
```json
{
  "success": false,
  "message": "Student with roll number 'CSE101' already exists"
}
```
- **Non-existent Student (404 Not Found):**
```json
{
  "success": false,
  "message": "Student not found"
}
```

---

## 🧪 8. API Testing with cURL / Postman

Import the included file:
`college-student-management/College_Student_Management.postman_collection.json` into Postman to run all pre-configured tests.

Alternatively, use `curl`:

```bash
# 1. Health check
curl http://localhost:5000/api/health

# 2. Get all students
curl http://localhost:5000/api/students

# 3. Get single student
curl http://localhost:5000/api/students/1

# 4. Add student
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Arjun","rollNo":"CSE103","branch":"CSE"}'

# 5. Update student
curl -X PUT http://localhost:5000/api/students/3 \
  -H "Content-Type: application/json" \
  -d '{"name":"Arjun Reddy","rollNo":"CSE103","branch":"CSE"}'

# 6. Delete student
curl -X DELETE http://localhost:5000/api/students/3

# 7. Test missing student (404)
curl http://localhost:5000/api/students/999
```

---

## 🔍 9. Core Features Walkthrough

### Search & Branch Filtering
- The search input filters students in real time by name, roll number, or system ID (case-insensitive).
- The branch filter dropdown isolates students belonging to specific departments (`CSE`, `ECE`, `EEE`, `IT`, `AIML`, `Mechanical`, `Civil`, or `All Branches`).
- Both filters work concurrently; the displayed table is derived via React `useMemo()` from the master student list fetched from the server without mutating state.

### Update & Delete Operations
- **Update:** Clicking **Edit** populates the student form, transforms the title to "Update Student", enables a "Cancel Edit" button, and sends a `PUT` request upon submit.
- **Delete:** Clicking **Delete** prompts a native `window.confirm()` confirmation modal. Upon confirmation, a `DELETE` request is transmitted to the backend, removing the record from the server's collection and updating UI metrics in real time.

### In-Memory Storage Limitation Notice
> **Important:** This assignment utilizes an in-memory JavaScript array (`data/students.js`) per lab requirements. Consequently, **all modifications (additions, updates, deletions) persist only while the Node.js server process remains active**. Restarting the backend server resets the records back to the initial 2 students (`Rahul` and `Priya`).

---

## 🎓 10. React Hooks Viva Preparation Guide

1. **`useState`**: Used across components to manage reactive data state:
   - `students`: Array of student records fetched from the backend.
   - `loading`: Loading boolean for asynchronous operations.
   - `error`: Error messages from network/API failures.
   - `formData`: Form inputs for student name, roll number, and branch.
   - `editingStudent`: Active student object being updated.
   - `searchTerm` & `selectedBranch`: Filter states.

2. **`useEffect`**:
   - In `Dashboard.jsx`: Fetches students from `/api/students` on component mount (`[]` dependency array) to prevent infinite re-fetching loops.
   - In `StudentDetails.jsx`: Fetches single student record whenever the route parameter `id` changes.
   - In notifications: Clears transient alert banners automatically after 4 seconds.

3. **`useParams`**:
   - In `StudentDetails.jsx`: Extracts the dynamic `:id` parameter from the URL `/students/:id`.

4. **`useNavigate`**:
   - In `StudentDetails.jsx`, `StudentList.jsx`, and `StudentCard.jsx`: Programmatically navigates between routes (e.g., navigating to `/students/:id` on View click or back to `/` on Back click).

---

## 🏆 11. Production Verification

The production build of the frontend has been compiled and validated:
```bash
cd student-frontend
npm run build
```
Build output:
```text
✓ built in ~300ms
```
