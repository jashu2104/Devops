import React from 'react';
import { ShoppingCart, ArrowRight } from 'lucide-react';

/**
 * EmptyCart Component
 * Demonstrates: Conditional Rendering UI component when cart array is empty
 * 
 * @param {Object} props
 * @param {Function} props.onStartShopping - Callback function to focus/scroll to product listing
 */
const EmptyCart = ({ onStartShopping }) => {
  return (
    <div className="empty-cart-container">
      <div className="empty-cart-card">
        <div className="empty-cart-icon-wrapper">
          <ShoppingCart size={48} className="empty-cart-icon" />
        </div>
        <h3 className="empty-cart-title">Your cart is empty</h3>
        <p className="empty-cart-subtitle">
          Looks like you haven't added any products to your shopping cart yet. Explore our featured items and start shopping!
        </p>
        <button
          type="button"
          className="start-shopping-btn"
          onClick={onStartShopping}
        >
          <span>Start Shopping</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default EmptyCart;
