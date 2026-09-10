import React from 'react';

/**
 * ExamDetails Component
 * Displays upcoming examination dates, hall ticket availability, and results status.
 * Accepts props: details (object containing exam information)
 */
function ExamDetails({ details }) {
  if (!details) return null;

  return (
    <div className="card exam-card">
      <div className="card-header">
        <h2 className="card-title">
          <span className="card-icon">📝</span> Examination Details
        </h2>
        <span className="exam-status-tag">Upcoming</span>
      </div>

      <div className="exam-body">
        <div className="exam-main-info">
          <h3>{details.examination}</h3>
          <span className="semester-badge">{details.semester}</span>
        </div>

        <div className="exam-grid">
          <div className="exam-item">
            <span className="exam-label">Start Date:</span>
            <span className="exam-value">{details.startDate}</span>
          </div>

          <div className="exam-item">
            <span className="exam-label">End Date:</span>
            <span className="exam-value">{details.endDate}</span>
          </div>

          <div className="exam-item">
            <span className="exam-label">Hall Ticket:</span>
            <span className="exam-badge badge-green">
              ✓ {details.hallTicket}
            </span>
          </div>

          <div className="exam-item">
            <span className="exam-label">Academic Results:</span>
            <span className="exam-badge badge-blue">
              ℹ️ {details.results}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamDetails;
