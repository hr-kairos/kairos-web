import { motion } from 'framer-motion';
import { Briefcase, Building2, Cpu, Globe, Database, MonitorSmartphone, Code, Shield } from 'lucide-react';

export default function Clients() {
  const partners = [
    { name: "Wipro", icon: Code, color: "text-blue-500" },
    { name: "J Connect", icon: Globe, color: "text-cyan-500" },
    { name: "Kapitus", icon: Building2, color: "text-emerald-500" },
    { name: "KPMG", icon: Briefcase, color: "text-indigo-500" },
    { name: "RLE India", icon: Cpu, color: "text-orange-500" },
    { name: "LTIMindtree", icon: Database, color: "text-purple-500" },
    { name: "Airtel", icon: MonitorSmartphone, color: "text-red-500" },
    { name: "Royal Enfield", icon: Shield, color: "text-slate-700" },
    { name: "Motherson", icon: Building2, color: "text-teal-600" },
    { name: "Hinduja Tech", icon: Cpu, color: "text-blue-600" },
    { name: "Saint-Gobain", icon: Globe, color: "text-sky-500" },
    { name: "IBM", icon: Code, color: "text-blue-800" },
    { name: "EY", icon: Briefcase, color: "text-yellow-500" },
    { name: "Capgemini", icon: Database, color: "text-cyan-700" },
    { name: "Infosys", icon: MonitorSmartphone, color: "text-indigo-600" },
    { name: "Hexaware", icon: Shield, color: "text-emerald-600" }
  ];

  return (
    <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Ecosystem <span className="text-gradient">Alliances</span></h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">Integrated seamlessly with global industry leaders and technical infrastructure networks.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {partners.map((partner, i) => {
          const IconComponent = partner.icon;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.05 }}
              key={partner.name} 
              className="glass-panel p-6 rounded-[2rem] flex flex-col items-center justify-center text-center group cursor-pointer"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <IconComponent className={`${partner.color} w-8 h-8`} />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-cyan-600 transition-colors">
                {partner.name}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}
