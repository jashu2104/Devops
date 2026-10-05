import React, { useState, useEffect } from 'react';
import { X, Star, Plus, Minus, Check, ShoppingBag, Tag, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { formatCurrency } from '../data/products';

/**
 * ProductDetailModal Component
 * Demonstrates: Detailed Product Quick View Modal & Props passing for deep inspection
 * 
 * @param {Object} props
 * @param {Object|null} props.product - Selected product object to view details
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {Function} props.onClose - Dismiss modal handler
 * @param {Function} props.onAddToCart - Callback to add specified quantity of product to cart
 */
const ProductDetailModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedQty, setSelectedQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Reset local quantity state whenever selected product changes
  useEffect(() => {
    setSelectedQty(1);
    setAdded(false);
    setImageError(false);
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAdd = () => {
    // Add item with specified quantity
    for (let i = 0; i < selectedQty; i++) {
      onAddToCart(product);
    }

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content product-detail-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Modal Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close product details">
          <X size={20} />
        </button>

        <div className="product-detail-grid">
          {/* Left Column: Product Media */}
          <div className="detail-media-container">
            {product.badge && <span className="detail-badge">{product.badge}</span>}
            {!imageError ? (
              <img
                src={product.image}
                alt={product.name}
                className="detail-main-image"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="detail-image-fallback">
                <ShoppingBag size={64} className="fallback-icon" />
                <span>{product.name}</span>
              </div>
            )}
          </div>

          {/* Right Column: Detailed Product Information */}
          <div className="detail-info-container">
            {/* Meta Tags */}
            <div className="detail-meta-row">
              <span className="product-category-chip">
                <Tag size={12} />
                {product.category}
              </span>
              <span className="detail-id-chip">ID: {product.id}</span>
            </div>

            {/* Title & Rating */}
            <h2 className="detail-title">{product.name}</h2>

            <div className="detail-rating-row">
              <div className="stars-container">
                <Star size={16} className="star-filled" />
                <span className="rating-num">{product.rating || 4.5}</span>
              </div>
              <span className="reviews-count">({product.reviewsCount || 120} verified reviews)</span>
              <span className="stock-badge">In Stock</span>
            </div>

            {/* Price */}
            <div className="detail-price-box">
              <span className="detail-price-label">Price</span>
              <div className="detail-price">{formatCurrency(product.price)}</div>
            </div>

            {/* Detailed Description */}
            <p className="detail-description">{product.description}</p>

            {/* Key Specifications List */}
            {product.specs && product.specs.length > 0 && (
              <div className="detail-specs-box">
                <h4 className="specs-title">
                  <Sparkles size={14} /> Key Highlights & Specs
                </h4>
                <ul className="specs-list">
                  {product.specs.map((spec, index) => (
                    <li key={index} className="spec-item">
                      <span className="spec-bullet">•</span> {spec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Guarantees Perks */}
            <div className="detail-guarantees">
              <span className="guarantee-chip">
                <ShieldCheck size={14} /> 1 Year Warranty
              </span>
              <span className="guarantee-chip">
                <Truck size={14} /> Free Delivery over ₹2,000
              </span>
            </div>

            {/* Action Bar: Quantity Selector & Add to Cart */}
            <div className="detail-actions-row">
              <div className="detail-qty-selector">
                <button
                  type="button"
                  className="detail-qty-btn"
                  onClick={() => setSelectedQty((prev) => Math.max(1, prev - 1))}
                  disabled={selectedQty <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="detail-qty-value">{selectedQty}</span>
                <button
                  type="button"
                  className="detail-qty-btn"
                  onClick={() => setSelectedQty((prev) => prev + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                type="button"
                className={`detail-add-btn ${added ? 'btn-success' : ''}`}
                onClick={handleAdd}
              >
                {added ? (
                  <>
                    <Check size={18} />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    <span>Add to Cart ({formatCurrency(product.price * selectedQty)})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
