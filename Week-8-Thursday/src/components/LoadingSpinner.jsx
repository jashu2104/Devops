import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ text = "Loading details..." }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 1.5rem',
        width: '100%'
      }}
    >
      <Loader2
        size={42}
        className="text-primary"
        style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)' }}
      />
      <p style={{ marginTop: '1.25rem', fontWeight: '500', color: 'var(--text-muted)' }}>{text}</p>
    </div>
  );
};
