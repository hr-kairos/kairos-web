import { motion } from 'framer-motion';

const partners = [
  { name: 'TCS', logo: '/tcs.png' },
  { name: 'Wipro', logo: '/wipro.png' },
  { name: 'Infosys', logo: '/infosys.png' },
  { name: 'Capgemini', logo: '/capgemini.png' },
  { name: 'IBM', logo: '/ibm.png' },
  { name: 'LTIMindtree', logo: '/ltimindtree.png' },
  { name: 'Hexaware', logo: '/hexaware.png' },
  { name: 'EY', logo: '/ey.png' },
  { name: 'KPMG', logo: '/kpmg.png' },
  { name: 'Airtel', logo: '/airtel.png' },
  { name: 'Royal Enfield', logo: '/royal-enfield.png' },
  { name: 'Motherson', logo: '/motherson.png' },
  { name: 'Hinduja Tech', logo: '/hinduja-tech.png' },
  { name: 'Saint-Gobain', logo: '/saint-gobain.png' },
  { name: 'RLE India', logo: '/rle-india.png' },
  { name: 'J Connect', logo: '/j-connect.png' },
  { name: 'Kapitus', logo: '/kapitus.png' },
];

export default function Clients() {
  return (
    <div
      className="w-full max-w-7xl mx-auto px-6"
      style={{ paddingTop: '110px', paddingBottom: '80px' }}
    >
      {/* Header */}
      <div className="text-center" style={{ marginBottom: '4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '1.25rem' }}
        >
          <span className="badge" style={{ display: 'inline-flex' }}>
            <i className="fas fa-handshake" style={{ fontSize: '0.65rem' }} />
            Trusted By
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            color: '#0F0F0F',
            letterSpacing: '-0.035em',
            marginBottom: '1rem',
            lineHeight: 1.1,
          }}
        >
          Ecosystem <span className="text-gradient">Alliances</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          style={{ color: '#6B7280', maxWidth: '460px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.65 }}
        >
          Integrated seamlessly with global industry leaders across sectors.
        </motion.p>
      </div>

      {/* Logo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {partners.map((partner, i) => (
          <motion.div
            key={partner.name}
            className="card flex flex-col items-center justify-center text-center"
            style={{ padding: '1.75rem 1.25rem', cursor: 'default' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.04, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.9rem',
                overflow: 'hidden',
              }}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  mixBlendMode: 'multiply',
                }}
                onError={(e) => (e.target.style.display = 'none')}
              />
            </div>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#6B7280',
                letterSpacing: '0.01em',
              }}
            >
              {partner.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
