
import React, { useState, useRef } from 'react';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const LOFI_STREAM = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) { audioRef.current.pause(); } 
      else { audioRef.current.play().catch(e => console.error(e)); }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-slate-900 border border-white/5 rounded-xl p-3 flex items-center justify-between shadow-lg">
      <audio ref={audioRef} src={LOFI_STREAM} loop />
      <div className="flex items-center gap-2">
        <div className={`w-6 h-6 rounded-md bg-sky-500/20 flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
           <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="3"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
        </div>
        <div>
          <p className="text-white text-[9px] font-black uppercase tracking-widest">Focus Lofi</p>
          <p className="text-sky-400 text-[7px] font-bold">{isPlaying ? 'ON' : 'OFF'}</p>
        </div>
      </div>
      <button onClick={togglePlay} className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
        {isPlaying ? <div className="w-1.5 h-1.5 bg-white rounded-sm" /> : <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>}
      </button>
    </div>
  );
};
