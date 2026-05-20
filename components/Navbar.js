import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = ['Home', 'Services', 'Clients', 'Contact'];

  return (
    <nav className="bg-slate-950/80 backdrop-blur-lg border-b border-slate-900 text-white p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="Kairos" className="h-10 w-10 object-contain bg-white/10 p-1 rounded-lg group-hover:scale-105 transition-transform" onError={(e) => e.target.style.display='none'} />
          <span className="font-bold text-2xl tracking-wide">
            Kairos <span className="text-cyan-400">Global</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 font-medium">
          {navItems.map((item) => (
            <Link key={item} href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="relative group text-gray-300 hover:text-white transition-colors">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button className="block md:hidden text-gray-300 hover:text-white focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-t border-slate-900 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                 <Link 
                   key={item} 
                   href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                   onClick={() => setIsOpen(false)}
                   className="text-gray-300 hover:text-cyan-400 font-medium text-lg border-b border-slate-900/50 pb-2 transition-colors"
                 >
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