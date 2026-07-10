import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, BookingStatus } from '../types';
import { MessageSquare, PhoneCall, Calendar, Clock, CheckCircle, RefreshCw, Send, ChevronRight, FileText, User, HelpCircle } from 'lucide-react';

interface ConciergeLayerProps {
  bookingStatuses: BookingStatus[];
  chatMessages: ChatMessage[];
  onSendMessage: (text: string) => void;
  destinationName: string;
}

export const ConciergeLayer: React.FC<ConciergeLayerProps> = ({
  bookingStatuses,
  chatMessages,
  onSendMessage,
  destinationName
}) => {
  const [inputText, setInputText] = useState('');
  const [scheduledCall, setScheduledCall] = useState<{ date: string; time: string; topic: string } | null>(null);
  const [showCallForm, setShowCallForm] = useState(false);
  const [callTopic, setCallTopic] = useState('itinerary');
  const [callDate, setCallDate] = useState('2026-07-01');
  const [callTime, setCallTime] = useState('10:00');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleScheduleCall = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduledCall({
      date: callDate,
      time: callTime,
      topic: callTopic === 'itinerary' ? 'Route & Activity Fine-Tuning' : callTopic === 'visa' ? 'Visa Application Review' : 'Flight & Booking Logistics'
    });
    setShowCallForm(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      
      {/* LEFT COLUMN: Chat with Elena (7 Columns) */}
      <div className="lg:col-span-7 bg-earth-moss-light border border-earth-sand rounded-sm shadow-xs flex flex-col h-[580px]" id="concierge-chat-panel">
        {/* Chat Header */}
        <div className="p-4 border-b border-earth-sand bg-earth-cream/40 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-earth-terracotta flex items-center justify-center text-earth-cream font-serif font-bold text-sm">
                EL
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-earth-moss border-2 border-white" />
            </div>
            <div>
              <p className="font-serif font-bold text-sm text-earth-charcoal">Elena Vasquez</p>
              <p className="font-mono text-[9px] uppercase tracking-wider text-earth-terracotta font-semibold">
                Lead Travel Steward • Active
              </p>
            </div>
          </div>
          
          <div className="bg-earth-sand/30 px-2.5 py-1 border border-earth-sand/60 text-[10px] font-mono rounded">
            STATION ID: NYC-STWD
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-earth-cream/10">
          {chatMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={msg.id} 
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] rounded p-3.5 space-y-1 text-xs leading-relaxed ${
                  isUser 
                    ? 'bg-earth-charcoal text-earth-cream shadow-2xs' 
                    : 'bg-earth-moss-light border border-earth-sand text-earth-charcoal shadow-3xs'
                }`}>
                  <p className="font-light">{msg.text}</p>
                  <p className={`font-mono text-[8px] text-right mt-1 ${isUser ? 'text-earth-cream/50' : 'text-earth-charcoal/40'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSend} className="p-4 border-t border-earth-sand bg-earth-moss-light flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask Elena about local guides, custom stays, or flights..."
            className="flex-1 border border-earth-sand bg-earth-cream/30 px-3.5 py-2.5 rounded text-xs focus:outline-none focus:border-earth-terracotta font-sans"
            id="chat-input-field"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-earth-terracotta hover:bg-earth-terracotta-dark text-earth-cream rounded-sm transition-colors flex items-center"
            id="chat-btn-send"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* RIGHT COLUMN: Booking Tracker & Call Scheduler (5 Columns) */}
      <div className="lg:col-span-5 space-y-6">
        
        {/* Module 1: Live Booking Status Tracker */}
        <div className="bg-earth-moss-light border border-earth-sand p-5 rounded shadow-xs space-y-4" id="booking-tracker-panel">
          <div className="flex justify-between items-center border-b border-earth-sand pb-3">
            <h3 className="font-serif font-bold text-base text-earth-charcoal">Concierge Status Tracker</h3>
            <span className="font-mono text-[9px] text-earth-terracotta font-semibold uppercase bg-earth-sand px-2 py-0.5 rounded">
              Route: {destinationName}
            </span>
          </div>

          <div className="space-y-4">
            {bookingStatuses.map((item) => (
              <div key={item.id} className="space-y-1.5" id={`tracker-item-${item.id}`}>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-sans font-semibold text-earth-charcoal flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-earth-terracotta" />
                    <span>{item.title}</span>
                  </span>
                  
                  {/* Status Badges */}
                  <span className={`font-mono text-[8px] uppercase font-bold px-2 py-0.5 rounded ${
                    item.status === 'confirmed'
                      ? 'bg-earth-moss/10 text-earth-moss'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>
                
                <p className="text-[10px] text-earth-charcoal/60 leading-normal font-light">
                  {item.details}
                </p>
                
                {/* Visual tiny progress bar */}
                <div className="h-1 bg-earth-sand rounded-full overflow-hidden">
                  <div className={`h-full ${item.status === 'confirmed' ? 'bg-earth-moss' : 'bg-earth-terracotta animate-pulse'}`} style={{ width: item.status === 'confirmed' ? '100%' : '50%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module 2: Human Call Scheduler */}
        <div className="bg-earth-moss-light border border-earth-sand p-5 rounded shadow-xs space-y-4" id="call-scheduler-panel">
          <h3 className="font-serif font-bold text-base text-earth-charcoal">Voice Fine-Tuning</h3>
          <p className="text-[11px] text-earth-charcoal/70 leading-relaxed font-light">
            Sometimes typing isn't enough. Schedule a direct call with Elena or our local ground masters at your convenience.
          </p>

          {!scheduledCall ? (
            !showCallForm ? (
              <button
                onClick={() => setShowCallForm(true)}
                className="w-full inline-flex justify-center items-center py-2.5 border border-earth-charcoal/20 hover:border-earth-charcoal text-xs uppercase tracking-wider font-semibold transition-colors rounded-sm"
                id="btn-trigger-call"
              >
                <PhoneCall className="w-3.5 h-3.5 mr-2" /> Request A Phone Call
              </button>
            ) : (
              <form onSubmit={handleScheduleCall} className="border border-earth-sand p-3 rounded bg-earth-cream/20 space-y-3">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-earth-charcoal/60 uppercase block">Focus Topic</label>
                  <select
                    value={callTopic}
                    onChange={(e) => setCallTopic(e.target.value)}
                    className="w-full border border-earth-sand bg-earth-cream p-1.5 rounded text-xs focus:outline-none"
                  >
                    <option value="itinerary">Itinerary Customization</option>
                    <option value="visa">Visa Paperwork & Documents</option>
                    <option value="flight">Flight Logistics & Transit</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-earth-charcoal/60 uppercase block">Date</label>
                    <input
                      type="date"
                      value={callDate}
                      onChange={(e) => setCallDate(e.target.value)}
                      className="w-full border border-earth-sand bg-earth-cream p-1.5 rounded text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono text-earth-charcoal/60 uppercase block">Time (Your Local)</label>
                    <input
                      type="time"
                      value={callTime}
                      onChange={(e) => setCallTime(e.target.value)}
                      className="w-full border border-earth-sand bg-earth-cream p-1.5 rounded text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowCallForm(false)}
                    className="flex-1 py-1.5 border border-earth-charcoal/10 hover:border-earth-charcoal/30 text-[9px] uppercase font-mono rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-1.5 bg-earth-terracotta hover:bg-earth-terracotta-dark text-earth-cream text-[9px] uppercase font-mono font-bold rounded"
                  >
                    Request Call
                  </button>
                </div>
              </form>
            )
          ) : (
            <div className="bg-earth-moss-light/40 border border-earth-moss/20 p-4 rounded-sm space-y-2">
              <div className="flex items-center space-x-2 text-earth-moss">
                <CheckCircle className="w-4 h-4" />
                <span className="font-serif font-bold text-xs">Call Appointment Scheduled</span>
              </div>
              <p className="text-[10px] text-earth-charcoal leading-relaxed font-light">
                Elena will call you at your registered number on <strong className="font-mono">{scheduledCall.date}</strong> at <strong className="font-mono">{scheduledCall.time}</strong> to discuss <strong>{scheduledCall.topic}</strong>.
              </p>
              <button
                onClick={() => setScheduledCall(null)}
                className="text-[9px] font-mono text-earth-terracotta hover:underline uppercase block"
              >
                Cancel or Reschedule
              </button>
            </div>
          )}
        </div>

        {/* Informative Reminders/Tips Box (Post-Booking Vibe) */}
        <div className="bg-earth-moss/5 border border-earth-moss/10 p-5 rounded space-y-3">
          <div className="flex items-center space-x-2 text-earth-moss">
            <FileText className="w-4 h-4 text-earth-terracotta" />
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider">Automated Ground Reminders</h4>
          </div>
          <ul className="text-[10px] text-earth-charcoal/70 space-y-2 leading-relaxed">
            <li className="flex items-start">
              <span className="text-earth-terracotta font-bold mr-1.5">•</span>
              <span><strong>Passport Expiration Gate:</strong> Ensure passport carries at least 6 months validity from departure date.</span>
            </li>
            <li className="flex items-start">
              <span className="text-earth-terracotta font-bold mr-1.5">•</span>
              <span><strong>Document Upload:</strong> Please upload a high-res photo of your passport information page in this chat for visa pre-clearance.</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};
