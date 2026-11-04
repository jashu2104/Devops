import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getStudentById } from '../services/studentApi';
import Loading from './Loading';

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchStudent() {
      setLoading(true);
      setError(null);
      try {
        const response = await getStudentById(id);
        if (isMounted) {
          setStudent(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to retrieve student details.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchStudent();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="details-container">
        <Loading message={`Loading details for Student ID #${id}...`} />
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="details-container">
        <div className="card error-details-card">
          <div className="error-icon" aria-hidden="true">⚠️</div>
          <h2>Student Not Found</h2>
          <p className="error-message">{error || `No student found with ID #${id}.`}</p>
          <div className="details-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate('/')}
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="details-nav-bar">
        <button
          type="button"
          className="btn btn-secondary back-btn"
          onClick={() => navigate('/')}
          id="back-to-dashboard-btn"
        >
          ← Back to Dashboard
        </button>
        <span className="details-route-tag">Route: /students/{id}</span>
      </div>

      <div className="card student-details-card">
        <div className="details-header">
          <div className="details-avatar">
            {student.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="details-student-name">{student.name}</h2>
            <span className={`branch-pill branch-${student.branch.toLowerCase()}`}>
              {student.branch} Department
            </span>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">System ID</span>
            <span className="detail-value">#{student.id}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Full Name</span>
            <span className="detail-value">{student.name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Roll Number</span>
            <span className="detail-value roll-highlight">{student.rollNo}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Academic Branch</span>
            <span className="detail-value">{student.branch}</span>
          </div>
        </div>

        <div className="details-footer">
          <Link to="/" className="btn btn-primary">
            Return to Student Management Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
