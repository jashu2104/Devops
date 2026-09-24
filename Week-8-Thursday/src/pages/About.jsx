import React from 'react';
import { BookOpen, Users, Star, Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const About = () => {
  return (
    <div className="container main-content animate-fade-in" style={{ paddingTop: '2.5rem' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '1rem' }}>
          <Sparkles size={14} style={{ marginRight: '0.4rem' }} /> Our Mission
        </span>
        <h1 style={{ fontSize: '3rem', marginBottom: '1.25rem' }}>About BookNest</h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>
          We believe that great books have the power to transform minds, spark innovation, and ignite lifelong curiosity. BookNest was built to bring world-class literature and technical knowledge right to your fingertips.
        </p>
      </div>

      {/* Stats Counter Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem'
        }}
      >
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>10K+</h2>
          <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Curated Books</span>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--secondary)', marginBottom: '0.25rem' }}>25K+</h2>
          <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Active Readers</span>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--success)', marginBottom: '0.25rem' }}>50+</h2>
          <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Genres & Topics</span>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--warning)', marginBottom: '0.25rem' }}>4.8/5</h2>
          <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Customer Rating</span>
        </div>
      </div>

      {/* Story & Values */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem',
          alignItems: 'center'
        }}
      >
        <div>
          <h2 style={{ marginBottom: '1.25rem' }}>Empowering Readers Everywhere</h2>
          <p style={{ lineHeight: '1.7', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Founded in 2024, BookNest started as an independent online catalog for software engineers, designers, and thinkers seeking high-quality physical books.
          </p>
          <p style={{ lineHeight: '1.7', color: 'var(--text-muted)' }}>
            Today, we serve a vibrant global community of lifelong learners, providing seamless ordering, authentic titles, and lightning-fast delivery.
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award style={{ color: 'var(--primary)' }} /> Why BookNest Stand Out
          </h3>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <li style={{ display: 'flex', gap: '0.85rem' }}>
              <CheckCircle size={20} className="text-primary" style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Hand-picked Selection:</strong> Only top-rated, authentic books are listed on our platform.
              </div>
            </li>
            <li style={{ display: 'flex', gap: '0.85rem' }}>
              <CheckCircle size={20} className="text-primary" style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Transparent Pricing:</strong> Competitive prices with no hidden charges or inflated fees.
              </div>
            </li>
            <li style={{ display: 'flex', gap: '0.85rem' }}>
              <CheckCircle size={20} className="text-primary" style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Customer First:</strong> Dedicated 24/7 support and easy 30-day replacement policy.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const CheckCircle = ({ size, style }) => (
  <ShieldCheck size={size} style={style} />
);
