import React, { Fragment } from 'react';
import { Activity, Droplets, Twitter, Send, FileCode2 } from 'lucide-react';
const links = [
{
  label: 'Dexscreener',
  icon: Activity,
  hasDot: true
},
{
  label: 'Pump.fun',
  icon: Droplets
},
{
  label: 'Twitter',
  icon: Twitter
},
{
  label: 'Telegram',
  icon: Send
},
{
  label: 'Contract',
  icon: FileCode2
}];

export function BottomBar() {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl bg-[#f8f8f8]/90 backdrop-blur-md rounded-2xl border border-[#d0d0d0] shadow-[0_8px_30px_rgba(0,0,0,0.05)] overflow-hidden flex items-stretch h-16 z-50">
      {links.map((link, index) => {
        const Icon = link.icon;
        return (
          <Fragment key={link.label}>
            <button className="flex-1 flex items-center justify-center gap-2 px-2 hover:bg-white transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              {link.hasDot &&
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
              }
              <Icon className="w-4 h-4 text-[#666] group-hover:text-black transition-colors relative z-10" />
              <span className="text-sm font-medium text-[#555] group-hover:text-black transition-colors hidden sm:inline-block relative z-10">
                {link.label}
              </span>
            </button>
            {index < links.length - 1 &&
            <div className="w-px bg-gradient-to-b from-transparent via-[#d0d0d0] to-transparent" />
            }
          </Fragment>);

      })}
    </div>);

}