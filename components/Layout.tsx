import React from 'react';
import { Zap } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-neon-dark text-white font-sans overflow-x-hidden relative selection:bg-neon-pink selection:text-white">
      {/* Background Grid Decoration */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#00ffff 1px, transparent 1px), linear-gradient(90deg, #00ffff 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}>
      </div>
      
      {/* Glow Orbs */}
      <div className="fixed top-[-100px] left-[-100px] w-64 h-64 bg-neon-purple rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
      <div className="fixed bottom-[-100px] right-[-100px] w-80 h-80 bg-neon-cyan rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-neon-dark/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-neon-pink p-1.5 rounded-lg shadow-[0_0_10px_#ff00ff]">
            <Zap size={20} className="text-white" fill="currentColor" />
          </div>
          <span className="text-xl font-display font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-pink">
            Ur-Vibe
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-24 px-4 max-w-md mx-auto min-h-screen flex flex-col">
        {children}
      </main>
    </div>
  );
};