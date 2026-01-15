import React, { useState, useRef, useEffect } from 'react';
import { BotIcon } from '../components/BotIcon';
import { Message, ThemeProps } from '../types';
import { getLLMResponse } from '../services/llmService';

// Tell TypeScript crypto.randomUUID exists (fixes TS error)
declare const crypto: { randomUUID: () => string };

const ApiKeyModal: React.FC<{
  isOpen: boolean;
  onSave: (key: string) => void;
  isDarkMode: boolean;
}> = ({ isOpen, onSave, isDarkMode }) => {
  const [key, setKey] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className={`w-full max-w-md p-6 rounded-3xl shadow-2xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-100'}`}>
        <div className="flex flex-col items-center text-center gap-4">
          <div className={`p-4 rounded-full ${isDarkMode ? 'bg-sky-900/20' : 'bg-sky-50'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-500">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>API Key Required</h2>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Enter your API key to enable AI responses.<br />
            Stored only locally on your device.
          </p>
          <input
            type="password"
            placeholder="Paste your API key here..."
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className={`w-full p-4 rounded-xl font-mono text-sm border-2 outline-none transition-all ${isDarkMode ? 'bg-slate-950 border-slate-800 focus:border-sky-500 text-white' : 'bg-slate-50 border-gray-200 focus:border-sky-500 text-gray-900'}`}
          />
          <button
            onClick={() => { if (key.trim()) onSave(key.trim()); }}
            disabled={!key.trim()}
            className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Connect API
          </button>
          <p className="text-[10px] text-slate-500 mt-2">
            Get your key from DeepSeek / Groq / your provider
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Your SyntaxHighlighter (unchanged but safe) ──
const SyntaxHighlighter: React.FC<{ code: string; lang?: string; isDarkMode: boolean }> = ({ code, lang, isDarkMode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlight = (text: string) => {
    return text
      .replace(/(\/\/.*|\/\*[\s\S]*?\*\/)/g, m => `<span class="${isDarkMode ? 'text-slate-500 italic' : 'text-slate-400 italic'}">${m}</span>`)
      .replace(/("([^"\\]|\\.)*"|'([^'\\]|\\.)*')/g, m => `<span class="text-emerald-400">${m}</span>`)
      .replace(/\b(const|let|var|function|return|if|else|for|while|import|export|from|class|extends|interface|type|async|await|new|this|throw|try|catch|finally)\b/g, m => `<span class="text-sky-400 font-bold">${m}</span>`)
      .replace(/\b(\d+)\b/g, m => `<span class="text-orange-400">${m}</span>`);
  };

  return (
    <div className={`my-4 rounded-2xl overflow-hidden border relative group ${isDarkMode ? 'bg-slate-950 border-white/5' : 'bg-slate-50 border-gray-200'}`}>
      <div className="flex items-center justify-between px-4 py-2 bg-black/10 border-b border-black/10">
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{lang || 'code'}</span>
        <button
          onClick={handleCopy}
          className="text-[9px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors flex items-center gap-1.5"
        >
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
      <div className="p-4 overflow-x-auto custom-scrollbar font-mono text-xs leading-relaxed">
        <code
          className="block whitespace-pre text-slate-200"
          dangerouslySetInnerHTML={{ __html: highlight(code) }}
        />
      </div>
    </div>
  );
};

// ── MessageContent with safe sources handling ──
const MessageContent: React.FC<{ text: string; sources?: any[]; isDarkMode: boolean }> = ({ text, sources, isDarkMode }) => {
  const parts = text.split(/(```[\s\S]*?```|`.*?`)/g);

  return (
    <div className="space-y-3">
      <div className={`whitespace-pre-wrap break-words leading-relaxed text-sm md:text-base ${isDarkMode ? 'text-slate-200' : 'text-gray-800'}`}>
        {parts.map((part, i) => {
          if (part.startsWith('```')) {
            const match = part.match(/```(\w+)?\n?([\s\S]*?)```/);
            const lang = match?.[1] || '';
            const code = match?.[2]?.trim() || '';
            return <SyntaxHighlighter key={i} code={code} lang={lang} isDarkMode={isDarkMode} />;
          }
          if (part.startsWith('`') && part.endsWith('`')) {
            return (
              <code key={i} className={`px-1.5 py-0.5 rounded font-mono font-bold text-xs ${isDarkMode ? 'bg-slate-800 text-sky-300' : 'bg-sky-50 text-sky-700'}`}>
                {part.slice(1, -1)}
              </code>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </div>

      {Array.isArray(sources) && sources.length > 0 && (
        <div className={`mt-4 pt-3 border-t text-xs ${isDarkMode ? 'border-slate-700 text-slate-400' : 'border-gray-200 text-gray-600'}`}>
          Sources:{' '}
          {sources.map((s, i) => (
            <a
              key={i}
              href={s?.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:underline mx-1"
            >
              [{i + 1}]
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

interface ChatProps extends ThemeProps {
  userName: string;
  setUserName: (name: string) => void;
  initialQuery?: string;
  onBack: () => void;
}

export const Chat: React.FC<ChatProps> = ({
  userName,
  setUserName,
  initialQuery,
  onBack,
  isDarkMode,
  toggleDarkMode,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  // Check API key once on mount
  useEffect(() => {
    const envKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
    const storedKey = localStorage.getItem('nous_api_key');

    if (!envKey && !storedKey) {
      setShowApiKeyModal(true);
    }
  }, []);

  // Initial greeting + handle initial query (only once)
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const greeting = userName !== 'Friend'
      ? `Hello ${userName}, I'm Nous Bot! How can I help you today?`
      : "Hello! I'm Nous Bot — your technical assistant. What's on your mind?";

    setMessages([{
      id: crypto.randomUUID(),
      text: greeting,
      sender: 'bot',
      timestamp: new Date(),
    }]);

    if (initialQuery?.trim()) {
      setInputValue(initialQuery.trim());
      handleSend(initialQuery.trim());
    }
  }, [userName, initialQuery]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  const handleSaveKey = (key: string) => {
    localStorage.setItem('nous_api_key', key);
    setShowApiKeyModal(false);
    window.location.reload(); // Reload to make sure env/localStorage is fresh
  };

  const handleSend = async (overrideQuery?: string) => {
    const query = overrideQuery || inputValue.trim();
    if (!query || isTyping) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: query,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const result = await getLLMResponse(query, messages);

      // Safely handle sources (make sure it's always array or undefined)
      const safeSources = Array.isArray(result.sources) ? result.sources : undefined;

      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        text: result.text || "No response received from AI",
        sources: safeSources,
        sender: 'bot',
        timestamp: new Date(),
      }]);
    } catch (err: any) {
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        text: `**Connection Error**\n\n${err?.message || 'Failed to reach AI service'}\n\nCheck your API key in .env.local or localStorage.`,
        sender: 'bot',
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`flex flex-col h-full overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
      {/* HEADER */}
      <div className={`border-b py-4 px-6 flex items-center justify-between sticky top-0 z-30 transition-colors ${isDarkMode ? 'bg-slate-900/80 border-slate-800 backdrop-blur-md' : 'bg-white/80 border-gray-100 backdrop-blur-md'}`}>
        <button
          onClick={onBack}
          title="Go back"
          className={`p-2 rounded-xl transition-all active:scale-90 ${isDarkMode ? 'hover:bg-slate-800 text-slate-500 hover:text-sky-400' : 'hover:bg-gray-50 text-gray-400 hover:text-sky-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-sky-900/20' : 'bg-sky-50'}`}>
            <BotIcon size={18} />
          </div>
          <div className="flex flex-col">
            <h2 className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>Technical Core</h2>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
              <span className={`text-[8px] font-bold uppercase tracking-tighter ${isDarkMode ? 'text-slate-600' : 'text-gray-400'}`}>Live</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-xl transition-all active:scale-90 ${isDarkMode ? 'hover:bg-slate-800 text-yellow-400' : 'hover:bg-gray-50 text-slate-400'}`}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* MESSAGES */}
      <div ref={scrollRef} className={`flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar transition-colors ${isDarkMode ? 'bg-slate-900/40' : 'bg-slate-50/20'}`}>
        <div className="max-w-2xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] md:max-w-[80%] px-5 py-4 rounded-3xl shadow-sm border ${
                msg.sender === 'user'
                  ? 'bg-sky-600 text-white border-sky-500 rounded-tr-none'
                  : `${isDarkMode ? 'bg-slate-900 border-slate-800 rounded-tl-none' : 'bg-white border-gray-100 rounded-tl-none'}`
              }`}>
                <MessageContent text={msg.text} sources={msg.sources} isDarkMode={isDarkMode} />
                <p className={`text-[8px] mt-2 font-black uppercase opacity-40 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2">
              <div className={`px-4 py-2 rounded-2xl border shadow-sm flex gap-1.5 items-center ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
                <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* INPUT BAR */}
      <div className={`p-6 border-t transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'}`}>
        <div className="max-w-2xl mx-auto">
          <div className={`flex gap-3 p-2 pl-5 rounded-2xl border-2 transition-all shadow-sm ${isDarkMode ? 'bg-slate-950 border-slate-800 focus-within:border-sky-500 focus-within:bg-slate-900' : 'bg-slate-50 border-transparent focus-within:border-sky-400 focus-within:bg-white'}`}>
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className={`flex-1 bg-transparent py-2 outline-none text-sm font-bold transition-colors ${isDarkMode ? 'text-slate-100 placeholder:text-slate-600' : 'text-gray-700 placeholder:text-gray-300'}`}
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isTyping}
              className="w-11 h-11 bg-sky-600 text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-sky-700 transition-all active:scale-95 disabled:opacity-20 disabled:grayscale"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polyline points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ApiKeyModal
        isOpen={showApiKeyModal}
        onSave={handleSaveKey}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};