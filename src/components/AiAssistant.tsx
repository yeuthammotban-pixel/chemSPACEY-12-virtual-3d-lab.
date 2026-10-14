import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Lightbulb, BookOpen, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  isFallback?: boolean;
  timestamp: string;
}

export const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: 'Chào bạn! Tôi là Trợ lý Hóa học 12. Tôi có thể giúp bạn giải đáp lý thuyết chuyên sâu, hướng dẫn phương pháp giải bài tập từng bước (bảo toàn khối lượng, mol, electron) hoặc giải thích hiện tượng thí nghiệm phòng lab 3D. Bạn đang gặp vướng mắc ở nội dung nào?',
      timestamp: 'Vừa xong',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [assistantMode, setAssistantMode] = useState<'step_by_step' | 'hint' | 'concept'>('step_by_step');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          mode: assistantMode === 'hint' ? 'hint' : 'full',
          context: 'Chương trình Hóa học 12 GDPT 2018 (Ester, Carbohydrate, Nitrogen, Pin điện, Điện phân)',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Không nhận được phản hồi từ AI.',
        isFallback: !!data.isFallback,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('AI chat request failed:', err);
      // Fallback
      const errorMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: 'Đang kết nối ngoại tuyến. Bạn có thể tra cứu nhanh trong mục Lý thuyết hoặc kiểm tra lại kết nối mạng.',
        isFallback: true,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    'Giải thích vì sao ester có nhiệt độ sôi thấp hơn ancol cùng M?',
    'Làm thế nào để phân biệt Glucose và Fructose bằng nước Brom?',
    'Mẹo xác định cực Anot và Catot trong pin Galvani Zn - Cu?',
    'Quy tắc phản ứng màu Biuret của peptide?',
  ];

  return (
    <div className="flex flex-col h-[650px] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-sky-50 to-indigo-50/60 dark:from-slate-900 dark:to-slate-850 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-white flex items-center gap-2">
              Trợ lý AI Hóa Học 12 (Gemini Edu)
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h3>
            <p className="text-[11px] text-slate-500">
              Phương pháp gợi mở sư phạm • Chuẩn kiến thức GDPT 2018
            </p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 bg-white/80 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
          <button
            onClick={() => setAssistantMode('step_by_step')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              assistantMode === 'step_by_step'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Giải từng bước
          </button>
          <button
            onClick={() => setAssistantMode('hint')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              assistantMode === 'hint'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Chỉ gợi ý tư duy
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                AI
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-sky-600 text-white rounded-br-none'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-none'
              }`}
            >
              {msg.text}
              <div
                className={`text-[10px] mt-1.5 flex justify-end ${
                  msg.sender === 'user' ? 'text-sky-200' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
            Trợ lý AI đang phân tích phản ứng và công thức hóa học...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-6 py-2 bg-slate-50/50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex gap-2 overflow-x-auto text-[11px]">
        {samplePrompts.map((sp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(sp)}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-sky-50 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0 transition-colors"
          >
            {sp}
          </button>
        ))}
      </div>

      {/* Input Form Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
          placeholder="Nhập câu hỏi, bài tập cần giải hoặc hiện tượng thí nghiệm..."
          className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim() || isLoading}
          className="p-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white shadow-sm transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
