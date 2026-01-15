
import { GoogleGenAI } from "@google/genai";
import { Message } from '../types';

const ENV_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || import.meta.env.VITE_API_KEY; // Support both naming conventions
// We determine provider dynamically based on key, but allow override
const DEFAULT_PROVIDER = 'auto';

export async function getLLMResponse(
  userQuery: string,
  chatHistory: Message[] = []
): Promise<{ text: string; sources?: any[] }> {

  // 1. Resolve API Key (Env -> LocalStorage)
  const apiKey = ENV_API_KEY || localStorage.getItem('nous_api_key');

  if (!apiKey) {
    throw new Error('API key is missing. Please enter it in the app settings or .env.local.');
  }

  // 2. Detect Provider
  const isGoogleKey = apiKey.startsWith('AIza');

  if (isGoogleKey) {
    return getGeminiResponse(apiKey, userQuery, chatHistory);
  } else {
    return getDeepSeekResponse(apiKey, userQuery, chatHistory);
  }
}

async function getGeminiResponse(apiKey: string, query: string, history: Message[]) {
  try {
    const ai = new GoogleGenAI({ apiKey });

    // Construct prompt with history
    const contents = [
      { role: 'user', parts: [{ text: "System: You are Nous Bot, a helpful technical assistant." }] },
      ...history.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      })),
      { role: 'user', parts: [{ text: query }] }
    ];

    const result = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: contents as any
    });

    const responseText = result.text ? result.text : (result.candidates?.[0]?.content?.parts?.[0]?.text || "");

    return {
      text: responseText,
      sources: []
    };
  } catch (error: any) {
    console.error("Gemini Error:", error);
    throw new Error(`Gemini API Error: ${error.message}`);
  }
}

async function getDeepSeekResponse(apiKey: string, query: string, history: Message[]) {
  try {
    const messages = [
      {
        role: "system",
        content: "You are Nous Bot, a precise and knowledgeable technical assistant for developers. Answer concisely, accurately, and practically. Use markdown for code blocks, explain concepts clearly, and cite sources when relevant."
      },
      ...history.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: "user", content: query }
    ];

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature: 0.7,
        max_tokens: 2048,
        stream: false
      })
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      let friendlyError = `API Error (${response.status})`;

      if (response.status === 429) friendlyError = 'Rate limit reached — please wait a moment.';
      if (response.status === 401) friendlyError = 'Invalid API key. Please check your key.';
      if (response.status === 402) friendlyError = 'Insufficient Balance. Please top up your DeepSeek account.';
      if (response.status === 503) friendlyError = 'Service temporarily unavailable.';

      throw new Error(friendlyError);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim() || "No response received.";

    return {
      text: content,
      sources: []
    };

  } catch (err: any) {
    console.error('LLM request failed:', err);
    throw err;
  }
}