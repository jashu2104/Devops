import React from 'react';

function StudentFilters({ searchTerm, onSearchChange, selectedBranch, onBranchChange, onReset }) {
  const branches = [
    'All Branches',
    'CSE',
    'ECE',
    'EEE',
    'IT',
    'AIML',
    'Mechanical',
    'Civil'
  ];

  return (
    <div className="filters-container">
      <div className="search-box-wrapper">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          id="student-search-input"
          type="text"
          className="search-input"
          placeholder="Search by name, roll no, or ID..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search students by name, roll number, or ID"
        />
        {searchTerm && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            title="Clear search"
            aria-label="Clear search query"
          >
            ×
          </button>
        )}
      </div>

      <div className="branch-filter-wrapper">
        <label htmlFor="branch-filter-select" className="filter-label">Branch:</label>
        <select
          id="branch-filter-select"
          className="filter-select"
          value={selectedBranch}
          onChange={(e) => onBranchChange(e.target.value)}
        >
          {branches.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {(searchTerm || selectedBranch !== 'All Branches') && (
        <button
          type="button"
          className="btn-reset-filters"
          onClick={onReset}
          title="Reset all filters"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}

export default StudentFilters;
