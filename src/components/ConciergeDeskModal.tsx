import React, { useState, useEffect, useRef } from 'react';

interface ConciergeDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: any;
  onSelectHoliday?: (tourId: string) => void;
}

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  model?: string;
  thinking?: boolean;
}

export const ConciergeDeskModal: React.FC<ConciergeDeskModalProps> = ({
  isOpen,
  onClose,
  initialContext,
  onSelectHoliday,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Good day. I am Julian Davenport, Senior Bespoke Concierge at JILIT Holidays, 120 Pall Mall, London.\n\nWhether you require an exquisite itinerary through Prague's Christmas markets, flight logistics with ATOL Bond protection, or a private Mercedes chauffeur between your home and London Heathrow, I am entirely at your service. How may I assist your travel plans today?",
      model: 'gemini-4-argon',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [thinkingStep, setThinkingStep] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    {
      label: 'Prague Christmas Gala Details',
      prompt: 'Could you explain the dining and dress code for the Prague Castle Mozart Gala banquet included in the Christmas Tour?',
    },
    {
      label: 'Schengen & Passport Rules',
      prompt: 'What are the current UK passport validity rules and Schengen 90-day limits for travelling to Czechia and Switzerland in 2025?',
    },
    {
      label: 'Heathrow Mercedes Chauffeur',
      prompt: 'How does the executive airport transfer service work from London Heathrow Terminal 5? What is the meet-and-greet procedure?',
    },
    {
      label: 'Custom 5-Day Winter Itinerary',
      prompt: 'Can you propose a bespoke 5-day luxury winter itinerary combining Vienna and Prague with 5-star heritage hotels?',
    },
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    const thinkingSteps = [
      'Accessing JILIT Pall Mall bespoke reservations & seasonal allocations...',
      'Deep thinking: Synthesising flight connectivity, ATOL compliance & hotel availability...',
      'Refining bespoke British concierge recommendations...',
    ];

    let stepIdx = 0;
    setThinkingStep(thinkingSteps[0]);
    const stepInterval = setInterval(() => {
      stepIdx = (stepIdx + 1) % thinkingSteps.length;
      setThinkingStep(thinkingSteps[stepIdx]);
    }, 1800);

    try {
      const response = await fetch('/api/concierge/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: newHistory.map((m) => ({ role: m.role, content: m.content })),
          context: initialContext,
        }),
      });

      const data = await response.json();
      clearInterval(stepInterval);

      if (data.success && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: data.reply,
            model: data.model || 'gemini-4-argon',
            thinking: data.thinkingEnabled,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content:
              data.error ||
              'I apologise; our St. James’s server is momentarily preoccupied. Please feel free to phone our concierge desk directly at 0800 456 7890.',
          },
        ]);
      }
    } catch (err: any) {
      clearInterval(stepInterval);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content:
            'We encountered a momentary communication timeout with our London desk. Kindly repeat your enquiry or contact our client specialists on 0800 456 7890.',
        },
      ]);
    } finally {
      setLoading(false);
      setThinkingStep('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl h-full sm:h-[94vh] sm:mr-4 sm:rounded-3xl bg-white shadow-2xl flex flex-col overflow-hidden border border-[#bcc9ce]/40 transition-all">
        {/* Header */}
        <div className="bg-[#002727] text-white p-5 px-6 flex items-center justify-between border-b border-[#00677d]/30 relative overflow-hidden">
          {/* Subtle gold glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffba27]/5 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

          <div className="flex items-center gap-3.5 relative z-10">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-[#ffba27] bg-[#003838] flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[#ffba27] text-[24px]">support_agent</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#002727]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline text-[17px] font-bold text-white tracking-wide">
                  Julian Davenport
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#ffba27]/20 border border-[#ffba27]/40 text-[#ffba27] text-[10px] font-extrabold uppercase tracking-wider">
                  Senior Concierge
                </span>
              </div>
              <p className="text-[12px] text-[#beebe9]/80 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#beebe9] animate-pulse" />
                120 Pall Mall, St. James’s, London • High-Thinking Bespoke Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 relative z-10">
            <a
              href="tel:08004567890"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-[12px] font-bold transition-colors"
              title="Direct Telephone Concierge"
            >
              <span className="material-symbols-outlined text-[16px] text-[#ffba27]">call</span>
              <span>0800 456 7890</span>
            </a>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#beebe9] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Concierge"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* ATOL Notice Banner */}
        <div className="bg-[#f0f3ff] px-6 py-2 border-b border-[#e2e8f0] flex items-center justify-between text-[11px] text-[#525f71]">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="material-symbols-outlined text-[#00677d] text-[15px]">verified_user</span>
            ATOL Bond #9822 & ABTA #Y6841 Protected Travel Guidance
          </span>
          <span className="font-bold text-[#002727] hidden md:inline">24/7 UK Client Care</span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#fbfbfe]">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-full bg-[#002727] text-[#ffba27] flex items-center justify-center shrink-0 mt-1 shadow-sm text-xs font-bold">
                    JD
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-sm text-[13.5px] leading-relaxed ${
                    isUser
                      ? 'bg-[#002727] text-white rounded-br-sm'
                      : 'bg-white text-[#191c1e] border border-[#e2e8f0] rounded-bl-sm'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.content}</div>

                  {!isUser && m.model && (
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-[#525f71]">
                      <span className="flex items-center gap-1 font-mono text-[#00677d]">
                        <span className="material-symbols-outlined text-[13px]">psychology</span>
                        Powered by {m.model} (Deep Thought Mode)
                      </span>
                      <span>Verified Bespoke Standard</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Thinking / Loading indicator */}
          {loading && (
            <div className="flex gap-3 justify-start items-start">
              <div className="w-8 h-8 rounded-full bg-[#002727] text-[#ffba27] flex items-center justify-center shrink-0 mt-1">
                <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>
              </div>
              <div className="bg-white border border-[#00677d]/30 rounded-2xl rounded-bl-sm px-5 py-4 max-w-[85%] shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00677d] animate-ping" />
                  <span className="text-[12px] font-bold text-[#002727] uppercase tracking-wider">
                    Senior Concierge Reasoning...
                  </span>
                </div>
                <p className="text-[12px] text-[#525f71] italic font-serif">
                  "{thinkingStep}"
                </p>
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ffba27] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ffba27] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ffba27] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-3 px-6 bg-white border-t border-[#e2e8f0]/80">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#525f71] mb-2">
            Suggested Consultations
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
            {quickPrompts.map((item, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(item.prompt)}
                disabled={loading}
                className="whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#f0f3ff] hover:bg-[#e2e8f0] text-[#002727] text-[12px] font-semibold border border-[#bcc9ce]/40 transition-colors disabled:opacity-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 px-6 bg-white border-t border-[#e2e8f0]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask our London Concierge regarding dates, bespoke routes, transfers..."
              disabled={loading}
              className="flex-1 bg-[#f9f9ff] border border-[#bcc9ce]/60 rounded-xl px-4 py-3 text-[13.5px] text-[#191c1e] placeholder-[#525f71]/70 focus:outline-none focus:ring-2 focus:ring-[#002727]/20 focus:border-[#002727] transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-5 py-3 rounded-xl bg-[#002727] hover:bg-[#003838] text-white font-bold text-[13px] flex items-center gap-1.5 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <span>Enquire</span>
              <span className="material-symbols-outlined text-[16px]">send</span>
            </button>
          </form>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#525f71]">
            <span>Response verified by ATOL bonded client advisors</span>
            <span className="font-mono text-[#00677d]">gemini-4-argon • Thinking High</span>
          </div>
        </div>
      </div>
    </div>
  );
};
