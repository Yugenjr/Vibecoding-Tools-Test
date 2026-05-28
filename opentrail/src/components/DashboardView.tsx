import { useState, FormEvent } from "react";
import { 
  Compass, LayoutDashboard, Bot, GraduationCap, Settings, 
  HelpCircle, Terminal, Cloud, Search, ArrowRight, Play, Check, 
  Sparkles, Award, ClipboardCheck, ArrowLeft, RefreshCw, Layers,
  Menu, X
} from "lucide-react";
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";
import { Repository, LearningModule, SkillProgress, QuickReference, Issue } from "../types";
import { PRECONFIGURED_REPOSITORIES } from "../data/mockData";

// Raw and dynamic telemetry generator for standard and customized repository workspaces
const getHistoricalData = (repoName: string, healthScore: number) => {
  const predefined: Record<string, Array<{ month: string; merged: number; open: number; time: number }>> = {
    "facebook/react": [
      { month: "JAN", merged: 240, open: 80, time: 14 },
      { month: "FEB", merged: 280, open: 75, time: 12 },
      { month: "MAR", merged: 310, open: 90, time: 11 },
      { month: "APR", merged: 350, open: 85, time: 9 },
      { month: "MAY", merged: 390, open: 65, time: 8 },
      { month: "JUN", merged: 420, open: 55, time: 7 },
    ],
    "rust-lang/rust": [
      { month: "JAN", merged: 410, open: 180, time: 36 },
      { month: "FEB", merged: 450, open: 195, time: 32 },
      { month: "MAR", merged: 480, open: 210, time: 29 },
      { month: "APR", merged: 520, open: 180, time: 26 },
      { month: "MAY", merged: 560, open: 160, time: 22 },
      { month: "JUN", merged: 610, open: 150, time: 18 },
    ],
    "tailwindlabs/tailwindcss": [
      { month: "JAN", merged: 80, open: 15, time: 4 },
      { month: "FEB", merged: 95, open: 20, time: 3 },
      { month: "MAR", merged: 110, open: 10, time: 3 },
      { month: "APR", merged: 130, open: 12, time: 2 },
      { month: "MAY", merged: 145, open: 8, time: 2 },
      { month: "JUN", merged: 160, open: 5, time: 1.5 },
    ],
    "vercel/next.js": [
      { month: "JAN", merged: 190, open: 50, time: 18 },
      { month: "FEB", merged: 210, open: 45, time: 16 },
      { month: "MAR", merged: 240, open: 60, time: 13 },
      { month: "APR", merged: 270, open: 55, time: 11 },
      { month: "MAY", merged: 310, open: 40, time: 9 },
      { month: "JUN", merged: 330, open: 35, time: 8 },
    ],
  };

  if (predefined[repoName]) {
    return predefined[repoName];
  }

  // Consistent dynamic telemetry based on real-time health score variables
  const baseMerged = Math.round(healthScore * 2.5);
  const baseOpen = Math.round((100 - healthScore) * 1.5);
  const baseTime = Math.max(2, Math.round((100 - healthScore) * 0.4));

  return [
    { month: "JAN", merged: Math.round(baseMerged * 0.8), open: Math.round(baseOpen * 1.2), time: Math.round(baseTime * 1.3 * 10) / 10 },
    { month: "FEB", merged: Math.round(baseMerged * 0.9), open: Math.round(baseOpen * 1.1), time: Math.round(baseTime * 1.15 * 10) / 10 },
    { month: "MAR", merged: baseMerged, open: baseOpen, time: baseTime },
    { month: "APR", merged: Math.round(baseMerged * 1.1), open: Math.round(baseOpen * 0.95), time: Math.round(baseTime * 0.9 * 10) / 10 },
    { month: "MAY", merged: Math.round(baseMerged * 1.18), open: Math.round(baseOpen * 0.8), time: Math.round(baseTime * 0.8 * 10) / 10 },
    { month: "JUN", merged: Math.round(baseMerged * 1.25), open: Math.round(baseOpen * 0.7), time: Math.round(baseTime * 0.7 * 10) / 10 },
  ];
};

interface DashboardViewProps {
  initialModules: LearningModule[];
  initialSkills: SkillProgress[];
  quickReferences: QuickReference[];
  onSelectIssue: (issue: Issue, repoName: string) => void;
  onGoBack: () => void;
}

