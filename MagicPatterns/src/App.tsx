import React from 'react';
import { motion } from 'framer-motion';
import { GridBackground } from './components/GridBackground';
import { HydroflowCan } from './components/HydroflowCan';
import { BottomBar } from './components/BottomBar';
import { HeroScrollCan } from './components/HeroScrollCan';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TopNav } from './components/TopNav';
import { WelcomeSection } from './components/WelcomeSection';
import { ScanTradeSection } from './components/ScanTradeSection';
const Section = ({
  children,
  className = ''



}: {children: React.ReactNode;className?: string;}) =>
<section
  className={`relative w-full min-h-screen flex flex-col items-center justify-center py-24 ${className}`}>
  
    {children}
  </section>;

const SectionDivider = () =>
<div className="w-full max-w-5xl border-t border-dashed border-[#a0a0a0] opacity-30 my-12" />;

export function App() {
  return (
    <GridBackground>
      <TopNav />

      {/* HERO SECTION */}
      <HeroScrollCan />

      {/* WELCOME SECTION */}
      <WelcomeSection />

      {/* SCAN IT, TRADE IT SECTION */}
      <ScanTradeSection />

      {/* FORMULA SECTION */}
      <Section>
        <div className="w-full max-w-5xl px-6 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{
              opacity: 0,
              x: -50
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true,
              margin: '-20%'
            }}
            className="md:w-1/3">
            
            <h2 className="font-vt323 text-6xl text-[#a0a0a0] tracking-widest mb-4">
              FORMULA
            </h2>
            <p className="text-[#666] font-sans max-w-xs">
              Engineered for the trenches. Zero sugar, maximum focus. The
              perfect blend to keep you sharp during high-volatility trading
              sessions.
            </p>
          </motion.div>

          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {[
            {
              name: 'Caffeine',
              amount: '200mg',
              desc: 'Clean energy'
            },
            {
              name: 'L-Theanine',
              amount: '100mg',
              desc: 'Jitter control'
            },
            {
              name: 'Electrolytes',
              amount: '500mg',
              desc: 'Hydration'
            },
            {
              name: 'Sugar',
              amount: '0g',
              desc: 'No crash'
            }].
            map((item, i) =>
            <motion.div
              key={item.name}
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
                delay: i * 0.1
              }}
              className="bg-white/50 backdrop-blur-sm border border-[#d0d0d0] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              
                <div className="flex justify-between items-end mb-2">
                  <h3 className="font-orbitron font-bold text-[#333]">
                    {item.name}
                  </h3>
                  <span className="font-vt323 text-xl text-[#3b82f6]">
                    {item.amount}
                  </span>
                </div>
                <p className="text-sm text-[#888]">{item.desc}</p>
              </motion.div>
            )}
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* TOKENOMICS SECTION */}
      <Section>
        <div className="w-full max-w-5xl px-6 relative">
          <motion.h2
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            whileInView={{
              opacity: 0.1,
              scale: 1
            }}
            viewport={{
              once: true
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-vt323 text-[15vw] text-[#888] whitespace-nowrap pointer-events-none z-0">
            
            TOKENOMICS
          </motion.h2>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
            {
              label: 'Total Supply',
              value: '1,000,000,000',
              highlight: false
            },
            {
              label: 'Buy/Sell Tax',
              value: '0%',
              highlight: true
            },
            {
              label: 'Liquidity',
              value: 'Burned',
              highlight: false
            }].
            map((stat, i) =>
            <motion.div
              key={stat.label}
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
                margin: '-20%'
              }}
              transition={{
                delay: i * 0.15
              }}
              className="flex flex-col items-center p-8">
              
                <span
                className={`font-orbitron text-4xl md:text-5xl font-bold mb-4 ${stat.highlight ? 'text-[#d97706]' : 'text-[#222]'}`}>
                
                  {stat.value}
                </span>
                <span className="font-vt323 text-xl text-[#666] tracking-widest uppercase">
                  {stat.label}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </Section>

      <SectionDivider />

      {/* ROADMAP SECTION */}
      <Section>
        <div className="w-full max-w-5xl px-6">
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
            className="text-center mb-16">
            
            <h2 className="font-vt323 text-5xl text-[#444] tracking-widest">
              ROADMAP
            </h2>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-6">
            {[
            {
              phase: 'Phase 1',
              title: 'Brew',
              desc: 'Formula finalization, brand identity, and initial community building.'
            },
            {
              phase: 'Phase 2',
              title: 'Pour',
              desc: 'Token launch, DEX listings, and first batch production run.'
            },
            {
              phase: 'Phase 3',
              title: 'Pump',
              desc: 'Global distribution, CEX listings, and IRL event sponsorships.'
            }].
            map((step, i) =>
            <motion.div
              key={step.phase}
              initial={{
                opacity: 0,
                y: 50
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
                delay: i * 0.2
              }}
              className="flex-1 relative">
              
                <div className="h-1 w-full bg-gradient-to-r from-[#d0d0d0] to-transparent mb-6 rounded-full" />
                <span className="inline-block px-3 py-1 bg-[#e0e0e0] text-[#555] font-vt323 text-sm tracking-wider rounded mb-4">
                  {step.phase}
                </span>
                <h3 className="font-orbitron text-xl font-bold text-[#222] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#666] text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS SECTION */}
      <TestimonialsSection />

      <SectionDivider />

      {/* CTA SECTION */}
      <Section className="pb-40">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          whileInView={{
            opacity: 1,
            scale: 1
          }}
          viewport={{
            once: true,
            margin: '-20%'
          }}
          className="flex flex-col items-center text-center">
          
          <h2 className="font-vt323 text-6xl md:text-8xl text-[#222] tracking-widest mb-8">
            STAY HYDRATED.
          </h2>

          {/* Small static can for CTA */}
          <div className="scale-50 origin-center -my-24 pointer-events-none">
            <HydroflowCan />
          </div>

          <motion.button
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            className="mt-8 px-8 py-4 bg-[#1f2937] text-white font-orbitron font-bold tracking-wider rounded-xl shadow-lg hover:bg-[#3b82f6] transition-colors duration-300">
            
            BUY ON DEXSCREENER
          </motion.button>
        </motion.div>
      </Section>

      <BottomBar />
    </GridBackground>);

}