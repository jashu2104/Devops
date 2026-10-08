# College Student Management Portal

**Assignment:** 9.2.2  
**Course:** DEVOPS AND FULLSTACK (`23CS102PE405`)  
**Technology:** React.js + React Router DOM + React Hooks  
**Project Name:** `student-management`

---

## 🎯 Application Objective

The **College Student Management Portal** is a modern single-page React application (SPA) built for the DEVOPS AND FULLSTACK practical lab assignment. The portal allows users to:

1. Navigate between dashboard views without refreshing the browser tab.
2. View enrolled students and filter them live by Name, Student ID, or Branch.
3. Access dynamic student profiles via `/students/:id` with `useParams()`.
4. Observe simulated async loading behavior and error states for non-existent IDs.
5. Explore course offerings and detailed course syllabi via `/courses/:id`.
6. Handle invalid route paths gracefully with a 404 Not Found component.
7. Understand React Lifecycle concepts (**Mount**, **Update**, **Unmount**) through explicit `useEffect()` implementations and browser console logs.

---

## 🛠️ Technologies Used

- **React 18 / 19:** Component-based UI library
- **Vite:** Next-generation frontend tooling and fast dev server
- **React Router DOM:** Declarative client-side routing
- **JavaScript (ES6+):** Modern ES Modules, destructuring, arrow functions
- **JSX:** HTML-like UI syntax inside JavaScript
- **Vanilla CSS:** Custom responsive design system (blue/indigo academic palette)
- **React Hooks:** `useState`, `useEffect`, `useParams`, `useNavigate`

---

## 📁 Project Architecture

```text
student-management/
│
├── public/
│
├── src/
│   ├── components/
│   │   └── Navbar.jsx           # Top header navigation bar with NavLink active highlight
│   │
│   ├── pages/
│   │   ├── Home.jsx             # Welcome dashboard with stat cards & useNavigate()
│   │   ├── StudentList.jsx      # Student directory with search filtering by name/id/branch
│   │   ├── StudentDetails.jsx   # Dynamic student profile with useParams & useEffect lifecycle
│   │   ├── CourseList.jsx       # Course catalog listing
│   │   ├── CourseDetails.jsx    # Dynamic course details view
│   │   ├── About.jsx            # Project information & viva explanations
│   │   └── NotFound.jsx         # Catch-all 404 error page
│   │
│   ├── data/
│   │   └── data.js              # Mock dataset containing student and course arrays
│   │
│   ├── App.jsx                  # Main routing configuration with BrowserRouter & Routes
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Academic theme design system and layout styling
│
├── package.json
└── README.md
```

---

## 🚀 Installation & Running the Application

1. **Navigate to the project directory:**
   ```bash
   cd student-management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at the displayed local URL (e.g. `http://localhost:5173` or `http://localhost:5174`).

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🛣️ Expected Routes

| Route | Component | Purpose |
|---|---|---|
| `/` | `Home.jsx` | Welcome dashboard showing stat cards and navigation action buttons |
| `/students` | `StudentList.jsx` | Directory showing student cards with live search box |
| `/students/:id` | `StudentDetails.jsx` | Dynamic profile details page utilizing `useParams()` |
| `/courses` | `CourseList.jsx` | Curriculum course catalog listing |
| `/courses/:id` | `CourseDetails.jsx` | Dynamic course detail view |
| `/about` | `About.jsx` | Lab project details and React concepts overview |
| `*` | `NotFound.jsx` | 404 Catch-All page for invalid or missing URLs |

---

## 💡 React & React Router Concepts Demonstrated

### 1. `BrowserRouter`, `Routes`, and `Route`
Defines client-side routes in `App.jsx`, ensuring navigation switches page components without sending HTTP requests to a server or triggering full-page browser reloads.

### 2. `NavLink` Active Navigation Highlighting
`Navbar.jsx` utilizes `NavLink` to automatically apply the `.active` CSS class to the currently active link based on the browser URL path.

### 3. Dynamic Routing & `useParams()`
Routes defined as `/students/:id` or `/courses/:id` extract parameter values dynamically inside components:
```javascript
const { id } = useParams();
```

### 4. Programmatic Navigation with `useNavigate()`
Enables JavaScript function-driven route changes (such as Back buttons or card clicks):
```javascript
const navigate = useNavigate();
navigate("/students");
```

### 5. `useEffect()` Component Lifecycle & Cleanup
Demonstrated in `StudentDetails.jsx`:
- **Mount:** Code inside `useEffect` executes after the component renders.
- **Update:** Passing `[id]` in the dependency array re-runs the effect whenever the URL parameter changes (e.g., switching from student 101 to 102).
- **Unmount / Cleanup:** Returning a cleanup function allows canceling timers and logging component destruction:
  ```javascript
  return () => {
    clearTimeout(timer);
    console.log("StudentDetails Component Unmounted");
  };
  ```

---

## 🧪 Manual Testing & Verification Checklist

All routes and user flows have been verified:

- [x] **Home Dashboard (`/`):** Displays welcome message, stat cards (6 Students, 5 Courses, 2026-27), and `useNavigate()` buttons.
- [x] **Student List (`/students`):** Lists all student cards with Student ID, Name, Branch, and Year.
- [x] **Student Search:** Typing "Rahul", "101", or "CSE" filters student cards instantly. Displays "No students found" for non-matching queries.
- [x] **Dynamic Student Profile (`/students/101`):** Displays loading spinner during 800ms simulated fetch, then displays full profile details.
- [x] **Lifecycle Logging:** Browser console logs component mount, update, and unmount events.
- [x] **Error Handling (`/students/999`):** Shows "Student Not Found" state with a button to return to `/students`.
- [x] **Course List & Details (`/courses` & `/courses/201`):** Displays course catalog and dynamic course details.
- [x] **About Page (`/about`):** Details assignment information and tech stack.
- [x] **404 Page (`/invalid-url`):** Catch-all route renders styled 404 page with "Go Home" and "View Students" buttons.
- [x] **No Full Page Reloads:** Navigating between links occurs entirely client-side.
- [x] **Production Build (`npm run build`):** Verified compilation with zero syntax or bundling errors.

---

> **Note:** This assignment uses local JavaScript data (`src/data/data.js`) and `setTimeout()` to simulate backend network requests for demonstrating React lifecycle and routing concepts without requiring a backend database server.
