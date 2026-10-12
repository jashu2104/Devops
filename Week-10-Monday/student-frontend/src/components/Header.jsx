import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-brand">
          <Link to="/" className="brand-logo-link">
            <div className="brand-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div>
              <h1 className="header-title">College Student Management System</h1>
              <p className="header-subtitle">Manage student records efficiently</p>
            </div>
          </Link>
        </div>

        <div className="header-right">
          <span className="course-badge">23CS102PE405</span>
          <nav className="header-nav" aria-label="Main Navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/students"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Students
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
