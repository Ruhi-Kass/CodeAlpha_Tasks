
import React from 'react';
import { BotIcon } from '../components/BotIcon';

interface SplashProps {
  onStart: () => void;
  userName: string;
  setUserName: (name: string) => void;
}

export const Splash: React.FC<SplashProps> = ({ onStart, userName, setUserName }) => {
  return (
    <div className="min-h-screen bg-sky-500 flex flex-col items-center justify-center p-4 text-white text-center">
      <div className="relative mb-6 md:mb-8 animate-bounce">
         <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-white text-sky-500 rounded-full p-1 shadow-md">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
         </div>
         <BotIcon size={100} className="md:w-[120px] md:h-[120px]" />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">Nous FAQ</h1>
      <p className="text-sky-100 text-xs md:text-sm mb-6 max-w-[280px] md:max-w-xs leading-relaxed font-medium">
        Your high-performance companion for programming, debugging, and architectural advice.
      </p>

      <div className="mb-8 w-full max-w-xs">
        <label className="text-[10px] font-black uppercase tracking-widest text-sky-200 mb-2 block">What should I call you?</label>
        <input 
          type="text" 
          value={userName === 'Friend' ? '' : userName}
          onChange={(e) => setUserName(e.target.value || 'Friend')}
          placeholder="Enter your name..."
          className="w-full bg-white/10 border-2 border-white/20 rounded-2xl py-3 px-6 text-white placeholder:text-white/40 focus:bg-white/20 focus:border-white/40 outline-none transition-all text-center font-bold"
        />
      </div>
      
      <button 
        onClick={onStart}
        className="bg-white text-sky-600 font-black py-3 px-8 md:px-10 rounded-full shadow-xl hover:bg-sky-50 transition-all transform active:scale-95 mb-8 uppercase tracking-widest text-xs"
      >
        Start Asking
      </button>

      <div className="flex gap-3">
        <button 
          onClick={onStart}
          className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm hover:bg-white/40 transition-all active:scale-90"
        >
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
             <circle cx="12" cy="12" r="3"/>
             <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
           </svg>
        </button>
        <button 
          onClick={onStart}
          className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm hover:bg-white/40 transition-all active:scale-90"
        >
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
             <circle cx="11" cy="11" r="8"/>
             <line x1="21" y1="21" x2="16.65" y2="16.65"/>
           </svg>
        </button>
      </div>
    </div>
  );
};
