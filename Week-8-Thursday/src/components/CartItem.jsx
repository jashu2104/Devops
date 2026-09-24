import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { fallbackCover } from '../data/books';
import { Minus, Plus, Trash2 } from 'lucide-react';

export const CartItem = ({ item }) => {
  const { book, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();
  const [imgSrc, setImgSrc] = useState(book.cover || fallbackCover);

  const handleImageError = () => {
    setImgSrc(fallbackCover);
  };

  return (
    <div className="cart-item-card">
      {/* Thumbnail Cover */}
      <img
        src={imgSrc}
        alt={book.title}
        className="cart-item-cover"
        onError={handleImageError}
      />

      {/* Book Information */}
      <div className="cart-item-details">
        <span className="badge badge-primary" style={{ fontSize: '0.65rem', marginBottom: '0.25rem' }}>
          {book.category}
        </span>
        <h4 style={{ margin: '0.25rem 0' }}>
          <Link to={`/books/${book.id}`} style={{ color: 'var(--text-main)' }}>
            {book.title}
          </Link>
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>by {book.author}</p>
        <div className="cart-item-price">₹{book.price} each</div>
      </div>

      {/* Quantity & Actions */}
      <div className="cart-item-actions">
        {/* Subtotal */}
        <div style={{ textAlign: 'right', fontWeight: '800', fontSize: '1.1rem' }}>
          ₹{book.price * quantity}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="quantity-selector">
            <button
              onClick={() => updateQuantity(book.id, quantity - 1)}
              className="quantity-btn"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="quantity-input" style={{ display: 'inline-block', lineHeight: '32px' }}>
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(book.id, quantity + 1)}
              className="quantity-btn"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            onClick={() => removeFromCart(book.id)}
            className="btn btn-danger btn-sm"
            aria-label="Remove item"
            title="Remove from cart"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
