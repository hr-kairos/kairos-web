import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import MetaHead from '../components/MetaHead';

const services = [
  {
    num: '01',
    title: 'Recruitment Logistics',
    desc: 'Sourcing mission-critical operators, contract staffing setups, and permanent executive deployments across enterprise verticals.',
    icon: 'fa-user-tie',
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.08)',
    details: [
      'Executive Search & Niche Talent Acquisition',
      'Contract & Contingent Workforce Deployments',
      'End-to-End Onboarding & Vendor Management',
      'Cross-Border Placement Compliance',
    ],
  },
  {
    num: '02',
    title: 'Learning & Development',
    desc: 'Corporate training pipelines, tailored upskilling workflows, and technology readiness bootcamps aligned to business objectives.',
    icon: 'fa-graduation-cap',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    details: [
      'Custom Enterprise Technology Bootcamps',
      'Leadership & Capability Building Workshops',
      'Role-Specific Skill Gap Analysis & Diagnostics',
      'Continuous Upskilling Performance Metrics',
    ],
  },
  {
    num: '03',
    title: 'Human Resources Systems',
    desc: 'Policy formulation strategy, risk integration metrics, performance architecture, and corporate payroll support.',
    icon: 'fa-network-wired',
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
    details: [
      'HR Governance & Statutory Compliance Audit',
      'Performance Management Architecture',
      'Payroll & Compensation Alignment Strategy',
      'Employee Engagement & Retention Frameworks',
    ],
  },
  {
    num: '04',
    title: 'Legal Advisory Frameworks',
    desc: 'Corporate risk evaluation strategy, contract validation mapping, and comprehensive business governance support.',
    icon: 'fa-balance-scale',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    details: [
      'Enterprise Risk Assessment & Regulatory Mapping',
      'Commercial Contract Drafting & Vetting',
      'Labor Law & Workplace Policy Formulation',
      'Corporate Restructuring & Dispute Mitigations',
    ],
  },
  {
    num: '05',
    title: 'Business Consulting',
    desc: 'Continuous market alignment profiling, optimization planning, and complete restructuring architecture for modern enterprises.',
    icon: 'fa-chart-line',
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.08)',
    details: [
      'Operational Efficiency & Process Optimization',
      'Strategic Growth & Market Expansion Advisory',
      'Digital Transformation & Workstream Integration',
      'Organizational Change Management Architecture',
    ],
  },
];

export default function Services() {
  const [selectedSvc, setSelectedSvc] = useState(null);

  useEffect(() => {
    if (selectedSvc) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedSvc]);

  return (
    <div className="w-full max-w-6xl mx-auto px-6" style={{ paddingTop: '110px', paddingBottom: '80px' }}>
      <MetaHead
        title="Service Capabilities | Kairos Global Solutions"
        description="Recruitment logistics, enterprise L&D bootcamps, business restructuring, IT consulting, and legal governance frameworks."
      />

      {/* Header */}
      <div style={{ marginBottom: '4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '1.25rem' }}
        >
          <span className="badge" style={{ display: 'inline-flex' }}>
            <i className="fas fa-cogs" style={{ fontSize: '0.65rem' }} /> What We Do
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.75rem)',
            fontWeight: 900, color: '#0F0F0F',
            letterSpacing: '-0.035em', lineHeight: 1.08,
            marginBottom: '1rem', maxWidth: '600px',
          }}
        >
          Service <span className="text-gradient">Capabilities</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          style={{ color: '#6B7280', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: '520px' }}
        >
          Targeted operational configurations designed to balance and scale enterprise workflows. Click any card to explore full scope.
        </motion.p>
      </div>

      {/* Grid of elegant square cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((svc, i) => {
          return (
            <motion.div
              key={svc.num}
              onClick={() => setSelectedSvc(svc)}
              className="card flex flex-col justify-between cursor-pointer"
              style={{
                padding: '2.25rem',
                minHeight: '270px',
                position: 'relative',
                overflow: 'hidden',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
            >
              <div>
                {/* Header Row: Icon + Glass Index Tag */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      width: '50px', height: '50px',
                      background: svc.bg,
                      border: `1px solid ${svc.color}22`,
                      borderRadius: '16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <i className={`fas ${svc.icon}`} style={{ color: svc.color, fontSize: '1.2rem' }} />
                  </div>

                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: svc.color,
                      background: svc.bg,
                      border: `1px solid ${svc.color}33`,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '9999px',
                      letterSpacing: '0.05em',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {svc.num}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#0F0F0F',
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.25,
                  }}
                >
                  {svc.title}
                </h3>

                {/* Description */}
                <p style={{ color: '#4B5563', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
                  {svc.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── VisionOS Glass Detail Modal ── */}
      <AnimatePresence>
        {selectedSvc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSvc(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '560px',
                background: 'rgba(255, 255, 255, 0.94)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                borderRadius: '1.75rem',
                padding: '2.5rem',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.2)',
                position: 'relative',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedSvc(null)}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'rgba(0,0,0,0.05)',
                  border: 'none',
                  width: '32px', height: '32px',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#6B7280',
                }}
              >
                <i className="fas fa-times" style={{ fontSize: '0.9rem' }} />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4" style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '56px', height: '56px',
                    background: selectedSvc.bg,
                    border: `1px solid ${selectedSvc.color}33`,
                    borderRadius: '18px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <i className={`fas ${selectedSvc.icon}`} style={{ color: selectedSvc.color, fontSize: '1.4rem' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: selectedSvc.color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Capability Scope {selectedSvc.num}
                  </span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F0F0F', margin: 0, lineHeight: 1.2 }}>
                    {selectedSvc.title}
                  </h3>
                </div>
              </div>

              <p style={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                {selectedSvc.desc}
              </p>

              {/* Deliverable Sub-Points */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '0.85rem' }}>
                  Key Deliverables & Execution Scope
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {selectedSvc.details.map((point, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#1F2937', fontWeight: 500 }}>
                      <i className="fas fa-check-circle" style={{ color: selectedSvc.color, fontSize: '0.85rem' }} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Link
                  href="/contact"
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center', padding: '0.75rem 1.25rem', fontSize: '0.88rem' }}
                >
                  Inquire About {selectedSvc.title} →
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
