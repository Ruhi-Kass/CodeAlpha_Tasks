
import React, { useState, useMemo } from 'react';
import { BotIcon } from '../components/BotIcon';
import { FAQ_DATA } from '../constants';
import { ThemeProps } from '../types';

interface HomeProps extends ThemeProps {
  userName: string;
  setUserName: (name: string) => void;
  onGoToChat: () => void;
  onSearch: (query: string) => void;
  onBack: () => void;
  theme: 'sky' | 'midnight' | 'emerald';
  setTheme: (t: 'sky' | 'midnight' | 'emerald') => void;
}

const FAQAccordion: React.FC<{ question: string; answer: string; isDarkMode: boolean }> = ({ question, answer, isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b ${isDarkMode ? 'border-slate-700' : 'border-gray-100'} last:border-0`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full py-4 px-6 flex justify-between items-center text-left transition-colors group ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}
      >
        <span className={`font-bold transition-colors text-sm md:text-base pr-4 ${isDarkMode ? 'text-slate-200 group-hover:text-sky-400' : 'text-gray-700 group-hover:text-sky-600'}`}>
          {question}
        </span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" height="18" 
          viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" strokeWidth="3" 
          strokeLinecap="round" strokeLinejoin="round"
          className={`transition-transform duration-300 flex-shrink-0 ${isDarkMode ? 'text-slate-600' : 'text-gray-300'} ${isOpen ? 'rotate-180 text-sky-500' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
        <p className={`mx-6 mb-4 leading-relaxed p-4 rounded-xl border text-xs md:text-sm ${isDarkMode ? 'bg-slate-900/50 text-slate-400 border-slate-700' : 'bg-slate-50 text-gray-600 border-gray-100'}`}>
          {answer}
        </p>
      </div>
    </div>
  );
};

export const Home: React.FC<HomeProps> = ({ userName, setUserName, onGoToChat, onSearch, onBack, theme, setTheme, isDarkMode, toggleDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const filteredFAQs = useMemo(() => {
    if (!searchQuery) return FAQ_DATA;
    return FAQ_DATA.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const saveName = () => {
    setUserName(tempName.trim() || 'Friend');
    setIsEditingName(false);
  };

  return (
    <div className={`flex-1 flex flex-col h-full relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50/50'}`}>
      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-32">
        {/* Decorative background element */}
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] -z-10 ${isDarkMode ? 'bg-sky-900/10' : 'bg-sky-400/5'}`}></div>
        
        <div className="max-w-xl mx-auto px-6 py-12 md:py-20 space-y-12 w-full">
          {/* Top Row */}
          <div className="flex items-center justify-between">
            <button 
              onClick={onBack}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl shadow-sm border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-sky-500' : 'bg-white border-gray-100 text-gray-600 hover:border-sky-300'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"/></svg>
              <span className="text-[10px] font-black uppercase tracking-widest">Back</span>
            </button>

            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-xl transition-all shadow-sm border ${isDarkMode ? 'bg-slate-900 border-slate-700 text-yellow-400' : 'bg-white border-gray-100 text-slate-400'}`}
              >
                {isDarkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                )}
              </button>

              <div className={`flex p-1 rounded-xl shadow-sm border gap-1 ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-100'}`}>
                {(['sky', 'midnight', 'emerald'] as const).map(t => (
                  <button 
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`w-6 h-6 rounded-lg transition-all ${t === 'sky' ? 'bg-sky-500' : t === 'midnight' ? 'bg-slate-900' : 'bg-emerald-600'} ${theme === t ? 'ring-2 ring-white ring-offset-2 scale-110' : 'opacity-30'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="flex flex-col items-center text-center gap-6">
            <div className="relative group animate-pulse-slow">
              <BotIcon size={100} className="relative transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-950 shadow-md"></div>
            </div>
            <div className="space-y-3">
              {isEditingName ? (
                <div className="flex items-center justify-center gap-2">
                  <input 
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveName()}
                    autoFocus
                    className={`text-2xl md:text-4xl font-black tracking-tight leading-none text-center bg-transparent border-b-4 border-sky-500 outline-none max-w-[200px] ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                  />
                  <button onClick={saveName} className="p-2 bg-sky-500 text-white rounded-xl shadow-lg hover:scale-105 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </button>
                </div>
              ) : (
                <h1 className={`text-4xl md:text-6xl font-black tracking-tight leading-none flex items-center justify-center gap-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Hey, <span className="text-sky-500">{userName}!</span>
                  <button onClick={() => setIsEditingName(true)} className={`p-2 rounded-lg hover:bg-sky-50 transition-all ${isDarkMode ? 'hover:bg-sky-900/30 text-slate-600' : 'text-slate-300'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                </h1>
              )}
              <p className={`text-sm md:text-base font-medium max-w-xs mx-auto ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                What are we building today? Search the web or chat with me live.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <form onSubmit={handleSearchSubmit} className="relative group">
              <input 
                type="text"
                placeholder="Search web or core knowledge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full rounded-2xl py-5 pl-14 pr-6 text-base font-bold shadow-xl border-2 outline-none transition-all placeholder:text-gray-300 ${isDarkMode ? 'bg-slate-900 text-white border-slate-800 focus:border-sky-500 shadow-sky-900/10' : 'bg-white text-gray-800 border-transparent focus:border-sky-400 shadow-sky-100/30'}`}
              />
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 text-sky-400 w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </form>
          </div>

          {/* FAQ List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className={`text-[10px] font-black tracking-widest uppercase ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>Documentation</h3>
              <span className="text-[9px] font-bold text-sky-500 bg-sky-50 dark:bg-sky-900/20 px-2 py-1 rounded-lg uppercase">{filteredFAQs.length} Items</span>
            </div>
            <div className={`rounded-3xl shadow-sm border overflow-hidden transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, idx) => (
                  <FAQAccordion key={idx} question={faq.question} answer={faq.answer} isDarkMode={isDarkMode} />
                ))
              ) : (
                <div className={`p-12 text-center text-sm italic ${isDarkMode ? 'text-slate-600' : 'text-gray-400'}`}>No entries match your search.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Bar - Fixed position */}
      <div className={`border-t py-3 px-10 flex justify-between items-center fixed bottom-0 left-0 right-0 z-50 transition-colors ${isDarkMode ? 'bg-slate-900/95 border-slate-800 backdrop-blur-md' : 'bg-white/95 border-gray-100 backdrop-blur-md'}`}>
        <button className="flex flex-col items-center gap-1 text-sky-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9.5L12 4l9 5.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z"/></svg>
          <span className="text-[8px] font-black uppercase tracking-widest">Explore</span>
        </button>
        
        <button 
          onClick={onGoToChat}
          className="bg-sky-500 text-white w-16 h-16 rounded-3xl shadow-2xl shadow-sky-300 -mt-12 flex items-center justify-center border-[6px] border-white dark:border-slate-900 hover:scale-105 active:scale-95 transition-all"
        >
          <BotIcon size={32} />
        </button>

        <button onClick={onGoToChat} className="flex flex-col items-center gap-1 transition-colors text-gray-300 hover:text-sky-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span className="text-[8px] font-black uppercase tracking-widest">Chat</span>
        </button>
      </div>
    </div>
  );
};
