import Link from 'next/link';
import { ArrowRight, Cloud, Users, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center relative">
      
      {/* Decorative slider arrows mimicking AGM */}
      <div className="absolute left-0 top-1/3 hidden md:flex items-center justify-center w-12 h-12 rounded-full glass-panel text-slate-400 hover:text-cyan-600 shadow-sm"><ChevronLeft /></div>
      <div className="absolute right-0 top-1/3 hidden md:flex items-center justify-center w-12 h-12 rounded-full glass-panel text-slate-400 hover:text-cyan-600 shadow-sm"><ChevronRight /></div>

      <div className="max-w-4xl mx-auto text-center mb-20 mt-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-xs font-bold tracking-widest text-cyan-700 uppercase mb-8 shadow-sm border border-cyan-200">
          <Cloud size={14} className="text-cyan-500" /> Enterprise Global Solutions
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.15] tracking-tight mb-8">
          Architecting the Future of <br />
          <span className="text-gradient">Global Commerce.</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium mb-10">
          Headquartered in Chennai, Kairos Global Solutions delivers high-performance enterprise consulting, adaptive technology frameworks, and human capital infrastructure.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/contact" className="inline-flex items-center gap-2 bg-cyan-600 text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-700 transition-all hover:scale-105">
            Initialize Audit <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full px-4">
        <div className="glass-panel p-8 rounded-3xl text-center group">
          <div className="w-16 h-16 mx-auto bg-cyan-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-cyan-100">
            <Users className="text-cyan-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Human Capital</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">Precision talent acquisition, contract deployment, and corporate HR scaling.</p>
        </div>
        <div className="glass-panel p-8 rounded-3xl text-center group">
          <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-emerald-100">
            <Cloud className="text-emerald-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">IT & Cloud Systems</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">Cloud architecture, native enterprise software development, and digital workflows.</p>
        </div>
        <div className="glass-panel p-8 rounded-3xl text-center group">
          <div className="w-16 h-16 mx-auto bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-indigo-100">
            <ShieldCheck className="text-indigo-600 w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-3">Legal & Governance</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">Legal compliance frameworks, risk auditing, and strategic vendor management.</p>
        </div>
      </div>
    </div>
  );
}
