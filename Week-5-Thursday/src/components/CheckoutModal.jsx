import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, DollarSign, Smartphone, ShoppingBag } from 'lucide-react';

export function CheckoutModal({ isOpen, onClose, cartItems, grandTotal, onOrderSuccess }) {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    name: 'John Doe',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, Suite 4B',
    instructions: 'Ring doorbell on arrival'
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const generatedId = 'FD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setStep('success');
    onOrderSuccess();
  };

  const handleClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {step === 'form' ? <ShoppingBag color="var(--primary)" size={20} /> : <CheckCircle2 color="var(--accent-green)" size={20} />}
            {step === 'form' ? 'Complete Your Order' : 'Order Confirmed!'}
          </h3>
          <button className="close-btn" onClick={handleClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {step === 'form' ? (
            <form onSubmit={handleSubmitOrder}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Address</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Payment Method</label>
                <div className="payment-options">
                  <div
                    className={`payment-card ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <CreditCard size={20} style={{ margin: '0 auto 0.2rem' }} />
                    <span style={{ fontSize: '0.8rem', display: 'block' }}>Credit Card</span>
                  </div>
                  <div
                    className={`payment-card ${paymentMethod === 'apple' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('apple')}
                  >
                    <Smartphone size={20} style={{ margin: '0 auto 0.2rem' }} />
                    <span style={{ fontSize: '0.8rem', display: 'block' }}>Apple Pay</span>
                  </div>
                  <div
                    className={`payment-card ${paymentMethod === 'cod' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <DollarSign size={20} style={{ margin: '0 auto 0.2rem' }} />
                    <span style={{ fontSize: '0.8rem', display: 'block' }}>Cash on Delivery</span>
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1rem', borderRadius: '12px', marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.9rem' }}>
                  <span>Items ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.1rem', color: 'var(--primary)' }}>
                  <span>Total Amount</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button type="submit" className="checkout-btn" style={{ marginTop: '1.25rem' }}>
                Place Order Now • ${grandTotal.toFixed(2)}
              </button>
            </form>
          ) : (
            <div className="order-success-screen">
              <div className="success-icon-wrap">
                <CheckCircle2 size={40} />
              </div>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>Thank You for Your Order!</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Your order <strong style={{ color: 'var(--primary)' }}>#{orderId}</strong> has been received and is being prepared with fresh ingredients.
              </p>

              <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-light)', textAlign: 'left', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span>Estimated Delivery Time:</span>
                  <strong style={{ color: 'var(--text-main)' }}>25 - 35 mins</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <span>Delivery Address:</span>
                  <strong style={{ color: 'var(--text-main)', maxWidth: '200px', textAlign: 'right' }}>{formData.address}</strong>
                </div>
              </div>

              <button className="reset-filter-btn" style={{ width: '100%' }} onClick={handleClose}>
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
