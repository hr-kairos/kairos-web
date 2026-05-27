import Link from 'next/link';

export default function Home() {
  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center relative">
      <div className="max-w-4xl mx-auto text-center mb-24 mt-10">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel text-xs font-bold tracking-widest text-cyan-700 uppercase mb-8">
          <i className="fas fa-cloud text-cyan-500"></i> Enterprise Global Solutions
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.15] tracking-tight mb-8">
          Architecting the Future of <br />
          <span className="text-gradient">Global Commerce.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium mb-10">
          Headquartered in Chennai, Kairos Global Solutions delivers high-performance enterprise consulting, adaptive technology frameworks, and human capital infrastructure.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-3 bg-slate-900 text-white font-bold uppercase tracking-wider text-sm px-10 py-5 rounded-full shadow-xl hover:bg-cyan-600 transition-all hover:-translate-y-1">
          Initialize Audit <i className="fas fa-arrow-right"></i>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full px-4">
        <div className="glass-panel p-10 rounded-[2.5rem] text-center group">
          <div className="w-20 h-20 mx-auto bg-white rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm border border-slate-100">
            <i className="fas fa-users text-cyan-500 text-3xl"></i>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Human Capital</h3>
          <p className="text-base text-slate-600 leading-relaxed font-medium">Precision talent acquisition, contract deployment, and corporate HR scaling.</p>
        </div>
        <div className="glass-panel p-10 rounded-[2.5rem] text-center group">
          <div className="w-20 h-20 mx-auto bg-white rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm border border-slate-100">
            <i className="fas fa-server text-emerald-500 text-3xl"></i>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">IT & Cloud Systems</h3>
          <p className="text-base text-slate-600 leading-relaxed font-medium">Cloud architecture, native enterprise software development, and digital workflows.</p>
        </div>
        <div className="glass-panel p-10 rounded-[2.5rem] text-center group">
          <div className="w-20 h-20 mx-auto bg-white rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm border border-slate-100">
            <i className="fas fa-shield-alt text-indigo-500 text-3xl"></i>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Legal & Governance</h3>
          <p className="text-base text-slate-600 leading-relaxed font-medium">Legal compliance frameworks, risk auditing, and strategic vendor management.</p>
        </div>
      </div>
    </div>
  );
}
