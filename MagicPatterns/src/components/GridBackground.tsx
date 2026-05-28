import React from 'react';
export function GridBackground({ children }: {children: React.ReactNode;}) {
  return (
    <div className="relative w-full min-h-screen bg-[#e8e8e8] font-sans">
      {/* Fixed Background Container */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Subtle Grid Overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
            'linear-gradient(to right, #d4d4d4 1px, transparent 1px), linear-gradient(to bottom, #d4d4d4 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }} />
        
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>
    </div>);

}