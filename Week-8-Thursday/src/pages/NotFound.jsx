import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="container main-content animate-fade-in" style={{ paddingTop: '5rem', textAlign: 'center' }}>
      <div
        style={{
          maxWidth: '540px',
          margin: '0 auto',
          padding: '3.5rem 2rem',
          backgroundColor: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}
        >
          <FileQuestion size={36} />
        </div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.25rem' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
          Oops! The page you are trying to access doesn't exist, has been moved, or may have had its URL typed incorrectly.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          <Home size={18} /> Back to Home Page
        </Link>
      </div>
    </div>
  );
};
