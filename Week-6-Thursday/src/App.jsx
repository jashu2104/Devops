import React, { useState } from 'react';
import StudentList from './components/StudentList';
import Student from './components/Student';
import MarksForm from './components/MarksForm';
import Result from './components/Result';
import Grade from './components/Grade';
import './App.css';

/**
 * Initial Student Dataset
 * Contains 5 realistic college student records with assigned subjects & marks.
 */
const initialStudents = [
  {
    id: "STU001",
    name: "Rahul Sharma",
    department: "Computer Science and Engineering",
    subjects: {
      "Data Structures": 85,
      "Database Management Systems": 78,
      "Computer Networks": 91,
      "Operating Systems": 82,
      "Web Development": 88
    }
  },
  {
    id: "STU002",
    name: "Ananya Reddy",
    department: "Information Technology",
    subjects: {
      "Data Structures": 92,
      "Database Management Systems": 87,
      "Computer Networks": 90,
      "Operating Systems": 94,
      "Web Development": 89
    }
  },
  {
    id: "STU003",
    name: "Arjun Kumar",
    department: "Computer Science and Engineering",
    subjects: {
      "Data Structures": 65,
      "Database Management Systems": 58,
      "Computer Networks": 72,
      "Operating Systems": 61,
      "Web Development": 68
    }
  },
  {
    id: "STU004",
    name: "Priya Nair",
    department: "Electronics and Communication Engineering",
    subjects: {
      "Data Structures": 76,
      "Database Management Systems": 81,
      "Computer Networks": 74,
      "Operating Systems": 79,
      "Web Development": 85
    }
  },
  {
    id: "STU005",
    name: "Vikram Singh",
    department: "Mechanical Engineering",
    subjects: {
      "Data Structures": 45,
      "Database Management Systems": 52,
      "Computer Networks": 39,
      "Operating Systems": 48,
      "Web Development": 55
    }
  }
];

function App() {
  // State 1: List of all students with their subject marks
  const [students, setStudents] = useState(initialStudents);

  // State 2: Currently selected student object
  const [selectedStudent, setSelectedStudent] = useState(initialStudents[0]);

  // State 3: Search filter term
  const [searchTerm, setSearchTerm] = useState("");

  // Event Handler: Select a student from the list
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  // Event Handler: Search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Event Handler: Update subject marks for the selected student.
   * Demonstrates Immutable State Pattern in React.
   */
  const handleMarksChange = (subject, newMarkValue) => {
    // Keep raw string or converted number depending on input validity
    const processedValue = newMarkValue === "" ? "" : Number(newMarkValue);

    setStudents(prevStudents => {
      const updatedStudents = prevStudents.map(student => {
        if (student.id === selectedStudent.id) {
          const updatedStudent = {
            ...student,
            subjects: {
              ...student.subjects,
              [subject]: processedValue
            }
          };
          // Synchronize the selectedStudent state with the newly updated object
          setSelectedStudent(updatedStudent);
          return updatedStudent;
        }
        return student;
      });
      return updatedStudents;
    });
  };

  // Compute selected student's dynamic metrics for summary cards
  const selectedMarks = selectedStudent ? Object.values(selectedStudent.subjects) : [];
  const selectedTotal = selectedMarks.reduce((sum, val) => sum + (Number(val) || 0), 0);
  const selectedAverage = selectedMarks.length > 0 ? selectedTotal / selectedMarks.length : 0;

  /**
   * Bonus Feature: Class Average Calculation
   * Calculates overall average mark across all students and all subjects.
   */
  const calculateClassAverage = () => {
    let totalAllMarks = 0;
    let totalSubjectEntries = 0;

    students.forEach(student => {
      Object.values(student.subjects).forEach(mark => {
        const num = Number(mark);
        if (!isNaN(num)) {
          totalAllMarks += num;
          totalSubjectEntries += 1;
        }
      });
    });

    return totalSubjectEntries > 0 ? (totalAllMarks / totalSubjectEntries).toFixed(2) : "0.00";
  };

  const classAverage = calculateClassAverage();

  return (
    <div className="app-container">
      {/* Header Banner */}
      <header className="app-header">
        <div className="header-brand">
          <div className="college-logo">🎓</div>
          <div>
            <h1 className="college-name">ABC Institute of Technology</h1>
            <h2 className="app-title">Student Marks & Grade Management System</h2>
          </div>
        </div>
        <div className="header-badge">
          Faculty Portal
        </div>
      </header>

      {/* Summary Dashboard Metric Cards */}
      <section className="summary-cards-section">
        <div className="metric-card">
          <div className="metric-icon">👨‍🎓</div>
          <div className="metric-details">
            <span className="metric-label">Total Students</span>
            <span className="metric-value">{students.length}</span>
          </div>
        </div>

        <div className="metric-card highlight-card">
          <div className="metric-icon">👤</div>
          <div className="metric-details">
            <span className="metric-label">Selected Student</span>
            <span className="metric-value student-name-truncate">{selectedStudent ? selectedStudent.name : 'None'}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-details">
            <span className="metric-label">Student Average</span>
            <span className="metric-value">{selectedAverage.toFixed(2)}%</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🏆</div>
          <div className="metric-details">
            <span className="metric-label">Current Grade</span>
            <div className="metric-grade-wrapper">
              <Grade average={selectedAverage} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="dashboard-grid">
        {/* Left Column: Student Roster Sidebar */}
        <aside className="sidebar-column">
          <StudentList
            students={students}
            selectedStudent={selectedStudent}
            onSelectStudent={handleSelectStudent}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />

          {/* Bonus Feature: Overall Class Average Card */}
          <div className="card class-average-card">
            <div className="class-avg-header">
              <span className="icon">🏛️</span>
              <div>
                <h4>Overall Class Average</h4>
                <p className="subtitle">Across all students & subjects</p>
              </div>
            </div>
            <div className="class-avg-value">
              {classAverage}%
            </div>
          </div>
        </aside>

        {/* Right Column: Selected Student Information, Marks Form & Results */}
        <section className="main-content-column">
          {selectedStudent ? (
            <>
              {/* Selected Student Banner */}
              <div className="card student-info-banner">
                <div className="student-profile-main">
                  <div className="profile-avatar">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div className="profile-text">
                    <div className="profile-id-row">
                      <span className="id-pill">{selectedStudent.id}</span>
                      <span className="dept-tag">{selectedStudent.department}</span>
                    </div>
                    <h2 className="profile-name">{selectedStudent.name}</h2>
                  </div>
                </div>
              </div>

              {/* Marks Input Form */}
              <MarksForm
                student={selectedStudent}
                marks={selectedStudent.subjects}
                onMarksChange={handleMarksChange}
              />

              {/* Results & Grade Summary */}
              <Result
                marks={selectedStudent.subjects}
              />
            </>
          ) : (
            <div className="card empty-selection-card">
              <h3>No Student Selected</h3>
              <p>Please select a student from the left panel to manage marks.</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 ABC Institute of Technology | Academic Grade Management System</p>
      </footer>
    </div>
  );
}

export default App;
