import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-16 text-center box-border flex flex-col items-center justify-center flex-grow">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-semibold mb-6 uppercase tracking-wider">
        Enterprise Business Frameworks
      </div>
      <h1 className="text-4xl sm:text-6xl font-black mb-6 text-white leading-tight tracking-tight max-w-4xl">
        Architecting Resilient <span className="gradient-text">Business Landscapes</span>
      </h1>
      <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Headquartered in Chennai, Kairos Global Solutions integrates high-impact business architectures, adaptive tech consulting, and premium technical recruitment directories globally.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center">
        <Link href="/contact" className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-green-500 text-slate-950 font-bold py-3.5 px-8 rounded-xl shadow-lg transition-transform hover:scale-[1.01] text-center text-sm">
          Request Consultation Audit
        </Link>
        <Link href="/services" className="w-full sm:w-auto text-slate-300 hover:text-white font-semibold py-3.5 px-6 rounded-xl border border-slate-800 hover:bg-slate-900/40 transition-all text-center text-sm">
          Explore Services Matrix
        </Link>
      </div>
    </div>
  );
}