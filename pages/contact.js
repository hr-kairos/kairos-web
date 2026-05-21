import { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Transmitting Packet Data...');
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      mobile: e.target.mobile.value,
      position: e.target.position.value,
      address: e.target.address.value,
    };

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus('Message successfully transmitted.');
      e.target.reset();
    } else {
      setStatus('Transmission fault. Please retry.');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[75vh] box-border">
      <div className="w-full">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
          Connect <span className="text-cyan-400">Securely</span>
        </h2>
        <p className="text-slate-400 mb-8 leading-relaxed text-sm md:text-base">
          Submit data parameters to routing handlers to connect directly with the operational management desk.
        </p>
        <div className="space-y-4 text-slate-300 font-medium text-sm md:text-base">
          <p className="flex items-center gap-3"><i className="fas fa-envelope text-cyan-400 w-6"></i> hr@kairosglobalsolutions.com</p>
          <p className="flex items-center gap-3"><i className="fas fa-phone text-emerald-400 w-6"></i> 63793 02839</p>
          <p className="flex items-center gap-3"><i className="fas fa-map-marker-alt text-cyan-400 w-6"></i> Chennai, India</p>
        </div>
      </div>

      <div className="bg-slate-900/20 border border-slate-900 p-6 md:p-8 rounded-2xl shadow-xl backdrop-blur-sm w-full box-border">
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <input type="text" name="name" placeholder="Name" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 text-sm" />
          <input type="email" name="email" placeholder="Email Address" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 text-sm" />
          <input type="tel" name="mobile" placeholder="Mobile Number" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 text-sm" />
          <input type="text" name="position" placeholder="Position Looking For" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 text-sm" />
          <textarea name="address" rows="3" placeholder="Address" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 text-sm"></textarea>
          
          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-green-500 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg hover:scale-[1.01] transition-transform text-sm">
            Submit Application
          </button>
          {status && <p className="text-center text-xs font-semibold text-cyan-400 mt-2 tracking-wide">{status}</p>}
        </form>
      </div>
    </div>
  );
}