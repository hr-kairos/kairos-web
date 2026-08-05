import { useState } from 'react';
import { motion } from 'framer-motion';

const partners = [
  { name: 'TCS', logo: '/tcs.png', category: 'IT & Cloud' },
  { name: 'Wipro', logo: '/wipro.png', category: 'IT & Cloud' },
  { name: 'Infosys', logo: '/infosyslogo.png', category: 'IT & Cloud' },
  { name: 'Capgemini', logo: '/capgemini.png', category: 'IT & Cloud' },
  { name: 'IBM', logo: '/ibmlogo.png', category: 'IT & Cloud' },
  { name: 'LTIMindtree', logo: '/ltimindtree.png', category: 'IT & Cloud' },
  { name: 'Hexaware', logo: '/hexaware.png', category: 'IT & Cloud' },
  { name: 'EY', logo: '/ey.png', category: 'Advisory' },
  { name: 'KPMG', logo: '/kpmglogo.svg', category: 'Advisory' },
  { name: 'Airtel', logo: '/airtel.png', category: 'Enterprise' },
  { name: 'Royal Enfield', logo: '/royal-enfield.png', category: 'Enterprise' },
  { name: 'Motherson', logo: '/motherson.png', category: 'Enterprise' },
  { name: 'Hinduja Tech', logo: '/hinduja-tech.png', category: 'Enterprise' },
  { name: 'Saint-Gobain', logo: '/saint-gobain.png', category: 'Enterprise' },
  { name: 'RLE India', logo: '/rle-india.png', category: 'Enterprise' },
  { name: 'J Connect', logo: '/jconnect.png', category: 'IT & Cloud' },
  { name: 'Kapitus', logo: '/kapitus.png', category: 'Advisory' },
];

const categories = ['All', 'IT & Cloud', 'Advisory', 'Enterprise'];

// Duplicate for seamless infinite loop
const row1 = [...partners, ...partners];
const row2 = [...partners.slice(8), ...partners.slice(0, 8), ...partners.slice(8), ...partners.slice(0, 8)];

function LogoCard({ partner, activeCategory }) {
  const isSelected = activeCategory === 'All' || partner.category === activeCategory;
  const isJConnect = partner.name === 'J Connect';

  return (
    <div
      style={{
        width: '180px',
        height: '110px',
        flexShrink: 0,
        background: '#F9F7F4', /* Same as body background to make blend-mode work */
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem',
        gap: '0.75rem',
        transition: 'all 0.3s ease',
        opacity: isSelected ? 1 : 0.25,
        filter: isSelected ? 'none' : 'grayscale(100%)',
        transform: isSelected ? (isJConnect ? 'scale(1.22)' : 'scale(1)') : 'scale(0.92)',
      }}
      className="hover:scale-105"
    >
      <div style={{ width: isJConnect ? '150px' : '120px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={partner.logo}
          alt={partner.name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            mixBlendMode: 'multiply',
            transform: isJConnect ? 'scale(1.35)' : 'none',
          }}
          onError={(e) => (e.target.style.opacity = '0')}
        />
      </div>
      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isSelected ? '#0F0F0F' : '#9CA3AF', textAlign: 'center', lineHeight: 1.2 }}>
        {partner.name}
      </span>
    </div>
  );
}

export default function Clients() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="w-full" style={{ paddingTop: '110px', paddingBottom: '80px' }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center" style={{ marginBottom: '2.5rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '1.25rem' }}
        >
          <span className="badge" style={{ display: 'inline-flex' }}>
            <i className="fas fa-handshake" style={{ fontSize: '0.65rem' }} /> Trusted By
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900, color: '#0F0F0F',
            letterSpacing: '-0.035em', lineHeight: 1.08, marginBottom: '1rem',
          }}
        >
          Global <span className="text-gradient">Alliances</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          style={{ color: '#6B7280', maxWidth: '440px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.65, marginBottom: '2rem' }}
        >
          Integrated seamlessly with global industry leaders across sectors.
        </motion.p>

        {/* Industry Pill Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.45rem 1.15rem',
                  borderRadius: '9999px',
                  fontSize: '0.82rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? '#0891b2' : '#4B5563',
                  background: active ? '#FFFFFF' : 'rgba(0,0,0,0.03)',
                  border: active ? '1px solid rgba(8,145,178,0.25)' : '1px solid rgba(0,0,0,0.06)',
                  boxShadow: active ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* ── Dual Marquee ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
      >
        {/* Row 1 — scrolls left */}
        <div style={{ overflow: 'hidden' }}>
          <div className="marquee-track marquee-track--left" style={{ paddingLeft: '1.25rem' }}>
            {row1.map((p, i) => (
              <LogoCard key={`r1-${i}`} partner={p} activeCategory={activeCategory} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div style={{ overflow: 'hidden' }}>
          <div className="marquee-track marquee-track--right" style={{ paddingLeft: '1.25rem' }}>
            {row2.map((p, i) => (
              <LogoCard key={`r2-${i}`} partner={p} activeCategory={activeCategory} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          textAlign: 'center', marginTop: '3rem',
          fontSize: '0.78rem', color: '#D1D5DB',
          fontWeight: 500, letterSpacing: '0.05em',
        }}
      >
        Hover over the strip to pause
      </motion.p>
    </div>
  );
}
