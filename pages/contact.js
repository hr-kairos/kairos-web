import { useState } from 'react';
import { trackEvent, reportError } from '../utils/telemetry';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending…');

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      mobile: e.target.mobile.value,
      position: e.target.position.value,
      currentLocation: e.target.currentLocation.value,
      preferredLocation: e.target.preferredLocation.value,
    };

    trackEvent('contact_form_submission_started', { position: formData.position });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('✓ Application received. We will be in touch shortly.');
        trackEvent('contact_form_submission_success', { position: formData.position });
        e.target.reset();
      } else {
        setStatus('Something went wrong. Please try again or email us directly.');
        trackEvent('contact_form_submission_failed', { position: formData.position, status: response.status });
        reportError(new Error(`Contact form API returned status ${response.status}`), { formData });
      }
    } catch (err) {
      setStatus('Connection issue. Please try again.');
      trackEvent('contact_form_submission_failed', { position: formData.position, error: err.message });
      reportError(err, { formData });
    }
  };

  return (
    <div
      className="w-full max-w-6xl mx-auto px-6 flex-grow"
      style={{ paddingTop: '110px', paddingBottom: '80px' }}
    >
      {/* Page header */}
      <div className="text-center" style={{ marginBottom: '3.5rem' }}>
        <span className="badge" style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
          <i className="fas fa-paper-plane" style={{ fontSize: '0.65rem' }} />
          Get In Touch
        </span>
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#0F0F0F',
            letterSpacing: '-0.035em',
            lineHeight: 1.1,
          }}
        >
          Connect <span className="text-gradient">With Us</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* ── Left column: info + LinkedIn ── */}
        <div className="flex flex-col gap-6">
          <p style={{ color: '#6B7280', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Submit your profile to route dedicated corporate resources directly to your operation. Our team will respond within one business day.
          </p>

          {/* Contact details */}
          <div className="card p-7 flex flex-col gap-5">
            <a
              href="mailto:hr@kairosglobalsolutions.com"
              className="flex items-center gap-4"
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(8,145,178,0.08)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <i className="fas fa-envelope" style={{ color: '#0891b2', fontSize: '0.95rem' }} />
              </div>
              <span style={{ fontWeight: 600, color: '#374151', fontSize: '0.9rem' }}>
                hr@kairosglobalsolutions.com
              </span>
            </a>

            <a href="tel:+916379302839" className="flex items-center gap-4" style={{ textDecoration: 'none' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(16,185,129,0.08)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <i className="fas fa-phone" style={{ color: '#10b981', fontSize: '0.95rem' }} />
              </div>
              <span style={{ fontWeight: 600, color: '#374151', fontSize: '0.9rem' }}>
                +91 63793 02839
              </span>
            </a>

            <div className="flex items-center gap-4">
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(99,102,241,0.08)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <i className="fas fa-map-marker-alt" style={{ color: '#6366f1', fontSize: '0.95rem' }} />
              </div>
              <span style={{ fontWeight: 600, color: '#374151', fontSize: '0.9rem' }}>
                Chennai, Tamil Nadu, India
              </span>
            </div>
          </div>

          {/* LinkedIn card */}
          <a
            href="https://www.linkedin.com/company/kairos-global-solutions-official/"
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center gap-5"
            style={{
              padding: '1.4rem 1.6rem',
              textDecoration: 'none',
              border: '1.5px solid rgba(10,102,194,0.15)',
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(10,102,194,0.03) 100%)',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                background: '#0A66C2',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <i className="fab fa-linkedin-in" style={{ color: '#fff', fontSize: '1.3rem' }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#0F0F0F', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                Follow us on LinkedIn
              </div>
              <div style={{ color: '#6B7280', fontSize: '0.8rem' }}>
                Kairos Global Solutions — Company Page
              </div>
            </div>
            <i
              className="fas fa-arrow-right"
              style={{ color: '#0A66C2', fontSize: '0.85rem', marginLeft: 'auto' }}
            />
          </a>
        </div>

        {/* ── Right column: form ── */}
        <div className="card p-8" style={{ borderRadius: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0F0F0F', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>
            Submit Your Profile
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="glass-input w-full px-4 py-3 text-sm"
              style={{ borderRadius: '0.75rem' }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="glass-input w-full px-4 py-3 text-sm"
              style={{ borderRadius: '0.75rem' }}
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              required
              className="glass-input w-full px-4 py-3 text-sm"
              style={{ borderRadius: '0.75rem' }}
            />
            <input
              type="text"
              name="position"
              placeholder="Position Applying For"
              required
              className="glass-input w-full px-4 py-3 text-sm"
              style={{ borderRadius: '0.75rem' }}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="currentLocation"
                placeholder="Current Location"
                required
                className="glass-input w-full px-4 py-3 text-sm"
                style={{ borderRadius: '0.75rem' }}
              />
              <input
                type="text"
                name="preferredLocation"
                placeholder="Preferred Location"
                required
                className="glass-input w-full px-4 py-3 text-sm"
                style={{ borderRadius: '0.75rem' }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full justify-center mt-2"
              style={{ borderRadius: '0.85rem', padding: '0.9rem' }}
            >
              Submit Application
            </button>

            {status && (
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: status.startsWith('✓') ? '#10b981' : '#ef4444',
                  marginTop: '0.25rem',
                }}
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
