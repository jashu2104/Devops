import React from "react";
import { NavLink, Link } from "react-router-dom";

/**
 * Navbar Component
 * Demonstrates declarative navigation using React Router's <NavLink>.
 * NavLink automatically provides active state styling to highlight the active page.
 */
function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Main Application Branding */}
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">🎓</div>
          <div className="brand-text">
            <span className="brand-title">College Student Management Portal</span>
            <span className="brand-subtitle">DEVOPS & FULLSTACK PRACTICAL LAB (23CS102PE405)</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="link-icon">🏠</span> Home
          </NavLink>
          <NavLink
            to="/students"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="link-icon">👨‍🎓</span> Students
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="link-icon">📚</span> Courses
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="link-icon">ℹ️</span> About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
