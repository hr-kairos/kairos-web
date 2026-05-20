import { motion } from 'framer-motion';

const clients = [
  "Wipro", "J Connect", "Kapitus", "KPMG", 
  "RLE India", "LTIMindtree", "Airtel", "Royal Enfield", 
  "Motherson", "Hinduja Tech", "Saint-Gobain", "IBM", 
  "EY", "Capgemini", "Infosys", "Hexaware Technologies"
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
};

export default function Clients() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">Our <span className="gradient-text">Elite Partners</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Powering the growth and infrastructure of the world's leading brands and enterprises.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {clients.map((client, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 p-6 rounded-2xl shadow-xl flex items-center justify-center text-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h3 className="text-lg font-bold text-gray-200 group-hover:text-white relative z-10 transition-colors">
                {client}
              </h3>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}