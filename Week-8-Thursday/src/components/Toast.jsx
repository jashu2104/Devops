import React, { useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const Toast = () => {
  const { toast, hideToast } = useCart();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={18} className="text-success" style={{ color: '#22C55E' }} />,
    info: <Info size={18} style={{ color: '#3B82F6' }} />,
    error: <AlertCircle size={18} style={{ color: '#EF4444' }} />
  };

  return (
    <div className="toast-container">
      <div className="toast">
        {icons[toast.type] || icons.success}
        <span>{toast.message}</span>
        <button onClick={hideToast} style={{ marginLeft: 'auto', color: '#94A3B8' }} aria-label="Close Toast">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
