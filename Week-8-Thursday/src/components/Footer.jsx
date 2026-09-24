import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Summary */}
          <div className="footer-brand">
            <Link to="/" className="logo" style={{ color: '#FFFFFF' }}>
              <span className="logo-icon">
                <BookOpen size={20} />
              </span>
              <span>BookNest</span>
            </Link>
            <p>
              Discover thousands of stories, technical books, and wisdom from celebrated authors worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/books">Browse Books</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/books?category=Programming">Programming</Link></li>
              <li><Link to="/books?category=Technology">Technology</Link></li>
              <li><Link to="/books?category=Business">Business</Link></li>
              <li><Link to="/books?category=Self%20Development">Self Development</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="footer-heading">Customer Support</h4>
            <ul className="footer-links">
              <li><a href="#help">Help Center</a></li>
              <li><a href="#shipping">Free Delivery</a></li>
              <li><a href="#returns">Easy Returns</a></li>
              <li><a href="#contact">Contact Support</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} BookNest Inc. All rights reserved. Built with React & Vite.</p>
        </div>
      </div>
    </footer>
  );
};
