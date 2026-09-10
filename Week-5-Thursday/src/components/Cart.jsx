import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, Check } from 'lucide-react';

export function Cart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCheckout
}) {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeDeliveryThreshold = 35.0;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold || subtotal === 0;
  const deliveryFee = subtotal > 0 ? (isFreeDelivery ? 0 : 2.99) : 0;
  
  const discountAmount = discountApplied ? subtotal * 0.20 : 0;
  const tax = subtotal > 0 ? (subtotal - discountAmount) * 0.08 : 0;
  const grandTotal = subtotal > 0 ? subtotal - discountAmount + deliveryFee + tax : 0;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'FEAST20') {
      setDiscountApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "FEAST20" for 20% off!');
    }
  };

  return (
    <div className={`cart-overlay ${isOpen ? 'open' : ''}`}>
      <div className="cart-drawer">
        {/* Cart Header */}
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag color="var(--primary)" size={22} />
            <h2>Your Order Cart</h2>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Cart Content */}
        <div className="cart-body">
          {cartItems.length === 0 ? (
            /* Conditional Rendering: Empty Cart Message */
            <div className="empty-state">
              <div className="empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any delicious food to your order yet.</p>
              <button className="reset-filter-btn" onClick={onClose}>
                Browse Delicious Dishes
              </button>
            </div>
          ) : (
            <>
              {/* Free Delivery Tracker */}
              <div className="free-delivery-progress">
                <div className="progress-text">
                  <span>
                    {isFreeDelivery ? (
                      <strong style={{ color: 'var(--accent-green)' }}>🎉 You unlocked FREE Delivery!</strong>
                    ) : (
                      `Add $${(freeDeliveryThreshold - subtotal).toFixed(2)} more for FREE Delivery`
                    )}
                  </span>
                  <span>${subtotal.toFixed(2)} / $35.00</span>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Item List */}
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.name}</h4>
                    <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>
                      ${item.price.toFixed(2)} each
                    </span>
                  </div>

                  <div className="cart-item-actions">
                    <div className="qty-control-inline">
                      <button
                        className="qty-btn-sm"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-num-sm">{item.quantity}</span>
                      <button
                        className="qty-btn-sm"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => onRemoveItem(item.id)}
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Promo Code Input */}
              <div style={{ marginTop: '0.5rem' }}>
                <div className="promo-container">
                  <input
                    type="text"
                    className="promo-input"
                    placeholder='Promo code (Try "FEAST20")'
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={discountApplied}
                  />
                  <button
                    className="promo-btn"
                    onClick={handleApplyPromo}
                    disabled={discountApplied}
                  >
                    {discountApplied ? <Check size={16} color="var(--accent-green)" /> : <Tag size={16} />}
                  </button>
                </div>
                {promoError && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-red)', marginTop: '0.25rem', display: 'block' }}>
                    {promoError}
                  </span>
                )}
                {discountApplied && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)', marginTop: '0.25rem', display: 'block' }}>
                    ✓ 20% Discount applied!
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Cart Summary & Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {discountApplied && (
              <div className="summary-row discount">
                <span>Discount (20%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? <strong style={{ color: 'var(--accent-green)' }}>FREE</strong> : `$${deliveryFee.toFixed(2)}`}</span>
            </div>

            <div className="summary-row">
              <span>Estimated Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="summary-row total">
              <span>Grand Total</span>
              <span style={{ color: 'var(--primary)' }}>${grandTotal.toFixed(2)}</span>
            </div>

            <button className="checkout-btn" onClick={onOpenCheckout}>
              Proceed to Checkout <ArrowRight size={18} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '4px' }} />
            </button>

            <button className="clear-cart-text-btn" onClick={onClearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
