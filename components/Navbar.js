import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Capabilities' },
  { href: '/clients', label: 'Ecosystem' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;
  const isActive = (path) => currentPath === path;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed w-full top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(249,247,244,0.92)'
          : 'rgba(249,247,244,0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        boxShadow: scrolled ? '0 1px 20px rgba(0,0,0,0.05)' : 'none',
      }}
    >
      <div
        className="max-w-7xl mx-auto px-6 flex items-center justify-between"
        style={{ height: '72px' }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
          <div style={{ width: '38px', height: '38px', flexShrink: 0, overflow: 'hidden' }}>
            <img
              src="/logo-official.jpg"
              alt="Kairos Global Solutions logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                mixBlendMode: 'multiply',
              }}
              onError={(e) => {
                e.target.src = '/logo.png';
              }}
            />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', color: '#0F0F0F', lineHeight: 1 }}>
            Kairos Global{' '}
            <span style={{ color: '#0891b2', fontWeight: 400 }}>Solutions</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: isActive(href) ? '#0891b2' : '#4B5563',
                borderBottom: isActive(href) ? '2px solid #0891b2' : '2px solid transparent',
                paddingBottom: '2px',
                transition: 'color 0.2s, border-color 0.2s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive(href)) e.currentTarget.style.color = '#0891b2';
              }}
              onMouseLeave={(e) => {
                if (!isActive(href)) e.currentTarget.style.color = '#4B5563';
              }}
            >
              {label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary" style={{ padding: '0.55rem 1.3rem', fontSize: '0.82rem' }}>
            Connect →
          </Link>
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
