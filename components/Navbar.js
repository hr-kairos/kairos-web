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

    const syncTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };

    syncTheme();
    window.addEventListener('kairos_theme_change', syncTheme);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('kairos_theme_change', syncTheme);
    };
  }, []);

  return (
    <nav
      className="fixed w-full top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-color)',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
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
          <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.025em', color: 'var(--text-primary)', lineHeight: 1 }}>
            Kairos Global{' '}
            <span style={{ color: '#0891b2', fontWeight: 500 }}>Solutions</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <div
            style={{
              background: 'var(--nav-pill-bg)',
              border: '1px solid var(--nav-pill-border)',
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
                    color: active ? '#0891b2' : 'var(--text-secondary)',
                    background: active ? 'var(--card-bg)' : 'transparent',
                    border: active ? '1px solid rgba(8, 145, 178, 0.25)' : '1px solid transparent',
                    boxShadow: active ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                    borderRadius: '9999px',
                    padding: '0.55rem 1.35rem',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                    outline: 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.background = 'var(--nav-pill-bg)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = 'var(--text-secondary)';
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
        </div>

        {/* Mobile toggle button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: '4px' }}
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`} />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div
          style={{
            background: 'var(--modal-bg)',
            borderTop: '1px solid var(--border-color)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex flex-col px-6 py-5 gap-5">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                style={{
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: isActive(href) ? '#0891b2' : 'var(--text-primary)',
                  textDecoration: 'none',
                }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary text-center"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              Connect →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
