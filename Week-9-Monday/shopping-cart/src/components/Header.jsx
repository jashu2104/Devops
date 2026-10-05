import React from 'react';
import { ShoppingBag, ShoppingCart, Sparkles } from 'lucide-react';

/**
 * Header Component
 * Demonstrates: Parent-to-Child Props Data Flow
 * 
 * @param {Object} props
 * @param {number} props.cartCount - Dynamic number of total items in the shopping cart
 * @param {Function} props.onCartClick - Callback to scroll to cart view on mobile/desktop
 */
const Header = ({ cartCount, onCartClick }) => {
  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand Logo & Title */}
        <div className="brand-section">
          <div className="brand-logo">
            <ShoppingBag className="logo-icon" size={26} />
          </div>
          <div className="brand-info">
            <h1 className="brand-title">
              Online Shopping Cart
            </h1>
            <p className="brand-subtitle">DevOps & Fullstack Architecture</p>
          </div>
        </div>

        {/* Action Controls & Cart Badge */}
        <div className="header-actions">
          <button 
            className="cart-trigger-btn"
            onClick={onCartClick}
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingCart size={20} />
            <span className="cart-trigger-label">Cart</span>
            {/* Dynamic Badge - Updates via props */}
            <span className={`cart-count-badge ${cartCount > 0 ? 'pulse' : ''}`}>
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
