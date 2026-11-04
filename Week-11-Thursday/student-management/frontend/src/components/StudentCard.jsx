import React from 'react';
import { useNavigate } from 'react-router-dom';

function StudentCard({ student, onEdit, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="student-card" data-id={student.id}>
      <div className="card-top">
        <span className="card-id-badge">ID #{student.id}</span>
        <span className={`branch-pill branch-${student.branch.toLowerCase()}`}>
          {student.branch}
        </span>
      </div>

      <div className="card-body">
        <h3 className="card-name">{student.name}</h3>
        <p className="card-roll">
          <span className="label">Roll No:</span> <strong>{student.rollNo}</strong>
        </p>
      </div>

      <div className="card-actions">
        <button
          type="button"
          className="btn-action btn-view"
          onClick={() => navigate(`/students/${student.id}`)}
          title={`View details for ${student.name}`}
        >
          View
        </button>
        <button
          type="button"
          className="btn-action btn-edit"
          onClick={() => onEdit(student)}
          title={`Edit ${student.name}`}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn-action btn-delete"
          onClick={() => onDelete(student)}
          title={`Delete ${student.name}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;
