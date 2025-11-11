import React, { useState, useEffect, useRef } from 'react';
import { Header, SendIcon, MarkdownRenderer } from './ui';
import type { ChatMessage } from '../types';
import { startChat, continueChat } from '../services/geminiService';

interface AssistantProps {
  onBack: () => void;
}

const Assistant: React.FC<AssistantProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Bonjour, je suis David, votre consultant IA pour la conformité de la facturation électronique 2026. Comment puis-je vous aider ?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage, { role: 'thinking', content: ''}]);
    setInput('');
    setIsLoading(true);

    const response = await continueChat(input);
    const modelMessage: ChatMessage = { role: 'model', content: response };
    
    setMessages(prev => [...prev.slice(0,-1), modelMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex h-full flex-col bg-slate-50">
      <Header title="Assistant IA 'David'" onBack={onBack} showMore />
      <main className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
            {messages.map((msg, index) => (
                <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'model' && <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-violet-600">D</div>}
                    {msg.role === 'thinking' ? (
                        <div className="bg-white text-slate-800 rounded-2xl p-3 max-w-xs shadow-sm">
                           <div className="flex items-center space-x-1">
                             <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]"></span>
                             <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]"></span>
                             <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></span>
                           </div>
                        </div>
                    ) : (
                        <div className={`rounded-2xl p-3 max-w-xs shadow-sm ${msg.role === 'user' ? 'bg-violet-600 text-white' : 'bg-white text-slate-800'}`}>
                           <MarkdownRenderer content={msg.content} />
                        </div>
                    )}
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
      </main>
      <footer className="border-t border-slate-200 bg-white p-2">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Posez votre question..." className="flex-1 rounded-lg border-slate-200 bg-slate-100 p-3 text-slate-800 focus:border-violet-500 focus:ring-violet-500" />
            <button type="submit" disabled={isLoading} className="rounded-lg bg-violet-600 p-3 text-white disabled:bg-slate-400">
                <SendIcon className="h-6 w-6"/>
            </button>
        </form>
      </footer>
    </div>
  );
};

export default Assistant;
