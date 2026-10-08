import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * NotFound Component (404 Catch-All Route)
 * Rendered when user navigates to an undefined or invalid URL path.
 */
function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="page-container fade-in">
      <div className="not-found-card">
        <div className="error-code">404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          The page or route you are looking for does not exist or has been moved.
        </p>

        <div className="not-found-actions">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            🏠 Go Home
          </button>
          <button className="btn btn-secondary" onClick={() => navigate("/students")}>
            👨‍🎓 View Students
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
