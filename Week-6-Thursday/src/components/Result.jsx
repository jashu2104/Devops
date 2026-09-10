import React from 'react';
import Grade from './Grade';

/**
 * Result Component
 * 
 * Demonstrates:
 * 1. React Props - receives 'marks' object from parent component.
 * 2. Dynamic Calculations - total and average calculated dynamically using JavaScript array methods.
 * 3. Component Composition - embeds the reusable <Grade /> component.
 * 4. Conditional UI Rendering - displays PASS/FAIL status based on average.
 */
function Result({ marks }) {
  // Extract numerical mark values from the subjects object
  const markValues = marks ? Object.values(marks) : [];
  const subjectCount = markValues.length;

  // Calculate Total Marks dynamically using Array.reduce()
  const total = markValues.reduce((sum, currentVal) => {
    const num = Number(currentVal);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const maxTotal = subjectCount * 100;

  // Calculate Average Marks dynamically
  const average = subjectCount > 0 ? total / subjectCount : 0;
  const formattedAverage = average.toFixed(2);

  // Determine Pass/Fail Status (Average >= 40 is PASS, else FAIL)
  const isPass = average >= 40;
  const statusText = isPass ? 'PASS' : 'FAIL';
  const statusClass = isPass ? 'status-pass' : 'status-fail';

  return (
    <div className="card result-card">
      <div className="card-header">
        <h3>Academic Result Summary</h3>
        <span className={`status-badge ${statusClass}`}>
          {isPass ? '✓' : '✗'} {statusText}
        </span>
      </div>

      <div className="result-grid">
        {/* Total Marks Metric */}
        <div className="result-item">
          <span className="result-label">Total Marks</span>
          <span className="result-value">
            {total} <span className="result-max">/ {maxTotal}</span>
          </span>
        </div>

        {/* Average Marks Metric */}
        <div className="result-item">
          <span className="result-label">Average Marks</span>
          <span className="result-value">{formattedAverage}%</span>
        </div>

        {/* Grade Metric */}
        <div className="result-item">
          <span className="result-label">Overall Grade</span>
          <Grade average={average} />
        </div>
      </div>

      {/* Visual Status Indicator Banner */}
      <div className={`status-banner ${statusClass}`}>
        <span>Student Performance: </span>
        <strong>{isPass ? 'Passed all academic criteria' : 'Requires academic improvement (Average < 40%)'}</strong>
      </div>
    </div>
  );
}

export default Result;
