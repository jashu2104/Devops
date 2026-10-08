import React from "react";
import { useNavigate } from "react-router-dom";
import { students, courses } from "../data/data";

/**
 * Home Page Component
 * Demonstrates programmatic navigation using the useNavigate() hook.
 */
function Home() {
  // useNavigate hook for programmatic page navigation
  const navigate = useNavigate();

  const handleNavigateStudents = () => {
    // Navigate to /students route on button click
    navigate("/students");
  };

  const handleNavigateCourses = () => {
    // Navigate to /courses route on button click
    navigate("/courses");
  };

  return (
    <div className="page-container fade-in">
      {/* Hero Welcome Section */}
      <section className="hero-section">
        <div className="hero-badge">Academic Portal • 2026-27</div>
        <h1 className="hero-title">
          Welcome to <span className="highlight-text">College Student Management Portal</span>
        </h1>
        <p className="hero-subtitle">
          Manage students, courses and academic information using a simple React-based management system.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={handleNavigateStudents}>
            👨‍🎓 View Students
          </button>
          <button className="btn btn-secondary" onClick={handleNavigateCourses}>
            📚 View Courses
          </button>
        </div>
      </section>

      {/* Dashboard Quick Stats Cards */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">👨‍🎓</div>
          <div className="stat-content">
            <span className="stat-label">Total Students</span>
            <span className="stat-value">{students.length}</span>
            <span className="stat-meta">Active Enrolled</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper purple">📚</div>
          <div className="stat-content">
            <span className="stat-label">Available Courses</span>
            <span className="stat-value">{courses.length}</span>
            <span className="stat-meta">Core & Electives</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper green">🗓️</div>
          <div className="stat-content">
            <span className="stat-label">Academic Year</span>
            <span className="stat-value">2026-27</span>
            <span className="stat-meta">Odd Semester</span>
          </div>
        </div>
      </section>

      {/* Highlights / Features Banner */}
      <section className="info-banner">
        <h2>React Concepts Demonstrated in this Application</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <h3>Dynamic Routing</h3>
            <p>Routes like <code>/students/:id</code> and <code>/courses/:id</code> use URL parameters for dynamic views.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔍</div>
            <h3>Search & Filter</h3>
            <p>Instant student searching across name, student ID, and branch using React <code>useState</code>.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔄</div>
            <h3>Lifecycle & Hooks</h3>
            <p><code>useEffect()</code> mount, update, and unmount cleanup, along with simulated loading states.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎯</div>
            <h3>404 Error Handling</h3>
            <p>Graceful handling of unknown paths and non-existent student/course record IDs.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
