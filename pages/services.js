import { motion } from 'framer-motion';

export default function Services() {
  const categories = [
    {
      title: "Human Capital Infrastructure",
      items: [
        [span_6](start_span){ title: "Recruitment & Executive Search", desc: "Sourcing and deploying mission-critical operators across international lines[span_6](end_span). [span_7](start_span)High-retention contract-to-hire (C2H) paradigms[span_7](end_span)." },
        [span_8](start_span){ title: "Learning & Development (L&D)", desc: "Customized digital training matrices, upskilling workflows, and technology readiness bootcamps[span_8](end_span)." },
        [span_9](start_span){ title: "Corporate HR & Payroll Optimization", desc: "Comprehensive structural consulting, legal payroll integration, and employee ecosystem balance[span_9](end_span)." }
      ]
    },
    {
      title: "Strategic Tech & Architecture",
      items: [
        [span_10](start_span){ title: "IT Software & App Development", desc: "Constructing secure, fault-tolerant cloud networks and native enterprise platform architectures[span_10](end_span)." },
        [span_11](start_span){ title: "Legal & Regulatory Compliance", desc: "Deep operational risk auditing, contract frameworks, dispute resolution, and regulatory protection[span_11](end_span)." },
        [span_12](start_span){ title: "Global Business Consulting", desc: "Advanced data models, continuous process mapping, structural restructuring, and change integration[span_12](end_span)." }
      ]
    }
  ];

  return (
    <div className="page-layout-wrapper py-20 px-6 max-w-6xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20 w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Strategic Solutions & <span className="gradient-text">Architectures</span></h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
          [span_13](start_span)[span_14](start_span)Kairos Global Solutions delivers targeted interventions to balance operational vulnerabilities and build sustainable global workflows[span_13](end_span)[span_14](end_span).
        </p>
      </motion.div>

      {categories.map((cat, idx) => (
        <div key={idx} className="mb-16 w-full">
          <h2 className="text-xl font-bold text-gray-300 mb-6 tracking-wide uppercase border-l-2 border-cyan-400 pl-3">{cat.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cat.items.map((svc, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="p-6 rounded-xl glass-card border-slate-900 hover:border-slate-800"
              >
                <h3 className="text-lg font-bold text-cyan-400 mb-3">{svc.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}