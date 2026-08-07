import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--footer-border, rgba(0,0,0,0.07))',
        background: 'var(--footer-bg, rgba(249,247,244,0.92))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        position: 'relative',
        zIndex: 10,
        marginTop: 'auto',
      }}
      className="w-full transition-colors duration-300"
    >
      <style jsx global>{`
        :root {
          --footer-bg: rgba(249,247,244,0.92);
          --footer-border: rgba(0,0,0,0.07);
          --footer-heading: #0F0F0F;
          --footer-text: #6B7280;
        }
        html.dark {
          --footer-bg: rgba(15,23,42,0.94);
          --footer-border: rgba(255,255,255,0.08);
          --footer-heading: #F8FAFC;
          --footer-text: #94A3B8;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10" style={{ borderBottom: '1px solid var(--footer-border)' }}>

          {/* Col 1: Brand & Mission */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo-transparentbg.png"
                alt="Kairos Global Solutions logo"
                style={{ height: '40px', objectFit: 'contain' }}
              />
              <span style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.025em', color: 'var(--footer-heading)' }}>
                Kairos Global <span style={{ color: '#0891b2', fontWeight: 500 }}>Solutions</span>
              </span>
            </div>
            <p style={{ color: 'var(--footer-text)', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
              Headquartered in Kerala, India. Architecting adaptive enterprise consulting, technology frameworks, and human capital infrastructure globally.
            </p>
          </div>

          {/* Col 2: Capabilities Scope */}
          <div className="flex flex-col gap-3">
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--footer-heading)', marginBottom: '0.25rem' }}>
              Capabilities
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem', color: 'var(--footer-text)' }}>
              <li>Recruitment & Executive Staffing</li>
              <li>Learning & Corporate Development</li>
              <li>Human Resources Architecture</li>
              <li>Legal & Governance Advisory</li>
              <li>Business Restructuring Consulting</li>
            </ul>
          </div>

          {/* Col 3: Target Verticals */}
          <div className="flex flex-col gap-3">
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--footer-heading)', marginBottom: '0.25rem' }}>
              Industry Verticals
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem', color: 'var(--footer-text)' }}>
              <li>IT, Cloud & Software</li>
              <li>Fintech & HRTech Systems</li>
              <li>Healthcare & Cleantech</li>
              <li>Manufacturing & Retail</li>
              <li>Travel & Hospitality</li>
            </ul>
          </div>

          {/* Col 4: Corporate Engagement */}
          <div className="flex flex-col gap-3.5">
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--footer-heading)', marginBottom: '0.25rem' }}>
              Corporate Channel
            </h4>
            <p style={{ color: 'var(--footer-text)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              Connect with our leadership team for strategic alliances and enterprise deployments.
            </p>
            <div className="pt-1">
              <a
                href="https://www.linkedin.com/company/kairos-global-solutions-official/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#0A66C2',
                  background: 'rgba(10,102,194,0.08)',
                  border: '1px solid rgba(10,102,194,0.2)',
                  borderRadius: '9999px',
                  padding: '0.45rem 1rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                className="hover:bg-blue-600 hover:text-white"
              >
                <i className="fab fa-linkedin" style={{ fontSize: '0.95rem' }} />
                <span>LinkedIn Company Page</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6" style={{ fontSize: '0.8rem', color: 'var(--footer-text)' }}>
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Kairos Global Solutions. All rights reserved.</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span style={{ color: 'var(--footer-text)' }}>Kerala, India • Branches: Chennai, Bangalore, Pune</span>
          </div>

          <button
            onClick={scrollToTop}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--footer-text)',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'color 0.2s',
            }}
            className="hover:text-cyan-600"
          >
            <span>Back to top</span>
            <i className="fas fa-arrow-up" style={{ fontSize: '0.7rem' }} />
          </button>
        </div>
      </div>
    </footer>
  );
}
