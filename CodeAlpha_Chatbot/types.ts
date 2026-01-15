
export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  // Added sources property to store grounding metadata
  sources?: any[];
}

export type ViewState = 'splash' | 'home' | 'chat';

export interface ThemeProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
