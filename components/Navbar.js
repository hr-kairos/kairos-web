import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-2xl">
          Kairos <span className="text-blue-500">Global</span>
        </Link>
        <div className="space-x-6 font-medium text-sm md:text-base">
          <Link href="/" className="hover:text-blue-400 transition">Home</Link>
          <Link href="/services" className="hover:text-blue-400 transition">Services</Link>
          <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
        </div>
      </div>
    </nav>
  );
}