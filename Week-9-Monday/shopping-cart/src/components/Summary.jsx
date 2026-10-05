import React from 'react';
import { CreditCard, Tag, Truck, Sparkles, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../data/products';

/**
 * Summary Component
 * Demonstrates: Presentational props rendering for derived dynamic calculations
 * 
 * @param {Object} props
 * @param {number} props.totalItems - Sum of item quantities
 * @param {number} props.subtotal - Total price before discounts/shipping
 * @param {number} props.discount - 10% discount amount if subtotal > ₹5,000
 * @param {number} props.delivery - Delivery fee (₹0 if subtotal > ₹2,000, else ₹100)
 * @param {number} props.total - Final payable bill amount (subtotal - discount + delivery)
 * @param {Function} props.onCheckout - Handler function when user clicks Checkout
 */
const Summary = ({
  totalItems,
  subtotal,
  discount,
  delivery,
  total,
  onCheckout
}) => {
  // Discount threshold: ₹5,000
  const DISCOUNT_THRESHOLD = 5000;
  const isDiscountUnlocked = subtotal > DISCOUNT_THRESHOLD;
  const amountToDiscount = DISCOUNT_THRESHOLD - subtotal;

  // Free delivery threshold: ₹2,000
  const DELIVERY_THRESHOLD = 2000;
  const isFreeDeliveryUnlocked = subtotal > DELIVERY_THRESHOLD;
  const amountToFreeDelivery = DELIVERY_THRESHOLD - subtotal;

  return (
    <div className="order-summary-card">
      <h3 className="summary-title">
        <CreditCard size={20} />
        <span>Order Summary</span>
      </h3>

      {/* Dynamic Progress / Offer Banners */}
      {totalItems > 0 && (
        <div className="summary-offers-container">
          {/* Free Delivery Banner */}
          <div className={`offer-badge ${isFreeDeliveryUnlocked ? 'unlocked' : 'pending'}`}>
            <Truck size={16} />
            <span>
              {isFreeDeliveryUnlocked
                ? '🚚 Free Delivery unlocked!'
                : `🚚 Add ${formatCurrency(amountToFreeDelivery)} more for FREE delivery`}
            </span>
          </div>

          {/* Discount Offer Banner */}
          <div className={`offer-badge ${isDiscountUnlocked ? 'unlocked' : 'pending'}`}>
            <Sparkles size={16} />
            <span>
              {isDiscountUnlocked
                ? '🎉 You unlocked a 10% discount!'
                : `✨ Add ${formatCurrency(amountToDiscount)} more to unlock 10% discount`}
            </span>
          </div>
        </div>
      )}

      {/* Bill Calculation Breakdown Table */}
      <div className="summary-rows">
        <div className="summary-row">
          <span className="row-label">Total Items</span>
          <span className="row-value">{totalItems}</span>
        </div>

        <div className="summary-row">
          <span className="row-label">Subtotal</span>
          <span className="row-value">{formatCurrency(subtotal)}</span>
        </div>

        <div className="summary-row">
          <span className="row-label flex-align-center">
            <Tag size={14} className="tag-icon" />
            <span>Discount (10%)</span>
          </span>
          <span className={`row-value ${discount > 0 ? 'discount-text' : ''}`}>
            {discount > 0 ? `-${formatCurrency(discount)}` : '₹0'}
          </span>
        </div>

        <div className="summary-row">
          <span className="row-label flex-align-center">
            <Truck size={14} className="tag-icon" />
            <span>Delivery Fee</span>
          </span>
          <span className="row-value">
            {totalItems === 0
              ? '₹0'
              : delivery === 0
              ? <span className="free-badge">FREE</span>
              : formatCurrency(delivery)}
          </span>
        </div>

        <div className="summary-divider"></div>

        {/* Final Total Amount */}
        <div className="summary-row summary-total-row">
          <span className="total-label">Total Amount</span>
          <span className="total-value">{formatCurrency(total)}</span>
        </div>
      </div>

      {/* Checkout Action Button */}
      <button
        type="button"
        className="checkout-btn"
        disabled={totalItems === 0}
        onClick={onCheckout}
      >
        <span>Proceed to Checkout</span>
        <CreditCard size={18} />
      </button>

      {totalItems === 0 && (
        <p className="checkout-hint">
          <AlertCircle size={13} /> Add items to cart to enable checkout
        </p>
      )}
    </div>
  );
};

export default Summary;
