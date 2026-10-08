# 🚀 DevOps & Full-Stack Web Development Course Repository

Welcome to the **DevOps & Full-Stack Web Development** repository. This project contains hands-on labs, backend API services, relational & NoSQL database integrations, and modern React web applications developed across weekly coursework.

---

## 📚 Course Information

| Attribute | Details |
| :--- | :--- |
| **School** | School of Computer Science Engineering and Artificial Intelligence |
| **Course Name** | **DEVOPS AND FULLSTACK** |
| **Course Code** | `23CS102PE405` |
| **Course Type** | Professional Elective |
| **Program** | B.Tech |
| **Academic Year & Semester** | 2026–27 (ODD Semester) |
| **Instructors** | Dr. Mohammed Ali Shaik, Mr. G. Kranthi, Dr. N. Venkatesh, Mrs. Srivani |

---

## 📁 Project Modules Overview

| Directory | Project / Module | Tech Stack | Description |
| :--- | :--- | :--- | :--- |
| 📖 [`Week-2-Thursday`](file:///Users/jashu/Documents/Devops/Week-2-Thursday) | **Library Book Management API** | Node.js, Express, In-Memory DB | RESTful CRUD API for managing library book catalog, routes for authors, books, and borrowing availability. |
| 🛍️ [`Week-3-Monday`](file:///Users/jashu/Documents/Devops/Week-3-Monday) | **Online Shopping Product REST API** | Node.js, Express 4, CORS, Dotenv, Postman | E-commerce product management REST API with Postman API collection and environment configuration. |
| 🗄️ [`Week-3-Thursday`](file:///Users/jashu/Documents/Devops/Week-3-Thursday) | **Product Database Management API** | Node.js, Express, PostgreSQL, Sequelize ORM | Relational database-backed product API utilizing Sequelize ORM models, migrations, and PostgreSQL data persistence. |
| 📚 [`Week-4-Monday`](file:///Users/jashu/Documents/Devops/Week-4-Monday) | **Library Book Management System API** | Node.js, Express, PostgreSQL, Sequelize | Comprehensive library system backend with relational database schema, seed scripts, pagination, and search filters. |
| 🛒 [`Week-5-Monday`](file:///Users/jashu/Documents/Devops/Week-5-Monday) | **Online Shopping Backend API** | Node.js, Express 5, MongoDB, Mongoose | E-commerce backend microservice with MongoDB database connectivity and environment configuration. |
| 🍔 [`Week-5-Thursday`](file:///Users/jashu/Documents/Devops/Week-5-Thursday) | **QuickBite Food Ordering App** | React 18, Vite, Lucide React, Custom CSS | Modern food ordering interface featuring live search, category filtering, cart state management, and modal checkout. |
| 🔑 [`Week-6-Monday`](file:///Users/jashu/Documents/Devops/Week-6-Monday) | **Student Portal JWT Auth API** | Node.js, Express, JWT, BcryptJS | RESTful authentication and authorization API with password hashing, bearer token verification, and Postman API collection. |
| 📊 [`Week-6-Thursday`](file:///Users/jashu/Documents/Devops/Week-6-Thursday) | **Student Marks & Grade Evaluator** | React 19, Vite, Oxlint | Dynamic academic evaluation tool for recording subject marks, calculating totals, grades, and pass/fail statuses. |
| 🎓 [`Week-7-Thursday`](file:///Users/jashu/Documents/Devops/Week-7-Thursday) | **Student Profile & Academic Portal** | React 18, Vite, Responsive Layout | Comprehensive student dashboard displaying profile overview, attendance logs, course lists, and exam schedules. |
| 📈 [`Week-8-Monday`](file:///Users/jashu/Documents/Devops/Week-8-Monday) | **Student Attendance Management System** | React 18, Context API, Recharts, Modern CSS | High-performance attendance management platform with analytics, KPI metric cards, filters, and faculty registration. |
| 📚 [`Week-8-Thursday`](file:///Users/jashu/Documents/Devops/Week-8-Thursday) | **Online Bookstore App** | React 18, React Router 6, Context API, Lucide | Multi-page bookstore platform featuring book catalog (500+ books), category filter, search, dynamic cart management, and details page. |
| 🛒 [`Week-9-Monday`](file:///Users/jashu/Documents/Devops/Week-9-Monday) | **Modern React Shopping Cart App** | React 19, Vite, Lucide React, Oxlint | Interactive shopping cart application built with React 19, dynamic quantity adjustments, discount codes, and checkout UI. |
| 🎓 [`Week-9-Thursday`](file:///Users/jashu/Documents/Devops/Week-9-Thursday) | **College Student Management Portal** | React 18, React Router DOM 6, Vite | Multi-page student management portal featuring dynamic routing (`useParams`), student & course profiles, active navbar highlighting, lifecycle hooks, and 404 handling. |

---

## 🛠 Tech Stack & Tools

- **Frontend**: React (v18 & v19), React Router DOM, Vite, Vanilla CSS3, Lucide React Icons, Recharts
- **Backend & Relational DB**: Node.js, Express.js (v4 & v5), PostgreSQL, Sequelize ORM
- **NoSQL Database**: MongoDB, Mongoose
- **Security & Authentication**: JSON Web Tokens (JWT), BcryptJS password hashing, Middleware Guards
- **Development & Tooling**: npm, Oxlint, Postman Collections, Git & GitHub CLI

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **PostgreSQL**: Local PostgreSQL server (for Week 3 & 4 relational DB modules)
- **MongoDB**: Local MongoDB server or MongoDB Atlas URI (for Week 5 backend module)

### Quick Run Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jashu2104/Devops.git
   cd Devops
   ```

2. **Run a specific project module:**
   Navigate into any project folder, install dependencies, and launch:

   *For Frontend React Apps (`Week-5-Thursday`, `Week-6-Thursday`, `Week-7-Thursday`, `Week-8-Monday`, `Week-8-Thursday`, `Week-9-Monday`, `Week-9-Thursday`):*
   ```bash
   cd Week-9-Thursday/student-management
   npm install
   npm run dev
   ```

   *For Backend Express Apps (`Week-2-Thursday`, `Week-3-Monday`, `Week-3-Thursday`, `Week-4-Monday`, `Week-5-Monday`, `Week-6-Monday`):*
   ```bash
   cd Week-6-Monday
   npm install
   npm run dev   # or npm start
   ```

---

## 🤝 Project Structure

```text
Devops/
├── Week-2-Thursday/     # Library Book Management REST API (Node + Express)
├── Week-3-Monday/       # Online Shopping Product REST API (Express + Postman)
├── Week-3-Thursday/     # Product Database Management API (Express + PostgreSQL + Sequelize)
├── Week-4-Monday/       # Library Book Management System (Express + PostgreSQL + Sequelize)
├── Week-5-Monday/       # Online Shopping API (Node + Express + MongoDB)
├── Week-5-Thursday/     # QuickBite Food Delivery Web App (React + Vite)
├── Week-6-Monday/       # Student Portal Auth API (JWT + Express)
├── Week-6-Thursday/     # Student Marks & Grade Evaluator (React + Vite)
├── Week-7-Thursday/     # Student Profile & Attendance Portal (React)
├── Week-8-Monday/       # Student Attendance Management System (React Context API)
├── Week-8-Thursday/     # Online Bookstore App (React Router + Context API)
├── Week-9-Monday/       # Modern Shopping Cart App (React 19 + Vite)
├── Week-9-Thursday/     # College Student Management Portal (React Router DOM + Hooks)
└── README.md            # Main repository documentation
```