export function DashboardView({ 
  initialModules, 
  initialSkills, 
  quickReferences, 
  onSelectIssue,
  onGoBack 
}: DashboardViewProps) {
  
  // Navigation tabs state
  const [activeMenu, setActiveMenu] = useState<"learn" | "explore" | "dashboard" | "ai" | "settings">("learn");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State for modules list
  const [modules, setModules] = useState<LearningModule[]>(initialModules);
  const [skills, setSkills] = useState<SkillProgress[]>(initialSkills);
  
  // Custom repo input analyzer
  const [activeRepoKey, setActiveRepoKey] = useState<string>("facebook/react");
  const [customRepoInput, setCustomRepoInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Active learning path step modal
  const [activeLearningModule, setActiveLearningModule] = useState<LearningModule | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Copy reference help
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeRepo = PRECONFIGURED_REPOSITORIES[activeRepoKey] || PRECONFIGURED_REPOSITORIES["facebook/react"];

  const handleCopyCommand = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleStartLearnModule = (module: LearningModule) => {
    setActiveLearningModule(module);
    setActiveStepIndex(0);
  };

  const handleCompleteStep = () => {
    if (!activeLearningModule) return;
    
    if (activeStepIndex < activeLearningModule.steps.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    } else {
      // Complete entire module
      const updatedModules = modules.map(m => {
        if (m.id === activeLearningModule.id) {
          return { ...m, progressPercent: 100 };
        }
        return m;
      });
      setModules(updatedModules);

      // Boost skill counts
      let targetSkill = "Git Fundamentals";
      if (activeLearningModule.id === "m2") targetSkill = "OSS Etiquette";
      if (activeLearningModule.id === "m3") targetSkill = "Advanced Testing";

      const updatedSkills = skills.map(s => {
        if (s.name === targetSkill) {
          return { ...s, percent: Math.min(100, s.percent + 20) };
        }
        return s;
      });
      setSkills(updatedSkills);
      setActiveLearningModule(null);
    }
  };

  const handleAnalyzeCustomRepo = async (e: FormEvent) => {
    e.preventDefault();
    if (!customRepoInput.trim()) return;

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const response = await fetch("/api/analyze-repo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl: customRepoInput })
      });
      
      const repoData = await response.json();
      
      if (repoData && repoData.name) {
        // Inject or update preconfigured listed repos with Gemini generated results
        PRECONFIGURED_REPOSITORIES[repoData.name] = {
          name: repoData.name,
          description: repoData.description || "An analyzed custom open-source project.",
          healthScore: repoData.healthScore || 85,
          learningPath: repoData.learningPath || "Repository Onboarding Essentials",
          issues: repoData.issues || []
        };
        setActiveRepoKey(repoData.name);
        setCustomRepoInput("");
      } else {
        setAnalysisError("Could not retrieve valid format from target repo. Using default layout.");
      }
    } catch (err) {
      console.error("Analysis failure:", err);
      setAnalysisError("Analysis timed out. Repository remains fully browsable.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Filter modules based on search
  const filteredModules = modules.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-screen bg-[#131315]/30">
      
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-black border-b-2 border-zinc-900 sticky top-0 z-50 select-none">
        <div className="flex items-center gap-3" onClick={onGoBack}>
          <div className="w-8 h-8 border border-black bg-[#D6FF38] flex items-center justify-center text-black font-mono font-black text-xs hover:scale-105 transition-transform cursor-pointer">
            O
          </div>
          <h1 className="text-sm font-black text-white tracking-widest uppercase font-syne cursor-pointer">OSS Platform</h1>
        </div>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 border-2 border-zinc-900 bg-[#0e0e0f] hover:border-[#D6FF38] text-[#D6FF38] transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-black/95 backdrop-blur-md animate-fade-in text-left">
          <div className="flex items-center justify-between p-4 border-b-2 border-zinc-900 bg-black">
            <div className="flex items-center gap-3" onClick={() => { setMobileMenuOpen(false); onGoBack(); }}>
              <div className="w-8 h-8 border border-black bg-[#D6FF38] flex items-center justify-center text-black font-mono font-black text-base">
                O
              </div>
              <h1 className="text-base font-black text-white tracking-widest uppercase font-syne">OSS Platform</h1>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border-2 border-zinc-900 bg-[#0e0e0f] text-zinc-400 hover:text-[#D6FF38] hover:border-[#D6FF38] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-grow py-8 px-6 space-y-6 overflow-y-auto">
            <ul className="space-y-3 font-mono">
              {[
                { label: "Explore Repos", view: "explore", icon: Compass },
                { label: "Health Scores", view: "dashboard", icon: LayoutDashboard },
                { label: "AI Assistant", view: "ai", icon: Bot },
                { label: "Learn Paths", view: "learn", icon: GraduationCap },
                { label: "Settings", view: "settings", icon: Settings },
              ].map((item) => {
                const IconComponent = item.icon;
                const isActive = activeMenu === item.view;
                return (
                  <li key={item.view}>
                    <button
                      onClick={() => {
                        setActiveMenu(item.view as any);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-4 px-4 py-3.5 text-sm font-bold uppercase tracking-wider rounded-none ${
                        isActive 
                          ? "bg-[#D6FF38] text-black border border-black font-black" 
                          : "text-zinc-400 border border-zinc-900 hover:text-[#D6FF38] bg-zinc-950"
                      } cursor-pointer`}
                    >
                      <IconComponent className="w-5 h-5 text-left" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="pt-6 border-t border-zinc-900 space-y-3 text-xs font-mono select-none">
              <div className="flex items-center gap-3 text-zinc-500 font-bold uppercase">
                <Cloud className="w-4 h-4 text-[#D6FF38] animate-pulse" />
                <span>SYS STATUS: ON</span>
              </div>
              <div className="flex items-center gap-3 text-zinc-500 font-bold uppercase">
                <Layers className="w-3.5 h-3.5 text-[#D6FF38]" />
                <span>STABLE_SYS_v1.0.4</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar navigation */}
      <aside className="hidden md:flex flex-col w-64 bg-black border-r-2 border-zinc-900 z-40 select-none">
        <div className="p-6 border-b-2 border-zinc-900">
          <div className="flex items-center gap-3 mb-1.5" onClick={onGoBack}>
            <div className="w-8 h-8 border border-black bg-[#D6FF38] flex items-center justify-center text-black font-mono font-black text-base hover:scale-105 transition-transform cursor-pointer">
              O
            </div>
            <h1 className="text-base font-black text-white tracking-widest uppercase font-syne cursor-pointer">OSS Platform</h1>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#D6FF38] uppercase flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#D6FF38]" /> // STABLE_SYS_v1.0.4
          </span>
        </div>

        <div className="flex-grow py-6 overflow-y-auto px-4 space-y-2">
          <ul className="space-y-1.5">
            <li>
              <button
                onClick={() => setActiveMenu("explore")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold uppercase transition-all tracking-wider rounded-none ${
                  activeMenu === "explore" 
                    ? "bg-[#D6FF38] text-black border border-black font-black" 
                    : "text-zinc-400 hover:text-[#D6FF38] hover:bg-zinc-900/40"
                } cursor-pointer`}
              >
                <Compass className="w-4 h-4" />
                Explore Repos
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveMenu("dashboard")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold uppercase transition-all tracking-wider rounded-none ${
                  activeMenu === "dashboard" 
                    ? "bg-[#D6FF38] text-black border border-black font-black" 
                    : "text-zinc-400 hover:text-[#D6FF38] hover:bg-zinc-900/40"
                } cursor-pointer`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Health Scores
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveMenu("ai")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold uppercase transition-all tracking-wider rounded-none ${
                  activeMenu === "ai" 
                    ? "bg-[#D6FF38] text-black border border-black font-black" 
                    : "text-zinc-400 hover:text-[#D6FF38] hover:bg-zinc-900/40"
                } cursor-pointer`}
              >
                <Bot className="w-4 h-4" />
                AI Assistant
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveMenu("learn")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold uppercase transition-all tracking-wider rounded-none ${
                  activeMenu === "learn" 
                    ? "bg-[#D6FF38] text-black border border-black font-black" 
                    : "text-zinc-400 hover:text-[#D6FF38] hover:bg-zinc-900/40"
                } cursor-pointer`}
              >
                <GraduationCap className="w-4 h-4" />
                Learn Paths
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveMenu("settings")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold uppercase transition-all tracking-wider rounded-none ${
                  activeMenu === "settings" 
                    ? "bg-[#D6FF38] text-black border border-black font-black" 
                    : "text-zinc-400 hover:text-[#D6FF38] hover:bg-zinc-900/40"
                } cursor-pointer`}
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </li>
          </ul>
        </div>

        <div className="p-4 border-t-2 border-zinc-900 text-[10px] font-mono space-y-2">
          <div className="flex items-center gap-2.5 px-3 py-1.5 text-zinc-500 hover:text-[#D6FF38] transition-colors cursor-pointer font-bold uppercase">
            <Cloud className="w-4 h-4 text-[#D6FF38] animate-pulse" />
            <span>SYS STATUS: ON</span>
          </div>
          <div className="flex items-center gap-2.5 px-3 py-1.5 text-zinc-500 hover:text-[#D6FF38] transition-colors cursor-pointer font-bold uppercase animate-pulse">
            <Terminal className="w-4 h-4" />
            <span>API REFS DOCS</span>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 flex flex-col overflow-x-hidden">
        
        {/* Top filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between p-6 border-b-2 border-zinc-900 bg-black/90 backdrop-blur">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH TUTORIALS, DOCS, OR COMMANDS..."
              className="w-full bg-[#131315] border-2 border-zinc-900 rounded-none px-3 py-2 pl-9 text-xs text-zinc-205 placeholder-zinc-500 focus:outline-none focus:border-[#D6FF38] transition-colors uppercase font-mono"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 select-none pointer-events-none">
              <span className="px-1.5 py-0.5 rounded-none bg-zinc-850 text-[10px] text-zinc-500 font-mono">⌘</span>
              <span className="px-1.5 py-0.5 rounded-none bg-zinc-850 text-[10px] text-zinc-500 font-mono">K</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 font-mono hidden lg:inline font-bold uppercase">Active Target:</span>
            <select 
              value={activeRepoKey}
              onChange={(e) => setActiveRepoKey(e.target.value)}
              className="bg-[#131315] border-2 border-zinc-900 text-xs font-mono font-bold text-[#D6FF38] px-3.5 py-2 rounded-none focus:outline-none focus:border-[#D6FF38] uppercase"
            >
              {Object.keys(PRECONFIGURED_REPOSITORIES).map(k => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Views switching */}
        <div className="p-6 md:p-8 space-y-8 flex-1 bg-[#050505]">
          
          {activeMenu === "learn" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 align-start">
              
              {/* Left Column Content */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Hero section */}
                <section className="relative rounded-none border-2 border-[#D6FF38] bg-black p-6 md:p-10 overflow-hidden shadow-[4px_4px_0px_0px_#D6FF38] animate-fade-in group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-[#D6FF38]/10 to-transparent pointer-events-none opacity-60"></div>
                  <div className="relative z-10 max-w-lg space-y-5">
                    <div className="text-[10px] font-mono font-bold text-[#D6FF38] uppercase tracking-widest">// ESSENTIAL ROADMAP</div>
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight font-syne leading-none">
                      Master Open Source
                    </h2>
                    <p className="text-xs md:text-sm text-zinc-450 leading-relaxed font-sans font-medium uppercase tracking-wide">
                      Accelerate your contribution journey with structured learning paths, deep-dive tutorials, and verified community standards.
                    </p>
                    <div className="flex gap-4 pt-2">
                      <button 
                        onClick={() => handleStartLearnModule(modules[0])}
                        className="brutalist-btn-accent px-6 py-3 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
                      >
                        Start Path <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => setActiveMenu("explore")}
                        className="brutalist-btn-black bg-transparent border-2 border-zinc-800 text-zinc-300 hover:text-[#D6FF38] hover:border-[#D6FF38] px-6 py-3 text-xs font-bold transition-all cursor-pointer"
                      >
                        Browse Repos
                      </button>
                    </div>
                  </div>
                </section>

                {/* Getting Started Modules list */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-2 border-b-2 border-zinc-900 select-none">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight font-syne">// Getting Started</h3>
                    <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">NEWCOMER ESSENTIALS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {filteredModules.filter(m => m.category === "Newcomer").map((m) => (
                      <article 
                        key={m.id} 
                        className="brutalist-card bg-[#0e0e0f] border-2 border-zinc-900 rounded-none p-6 flex flex-col justify-between group relative"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-[10px] font-mono select-none">
                            <span className="px-2.5 py-0.5 font-bold uppercase bg-[#D6FF38]/15 text-[#D6FF38] border border-[#D6FF38]/30 rounded-none">
                              {m.category}
                            </span>
                            <span className="text-zinc-500 uppercase font-black tracking-widest text-[9px]">
                              {m.duration}
                            </span>
                          </div>

                          <h4 className="text-[15px] font-black text-white group-hover:text-[#D6FF38] transition-colors font-sans uppercase tracking-tight">
                            {m.title}
                          </h4>
                          
                          <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-3">
                            {m.description}
                          </p>
                        </div>

                        <div className="pt-6 mt-auto">
                          {m.progressPercent === 100 ? (
                            <div className="w-full py-2.5 rounded-none bg-emerald-950/25 text-emerald-400 border-2 border-emerald-900 text-xs font-bold flex items-center justify-center gap-1.5 font-mono select-none uppercase">
                              <Check className="w-4 h-4 text-[#D6FF38]" /> Lesson Completed
                            </div>
                          ) : (
                            <button 
                              onClick={() => handleStartLearnModule(m)}
                              className="w-full py-2.5 rounded-none bg-[#131315] border-2 border-zinc-800 text-xs font-bold uppercase text-zinc-300 hover:text-black hover:bg-[#D6FF38] hover:border-[#D6FF38] transition-colors tracking-wide cursor-pointer text-center"
                            >
                              Start Learning
                            </button>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* Advanced Workflows sections */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-2 border-b-2 border-zinc-900 select-none">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight font-syne">// Advanced Workflows</h3>
                    <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider">PRO TECHNIQUES</span>
                  </div>
                  
                  {filteredModules.filter(m => m.category === "Pro").map((m) => (
                    <article 
                      key={m.id}
                      className="relative rounded-none border-2 border-zinc-900 p-6 bg-black hover:border-[#D6FF38] transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group overflow-hidden shadow-[4px_4px_0px_0px_rgba(26,26,28,1)]"
                    >
                      {/* Ambient decoration */}
                      <div className="absolute -inset-px bg-gradient-to-r from-[#D6FF38]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-none">
                            {m.category}
                          </span>
                          {m.isAiAssisted && (
                            <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase bg-[#D6FF38]/10 text-[#D6FF38] border border-[#D6FF38]/20 flex items-center gap-1.5 rounded-none select-none">
                              <Sparkles className="w-3.5 h-3.5" /> AI Assisted
                            </span>
                          )}
                        </div>

                        <h4 className="text-lg font-black text-white uppercase leading-tight group-hover:text-[#D6FF38] transition-colors font-sans tracking-tight">
                          {m.title}
                        </h4>

                        <p className="text-xs text-zinc-400 leading-relaxed font-sans max-w-2xl">
                          {m.description}
                        </p>

                        <div className="flex gap-4 text-[10px] font-mono text-zinc-500 select-none uppercase font-bold">
                          <span>{m.chaptersCount} Chapters</span>
                          <span>•</span>
                          <span>{m.duration}</span>
                        </div>
                      </div>

                      <div className="flex-shrink-0 w-full md:w-auto">
                        {m.progressPercent === 100 ? (
                          <div className="px-6 py-2.5 rounded-none bg-emerald-950/25 text-emerald-400 border-2 border-emerald-900 text-xs font-bold flex items-center justify-center gap-1.5 font-mono select-none uppercase">
                            <Check className="w-4 h-4 text-[#D6FF38]" /> Finished
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleStartLearnModule(m)}
                            className="w-full md:w-auto px-6 py-3 rounded-none bg-transparent border-2 border-[#D6FF38] text-[#D6FF38] hover:bg-[#D6FF38] hover:text-black text-xs font-bold transition-all uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            Begin Module
                          </button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>

              </div>

              {/* Right Column sidebar panels */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Skill Progress levels */}
                <div className="brutalist-card bg-[#0e0e0f] rounded-none border-2 border-zinc-900 p-6 space-y-5 shadow-[4px_4px_0px_0px_rgba(26,26,28,1)]">
                  <div className="flex items-center gap-2 pb-2 border-b-2 border-zinc-900 select-none">
                    <Award className="w-4.5 h-4.5 text-[#D6FF38]" />
                    <h3 className="text-xs font-black text-[#D6FF38] font-mono uppercase tracking-wider">// Skill Progress</h3>
                  </div>

                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="space-y-1.5 font-mono">
                        <div className="flex justify-between items-end text-xs font-bold uppercase select-none">
                          <span className="text-zinc-300">{skill.name}</span>
                          <span className="text-[#D6FF38]">{skill.percent}%</span>
                        </div>
                        <div className="h-3 w-full bg-black rounded-none overflow-hidden border-2 border-zinc-950">
                          <div 
                            className="h-full bg-[#D6FF38] rounded-none transition-all duration-500"
                            style={{ width: `${skill.percent}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick references clips */}
                <div className="brutalist-card bg-[#0e0e0f] rounded-none border-2 border-zinc-900 p-6 space-y-5 shadow-[4px_4px_0px_0px_rgba(26,26,28,1)]">
                  <h3 className="text-xs font-black text-zinc-300 font-mono uppercase tracking-wider pb-2 border-b-2 border-zinc-900 select-none">
                    // Quick References
                  </h3>

                  <ul className="space-y-3">
                    {quickReferences.map((ref) => (
                      <li key={ref.id} className="group">
                        <div 
                          onClick={() => handleCopyCommand(ref.command, ref.id)}
                          className="p-3 bg-black border-2 border-zinc-900 hover:border-[#D6FF38] hover:bg-[#D6FF38]/5 rounded-none transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                            <span className="text-xs font-mono text-zinc-300 group-hover:text-white font-bold block">
                              {ref.command}
                            </span>
                            <span className="block text-[10px] text-zinc-500 font-sans mt-0.5 leading-none uppercase tracking-wide">
                              {ref.description}
                            </span>
                          </div>

                          <div className="text-zinc-650 group-hover:text-white flex-shrink-0 ml-2">
                            {copiedId === ref.id ? (
                              <span className="text-[10px] text-[#D6FF38] font-mono font-black uppercase">Copied</span>
                            ) : (
                              <ClipboardCheck className="w-4 h-4 text-zinc-500 group-hover:text-[#D6FF38]" />
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          )}

          {activeMenu === "explore" && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div className="space-y-2 select-none">
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight font-syne">// Explore Workspaces</h2>
                <p className="text-xs font-mono text-zinc-500 uppercase">Discover and switch repository workspaces instantly inside the analysis environment.</p>
              </div>

              {/* Form to submit Custom Repo URL to be analysed by Gemini */}
              <form onSubmit={handleAnalyzeCustomRepo} className="brutalist-card bg-[#0e0e0f] rounded-none border-2 border-zinc-900 p-6 space-y-4 shadow-[4px_4px_0px_0px_rgba(26,26,28,1)]">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-black text-[#D6FF38] uppercase tracking-wider">// Input Custom GitHub Repository</label>
                  <p className="text-xs text-zinc-400 capitalize">Enter any active GitHub Repo (e.g., vernel/next.js, vuejs/core) to unleash Gemini-driven diagnostics.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text"
                    value={customRepoInput}
                    onChange={(e) => setCustomRepoInput(e.target.value)}
                    placeholder="E.G. FACEBOOK/REACT"
                    className="flex-1 bg-black border-2 border-zinc-900 rounded-none px-4 py-2.5 text-xs text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-[#D6FF38] uppercase font-mono font-bold"
                  />
                  <button 
                    type="submit"
                    disabled={isAnalyzing}
                    className="brutalist-btn-accent px-6 py-3 rounded-none text-xs flex items-center justify-center gap-2 cursor-pointer disabled:bg-zinc-800 disabled:border-zinc-800 disabled:text-zinc-500"
                  >
                    {isAnalyzing ? (
                      <>Analyzing Repository...</>
                    ) : (
                      <>Analyze Repo with Gemini</>
                    )}
                  </button>
                </div>
                {analysisError && <div className="text-rose-400 text-xs font-mono uppercase font-bold">// {analysisError}</div>}
              </form>

              {/* Grid of standard available repos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {Object.values(PRECONFIGURED_REPOSITORIES).map((repo) => (
                  <div 
                    key={repo.name}
                    className={`p-6 border-2 transition-all rounded-none shadow-[4px_4px_0px_0px_rgba(26,26,28,1)] ${
                      activeRepoKey === repo.name 
                        ? "border-[#D6FF38] bg-black shadow-[4px_4px_0px_0px_#D6FF38]" 
                        : "border-zinc-900 bg-[#0e0e0f] hover:border-[#D6FF38]"
                    }`}
                  >
                    <div className="flex justify-between items-start select-none">
                      <span className="text-base font-black text-white font-sans uppercase tracking-tight">{repo.name}</span>
                      <div className="text-[10px] px-2.5 py-0.5 font-bold uppercase bg-[#D6FF38]/10 text-[#D6FF38] border border-[#D6FF38]/20 font-mono">
                        HEALTH: {repo.healthScore}%
                      </div>
                    </div>
                    <p className="text-xs text-zinc-450 mt-3 line-clamp-2 leading-relaxed font-sans font-medium">{repo.description}</p>
                    <div className="mt-5 pt-3 border-t border-zinc-900 flex justify-between items-center text-[10px] font-mono select-none font-bold uppercase text-zinc-500">
                      <span className="truncate max-w-[170px]">// {repo.learningPath}</span>
                      <button 
                        onClick={() => {
                          setActiveRepoKey(repo.name);
                          setActiveMenu("learn");
                        }} 
                        className="text-[#D6FF38] hover:text-[#e2ff60] cursor-pointer"
                      >
                        [ SELECT WORKSPACE ]
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMenu === "dashboard" && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div className="space-y-2 select-none">
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight font-syne">// Health & Viability Dashboard</h2>
                <p className="text-xs font-mono text-zinc-500 uppercase">Deep statistics tracking open source vitality, resolution speeds, and contribution ease.</p>
              </div>

              {/* Active analyzed Repo scorecard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="brutalist-card bg-[#0e0e0f] border-2 border-zinc-900 rounded-none p-6 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(26,26,28,1)]">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-black tracking-wider">// REPO VITALITY</span>
                  <div className="my-3 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white font-syne">{activeRepo.healthScore}%</span>
                    <span className="text-xs text-[#D6FF38] font-mono font-bold uppercase">EXCELLENT</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Based on rapid pull request reviews.</span>
                </div>

                <div className="brutalist-card bg-[#0e0e0f] border-2 border-zinc-900 rounded-none p-6 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(26,26,28,1)]">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-black tracking-wider">// SUGGESTED ISSUES</span>
                  <div className="my-3 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-[#D6FF38] font-syne">{activeRepo.issues.length}</span>
                    <span className="text-xs text-zinc-400 font-bold">TARGETS</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Available to solve locally with AI.</span>
                </div>

                <div className="brutalist-card bg-[#0e0e0f] border-2 border-zinc-900 rounded-none p-6 flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(26,26,28,1)]">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-black tracking-wider">// LEARNER PROGRESS</span>
                  <div className="my-3 flex items-baseline gap-2">
                    <span className="text-4xl font-black text-[#D6FF38] font-syne">
                      {modules.filter(m => m.progressPercent === 100).length} / {modules.length}
                    </span>
                    <span className="text-xs text-zinc-500 font-bold uppercase">MODULES</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Increase skills on successful guides.</span>
                </div>
              </div>

              {/* Telemetry Chart: historical pull request merge activity */}
              <div className="brutalist-card bg-[#0e0e0f] border-2 border-zinc-900 rounded-none p-6 space-y-6 shadow-[4px_4px_0px_0px_rgba(26,26,28,1)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-zinc-900 select-none">
                  <div>
                    <h3 className="text-xs font-black text-[#D6FF38] uppercase font-mono tracking-tight">// Historical PR Telemetry</h3>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase mt-0.5">Monthly merge volume and resolution times</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-[9px] font-mono font-bold uppercase select-none">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-[#D6FF38]"></div>
                      <span className="text-zinc-400">Merged PRs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 bg-[#121214] border-2 border-zinc-800"></div>
                      <span className="text-zinc-400">Open Backlog</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-0.5 bg-amber-500"></div>
                      <span className="text-zinc-400">Merge Time (hrs)</span>
                    </div>
                  </div>
                </div>

                <div className="h-64 sm:h-72 w-full font-mono text-[9px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={getHistoricalData(activeRepo.name, activeRepo.healthScore)}
                      margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                    >
                      <CartesianGrid stroke="#18181b" strokeDasharray="3 3" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        stroke="#71717a" 
                        fontSize={9} 
                        tickLine={false}
                        axisLine={{ stroke: '#27272a', strokeWidth: 2 }}
                        dy={8}
                      />
                      <YAxis 
                        yAxisId="left"
                        stroke="#71717a" 
                        fontSize={9} 
                        tickLine={false}
                        axisLine={{ stroke: '#27272a', strokeWidth: 2 }}
                        dx={-8}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        stroke="#71717a" 
                        fontSize={9} 
                        tickLine={false}
                        axisLine={{ stroke: '#27272a', strokeWidth: 2 }}
                        dx={8}
                      />
                      <Tooltip 
                        cursor={{ fill: '#18181b', opacity: 0.3 }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-black border-2 border-[#D6FF38] p-3 text-left space-y-1.5 select-none rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-mono">
                                <p className="text-[#D6FF38] font-black text-xs uppercase tracking-wider">{payload[0].payload.month} Telemetry</p>
                                <div className="space-y-0.5 text-[10px] text-zinc-300 font-bold uppercase font-mono">
                                  <p className="flex justify-between gap-6">Merged PRs: <span className="text-white font-black">{payload[0].payload.merged}</span></p>
                                  <p className="flex justify-between gap-6">Open backlog: <span className="text-zinc-400 font-black">{payload[0].payload.open}</span></p>
                                  <p className="flex justify-between gap-6">Avg Merge Time: <span className="text-amber-500 font-black">{payload[0].payload.time} hrs</span></p>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar 
                        yAxisId="left"
                        dataKey="merged" 
                        fill="#D6FF38" 
                        maxBarSize={32}
                      />
                      <Bar 
                        yAxisId="left"
                        dataKey="open" 
                        fill="#121214"
                        stroke="#27272a"
                        strokeWidth={2}
                        maxBarSize={32}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="time" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        dot={{ r: 3, stroke: '#f59e0b', strokeWidth: 2, fill: '#000000' }}
                        activeDot={{ r: 5 }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-900 text-center select-none font-mono">
                  <div>
                    <span className="block text-[9px] text-zinc-500 font-black uppercase tracking-wider">// Cumulative Merged</span>
                    <span className="text-xs md:text-sm font-black text-white mt-1 block">
                      {getHistoricalData(activeRepo.name, activeRepo.healthScore).reduce((acc, curr) => acc + curr.merged, 0)} PRs
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-zinc-500 font-black uppercase tracking-wider">// Avg Resolution Time</span>
                    <span className="text-xs md:text-sm font-black text-amber-500 mt-1 block">
                      {(getHistoricalData(activeRepo.name, activeRepo.healthScore).reduce((acc, curr) => acc + curr.time, 0) / 6).toFixed(1)} hrs
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-zinc-500 font-black uppercase tracking-wider">// Backlog Ratio</span>
                    <span className="text-xs md:text-sm font-black text-emerald-400 mt-1 block">
                      {(getHistoricalData(activeRepo.name, activeRepo.healthScore)[5].open / getHistoricalData(activeRepo.name, activeRepo.healthScore)[5].merged * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Listed Repo Issues directly clickable */}
              <div className="brutalist-card bg-[#0e0e0f] border-2 border-zinc-900 rounded-none p-6 space-y-4 shadow-[4px_4px_0px_0px_rgba(26,26,28,1)]">
                <h3 className="text-sm font-black text-[#D6FF38] uppercase font-mono tracking-tight">// Newcomer Targets for workspace &apos;{activeRepo.name}&apos;</h3>
                <div className="space-y-3">
                  {activeRepo.issues.map((issue) => (
                    <div 
                      key={issue.id}
                      onClick={() => onSelectIssue(issue, activeRepo.name)}
                      className="p-4 bg-black border-2 border-zinc-900 hover:border-[#D6FF38] hover:bg-[#D6FF38]/5 rounded-none flex justify-between items-center cursor-pointer transition-colors"
                    >
                      <div className="text-xs text-zinc-200 group-hover:text-white font-bold uppercase tracking-tight">{issue.title}</div>
                      <div className="flex gap-2 text-[10px] items-center">
                        <span className="px-2.5 py-0.5 rounded-none bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono font-black uppercase text-[9px]">{issue.label}</span>
                        <span className="text-zinc-500 font-mono font-black">#{issue.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeMenu === "ai" && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div className="space-y-4 select-none">
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight font-syne flex items-center gap-3">
                  <Bot className="text-[#D6FF38]" /> // AI Assistant & Mentor
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed uppercase tracking-wide font-medium">
                  Welcome to your open-source AI companion. Select any issue from the <span className="text-[#D6FF38] font-mono cursor-pointer font-bold" onClick={() => setActiveMenu("learn")}>Learn Paths</span> or active targets list, and our server proxy utilizes Gemini model capabilities to instantly reconstruct a virtual debug lab for you!
                </p>
              </div>

              <div className="brutalist-card bg-[#0e0e0f] rounded-none border-2 border-zinc-900 p-8 text-center space-y-5 shadow-[4px_4px_0px_0px_rgba(26,26,28,1)]">
                <Sparkles className="w-12 h-12 text-[#D6FF38] mx-auto animate-pulse" />
                <h3 className="text-base font-black text-white uppercase tracking-tight font-syne">Ready to query contribution solutions?</h3>
                <p className="text-xs text-zinc-500 max-w-md mx-auto uppercase tracking-wide leading-relaxed font-bold font-mono">
                  To experience customized coaching maps, explore your repository dashboards, click on any target issue task, or submit a custom URL search to configure recommendations details!
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => setActiveMenu("learn")}
                    className="brutalist-btn-accent px-6 py-3 rounded-none text-xs flex items-center gap-1.5 mx-auto"
                  >
                    View Active Issue Targets
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeMenu === "settings" && (
            <div className="space-y-6 animate-fade-in max-w-xl">
              <div className="space-y-2 select-none">
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight font-syne">// Platform Settings</h2>
                <p className="text-xs font-mono text-zinc-500 uppercase">Configure global configurations, API integrations, and learner credential records.</p>
              </div>

              <div className="brutalist-card bg-[#0e0e0f] border-2 border-zinc-900 rounded-none p-6 space-y-4 shadow-[4px_4px_0px_0px_rgba(26,26,28,1)]">
                <h3 className="text-sm font-black text-[#D6FF38] uppercase tracking-tight font-mono">// Gemini Key Credentials</h3>
                <p className="text-xs text-zinc-400 tracking-wide font-sans">The platform automatically loads your server environment key for secure, proxy-shielded operations.</p>
                
                <div className="flex items-center gap-3 bg-[#050505] p-4 rounded-none border-2 border-zinc-900 text-xs font-mono select-none">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                  <span className="text-zinc-450 uppercase font-black tracking-wider">ENVIRONMENT ACTIVE CREDENTIALS DETECTED</span>
                </div>
              </div>

              <div className="brutalist-card bg-[#0e0e0f] border-2 border-zinc-900 rounded-none p-6 space-y-4 shadow-[4px_4px_0px_0px_rgba(26,26,28,1)]">
                <h3 className="text-sm font-black text-[#D6FF38] uppercase tracking-tight font-mono">// Simulation Management</h3>
                <p className="text-xs text-[#bcc9cd] tracking-wide font-sans">Encountering stale logs? Reset learning records to re-simulate target newcomer guides.</p>
                <button 
                  onClick={() => {
                    setModules(initialModules);
                    setSkills(initialSkills);
                  }}
                  className="brutalist-btn-black bg-transparent border-2 border-zinc-805 text-zinc-200 hover:text-[#D6FF38] hover:border-[#D6FF38] rounded-none uppercase font-mono px-6 py-3 text-xs font-black cursor-pointer tracking-wider"
                >
                  Reset Module Progress
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Global sticky footer */}
        <footer className="w-full border-t-2 border-zinc-900 bg-black px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-3 font-mono text-[9px] text-zinc-550 select-none uppercase font-black tracking-widest leading-none">
          <span>© 2026 OPENTRAIL OSS. BUILT FOR MAINTAINERS AND LEARNERS.</span>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">[ Platform Status ]</span>
            <span className="hover:text-white transition-colors cursor-pointer">[ API Docs ]</span>
            <span className="hover:text-white transition-colors cursor-pointer">[ GitHub Repository ]</span>
          </div>
        </footer>

      </main>

      {/* Learning module step overlays */}
      {activeLearningModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-black border-2 border-[#D6FF38] rounded-none p-6 space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-fade-in">
            <div className="flex justify-between items-start">
              <div className="space-y-1.5">
                <span className="px-2.5 py-0.5 rounded-none text-[9px] font-mono font-black uppercase tracking-widest bg-[#D6FF38]/15 text-[#D6FF38] border border-[#D6FF38]/30">
                  {activeLearningModule.category} TRACK
                </span>
                <h4 className="text-base font-black text-white uppercase tracking-tight font-sans mt-1">{activeLearningModule.title}</h4>
              </div>
              <button 
                onClick={() => setActiveLearningModule(null)}
                className="text-zinc-500 hover:text-white text-[10px] font-mono uppercase font-black tracking-widest"
              >
                [ EXIT ]
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-xs font-mono text-zinc-450 uppercase font-bold tracking-wider select-none">
                <span>Step {activeStepIndex + 1} of {activeLearningModule.steps.length}</span>
                <span>{Math.round(((activeStepIndex + 1) / activeLearningModule.steps.length) * 100)}% DETAILED</span>
              </div>
              <div className="h-3 w-full bg-[#131315] rounded-none overflow-hidden border-2 border-zinc-900">
                <div 
                  className="h-full bg-[#D6FF38] rounded-none transition-all duration-300"
                  style={{ width: `${((activeStepIndex + 1) / activeLearningModule.steps.length) * 100}%` }}
                ></div>
              </div>

              <div className="p-4 rounded-none bg-[#0e0e0f] border-2 border-zinc-900 space-y-2">
                <div className="text-[10px] font-black text-[#D6FF38] font-mono uppercase tracking-widest">// INSTRUCTION LAB</div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans mt-2 font-medium">
                  {activeLearningModule.steps[activeStepIndex]}
                </p>
              </div>
            </div>

            <button 
              onClick={handleCompleteStep}
              className="w-full py-4 bg-[#D6FF38] text-black text-xs font-black uppercase tracking-wider rounded-none hover:bg-white transition-colors duration-150 flex items-center justify-center gap-1.5 cursor-pointer leading-none hover:scale-[1.01]"
            >
              {activeStepIndex === activeLearningModule.steps.length - 1 ? "Complete Lesson & update skills" : "Next Step"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
