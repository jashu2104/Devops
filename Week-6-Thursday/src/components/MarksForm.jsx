import React from 'react';

/**
 * MarksForm Component
 * 
 * Demonstrates:
 * 1. Controlled Inputs - input values bound directly to React state.
 * 2. Input Validation - inline validation ensuring marks stay between 0 and 100.
 * 3. Event Handling - onChange handlers communicating with parent state via callback props.
 */
function MarksForm({ student, marks, onMarksChange }) {
  if (!student || !marks) {
    return (
      <div className="card marks-form-card empty-selection">
        <p>Select a student to edit marks.</p>
      </div>
    );
  }

  // Handle individual subject mark change
  const handleChange = (subject, rawValue) => {
    onMarksChange(subject, rawValue);
  };

  return (
    <div className="card marks-form-card">
      <div className="card-header">
        <h3>Subject Marks Entry</h3>
        <span className="subtitle">Enter or update marks (0 - 100) for {student.name}</span>
      </div>

      <div className="marks-form-list">
        {Object.entries(marks).map(([subject, markValue]) => {
          // Check for invalid mark entries
          const numValue = Number(markValue);
          const isInvalid = markValue !== "" && (isNaN(numValue) || numValue < 0 || numValue > 100);

          return (
            <div className={`mark-input-group ${isInvalid ? 'input-error' : ''}`} key={subject}>
              <div className="subject-info">
                <label htmlFor={`input-${subject.replace(/\s+/g, '-')}`} className="subject-label">
                  {subject}
                </label>
              </div>

              <div className="input-container">
                <input
                  id={`input-${subject.replace(/\s+/g, '-')}`}
                  type="number"
                  min="0"
                  max="100"
                  value={markValue}
                  onChange={(e) => handleChange(subject, e.target.value)}
                  placeholder="0-100"
                  className="mark-input"
                />
                <span className="mark-max">/ 100</span>
              </div>

              {/* Inline validation message */}
              {isInvalid && (
                <div className="validation-message">
                  ⚠️ Marks must be between 0 and 100.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MarksForm;
