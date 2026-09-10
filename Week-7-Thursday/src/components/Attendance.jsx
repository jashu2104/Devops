import React from 'react';

/**
 * Attendance Component
 * Displays student attendance percentage with a dynamic progress bar and eligibility status badge.
 * Accepts props: percentage
 */
function Attendance({ percentage }) {
  // Determine eligibility status based on 75% threshold
  const isEligible = percentage >= 75;
  const statusText = isEligible ? "Eligible" : "Not Eligible";
  const statusClass = isEligible ? "status eligible" : "status not-eligible";

  return (
    <div className="card attendance-card">
      <div className="card-header">
        <h2 className="card-title">
          <span className="card-icon">📊</span> Attendance
        </h2>
        <span className={statusClass}>
          {statusText}
        </span>
      </div>

      <div className="attendance-body">
        <div className="attendance-score">
          <span className="percentage-number">{percentage}%</span>
          <span className="percentage-label">Total Attendance</span>
        </div>

        <div className="progress-bar-container">
          <div 
            className={`progress-bar-fill ${isEligible ? 'fill-eligible' : 'fill-not-eligible'}`}
            style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
          ></div>
        </div>

        <div className="attendance-info">
          <p>
            {isEligible 
              ? "✓ Minimum attendance requirement (75%) satisfied for upcoming examinations."
              : "⚠️ Attendance below mandatory 75% threshold. Please contact your department coordinator."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
