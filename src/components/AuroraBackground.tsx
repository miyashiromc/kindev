import { motion } from 'motion/react';

export default function AuroraBackground() {
  return (
    <div className="fixed inset-0 z-[-10] w-full h-full overflow-hidden pointer-events-none bg-[#030712]">
      {/* Cyan Glow - Replaced blur with radial-gradient for immense GPU performance gain */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full animate-aurora-1"
        style={{ background: 'radial-gradient(circle at center, rgba(6,182,212,0.15) 0%, transparent 60%)' }}
      />

      {/* Emerald Glow */}
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full animate-aurora-2"
        style={{ background: 'radial-gradient(circle at center, rgba(16,185,129,0.1) 0%, transparent 60%)' }}
      />

      {/* Purple Glow */}
      <div
        className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full animate-aurora-3"
        style={{ background: 'radial-gradient(circle at center, rgba(139,92,246,0.15) 0%, transparent 60%)' }}
      />

      {/* Noise overlay to prevent banding */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
    </div>
  );
}
