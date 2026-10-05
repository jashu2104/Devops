import React, { useState } from 'react';
import { Plus, Check, ShoppingBag, Tag, Eye, Star } from 'lucide-react';
import { formatCurrency } from '../data/products';

/**
 * ProductCard Component
 * Demonstrates: Presentational Child Component receiving explicit Props
 * and sending event notifications to parent via callback props (onAdd & onSelectProduct).
 * 
 * @param {Object} props
 * @param {string} props.id - Product ID
 * @param {string} props.name - Product display name
 * @param {number} props.price - Numeric price in INR
 * @param {string} props.category - Product category name
 * @param {string} props.image - Image URL path
 * @param {string} [props.badge] - Optional badge tag
 * @param {string} [props.description] - Product description
 * @param {number} [props.rating] - Product star rating
 * @param {Function} props.onAdd - Callback to add item to cart
 * @param {Function} props.onSelectProduct - Callback to open product details modal
 */
const ProductCard = ({
  id,
  name,
  price,
  category,
  image,
  badge,
  description,
  rating = 4.5,
  onAdd,
  onSelectProduct
}) => {
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Handle Add to Cart action without triggering details modal
  const handleAddToCart = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    onAdd();

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  // Handle View Details action explicitly
  const handleViewDetails = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (onSelectProduct) onSelectProduct();
  };

  return (
    <div className="product-card" onClick={handleViewDetails}>
      {/* Product Image Box with Quick View Overlay */}
      <div className="product-image-container" onClick={handleViewDetails}>
        {badge && <span className="product-badge">{badge}</span>}
        <span className="product-id-tag">{id}</span>
        
        {/* Quick View Hover Overlay */}
        <div className="image-hover-overlay" onClick={handleViewDetails}>
          <Eye size={18} />
          <span>Quick View</span>
        </div>

        {!imageError ? (
          <img
            src={image}
            alt={name}
            className="product-image"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="product-image-fallback">
            <ShoppingBag size={48} className="fallback-icon" />
            <span>{name}</span>
          </div>
        )}
      </div>

      {/* Product Details Content */}
      <div className="product-info">
        <div className="product-meta">
          <span className="product-category-chip">
            <Tag size={12} />
            {category}
          </span>
          <div className="card-rating">
            <Star size={12} className="star-filled" />
            <span>{rating}</span>
          </div>
        </div>

        <h3 
          className="product-title" 
          onClick={handleViewDetails}
          title="Click to view details"
        >
          {name}
        </h3>

        {description && (
          <p className="product-description" onClick={handleViewDetails}>
            {description}
          </p>
        )}

        <div className="product-footer">
          <div className="product-price-container">
            <span className="price-label">Price</span>
            <span className="product-price">{formatCurrency(price)}</span>
          </div>

          <div className="card-action-buttons">
            {/* View Details Button */}
            <button
              type="button"
              className="view-details-btn"
              onClick={handleViewDetails}
              aria-label={`View details of ${name}`}
              title="View product details"
            >
              <Eye size={15} />
              <span>Details</span>
            </button>

            {/* Add to Cart Action Button */}
            <button
              type="button"
              className={`add-to-cart-btn ${added ? 'btn-success' : ''}`}
              onClick={handleAddToCart}
              aria-label={`Add ${name} to shopping cart`}
            >
              {added ? (
                <>
                  <Check size={15} />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <Plus size={15} />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
