import React from "react";
import { useNavigate } from "react-router-dom";
import { courses } from "../data/data";

/**
 * CourseList Component
 * Displays available curriculum courses with department tags, credit points, and dynamic details buttons.
 */
function CourseList() {
  const navigate = useNavigate();

  const handleViewCourse = (id) => {
    // Navigate to dynamic route /courses/:id
    navigate(`/courses/${id}`);
  };

  return (
    <div className="page-container fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Course Catalog</h1>
          <p className="page-subtitle">Explore curriculum courses, credits, and department offerings</p>
        </div>
        <div className="count-badge">
          {courses.length} Courses Available
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="card-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="card-header">
              <span className="course-code-badge">{course.code}</span>
              <span className="badge badge-accent">{course.credits} Credits</span>
            </div>

            <div className="card-body">
              <h3 className="course-name">{course.name}</h3>
              <p className="course-description">{course.description}</p>
              
              <div className="details-list border-top">
                <div className="detail-item">
                  <span className="detail-label">Department:</span>
                  <span className="detail-value">{course.department}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Instructor:</span>
                  <span className="detail-value">{course.instructor}</span>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button
                className="btn btn-primary full-width"
                onClick={() => handleViewCourse(course.id)}
                id={`view-course-${course.id}`}
              >
                View Course Details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
