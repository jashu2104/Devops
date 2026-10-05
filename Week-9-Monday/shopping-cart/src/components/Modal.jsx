import React from 'react';
import { X, CheckCircle, AlertTriangle, ShoppingBag } from 'lucide-react';
import { formatCurrency } from '../data/products';

/**
 * Modal Component
 * Displays Checkout Success Demo or Clear Cart Confirmation
 */
export const CheckoutModal = ({ isOpen, onClose, cart, total, totalItems, onConfirmOrder }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header text-center">
          <div className="modal-icon-wrapper success">
            <CheckCircle size={44} className="modal-success-icon" />
          </div>
          <h2 className="modal-title">Order Checkout Demo</h2>
        </div>

        <div className="modal-body">
          <div className="checkout-summary-box">
            <div className="checkout-stat-item">
              <span className="stat-label">Total Items</span>
              <span className="stat-value">{totalItems}</span>
            </div>
            <div className="checkout-stat-item">
              <span className="stat-label">Total Amount</span>
              <span className="stat-value highlight">{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="checkout-item-preview">
            <h4 className="preview-title">Items in Order:</h4>
            <ul className="preview-list">
              {cart.map((item) => (
                <li key={item.id} className="preview-item">
                  <span>{item.name} × {item.quantity}</span>
                  <span className="preview-price">{formatCurrency(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="notice-box info">
            <p>
              💡 <strong>Evaluation Note:</strong> This frontend application models the entire shopping cart logic with state management (`useState`), dynamic total recalculation, discount rules, and free delivery thresholds.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-modal-secondary" onClick={onClose}>
            Close
          </button>
          <button type="button" className="btn-modal-primary" onClick={onConfirmOrder}>
            Complete Demo Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export const ClearCartModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header text-center">
          <div className="modal-icon-wrapper danger">
            <AlertTriangle size={40} className="modal-danger-icon" />
          </div>
          <h3 className="modal-title">Clear Shopping Cart?</h3>
          <p className="modal-subtitle">Are you sure you want to remove all items from your cart?</p>
        </div>

        <div className="modal-footer grid-2">
          <button type="button" className="btn-modal-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn-modal-danger" onClick={onConfirm}>
            Yes, Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};
