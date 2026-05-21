export default function Services() {
  const currentServices = [
    { title: "Recruitment & Staffing Logistics", desc: "Sourcing mission-critical operators, contract staffing setups, and permanent executive deployments." },
    { title: "Learning & Development (L&D)", desc: "Corporate training pipelines, tailored upskilling workflows, and technology readiness bootcamps." },
    { title: "Human Resources Systems", desc: "Policy formulation strategy, risk integration metrics, compliance frameworks, and corporate payroll support." },
    { title: "Legal Advisory Frameworks", desc: "Corporate risk evaluation strategy, contract validation mapping, and business governance support." },
    { title: "Event Logistical Management", desc: "Comprehensive structural planning, layout validation, coordination metrics, and technical corporate summits." },
    { title: "Strategic Business Consulting", desc: "Continuous market alignment profiling, optimization planning, restructuring architectures, and change deployment." }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-16 box-border">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Service <span className="gradient-text">Architectures</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">Targeted operational configurations to balance enterprise workflows.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentServices.map((svc, i) => (
          <div key={i} className="bg-slate-900/30 p-6 rounded-xl border border-slate-900/80 hover:border-cyan-500/20 transition-all duration-300">
            <h3 className="text-lg font-bold text-cyan-400 mb-2">{svc.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{svc.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}