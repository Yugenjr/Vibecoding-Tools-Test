import { useState } from "react";
import { Header } from "./components/Header";
import { LandingView } from "./components/LandingView";
import { DashboardView } from "./components/DashboardView";
import { CoachDrawer } from "./components/CoachDrawer";
import { INITIAL_LEARNING_MODULES, INITIAL_SKILLS, QUICK_REFERENCES } from "./data/mockData";
import { Issue } from "./types";
import { Check } from "lucide-react";

export default function App() {
  // Navigation: "landing" | "dashboard"
  const [currentScreen, setCurrentScreen] = useState<"landing" | "dashboard">("landing");

  // Sync animation state
  const [isSyncing, setIsSyncing] = useState(false);

  // Coach drawer state
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<string>("facebook/react");
  const [isCoachOpen, setIsCoachOpen] = useState(false);

  // Success Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectIssue = (issue: Issue, repoName: string) => {
    setSelectedIssue(issue);
    setSelectedRepo(repoName);
    setIsCoachOpen(true);
  };

  const handleSyncStatus = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast("Repository health status and active newcomer issues successfully synchronized!");
    }, 1500);
  };

  const handleSimulatedStagingComplete = () => {
    showToast(`Staging verified! simulated Git check ins succeeded for isssue #${selectedIssue?.id}!`);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans select-none overflow-x-hidden">
      
      {/* Dynamic Main view rendering */}
      {currentScreen === "landing" ? (
        <LandingView 
          onSignIn={() => {
            setCurrentScreen("dashboard");
            showToast("Successfully authenticated via GitHub Developer token!");
          }}
          onSelectIssue={handleSelectIssue}
        />
      ) : (
        <div className="min-h-screen flex flex-col w-full">
          {/* Dashboard top header */}
          <Header 
            onNavigateToLanding={() => setCurrentScreen("landing")}
            isSyncing={isSyncing}
            onSync={handleSyncStatus}
          />
          
          <DashboardView 
            initialModules={INITIAL_LEARNING_MODULES}
            initialSkills={INITIAL_SKILLS}
            quickReferences={QUICK_REFERENCES}
            onSelectIssue={handleSelectIssue}
            onGoBack={() => {
              setCurrentScreen("landing");
              showToast("Returned to OpenTrail product homepage.");
            }}
          />
        </div>
      )}

      {/* sliding terminal Coach drawer */}
      <CoachDrawer 
        isOpen={isCoachOpen}
        onClose={() => setIsCoachOpen(false)}
        issue={selectedIssue}
        repoName={selectedRepo}
        onCompleteSimulation={handleSimulatedStagingComplete}
      />

      {/* Floating success toast notifier */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-zinc-900 border border-zinc-850 px-5 py-3.5 rounded-lg shadow-2xl animate-fade-in text-xs font-mono max-w-sm">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <Check className="w-3.5 h-3.5" />
          </div>
          <p className="text-zinc-200 font-sans leading-tight">
            {toastMessage}
          </p>
        </div>
      )}

    </div>
  );
}
