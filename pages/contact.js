import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Transmitting Request...');
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      mobile: e.target.mobile.value,
      position: e.target.position.value,
      currentLocation: e.target.currentLocation.value,
      preferredLocation: e.target.preferredLocation.value,
    };

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus('Application securely routed to internal networks.');
      e.target.reset();
    } else {
      setStatus('Transmission bottleneck detected. Re-verify interface parameter fields.');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-24 px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-grow box-border">
      <div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
          Connect <span className="text-gradient">Securely</span>
        </h2>
        <p className="text-slate-600 mb-8 leading-relaxed text-sm md:text-base font-medium">
          Submit requirements to route dedicated corporate resources directly to your operation.
        </p>
        <div className="space-y-4 text-slate-700 text-sm font-semibold">
          <p className="flex items-center gap-3"><i className="fas fa-envelope text-cyan-600 w-5"></i> hr@kairosglobalsolutions.com</p>
          <p className="flex items-center gap-3"><i className="fas fa-phone text-emerald-500 w-5"></i> 63793 02839</p>
          <p className="flex items-center gap-3"><i className="fas fa-map-marker-alt text-cyan-600 w-5"></i> Chennai, India</p>
        </div>
      </div>

      <div className="glass-panel p-6 md:p-8 w-full box-border rounded-3xl">
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <input type="text" name="name" placeholder="Name" required className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-cyan-500 text-sm shadow-sm" />
          <input type="email" name="email" placeholder="Email Address" required className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-cyan-500 text-sm shadow-sm" />
          <input type="tel" name="mobile" placeholder="Mobile Number" required className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-cyan-500 text-sm shadow-sm" />
          <input type="text" name="position" placeholder="Position Applying For" required className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-cyan-500 text-sm shadow-sm" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="currentLocation" placeholder="Current Location" required className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-cyan-500 text-sm shadow-sm" />
            <input type="text" name="preferredLocation" placeholder="Preferred Location" required className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-cyan-500 text-sm shadow-sm" />
          </div>
          
          <button type="submit" className="w-full bg-cyan-600 text-white font-bold uppercase tracking-wider text-xs py-4 rounded-xl shadow-lg shadow-cyan-500/20 hover:bg-cyan-700 transition-colors mt-2">
            Submit Application
          </button>
          {status && <p className="text-center text-xs font-semibold text-cyan-700 mt-3 tracking-wide">{status}</p>}
        </form>
      </div>
    </div>
  );
}
