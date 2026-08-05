import { motion } from 'framer-motion';

const currentServices = [
  { title: 'Recruitment Logistics', desc: 'Sourcing mission-critical operators, contract staffing setups, and permanent executive deployments.', icon: 'fa-user-tie', color: '#0891b2', bg: 'rgba(8,145,178,0.08)' },
  { title: 'Learning & Development', desc: 'Corporate training pipelines, tailored upskilling workflows, and technology readiness bootcamps.', icon: 'fa-graduation-cap', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
  { title: 'Human Resources Systems', desc: 'Policy formulation strategy, risk integration metrics, and corporate payroll support.', icon: 'fa-network-wired', color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
  { title: 'Legal Advisory Frameworks', desc: 'Corporate risk evaluation strategy, contract validation mapping, and business governance support.', icon: 'fa-balance-scale', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
  { title: 'Event Management', desc: 'Comprehensive structural planning, layout validation, coordination metrics, and corporate summits.', icon: 'fa-calendar-check', color: '#ec4899', bg: 'rgba(236,72,153,0.08)' },
  { title: 'Business Consulting', desc: 'Continuous market alignment profiling, optimization planning, and restructuring architectures.', icon: 'fa-chart-line', color: '#0891b2', bg: 'rgba(8,145,178,0.08)' },
];

export default function Services() {
  return (
    <div
      className="w-full max-w-7xl mx-auto px-6"
      style={{ paddingTop: '110px', paddingBottom: '80px' }}
    >
      {/* Header */}
      <div className="text-center" style={{ marginBottom: '4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '1.25rem' }}
        >
          <span className="badge" style={{ display: 'inline-flex' }}>
            <i className="fas fa-cogs" style={{ fontSize: '0.65rem' }} />
            What We Do
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#0F0F0F',
            letterSpacing: '-0.035em',
            marginBottom: '1rem',
            lineHeight: 1.1,
          }}
        >
          Service <span className="text-gradient">Capabilities</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          style={{ color: '#6B7280', maxWidth: '460px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.65 }}
        >
          Targeted operational configurations to balance and scale enterprise workflows.
        </motion.p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentServices.map((svc, i) => (
          <motion.div
            key={i}
            className="card p-8"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] }}
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
              <i className={`fas ${svc.icon}`} style={{ color: svc.color, fontSize: '1.2rem' }} />
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
