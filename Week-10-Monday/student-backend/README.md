# Student Backend API

College Student Management System backend built with **Node.js** and **Express**.

- **Course:** DEVOPS AND FULLSTACK (23CS102PE405)
- **Assignment:** 10.1.1
- **Port:** 5000 (`http://localhost:5000`)
- **Data Source:** In-memory JavaScript array (`data/students.js`)

> **Note on Data Persistence:** Data is stored in memory. Any additions, updates, or deletions will reset back to the initial 2 student records whenever the server is restarted.

---

## 🛠️ Tech Stack & Dependencies

- **Node.js**
- **Express** - Fast, unopinionated web framework for Node.js
- **CORS** - Middleware to enable Cross-Origin Resource Sharing for the React frontend
- **Nodemon** (dev dependency) - Auto-reloads server upon file changes

---

## 🚀 Setup & Execution

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development Mode (with Nodemon)
```bash
npm run dev
```

### 3. Run in Production Mode
```bash
npm start
```

Server startup message:
```text
Student backend running at http://localhost:5000
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `GET` | `/api/health` | Health check endpoint | `200` |
| `GET` | `/api/students` | Retrieve all student records | `200`, `500` |
| `GET` | `/api/students/:id` | Retrieve single student by ID | `200`, `400`, `404`, `500` |
| `POST` | `/api/students` | Add a new student | `201`, `400`, `409`, `500` |
| `PUT` | `/api/students/:id` | Update an existing student | `200`, `400`, `404`, `409`, `500` |
| `DELETE` | `/api/students/:id` | Delete a student by ID | `200`, `400`, `404`, `500` |

---

## 📋 Request / Response Examples

### 1. Health Check
`GET http://localhost:5000/api/health`
```json
{
  "success": true,
  "message": "Student backend is running smoothly",
  "timestamp": "2026-10-12T07:15:00.000Z"
}
```

### 2. Get All Students
`GET http://localhost:5000/api/students`
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
`POST http://localhost:5000/api/students`
**Body:**
```json
{
  "name": "Arjun",
  "rollNo": "CSE103",
  "branch": "CSE"
}
```
**Response (201 Created):**
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
`PUT http://localhost:5000/api/students/3`
**Body:**
```json
{
  "name": "Arjun Reddy",
  "rollNo": "CSE103",
  "branch": "CSE"
}
```
**Response (200 OK):**
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
`DELETE http://localhost:5000/api/students/3`
**Response (200 OK):**
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

### Error Responses
- **400 Bad Request:** Missing fields, empty strings, or non-positive ID.
- **404 Not Found:** Student ID does not exist in the collection.
- **409 Conflict:** Duplicate roll number detected.
