import React from 'react';
import { UtensilsCrossed, Phone, Mail, MapPin, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="logo-section" style={{ marginBottom: '1rem' }}>
            <div className="logo-badge">
              <UtensilsCrossed size={20} />
            </div>
            <span className="logo-title">
              Feast<span style={{ color: 'var(--primary)' }}>Dash</span>
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
            Connecting food lovers with top gourmet restaurants in your city. Fresh ingredients, hot delivery, guaranteed satisfaction.
          </p>
        </div>

        <div className="footer-column">
          <h4>Quick Navigation</h4>
          <ul className="footer-links">
            <li><a href="#restaurants">Popular Restaurants</a></li>
            <li><a href="#menu">Food Menu</a></li>
            <li><a href="#offers">Special Offers & Deals</a></li>
            <li><a href="#careers">Join as Delivery Driver</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Cuisines</h4>
          <ul className="footer-links">
            <li><a href="#burgers">Gourmet Burgers</a></li>
            <li><a href="#pizza">Artisan Woodfire Pizza</a></li>
            <li><a href="#asian">Japanese Ramen & Asian</a></li>
            <li><a href="#salads">Organic Healthy Bowls</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact & Support</h4>
          <ul className="footer-links">
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={14} color="var(--primary)" />
              <span>+1 (800) FEAST-DASH</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={14} color="var(--primary)" />
              <span>support@feastdash.com</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={14} color="var(--primary)" />
              <span>100 Gourmet Way, San Francisco, CA</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} FeastDash Systems Inc. All rights reserved.</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          Crafted with <Heart size={14} color="var(--accent-red)" fill="var(--accent-red)" /> using React.js & Vite
        </span>
      </div>
    </footer>
  );
}
