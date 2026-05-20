import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Transmitting...');
    const formData = { name: e.target.name.value, email: e.target.email.value, message: e.target.message.value };
    const response = await fetch('/api/send-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
    if (response.ok) { setStatus('Message transmitted securely.'); e.target.reset(); } 
    else { setStatus('Transmission failed. Try again.'); }
  };

  return (
    <div className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
        <h2 className="text-5xl font-bold text-white mb-8">Establish <span className="gradient-text">Contact</span></h2>
        <div className="space-y-6 text-xl text-gray-300">
          <p className="flex items-center"><i className="fas fa-envelope text-cyan-400 w-10"></i>hr@kairosglobalsolutions.com</p>
          <p className="flex items-center"><i className="fas fa-phone text-green-400 w-10"></i>+91 9947944047</p>
          <p className="flex items-center"><i className="fas fa-map-marker-alt text-cyan-400 w-10"></i>Chennai, India</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="bg-slate-900/80 p-8 rounded-2xl border border-slate-700 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" name="name" placeholder="Full Name" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors" />
          <input type="email" name="email" placeholder="Email Address" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors" />
          <textarea name="message" rows="5" placeholder="Inquiry Details" required className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition-colors"></textarea>
          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-green-500 text-slate-950 font-bold py-4 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-shadow">
            Initiate Communication
          </button>
          {status && <p className="text-center mt-4 font-medium text-cyan-400 animate-pulse">{status}</p>}
        </form>
      </motion.div>
    </div>
  );
}