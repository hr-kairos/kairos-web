export default function Background() {
  return (
    <div
      className="fixed inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Warm off-white base */}
      <div className="absolute inset-0" style={{ background: '#F9F7F4' }} />

      {/* Aurora blob 1 — teal, top-left */}
      <div
        className="absolute rounded-full"
        style={{
          top: '-20%',
          left: '-15%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(8,145,178,0.13) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Aurora blob 2 — emerald, bottom-right */}
      <div
        className="absolute rounded-full"
        style={{
          bottom: '-25%',
          right: '-20%',
          width: '65vw',
          height: '65vw',
          background: 'radial-gradient(circle, rgba(16,185,129,0.09) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Aurora blob 3 — indigo, centre-right */}
      <div
        className="absolute rounded-full"
        style={{
          top: '25%',
          right: '5%',
          width: '38vw',
          height: '38vw',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />
    </div>
  );
}
