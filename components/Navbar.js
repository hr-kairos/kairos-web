import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-950/80 backdrop-blur-lg border-b border-slate-800 text-white p-4 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="Kairos" className="h-10 w-10 object-contain bg-white/10 p-1 rounded-lg group-hover:scale-110 transition-transform" onError={(e) => e.target.style.display='none'} />
          <span className="font-bold text-2xl tracking-wide">
            Kairos <span className="text-cyan-400">Global</span>
          </span>
        </Link>
        <div className="space-x-8 font-medium text-sm md:text-base hidden md:flex">
          {['Home', 'Services', 'Clients', 'Contact'].map((item) => (
            <Link 
              key={item} 
              href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
              className="relative group text-gray-300 hover:text-white transition-colors"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}