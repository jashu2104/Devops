import React from 'react';

/**
 * StudentProfile Component
 * Displays individual student profile information.
 * Accepts props: name, rollNumber, branch, year
 */
function StudentProfile({ name, rollNumber, branch, year }) {
  return (
    <div className="card profile-card">
      <div className="card-header">
        <h2 className="card-title">
          <span className="card-icon">👤</span> Student Profile
        </h2>
      </div>
      <div className="profile-body">
        <div className="profile-avatar-container">
          <div className="profile-avatar">
            {name ? name.charAt(0) : 'S'}
          </div>
          <div className="profile-summary">
            <h3>{name}</h3>
            <span className="roll-badge">{rollNumber}</span>
          </div>
        </div>
        
        <div className="profile-grid">
          <div className="profile-item">
            <span className="item-label">Full Name:</span>
            <span className="item-value">{name}</span>
          </div>
          
          <div className="profile-item">
            <span className="item-label">Roll Number:</span>
            <span className="item-value">{rollNumber}</span>
          </div>

          <div className="profile-item">
            <span className="item-label">Branch:</span>
            <span className="item-value">{branch}</span>
          </div>

          <div className="profile-item">
            <span className="item-label">Academic Year:</span>
            <span className="item-value">{year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
