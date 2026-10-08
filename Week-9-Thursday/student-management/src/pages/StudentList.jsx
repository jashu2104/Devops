import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { students } from "../data/data";

/**
 * StudentList Component
 * Displays student records with real-time searching by Name, ID, or Branch.
 * Uses useNavigate() to programmatically navigate to dynamic student details (/students/:id).
 */
function StudentList() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filter students array based on search term matching name, id, or branch
  const filteredStudents = students.filter((student) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      student.name.toLowerCase().includes(term) ||
      student.id.toString().includes(term) ||
      student.branch.toLowerCase().includes(term)
    );
  });

  const handleViewDetails = (id) => {
    // Programmatic navigation to /students/:id
    navigate(`/students/${id}`);
  };

  return (
    <div className="page-container fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Student Directory</h1>
          <p className="page-subtitle">View and search enrolled student details across departments</p>
        </div>
        <div className="count-badge">
          Showing {filteredStudents.length} of {students.length} Students
        </div>
      </div>

      {/* Bonus Feature: Search Box */}
      <div className="search-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by student name, ID, or branch (e.g. Rahul, 101, CSE)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="student-search-input"
          />
          {searchTerm && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchTerm("")}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Student Cards Grid */}
      {filteredStudents.length > 0 ? (
        <div className="card-grid">
          {filteredStudents.map((student) => (
            <div key={student.id} className="student-card">
              <div className="card-header">
                <span className="student-avatar">
                  {student.name.charAt(0)}
                </span>
                <div className="student-meta-top">
                  <span className="badge badge-primary">ID: {student.id}</span>
                  <span className="badge badge-secondary">{student.branch}</span>
                </div>
              </div>

              <div className="card-body">
                <h3 className="student-name">{student.name}</h3>
                <div className="details-list">
                  <div className="detail-item">
                    <span className="detail-label">Branch:</span>
                    <span className="detail-value">{student.branch}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Year:</span>
                    <span className="detail-value">{student.year} Year</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value truncate">{student.email}</span>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <button
                  className="btn btn-outline full-width"
                  onClick={() => handleViewDetails(student.id)}
                  id={`view-details-${student.id}`}
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty Search Results State */
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No students found</h3>
          <p>No student record matches "{searchTerm}". Try searching by another name, ID or branch.</p>
          <button className="btn btn-secondary" onClick={() => setSearchTerm("")}>
            Reset Search Filter
          </button>
        </div>
      )}
    </div>
  );
}

export default StudentList;
