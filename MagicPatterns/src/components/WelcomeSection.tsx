import React from 'react';
import { motion } from 'framer-motion';
export function WelcomeSection() {
  return (
    <section className="relative w-full bg-[#0a0a0a] py-32 md:py-48 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Small label */}
        <motion.p
          initial={{
            opacity: 0,
            y: 10
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            margin: '-15%'
          }}
          transition={{
            duration: 0.5
          }}
          className="font-sans text-sm text-white/70 mb-8 tracking-wide">
          
          About Hydroflow Tokenomics
        </motion.p>

        {/* Massive headline */}
        <motion.h2
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
            ease: 'easeOut'
          }}
          className="font-orbitron font-black text-white tracking-tight leading-[1.05] text-[7vw] md:text-[6vw] mb-12 max-w-6xl">
          
          WELCOME TO HYDROFLOW WHERE WATER MEETS INNOVATION
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{
            opacity: 0,
            y: 20
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
          className="font-sans text-white/80 text-base md:text-lg leading-relaxed max-w-4xl">
          
          Here, we redefine hydration for the modern world. HydroFlow combines
          the purity of nature with the cutting-edge power of blockchain,
          creating a refreshing experience that's as innovative as it is
          sustainable. Each sip represents a step forward—clean, invigorating,
          and tokenized for a brighter future. This is more than water; this is
          HydroFlow. Refresh your life. Redefine the future.
        </motion.p>
      </div>
    </section>);

}