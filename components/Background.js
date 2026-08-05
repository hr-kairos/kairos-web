import React from 'react';

/**
 * Premium background component featuring modern mesh gradients
 * and flowing organic waves generated with Haikei-inspired vector logic.
 */
export default function Background() {
  return (
    <div className="fixed inset-0 -z-50 w-full h-full overflow-hidden bg-slate-50 pointer-events-none">
      {/* Dynamic colorful blobs (Mesh Gradient effect) */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-40 animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(8,145,178,0.4) 0%, rgba(16,185,129,0.1) 70%)',
          animationDuration: '8s'
        }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[140px] opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(8,145,178,0.1) 80%)',
        }}
      />
      <div 
        className="absolute top-[30%] right-[10%] w-[35vw] h-[35vw] rounded-full blur-[100px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(8,145,178,0.05) 75%)',
        }}
      />

      {/* Floating vector wave at the bottom */}
      <svg 
        className="absolute bottom-0 left-0 w-full opacity-60 pointer-events-none" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320"
      >
        <path 
          fill="url(#wave-gradient)" 
          fillOpacity="0.25" 
          d="M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,149.3C672,139,768,149,864,170.7C960,192,1056,224,1152,229.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <path 
          fill="url(#wave-gradient)" 
          fillOpacity="0.15" 
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,197.3C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
