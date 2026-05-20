import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App({ Component, pageProps, router }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Futuristic loading screen timer
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center"
        >
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-green-400 rounded-full animate-spin mx-auto mb-6"></div>
          <h1 className="text-3xl font-bold tracking-widest uppercase text-white">Kairos <span className="text-cyan-400">Global</span></h1>
          <p className="text-green-400 text-sm mt-2 tracking-[0.2em] animate-pulse">INITIALIZING SYSTEM...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-950 bg-grid">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main 
          key={router.route}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="flex-grow flex flex-col relative z-10"
        >
          <Component {...pageProps} />
        </motion.main>
      </AnimatePresence>
      <footer className="bg-slate-900/80 backdrop-blur-md text-white text-center py-6 mt-auto border-t border-slate-800 relative z-10">
        <p className="text-sm text-gray-500">&copy; 2026 Kairos Global Solutions Pvt Ltd. All Rights Reserved.</p>
      </footer>
    </div>
  );
}