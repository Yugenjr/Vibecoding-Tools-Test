import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
const testimonials = [
{
  quote:
  'Closed three green candles in a row after switching to HYDROFLOW. Coincidence? I think not.',
  name: 'Anatoly_apes',
  handle: '@anatoly_apes',
  role: 'Solana Maxi'
},
{
  quote:
  'Tastes like the bull market. Zero sugar, zero rugs, infinite focus.',
  name: 'Crypto Chad',
  handle: '@cryptochad420',
  role: 'Trenches Veteran'
},
{
  quote:
  'I was a coffee guy until I tried Solana Splash. Now my charts read me.',
  name: 'Liquidity Lina',
  handle: '@lina_lp',
  role: 'Memecoin Sniper'
},
{
  quote:
  'Pre-trade energy is no joke. My screen time went up 400%, my Ws followed.',
  name: 'Degen Dev',
  handle: '@degendev',
  role: 'Onchain Builder'
}];

export function TestimonialsSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-24">
      <div className="w-full max-w-6xl px-6 relative">
        {/* Backdrop label */}
        <motion.h2
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          whileInView={{
            opacity: 0.08,
            scale: 1
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.8
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 font-vt323 text-[14vw] text-[#888] whitespace-nowrap pointer-events-none z-0 leading-none">
          
          TRENCHES
        </motion.h2>

        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          className="relative z-10 text-center mb-16 pt-16">
          
          <p className="font-vt323 text-sm text-[#888] tracking-[0.4em] uppercase mb-3">
            // Field Reports
          </p>
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-[#222] tracking-wider">
            STRAIGHT FROM THE TRENCHES
          </h2>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) =>
          <motion.div
            key={t.handle}
            initial={{
              opacity: 0,
              y: 40
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
              delay: i * 0.12,
              duration: 0.6
            }}
            whileHover={{
              y: -4
            }}
            className="relative bg-white/60 backdrop-blur-md border border-[#d0d0d0] rounded-2xl p-7 shadow-sm hover:shadow-lg transition-shadow">
            
              <Quote className="absolute top-5 right-5 w-6 h-6 text-[#3b82f6] opacity-30" />

              <p className="text-[#333] text-base leading-relaxed mb-6 font-sans">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-dashed border-[#d0d0d0]">
                {/* Avatar (geometric placeholder) */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9ca3af] to-[#4b5563] flex items-center justify-center text-white font-orbitron font-bold text-sm shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-orbitron font-bold text-sm text-[#222] truncate">
                      {t.name}
                    </span>
                    <span className="text-xs text-[#888] truncate">
                      {t.handle}
                    </span>
                  </div>
                  <span className="font-vt323 text-xs text-[#d97706] tracking-wider uppercase">
                    {t.role}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}