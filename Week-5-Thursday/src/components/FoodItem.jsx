import React from 'react';
import { Plus, Minus, Star, Flame, ShoppingCart } from 'lucide-react';

export function FoodItem({ item, cartQuantity, onAddToCart, onUpdateQuantity }) {
  return (
    <div className="food-card">
      <div className="food-img-container">
        <img src={item.image} alt={item.name} className="food-img" />
        <div
          style={{
            position: 'absolute',
            top: '0.8rem',
            left: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(11, 15, 23, 0.8)',
            backdropFilter: 'blur(8px)',
            padding: '0.25rem 0.6rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}
        >
          <span className={`diet-dot ${item.isVeg ? 'diet-veg' : 'diet-nonveg'}`}></span>
          <span>{item.isVeg ? 'Vegetarian' : 'Non-Veg'}</span>
        </div>

        <div
          style={{
            position: 'absolute',
            top: '0.8rem',
            right: '0.8rem',
            background: 'rgba(11, 15, 23, 0.85)',
            backdropFilter: 'blur(8px)',
            color: 'var(--accent-yellow)',
            padding: '0.25rem 0.5rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          <Star size={13} fill="#F59E0B" color="#F59E0B" />
          <span>{item.rating}</span>
        </div>
      </div>

      <div className="food-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="food-category-tag">{item.category}</span>
          {item.calories && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <Flame size={12} color="var(--primary)" />
              {item.calories}
            </span>
          )}
        </div>

        <h3 className="food-title">{item.name}</h3>
        <p className="food-desc">{item.description}</p>

        <div className="food-footer">
          <span className="food-price">${item.price.toFixed(2)}</span>

          {cartQuantity > 0 ? (
            <div className="qty-control-inline">
              <button
                className="qty-btn-sm"
                onClick={() => onUpdateQuantity(item.id, -1)}
                title="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="qty-num-sm">{cartQuantity}</span>
              <button
                className="qty-btn-sm"
                onClick={() => onUpdateQuantity(item.id, 1)}
                title="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button className="add-cart-btn" onClick={() => onAddToCart(item)}>
              <ShoppingCart size={16} />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
