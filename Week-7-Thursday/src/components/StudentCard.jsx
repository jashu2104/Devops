import React from 'react';

/**
 * StudentCard Component
 * Reusable student card used in student selection grid.
 * Accepts props: student (object), onViewProfile (function), isSelected (boolean)
 */
function StudentCard({ student, onViewProfile, isSelected }) {
  const isEligible = student.attendance >= 75;

  return (
    <div className={`student-card-item ${isSelected ? 'selected' : ''}`}>
      <div className="card-top">
        <div className="avatar-circle">
          {student.name ? student.name.charAt(0) : 'S'}
        </div>
        <div className="card-meta">
          <h3 className="card-student-name">{student.name}</h3>
          <span className="card-roll-number">{student.rollNumber}</span>
        </div>
      </div>

      <div className="card-details">
        <p className="card-branch">
          <strong>Branch:</strong> {student.branch}
        </p>
        <p className="card-year">
          <strong>Year:</strong> {student.year}
        </p>
      </div>

      <div className="card-attendance-row">
        <div className="attendance-pill">
          <span>Attendance:</span>
          <strong>{student.attendance}%</strong>
        </div>
        <span className={`status-pill ${isEligible ? 'eligible' : 'not-eligible'}`}>
          {isEligible ? 'Eligible' : 'Not Eligible'}
        </span>
      </div>

      <button
        type="button"
        className={`view-profile-btn ${isSelected ? 'active-btn' : ''}`}
        onClick={() => onViewProfile(student)}
      >
        {isSelected ? '✓ Currently Viewing' : 'View Profile'}
      </button>
    </div>
  );
}

export default StudentCard;
