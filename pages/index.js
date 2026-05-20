import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div>
      <section className="py-32 px-6 text-center relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
            Transforming Potential into <span className="gradient-text">Performance</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Leading provider of integrated HR, IT, and Consulting solutions supporting a growing global workforce.
          </p>
          <Link href="/contact" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-4 px-10 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.8)]">
            Partner With Us
          </Link>
        </motion.div>
      </section>

      <section className="py-20 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700"
          >
            <h2 className="text-3xl font-bold mb-4 text-white"><i className="fas fa-eye text-cyan-400 mr-3"></i>Our Vision</h2>
            <p className="text-gray-400">Innovating tailored solutions that enhance efficiency, compliance, and business success. We build lasting partnerships through trust and integrity.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700"
          >
            <h2 className="text-3xl font-bold mb-4 text-white"><i className="fas fa-bullseye text-green-400 mr-3"></i>Our Mission</h2>
            <p className="text-gray-400">Empowering businesses worldwide through seamless integration, innovation, and client-focused excellence.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}