import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabSchedules = {
  "All Enterprise Partners": [
    "Wipro", "J Connect", "Kapitus", "KPMG", "RLE India", "LTIMindtree", "Airtel", 
    "Royal Enfield", "Motherson", "Hinduja Tech", "Saint-Gobain", "IBM", "EY", 
    "Capgemini", "Infosys", "Hexaware Technologies"
  ],
  "Technology & Cloud": ["Wipro", "IBM", "Infosys", "Capgemini", "LTIMindtree", "Hexaware Technologies"],
  "Financial Consulting": ["KPMG", "EY", "Kapitus", "J Connect"],
  "Automotive & Heavy Industry": ["Royal Enfield", "Motherson", "Hinduja Tech", "Saint-Gobain", "RLE India", "Airtel"]
};

export default function Clients() {
  const [activeTab, setActiveTab] = useState("All Enterprise Partners");

  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4 md:px-6 box-border">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Ecosystem <span className="gradient-text">Alliances</span></h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">Operational validation catalogs across partner corporate nodes.</p>
      </div>

      {/* Tab select dashboard bar */}
      <div className="flex flex-wrap gap-2 justify-center mb-10 border-b border-slate-900/80 pb-6">
        {Object.keys(tabSchedules).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
              activeTab === tab ? 'bg-slate-900 border border-cyan-500/30 text-cyan-400' : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid container layout panel */}
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
        <AnimatePresence mode="popLayout">
          {tabSchedules[activeTab].map((client) => (
            <motion.div
              layout
              key={client}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-900/30 border border-slate-900/80 p-6 rounded-xl flex flex-col items-center justify-center h-28 hover:border-cyan-500/20 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border border-slate-800 flex items-center justify-center font-black text-xs text-cyan-400 tracking-wider mb-2">
                {client.substring(0, 2).toUpperCase()}
              </div>
              <span className="text-xs md:text-sm font-bold text-slate-300">{client}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}