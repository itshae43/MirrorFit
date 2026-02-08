import React, { useState, useEffect, useRef } from 'react';
import { createStylistChat } from '../../services/geminiService';
import { ChatMessage } from '../../types';

export const Stylist: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: "Hey! I'm Mira, your personal stylist. Need help with an outfit today? ✨" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Keep chat instance ref to persist session
  const chatSession = useRef<any>(null);

  useEffect(() => {
    if (!chatSession.current) {
        try {
            chatSession.current = createStylistChat();
        } catch(e) { console.error("Chat init failed", e); }
    }
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    try {
        if (!chatSession.current) throw new Error("Chat not initialized");
        
        const result = await chatSession.current.sendMessage({ message: newMsg.text });
        const responseText = result.text;
        
        setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: responseText
        }]);
    } catch (e) {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'model',
            text: "Oops! I'm having trouble connecting to the fashion servers. Try again?"
        }]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm border-b border-gray-200 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
            M
        </div>
        <div>
            <h2 className="font-bold text-gray-900">Mira (AI Stylist)</h2>
            <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs text-gray-500">Online • Gemini 3 Flash</span>
            </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                    msg.role === 'user' 
                        ? 'bg-brand-600 text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
            </div>
        ))}
        {isTyping && (
            <div className="flex justify-start">
                 <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                 </div>
            </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white p-4 border-t border-gray-200">
        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-full">
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask for fashion advice..."
                className="flex-1 bg-transparent border-none focus:ring-0 px-4 text-sm"
            />
            <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-brand-600 text-white w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-700 transition-colors"
            >
                <i className="fa-solid fa-paper-plane text-xs"></i>
            </button>
        </div>
      </div>
    </div>
  );
};
