import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent, reportError } from '../utils/telemetry';

export default function Contact() {
  const [status, setStatus] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [resume, setResume] = useState({ data: '', name: '', type: '' });
  const [showSpotlight, setShowSpotlight] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      alert("File size must be under 4MB to ensure secure transmission.");
      e.target.value = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target.result.split(',')[1];
      setResume({
        data: base64Data,
        name: file.name,
        type: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      mobile: e.target.mobile.value,
      position: e.target.position.value,
      currentLocation: e.target.currentLocation.value,
      preferredLocation: e.target.preferredLocation.value,
      resume: resume.data ? resume : null,
    };

    trackEvent('contact_form_submission_started', { position: formData.position });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setShowToast(true);
        setShowSpotlight(true); // Launch premium LinkedIn spotlight tutorial
        trackEvent('contact_form_submission_success', { position: formData.position });
        e.target.reset();
        setResume({ data: '', name: '', type: '' });
        setTimeout(() => setShowToast(false), 5000);
      } else {
        setStatus('error');
        trackEvent('contact_form_submission_failed', { position: formData.position, status: response.status });
        reportError(new Error(`Contact form API returned status ${response.status}`), { formData });
      }
    } catch (err) {
      setStatus('error');
      trackEvent('contact_form_submission_failed', { position: formData.position, error: err.message });
      reportError(err, { formData });
    }
  };

  return (
    <div
      className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center flex-grow"
      style={{ paddingTop: '110px', paddingBottom: '80px', position: 'relative' }}
    >
      {/* Full-screen Dark Spotlight Backdrop Overlay */}
      <AnimatePresence>
        {showSpotlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(15, 15, 15, 0.78)',
              zIndex: 1000,
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
            onClick={() => setShowSpotlight(false)}
          />
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            style={{
              position: 'fixed',
              top: '90px',
              right: '24px',
              zIndex: 1050,
              background: 'rgba(255, 255, 255, 0.92)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 12px 36px rgba(16, 185, 129, 0.15)',
              borderRadius: '1.25rem',
              padding: '1rem 1.4rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
            }}
          >
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-check" style={{ color: '#10b981', fontSize: '0.85rem' }} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: '#0F0F0F' }}>Message Received</h4>
              <p style={{ margin: 0, fontSize: '0.78rem', color: '#6B7280' }}>Our executive team will respond within 24 hours.</p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', marginLeft: '0.5rem' }}
            >
              <i className="fas fa-times" style={{ fontSize: '0.8rem' }} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left column: Information */}
      <div style={{ position: 'relative', zIndex: showSpotlight ? 1001 : 1 }}>
        <span className="badge" style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
          <i className="fas fa-paper-plane" style={{ fontSize: '0.65rem' }} /> Get In Touch
        </span>

        <h1
          style={{
            fontSize: 'clamp(2.4rem, 5vw, 3.75rem)',
            fontWeight: 900,
            color: showSpotlight ? '#FFFFFF' : '#0F0F0F',
            letterSpacing: '-0.035em',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            transition: 'color 0.4s ease',
          }}
        >
          Connect <span className="text-gradient">Securely</span>
        </h1>

        <p
          style={{
            color: showSpotlight ? '#D1D5DB' : '#6B7280',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            transition: 'color 0.4s ease',
          }}
        >
          Submit your requirements to route dedicated corporate resources directly to your operation. Our team will respond within one business day.
        </p>

        {/* Address and details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {[
            { icon: 'fa-envelope', color: '#0891b2', text: 'hr@kairosglobalsolutions.com', href: 'mailto:hr@kairosglobalsolutions.com' },
            { icon: 'fa-phone', color: '#10b981', text: '+91 63793 02839', href: 'tel:+916379302839' },
            { icon: 'fa-map-marker-alt', color: '#6366f1', text: 'Headquarters: Kerala, India', href: null },
            { icon: 'fa-map-marked-alt', color: '#a855f7', text: 'Branches: Chennai, Bangalore, Pune', href: null },
          ].map((item) => (
            <a
              key={item.text}
              href={item.href || undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                textDecoration: 'none',
                color: showSpotlight ? '#E5E7EB' : '#4B5563',
                fontSize: '0.9rem',
                fontWeight: 600,
                transition: 'color 0.4s ease',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: `${item.color}11`,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <i className={`fas ${item.icon}`} style={{ color: item.color, fontSize: '0.95rem' }} />
              </div>
              {item.text}
            </a>
          ))}
        </div>

        {/* Simple inline LinkedIn link - Highlighted Spotlight target */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {showSpotlight && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15 }}
              style={{
                position: 'absolute',
                bottom: '100%',
                left: '0',
                marginBottom: '18px',
                width: '290px',
                background: '#FFFFFF',
                borderRadius: '1.25rem',
                padding: '1.25rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                border: '1px solid rgba(8, 145, 178, 0.2)',
                zIndex: 1020,
              }}
            >
              {/* Arrow */}
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '30px',
                  width: '0',
                  height: '0',
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: '8px solid #FFFFFF',
                }}
              />
              <h4 style={{ margin: '0 0 6px 0', fontSize: '0.9rem', fontWeight: 800, color: '#0F0F0F', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>✨</span> Stay Connected
              </h4>
              <p style={{ margin: '0 0 12px 0', fontSize: '0.8rem', color: '#4B5563', lineHeight: 1.5 }}>
                Follow us on LinkedIn for exciting candidate placement announcements, consulting advisory insights, and brand metrics!
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a
                  href="https://www.linkedin.com/company/kairos-global-solutions-official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ fontSize: '0.75rem', padding: '0.45rem 0.85rem', borderRadius: '0.5rem', textDecoration: 'none' }}
                >
                  Follow LinkedIn
                </a>
                <button
                  onClick={() => setShowSpotlight(false)}
                  style={{
                    background: '#F3F4F6',
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#4B5563',
                    cursor: 'pointer',
                  }}
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}

          <a
            id="linkedin-portal"
            href="https://www.linkedin.com/company/kairos-global-solutions-official/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: showSpotlight ? '#0A66C2' : '#0A66C2',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'all 0.4s ease',
              position: 'relative',
              zIndex: showSpotlight ? 1010 : 1,
              background: showSpotlight ? '#FFFFFF' : 'transparent',
              padding: showSpotlight ? '0.75rem 1.25rem' : '0',
              borderRadius: showSpotlight ? '9999px' : '0',
              boxShadow: showSpotlight ? '0 0 25px rgba(8, 145, 178, 0.35)' : 'none',
            }}
            className="hover:underline"
          >
            <i className="fab fa-linkedin" style={{ fontSize: '1.1rem' }} />
            Follow us on LinkedIn <i className="fas fa-arrow-right" style={{ fontSize: '0.75rem' }} />
          </a>
        </div>
      </div>

      {/* Right column: Form card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        className="card"
        style={{ padding: '2.5rem', opacity: showSpotlight ? 0.3 : 1, pointerEvents: showSpotlight ? 'none' : 'auto', transition: 'all 0.4s ease' }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F0F0F', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          Submit Your Inquiry
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="glass-input"
            style={{ width: '100%', padding: '0.85rem 1rem', fontSize: '0.875rem', boxSizing: 'border-box' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="glass-input"
            style={{ width: '100%', padding: '0.85rem 1rem', fontSize: '0.875rem', boxSizing: 'border-box' }}
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            required
            className="glass-input"
            style={{ width: '100%', padding: '0.85rem 1rem', fontSize: '0.875rem', boxSizing: 'border-box' }}
          />
          <input
            type="text"
            name="position"
            placeholder="Position Applying For"
            required
            className="glass-input"
            style={{ width: '100%', padding: '0.85rem 1rem', fontSize: '0.875rem', boxSizing: 'border-box' }}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="currentLocation"
              placeholder="Current Location"
              required
              className="glass-input"
              style={{ padding: '0.85rem 1rem', fontSize: '0.875rem', boxSizing: 'border-box' }}
            />
            <input
              type="text"
              name="preferredLocation"
              placeholder="Preferred Location"
              required
              className="glass-input"
              style={{ padding: '0.85rem 1rem', fontSize: '0.875rem', boxSizing: 'border-box' }}
            />
          </div>

          {/* Resume Upload Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.2rem' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#4B5563' }}>Upload Resume (PDF/DOC, max 4MB)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="glass-input"
              style={{ width: '100%', padding: '0.6rem 0.85rem', fontSize: '0.78rem', boxSizing: 'border-box' }}
            />
            {resume.name && (
              <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>
                ✓ Selected: {resume.name}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn-primary"
            style={{ justifyContent: 'center', marginTop: '0.5rem', borderRadius: '0.85rem', padding: '0.95rem', opacity: status === 'sending' ? 0.7 : 1 }}
          >
            {status === 'sending' ? (
              <span className="flex items-center gap-2">
                <i className="fas fa-spinner fa-spin" /> Sending Inquiry…
              </span>
            ) : (
              'Submit Application →'
            )}
          </button>

          {status === 'success' && (
            <p style={{ textAlign: 'center', color: '#10b981', fontWeight: 600, fontSize: '0.875rem', margin: '0.5rem 0 0' }}>
              ✓ Received! We will be in touch shortly.
            </p>
          )}
          {status === 'error' && (
            <p style={{ textAlign: 'center', color: '#ef4444', fontWeight: 600, fontSize: '0.875rem', margin: '0.5rem 0 0' }}>
              Something went wrong. Please email us directly.
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
}
