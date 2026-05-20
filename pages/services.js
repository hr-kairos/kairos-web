import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    { title: "Recruitment & Talent", desc: "Executive search, permanent and temporary staffing." },
    { title: "Learning & Development", desc: "Upskilling, workshops, and e-learning solutions." },
    { title: "HR Services", desc: "Payroll processing, policy formulation, and compliance." },
    { title: "IT & Mobility", desc: "Software development, IT consulting, and infrastructure." },
    { title: "Facility Management", desc: "Security, maintenance, and workplace efficiency." },
    { title: "Legal Advisory", desc: "Contract review, compliance, and risk management." }
  ];

  return (
    <div className="py-20 px-6 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="text-5xl font-bold text-white mb-6">Solutions <span className="gradient-text">Provided</span></h1>
        <p className="text-xl text-gray-400">Comprehensive services for a dynamic business environment.</p>
      </motion.div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((svc, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900/60 p-8 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-colors"
          >
            <h3 className="text-xl font-bold text-cyan-400 mb-3">{svc.title}</h3>
            <p className="text-gray-400">{svc.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}