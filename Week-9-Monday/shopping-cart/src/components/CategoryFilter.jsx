import React from 'react';
import { Layers } from 'lucide-react';

/**
 * CategoryFilter Component
 * Demonstrates: Reusable Filter Pills & State Uplifting via Callback Props
 * 
 * @param {Object} props
 * @param {Array<string>} props.categories - Array of unique product category strings
 * @param {string} props.selectedCategory - Currently active selected category
 * @param {Function} props.onSelectCategory - Callback function when user selects a category
 */
const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter-container">
      <div className="category-label">
        <Layers size={16} />
        <span>Categories:</span>
      </div>
      <div className="category-pills">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat)}
            type="button"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
