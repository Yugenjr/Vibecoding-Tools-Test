import { useState, useEffect } from "react";
import { X, Terminal, FileCode, Lightbulb, Loader2, GitPullRequest, Copy, Check } from "lucide-react";
import { Issue, IssueGuidance } from "../types";

interface CoachDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  issue: Issue | null;
  repoName: string;
  onCompleteSimulation?: () => void;
}

const REASSURANCE_PHRASES = [
  "FORMULATING NEWCOMER-SAFE CONTRIBUTION ROUTES...",
  "ANALYZING UPSTREAM AST REPOSITORY STRUCTURES...",
  "QUERYING DEVELOPER WORKFLOW PARADIGMS...",
  "GENERATING STEP-BY-STEP DIAGNOSTIC ADVICE WITH GEMINI..."
];

export function CoachDrawer({ isOpen, onClose, issue, repoName, onCompleteSimulation }: CoachDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [guidance, setGuidance] = useState<IssueGuidance | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "fix" | "tips">("overview");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [simulationStep, setSimulationStep] = useState<"idle" | "cloning" | "branching" | "done">("idle");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setPhraseIndex((prev) => (prev + 1) % REASSURANCE_PHRASES.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (!isOpen || !issue) return;

    const fetchGuidance = async () => {
      setLoading(true);
      setGuidance(null);
      setSimulationStep("idle");
      try {
        const response = await fetch("/api/guide-issue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            repo: repoName,
            issueTitle: issue.title,
            issueId: issue.id,
            label: issue.label
          })
        });
        const data = await response.json();
        setGuidance(data);
      } catch (e) {
        console.error("Failed to load Gemini contribution coach guidelines:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchGuidance();
  }, [isOpen, issue, repoName]);

  if (!isOpen || !issue) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 1500);
  };

  const handleRunSimulation = () => {
    setSimulationStep("cloning");
    setTimeout(() => {
      setSimulationStep("branching");
      setTimeout(() => {
        setSimulationStep("done");
        if (onCompleteSimulation) {
          onCompleteSimulation();
        }
      }, 1500);
    }, 1500);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-black border-l-4 border-zinc-900 shadow-2xl flex flex-col transform transition-transform duration-300 ease-out font-mono">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b-2 border-zinc-900 bg-black">
        <div className="flex flex-col gap-1.5 select-none">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-none text-[10px] font-mono font-black uppercase bg-[#D6FF38]/15 text-[#D6FF38] border border-[#D6FF38]/30">
              AI Coach
            </span>
            <span className="text-[10px] text-zinc-550 font-black uppercase tracking-widest">{repoName}</span>
          </div>
          <h2 className="text-base font-black text-white uppercase mt-1 line-clamp-1 font-syne tracking-tight">{issue.title}</h2>
        </div>
        <button 
          onClick={onClose}
          className="p-2.5 rounded-none bg-[#0e0e0f] border-2 border-zinc-900 text-zinc-400 hover:text-white hover:border-[#D6FF38] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-5 bg-black">
          <Loader2 className="w-12 h-12 text-[#D6FF38] animate-spin" />
          <p className="text-white text-sm font-black uppercase tracking-tight">Consulting intelligent OpenTrail engine...</p>
          <p className="text-zinc-550 text-xs font-mono max-w-xs uppercase font-bold tracking-wide">{REASSURANCE_PHRASES[phraseIndex]}</p>
        </div>
      ) : guidance ? (
        <div className="flex-grow overflow-y-auto flex flex-col bg-black">
          {/* Main tabs */}
          <div className="flex border-b border-zinc-900 bg-black/50 p-1.5 gap-1.5 select-none font-sans">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex-1 py-2.5 text-xs font-bold uppercase rounded-none transition-all flex items-center justify-center gap-2 ${
                activeTab === "overview" 
                  ? "bg-black text-[#D6FF38] border-2 border-[#D6FF38]" 
                  : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("fix")}
              className={`flex-1 py-2.5 text-xs font-bold uppercase rounded-none transition-all flex items-center justify-center gap-2 ${
                activeTab === "fix" 
                  ? "bg-black text-[#D6FF38] border-2 border-[#D6FF38]" 
                  : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              Fix Map
            </button>
            <button
              onClick={() => setActiveTab("tips")}
              className={`flex-1 py-2.5 text-xs font-bold uppercase rounded-none transition-all flex items-center justify-center gap-2 ${
                activeTab === "tips" 
                  ? "bg-black text-[#D6FF38] border-2 border-[#D6FF38]" 
                  : "text-zinc-500 hover:text-zinc-200"
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              Etiquette
            </button>
          </div>

          <div className="p-6 space-y-6 flex-1 bg-black">
            {activeTab === "overview" && (
              <div className="space-y-6 animate-fade-in font-sans">
                <div>
                  <h3 className="text-xs font-black text-[#D6FF38] uppercase tracking-widest font-mono mb-3 select-none">// Concept Insights</h3>
                  <p className="text-zinc-300 text-xs md:text-sm leading-relaxed bg-[#0e0e0f] p-5 rounded-none border-2 border-zinc-900 italic font-medium">
                    {guidance.conceptOverview}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-black text-[#D6FF38] uppercase tracking-widest font-mono mb-3 select-none">// Target Files to Inspect</h3>
                  <div className="space-y-3">
                    {guidance.suggestedFiles.map((file, i) => (
                      <div 
                        key={i} 
                        className="flex items-center justify-between bg-black p-4 rounded-none border-2 border-zinc-900 hover:border-[#D6FF38] transition-colors"
                      >
                        <div className="flex items-center gap-3.5 text-xs font-mono text-zinc-300 overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                          <FileCode className="w-4 h-4 text-[#D6FF38] flex-shrink-0" />
                          <span>{file}</span>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(file)}
                          className="text-zinc-500 hover:text-[#D6FF38] transition-colors cursor-pointer"
                          title="Copy file path"
                        >
                          {copiedText === file ? (
                            <span className="text-xs text-[#D6FF38] font-mono font-black uppercase">Copied</span>
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "fix" && (
              <div className="space-y-6 animate-fade-in font-sans">
                <div>
                  <h3 className="text-xs font-black text-[#D6FF38] uppercase tracking-widest font-mono mb-3 select-none">// Reproduction Steps</h3>
                  <ol className="space-y-3.5">
                    {guidance.reproSteps.map((step, i) => (
                      <li key={i} className="flex gap-4.5 text-xs md:text-sm text-zinc-300 bg-[#0e0e0f] p-4 rounded-none border-2 border-zinc-900">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-none bg-[#D6FF38] text-black text-xs font-mono font-black">
                          {i + 1}
                        </span>
                        <span className="font-medium">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="text-xs font-black text-[#D6FF38] uppercase tracking-widest font-mono mb-3 select-none">// Solution Strategy</h3>
                  <ul className="space-y-3.5">
                    {guidance.stepByStepFix.map((step, i) => (
                      <li key={i} className="flex gap-4.5 text-xs md:text-sm text-zinc-300 bg-[#0e0e0f] p-4 rounded-none border-l-4 border-2 border-zinc-900 border-l-[#D6FF38] font-medium">
                        <span className="text-zinc-500 font-mono select-none font-bold">#{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "tips" && (
              <div className="space-y-6 animate-fade-in font-sans">
                <div className="bg-[#D6FF38]/5 border-2 border-zinc-900 p-6 rounded-none flex gap-4">
                  <Lightbulb className="w-5 h-5 text-[#D6FF38] flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">Onboarding Best Practice</h4>
                    <p className="text-xs text-zinc-450 leading-relaxed font-semibold">
                      {guidance.tipsForNewcomers}
                    </p>
                  </div>
                </div>

                <div className="bg-[#0e0e0f] rounded-none p-6 border-2 border-zinc-900 space-y-4">
                  <h4 className="text-sm font-black text-white uppercase tracking-tight">// Fast Git Branching Checklist</h4>
                  <div className="space-y-3.5 text-xs font-mono">
                    <div className="p-3.5 rounded-none bg-black border-2 border-zinc-900 flex justify-between items-center group">
                      <span className="text-zinc-300 font-medium">git checkout -b fix/issue-{issue.id}</span>
                      <button 
                        onClick={() => copyToClipboard(`git checkout -b fix/issue-${issue.id}`)} 
                        className="text-zinc-500 hover:text-[#D6FF38] transition-colors cursor-pointer"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-3.5 rounded-none bg-black border-2 border-zinc-900 flex justify-between items-center group">
                      <span className="text-zinc-300 font-medium">git commit -m &quot;onboarding: solve #{issue.id}&quot;</span>
                      <button 
                        onClick={() => copyToClipboard(`git commit -m "onboarding: solve #${issue.id}"`)} 
                        className="text-zinc-500 hover:text-[#D6FF38] transition-colors cursor-pointer"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Simulate Action bottom drawer */}
          <div className="p-6 bg-[#0e0e0f] border-t-2 border-zinc-900 space-y-4 font-sans select-none">
            <div className="flex justify-between items-center text-xs font-mono uppercase font-black">
              <span className="text-zinc-500 tracking-wider font-bold">// Stage Simulator</span>
              {simulationStep === "done" ? (
                <span className="text-[#D6FF38] font-black flex items-center gap-1">
                  <Check className="w-4 h-4" /> Ready to submit!
                </span>
              ) : (
                <span className="text-zinc-650 font-black">Not started</span>
              )}
            </div>

            {simulationStep === "idle" && (
              <button
                onClick={handleRunSimulation}
                className="brutalist-btn-accent w-full py-4 text-xs font-black uppercase flex items-center justify-center gap-2"
              >
                <GitPullRequest className="w-4 h-4" />
                Simulate Contribution Locally
              </button>
            )}

            {simulationStep === "cloning" && (
              <button disabled className="w-full py-4 bg-[#131315] text-zinc-500 rounded-none border-2 border-zinc-900 text-xs font-bold uppercase flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#D6FF38]" />
                Cloning virtual remote source...
              </button>
            )}

            {simulationStep === "branching" && (
              <button disabled className="w-full py-4 bg-[#131315] text-zinc-500 rounded-none border-2 border-zinc-900 text-xs font-bold uppercase flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#D6FF38]" />
                Checking out branch &apos;fix/issue-{issue.id}&apos;...
              </button>
            )}

            {simulationStep === "done" && (
              <div className="space-y-3.5">
                <div className="bg-[#D6FF38]/10 border-2 border-zinc-900 text-zinc-200 p-4 rounded-none text-xs text-center font-semibold">
                  Successfully simulated staging checks! Progress has been registered for this repository on your learner profile.
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-3.5 bg-black hover:bg-[#131315] text-zinc-300 border-2 border-zinc-805 hover:border-[#D6FF38] rounded-none text-xs font-bold uppercase transition-colors tracking-widest cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black text-center text-zinc-500">
          <Lightbulb className="w-12 h-12 mb-3 stroke-1 text-[#D6FF38] mx-auto opacity-70" />
          <p className="text-xs uppercase font-mono font-bold font-black tracking-widest">Unable to retrieve content recommendations.</p>
        </div>
      )}
    </div>
  );
}
