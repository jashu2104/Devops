import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { BookOpen, ShoppingBag, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <span className="logo-icon">
            <BookOpen size={22} />
          </span>
          <span>
            Book<span className="logo-accent">Nest</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/books" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              About
            </NavLink>
          </li>
        </ul>

        {/* Cart Link with Live Item Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <NavLink to="/cart" className="cart-button">
            <ShoppingBag size={18} />
            <span>Cart</span>
            <span className="cart-badge">{totalItems}</span>
          </NavLink>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={closeMobileMenu}
        >
          Home
        </NavLink>
        <NavLink
          to="/books"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={closeMobileMenu}
        >
          Books
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          onClick={closeMobileMenu}
        >
          About
        </NavLink>
      </div>
    </nav>
  );
};
