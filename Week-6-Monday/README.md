# College Student Portal - JWT Authentication System

**School**: School of Computer Science Engineering and Artificial Intelligence  
**Course**: B.Tech 23CS102PE405 DEVOPS AND FULLSTACK  
**Lab Experiment**: Week-5.2  
**Date**: September 03, 2026  
**Instructors**: Dr. Mohammed Ali Shaik, Dr. N. Venkatesh, Mr. Kranthi Srivani  

---

## 📌 Scenario Description

A college needs a secure **Student Portal** developed using Node.js and Express.js. 
- Students log in to access their personal academic profile and records.
- Faculty members have privileges to view and update student academic records.
- Administrators manage users and overall system access.
- **JWT (JSON Web Token)** is used to authenticate and authorize all protected API requests, with passwords securely hashed using **BcryptJS**.

---

## 🚀 Key Features

- **User Authentication**:
  - `POST /register` – Register new users with email uniqueness check and password hashing via `bcryptjs`.
  - `POST /login` – Authenticate credentials against hashed passwords and generate a signed JWT.
  - `GET /profile` – View authenticated user profile using Bearer JWT token.

- **Student Record Management**:
  - `GET /students` – Fetch student records (Role-filtered: Students see their own record; Faculty/Admin see all records).
  - `GET /students/:id` – View specific student record by ID.
  - `PUT /students/:id` – Update student information (Restricted to Faculty and Admin roles).

- **JWT Security & Protection**:
  - Bearer Token extraction (`Authorization: Bearer <token>`).
  - Automatic rejection of missing, invalid, or expired tokens with descriptive status codes (`401 Unauthorized` / `403 Forbidden`).
  - `.env` configuration for sensitive keys (`JWT_SECRET`, `PORT`, `JWT_EXPIRES_IN`).

- **Interactive Basic Frontend**:
  - A clean, beginner-friendly web dashboard available at `http://localhost:3000` to register, login, view JWT tokens, and test endpoints live.

---

## 📁 Project Directory Structure

```text
Student Portal/
├── .env                                       # Environment variable configuration
├── .env.example                               # Environment template file
├── package.json                               # Dependencies & npm scripts
├── README.md                                  # Project documentation
├── test-api.js                                # Automated API test runner (12/12 tests)
├── Student_Portal_JWT_Auth.postman_collection.json # Exportable Postman Collection
├── public/                                    # Basic Web UI
│   ├── index.html                             # Web dashboard layout
│   ├── style.css                              # Basic stylesheet
│   └── app.js                                 # Client-side fetch logic
└── src/
    ├── server.js                              # Express server & route mounting
    ├── config/
    │   └── jwt.js                             # JWT secret & expiration settings
    ├── controllers/
    │   ├── authController.js                  # Register, Login, Get Profile handlers
    │   └── studentController.js               # Get & Update Student record handlers
    ├── middleware/
    │   └── authMiddleware.js                  # JWT verification & RBAC check
    ├── models/
    │   └── userModel.js                       # In-memory user data store
    └── routes/
        ├── authRoutes.js                      # Authentication routes
        └── studentRoutes.js                   # Student management routes
```

---

## 🛠️ Installation & Setup

1. **Clone or Navigate to Project Directory**:
   ```bash
   cd "Student Portal"
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Verify `.env` file exists with the following configuration:
   ```env
   PORT=3000
   JWT_SECRET=college_student_portal_super_secret_jwt_key_2026
   JWT_EXPIRES_IN=1h
   ```

---

## 🏃 Running the Application

### 1. Start Server (Standard Mode)
```bash
npm start
```

### 2. Start Server (Development Mode with Nodemon)
```bash
npm run dev
```
Access the web frontend in your browser at: **`http://localhost:3000`**

### 3. Run Automated Tests
```bash
npm test
```
*Executes `test-api.js` verifying all 12 test cases including registration, login, JWT verification, expired tokens, and role authorization.*

---

## 📮 Testing with Postman

1. Open **Postman**.
2. Click **Import** and select [`Student_Portal_JWT_Auth.postman_collection.json`](./Student_Portal_JWT_Auth.postman_collection.json).
3. Test the endpoints in order:
   - **`POST /login (Student Alex)`**: Generates JWT token and auto-sets `{{jwtToken}}` variable.
   - **`GET /profile`**: Uses `Bearer {{jwtToken}}` to return Alex's profile.
   - **`GET /students`**: Lists student records based on active role.
   - **`PUT /students/STU-202601`**: Updates student GPA/Semester (Faculty/Admin only).

---

## 🔐 Default Demo Credentials

| Role | Email | Password | Allowed Access |
| :--- | :--- | :--- | :--- |
| **Student** | `alex.j@student.college.edu` | `student123` | View own profile & personal student record |
| **Faculty** | `ali.shaik@cse.college.edu` | `faculty123` | View all student records & update academic details |
| **Admin** | `admin@college.edu` | `admin123` | Full access to manage system users & records |

---

## 📄 License
Lab Experiment Project developed for **23CS102PE405 DEVOPS AND FULLSTACK** course.
# Devops_Student_Portal
# Devops_Student_portal
# Devops_Student_portal
# Devops_Student_portal
# Devops_Student_portal
# Devops_Student_portal
# Devops_Student_Portal
# Devops_Student_Portal
# Devops_Week-5-Thursday
