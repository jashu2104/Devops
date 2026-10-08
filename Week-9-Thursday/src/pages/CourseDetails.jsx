import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../data/data";

/**
 * CourseDetails Component (Bonus Requirement)
 * Demonstrates dynamic routing for course details (/courses/:id) with useParams() and useNavigate().
 */
function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    const timer = setTimeout(() => {
      const foundCourse = courses.find((c) => c.id === Number(id));

      if (foundCourse) {
        setCourse(foundCourse);
        setError("");
      } else {
        setCourse(null);
        setError("Course not found. The requested course code/ID does not exist.");
      }

      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [id]);

  const handleBack = () => {
    navigate("/courses");
  };

  return (
    <div className="page-container fade-in">
      {/* Navigation Header Bar */}
      <div className="details-header-bar">
        <button className="btn btn-back" onClick={handleBack} id="back-to-courses-btn">
          ← Back to Courses
        </button>
        <span className="route-indicator">Route: <code>/courses/{id}</code></span>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="state-card loading-card">
          <div className="spinner"></div>
          <h2>Loading course details...</h2>
          <p>Retrieving syllabus information for Course ID: <strong>{id}</strong></p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="state-card error-card">
          <div className="state-icon error-icon">⚠️</div>
          <h2>Course Not Found</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={handleBack}>
            Back to Course Catalog
          </button>
        </div>
      )}

      {/* Course Details Display */}
      {!loading && !error && course && (
        <div className="details-card">
          <div className="details-card-header">
            <div>
              <span className="badge badge-accent mb-2">{course.code}</span>
              <h1 className="profile-name">{course.name}</h1>
              <p className="profile-meta">{course.department} Department • {course.credits} Credits</p>
            </div>
            <span className="badge badge-primary font-lg">ID: {course.id}</span>
          </div>

          <div className="details-grid">
            <div className="info-block">
              <span className="info-label">Course ID</span>
              <span className="info-value">{course.id}</span>
            </div>
            <div className="info-block">
              <span className="info-label">Course Code</span>
              <span className="info-value">{course.code}</span>
            </div>
            <div className="info-block">
              <span className="info-label">Course Name</span>
              <span className="info-value">{course.name}</span>
            </div>
            <div className="info-block">
              <span className="info-label">Credits</span>
              <span className="info-value">{course.credits} Credits</span>
            </div>
            <div className="info-block">
              <span className="info-label">Department</span>
              <span className="info-value">{course.department}</span>
            </div>
            <div className="info-block">
              <span className="info-label">Faculty Instructor</span>
              <span className="info-value">{course.instructor}</span>
            </div>
          </div>

          <div className="course-overview-section">
            <h3 className="section-subtitle">Course Overview</h3>
            <p className="description-text">{course.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetails;
