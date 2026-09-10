import React from 'react';

/**
 * Header Component
 * Displays the college name and application title prominently.
 * Accepts props: collegeName, title
 */
function Header({ collegeName, title }) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-brand">
          <div className="header-icon" role="img" aria-label="Graduation Cap">🎓</div>
          <div className="header-text">
            <h1 className="college-name">{collegeName}</h1>
            <p className="app-title">{title}</p>
          </div>
        </div>
        <div className="header-tag">
          Academic Year 2025 - 2026
        </div>
      </div>
    </header>
  );
}

export default Header;
