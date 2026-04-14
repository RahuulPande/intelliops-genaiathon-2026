'use client';

import { motion } from 'framer-motion';
import TrustBadges from './TrustBadges';

const layerNodes = [
  { label: 'L0', name: 'Plan', x: 100, y: 40 },
  { label: 'L1', name: 'Build', x: 220, y: 20 },
  { label: 'L2', name: 'Test', x: 340, y: 10 },
  { label: 'L3', name: 'Release', x: 460, y: 10 },
  { label: 'L4', name: 'Operate', x: 580, y: 20 },
  { label: 'L5', name: 'Learn', x: 700, y: 40 },
];

function SDLCNetwork() {
  return (
    <div className="hidden sm:flex justify-center mt-12 opacity-60">
      <svg
        viewBox="0 0 800 90"
        className="w-full max-w-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connection lines */}
        {layerNodes.map((node, i) => {
          if (i === layerNodes.length - 1) return null;
          const next = layerNodes[i + 1];
          return (
            <line
              key={`line-${i}`}
              x1={node.x}
              y1={node.y}
              x2={next.x}
              y2={next.y}
              stroke="#0AEFCF"
              strokeOpacity="0.15"
              strokeWidth="1.5"
            />
          );
        })}
        {/* Feedback loop arc from L5 back to L0 */}
        <path
          d={`M ${layerNodes[5].x} ${layerNodes[5].y} Q 400 100 ${layerNodes[0].x} ${layerNodes[0].y}`}
          stroke="#0AEFCF"
          strokeOpacity="0.08"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
        />
        {/* Nodes */}
        {layerNodes.map((node, i) => (
          <g key={node.label}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="6"
              fill="#0AEFCF"
              fillOpacity="0.3"
              animate={{ fillOpacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
            />
            <circle cx={node.x} cy={node.y} r="3" fill="#0AEFCF" />
            <text
              x={node.x}
              y={node.y + 22}
              textAnchor="middle"
              fill="#64748B"
              fontSize="10"
              fontFamily="monospace"
            >
              {node.label}
            </text>
            <text
              x={node.x}
              y={node.y + 34}
              textAnchor="middle"
              fill="#475569"
              fontSize="8"
              fontFamily="sans-serif"
            >
              {node.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0A0E1A] overflow-hidden">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16">
        {/* Eyebrow */}
        <motion.p
          className="font-[family-name:var(--font-mono-jb)] text-[#0AEFCF] text-xs tracking-[0.2em] uppercase mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0, ease: 'easeOut' }}
        >
          Enterprise SDLC Intelligence
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0, ease: 'easeOut' }}
        >
          The AI Brain for Your
          <br />
          <span className="text-[#0AEFCF]">Entire Software Lifecycle</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="font-[family-name:var(--font-body)] text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          IntelliOps transforms fragmented SDLC data into actionable intelligence
          — from requirements to production incidents. Built for engineering
          leaders at the world&apos;s most regulated institutions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <button
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#D4A843] text-[#0A0E1A] font-semibold px-8 py-3.5 rounded-lg text-base hover:bg-[#E5B954] transition-all hover:shadow-[0_0_30px_rgba(212,168,67,0.3)]"
          >
            Request a Demo
          </button>
          <button
            onClick={() => document.getElementById('layers')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-[#0AEFCF]/30 text-[#0AEFCF] font-medium px-8 py-3.5 rounded-lg text-base hover:bg-[#0AEFCF]/5 transition-all"
          >
            Explore Platform
          </button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          <p className="text-[#64748B] text-xs uppercase tracking-[0.15em] font-[family-name:var(--font-mono-jb)] mb-4">
            Designed for regulated industries
          </p>
          <TrustBadges />
        </motion.div>

        {/* SDLC Network Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          <SDLCNetwork />
        </motion.div>
      </div>
    </section>
  );
}
