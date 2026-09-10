import React from 'react';
import { ShoppingBag, Search, UtensilsCrossed, X } from 'lucide-react';

export function Header({ searchQuery, setSearchQuery, cartCount, cartTotal, onOpenCart }) {
  return (
    <header className="header-glass">
      <div className="header-content">
        {/* Brand Logo */}
        <div className="logo-section" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="logo-badge">
            <UtensilsCrossed size={24} />
          </div>
          <span className="logo-title">
            Feast<span style={{ color: 'var(--primary)' }}>Dash</span>
          </span>
        </div>

        {/* Global Search Bar */}
        <div className="search-bar-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search burgers, pizza, ramen, salads, or restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')} title="Clear search">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Header Actions: Cart Button */}
        <div className="header-actions">
          <button className="cart-toggle-btn" onClick={onOpenCart} aria-label="View Cart">
            <ShoppingBag size={20} />
            <span style={{ display: 'inline-block' }}>Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            {cartTotal > 0 && (
              <span style={{ marginLeft: '0.2rem', fontSize: '0.9rem', opacity: 0.9 }}>
                ${cartTotal.toFixed(2)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
