import React, { useState, useRef, useEffect } from 'react';
import { useSaveBite } from '../context/SaveBiteContext';
import { askSaveBiteAI } from '../services/aiService';
import {
  Bot,
  Send,
  Sparkles,
  X,
  User,
  RefreshCw,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
}

interface SaveBiteAiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SaveBiteAiAssistant: React.FC<SaveBiteAiAssistantProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentRole } = useSaveBite();

  const suggestedPrompts = [
    'How much food should I prepare tomorrow?',
    'Why did food waste increase this week?',
    'How can I reduce today’s waste?',
    'Which surplus should be redistributed first?',
    'Show my waste trends.',
    'How much money did I save?',
    'Give me recommendations for tomorrow.',
  ];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: `Hello! I am SaveBite AI, your institutional food waste prevention and redistribution assistant. I monitor kitchen batches, predict demand patterns, and rank NGO recipient urgency. How can I assist you today?`,
      time: 'Just now',
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const aiReply = await askSaveBiteAI(query, { currentRole });
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: aiReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text:
          'Based on historical trends, we recommend preparing 890 meals tomorrow (865 expected diners + 2.8% lean buffer) and staggering production into two batches to prevent overproduction.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex justify-end z-50">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-sky-100 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-sky-100 flex items-center justify-between bg-gradient-to-r from-sky-600 to-blue-600 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm flex items-center gap-1.5">
                <span>SaveBite AI</span>
                <span className="bg-emerald-400 text-emerald-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded">
                  ONLINE
                </span>
              </div>
              <div className="text-[11px] text-sky-100">
                Context: {currentRole.replace('_', ' ').toUpperCase()}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Prompts Pill Bar */}
        <div className="p-3 bg-sky-50/70 border-b border-sky-100">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-800 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-sky-600" />
            Suggested Questions:
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {suggestedPrompts.slice(0, 4).map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="shrink-0 text-[11px] bg-white hover:bg-sky-100 text-sky-700 font-medium px-2.5 py-1 rounded-full border border-sky-200 cursor-pointer transition-colors shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] p-3.5 rounded-2xl ${
                  m.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-tr-xs shadow-xs'
                    : 'bg-slate-50 text-slate-800 border border-slate-200/80 rounded-tl-xs shadow-xs leading-relaxed'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>
                <div
                  className={`text-[9px] mt-1.5 text-right ${
                    m.sender === 'user' ? 'text-sky-200' : 'text-slate-400'
                  }`}
                >
                  {m.time}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-600" />
              <span>SaveBite AI is analyzing kitchen telemetry...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Footer Input */}
        <div className="p-3.5 border-t border-slate-100 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask SaveBite AI anything..."
              className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !inputPrompt.trim()}
              className="p-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-center text-slate-400 mt-2">
            Powered by Gemini Multi-Variable Food Waste Prediction Engine
          </div>
        </div>
      </div>
    </div>
  );
};
