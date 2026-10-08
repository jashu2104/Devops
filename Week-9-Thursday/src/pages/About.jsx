import React from "react";

/**
 * About Page Component
 * Summarizes application details, tech stack, and key React Router / Hooks concepts for Lab Practical Viva.
 */
function About() {
  return (
    <div className="page-container fade-in">
      <div className="about-header">
        <h1 className="page-title">About College Student Management Portal</h1>
        <p className="page-subtitle">
          Lab Assignment 9.2.2 • Course: DEVOPS AND FULLSTACK (23CS102PE405)
        </p>
      </div>

      <div className="about-content-grid">
        {/* Project Description & Tech Stack */}
        <div className="about-card">
          <h2>📌 Project Overview</h2>
          <p>
            This application is developed using <strong>React</strong> and <strong>React Router DOM</strong> for the DEVOPS AND FULLSTACK practical lab assignment. It demonstrates single-page application (SPA) client-side routing without full page reloads.
          </p>

          <h3 className="section-title">Technologies Used:</h3>
          <ul className="tech-list">
            <li><strong>React (v19):</strong> Frontend JavaScript framework for component-based UI.</li>
            <li><strong>React Router DOM (v7):</strong> Declarative routing and dynamic navigation library.</li>
            <li><strong>JavaScript (ES6+):</strong> Modern JS with module imports and arrow functions.</li>
            <li><strong>JSX:</strong> Syntax extension combining HTML structure with JavaScript logic.</li>
            <li><strong>Vanilla CSS:</strong> Clean, responsive custom styling with CSS variables.</li>
            <li><strong>React Hooks:</strong> <code>useState</code>, <code>useEffect</code>, <code>useParams</code>, and <code>useNavigate</code>.</li>
          </ul>
        </div>

        {/* Concept Explanations for Viva */}
        <div className="about-card">
          <h2>💡 Core Concepts Explained</h2>
          
          <div className="concept-box">
            <h4>1. React Router (<code style={{color: '#6366f1'}}>BrowserRouter</code>, <code style={{color: '#6366f1'}}>Routes</code>, <code style={{color: '#6366f1'}}>NavLink</code>)</h4>
            <p>
              Provides client-side routing so pages switch instantly without reloading the browser tab. <code>NavLink</code> highlights the active tab.
            </p>
          </div>

          <div className="concept-box">
            <h4>2. Dynamic Routing (<code style={{color: '#6366f1'}}>/students/:id</code>)</h4>
            <p>
              Allows routes to accept dynamic URL variables like <code>:id</code>, enabling a single template component to render data for any student or course.
            </p>
          </div>

          <div className="concept-box">
            <h4>3. <code style={{color: '#6366f1'}}>useParams()</code> Hook</h4>
            <p>
              Extracts dynamic parameter values directly from the active URL path (e.g. obtaining <code>id = "101"</code> from <code>/students/101</code>).
            </p>
          </div>

          <div className="concept-box">
            <h4>4. <code style={{color: '#6366f1'}}>useNavigate()</code> Hook</h4>
            <p>
              Enables programmatic navigation via JavaScript code (e.g. clicking "Back to Students" or "View Details" buttons).
            </p>
          </div>

          <div className="concept-box">
            <h4>5. <code style={{color: '#6366f1'}}>useEffect()</code> Lifecycle</h4>
            <p>
              Demonstrates component <strong>Mount</strong>, <strong>Update</strong> (when dependency array <code>[id]</code> changes), and <strong>Unmount</strong> cleanup.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
