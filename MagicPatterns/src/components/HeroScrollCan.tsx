import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HydroflowCan } from './HydroflowCan';
export function HeroScrollCan() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });
  // Can transforms — flips and lands in the central frame
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-15, 0, 12]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 0.85, 1],
    [1, 1.1, 0.7, 0.62]
  );
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '8vh']);
  // Hero tagline fades out
  const taglineOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const subOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  // Dashed line
  const lineOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.6, 0.6, 0]);
  // Landing scene fades in
  const sceneOpacity = useTransform(scrollYProgress, [0.55, 0.9], [0, 1]);
  const frameOpacity = useTransform(scrollYProgress, [0.4, 0.85], [0, 1]);
  const leftSlide = useTransform(scrollYProgress, [0.6, 0.95], [-40, 0]);
  const rightSlide = useTransform(scrollYProgress, [0.6, 0.95], [40, 0]);
  const taglineClass =
  'font-orbitron font-black text-[#0a0a0a] tracking-tight leading-[0.95] text-[14vw] md:text-[12vw] block';
  return (
    <div ref={containerRef} className="relative w-full h-[250vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* TOKENIZING - behind can */}
        <motion.div
          style={{
            opacity: taglineOpacity
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none px-4">
          
          <h1 className="text-center">
            <span className={taglineClass}>TOKENIZING</span>
            <span className={`${taglineClass} invisible`}>HYDRATION.</span>
          </h1>
        </motion.div>

        {/* Dashed horizontal line - hero */}
        <motion.div
          style={{
            opacity: lineOpacity
          }}
          className="absolute top-[62%] left-0 w-full border-t border-dashed border-[#888] z-10" />
        

        {/* LANDING SCENE — product detail layout */}
        <div className="absolute inset-0 w-full h-full grid grid-cols-12 gap-6 px-8 md:px-16 py-24 z-10">
          {/* LEFT — Solana Splash details */}
          <motion.div
            style={{
              opacity: sceneOpacity,
              x: leftSlide
            }}
            className="col-span-12 md:col-span-3 flex flex-col justify-between">
            
            <div>
              <p className="font-sans text-sm text-[#666] mb-2 text-right md:text-right">
                Pre-Trade Energy
              </p>
              <h2 className="font-orbitron font-black text-[#0a0a0a] text-5xl md:text-6xl leading-[0.9] tracking-tight text-right">
                SOLANA
                <br />
                SPLASH
              </h2>
              <p className="font-sans text-sm text-[#666] mt-3 text-right">
                330ml with Zero Sugar
              </p>
            </div>

            <div className="text-center mt-8 md:mt-0">
              <h3 className="font-orbitron font-bold text-[#0a0a0a] text-lg tracking-[0.25em] mb-3">
                INGREDIENTS
              </h3>
              <p className="text-sm text-[#444] leading-relaxed max-w-xs mx-auto">
                Caffeine, Natural Flavor, Magnesium Citrate, Sodium Citrate,
                Stevia Extract
              </p>
            </div>
          </motion.div>

          {/* CENTER — Landing Frame for the can */}
          <motion.div
            style={{
              opacity: frameOpacity
            }}
            className="col-span-12 md:col-span-6 relative flex items-center justify-center">
            
            <div className="w-full h-full max-w-[440px] mx-auto rounded-[28px] border border-[#c8c8c8] bg-white/40 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.06)]" />
          </motion.div>

          {/* RIGHT — Intro + CTA */}
          <motion.div
            style={{
              opacity: sceneOpacity,
              x: rightSlide
            }}
            className="col-span-12 md:col-span-3 flex flex-col justify-between">
            
            <div>
              <h3 className="font-orbitron font-bold text-[#0a0a0a] text-lg tracking-[0.18em] mb-3">
                INTRODUCTION TO DRINK
              </h3>
              <p className="font-sans text-sm text-[#444] leading-relaxed">
                Solana Splash by HydroFlow is the world's first tokenized energy
                drink, blending cutting-edge blockchain innovation with peak
                performance. Designed for the modern trader, Solana Splash
                combines refreshing taste with tokenized transparency,
                redefining how you hydrate and energize.
              </p>
            </div>

            <div className="flex justify-end mt-8 md:mt-0">
              <motion.button
                whileHover={{
                  scale: 1.04
                }}
                whileTap={{
                  scale: 0.96
                }}
                className="px-6 py-3 bg-[#f97316] text-white font-sans font-medium rounded-lg shadow-md hover:bg-[#ea580c] transition-colors">
                
                Rotate Hydroflow
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* The Can — flips and lands centered (in the frame) */}
        <motion.div
          style={{
            y,
            scale,
            perspective: '1400px'
          }}
          className="relative z-20">
          
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              filter: 'drop-shadow(0 30px 30px rgba(0,0,0,0.18))'
            }}>
            
            <HydroflowCan animate={false} />
          </motion.div>
        </motion.div>

        {/* HYDRATION. - in front of can (hero only) */}
        <motion.div
          style={{
            opacity: taglineOpacity
          }}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-4">
          
          <h1 className="text-center">
            <span className={`${taglineClass} invisible`}>TOKENIZING</span>
            <span className={taglineClass}>HYDRATION.</span>
          </h1>
        </motion.div>

        {/* Hero subtitle */}
        <motion.p
          style={{
            opacity: subOpacity,
            x: '-50%'
          }}
          className="absolute top-[68%] left-1/2 font-vt323 text-sm md:text-base text-[#444] tracking-[0.45em] uppercase z-40 whitespace-nowrap">
          
          Pure. Refreshing. Blockchain-Powered.
        </motion.p>
      </div>
    </div>);

}