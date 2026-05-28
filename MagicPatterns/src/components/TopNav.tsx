import React from 'react';
import { motion } from 'framer-motion';
const navLinks = [
{
  label: 'Formula',
  href: '#formula'
},
{
  label: 'Tokenomics',
  href: '#tokenomics'
},
{
  label: 'Roadmap',
  href: '#roadmap'
},
{
  label: 'Trenches',
  href: '#testimonials'
}];

export function TopNav() {
  return (
    <motion.nav
      initial={{
        y: -20,
        x: '-50%',
        opacity: 0
      }}
      animate={{
        y: 0,
        x: '-50%',
        opacity: 1
      }}
      transition={{
        duration: 0.6,
        ease: 'easeOut'
      }}
      className="fixed top-4 left-1/2 w-[95%] max-w-5xl bg-[#f8f8f8]/85 backdrop-blur-md rounded-2xl border border-[#d0d0d0] shadow-[0_8px_30px_rgba(0,0,0,0.05)] z-50 flex items-center justify-between px-5 h-14">
      
      {/* Logo */}
      <a href="#" className="flex items-center gap-2 group">
        <div className="w-2 h-2 rounded-full bg-[#3b82f6] shadow-[0_0_8px_rgba(59,130,246,0.6)] animate-pulse" />
        <span className="font-orbitron font-bold text-[#1a1a1a] tracking-[0.18em] text-sm">
          HYDROFLOW
        </span>
      </a>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-1">
        {navLinks.map((link) =>
        <a
          key={link.label}
          href={link.href}
          className="px-3 py-1.5 text-sm font-medium text-[#555] hover:text-black hover:bg-white rounded-lg transition-all duration-200 font-sans">
          
            {link.label}
          </a>
        )}
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{
          scale: 1.03
        }}
        whileTap={{
          scale: 0.97
        }}
        className="px-4 py-2 bg-[#1a1a1a] text-white font-orbitron text-xs font-bold tracking-wider rounded-lg hover:bg-[#3b82f6] transition-colors duration-300">
        
        BUY $HYDRO
      </motion.button>
    </motion.nav>);

}