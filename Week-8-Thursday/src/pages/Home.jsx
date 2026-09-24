import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { books } from '../data/books';
import { BookCard } from '../components/BookCard';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Truck,
  ShieldCheck,
  RotateCcw,
  Compass,
  Code,
  TrendingUp,
  Brain,
  Atom,
  Feather
} from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  // Selected 4 featured books
  const featuredBooks = books.slice(0, 4);

  const categoryCards = [
    { name: "Programming", icon: <Code size={24} />, count: "12+ Books" },
    { name: "Technology", icon: <Compass size={24} />, count: "18+ Books" },
    { name: "Business", icon: <TrendingUp size={24} />, count: "15+ Books" },
    { name: "Self Development", icon: <Brain size={24} />, count: "20+ Books" },
    { name: "Science", icon: <Atom size={24} />, count: "10+ Books" },
    { name: "Fiction", icon: <Feather size={24} />, count: "25+ Books" }
  ];

  return (
    <div className="animate-fade-in">
      {/* 1. Hero Section */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>
              <Sparkles size={14} style={{ marginRight: '0.4rem' }} /> Welcome to BookNest
            </span>
            <h1>Discover Your Next Great Read</h1>
            <p>
              Explore thousands of stories, technical breakthroughs, and timeless wisdom from world-renowned authors delivered straight to your door.
            </p>
            <div className="hero-actions">
              <Link to="/books" className="btn btn-primary btn-lg">
                Browse Books <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn btn-secondary btn-lg">
                Our Story
              </Link>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
              alt="BookNest Collection Preview"
              className="hero-img-card"
            />
          </div>
        </div>
      </section>

      {/* 2. Featured Books Section */}
      <section className="section container">
        <div className="section-header">
          <h2>Featured Books</h2>
          <p>Hand-picked bestsellers and top recommendations for curious minds.</p>
        </div>

        <div className="book-grid">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to="/books" className="btn btn-outline-primary btn-lg">
            View Full Catalog ({books.length} Books) <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* 3. Browse Categories */}
      <section className="section" style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Explore Categories</h2>
            <p>Find specialized reads tailored to your interests and expertise.</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {categoryCards.map((cat) => (
              <div
                key={cat.name}
                onClick={() => navigate(`/books?category=${encodeURIComponent(cat.name)}`)}
                style={{
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem 1.25rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
                className="category-card"
              >
                <div
                  style={{
                    color: 'var(--primary)',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  {cat.icon}
                </div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{cat.name}</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="section container">
        <div className="section-header">
          <h2>Why Choose BookNest?</h2>
          <p>We are dedicated to providing the best reading experience possible.</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.75rem'
          }}
        >
          <div style={{ background: 'var(--surface)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', width: 50, height: 50, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <BookOpen size={24} />
            </div>
            <h4>Wide Collection</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Curated titles across programming, self-development, science, and fiction.</p>
          </div>

          <div style={{ background: 'var(--surface)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <div style={{ background: 'var(--secondary-light)', color: 'var(--secondary)', width: 50, height: 50, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Truck size={24} />
            </div>
            <h4>Fast Delivery</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Lightning fast doorstep delivery with real-time tracking.</p>
          </div>

          <div style={{ background: 'var(--surface)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <div style={{ background: 'var(--success-light)', color: 'var(--success)', width: 50, height: 50, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <ShieldCheck size={24} />
            </div>
            <h4>Secure Payments</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Encrypted transactions supporting cards, UPI, and net banking.</p>
          </div>

          <div style={{ background: 'var(--surface)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
            <div style={{ background: 'var(--warning-light)', color: 'var(--warning)', width: 50, height: 50, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <RotateCcw size={24} />
            </div>
            <h4>Easy Returns</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Hassle-free 30-day return policy for any damaged or misprinted titles.</p>
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
            borderRadius: 'var(--radius-lg)',
            padding: '3.5rem 2rem',
            textAlign: 'center',
            color: '#FFFFFF',
            boxShadow: 'var(--shadow-xl)'
          }}
        >
          <h2 style={{ color: '#FFFFFF', fontSize: '2.25rem', marginBottom: '1rem' }}>
            Ready to find your next favorite book?
          </h2>
          <p style={{ color: '#E0E7FF', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Join thousands of avid readers who rely on BookNest for their weekly reading list.
          </p>
          <Link to="/books" className="btn btn-secondary btn-lg" style={{ background: '#FFFFFF', color: 'var(--primary)', border: 'none' }}>
            Explore All Books
          </Link>
        </div>
      </section>
    </div>
  );
};
