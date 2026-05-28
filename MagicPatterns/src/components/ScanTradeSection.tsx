import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
export function ScanTradeSection() {
  return (
    <section className="relative w-full py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 md:gap-5">
        {/* LEFT — Big cans image */}
        <motion.div
          initial={{
            opacity: 0,
            x: -30
          }}
          whileInView={{
            opacity: 1,
            x: 0
          }}
          viewport={{
            once: true,
            margin: '-10%'
          }}
          transition={{
            duration: 0.7
          }}
          className="col-span-12 md:col-span-7 row-span-2 rounded-3xl overflow-hidden bg-[#1a1a1a] aspect-[4/5] md:aspect-auto md:min-h-[560px] relative">
          
          <img
            src="https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=1200&q=80"
            alt="HYDROFLOW cans arranged diagonally"
            className="absolute inset-0 w-full h-full object-cover" />
          
          {/* Subtle dark overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />
        </motion.div>

        {/* TOP RIGHT — HYDROFLOW peach card */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            margin: '-10%'
          }}
          transition={{
            duration: 0.6,
            delay: 0.1
          }}
          className="col-span-9 md:col-span-4 rounded-3xl border border-[#d8d8d8] p-6 md:p-7 relative overflow-hidden min-h-[200px] md:min-h-[260px]"
          style={{
            background:
            'linear-gradient(135deg, #f5d4b8 0%, #e8a87c 60%, #d89870 100%)'
          }}>
          
          <h3 className="font-orbitron font-bold text-[#1a1a1a] tracking-[0.15em] text-base md:text-lg z-10 relative">
            HYDROFLOW
          </h3>
          {/* QR Code */}
          <div className="absolute bottom-6 right-6 w-14 h-14 grid grid-cols-8 grid-rows-8 gap-[1px]">
            {Array.from({
              length: 64
            }).map((_, i) =>
            <div
              key={i}
              className={`bg-[#3a2a1c] ${(i * 13 + 7) % 3 !== 0 ? 'opacity-100' : 'opacity-0'}`} />

            )}
          </div>
        </motion.div>

        {/* FAR RIGHT — Arrow button card */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            margin: '-10%'
          }}
          transition={{
            duration: 0.6,
            delay: 0.2
          }}
          className="col-span-3 md:col-span-1 rounded-3xl border border-[#d8d8d8] bg-[#f0f0f0] flex items-center justify-center min-h-[200px] md:min-h-[260px]">
          
          <motion.button
            whileHover={{
              scale: 1.08,
              rotate: -10
            }}
            whileTap={{
              scale: 0.95
            }}
            className="w-14 h-14 rounded-full bg-[#f97316] flex items-center justify-center shadow-md hover:bg-[#ea580c] transition-colors"
            aria-label="Continue">
            
            <ArrowRight className="w-6 h-6 text-white" strokeWidth={2.5} />
          </motion.button>
        </motion.div>

        {/* BOTTOM RIGHT — SCAN IT, TRADE IT */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            margin: '-10%'
          }}
          transition={{
            duration: 0.7,
            delay: 0.15
          }}
          className="col-span-12 md:col-span-5 rounded-3xl border border-[#d8d8d8] bg-[#f0f0f0] p-8 md:p-12 flex items-end min-h-[260px]">
          
          <h2 className="font-orbitron font-black tracking-tight leading-[0.95] text-[10vw] md:text-[5.5vw]">
            <span className="block text-[#0a0a0a]">SCAN IT,</span>
            <span className="block text-[#f97316]">TRADE IT</span>
          </h2>
        </motion.div>
      </div>
    </section>);

}