import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
} from '../services/studentApi';
import StudentForm from '../components/StudentForm';
import StudentFilters from '../components/StudentFilters';
import StudentList from '../components/StudentList';
import Loading from '../components/Loading';
import ConfirmModal from '../components/ConfirmModal';

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiConnected, setApiConnected] = useState(false);
  const [notification, setNotification] = useState(null);

  const [editingStudent, setEditingStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');

  const formRef = useRef(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const loadStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getStudents();
      setStudents(res.data || []);
      setApiConnected(true);
    } catch (err) {
      setApiConnected(false);
      setError(
        'Unable to load students. Please check whether the backend server is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return students.filter((student) => {
      const matchesBranch =
        selectedBranch === 'All Branches' ||
        student.branch.toLowerCase() === selectedBranch.toLowerCase();

      if (!matchesBranch) return false;

      if (!term) return true;

      const matchesName = student.name && student.name.toLowerCase().includes(term);
      const matchesRoll = student.rollNo && student.rollNo.toLowerCase().includes(term);
      const matchesId = student.id && student.id.toString().includes(term);

      return matchesName || matchesRoll || matchesId;
    });
  }, [students, searchTerm, selectedBranch]);

  const uniqueBranchesCount = useMemo(() => {
    const branchesSet = new Set(students.map((s) => s.branch));
    return branchesSet.size;
  }, [students]);

  const handleAddNewClick = () => {
    setEditingStudent(null);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
      const nameInput = document.getElementById('student-name');
      if (nameInput) nameInput.focus();
    }
  };

  const handleFormSubmit = async (formData) => {
    setIsSaving(true);
    try {
      if (editingStudent) {
        const res = await updateStudent(editingStudent.id, formData);
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? res.data : s))
        );
        setEditingStudent(null);
        showNotification('success', 'Student updated successfully!');
      } else {
        const res = await createStudent(formData);
        setStudents((prev) => [...prev, res.data]);
        showNotification('success', 'Student added successfully!');
      }
      return true;
    } catch (err) {
      showNotification('error', err.message || 'Operation failed');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const handleStartEdit = (student) => {
    setEditingStudent(student);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
      const nameInput = document.getElementById('student-name');
      if (nameInput) nameInput.focus();
    }
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handleDeleteClick = (studentOrId, name) => {
    if (typeof studentOrId === 'object' && studentOrId !== null) {
      setStudentToDelete(studentOrId);
    } else {
      const found = students.find((s) => s.id === studentOrId);
      setStudentToDelete(found || { id: studentOrId, name: name || 'Student' });
    }
  };

  const handleConfirmDelete = async () => {
    if (!studentToDelete) return;
    const { id } = studentToDelete;

    setIsDeleting(true);
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      showNotification('success', 'Student deleted successfully!');

      if (editingStudent && editingStudent.id === id) {
        setEditingStudent(null);
      }
    } catch (err) {
      showNotification('error', err.message || 'Failed to delete student');
    } finally {
      setIsDeleting(false);
      setStudentToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setStudentToDelete(null);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedBranch('All Branches');
  };

  return (
    <div className="dashboard-page">
      {notification && (
        <div
          className={`notification-toast toast-${notification.type}`}
          role="alert"
        >
          <div className="toast-content">
            <span className="toast-icon" aria-hidden="true">
              {notification.type === 'success' ? '✅' : '⚠️'}
            </span>
            <span className="toast-message">{notification.message}</span>
          </div>
          <button
            type="button"
            className="toast-close"
            onClick={() => setNotification(null)}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(studentToDelete)}
        title="Delete Student Record"
        message="Are you sure you want to delete this student record?"
        student={studentToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isProcessing={isDeleting}
      />

      <section className="dashboard-summary-section" aria-labelledby="overview-title">
        <div className="summary-header">
          <div>
            <h2 id="overview-title" className="section-title">Dashboard Overview</h2>
            <p className="section-subtitle">Real-time statistics & student directory metrics</p>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-add-main"
            onClick={handleAddNewClick}
            id="add-student-shortcut-btn"
          >
            + Add Student
          </button>
        </div>

        <div className="summary-cards-grid">
          <div className="summary-card card-total">
            <div className="summary-card-inner">
              <div className="summary-info">
                <span className="summary-label">Total Students</span>
                <span className="summary-value" id="total-students-count">
                  {students.length}
                </span>
                <span className="summary-hint">Enrolled in system</span>
              </div>
              <div className="summary-icon-badge icon-students" aria-hidden="true">👥</div>
            </div>
          </div>

          <div className="summary-card card-branches">
            <div className="summary-card-inner">
              <div className="summary-info">
                <span className="summary-label">Available Branches</span>
                <span className="summary-value" id="available-branches-count">
                  {uniqueBranchesCount}
                </span>
                <span className="summary-hint">Distinct departments</span>
              </div>
              <div className="summary-icon-badge icon-branches" aria-hidden="true">🏛️</div>
            </div>
          </div>

          <div className="summary-card card-status">
            <div className="summary-card-inner">
              <div className="summary-info">
                <span className="summary-label">API Connection Status</span>
                <div className="status-indicator-wrapper">
                  <span
                    className={`status-dot ${
                      apiConnected ? 'dot-connected' : 'dot-disconnected'
                    }`}
                    aria-hidden="true"
                  ></span>
                  <span className="summary-value status-text" id="api-connection-status">
                    {apiConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                <span className="summary-hint">
                  {apiConnected
                    ? 'REST API: http://localhost:5000'
                    : 'Backend unavailable'}
                </span>
              </div>
              <div className="summary-icon-badge icon-api" aria-hidden="true">⚡</div>
            </div>
          </div>
        </div>
      </section>

      <div className="dashboard-content-layout">
        <section className="form-column" aria-label="Student Form Section">
          <StudentForm
            ref={formRef}
            editingStudent={editingStudent}
            onSubmit={handleFormSubmit}
            onCancelEdit={handleCancelEdit}
            isSaving={isSaving}
          />
        </section>

        <section className="table-column" aria-label="Student Directory Section">
          <div className="card table-card">
            <div className="table-card-header">
              <div>
                <h3 className="table-title">Student Directory</h3>
                <p className="table-subtitle">
                  Showing {filteredStudents.length} of {students.length} students
                </p>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={loadStudents}
                title="Refresh student list from backend"
                disabled={loading}
              >
                🔄 Refresh
              </button>
            </div>

            <StudentFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedBranch={selectedBranch}
              onBranchChange={setSelectedBranch}
              onReset={handleResetFilters}
            />

            {loading ? (
              <Loading message="Loading students..." />
            ) : error ? (
              <div className="fetch-error-container" role="alert">
                <div className="fetch-error-icon" aria-hidden="true">⚠️</div>
                <h4 className="fetch-error-title">Connection Error</h4>
                <p className="fetch-error-text">{error}</p>
                <button
                  type="button"
                  className="btn btn-primary mt-3"
                  onClick={loadStudents}
                >
                  🔄 Retry Connection
                </button>
              </div>
            ) : (
              <StudentList
                students={filteredStudents}
                totalCount={students.length}
                onEdit={handleStartEdit}
                onDelete={handleDeleteClick}
                isFiltered={Boolean(searchTerm || selectedBranch !== 'All Branches')}
                onClearFilters={handleResetFilters}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
