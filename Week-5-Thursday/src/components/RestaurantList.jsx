import React from 'react';
import { RestaurantCard } from './RestaurantCard';
import { Store } from 'lucide-react';

export function RestaurantList({ restaurants, selectedRestaurantId, onSelectRestaurant }) {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <div className="section-title-wrap">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Store color="var(--primary)" size={24} />
          <h2 className="section-title">Popular Restaurants</h2>
        </div>
        {selectedRestaurantId && (
          <button
            onClick={() => onSelectRestaurant(null)}
            style={{
              background: 'rgba(255, 82, 0, 0.15)',
              color: 'var(--primary)',
              padding: '0.4rem 0.9rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}
          >
            Show All Restaurants
          </button>
        )}
      </div>

      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            isSelected={selectedRestaurantId === restaurant.id}
            onSelect={onSelectRestaurant}
          />
        ))}
      </div>
    </section>
  );
}
