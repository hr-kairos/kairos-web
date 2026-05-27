import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;

  const isActive = (path) => currentPath === path;

  return (
    <nav className="fixed w-full top-0 z-50 background: rgba(255, 255, 255, 0.6) backdrop-blur-xl border-b border-white/60 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Kairos" className="h-10 w-10 object-contain drop-shadow-md" onError={(e) => e.target.style.display='none'} />
          <span className="font-extrabold text-xl tracking-tight text-slate-800">
            Kairos Global <span className="text-cyan-600 font-light">Solutions</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center h-full">
          <Link href="/" className={`text-sm font-bold transition-colors pb-1 border-b-2 ${isActive('/') ? 'text-cyan-600 border-cyan-600' : 'text-slate-600 border-transparent hover:text-cyan-600'}`}>Home</Link>
          <Link href="/services" className={`text-sm font-bold transition-colors pb-1 border-b-2 ${isActive('/services') ? 'text-cyan-600 border-cyan-600' : 'text-slate-600 border-transparent hover:text-cyan-600'}`}>Capabilities</Link>
          <Link href="/clients" className={`text-sm font-bold transition-colors pb-1 border-b-2 ${isActive('/clients') ? 'text-cyan-600 border-cyan-600' : 'text-slate-600 border-transparent hover:text-cyan-600'}`}>Ecosystem</Link>
          <Link href="/contact" className={`text-sm font-bold transition-colors pb-1 border-b-2 ${isActive('/contact') ? 'text-cyan-600 border-cyan-600' : 'text-slate-600 border-transparent hover:text-cyan-600'}`}>Contact Us</Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-800 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-xl border-t border-slate-200">
          <div className="flex flex-col px-6 py-4 space-y-4">
             <Link href="/" onClick={() => setIsOpen(false)} className={`text-sm font-bold ${isActive('/') ? 'text-cyan-600' : 'text-slate-600'}`}>Home</Link>
             <Link href="/services" onClick={() => setIsOpen(false)} className={`text-sm font-bold ${isActive('/services') ? 'text-cyan-600' : 'text-slate-600'}`}>Capabilities</Link>
             <Link href="/clients" onClick={() => setIsOpen(false)} className={`text-sm font-bold ${isActive('/clients') ? 'text-cyan-600' : 'text-slate-600'}`}>Ecosystem</Link>
             <Link href="/contact" onClick={() => setIsOpen(false)} className={`text-sm font-bold ${isActive('/contact') ? 'text-cyan-600' : 'text-slate-600'}`}>Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
