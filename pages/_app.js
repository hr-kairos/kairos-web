import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function App({ Component, pageProps, router }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col min-h-screen">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0, background: '#F9F7F4',
              zIndex: 100, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '1rem',
            }}
          >
            <div
              style={{
                width: '36px', height: '36px',
                border: '2.5px solid rgba(0,0,0,0.08)',
                borderTopColor: '#0891b2', borderRadius: '50%',
                animation: 'spin 0.75s linear infinite',
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', color: '#9CA3AF', textTransform: 'uppercase' }}>
              Kairos Global
            </span>
          </motion.div>
        ) : (
          <div className="w-full flex flex-col min-h-screen" style={{ position: 'relative', zIndex: 1 }}>
            <Background />
            <Navbar />
            <Analytics />
            <SpeedInsights />
            <AnimatePresence mode="wait">
              <motion.div
                key={router.route}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="w-full flex-grow flex flex-col"
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}