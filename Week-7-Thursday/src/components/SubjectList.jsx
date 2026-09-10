import React from 'react';

/**
 * SubjectList Component
 * Dynamically maps over subjects array passed via props to display registered courses.
 * Accepts props: subjects (Array of subject objects)
 */
function SubjectList({ subjects }) {
  return (
    <div className="card subjects-card">
      <div className="card-header">
        <h2 className="card-title">
          <span className="card-icon">📚</span> Enrolled Subjects
        </h2>
        <span className="subject-count-badge">
          {subjects ? subjects.length : 0} Subjects
        </span>
      </div>

      <div className="subjects-grid">
        {subjects && subjects.length > 0 ? (
          subjects.map((subject) => (
            <div key={subject.code} className="subject-card">
              <div className="subject-header">
                <span className="subject-code">{subject.code}</span>
                <span className="subject-credits">{subject.credits} Credits</span>
              </div>
              <h3 className="subject-name">{subject.name}</h3>
              <p className="subject-faculty">
                <span className="faculty-icon">👨‍🏫</span> {subject.faculty}
              </p>
            </div>
          ))
        ) : (
          <p className="no-data">No subjects enrolled.</p>
        )}
      </div>
    </div>
  );
}

export default SubjectList;
