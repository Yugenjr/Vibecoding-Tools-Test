import React from 'react';
import { motion } from 'framer-motion';
export function HydroflowCan({ animate = true }: {animate?: boolean;}) {
  const content =
  <div className="relative w-full h-full">
      {/* Can Body */}
      <div className="relative w-full h-full rounded-[40px] bg-gradient-to-r from-[#a8acb1] via-[#f5f5f7] via-50% to-[#a8acb1] shadow-[0_30px_60px_rgba(0,0,0,0.18)] overflow-hidden">
        {/* Top Rim Taper - dark shadow under lid */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#6b7280]/40 via-[#9ca3af]/20 to-transparent" />

        {/* Bottom Rim Taper */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#6b7280]/30 to-transparent" />

        {/* Blue Wave Graphic - more subtle */}
        <svg
        className="absolute top-[18%] left-0 w-full h-[55%] opacity-90 mix-blend-multiply"
        viewBox="0 0 100 100"
        preserveAspectRatio="none">
        
          <path
          d="M0,55 C25,75 50,30 75,55 C85,65 95,50 100,60 L100,100 L0,100 Z"
          fill="url(#blue-gradient)" />
        
          <defs>
            <linearGradient
            id="blue-gradient"
            x1="20%"
            y1="20%"
            x2="80%"
            y2="80%">
            
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.5" />
              <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#dbeafe" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Can Content */}
        <div className="absolute inset-0 flex flex-col items-center p-8 text-center">
          {/* HYDROFLOW logo */}
          <h2 className="font-orbitron text-[1.4rem] font-bold text-[#1a1a1a] tracking-[0.18em] mt-[45%] z-10">
            HYDROFLOW
          </h2>

          {/* Solana Splash + PRE-TRADE ENERGY */}
          <div className="absolute bottom-12 right-6 flex flex-col items-end z-10">
            <p className="text-[#e8a87c] font-medium text-[15px] tracking-wide italic">
              Solana Splash
            </p>
            <p className="text-[#b8b8b8] text-[8px] tracking-[0.25em] uppercase mt-0.5">
              Pre-Trade Energy
            </p>

            {/* QR Code Placeholder */}
            <div className="mt-2 w-8 h-8 grid grid-cols-6 grid-rows-6 gap-[1px] opacity-60">
              {Array.from({
              length: 36
            }).map((_, i) =>
            <div
              key={i}
              className={`bg-[#6b7280] ${(i * 7 + 3) % 3 !== 0 ? 'opacity-100' : 'opacity-0'}`} />

            )}
            </div>
          </div>
        </div>

        {/* Can Highlights/Shadows for 3D effect */}
        <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/25 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/30 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-12 w-6 bg-gradient-to-r from-white/50 to-transparent blur-sm pointer-events-none" />
        <div className="absolute inset-y-0 left-1/3 w-20 bg-gradient-to-r from-transparent via-white/35 to-transparent blur-md pointer-events-none" />
      </div>

      {/* Top Rim - the lid */}
      <div className="absolute -top-1 left-[6%] right-[6%] h-3 bg-gradient-to-r from-[#7a7e85] via-[#d4d6da] to-[#7a7e85] rounded-t-[10px] shadow-sm z-10" />
      <div className="absolute -top-2 left-[8%] right-[8%] h-2 bg-gradient-to-r from-[#a8acb1] via-[#e5e7eb] to-[#a8acb1] rounded-t-full z-20" />

      {/* Bottom Rim */}
      <div className="absolute -bottom-1 left-[7%] right-[7%] h-3 bg-gradient-to-r from-[#6b7280] via-[#d1d5db] to-[#6b7280] rounded-b-[14px] shadow-md z-10" />
    </div>;

  if (animate) {
    return (
      <motion.div
        animate={{
          y: [-12, 12, -12]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="relative w-[260px] h-[460px]">
        
        {content}
      </motion.div>);

  }
  return <div className="relative w-[260px] h-[460px]">{content}</div>;
}