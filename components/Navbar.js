import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Capabilities' },
  { href: '/clients', label: 'Alliances' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('light');
  const router = useRouter();
  const currentPath = router.pathname;
  const isActive = (path) => currentPath === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Theme sync
    const savedTheme = localStorage.getItem('kairos_theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    return () => window.removeEventListener('scroll', handleScroll);
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
    <nav
      className="fixed w-full top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? theme === 'dark' ? 'rgba(15,23,42,0.92)' : 'rgba(249,247,244,0.92)'
          : theme === 'dark' ? 'rgba(15,23,42,0.75)' : 'rgba(249,247,244,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.07)',
        boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.05)' : 'none',
      }}
    >
      <div
        className="max-w-7xl mx-auto px-6 flex items-center justify-between"
        style={{ height: '78px' }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3.5 group" style={{ textDecoration: 'none' }}>
          <img
            src="/logo-transparentbg.png"
            alt="Kairos Global Solutions logo"
            style={{
              height: '48px',
              objectFit: 'contain',
              transition: 'transform 0.2s ease',
            }}
            className="group-hover:scale-105"
          />
          <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.025em', color: theme === 'dark' ? '#F8FAFC' : '#0F0F0F', lineHeight: 1 }}>
            Kairos Global{' '}
            <span style={{ color: '#0891b2', fontWeight: 500 }}>Solutions</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4">
          <div
            style={{
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.065)',
              borderRadius: '9999px',
              padding: '0.35rem 0.45rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            {navLinks.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: active ? 700 : 500,
                    color: active ? '#0891b2' : theme === 'dark' ? '#94A3B8' : '#4B5563',
                    background: active ? (theme === 'dark' ? '#1E293B' : '#FFFFFF') : 'transparent',
                    border: active ? '1px solid rgba(8, 145, 178, 0.2)' : '1px solid transparent',
                    boxShadow: active ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                    borderRadius: '9999px',
                    padding: '0.55rem 1.35rem',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                    outline: 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = theme === 'dark' ? '#F8FAFC' : '#0F0F0F';
                      e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.7)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = theme === 'dark' ? '#94A3B8' : '#4B5563';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <Link href="/contact" className="btn-primary" style={{ padding: '0.65rem 1.45rem', fontSize: '0.85rem' }}>
            Connect →
          </Link>

          {/* Theme Toggle Button — Positioned at rightmost edge for executive balance */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            style={{
              background: theme === 'dark' ? 'rgba(30,41,59,0.8)' : 'rgba(255,255,255,0.9)',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.1)',
              borderRadius: '9999px',
              padding: '0.5rem 0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: theme === 'dark' ? '#FACC15' : '#0891b2',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
              transition: 'all 0.2s ease',
            }}
          >
            <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`} style={{ fontSize: '0.85rem' }} />
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0F0F0F', padding: '4px' }}
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`} />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          style={{
            background: 'rgba(249,247,244,0.98)',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex flex-col px-6 py-5 gap-5">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                style={{ fontWeight: 600, fontSize: '0.95rem', color: isActive(href) ? '#0891b2' : '#374151', textDecoration: 'none' }}
              >
                {label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setIsOpen(false)} className="btn-primary" style={{ justifyContent: 'center' }}>
              Connect →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
