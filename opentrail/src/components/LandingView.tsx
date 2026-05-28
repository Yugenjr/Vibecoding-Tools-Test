import { GitBranch, AlertCircle, Sparkles, Activity, BookOpen, ExternalLink } from "lucide-react";
import { ECOSYSTEMS, PRECONFIGURED_REPOSITORIES } from "../data/mockData";
import { Issue } from "../types";

interface LandingViewProps {
  onSignIn: () => void;
  onSelectIssue: (issue: Issue, repoName: string) => void;
}

export function LandingView({ onSignIn, onSelectIssue }: LandingViewProps) {
  const previewRepo = PRECONFIGURED_REPOSITORIES["facebook/react"];

  return (
    <div className="noise-bg grid-bg min-h-screen flex flex-col items-center w-full pb-24 text-zinc-300 bg-[#050505]">
      
      {/* Top Header Grid Align */}
      <div className="w-full flex justify-between items-center px-6 md:px-12 h-20 border-b-2 border-zinc-900 bg-[#050505]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3 select-none">
          <div className="flex items-center justify-center w-8 h-8 border border-black bg-[#D6FF38] text-black font-mono font-black text-lg">
            O
          </div>
          <span className="text-xl font-black text-white tracking-tighter uppercase font-syne">OpenTrail</span>
        </div>
        <button 
          onClick={onSignIn}
          className="text-xs font-mono font-bold border-2 border-[#D6FF38] bg-[#050505] hover:bg-[#D6FF38] hover:text-black text-[#D6FF38] px-5 py-2 rounded-none transition-all flex items-center gap-2 cursor-pointer"
        >
          Explore Platform <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Hero Group */}
      <section className="relative w-full flex flex-col items-center justify-center pt-20 pb-16 px-6 max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
        
        {/* Subtle decorative absolute coordinates or labels for brutalism */}
        <div className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 flex-col items-center space-y-2 select-none">
          <span className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-[0.3em] vertical-label">SYS_REF: OPEN_PATH_4e95</span>
          <div className="w-0.5 h-16 bg-zinc-800"></div>
        </div>
        
        <div className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 flex-col items-center space-y-2 select-none">
          <div className="w-0.5 h-16 bg-zinc-800"></div>
          <span className="text-[10px] font-mono font-bold text-[#D6FF38] uppercase tracking-[0.3em] vertical-label">INTELLIGENCE LAYER</span>
        </div>

        <div className="flex flex-col items-center gap-0 select-none">
          <div className="px-3.5 py-1 border border-[#D6FF38] bg-[#D6FF38]/10 text-[#D6FF38] font-mono font-bold text-xs uppercase tracking-widest mb-6">
            // BETA_RELEASE v1.0.4
          </div>
          <h1 className="massive-text text-white">
            OpenTrail
          </h1>
          <h2 className="sub-massive-text text-outline-accent -mt-2 md:-mt-4">
            Intel Layer
          </h2>
        </div>

        <p className="text-base md:text-lg text-zinc-400 font-sans max-w-2xl leading-relaxed uppercase tracking-wide font-medium">
          The Intelligence Layer for Open Source. <span className="text-white">Discover</span>, <span className="text-[#D6FF38]">analyze</span>, and <span className="text-white">contribute</span> with maximum scale.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-5 items-center justify-center w-full max-w-md">
          <button 
            onClick={onSignIn}
            className="brutalist-btn-accent flex items-center justify-center gap-2.5 px-8 py-4 w-full sm:w-auto text-sm cursor-pointer"
          >
            <GitBranch className="w-4 h-4" />
            Sign in with GitHub
          </button>
          
          <button 
            onClick={onSignIn}
            className="brutalist-btn-black px-8 py-4 w-full sm:w-auto text-sm border-2 border-zinc-800 text-zinc-300 hover:border-[#D6FF38] hover:text-[#D6FF38] transition-all cursor-pointer shadow-[4px_4px_0px_0px_rgba(26,26,28,1)]"
          >
            View Documentation
          </button>
        </div>

        {/* Floating Preview Card (Hero Interactive Decor) */}
        <div className="w-full max-w-3xl brutalist-card-accent p-6 md:p-8 relative z-10 text-left mt-20 rounded-none bg-[#0e0e0f] group">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-white font-sans tracking-tight uppercase">facebook/react</span>
                <span className="px-2.5 py-0.5 font-mono text-[9px] font-bold bg-[#D6FF38] text-black border border-black">
                  MIT LICENSE
                </span>
              </div>
              <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">
                A declarative, efficient, and flexible JavaScript library for building user interfaces.
              </p>
            </div>
            
            <div className="flex items-center gap-2 bg-black border border-zinc-800 px-3 py-1.5 self-start sm:self-center select-none">
              <span className="text-[#D6FF38] text-xs font-mono font-black uppercase tracking-wider">Health: 98%</span>
              <span className="h-2.5 w-2.5 bg-[#D6FF38] animate-pulse"></span>
            </div>
          </div>
          
          <div className="h-0.5 w-full bg-zinc-900 mb-5"></div>
          
          <div className="flex flex-col gap-3">
            <div className="text-[10px] font-mono text-[#D6FF38] font-bold tracking-wider mb-2 uppercase select-none">
              // ACTIVE TARGETS (SOLVE LOCALLY WITH ENGINE)
            </div>
            
            {previewRepo.issues.map((issue) => (
              <div 
                key={issue.id}
                onClick={() => onSelectIssue(issue, "facebook/react")}
                className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3.5 bg-[#050505] border-2 border-zinc-900 hover:border-[#D6FF38] hover:bg-[#D6FF38] hover:text-black transition-all cursor-pointer group/row rounded-none"
              >
                <div className="flex items-center gap-3.5">
                  <AlertCircle className="w-4.5 h-4.5 text-zinc-600 group-hover/row:text-black group-hover/row:scale-105 transition-transform" />
                  <span className="text-xs font-bold text-zinc-300 group-hover/row:text-black transition-colors uppercase tracking-tight">
                    {issue.title}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mt-3 sm:mt-0 self-end sm:self-auto font-mono">
                  <span className="px-2 py-0.5 text-[9px] font-bold bg-zinc-900 text-zinc-400 border border-zinc-800 group-hover/row:bg-black group-hover/row:text-[#D6FF38] group-hover/row:border-black transition-colors uppercase">
                    {issue.label}
                  </span>
                  <span className="text-xs text-zinc-500 group-hover/row:text-black transition-colors font-bold">#{issue.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Logo Moving Marquee Marquee Ticker */}
      <section className="w-full py-10 border-y-2 border-zinc-900 bg-black">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-6">
          <span className="text-[10px] font-mono font-black text-[#D6FF38] tracking-widest uppercase select-none">
            // TRUSTED BY MAINTAINERS IN ECOSYSTEMS LIKE
          </span>
          <div className="w-full ticker-container relative select-none">
            <div className="ticker-content flex items-center gap-16 text-zinc-600 font-sans">
              {ECOSYSTEMS.concat(ECOSYSTEMS).map((name, index) => (
                <span 
                  key={index}
                  className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase font-syne text-zinc-700 hover:text-[#D6FF38] transition-colors cursor-default"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features bento Grid */}
      <section className="w-full py-24 px-6 bg-[#050505] border-b-2 border-zinc-900">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight font-syne">// Built For Modern Contributions</h2>
            <p className="text-xs font-mono text-zinc-500 max-w-md mx-auto uppercase tracking-wide">Skip searching through random boards. Let intelligence guide your next open source pull request.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="brutalist-card flex flex-col gap-5 p-6 md:p-8 rounded-none bg-[#0e0e0f] border-2 border-zinc-900 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D6FF38]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="h-12 w-12 bg-black flex items-center justify-center border-2 border-zinc-900 text-[#D6FF38] group-hover:border-[#D6FF38] group-hover:bg-[#D6FF38] group-hover:text-black transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">AI-Driven Discovery</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Stop searching for issues. Our semantic engine matches your skillset and historical PRs to the perfect open-source tasks.
              </p>
            </div>

            <div className="brutalist-card flex flex-col gap-5 p-6 md:p-8 rounded-none bg-[#0e0e0f] border-2 border-zinc-900 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D6FF38]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="h-12 w-12 bg-black flex items-center justify-center border-2 border-zinc-900 text-[#D6FF38] group-hover:border-[#D6FF38] group-hover:bg-[#D6FF38] group-hover:text-black transition-colors">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Real-time Health</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Assess repository vitality instantly. We analyze issue resolution times, maintainer activity, and code review depth.
              </p>
            </div>

            <div className="brutalist-card flex flex-col gap-5 p-6 md:p-8 rounded-none bg-[#0e0e0f] border-2 border-zinc-900 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D6FF38]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="h-12 w-12 bg-black flex items-center justify-center border-2 border-zinc-900 text-[#D6FF38] group-hover:border-[#D6FF38] group-hover:bg-[#D6FF38] group-hover:text-black transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Onboarding Maps</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Get step-by-step onboarding for complex codebases. Understand the architecture before you clone the repo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer view */}
      <footer className="w-full border-t border-zinc-900 bg-black py-10 px-6 text-zinc-500 font-mono text-xs select-none mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <span>© 2026 OPENTRAIL OSS. INTELLIGENCE LAYER.</span>
          <div className="flex gap-5 font-bold">
            <span className="hover:text-white cursor-pointer transition-colors">SYSTEM STATUS</span>
            <span className="hover:text-white cursor-pointer transition-colors">API DOCS</span>
            <span className="hover:text-white cursor-pointer transition-colors">GITHUB</span>
            <span className="hover:text-white cursor-pointer transition-colors">DISCORD</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
