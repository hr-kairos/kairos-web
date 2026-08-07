import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent, reportError } from '../utils/telemetry';

export default function Contact() {
  const [status, setStatus] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [resume, setResume] = useState({ data: '', name: '', type: '', size: '' });
  const [isDragging, setIsDragging] = useState(false);
  const [showSpotlight, setShowSpotlight] = useState(false);

  // Inline Validation State
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  // Process File
  const processFile = (file) => {
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, DOC, or DOCX document.');
      return;
    }

    if (file.size > 4 * 1024 * 1024) {
      alert('File size must be under 4MB to ensure secure transmission.');
      return;
    }

    const fileSizeMb = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target.result.split(',')[1];
      setResume({
        data: base64Data,
        name: file.name,
        type: file.type,
        size: fileSizeMb,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    processFile(e.target.files[0]);
  };

  // Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const removeResume = () => {
    setResume({ data: '', name: '', type: '', size: '' });
  };

  // Validation Logic
  const validateField = (name, value) => {
    let error = '';
    if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value) error = 'Email is required';
      else if (!emailRegex.test(value)) error = 'Enter a valid email address';
    } else if (name === 'mobile') {
      const phoneRegex = /^[+\d\s\-()]{7,20}$/;
      if (!value) error = 'Mobile number is required';
      else if (!phoneRegex.test(value)) error = 'Enter a valid phone number';
    } else if (name === 'name') {
      if (!value.trim()) error = 'Name is required';
      else if (value.trim().length < 2) error = 'Name must be at least 2 characters';
    } else if (['position', 'currentLocation', 'preferredLocation'].includes(name)) {
      if (!value.trim()) error = 'This field is required';
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // State for Draft & Reference ID
  const [referenceId, setReferenceId] = useState('');
  const [formDraft, setFormDraft] = useState({
    name: '',
    email: '',
    mobile: '',
    position: '',
    currentLocation: '',
    preferredLocation: '',
  });

  // Restore draft from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('kairos_contact_draft');
      if (saved) {
        setFormDraft(JSON.parse(saved));
      }
    } catch {
      // Ignore storage error
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDraft((prev) => {
      const updated = { ...prev, [name]: value };
      try {
        sessionStorage.setItem('kairos_contact_draft', JSON.stringify(updated));
      } catch {
        // Ignore storage error
      }
      return updated;
    });

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus('sending');

    const refCode = `KGS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const formData = {
      name: formDraft.name || e.target.name.value,
      email: formDraft.email || e.target.email.value,
      mobile: formDraft.mobile || e.target.mobile.value,
      position: formDraft.position || e.target.position.value,
      currentLocation: formDraft.currentLocation || e.target.currentLocation.value,
      preferredLocation: formDraft.preferredLocation || e.target.preferredLocation.value,
      referenceId: refCode,
      resume: resume.data ? resume : null,
      _honeypot: e.target._honeypot?.value || '',
    };

    trackEvent('contact_form_submission_started', { position: formData.position });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setReferenceId(refCode);
        setStatus('success');
        setShowToast(true);
        setShowSpotlight(true);
        trackEvent('contact_form_submission_success', { position: formData.position, referenceId: refCode });
        e.target.reset();
        setFormDraft({ name: '', email: '', mobile: '', position: '', currentLocation: '', preferredLocation: '' });
        try {
          sessionStorage.removeItem('kairos_contact_draft');
        } catch {}
        setResume({ data: '', name: '', type: '', size: '' });
        setTouched({});
        setErrors({});
        setTimeout(() => setShowToast(false), 8000);
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
      className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start flex-grow"
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
              <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Message Received</h4>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Ref Tracking ID: <span style={{ fontWeight: 800, color: '#0891b2' }}>{referenceId || 'KGS-2026-REG'}</span> — 24h SLA active.
              </p>
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
            color: showSpotlight ? '#FFFFFF' : 'var(--text-primary)',
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
            color: showSpotlight ? '#D1D5DB' : 'var(--text-secondary)',
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

        {/* LinkedIn Spotlight link */}
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
                Follow us on LinkedIn for placement announcements, consulting advisory insights, and brand metrics!
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
              color: '#0A66C2',
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
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          Submit Your Inquiry
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          {/* Honeypot anti-bot field */}
          <input
            type="text"
            name="_honeypot"
            autoComplete="off"
            tabIndex={-1}
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0, overflow: 'hidden' }}
          />

          {/* Full Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label htmlFor="name" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>
              Full Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="e.g. Sarah Jenkins"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                className="glass-input"
                style={{
                  width: '100%',
                  padding: '0.85rem 2.2rem 0.85rem 1rem',
                  fontSize: '0.875rem',
                  boxSizing: 'border-box',
                  borderColor: errors.name ? '#ef4444' : touched.name && !errors.name ? '#10b981' : undefined,
                }}
              />
              {touched.name && (
                <i
                  className={`fas ${errors.name ? 'fa-exclamation-circle' : 'fa-check-circle'}`}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: errors.name ? '#ef4444' : '#10b981',
                    fontSize: '0.85rem',
                  }}
                />
              )}
            </div>
            {errors.name && <span style={{ fontSize: '0.72rem', color: '#ef4444', fontWeight: 600 }}>{errors.name}</span>}
          </div>

          {/* Email Address */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label htmlFor="email" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>
              Email Address <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="e.g. sarah@example.com"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                className="glass-input"
                style={{
                  width: '100%',
                  padding: '0.85rem 2.2rem 0.85rem 1rem',
                  fontSize: '0.875rem',
                  boxSizing: 'border-box',
                  borderColor: errors.email ? '#ef4444' : touched.email && !errors.email ? '#10b981' : undefined,
                }}
              />
              {touched.email && (
                <i
                  className={`fas ${errors.email ? 'fa-exclamation-circle' : 'fa-check-circle'}`}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: errors.email ? '#ef4444' : '#10b981',
                    fontSize: '0.85rem',
                  }}
                />
              )}
            </div>
            {errors.email && <span style={{ fontSize: '0.72rem', color: '#ef4444', fontWeight: 600 }}>{errors.email}</span>}
          </div>

          {/* Mobile Number */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label htmlFor="mobile" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>
              Mobile Number <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="mobile"
                type="tel"
                name="mobile"
                placeholder="e.g. +91 98765 43210"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                className="glass-input"
                style={{
                  width: '100%',
                  padding: '0.85rem 2.2rem 0.85rem 1rem',
                  fontSize: '0.875rem',
                  boxSizing: 'border-box',
                  borderColor: errors.mobile ? '#ef4444' : touched.mobile && !errors.mobile ? '#10b981' : undefined,
                }}
              />
              {touched.mobile && (
                <i
                  className={`fas ${errors.mobile ? 'fa-exclamation-circle' : 'fa-check-circle'}`}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: errors.mobile ? '#ef4444' : '#10b981',
                    fontSize: '0.85rem',
                  }}
                />
              )}
            </div>
            {errors.mobile && <span style={{ fontSize: '0.72rem', color: '#ef4444', fontWeight: 600 }}>{errors.mobile}</span>}
          </div>

          {/* Position Applying For */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label htmlFor="position" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>
              Position Applying For <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              id="position"
              type="text"
              name="position"
              placeholder="e.g. Senior Software Architect / HR Director"
              required
              onBlur={handleBlur}
              onChange={handleChange}
              className="glass-input"
              style={{ width: '100%', padding: '0.85rem 1rem', fontSize: '0.875rem', boxSizing: 'border-box' }}
            />
          </div>

          {/* Grid: Current & Preferred Locations */}
          <div className="grid grid-cols-2 gap-4">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label htmlFor="currentLocation" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>
                Current Location <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                id="currentLocation"
                type="text"
                name="currentLocation"
                placeholder="e.g. Chennai"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                className="glass-input"
                style={{ padding: '0.85rem 1rem', fontSize: '0.875rem', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label htmlFor="preferredLocation" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>
                Preferred Location <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                id="preferredLocation"
                type="text"
                name="preferredLocation"
                placeholder="e.g. Bangalore / Remote"
                required
                onBlur={handleBlur}
                onChange={handleChange}
                className="glass-input"
                style={{ padding: '0.85rem 1rem', fontSize: '0.875rem', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {/* Drag & Drop Resume Upload Box */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.3rem' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>
              Upload Resume (PDF, DOC, DOCX — Max 4MB)
            </label>

            {!resume.name ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                  border: isDragging ? '2px dashed #0891b2' : '2px dashed #D1D5DB',
                  background: isDragging ? 'rgba(8, 145, 178, 0.06)' : 'rgba(249, 250, 251, 0.7)',
                  borderRadius: '1rem',
                  padding: '1.4rem 1rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                }}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      background: 'rgba(8, 145, 178, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <i className="fas fa-cloud-upload-alt" style={{ color: '#0891b2', fontSize: '1.2rem' }} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Drag & drop your resume here
                    </p>
                    <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      or <span style={{ color: '#0891b2', textDecoration: 'underline' }}>browse file</span> from computer
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Selected File Card */
              <div
                style={{
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  background: 'rgba(16, 185, 129, 0.08)',
                  borderRadius: '0.85rem',
                  padding: '0.85rem 1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <i
                    className={`fas ${resume.type.includes('pdf') ? 'fa-file-pdf' : 'fa-file-word'}`}
                    style={{ color: '#0891b2', fontSize: '1.3rem' }}
                  />
                  <div>
                    <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>{resume.name}</p>
                    <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>✓ Attached ({resume.size})</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeResume}
                  title="Remove file"
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ef4444',
                    cursor: 'pointer',
                  }}
                >
                  <i className="fas fa-trash-alt" style={{ fontSize: '0.75rem' }} />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'sending'}
            className="btn-primary"
            style={{
              justifyContent: 'center',
              marginTop: '0.5rem',
              borderRadius: '0.85rem',
              padding: '0.95rem',
              opacity: status === 'sending' ? 0.7 : 1,
            }}
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
