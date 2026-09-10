import React, { useState } from 'react';
import Header from './components/Header';
import StudentProfile from './components/StudentProfile';
import SubjectList from './components/SubjectList';
import Attendance from './components/Attendance';
import ExamDetails from './components/ExamDetails';
import StudentCard from './components/StudentCard';
import Footer from './components/Footer';
import './App.css';

/**
 * Main Application Component
 * Demonstrates state management, props passing, and component reusability.
 */
function App() {
  // Student dataset
  const students = [
    {
      id: 1,
      name: "Rahul Sharma",
      rollNumber: "CS2024001",
      branch: "Computer Science and Engineering",
      year: "3rd Year",
      attendance: 82
    },
    {
      id: 2,
      name: "Ananya Reddy",
      rollNumber: "CS2024002",
      branch: "Computer Science and Engineering",
      year: "3rd Year",
      attendance: 91
    },
    {
      id: 3,
      name: "Arjun Kumar",
      rollNumber: "CS2024003",
      branch: "Computer Science and Engineering",
      year: "3rd Year",
      attendance: 68
    }
  ];

  // Registered subjects dataset
  const subjects = [
    {
      code: "CS301",
      name: "Data Structures",
      faculty: "Dr. Priya",
      credits: 4
    },
    {
      code: "CS302",
      name: "Database Management Systems",
      faculty: "Prof. Arun",
      credits: 4
    },
    {
      code: "CS303",
      name: "Computer Networks",
      faculty: "Dr. Kumar",
      credits: 3
    },
    {
      code: "CS304",
      name: "Operating Systems",
      faculty: "Prof. Meena",
      credits: 4
    },
    {
      code: "CS305",
      name: "Web Development",
      faculty: "Dr. Ravi",
      credits: 3
    }
  ];

  // Examination schedule dataset
  const examDetails = {
    examination: "End Semester Examination",
    semester: "Semester V",
    startDate: "15 November 2026",
    endDate: "30 November 2026",
    hallTicket: "Available",
    results: "Previous Semester Result Available"
  };

  // State to track currently selected active student
  const [selectedStudent, setSelectedStudent] = useState(students[0]);

  // Handler for selecting a student
  const handleViewProfile = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="app-layout">
      {/* Header Component */}
      <Header
        collegeName="ABC Institute of Technology"
        title="Student Management Dashboard"
      />

      <main className="main-content">
        {/* Welcome Section */}
        <section className="welcome-section">
          <h2>Welcome, {selectedStudent.name} 👋</h2>
          <p>Overview of your academic progress, enrolled courses, and exam details.</p>
        </section>

        {/* Student Selector Cards Section */}
        <section className="student-cards-section">
          <div className="section-title-row">
            <h3 className="section-title">Select Student Record</h3>
            <span className="section-subtitle">Click "View Profile" to switch student metrics</span>
          </div>
          <div className="student-cards-grid">
            {students.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onViewProfile={handleViewProfile}
                isSelected={selectedStudent.id === student.id}
              />
            ))}
          </div>
        </section>

        {/* Dynamic Dashboard Grid */}
        <section className="dashboard-grid">
          {/* Student Profile Card */}
          <StudentProfile
            name={selectedStudent.name}
            rollNumber={selectedStudent.rollNumber}
            branch={selectedStudent.branch}
            year={selectedStudent.year}
          />

          {/* Attendance Overview Card */}
          <Attendance percentage={selectedStudent.attendance} />

          {/* Enrolled Subject List Card */}
          <SubjectList subjects={subjects} />

          {/* Examination Details Card */}
          <ExamDetails details={examDetails} />
        </section>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default App;
