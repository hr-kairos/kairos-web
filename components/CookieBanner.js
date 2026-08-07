import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('kairos_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('kairos_cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('kairos_cookie_consent', 'declined');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            zIndex: 999,
            maxWidth: '420px',
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(8, 145, 178, 0.2)',
            borderRadius: '1.25rem',
            padding: '1.25rem 1.4rem',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
            color: '#0F0F0F',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(8, 145, 178, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <i className="fas fa-cookie-bite" style={{ color: '#0891b2', fontSize: '1rem' }} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: 800 }}>Privacy & Cookies</h4>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#4B5563', lineHeight: 1.5 }}>
                We use essential cookies to analyze portal traffic and performance. No marketing trackers are stored.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
            <button
              onClick={declineCookies}
              style={{
                background: '#F3F4F6',
                border: 'none',
                borderRadius: '0.6rem',
                padding: '0.45rem 0.9rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#4B5563',
                cursor: 'pointer',
              }}
            >
              Decline
            </button>
            <button
              onClick={acceptCookies}
              className="btn-primary"
              style={{
                fontSize: '0.75rem',
                padding: '0.45rem 1.1rem',
                borderRadius: '0.6rem',
                border: 'none',
              }}
            >
              Accept Essential
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
