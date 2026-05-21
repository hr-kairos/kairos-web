import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ['Home', 'Services', 'Clients', 'Contact'];

  return (
    <nav className="bg-slate-950/60 backdrop-blur-md border-b border-slate-900/80 text-white p-4 sticky top-0 z-50 w-full">
      <div className="max-w-6xl mx-auto flex justify-between items-center w-full">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Kairos" className="h-9 w-9 object-contain bg-slate-900 p-1 rounded-lg border border-slate-800" />
          <span className="font-extrabold text-xl tracking-wider uppercase">
            Kairos <span className="text-cyan-400">Global</span>
          </span>
        </Link>

        <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
          {navItems.map((item) => (
            <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-slate-400 hover:text-cyan-400 transition-colors">
              {item}
            </Link>
          ))}
        </div>

        <button className="block md:hidden text-slate-400 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-slate-950 border-t border-slate-900 mt-4"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                 <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-cyan-400 font-medium text-base">
                   {item}
                 </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}