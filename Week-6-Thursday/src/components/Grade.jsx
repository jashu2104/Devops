import React from 'react';

/**
 * Grade Component
 * 
 * Demonstrates:
 * 1. React Props - receives the 'average' mark as a prop.
 * 2. Conditional Logic & Rendering - determines the grade letter based on mark ranges.
 * 3. Reusable UI component for displaying student academic grade badges.
 */
function Grade({ average }) {
  // Function to calculate letter grade based on percentage average
  const getGradeInfo = (avg) => {
    // Edge case handling for invalid/null average values
    if (avg === null || avg === undefined || isNaN(avg)) {
      return { grade: 'N/A', className: 'grade-na' };
    }

    if (avg >= 90 && avg <= 100) {
      return { grade: 'A+', className: 'grade-aplus' };
    } else if (avg >= 80) {
      return { grade: 'A', className: 'grade-a' };
    } else if (avg >= 70) {
      return { grade: 'B+', className: 'grade-bplus' };
    } else if (avg >= 60) {
      return { grade: 'B', className: 'grade-b' };
    } else if (avg >= 50) {
      return { grade: 'C', className: 'grade-c' };
    } else if (avg >= 40) {
      return { grade: 'D', className: 'grade-d' };
    } else {
      return { grade: 'F', className: 'grade-f' };
    }
  };

  const { grade, className } = getGradeInfo(average);

  return (
    <div className="grade-container">
      <span className={`grade-badge ${className}`}>
        {grade}
      </span>
    </div>
  );
}

export default Grade;
