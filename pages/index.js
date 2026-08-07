import Link from 'next/link';
import { motion } from 'framer-motion';
import MetaHead from '../components/MetaHead';

/* ── Animated hero visual — floating logo with orbital rings ── */
function HeroVisual() {
  return (
    <div
      className="hidden md:flex items-center justify-center"
      style={{ position: 'relative', height: '420px', width: '100%' }}
    >
      {/* Outer slow ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          width: '340px', height: '340px',
          border: '1px dashed rgba(8,145,178,0.2)',
          borderRadius: '50%',
        }}
      >
        <div style={{
          position: 'absolute', top: '-5px', left: '50%',
          width: '10px', height: '10px',
          background: '#0891b2', borderRadius: '50%',
          transform: 'translateX(-50%)',
          boxShadow: '0 0 12px rgba(8,145,178,0.7)',
        }} />
      </motion.div>

      {/* Inner fast ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          width: '230px', height: '230px',
          border: '1px dashed rgba(16,185,129,0.2)',
          borderRadius: '50%',
        }}
      >
        <div style={{
          position: 'absolute', bottom: '-5px', left: '50%',
          width: '7px', height: '7px',
          background: '#10b981', borderRadius: '50%',
          transform: 'translateX(-50%)',
          boxShadow: '0 0 10px rgba(16,185,129,0.7)',
        }} />
      </motion.div>

      {/* Glow */}
      <div style={{
        position: 'absolute',
        width: '220px', height: '220px',
        background: 'radial-gradient(circle, rgba(8,145,178,0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(30px)',
      }} />

      {/* Floating logo */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <img
          src="/logo-transparentbg.png"
          alt="Kairos Global Solutions"
          style={{
            width: '145px', height: '145px',
            objectFit: 'contain',
          }}
        />
      </motion.div>

      {/* Floating Badge 1 — Top-Left (Synced 60fps Motion) */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="hero-floating-badge"
        style={{
          position: 'absolute',
          top: '30px',
          left: '25px',
          zIndex: 3,
          borderColor: 'rgba(8, 145, 178, 0.3)',
          willChange: 'transform',
        }}
      >
        <span style={{ color: '#0891b2' }}>📍</span>
        <span>HQ • Kerala</span>
      </motion.div>

      {/* Floating Badge 2 — Bottom-Right (Synced 60fps Motion) */}
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="hero-floating-badge"
        style={{
          position: 'absolute',
          bottom: '35px',
          right: '30px',
          zIndex: 3,
          borderColor: 'rgba(16, 185, 129, 0.3)',
          willChange: 'transform',
        }}
      >
        <span style={{ color: '#10b981' }}>🤝</span>
        <span>16+ Global Alliances</span>
      </motion.div>
    </div>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] },
});

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 flex-grow flex flex-col justify-center" style={{ paddingTop: '120px', paddingBottom: '120px', minHeight: 'calc(100vh - 120px)' }}>
      <MetaHead
        title="Kairos Global Solutions | Enterprise Consulting & Human Capital"
        description="Headquartered in Kerala, Kairos Global Solutions delivers high-performance enterprise consulting, adaptive technology frameworks, and human capital infrastructure."
      />

      {/* ── Hero ── */}
      <div className="grid md:grid-cols-2 gap-8 items-center" style={{ minHeight: '420px' }}>

        {/* Left */}
        <div>
          <motion.div {...fadeUp(0)}>
            <span className="badge" style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
              <i className="fas fa-globe" style={{ fontSize: '0.65rem' }} />
              Enterprise Global Solutions
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4.25rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              color: '#0F0F0F',
              marginBottom: '1.4rem',
            }}
          >
            Architecting
            <br />
            the Future of
            <br />
            <span className="text-gradient">Global Commerce.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            style={{ color: '#6B7280', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '460px', marginBottom: '2.25rem' }}
          >
            Headquartered in Kerala, Kairos Global Solutions delivers high-performance
            enterprise consulting, adaptive technology frameworks, and human capital infrastructure.
          </motion.p>

          <motion.div {...fadeUp(0.28)} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">
              Start a Conversation&nbsp;
              <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }} />
            </Link>
            <Link href="/services" className="btn-outline">
              Our Capabilities
            </Link>
          </motion.div>
        </div>

        {/* Right — animated logo visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </div>
  );
}
