import React from 'react';
import { Star, Clock, Truck } from 'lucide-react';

export function RestaurantCard({ restaurant, isSelected, onSelect }) {
  return (
    <div
      className={`restaurant-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(restaurant.id)}
    >
      <div className="restaurant-img-wrap">
        <img src={restaurant.image} alt={restaurant.name} className="restaurant-img" />
        {restaurant.tag && (
          <span className={`badge-tag ${restaurant.tag === 'Top Rated' ? 'badge-featured' : ''}`}>
            {restaurant.tag}
          </span>
        )}
      </div>

      <div className="restaurant-info">
        <div className="restaurant-header">
          <h3 className="restaurant-name">{restaurant.name}</h3>
          <div className="rating-badge">
            <Star size={14} fill="#F59E0B" color="#F59E0B" />
            <span>{restaurant.rating}</span>
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{restaurant.cuisine}</p>

        <div className="restaurant-meta">
          <div className="meta-item">
            <Clock size={14} />
            <span>{restaurant.prepTime}</span>
          </div>
          <div className="meta-item">
            <Truck size={14} />
            <span>${restaurant.deliveryFee.toFixed(2)} delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
}
