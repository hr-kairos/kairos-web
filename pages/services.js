export default function Services() {
  const currentServices = [
    { title: "Recruitment Logistics", desc: "Sourcing mission-critical operators, contract staffing setups, and permanent executive deployments.", icon: "fa-user-tie" },
    { title: "Learning & Development", desc: "Corporate training pipelines, tailored upskilling workflows, and technology readiness bootcamps.", icon: "fa-graduation-cap" },
    { title: "Human Resources Systems", desc: "Policy formulation strategy, risk integration metrics, and corporate payroll support.", icon: "fa-network-wired" },
    { title: "Legal Advisory Frameworks", desc: "Corporate risk evaluation strategy, contract validation mapping, and business governance support.", icon: "fa-balance-scale" },
    { title: "Event Management", desc: "Comprehensive structural planning, layout validation, coordination metrics, and corporate summits.", icon: "fa-calendar-check" },
    { title: "Business Consulting", desc: "Continuous market alignment profiling, optimization planning, and restructuring architectures.", icon: "fa-chart-line" }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-32 box-border">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">Service <span className="text-gradient">Architectures</span></h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">Targeted operational configurations to balance enterprise workflows.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentServices.map((svc, i) => (
          <div key={i} className="glass-panel p-8 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100">
              <i className={`fas ${svc.icon} text-cyan-600 text-xl`}></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">{svc.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">{svc.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
