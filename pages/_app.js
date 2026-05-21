import '../styles/globals.css';
import Navbar from '../components/Navbar'; // <-- This line fixes the crash!
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App({ Component, pageProps, router }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex flex-col min-h-screen cyber-mesh-bg perspective-wrapper">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loader"
            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center"
          >
            <div className="w-10 h-10 border-2 border-t-cyan-400 border-r-emerald-400 border-slate-800 rounded-xl animate-spin mb-4"></div>
            <h1 className="text-lg font-black tracking-[0.3em] text-white">KAIROS GLOBAL</h1>
          </motion.div>
        ) : (
          <div className="w-full flex flex-col min-h-screen">
            <Navbar />
            <AnimatePresence mode="wait">
              <motion.div 
                key={router.route}
                initial={{ opacity: 0, rotateX: 6, y: 10, transformOrigin: "top center" }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, rotateX: -6, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full flex-grow flex flex-col box-border"
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}