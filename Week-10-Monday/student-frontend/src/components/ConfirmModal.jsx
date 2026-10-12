import React from 'react';

function ConfirmModal({ isOpen, title = 'Confirm Action', message, student, onConfirm, onCancel, isProcessing }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-icon-wrapper">
            <span className="modal-icon">🗑️</span>
          </div>
          <div>
            <h3 id="modal-title" className="modal-title">{title}</h3>
            <p className="modal-subtitle">Action requires confirmation</p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onCancel}
            disabled={isProcessing}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-message">{message}</p>
          {student && (
            <div className="modal-student-preview">
              <div className="preview-row">
                <span className="preview-label">Student:</span>
                <span className="preview-value font-bold">{student.name}</span>
              </div>
              <div className="preview-row">
                <span className="preview-label">Roll Number:</span>
                <span className="preview-value">{student.rollNo}</span>
              </div>
              <div className="preview-row">
                <span className="preview-label">Branch / Dept:</span>
                <span className="preview-value">{student.branch}</span>
              </div>
              <div className="preview-row">
                <span className="preview-label">System ID:</span>
                <span className="preview-value">#{student.id}</span>
              </div>
            </div>
          )}
          <p className="modal-warning-text">⚠️ This record will be permanently deleted from the active session.</p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isProcessing}
            id="cancel-modal-btn"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isProcessing}
            id="confirm-delete-modal-btn"
          >
            {isProcessing ? (
              <>
                <span className="btn-spinner"></span>
                <span>Deleting...</span>
              </>
            ) : (
              'Yes, Delete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
