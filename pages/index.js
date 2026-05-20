import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="page-layout-wrapper animate-fade-in">
      {/* Hero Core Segment */}
      <section className="py-24 px-6 text-center relative w-full flex flex-col items-center justify-center">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-semibold mb-6 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span> Enterprise Global Solutions
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-8 text-white leading-[1.1] tracking-tight">
            Architecting the Future of <span className="gradient-text">Global Commerce</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            [span_0](start_span)[span_1](start_span)Established in 2024 and headquartered in Chennai, Kairos Global Solutions delivers high-performance enterprise consulting, adaptive technology frameworks, and comprehensive human capital infrastructure systems to maximize technical capability[span_0](end_span)[span_1](end_span).
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-green-500 text-slate-950 font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all text-center">
              Initiate Enterprise Audit
            </Link>
            <Link href="/services" className="w-full sm:w-auto text-gray-300 hover:text-white font-semibold py-4 px-8 rounded-xl border border-slate-800 hover:bg-slate-900/50 transition-all text-center">
              Explore Capability Directory
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Strategic Core Alignment */}
      <section className="py-20 w-full bg-slate-900/20 border-y border-slate-900/60 backdrop-blur-sm px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="p-8 rounded-2xl glass-card hover:border-cyan-500/20"
          >
            <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
              <i className="fas fa-eye text-cyan-400"></i>Our Vision
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              We innovate tailored solutions that enhance efficiency, compliance, and business success. [span_2](start_span)We enable businesses to focus on core objectives while managing workforce complexities, technology, legal compliance, and vendor relationships[span_2](end_span). [span_3](start_span)Through trust and integrity, we build lasting partnerships and achieve sustainable success in a dynamic global market[span_3](end_span).
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="p-8 rounded-2xl glass-card hover:border-green-500/20"
          >
            <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
              <i className="fas fa-bullseye text-green-400"></i>Our Mission
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              [span_4](start_span)To be the leading global provider of integrated solutions in HR, IT software, application development, law, compliance, and vendor management[span_4](end_span). [span_5](start_span)We envision empowering businesses worldwide through seamless integration, innovation, and client-focused excellence, driving sustainable growth and operational success[span_5](end_span).
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}