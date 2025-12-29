import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Minimize2, MessageCircle } from 'lucide-react';
import { ChatMessage, Product, Language } from '../types';
import { geminiService } from '../services/geminiService';
import { TRANSLATIONS } from '../utils/i18n';

interface GeminiStylistProps {
  products: Product[];
  language: Language;
  onViewProduct: (product: Product) => void;
}

export const GeminiStylist: React.FC<GeminiStylistProps> = ({ products, language, onViewProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const t = TRANSLATIONS[language].ai;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  // Reset messages when language changes to display correct greeting
  useEffect(() => {
    setMessages([{
        id: '1',
        role: 'model',
        text: t.greeting,
        timestamp: new Date()
    }]);
  }, [language]);

  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    
    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Build history for API
    const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    try {
      const responseText = await geminiService.generateResponse(history, userText, products, language);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
        console.error(err)
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'model',
            text: "Error connecting to concierge service.",
            timestamp: new Date(),
            isError: true
        }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Function to parse text and replace product titles with clickable spans
  const renderMessageContent = (text: string) => {
    if (!products || products.length === 0) return text;

    // 1. Get all product titles, sort by length descending to match longest first
    const titles = products.map(p => p.title).filter(Boolean).sort((a, b) => b.length - a.length);
    
    if (titles.length === 0) return text;

    // 2. Escape special regex characters in titles
    const escapedTitles = titles.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    
    // 3. Create regex with capturing group to keep the delimiter
    const pattern = new RegExp(`(${escapedTitles.join('|')})`, 'gi');

    // 4. Split text by lines first to preserve paragraph structure
    return text.split('\n').map((line, lineIdx) => {
        // 5. Split line by product titles
        const parts = line.split(pattern);
        
        return (
            <p key={lineIdx} className="mb-1 last:mb-0">
                {parts.map((part, partIdx) => {
                    // Check if this part is a product title (case-insensitive)
                    const matchedProduct = products.find(p => p.title.toLowerCase() === part.toLowerCase());
                    
                    if (matchedProduct) {
                        return (
                            <button
                                key={partIdx}
                                onClick={() => onViewProduct(matchedProduct)}
                                className="text-sun8-gold hover:underline font-medium cursor-pointer transition-colors bg-transparent border-none p-0 inline text-left"
                                title="View Product"
                            >
                                {part}
                            </button>
                        );
                    }
                    return <span key={partIdx}>{part}</span>;
                })}
            </p>
        );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-full max-w-[360px] md:w-[400px] bg-sun8-navy text-sun8-ivory shadow-2xl rounded-t-lg rounded-bl-lg overflow-hidden border border-sun8-gold/30 mb-4 animate-fade-in flex flex-col max-h-[600px] h-[70vh]">
          
          {/* Header */}
          <div className="p-4 bg-sun8-navyLight border-b border-sun8-gold/20 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-sun8-gold flex items-center justify-center text-sun8-navy">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm">{t.title}</h3>
                <p className="text-[10px] text-sun8-gold uppercase tracking-wider">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} className="text-sun8-ivory/50 hover:text-white"><Minimize2 size={18} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-sun8-navy">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-sun8-gold text-sun8-navy rounded-tr-none' 
                      : 'bg-sun8-navyLight text-sun8-ivory border border-sun8-ivory/10 rounded-tl-none'
                  }`}
                >
                  {msg.role === 'user' ? (
                      msg.text.split('\n').map((line, i) => <p key={i} className="mb-1 last:mb-0">{line}</p>)
                  ) : (
                      renderMessageContent(msg.text)
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-sun8-navyLight p-3 rounded-lg rounded-tl-none border border-sun8-ivory/10">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-sun8-gold/50 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-sun8-gold/50 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-sun8-gold/50 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-sun8-navyLight border-t border-sun8-gold/20">
            <div className="relative flex items-center">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t.placeholder}
                className="w-full bg-sun8-navy border border-sun8-ivory/10 rounded-md pl-3 pr-12 py-3 text-sm text-white focus:outline-none focus:border-sun8-gold/50 resize-none h-12"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-sun8-gold hover:text-white disabled:opacity-30 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-center mt-2 text-sun8-ivory/30">{t.disclaimer}</p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button 
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-sun8-gold rounded-full shadow-lg flex items-center justify-center text-sun8-navy hover:bg-white hover:scale-105 transition-all duration-300 group"
        >
            <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
};