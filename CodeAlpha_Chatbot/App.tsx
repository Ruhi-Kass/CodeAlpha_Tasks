
import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import { Splash } from './views/Splash';
import { Home } from './views/Home';
import { Chat } from './views/Chat';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('splash');
  const [theme, setTheme] = useState<'sky' | 'midnight' | 'emerald'>('sky');
  const [initialSearch, setInitialSearch] = useState('');
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('nous_user_name') || 'Friend';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('nous_dark_mode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('nous_user_name', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('nous_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const themeClasses = {
    sky: isDarkMode ? 'bg-sky-950' : 'bg-sky-500',
    midnight: 'bg-slate-950',
    emerald: isDarkMode ? 'bg-emerald-950' : 'bg-emerald-700',
  };

  const handleSearchTrigger = (query: string) => {
    setInitialSearch(query);
    setView('chat');
  };

  const renderView = () => {
    switch (view) {
      case 'splash':
        return <Splash
          onStart={() => setView('home')}
          userName={userName}
          setUserName={setUserName}
        />;
      case 'home':
        return <Home
          userName={userName}
          onGoToChat={() => setView('chat')}
          onSearch={handleSearchTrigger}
          onBack={() => setView('splash')}
          theme={theme}
          setTheme={setTheme}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          setUserName={setUserName}
        />;
      case 'chat':
        return <Chat
          userName={userName}
          setUserName={setUserName}
          initialQuery={initialSearch}
          onBack={() => {
            setInitialSearch('');
            setView('home');
          }}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />;
      default:
        return <Splash
          onStart={() => setView('home')}
          userName={userName}
          setUserName={setUserName}
        />;
    }
  };

  const isChatView = view === 'chat';

  return (
    <div className={`w-full flex flex-col transition-colors duration-700 ${themeClasses[theme]} relative ${isChatView ? 'h-screen overflow-hidden' : 'min-h-screen'} ${isDarkMode ? 'dark' : ''}`}>
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1.5px, transparent 0)', backgroundSize: '40px 40px' }}></div>

      {/* Main Container */}
      <main className={`flex-1 w-full relative flex flex-col ${isChatView ? 'h-full overflow-hidden' : ''}`}>
        {renderView()}
      </main>

      {/* Floating Brand Label (Desktop only) */}
      <div className="hidden lg:block fixed top-8 right-10 text-white/10 select-none pointer-events-none">
        <h1 className="text-4xl font-black tracking-tighter uppercase">NOUS.BOT</h1>
      </div>
    </div>
  );
};

export default App;
