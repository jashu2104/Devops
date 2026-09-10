import React from 'react';
import Student from './Student';

/**
 * StudentList Component
 * 
 * Demonstrates:
 * 1. React Props - receives student array, selected student state, search state, and callback handlers.
 * 2. Array Mapping (map()) - renders list of student components dynamically.
 * 3. Dynamic Searching & Filtering - filters students based on search input (case-insensitive).
 * 4. Conditional Rendering - displays empty state when no students match the search query.
 */
function StudentList({ students, selectedStudent, onSelectStudent, searchTerm, onSearchChange }) {
  // Filter students based on search query (case-insensitive name search)
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes((searchTerm || '').toLowerCase())
  );

  return (
    <div className="card student-list-card">
      <div className="card-header">
        <h3>Student Roster</h3>
        <span className="count-badge">{filteredStudents.length} / {students.length} Students</span>
      </div>

      {/* Search Input Filter */}
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search students by name..."
          value={searchTerm}
          onChange={onSearchChange}
          className="search-input"
        />
        {searchTerm && (
          <button
            className="clear-search-btn"
            onClick={() => onSearchChange({ target: { value: '' } })}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Student Items List using map() */}
      <div className="students-container">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <Student
              key={student.id}
              student={student}
              isSelected={selectedStudent && selectedStudent.id === student.id}
              onClick={() => onSelectStudent(student)}
            />
          ))
        ) : (
          <div className="no-results">
            <p>🔍 No students found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentList;
