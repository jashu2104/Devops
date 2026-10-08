import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { students } from "../data/data";

/**
 * StudentDetails Component
 * Demonstrates:
 * 1. Dynamic routing & useParams() hook to retrieve :id parameter from URL.
 * 2. useNavigate() hook for back button programmatic navigation.
 * 3. React Component Lifecycle using useEffect():
 *    - Mount: Component initial render lifecycle.
 *    - Update: Runs whenever dependency [id] changes.
 *    - Unmount: Cleanup function returned from useEffect().
 * 4. Async simulated data fetching with loading state and error handling.
 */
function StudentDetails() {
  // useParams() retrieves the dynamic student ID from the URL (/students/:id)
  const { id } = useParams();
  
  // useNavigate() allows programmatic navigation back to the student list
  const navigate = useNavigate();

  // State for loading, data, and error handling
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  /**
   * useEffect Lifecycle Demonstration
   * - [id] dependency array ensures effect triggers on mount AND whenever 'id' parameter changes
   * - Cleanup function executes when component unmounts or before re-running effect on id update
   */
  useEffect(() => {
    // 1. LIFECYCLE MOUNT / UPDATE LOGIC
    console.log(`[Lifecycle] StudentDetails Component Mounted / Updated. Student ID: ${id}`);
    
    setLoading(true);
    setError("");

    // Simulate async API fetch delay (800ms)
    const timer = setTimeout(() => {
      // Parse id from string to number and find matching record in dataset
      const foundStudent = students.find((s) => s.id === Number(id));

      if (foundStudent) {
        setStudent(foundStudent);
        setError("");
        console.log(`[Lifecycle] Successfully loaded details for student ${foundStudent.name} (ID: ${foundStudent.id})`);
      } else {
        setStudent(null);
        setError("Student not found. The requested student ID does not exist in our system.");
        console.warn(`[Lifecycle Warning] Student ID ${id} not found.`);
      }

      setLoading(false);
    }, 800);

    // 2. LIFECYCLE UNMOUNT / CLEANUP FUNCTION
    // Runs when component is removed from DOM or prior to re-execution when 'id' changes
    return () => {
      clearTimeout(timer);
      console.log(`[Lifecycle] StudentDetails Component Unmounted / Cleaned up for ID: ${id}`);
    };
  }, [id]); // Dependency on 'id' guarantees update behavior when route parameter changes

  // Back button handler demonstrating useNavigate()
  const handleBack = () => {
    navigate("/students");
  };

  return (
    <div className="page-container fade-in">
      {/* Top Action Bar */}
      <div className="details-header-bar">
        <button className="btn btn-back" onClick={handleBack} id="back-to-students-btn">
          ← Back to Students
        </button>
        <span className="route-indicator">Route: <code>/students/{id}</code></span>
      </div>

      {/* 1. LOADING STATE */}
      {loading && (
        <div className="state-card loading-card">
          <div className="spinner"></div>
          <h2>Loading student information...</h2>
          <p>Simulating data retrieval for Student ID: <strong>{id}</strong></p>
        </div>
      )}

      {/* 2. ERROR STATE */}
      {!loading && error && (
        <div className="state-card error-card">
          <div className="state-icon error-icon">⚠️</div>
          <h2>Student Not Found</h2>
          <p>{error}</p>
          <div className="error-actions">
            <button className="btn btn-primary" onClick={handleBack}>
              Back to Student Directory
            </button>
          </div>
        </div>
      )}

      {/* 3. SUCCESS STATE - STUDENT DETAILS DISPLAY */}
      {!loading && !error && student && (
        <div className="details-card">
          <div className="details-card-header">
            <div className="student-profile-badge">
              <span className="avatar-large">{student.name.charAt(0)}</span>
              <div>
                <h1 className="profile-name">{student.name}</h1>
                <p className="profile-meta">
                  Student ID: <strong>{student.id}</strong> • {student.branch} Department
                </p>
              </div>
            </div>
            <span className="status-pill active">{student.status}</span>
          </div>

          <div className="details-grid">
            <div className="info-block">
              <span className="info-label">Student ID</span>
              <span className="info-value">{student.id}</span>
            </div>
            <div className="info-block">
              <span className="info-label">Full Name</span>
              <span className="info-value">{student.name}</span>
            </div>
            <div className="info-block">
              <span className="info-label">Branch / Department</span>
              <span className="info-value">{student.branch}</span>
            </div>
            <div className="info-block">
              <span className="info-label">Academic Year</span>
              <span className="info-value">{student.year} Year</span>
            </div>
            <div className="info-block">
              <span className="info-label">Section</span>
              <span className="info-value">Section {student.section}</span>
            </div>
            <div className="info-block">
              <span className="info-label">Current CGPA</span>
              <span className="info-value highlight-green">{student.cgpa} / 10.0</span>
            </div>
            <div className="info-block">
              <span className="info-label">Email Address</span>
              <span className="info-value">{student.email}</span>
            </div>
            <div className="info-block">
              <span className="info-label">Phone Number</span>
              <span className="info-value">{student.phone}</span>
            </div>
          </div>

          {/* Quick Switch Test Buttons for Viva Demo */}
          <div className="demo-switcher">
            <span className="switcher-title">💡 Viva Demo - Quick ID Switcher (tests useEffect update on [id]):</span>
            <div className="switcher-buttons">
              <button
                className={`btn btn-sm ${Number(id) === 101 ? 'btn-active' : 'btn-outline'}`}
                onClick={() => navigate("/students/101")}
              >
                ID: 101 (Rahul)
              </button>
              <button
                className={`btn btn-sm ${Number(id) === 102 ? 'btn-active' : 'btn-outline'}`}
                onClick={() => navigate("/students/102")}
              >
                ID: 102 (Priya)
              </button>
              <button
                className={`btn btn-sm ${Number(id) === 999 ? 'btn-active' : 'btn-outline'}`}
                onClick={() => navigate("/students/999")}
              >
                ID: 999 (Invalid/Error Test)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDetails;
