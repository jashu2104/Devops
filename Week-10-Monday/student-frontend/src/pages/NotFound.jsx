import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="notfound-container">
      <div className="card notfound-card">
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-desc">
          The requested page does not exist in the College Student Management System.
        </p>
        <Link to="/" className="btn btn-primary">
          ← Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
