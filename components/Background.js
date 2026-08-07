import { motion } from 'framer-motion';

export default function Background() {
  return (
    <div
      className="fixed inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Base background that adapts in Dark Mode */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          backgroundColor: 'var(--bg-base, #F9F7F4)',
        }}
      />
      <style jsx global>{`
        :root {
          --bg-base: #F9F7F4;
        }
        html.dark {
          --bg-base: #0B0F17;
        }
      `}</style>

      {/* Floating Glass Orb 1 — Cyan, Top-Left */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: '55vw',
          height: '55vw',
          background: 'radial-gradient(circle, rgba(8,145,178,0.22) 0%, rgba(8,145,178,0.05) 50%, transparent 75%)',
          filter: 'blur(90px)',
          borderRadius: '50%',
        }}
      />

      {/* Floating Glass Orb 2 — Emerald, Bottom-Right */}
      <motion.div
        animate={{
          x: [0, -35, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-12%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0.04) 50%, transparent 75%)',
          filter: 'blur(100px)',
          borderRadius: '50%',
        }}
      />

      {/* Floating Glass Orb 3 — Center Soft Cyan Glow */}
      <motion.div
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '30%',
          left: '35%',
          width: '35vw',
          height: '35vw',
          background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
        }}
      />
    </div>
  );
}
