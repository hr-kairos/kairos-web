import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('kairos_theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('kairos_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      aria-label="Toggle theme"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 998,
        background: theme === 'dark' ? 'rgba(30, 41, 59, 0.88)' : 'rgba(255, 255, 255, 0.92)',
        border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '9999px',
        padding: '0.5rem 0.95rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.45rem',
        fontSize: '0.78rem',
        fontWeight: 700,
        color: theme === 'dark' ? '#FACC15' : '#0891b2',
        boxShadow: theme === 'dark' ? '0 8px 24px rgba(0,0,0,0.4)' : '0 8px 24px rgba(0,0,0,0.08)',
        cursor: 'pointer',
        transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} style={{ fontSize: '0.85rem' }} />
      <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
    </motion.button>
  );
}
