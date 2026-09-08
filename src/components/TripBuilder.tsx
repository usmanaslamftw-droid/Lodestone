import React from 'react';
import { ItineraryBlock, Destination, TravelStyleProfile } from '../types';
import { Sliders, HelpCircle, MessageSquare, PhoneCall, ShieldCheck, UserCheck, Calendar, Clock, MapPin, ToggleLeft, ToggleRight } from 'lucide-react';

interface TripBuilderProps {
  destination: Destination;
  itinerary: ItineraryBlock[];
  onToggleBlockAutomation: (blockId: string) => void;
  onOpenAssistant: () => void;
  onScheduleCall: () => void;
  onBackToMatches: () => void;
  onConfirmBooking: () => void;
  isBooked: boolean;
}

export const TripBuilder: React.FC<TripBuilderProps> = ({
  destination,
  itinerary,
  onToggleBlockAutomation,
  onOpenAssistant,
  onScheduleCall,
  onBackToMatches,
  onConfirmBooking,
  isBooked
}) => {

  // Group itinerary by day
  const days = Array.from(new Set(itinerary.map(b => b.day))).sort((a: number, b: number) => a - b);

  const automatedCount = itinerary.filter(b => b.isAutomated).length;
  const manualCount = itinerary.filter(b => !b.isAutomated).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8" id="trip-builder-view">
      
      {/* Editorial Header Panel */}
      <div className="relative border border-earth-sand/20 dark:border-neutral-800 bg-earth-sand/10 dark:bg-neutral-900/40 overflow-hidden p-6 md:p-8 rounded shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={onBackToMatches}
              className="text-xs font-semibold text-earth-charcoal/60 dark:text-neutral-400 hover:text-earth-terracotta tracking-wider uppercase transition-colors"
              id="btn-builder-back-matches"
            >
              ← Back to Matches
            </button>
            <span className="text-earth-charcoal/30">•</span>
            <span className="font-mono text-xs text-earth-terracotta font-bold uppercase tracking-wider">
              Selected Route
            </span>
          </div>
          
          <h1 className="font-serif text-3xl text-earth-charcoal dark:text-white tracking-tight">
            Bespoke Route: {destination.name} Itinerary
          </h1>
          
          <p className="text-xs sm:text-sm text-earth-charcoal/70 dark:text-neutral-400 leading-relaxed font-light max-w-xl">
            This skeleton is precision-matched to your style. Below, you control the level of concierge involvement. Toggle individual blocks to dictate what we secure on your behalf.
          </p>
        </div>

        {/* Curation summary stat widget */}
        <div className="bg-earth-sand/15 dark:bg-black/40 p-4 border border-earth-sand/30 dark:border-neutral-800 rounded-sm text-xs space-y-1 md:min-w-[220px]">
          <span className="font-mono text-[9px] uppercase tracking-widest text-earth-charcoal/60 dark:text-neutral-500 font-bold block">
            AUTOMATION RATIO
          </span>
          <div className="flex justify-between items-center text-sm font-semibold">
            <span className="text-earth-terracotta">{automatedCount} Concierge Managed</span>
            <span className="text-earth-charcoal/40 dark:text-neutral-600">/</span>
            <span className="text-earth-moss">{manualCount} Self Guided</span>
          </div>
          <div className="w-full h-1.5 bg-earth-sand/30 dark:bg-neutral-800 rounded-full mt-2 overflow-hidden flex">
            <div className="h-full bg-earth-terracotta" style={{ width: `${(automatedCount / itinerary.length) * 100}%` }} />
            <div className="h-full bg-earth-moss" style={{ width: `${(manualCount / itinerary.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Floating Call-to-action bar */}
      <div className="bg-earth-charcoal dark:bg-neutral-900 text-earth-cream p-4 rounded border border-earth-sand/20 shadow-lg flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="space-y-0.5 text-center sm:text-left">
          <p className="font-serif text-sm font-bold">Ready to secure this trip layout?</p>
          <p className="text-[10px] text-earth-cream/70 font-light">
            {isBooked 
              ? "Your active booking process is live in your dashboard. Our ground support team is finalizing details."
              : `Your assistant will book the ${automatedCount} automated elements and send confirmations.`}
          </p>
        </div>
        <div className="flex space-x-3 w-full sm:w-auto justify-center">
          <button
            onClick={onOpenAssistant}
            className="px-4 py-2 border border-earth-cream/20 hover:border-earth-cream text-[10px] uppercase tracking-wider font-semibold rounded-sm transition-colors flex items-center"
            id="btn-discuss-helper"
          >
            <MessageSquare className="w-3.5 h-3.5 mr-1.5" /> Message Helper
          </button>
          {!isBooked ? (
            <button
              onClick={onConfirmBooking}
              className="px-5 py-2.5 bg-earth-terracotta hover:bg-earth-terracotta-dark text-earth-cream text-[10px] uppercase tracking-wider font-semibold rounded-sm transition-all shadow-md"
              id="btn-lock-booking"
            >
              Secure & Handle Bookings
            </button>
          ) : (
            <div className="px-5 py-2.5 bg-earth-moss/30 border border-earth-moss text-earth-moss text-[10px] uppercase tracking-wider font-bold rounded-sm">
              Booking Process Active
            </div>
          )}
        </div>
      </div>

      {/* Itinerary Timeline */}
      <div className="space-y-10">
        {days.map(dayNum => (
          <div key={dayNum} className="space-y-4">
            {/* Day Header Divider */}
            <div className="flex items-center space-x-4">
              <span className="font-serif text-lg font-black text-earth-charcoal dark:text-white bg-earth-sand/30 dark:bg-neutral-800 px-3 py-1 rounded-sm border border-earth-terracotta/15">
                DAY {dayNum}
              </span>
              <div className="h-px bg-earth-sand/30 dark:bg-neutral-800 flex-1" />
            </div>

            {/* Itinerary blocks for the day */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {itinerary
                .filter(b => b.day === dayNum)
                .map(block => (
                  <div 
                    key={block.id} 
                    className="bg-earth-sand/10 dark:bg-neutral-900/30 border border-earth-sand/20 dark:border-neutral-800 rounded-sm hover:shadow-sm transition-all flex flex-col justify-between"
                    id={`itinerary-block-card-${block.id}`}
                  >
                    {/* Block Info */}
                    <div className="p-5 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <span className="font-mono text-[9px] uppercase tracking-widest text-earth-charcoal/50 dark:text-neutral-500 font-bold flex items-center">
                            <Clock className="w-3 h-3 text-earth-terracotta mr-1" />
                            {block.timeOfDay.toUpperCase()} • <MapPin className="w-2.5 h-2.5 text-earth-moss mx-1" /> {block.location}
                          </span>
                          <h3 className="font-serif font-bold text-base text-earth-charcoal dark:text-white">
                            {block.title}
                          </h3>
                        </div>

                        {/* Status Label on right */}
                        <span className={`font-mono text-[8px] uppercase font-bold px-2 py-0.5 rounded ${
                          block.isAutomated
                            ? block.automationStatus === 'Confirmed'
                              ? 'bg-earth-moss/10 text-earth-moss'
                              : 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400'
                            : 'bg-earth-cream dark:bg-neutral-800 text-earth-charcoal/60 dark:text-neutral-400'
                        }`}>
                          {block.isAutomated ? block.automationStatus === 'Confirmed' ? 'Secured' : 'Requested' : 'Self-guided'}
                        </span>
                      </div>

                      <p className="text-[11px] text-earth-charcoal/80 dark:text-neutral-400 leading-relaxed font-light">
                        {block.description}
                      </p>
                    </div>

                    {/* Automation Control Panel */}
                    <div className="bg-earth-sand/5 dark:bg-neutral-900/60 px-5 py-3 border-t border-earth-sand/15 dark:border-neutral-800 flex items-center justify-between">
                      {/* Toggle label explaining involvement */}
                      <span className="font-mono text-[9px] uppercase tracking-wider text-earth-charcoal/60 dark:text-neutral-500 font-semibold">
                        {block.isAutomated ? '👉 Secured by Concierge' : '👉 Handles Spontaneously'}
                      </span>

                      {/* Interactive Custom Toggle Button */}
                      <button
                        onClick={() => onToggleBlockAutomation(block.id)}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded transition-all ${
                          block.isAutomated
                            ? 'bg-earth-terracotta/10 border border-earth-terracotta text-earth-terracotta font-semibold'
                            : 'bg-earth-sand/15 dark:bg-neutral-950 border border-earth-sand/20 dark:border-neutral-800 text-earth-charcoal dark:text-neutral-300 hover:border-earth-terracotta/30'
                        }`}
                        id={`btn-toggle-automation-${block.id}`}
                      >
                        <span className="text-[9px] uppercase font-mono">
                          {block.isAutomated ? 'Automated' : 'Manual'}
                        </span>
                        {block.isAutomated ? (
                          <ToggleRight className="w-4 h-4" />
                        ) : (
                          <ToggleLeft className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Secondary Detail Section depending on automation state */}
                    {block.isAutomated ? (
                      <div className="bg-earth-sand/5 dark:bg-neutral-950/40 px-5 py-3.5 border-t border-earth-sand/15 dark:border-neutral-800 text-[10px] space-y-1.5">
                        <span className="font-mono text-[8px] uppercase tracking-widest text-earth-moss font-extrabold block">
                          BOOKING DETAILS
                        </span>
                        {block.bookingDetails ? (
                          <div className="grid grid-cols-2 gap-1 text-earth-charcoal/80 dark:text-neutral-400 font-mono">
                            <p>Provider: {block.bookingDetails.provider}</p>
                            <p className="text-right">Ref: {block.bookingDetails.reference}</p>
                            <p>Rate: {block.bookingDetails.price}</p>
                            <p className="text-right">Sched: {block.bookingDetails.time}</p>
                          </div>
                        ) : (
                          <p className="font-sans italic text-earth-charcoal/60 dark:text-neutral-500">
                            Our concierge team will secure this slot automatically. We will request your final approval before charging.
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="bg-earth-sand/5 dark:bg-neutral-950/20 px-5 py-3.5 border-t border-earth-sand/15 dark:border-neutral-800 text-[10px] flex justify-between items-center gap-3">
                        <p className="font-sans italic text-earth-charcoal/60 dark:text-neutral-500 max-w-[240px] leading-relaxed">
                          We provide local guides and suggest paths, but you buy tickets or walk in on your own schedule.
                        </p>
                        <button
                          onClick={onOpenAssistant}
                          className="px-2.5 py-1 bg-earth-cream dark:bg-neutral-800 border border-earth-sand/20 dark:border-neutral-700 hover:border-earth-terracotta/30 text-[9px] font-mono text-earth-charcoal dark:text-neutral-300 rounded transition-colors"
                        >
                          Ask assistant
                        </button>
                      </div>
                    )}

                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Human Assistance Help Cards */}
      <section className="bg-earth-sand/10 dark:bg-neutral-900 border border-earth-sand/25 dark:border-neutral-800 p-6 md:p-8 rounded-sm text-center max-w-2xl mx-auto space-y-4">
        <h3 className="font-serif text-lg font-bold text-earth-charcoal dark:text-white">Need modifications beyond toggles?</h3>
        <p className="text-xs text-earth-charcoal/80 dark:text-neutral-400 font-light leading-relaxed">
          Need to append additional days, adjust companion rules, or schedule customized local workshops? Speak to your dedicated travel assistant now to personalize your journey.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onScheduleCall}
            className="inline-flex items-center px-4 py-2 bg-earth-charcoal hover:bg-earth-moss text-earth-cream text-[10px] uppercase tracking-wider font-semibold rounded-sm transition-colors"
            id="btn-footer-call"
          >
            <PhoneCall className="w-3.5 h-3.5 mr-2" /> Schedule Call
          </button>
          <button
            onClick={onOpenAssistant}
            className="inline-flex items-center px-4 py-2 border border-earth-charcoal/20 dark:border-neutral-700 hover:border-earth-charcoal dark:hover:border-white text-[10px] uppercase tracking-wider font-semibold rounded-sm transition-colors"
            id="btn-footer-chat"
          >
            <MessageSquare className="w-3.5 h-3.5 mr-2" /> Open Live Chat
          </button>
        </div>
      </section>

    </div>
  );
};
