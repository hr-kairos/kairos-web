import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Organized client data map with realistic web domain mappings for logos
const clientCategorization = {
  "All Enterprise Partners": [
    { name: "Wipro", domain: "wipro.com" }, { name: "IBM", domain: "ibm.com" },
    { name: "KPMG", domain: "kpmg.com" }, { name: "EY", domain: "ey.com" },
    { name: "Infosys", domain: "infosys.com" }, { name: "Capgemini", domain: "capgemini.com" },
    { name: "Airtel", domain: "airtel.in" }, { name: "Royal Enfield", domain: "royalenfield.com" },
    { name: "LTIMindtree", domain: "ltimindtree.com" }, { name: "Hexaware Technologies", domain: "hexaware.com" },
    { name: "Motherson", domain: "motherson.com" }, { name: "Hinduja Tech", domain: "hindujatech.com" },
    { name: "Saint-Gobain", domain: "saint-gobain.com" }, { name: "Kapitus", domain: "kapitus.com" },
    { name: "J Connect", domain: "jconnect.co.in" }, { name: "RLE India", domain: "rle.co.in" }
  ],
  "Tech & System Cloud": [
    { name: "Wipro", domain: "wipro.com" }, { name: "IBM", domain: "ibm.com" },
    { name: "Infosys", domain: "infosys.com" }, { name: "Capgemini", domain: "capgemini.com" },
    { name: "LTIMindtree", domain: "ltimindtree.com" }, { name: "Hexaware Technologies", domain: "hexaware.com" }
  ],
  "Consulting & FinTech": [
    { name: "KPMG", domain: "kpmg.com" }, { name: "EY", domain: "ey.com" },
    { name: "Kapitus", domain: "kapitus.com" }, { name: "J Connect", domain: "jconnect.co.in" }
  ],
  "Industrial & Automotive": [
    { name: "Royal Enfield", domain: "royalenfield.com" }, { name: "Motherson", domain: "motherson.com" },
    { name: "Hinduja Tech", domain: "hindujatech.com" }, { name: "Saint-Gobain", domain: "saint-gobain.com" },
    { name: "RLE India", domain: "rle.co.in" }, { name: "Airtel", domain: "airtel.in" }
  ]
};

export default function Clients() {
  const [activeTab, setActiveTab] = useState("All Enterprise Partners");

  return (
    <div className="page-layout-wrapper py-20 px-6 w-full">
      <div className="max-w-6xl mx-auto w-full">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Strategic <span className="gradient-text">Ecosystem Partners</span></h1>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            Supporting capability execution across multinational enterprise landscapes.
          </p>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex flex-wrap gap-2 justify-center mb-12 border-b border-slate-800/80 pb-6">
          {Object.keys(clientCategorization).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-green-500/20 border border-cyan-500/40 text-cyan-400 shadow-md' 
                  : 'border border-transparent text-gray-400 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Tab Panel Container */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 w-full min-h-[300px]"
        >
          <AnimatePresence mode="popLayout">
            {clientCategorization[activeTab].map((client) => (
              <motion.div 
                layout
                key={client.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="bg-slate-900/40 backdrop-blur-sm border border-slate-900/80 p-6 rounded-xl flex flex-col items-center justify-center text-center group relative overflow-hidden h-32"
              >
                {/* Clearbit API dynamically renders standard logos directly via web addresses */}
                <img 
                  src={`https://logo.clearbit.com/${client.domain}`} 
                  alt={client.name}
                  className="h-10 mb-3 object-contain grayscale group-hover:grayscale-0 transition-all duration-300 pointer-events-none"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <h3 className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
                  {client.name}
                </h3>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}