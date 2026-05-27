import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Transmitting Request...');
    
    const formData = {
      name: e.target.name.value, email: e.target.email.value, mobile: e.target.mobile.value,
      position: e.target.position.value, currentLocation: e.target.currentLocation.value, preferredLocation: e.target.preferredLocation.value,
    };

    const response = await fetch('/api/send-email', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
    });

    if (response.ok) { setStatus('Application securely routed to internal networks.'); e.target.reset(); } 
    else { setStatus('Transmission bottleneck detected. Please retry.'); }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-32 px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center flex-grow box-border">
      <div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Connect <span className="text-gradient">Securely</span></h2>
        <p className="text-slate-600 mb-10 leading-relaxed text-lg font-medium">Submit requirements to route dedicated corporate resources directly to your operation.</p>
        <div className="space-y-6 text-slate-700 text-base font-semibold">
          <p className="flex items-center gap-4"><i className="fas fa-envelope text-cyan-600 text-xl"></i> hr@kairosglobalsolutions.com</p>
          <p className="flex items-center gap-4"><i className="fas fa-phone text-emerald-500 text-xl"></i> 63793 02839</p>
          <p className="flex items-center gap-4"><i className="fas fa-map-marker-alt text-cyan-600 text-xl"></i> Chennai, India</p>
        </div>
      </div>

      <div className="glass-panel p-8 md:p-10 w-full box-border rounded-[2rem]">
        <form onSubmit={handleSubmit} className="space-y-5 w-full">
          <input type="text" name="name" placeholder="Full Name" required className="w-full glass-input rounded-xl px-5 py-4 text-slate-800 outline-none text-sm" />
          <input type="email" name="email" placeholder="Email Address" required className="w-full glass-input rounded-xl px-5 py-4 text-slate-800 outline-none text-sm" />
          <input type="tel" name="mobile" placeholder="Mobile Number" required className="w-full glass-input rounded-xl px-5 py-4 text-slate-800 outline-none text-sm" />
          <input type="text" name="position" placeholder="Position Applying For" required className="w-full glass-input rounded-xl px-5 py-4 text-slate-800 outline-none text-sm" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input type="text" name="currentLocation" placeholder="Current Location" required className="w-full glass-input rounded-xl px-5 py-4 text-slate-800 outline-none text-sm" />
            <input type="text" name="preferredLocation" placeholder="Preferred Location" required className="w-full glass-input rounded-xl px-5 py-4 text-slate-800 outline-none text-sm" />
          </div>
          
          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold uppercase tracking-widest text-sm py-4 rounded-xl shadow-[0_8px_20px_rgba(8,145,178,0.3)] hover:shadow-[0_8px_25px_rgba(8,145,178,0.5)] transition-all hover:-translate-y-1 mt-4">
            Submit Application
          </button>
          {status && <p className="text-center text-sm font-semibold text-cyan-700 mt-4 tracking-wide">{status}</p>}
        </form>
      </div>
    </div>
  );
}
