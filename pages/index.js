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

      {/* Floating Badge 1 */}
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

      {/* Floating Badge 2 */}
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
    <div className="w-full max-w-7xl mx-auto px-6 flex-grow flex flex-col justify-center" style={{ paddingTop: '110px', paddingBottom: '80px' }}>
      <MetaHead
        title="Kairos Global Solutions | Enterprise Consulting & Human Capital"
        description="Headquartered in Kerala, Kairos Global Solutions delivers high-performance enterprise consulting, adaptive technology frameworks, and human capital infrastructure."
      />

      {/* ── Hero Main ── */}
      <div className="grid md:grid-cols-2 gap-8 items-center" style={{ minHeight: '420px', marginBottom: '4rem' }}>
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
              color: 'var(--text-primary)',
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
            style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '460px', marginBottom: '2.25rem' }}
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

      {/* ── Apple-Style Bento Grid ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.65, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Bento Box 1: Large Key Metric */}
        <div
          className="card md:col-span-2 flex flex-col justify-between"
          style={{
            padding: '2.25rem',
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '1.75rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0891b2', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Global Capability Network
            </span>
            <span className="badge" style={{ fontSize: '0.7rem' }}>
              <i className="fas fa-bolt" /> 24h SLA Response
            </span>
          </div>

          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: '1rem' }}>
            16+ Tier-1 Strategic Alliances Across IT, Advisory & Enterprise Verticals
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '580px', margin: 0 }}>
            Partnering directly with market leaders including TCS, Infosys, Wipro, IBM, Capgemini, and EY to deliver scalable cross-border talent and operations.
          </p>

          <div style={{ marginTop: '1.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/clients" className="btn-outline" style={{ fontSize: '0.82rem', padding: '0.5rem 1.1rem' }}>
              Explore Alliances →
            </Link>
          </div>
        </div>

        {/* Bento Box 2: Regulatory & Governance Compliance */}
        <div
          className="card flex flex-col justify-between"
          style={{
            padding: '2.25rem',
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '1.75rem',
          }}
        >
          <div>
            <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <i className="fas fa-shield-alt" style={{ color: '#10b981', fontSize: '1.25rem' }} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
              100% Governance Compliance
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
              Full regulatory alignment across labor laws, corporate risk frameworks, and enterprise contract security.
            </p>
          </div>

          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#10b981', fontWeight: 700 }}>
            <i className="fas fa-check-circle" /> ISO & Statutory Standard Compliant
          </div>
        </div>

        {/* Bento Box 3: 5 Core Capability Pillars */}
        <div
          className="card flex flex-col justify-between"
          style={{
            padding: '2.25rem',
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '1.75rem',
          }}
        >
          <div>
            <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: 'rgba(8, 145, 178, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <i className="fas fa-cubes" style={{ color: '#0891b2', fontSize: '1.25rem' }} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.65rem' }}>
              5 Integrated Scopes
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>
              Recruitment Logistics, Learning & Development, HR Systems, Business Consulting, and Legal Advisory.
            </p>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/services" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0891b2', textDecoration: 'none' }}>
              View Capability Scopes →
            </Link>
          </div>
        </div>

        {/* Bento Box 4: Strategic HQ & Pan-India Footprint */}
        <div
          className="card md:col-span-2 flex flex-col justify-between"
          style={{
            padding: '2.25rem',
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '1.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#10b981', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Operational Command
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.35rem', marginBottom: '0.5rem' }}>
                Headquartered in Kerala with Pan-India Strategic Reach
              </h3>
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
            Positioned at the nexus of technology and talent innovation, Kairos coordinates multi-city executive search, specialized IT bootcamps, and corporate advisory.
          </p>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            {['HQ • Kerala', 'Hub • Cochin', 'Hub • Trivandrum', 'Hub • Calicut'].map((hub, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.35rem 0.85rem',
                  borderRadius: '9999px',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              >
                📍 {hub}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
