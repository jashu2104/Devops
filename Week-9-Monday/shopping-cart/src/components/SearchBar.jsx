import React from 'react';
import { Search, X } from 'lucide-react';

/**
 * SearchBar Component
 * Demonstrates: Controlled Input Component & Event Handlers
 * 
 * @param {Object} props
 * @param {string} props.searchTerm - Current search term state from parent
 * @param {Function} props.onSearchChange - Event handler callback function to update search term
 */
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar-wrapper">
      <div className="search-input-container">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search by product name, category, or ID (e.g. Laptop, P101)..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search products"
        />
        {searchTerm && (
          <button
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            aria-label="Clear search input"
            type="button"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
