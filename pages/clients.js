import { useState } from 'react';
import { motion } from 'framer-motion';
import MetaHead from '../components/MetaHead';

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
        background: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '0.85rem',
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
            transform: isJConnect ? 'scale(1.35)' : 'none',
          }}
          onError={(e) => (e.target.style.opacity = '0')}
        />
      </div>
      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isSelected ? 'var(--text-primary)' : 'var(--text-muted)', textAlign: 'center', lineHeight: 1.2 }}>
        {partner.name}
      </span>
    </div>
  );
}

export default function Clients() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="w-full" style={{ paddingTop: '110px', paddingBottom: '80px' }}>
      <MetaHead
        title="Enterprise Alliances & Clients | Kairos Global Solutions"
        description="Partnering with Fortune 500 enterprises, IT leaders, and global advisory firms including TCS, Infosys, Wipro, IBM, Capgemini, and EY."
      />

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
            fontWeight: 900, color: 'var(--text-primary)',
            letterSpacing: '-0.035em', lineHeight: 1.08, marginBottom: '1rem',
          }}
        >
          Enterprise <span className="text-gradient">Alliances</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: '520px', margin: '0 auto 2rem' }}
        >
          Partnering with global market leaders to architect resilient operations, cross-border workforce logistics, and digital transformations.
        </motion.p>

        {/* Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.45rem 1.1rem',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: active ? '1px solid rgba(8, 145, 178, 0.3)' : '1px solid var(--border-color)',
                  background: active ? '#0891b2' : 'var(--card-bg)',
                  color: active ? '#FFFFFF' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                  boxShadow: active ? '0 4px 14px rgba(8, 145, 178, 0.25)' : 'none',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Infinite Marquee Section */}
      <div style={{ overflow: 'hidden', padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
        {/* Left marquee */}
        <div className="marquee-track marquee-track--left">
          {row1.map((partner, index) => (
            <LogoCard key={`row1-${index}`} partner={partner} activeCategory={activeCategory} />
          ))}
        </div>

        {/* Right marquee */}
        <div className="marquee-track marquee-track--right">
          {row2.map((partner, index) => (
            <LogoCard key={`row2-${index}`} partner={partner} activeCategory={activeCategory} />
          ))}
        </div>
      </div>
    </div>
  );
}
