import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../components/CartItem';
import { EmptyState } from '../components/EmptyState';
import { ShoppingBag, ArrowRight, Trash2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Cart = () => {
  const { cart, clearCart, subtotal, totalItems, showToast } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  const handleCheckout = () => {
    setCheckingOut(true);
    showToast('Checkout demo triggered! Payments coming soon.', 'info');
    setTimeout(() => {
      setCheckingOut(false);
    }, 2000);
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="container main-content animate-fade-in" style={{ paddingTop: '3rem' }}>
        <EmptyState
          icon={<ShoppingBag size={56} style={{ color: 'var(--primary)' }} />}
          title="Your cart is empty"
          description="Looks like you haven't added any books to your cart yet. Explore our curated catalog to find your next great read."
          actionText="Browse Books"
          onAction={() => window.location.href = '/books'}
        />
      </div>
    );
  }

  return (
    <div className="container main-content animate-fade-in" style={{ paddingTop: '2.5rem' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Shopping Cart</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            You have {totalItems} item{totalItems > 1 ? 's' : ''} in your cart.
          </p>
        </div>

        <button
          onClick={clearCart}
          className="btn btn-secondary btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--error)' }}
        >
          <Trash2 size={16} /> Clear Cart
        </button>
      </div>

      {/* Cart Layout: Items + Order Summary */}
      <div className="cart-layout">
        {/* Left Column: Cart Items List */}
        <div className="cart-items-list">
          {cart.map((item) => (
            <CartItem key={item.book.id} item={item} />
          ))}
        </div>

        {/* Right Column: Order Summary */}
        <div className="summary-card">
          <h3 className="summary-title">Order Summary</h3>

          <div className="summary-row">
            <span style={{ color: 'var(--text-muted)' }}>Subtotal ({totalItems} items)</span>
            <span style={{ fontWeight: '600' }}>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span style={{ color: 'var(--text-muted)' }}>Estimated Shipping</span>
            <span style={{ color: 'var(--success)', fontWeight: '700' }}>FREE</span>
          </div>

          <div className="summary-row">
            <span style={{ color: 'var(--text-muted)' }}>Taxes</span>
            <span style={{ color: 'var(--text-muted)' }}>Calculated at checkout</span>
          </div>

          <div className="summary-total">
            <span>Total Amount</span>
            <span>₹{subtotal}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={checkingOut}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', marginBottom: '1.25rem' }}
          >
            {checkingOut ? 'Processing...' : 'Proceed to Checkout'}{' '}
            {!checkingOut && <ArrowRight size={18} />}
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              justifyContent: 'center'
            }}
          >
            <ShieldCheck size={16} style={{ color: 'var(--success)' }} />
            <span>Guaranteed 256-bit SSL Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
