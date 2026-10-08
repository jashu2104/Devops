import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Component & Page Imports
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import StudentList from "./pages/StudentList";
import StudentDetails from "./pages/StudentDetails";
import CourseList from "./pages/CourseList";
import CourseDetails from "./pages/CourseDetails";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

/**
 * App Component
 * Central Routing hub of the College Student Management Portal.
 * Configures BrowserRouter and client-side Routes.
 */
function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        {/* Navigation Bar Header */}
        <Navbar />

        {/* Dynamic Route Content Container */}
        <main className="main-content">
          <Routes>
            {/* Home Dashboard */}
            <Route path="/" element={<Home />} />

            {/* Student Directory & Dynamic Details */}
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/:id" element={<StudentDetails />} />

            {/* Course Catalog & Dynamic Details (Bonus) */}
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/:id" element={<CourseDetails />} />

            {/* About Page */}
            <Route path="/about" element={<About />} />

            {/* 404 Catch-All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <div className="footer-container">
            <p>© 2026-2027 College Student Management Portal • DEVOPS AND FULLSTACK Lab Assignment 9.2.2</p>
            <p className="footer-subtext">Built with React 19 & React Router DOM</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
