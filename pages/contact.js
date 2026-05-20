import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Transmitting Security Packets...');
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      companySize: e.target.companySize.value,
      domain: e.target.domain.value,
      message: e.target.message.value,
    };

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus('Data pipeline safely committed to system networks.');
      e.target.reset();
    } else {
      setStatus('Transmission bottleneck encountered. Re-verify pipeline parameters.');
    }
  };

  return (
    <div className="page-layout-wrapper py-20 px-6 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Initialize Enterprise <span className="gradient-text">Discovery</span></h2>
        <p className="text-gray-400 mb-8 max-w-md leading-relaxed text-sm md:text-base">
          [span_15](start_span)[span_16](start_span)Submit strategic resource descriptions to deploy dedicated business consultants to your structural perimeter[span_15](end_span)[span_16](end_span).
        </p>
        <div className="space-y-4 text-gray-300 font-medium text-sm">
          [span_17](start_span)<p className="flex items-center gap-3"><i className="fas fa-envelope text-cyan-400 w-6"></i> hr@kairosglobalsolutions.com[span_17](end_span)</p>
          [span_18](start_span)<p className="flex items-center gap-3"><i className="fas fa-phone text-green-400 w-6"></i> +91 9947944047[span_18](end_span)</p>
          [span_19](start_span)<p className="flex items-center gap-3"><i className="fas fa-map-marker-alt text-cyan-400 w-6"></i> Chennai, India[span_19](end_span)</p>
        </div>
      </motion.div>

      {/* Advanced Full Consulting Intake Matrix Form */}
      <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="bg-slate-900/40 border border-slate-900/80 p-8 rounded-2xl shadow-2xl backdrop-blur-sm w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Full Identity Name" required className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 text-sm" />
            <input type="email" name="email" placeholder="Corporate Domain Email" required className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 text-sm" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="tel" name="phone" placeholder="Direct Contact Line Phone" required className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 text-sm" />
            <select name="companySize" required className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-gray-400 focus:outline-none focus:border-cyan-400 text-sm">
              <option value="">Select Scale Organization Size</option>
              <option value="1-20">1-20 Nodes</option>
              <option value="21-100">21-100 Nodes</option>
              <option value="101-500">101-500 Nodes</option>
              <option value="500+">500+ Enterprise Scaling</option>
            </select>
          </div>
          <select name="domain" required className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-gray-400 focus:outline-none focus:border-cyan-400 text-sm">
            <option value="">Primary Consultation Requirement</option>
            [span_20](start_span)<option value="IT Application/Software Development">IT Software Development[span_20](end_span)</option>
            [span_21](start_span)[span_22](start_span)<option value="Human Capital Recruitment Strategy">Human Capital Sourcing & Management[span_21](end_span)[span_22](end_span)</option>
            [span_23](start_span)[span_24](start_span)<option value="Legal Auditing & Risk Compliance">Legal Advisory Systems[span_23](end_span)[span_24](end_span)</option>
            [span_25](start_span)<option value="Structural Business Consultation">Strategic Business Consulting[span_25](end_span)</option>
          </select>
          <textarea name="message" rows="4" placeholder="Identify Core Architecture Vulnerabilities / Growth Ambitions" required className="w-full bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 text-sm"></textarea>
          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-green-500 text-slate-950 font-extrabold py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.01]">
            Transmit Network Request
          </button>
          {status && <p className="text-center text-xs font-semibold text-cyan-400 mt-2 tracking-wide animate-pulse">{status}</p>}
        </form>
      </motion.div>
    </div>
  );
}