# Nous Bot: Technical Knowledge Base & Assistant

Nous Bot is a high-performance FAQ and technical assistant designed for developers and power users. It combines a structured internal knowledge base with real-time web retrieval to provide accurate, contextual answers to technical queries.



## 🚀 What it is & How it works

Nous Bot acts as a bridge between static documentation and interactive troubleshooting. 

1.  **Retrieval**: When you ask a question, the system first consults a pre-loaded "Technical Core" containing curated FAQs on JavaScript, React, TypeScript, and more.
2.  **Web Grounding**: If the internal core doesn't contain the answer, the bot intelligently searches the web to find up-to-date documentation and news.
3.  **Synthesis**: It processes the gathered information to provide a human-like response, complete with code examples and verified source links.

## ✨ Key Features

- **Technical Core Documentation**: A searchable library of frequently asked questions regarding modern web development and system architecture.
- **Live Interactive Chat**: A conversational terminal for deep-diving into complex problems beyond the static FAQ.
- **Advanced Code Rendering**: Native support for Markdown and code blocks with syntax highlighting and one-click copy functionality.
- **Grounding Sources**: Transparent responses that include links to the original documentation or websites used to verify the information.
- **Personalized UI**: Remembers your name and preferences across sessions using local storage.

## 🛠️ Additional Features

- **Dark Mode Support**: A fully responsive theme system with a dedicated Dark Mode toggle for long-night coding sessions.
- **Triple-Theme System**: Switch between **Sky** (Professional), **Midnight** (OLED Black), and **Emerald** (Eco) visual styles.
- **Mobile-First Design**: A high-fidelity, fluid interface designed to feel like a native app on any device.

## � Tech Stack

- **Frontend**: React 19 (Modern ES6+ Architecture)
- **Styling**: Tailwind CSS (Utility-first responsive layout)
- **Intelligence**: Integrated via the Google GenAI SDK and DeepSeek API for retrieval and synthesis.

## ⚙️ Setup

To use the live features, ensure an API key is provided via the environment variables (`process.env.API_KEY`). The application will gracefully handle missing keys by prompting for setup.

---
*Nous Bot — Efficiency through conversational logic.*
