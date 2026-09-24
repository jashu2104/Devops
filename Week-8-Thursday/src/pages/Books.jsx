import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { books as allBooks, categories } from '../data/books';
import { BookGrid } from '../components/BookGrid';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';

export const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'All';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [sortBy, setSortBy] = useState('featured');

  // Keep state in sync with URL search params if user clicks category elsewhere
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter & Sort Logic using useMemo for optimal performance
  const filteredAndSortedBooks = useMemo(() => {
    return allBooks
      .filter((book) => {
        // Search Filter (matches title, author, or category)
        const query = searchTerm.toLowerCase().trim();
        const matchesSearch =
          !query ||
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.category.toLowerCase().includes(query);

        // Category Filter
        const matchesCategory =
          selectedCategory === 'All' || book.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        return a.id - b.id; // Default featured sort
      });
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="container main-content animate-fade-in" style={{ paddingTop: '2.5rem' }}>
      {/* Header Banner */}
      <div style={{ marginBottom: '2rem' }}>
        <h1>Explore Books</h1>
        <p style={{ fontSize: '1.1rem', marginTop: '0.25rem' }}>
          Browse our full collection of books, filtered by subject, rating, or price.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="filter-bar">
        <div className="filter-top">
          {/* Search Box */}
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by title, author, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowUpDown size={16} style={{ color: 'var(--text-muted)' }} />
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured / Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="title">Title (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>
          Showing {filteredAndSortedBooks.length} of {allBooks.length} books
        </span>

        {(searchTerm || selectedCategory !== 'All' || sortBy !== 'featured') && (
          <button
            onClick={handleResetFilters}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <X size={14} /> Clear Filters
          </button>
        )}
      </div>

      {/* Book Grid */}
      <BookGrid books={filteredAndSortedBooks} onResetFilters={handleResetFilters} />
    </div>
  );
};
