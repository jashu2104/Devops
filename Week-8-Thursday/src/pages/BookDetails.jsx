import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { books, fallbackCover } from '../data/books';
import { useCart } from '../hooks/useCart';
import { LoadingSpinner } from '../components/LoadingSpinner';
import {
  ArrowLeft,
  Star,
  ShoppingBag,
  CheckCircle2,
  BookOpen,
  Calendar,
  Globe,
  Building,
  Hash,
  Minus,
  Plus,
  AlertTriangle
} from 'lucide-react';

export const BookDetails = () => {
  // Academic Concept: useParams reads dynamic :id parameter from route path '/books/:id'
  const { id } = useParams();
  
  // Academic Concept: useNavigate hook provides programmatic router navigation
  const navigate = useNavigate();
  
  const { addToCart } = useCart();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imgSrc, setImgSrc] = useState('');

  /*
    Academic Lifecycle Concept: useEffect Hook with [id] Dependency Array
    - This effect executes on initial component mount and re-runs whenever the dynamic 'id' URL parameter changes.
    - Demonstrates component lifecycle behavior when switching between /books/101, /books/102, /books/103.
    - Simulated async loading (400ms delay) shows realistic lifecycle states (Loading -> Success/Error).
    - Cleanup function (return () => ...) clears the timer and sets 'cancelled = true' to avoid race conditions 
      or stale state updates if the user navigates away or switches routes quickly.
  */
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);
    setQuantity(1); // Reset quantity selector on book change

    const timer = setTimeout(() => {
      if (!isCancelled) {
        const bookId = parseInt(id, 10);
        const found = books.find((b) => b.id === bookId);

        if (found) {
          setBook(found);
          setImgSrc(found.cover || fallbackCover);
        } else {
          setError('Book Not Found');
        }
        setLoading(false);
      }
    }, 450);

    // Cleanup function executes when component unmounts or before the effect runs again due to 'id' change
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [id]);

  const handleImageError = () => {
    setImgSrc(fallbackCover);
  };

  const handleDecreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncreaseQty = () => {
    if (book && quantity < (book.stock || 99)) {
      setQuantity(quantity + 1);
    }
  };

  // 1. Loading State UI
  if (loading) {
    return <LoadingSpinner text="Loading book details..." />;
  }

  // 2. Invalid Book ID Error State UI (e.g. /books/999)
  if (error || !book) {
    return (
      <div className="container main-content animate-fade-in" style={{ paddingTop: '3rem', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '520px',
            margin: '0 auto',
            padding: '3rem 2rem',
            backgroundColor: 'var(--surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'var(--error-light)',
              color: 'var(--error)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}
          >
            <AlertTriangle size={32} />
          </div>
          <h2 style={{ marginBottom: '0.75rem' }}>Book Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            The book you are looking for doesn't exist or may have been removed from our catalog.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-secondary"
            >
              <ArrowLeft size={16} /> Go Back
            </button>
            <Link to="/books" className="btn btn-primary">
              Back to Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Related books to facilitate testing route parameter changes (e.g. /books/101 -> /books/102)
  const otherBooks = books.filter((b) => b.id !== book.id).slice(0, 3);

  return (
    <div className="container main-content animate-fade-in" style={{ paddingTop: '2rem' }}>
      {/* Go Back Button using navigate(-1) */}
      <button
        onClick={() => navigate(-1)}
        className="back-link"
        aria-label="Return to previous page"
      >
        <ArrowLeft size={18} /> Go Back
      </button>

      {/* Main Book Details Card */}
      <div className="details-grid">
        {/* Cover Preview Column */}
        <div>
          <div className="details-cover-box">
            <img
              src={imgSrc}
              alt={book.title}
              className="details-cover-img"
              onError={handleImageError}
            />
          </div>
        </div>

        {/* Info Column */}
        <div className="details-info">
          <div className="details-header">
            <span className="badge badge-primary">{book.category}</span>
            <h1 className="details-title">{book.title}</h1>
            <p className="details-author">by {book.author}</p>

            <div className="details-rating">
              <div className="star-rating">
                <Star size={18} fill="#F59E0B" color="#F59E0B" />
              </div>
              <span className="rating-score">{book.rating}</span>
              <span className="rating-count">({book.reviews} customer reviews)</span>
              <span style={{ color: '#CBD5E1' }}>•</span>
              <span style={{ color: 'var(--success)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem' }}>
                <CheckCircle2 size={16} /> In Stock ({book.stock} copies left)
              </span>
            </div>
          </div>

          <div className="details-price-tag">₹{book.price}</div>

          <p className="details-description">{book.description}</p>

          {/* Quantity Selector & Add to Cart */}
          <div className="details-actions">
            <div className="quantity-selector">
              <button
                onClick={handleDecreaseQty}
                className="quantity-btn"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="quantity-input" style={{ lineHeight: '42px', fontSize: '1.1rem' }}>
                {quantity}
              </span>
              <button
                onClick={handleIncreaseQty}
                className="quantity-btn"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={() => addToCart(book, quantity)}
              className="btn btn-primary btn-lg"
              style={{ flex: 1, maxWidth: '280px' }}
            >
              <ShoppingBag size={20} /> Add {quantity} to Cart
            </button>
          </div>

          {/* Book Metadata Grid */}
          <div className="metadata-grid">
            <div className="meta-item">
              <span className="meta-label">
                <BookOpen size={13} style={{ marginRight: '4px' }} /> Pages
              </span>
              <span className="meta-value">{book.pages}</span>
            </div>

            <div className="meta-item">
              <span className="meta-label">
                <Building size={13} style={{ marginRight: '4px' }} /> Publisher
              </span>
              <span className="meta-value">{book.publisher}</span>
            </div>

            <div className="meta-item">
              <span className="meta-label">
                <Calendar size={13} style={{ marginRight: '4px' }} /> Published
              </span>
              <span className="meta-value">{book.publishedYear}</span>
            </div>

            <div className="meta-item">
              <span className="meta-label">
                <Hash size={13} style={{ marginRight: '4px' }} /> ISBN
              </span>
              <span className="meta-value">{book.isbn}</span>
            </div>

            <div className="meta-item">
              <span className="meta-label">
                <Globe size={13} style={{ marginRight: '4px' }} /> Language
              </span>
              <span className="meta-value">{book.language}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Route Switching Demo Section */}
      <div style={{ marginTop: '4rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Explore Other Books (Test Route Change Lifecycle)</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
          Clicking a book below will switch the route param <code>/books/:id</code> without reloading the page, triggering the <code>useEffect([id])</code> lifecycle hook.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {otherBooks.map((other) => (
            <Link
              key={other.id}
              to={`/books/${other.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem',
                transition: 'all var(--transition-fast)'
              }}
              className="other-book-link"
            >
              <img
                src={other.cover || fallbackCover}
                alt={other.title}
                style={{ width: '50px', height: '65px', objectFit: 'cover', borderRadius: '4px' }}
                onError={(e) => { e.target.src = fallbackCover; }}
              />
              <div>
                <span className="badge badge-secondary" style={{ fontSize: '0.65rem' }}>
                  ID: #{other.id}
                </span>
                <h4 style={{ fontSize: '0.9rem', margin: '0.2rem 0', lineClamp: 1, WebkitLineClamp: 1, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {other.title}
                </h4>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700' }}>
                  ₹{other.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
