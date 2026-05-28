import { RefreshCw, Bell } from "lucide-react";

interface HeaderProps {
  onNavigateToLanding: () => void;
  isSyncing: boolean;
  onSync: () => void;
}

export function Header({ onNavigateToLanding, isSyncing, onSync }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-6 md:px-8 bg-card backdrop-blur-md border-b-2 border-zinc-900">
      <div className="flex items-center gap-3 cursor-pointer select-none" onClick={onNavigateToLanding}>
        <div className="flex items-center justify-center w-8 h-8 border border-black bg-[#D6FF38] text-black font-mono font-black text-base tracking-tight transition-transform hover:scale-115">
          O
        </div>
        <span className="text-xl font-black text-white tracking-tighter uppercase font-syne">OpenTrail</span>
      </div>

      <div className="flex items-center gap-5">
        <button 
          onClick={onSync}
          disabled={isSyncing}
          className={`text-zinc-400 hover:text-[#D6FF38] transition-colors focus:outline-none ${isSyncing ? 'animate-spin' : ''} cursor-pointer`}
          title="Sync repository status"
        >
          <RefreshCw className="w-5 h-5" />
        </button>

        <button className="text-zinc-400 hover:text-[#D6FF38] relative transition-colors cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#D6FF38] border border-black rounded-full animate-ping"></span>
        </button>

        <div className="h-8 w-8 overflow-hidden border-2 border-zinc-800 hover:border-[#D6FF38] transition-colors cursor-pointer rounded-none">
          <img 
            alt="User profile" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUPH7cdILWPfAN6iUfzWrJiNsFqLYucs9M5p1d4QbKPhG9UNyYWUNemtdLxIeC5dUhYgoWS7oi6b633h5DNbiumABf3_aNpu5YD8wG5SH8e_S5yrpxW0GlrbQCMGYq6Gm446Vv72dsgXaQD3jFLcPZvtdyzhvO5-1Ceovb40dyFQYs4C_oR0HlJhhVs1XY7CgRf0ERnWmUCfglkl97VS9O4L1AknPQ18K0ElZGnnIWOMNWUy0xPWFP8JDNNHpCES1llRC6oIchn24P"
          />
        </div>
      </div>
    </header>
  );
}
