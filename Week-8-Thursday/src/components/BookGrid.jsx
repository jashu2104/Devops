import React from 'react';
import { BookCard } from './BookCard';
import { EmptyState } from './EmptyState';
import { SearchX } from 'lucide-react';

export const BookGrid = ({ books, onResetFilters }) => {
  if (!books || books.length === 0) {
    return (
      <EmptyState
        icon={<SearchX size={48} className="text-muted" />}
        title="No books match your criteria"
        description="Try adjusting your search terms or selecting a different category filter."
        actionText="Clear All Filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};
