import React from 'react';

/**
 * Student Component
 * 
 * Demonstrates:
 * 1. Reusable Component - presents individual student details.
 * 2. React Props - receives single student object and selection state.
 * 3. Event Handling - triggers onClick callback when clicked.
 */
function Student({ student, isSelected, onClick }) {
  if (!student) return null;

  return (
    <div
      className={`student-card-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick();
        }
      }}
    >
      <div className="student-avatar">
        {student.name ? student.name.charAt(0) : 'S'}
      </div>
      <div className="student-details">
        <div className="student-name-row">
          <h4 className="student-name">{student.name}</h4>
          <span className="student-id">{student.id}</span>
        </div>
        <div className="student-department">
          <span className="dept-badge">{student.department}</span>
        </div>
      </div>
      {isSelected && <span className="active-indicator">● Active</span>}
    </div>
  );
}

export default Student;
