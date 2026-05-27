import { motion } from 'framer-motion';

export default function Clients() {
  // Using your exact file names from the public folder
  const partners = [
    { name: "Wipro", logo: "/wipro.png" },
    { name: "J Connect", logo: "/j-connect.png" },
    { name: "Kapitus", logo: "/kapitus.png" },
    { name: "KPMG", logo: "/kpmg.png" },
    { name: "RLE India", logo: "/rle-india.png" },
    { name: "LTIMindtree", logo: "/ltimindtree.png" },
    { name: "Airtel", logo: "/airtel.png" },
    { name: "Royal Enfield", logo: "/royal-enfield.png" },
    { name: "Motherson", logo: "/motherson.png" },
    { name: "Hinduja Tech", logo: "/hinduja-tech.png" },
    { name: "Saint-Gobain", logo: "/saint-gobain.png" },
    { name: "IBM", logo: "/ibm.png" },
    { name: "EY", logo: "/ey.png" },
    { name: "Capgemini", logo: "/capgemini.png" },
    { name: "Infosys", logo: "/infosys.png" },
    { name: "Hexaware", logo: "/hexaware.png" }
  ];

  return (
    <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">Ecosystem <span className="text-gradient">Alliances</span></h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">Integrated seamlessly with global industry leaders and technical infrastructure networks.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {partners.map((partner, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: i * 0.05 }}
            key={partner.name} 
            className="glass-panel p-6 rounded-[2rem] flex flex-col items-center justify-center text-center group cursor-pointer"
          >
            {/* Logo Container */}
            <div className="w-24 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`}
                className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-sm"
                onError={(e) => {
                  // If a logo filename is slightly off, it hides the broken image icon
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <span className="text-sm font-bold text-slate-700 group-hover:text-cyan-600 transition-colors">
              {partner.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
