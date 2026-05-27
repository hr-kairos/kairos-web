'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Kairos" className="h-10 w-10 object-contain drop-shadow-md" onError={(e) => e.target.style.display='none'} />
          <span className="font-extrabold text-xl tracking-tight text-slate-800">
            Kairos Global <span className="text-cyan-600 font-light">Solutions</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center h-full">
          <Link href="/" className="text-sm font-semibold text-slate-600 hover:text-cyan-600 transition-colors">Home</Link>
          
          {/* Dropdown Menu */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="text-sm font-semibold text-slate-600 hover:text-cyan-600 flex items-center gap-1 transition-colors">
              Capabilities <ChevronDown size={16} />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute top-20 left-0 w-64 bg-white/90 backdrop-blur-xl border border-slate-100 shadow-xl rounded-xl overflow-hidden py-2"
                >
                  <Link href="/services" className="block px-6 py-3 text-sm text-slate-600 hover:bg-cyan-50 hover:text-cyan-700">All Services Matrix</Link>
                  <Link href="/services" className="block px-6 py-3 text-sm text-slate-600 hover:bg-cyan-50 hover:text-cyan-700">Human Capital Integration</Link>
                  <Link href="/services" className="block px-6 py-3 text-sm text-slate-600 hover:bg-cyan-50 hover:text-cyan-700">IT Software & Cloud</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/clients" className="text-sm font-semibold text-slate-600 hover:text-cyan-600 transition-colors">Ecosystem</Link>
          <Link href="/contact" className="text-sm font-semibold text-slate-600 hover:text-cyan-600 transition-colors">Contact Us</Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>
  );
}
