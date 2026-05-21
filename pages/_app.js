import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App({ Component, pageProps, router }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-viewport-container cyber-mesh-bg">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="cyber-loader"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center"
          >
            <div className="relative flex items-center justify-center w-24 h-24 mb-4">
              <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-xl animate-ping"></div>
              <div className="w-12 h-12 border-2 border-t-cyan-400 border-r-emerald-400 border-slate-800 rounded-xl animate-spin"></div>
            </div>
            <h1 className="text-xl font-black tracking-[0.4em] text-white">KAIROS</h1>
            <div className="h-[1px] w-12 bg-gradient-to-r from-cyan-500 to-green-500 my-2"></div>
            <p className="text-[10px] text-emerald-400 font-mono tracking-[0.2em] animate-pulse">ESTABLISHING SECURE CONNECTION...</p>
          </motion.div>
        ) : (
          <div className="w-full flex flex-col min-h-screen">
            <Navbar />
            <AnimatePresence mode="wait">
              <motion.div 
                key={router.route}
                initial={{ opacity: 0, rotateX: 8, y: 15, transformOrigin: "top center" }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, rotateX: -8, y: -15 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="w-full flex-grow flex flex-col"
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
            <footer className="border-t border-slate-900 bg-slate-950/40 text-center py-6 text-xs text-slate-600 tracking-wider">
              &copy; 2026 Kairos Global Solutions Pvt Ltd. All Capital Infrastructure Reserved.
            </footer>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}