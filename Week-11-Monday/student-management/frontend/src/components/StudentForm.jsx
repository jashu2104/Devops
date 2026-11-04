import React, { useState, useEffect, forwardRef } from 'react';

const BRANCH_OPTIONS = ['CSE', 'ECE', 'EEE', 'IT', 'AIML', 'Mechanical', 'Civil'];

const StudentForm = forwardRef(function StudentForm(
  { editingStudent, onSubmit, onCancelEdit, isSaving },
  ref
) {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    branch: 'CSE'
  });
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || '',
        rollNo: editingStudent.rollNo || '',
        branch: editingStudent.branch || 'CSE'
      });
      setValidationError('');
    } else {
      setFormData({
        name: '',
        rollNo: '',
        branch: 'CSE'
      });
      setValidationError('');
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (validationError) {
      setValidationError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedRollNo = formData.rollNo.trim();
    const trimmedBranch = formData.branch.trim();

    if (!trimmedName || !trimmedRollNo || !trimmedBranch) {
      setValidationError('Please fill out all fields. Whitespace only is not permitted.');
      return;
    }

    try {
      const payload = {
        name: trimmedName,
        rollNo: trimmedRollNo,
        branch: trimmedBranch
      };

      const success = await onSubmit(payload);
      if (success && !editingStudent) {
        setFormData({
          name: '',
          rollNo: '',
          branch: 'CSE'
        });
        setValidationError('');
      }
    } catch (err) {
      setValidationError(err.message || 'Operation failed');
    }
  };

  const isEditMode = Boolean(editingStudent);

  return (
    <div className="card form-card" ref={ref} id="student-form-section">
      <div className="form-card-header">
        <h2 className="form-title">
          {isEditMode ? 'Update Student' : 'Add Student'}
        </h2>
        {isEditMode && (
          <span className="badge editing-badge">Editing ID #{editingStudent.id}</span>
        )}
      </div>

      {validationError && (
        <div className="alert alert-error" role="alert">
          <span className="alert-icon" aria-hidden="true">⚠️</span>
          <span>{validationError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="student-form" noValidate>
        <div className="form-group">
          <label htmlFor="student-name">
            Student Name <span className="required-star">*</span>
          </label>
          <input
            id="student-name"
            name="name"
            type="text"
            className="form-control"
            placeholder="e.g. Rahul Sharma"
            value={formData.name}
            onChange={handleChange}
            disabled={isSaving}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="student-roll">
            Roll Number <span className="required-star">*</span>
          </label>
          <input
            id="student-roll"
            name="rollNo"
            type="text"
            className="form-control"
            placeholder="e.g. CSE101"
            value={formData.rollNo}
            onChange={handleChange}
            disabled={isSaving}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="student-branch">
            Branch <span className="required-star">*</span>
          </label>
          <select
            id="student-branch"
            name="branch"
            className="form-control"
            value={formData.branch}
            onChange={handleChange}
            disabled={isSaving}
            required
          >
            {BRANCH_OPTIONS.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSaving}
            id="submit-student-btn"
          >
            {isSaving ? (
              <>
                <span className="btn-spinner"></span>
                <span>Saving...</span>
              </>
            ) : isEditMode ? (
              'Update Student'
            ) : (
              'Add Student'
            )}
          </button>

          {isEditMode && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelEdit}
              disabled={isSaving}
              id="cancel-edit-btn"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
});

export default StudentForm;
