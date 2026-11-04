import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentCard from './StudentCard';

function StudentList({
  students,
  totalCount,
  onEdit,
  onDelete,
  isFiltered,
  onClearFilters
}) {
  const navigate = useNavigate();

  if (students.length === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-state-icon" aria-hidden="true">📋</div>
        <h3 className="empty-state-title">
          {isFiltered ? 'No students match your search.' : 'No students found.'}
        </h3>
        <p className="empty-state-text">
          {isFiltered
            ? 'Try adjusting your search query or branch filter to find records.'
            : 'Add your first student record using the form above.'}
        </p>
        {isFiltered && (
          <button
            type="button"
            className="btn btn-secondary mt-3"
            onClick={onClearFilters}
          >
            Clear Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="student-list-section">
      <div className="table-responsive">
        <table className="student-table" id="students-table">
          <thead>
            <tr>
              <th scope="col" className="th-id">ID</th>
              <th scope="col" className="th-roll">Roll No</th>
              <th scope="col" className="th-name">Name</th>
              <th scope="col" className="th-branch">Branch</th>
              <th scope="col" className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="student-row" id={`student-row-${student.id}`}>
                <td className="td-id">
                  <span className="id-badge">#{student.id}</span>
                </td>
                <td className="td-roll">
                  <span className="roll-number">{student.rollNo}</span>
                </td>
                <td className="td-name">
                  <span className="student-name-text">{student.name}</span>
                </td>
                <td className="td-branch">
                  <span className={`branch-pill branch-${student.branch.toLowerCase()}`}>
                    {student.branch}
                  </span>
                </td>
                <td className="td-actions">
                  <div className="action-buttons-group">
                    <button
                      type="button"
                      className="btn-action btn-view"
                      onClick={() => navigate(`/students/${student.id}`)}
                      title={`View details for ${student.name}`}
                      id={`view-btn-${student.id}`}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn-action btn-edit"
                      onClick={() => onEdit(student)}
                      title={`Edit record for ${student.name}`}
                      id={`edit-btn-${student.id}`}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-action btn-delete"
                      onClick={() => onDelete(student)}
                      title={`Delete record for ${student.name}`}
                      id={`delete-btn-${student.id}`}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cards-grid-mobile">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default StudentList;
