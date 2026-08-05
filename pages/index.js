import Link from 'next/link';
import { motion } from 'framer-motion';

const stats = [
  { value: '500+', label: 'Successful Placements' },
  { value: '16+', label: 'Global Partners' },
  { value: 'Est. 2018', label: 'Chennai, India' },
];

const services = [
  {
    icon: 'fa-users',
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.08)',
    title: 'Human Capital',
    desc: 'Precision talent acquisition, contract deployment, and corporate HR scaling for enterprise needs.',
  },
  {
    icon: 'fa-server',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    title: 'IT & Cloud Systems',
    desc: 'Cloud architecture, native enterprise software development, and end-to-end digital workflows.',
  },
  {
    icon: 'fa-shield-alt',
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
    title: 'Legal & Governance',
    desc: 'Compliance frameworks, risk auditing, and strategic vendor management solutions.',
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] },
});

export default function Home() {
  return (
    <div
      className="w-full max-w-7xl mx-auto px-6 flex-grow flex flex-col"
      style={{ paddingTop: '110px', paddingBottom: '80px' }}
    >
      {/* ── Hero ── */}
      <div className="max-w-4xl mx-auto text-center" style={{ marginBottom: '4rem' }}>
        <motion.div {...fadeUp(0)}>
          <span className="badge" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
            <i className="fas fa-globe" style={{ fontSize: '0.65rem' }} />
            Enterprise Global Solutions
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          style={{
            fontSize: 'clamp(2.6rem, 6.5vw, 4.75rem)',
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            color: '#0F0F0F',
            marginBottom: '1.4rem',
          }}
        >
          Architecting the Future of
          <br />
          <span className="text-gradient">Global Commerce.</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.16)}
          style={{
            color: '#6B7280',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 auto 2.5rem',
            fontWeight: 400,
          }}
        >
          Headquartered in Chennai, Kairos Global Solutions delivers high-performance enterprise
          consulting, adaptive technology frameworks, and human capital infrastructure.
        </motion.p>

        <motion.div {...fadeUp(0.24)} className="flex gap-3 justify-center flex-wrap">
          <Link href="/contact" className="btn-primary">
            Start a Conversation&nbsp;<i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }} />
          </Link>
          <Link href="/services" className="btn-outline">
            Our Capabilities
          </Link>
        </motion.div>
      </div>

      {/* ── Stats divider ── */}
      <motion.div
        {...fadeUp(0.32)}
        className="flex justify-center gap-10 flex-wrap"
        style={{
          borderTop: '1px solid rgba(0,0,0,0.07)',
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          padding: '1.75rem 0',
          marginBottom: '4rem',
        }}
      >
        {stats.map((s, i) => (
          <div key={i} className="text-center" style={{ minWidth: '100px' }}>
            <div
              style={{
                fontSize: '1.85rem',
                fontWeight: 900,
                color: '#0F0F0F',
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: '#9CA3AF',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginTop: '0.35rem',
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── Service Cards ── */}
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((svc, i) => (
          <motion.div
            key={i}
            className="card p-8"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.38 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                background: svc.bg,
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}
            >
              <i className={`fas ${svc.icon}`} style={{ color: svc.color, fontSize: '1.25rem' }} />
            </div>
            <h3
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#0F0F0F',
                marginBottom: '0.55rem',
                letterSpacing: '-0.01em',
              }}
            >
              {svc.title}
            </h3>
            <p style={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: 1.65 }}>{svc.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
