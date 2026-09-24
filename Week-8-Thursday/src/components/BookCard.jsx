import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { fallbackCover } from '../data/books';
import { Star, ShoppingBag, Eye } from 'lucide-react';

export const BookCard = ({ book }) => {
  const { addToCart } = useCart();
  const [imgSrc, setImgSrc] = useState(book.cover || fallbackCover);

  const handleImageError = () => {
    setImgSrc(fallbackCover);
  };

  return (
    <div className="book-card">
      {/* Cover Container */}
      <div className="book-cover-container">
        <span className="category-tag">{book.category}</span>
        <img
          src={imgSrc}
          alt={book.title}
          className="book-cover"
          onError={handleImageError}
          loading="lazy"
        />
      </div>

      {/* Card Content */}
      <div className="book-card-body">
        <h3 className="book-card-title" title={book.title}>
          {book.title}
        </h3>
        <p className="book-card-author">by {book.author}</p>

        {/* Rating Stars */}
        <div className="book-card-rating">
          <div className="star-rating">
            <Star size={15} fill="#F59E0B" color="#F59E0B" />
          </div>
          <span className="rating-score">{book.rating}</span>
          <span className="rating-count">({book.reviews})</span>
        </div>

        {/* Card Footer with Price & Actions */}
        <div className="book-card-footer">
          <div className="book-price">₹{book.price}</div>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {/* View Details Link */}
            <Link
              to={`/books/${book.id}`}
              className="btn btn-secondary btn-sm"
              title="View Book Details"
              aria-label={`View details for ${book.title}`}
            >
              <Eye size={15} />
            </Link>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(book)}
              className="btn btn-primary btn-sm"
              title="Add to Cart"
              aria-label={`Add ${book.title} to cart`}
            >
              <ShoppingBag size={15} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
