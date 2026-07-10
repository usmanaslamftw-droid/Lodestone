import React from 'react';
import { 
  Compass, Globe, Sliders, ArrowRight, Trees, Milestone, BookOpen, 
  Sun, Moon, MapPin, Sparkles, Clock, DollarSign, Users, 
  Zap, Shield, Heart, Calendar, ChevronRight, CheckCircle, 
  Send, FileText, Smartphone, Star, RotateCcw, Trash2 
} from 'lucide-react';
import { DESTINATIONS } from '../data';

// --- HERO SECTION ---
interface HeroSectionProps {
  onStartCalibration: () => void;
}
export const HeroSection: React.FC<HeroSectionProps> = ({ onStartCalibration }) => {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:grid lg:grid-cols-12 lg:gap-12 items-center">
      <div className="sm:text-center md:max-w-3xl md:mx-auto lg:col-span-6 lg:text-left space-y-6">
        <div className="inline-flex items-center space-x-2 bg-earth-moss-light text-earth-charcoal border border-earth-sand px-3.5 py-2 rounded-full text-xs font-mono tracking-wider">
          <span className="w-2 h-2 rounded-full bg-earth-moss animate-pulse" />
          <span className="text-[10px] font-bold uppercase">A Deep-Tech Alternative to Generic Booking Portals</span>
        </div>
        
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-earth-charcoal leading-[1.05] tracking-tight font-normal">
          Your travel agent on autopilot. <span className="italic text-earth-terracotta font-normal">Every booking handled.</span>
        </h1>
        
        <p className="text-base sm:text-lg text-earth-charcoal/80 font-light leading-relaxed">
          Lodestone coordinates stunning, bespoke itineraries automatically matching your travel profile, available leave days, and budget ceilings. Skip the hours of tabs and let us handle all room confirmations, dinner deposits, and transport passes behind the scenes.
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4 pt-4">
          <button
            onClick={onStartCalibration}
            className="inline-flex items-center justify-center px-7 py-4 bg-earth-terracotta hover:bg-earth-terracotta-dark text-earth-cream font-semibold text-sm tracking-wide transition-all shadow-md group rounded-sm"
            id="btn-hero-start"
          >
            Calibrate Your Profile
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <a
            href="#itineraries"
            className="inline-flex items-center justify-center px-7 py-4 border border-earth-charcoal/20 hover:border-earth-charcoal bg-white/40 backdrop-blur-xs font-semibold text-sm tracking-wide transition-colors rounded-sm"
          >
            Explore Made Itineraries
          </a>
        </div>
      </div>

      {/* Hero Image Collage */}
      <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-6 relative">
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          {/* Main Picture */}
          <div className="relative overflow-hidden shadow-xl border-4 border-white aspect-[4/3] rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=1200"
              alt="Cobblestone Amalfi coast view with sea"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 bg-earth-charcoal/80 text-earth-cream font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 backdrop-blur-xs">
              Praiano Coastline, Campania
            </div>
          </div>

          {/* Overlapping Secondary Picture */}
          <div className="absolute -bottom-8 -left-8 w-1/2 overflow-hidden shadow-xl border-4 border-white aspect-square hidden sm:block rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600"
              alt="Kyoto traditional alley"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Real-time agent activity widget */}
          <div className="absolute -top-6 -right-6 bg-earth-moss-light text-earth-charcoal text-xs border border-earth-sand px-4 py-3.5 shadow-xl rounded-sm max-w-[260px] space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-earth-moss animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold text-earth-moss">CONCIERGE DESK LIVE</span>
            </div>
            <p className="text-[11px] leading-relaxed text-earth-charcoal/80 font-light text-left">
              <strong className="font-serif italic font-bold">Elena S.</strong> is currently securing 3 boutique nights in Amalfi for a traveler from Chicago.
            </p>
            <div className="text-[9px] font-mono text-earth-charcoal/40 text-left">Status: Sourcing terrace rooms under $320/night</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- SOCIAL PROOF STRIP ---
export const SocialProofStrip: React.FC = () => {
  return (
    <section className="bg-earth-sand/30 py-8 border-y border-earth-sand/70">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-earth-charcoal/60 mb-4 font-semibold">
          Recognized in Premier Travel Journals
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all">
          <span className="font-serif font-extrabold text-sm md:text-base tracking-widest text-earth-charcoal">CONDE NAST</span>
          <span className="font-serif italic font-bold text-sm md:text-base tracking-tight text-earth-charcoal">Lonely Planet</span>
          <span className="font-serif font-black text-sm md:text-base tracking-tighter text-earth-charcoal">TRAVEL + LEISURE</span>
          <span className="font-serif font-light text-sm md:text-base tracking-wide text-earth-charcoal">NATIONAL GEOGRAPHIC</span>
        </div>
      </div>
    </section>
  );
};

// --- TOURIST TRAP SHIELD ---
interface TouristTrapShieldProps {
  onStartCalibration: () => void;
}
export const TouristTrapShield: React.FC<TouristTrapShieldProps> = ({ onStartCalibration }) => {
  return (
    <section className="bg-gradient-to-b from-rose-50/20 via-orange-50/10 to-white border-t border-earth-sand py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute top-10 -left-10 w-80 h-80 bg-rose-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-10 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="font-mono text-[10px] text-rose-600 font-black uppercase tracking-widest block bg-rose-100 border border-rose-200 px-3.5 py-1 rounded-full w-max mx-auto">
            Immunity From Overrated Traps
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-earth-charcoal tracking-tight font-normal leading-tight">
            We Shield You From Overrated Tourist Traps
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-rose-400 to-emerald-400 mx-auto rounded-full" />
          <p className="text-xs sm:text-sm text-earth-charcoal/70 max-w-2xl mx-auto leading-relaxed font-light">
            Corporate group agencies herd tourists into commission-driven souvenirs, stuffy buses, and crowded monument gift shops. Similar to the modern, clean algorithms of <span className="font-bold text-earth-charcoal">EasyTripAI</span>, we filter out travel spam to secure raw, authentic experiences.
          </p>
        </div>

        {/* Trap Shield Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Traps Filtered Card */}
          <div className="bg-gradient-to-br from-rose-50/70 to-orange-50/30 border border-rose-100 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm transition-all hover:scale-[1.01] hover:shadow-md relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-200/15 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-rose-700 font-extrabold uppercase tracking-wider bg-rose-100/80 border border-rose-200 px-3 py-1 rounded-md">
                🛑 TOURIST TRAPS WE SHIELD
              </span>
              <span className="text-xl">🚍</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-rose-950">Overpriced & Commission-Driven</h3>
              <p className="text-xs text-rose-900/80 leading-relaxed font-light">
                Avoid the rigid structures designed solely to squeeze kickbacks out of unsuspecting passenger buses.
              </p>
            </div>
            <ul className="space-y-2 pt-2 border-t border-rose-200/25">
              {[
                "Forced 06:00 AM cattle-call tours in crowded group shuttles",
                "Overpriced commercial gift counters with fake local goods",
                "Stuffy, repetitive '5th museum' stops with zero historical value",
                "No options to rest or change course when heavy rain hits"
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-2.5 text-xs text-rose-900/90 font-light">
                  <span className="text-rose-500 shrink-0 font-bold mt-0.5">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vetted Experience Card */}
          <div className="bg-gradient-to-br from-emerald-50/70 to-teal-50/30 border border-emerald-100 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm transition-all hover:scale-[1.01] hover:shadow-md relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-200/15 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-emerald-800 font-extrabold uppercase tracking-wider bg-emerald-100/80 border border-emerald-200 px-3 py-1 rounded-md">
                ✨ VETTED LODESTONE FLOW
              </span>
              <span className="text-xl">🍃</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-emerald-950">Pure, Curated Local Tempos</h3>
              <p className="text-xs text-emerald-900/80 leading-relaxed font-light">
                Tailor-designed trails that breathe naturally and change dynamically based on your coordinates and local weather.
              </p>
            </div>
            <ul className="space-y-2 pt-2 border-t border-emerald-200/25">
              {[
                "Slow-tempo strolls on secluded coastlines and quiet alleys",
                "Matching the environment's current daily climate score automatically",
                "Zero markups with transparent booking receipts directly from operators",
                "Authentic culinary counters booked with verified real seat sync"
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-2.5 text-xs text-emerald-900/90 font-light">
                  <span className="text-emerald-600 shrink-0 font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- WANDERLOG FEATURES ---
export const WanderlogFeatures: React.FC = () => {
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 space-y-16">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="font-mono text-xs text-earth-terracotta font-bold uppercase tracking-widest">Wanderlog-Style Planning Suite</span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-earth-charcoal tracking-tight leading-tight">
          A Super-App with comprehensive capabilities.
        </h2>
        <div className="w-16 h-0.5 bg-earth-terracotta mx-auto my-4" />
        <p className="text-sm sm:text-base text-earth-charcoal/70 leading-relaxed font-light">
          We combined the visual, map-first itinerary building of Wanderlog with a fully integrated automated booking and budget-tracking agent. Everything you need is in one clean, beautiful platform.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Feature 1 */}
        <div className="bg-earth-moss-light border border-earth-sand p-6 rounded-sm space-y-4 flex flex-col justify-between text-left">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-sm bg-earth-cream border border-earth-sand flex items-center justify-center text-earth-terracotta">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-earth-charcoal">Route-Optimized Itinerary Building</h3>
            <p className="text-xs text-earth-charcoal/80 font-light leading-relaxed">
              Add points of interest, dining tables, or boutique lodges. Our system automatically structures your days chronologically, calculates precise transit distances, and optimizes routes so you never travel in circles.
            </p>
          </div>
          
          <div className="bg-earth-cream border border-earth-sand/60 p-3.5 rounded font-mono text-[10px] text-earth-charcoal/70 space-y-2 mt-4">
            <div className="flex justify-between text-earth-terracotta font-extrabold uppercase text-[8px] border-b border-earth-sand/40 pb-1">
              <span>DAY 2 ROUTE OPTIMIZATION</span>
              <span className="bg-earth-terracotta/10 px-1 rounded">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between">
              <span>1. Temple Stay Lodging</span>
              <span className="text-[9px] text-earth-charcoal/40">09:00 AM</span>
            </div>
            <div className="text-center text-earth-terracotta text-[8px] font-bold border-l-2 border-dashed border-earth-terracotta/40 py-1.5 ml-2">
              ↓ 12-min transit (3.1 mi) • Optimized Route
            </div>
            <div className="flex items-center justify-between">
              <span>2. Master Tea Workshop</span>
              <span className="text-[9px] text-earth-charcoal/40">10:30 AM</span>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-earth-moss-light border border-earth-sand p-6 rounded-sm space-y-4 flex flex-col justify-between text-left">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-sm bg-earth-cream border border-earth-sand flex items-center justify-center text-earth-terracotta">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-earth-charcoal">Total Booking Autopilot</h3>
            <p className="text-xs text-earth-charcoal/80 font-light leading-relaxed">
              No more jumping between 15 booking tabs. Once your skeleton itinerary is calibrated, toggle individual activities or stays to "Automated". Our booking desk immediately manages deposits, holds tables, and confirms keys.
            </p>
          </div>

          <div className="bg-earth-cream border border-earth-sand/60 p-3.5 rounded font-mono text-[10px] text-earth-charcoal/70 space-y-2 mt-4">
            <div className="flex justify-between items-center text-[9px] border-b border-earth-sand/40 pb-1">
              <span className="font-bold text-earth-charcoal">SECURED ASSETS</span>
              <span className="text-[8px] bg-earth-moss/20 text-earth-moss px-1.5 py-0.5 rounded font-extrabold uppercase">AUTO</span>
            </div>
            <div className="flex items-center justify-between text-earth-charcoal/90">
              <span className="flex items-center gap-1">🏨 Ryokan Terrace Room</span>
              <span className="text-earth-moss font-bold">CONFIRMED</span>
            </div>
            <div className="flex items-center justify-between text-earth-charcoal/90">
              <span className="flex items-center gap-1">🚄 Shinkansen Green Pass</span>
              <span className="text-earth-moss font-bold">CONFIRMED</span>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-earth-moss-light border border-earth-sand p-6 rounded-sm space-y-4 flex flex-col justify-between text-left">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-sm bg-earth-cream border border-earth-sand flex items-center justify-center text-earth-terracotta">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-earth-charcoal">Budget Caps & Curation</h3>
            <p className="text-xs text-earth-charcoal/80 font-light leading-relaxed">
              You establish your daily cost limit or total trip budget cap. We apportion your funds intelligently across accommodation categories, private guides, and meals, instantly warning you if a choice threatens your targets.
            </p>
          </div>

          <div className="bg-earth-cream border border-earth-sand/60 p-3.5 rounded font-mono text-[10px] text-earth-charcoal/70 space-y-2.5 mt-4">
            <div className="flex justify-between text-[9px] font-bold">
              <span>TOTAL TRIP BUDGET CAP</span>
              <span className="text-earth-terracotta">$4,000.00</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[8px] text-earth-charcoal/50">
                <span>Lodging Allocation ($2,200)</span>
                <span>55%</span>
              </div>
              <div className="w-full bg-earth-sand/40 h-1.5 rounded-full overflow-hidden">
                <div className="bg-earth-terracotta h-full w-[55%]" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[8px] text-earth-charcoal/50">
                <span>Experiences & Transit ($1,100)</span>
                <span>27%</span>
              </div>
              <div className="w-full bg-earth-sand/40 h-1.5 rounded-full overflow-hidden">
                <div className="bg-earth-terracotta h-full w-[27%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="bg-earth-moss-light border border-earth-sand p-6 rounded-sm space-y-4 flex flex-col justify-between text-left">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-sm bg-earth-cream border border-earth-sand flex items-center justify-center text-earth-terracotta">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-earth-charcoal">Flight Parsing & Document Hub</h3>
            <p className="text-xs text-earth-charcoal/80 font-light leading-relaxed">
              Forward your flight receipts or PDF reservations. Our background parsing engine extracts flight numbers, boarding terminals, baggage guidelines, and layover margins, embedding them cleanly directly into your Day 1 schedule.
            </p>
          </div>

          <div className="bg-earth-cream border border-earth-sand/60 p-3 rounded font-mono text-[9px] text-earth-charcoal/70 flex gap-2.5 mt-4 items-center">
            <div className="p-2 bg-earth-terracotta/15 rounded text-earth-terracotta text-center font-bold text-[8px]">PDF</div>
            <div>
              <p className="font-bold text-earth-charcoal">UA-8902_Flight_Confirm.pdf</p>
              <p className="text-earth-charcoal/40 text-[8px]">Parsed successfully • Day 1 Departure 08:30 AM</p>
            </div>
          </div>
        </div>

        {/* Feature 5 */}
        <div className="bg-earth-moss-light border border-earth-sand p-6 rounded-sm space-y-4 flex flex-col justify-between text-left">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-sm bg-earth-cream border border-earth-sand flex items-center justify-center text-earth-terracotta">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-earth-charcoal">Real-Time Team Sync</h3>
            <p className="text-xs text-earth-charcoal/80 font-light leading-relaxed">
              Invite fellow travelers, family members, or colleagues. Together with your designated ground agent, collaborate inside the same calendar, pool suggested places, review daily budgets, and finalize booking approvals instantly.
            </p>
          </div>

          <div className="bg-earth-cream border border-earth-sand/60 p-3 rounded font-mono text-[9px] text-earth-charcoal/70 space-y-2 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Mark D. is editing Dinner Reservation...</span>
            </div>
            <div className="flex items-center space-x-2 text-earth-charcoal/40">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
              <span>Elena S. pinned Gion Tea Master ceremony</span>
            </div>
          </div>
        </div>

        {/* Feature 6 */}
        <div className="bg-earth-moss-light border border-earth-sand p-6 rounded-sm space-y-4 flex flex-col justify-between text-left">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-sm bg-earth-cream border border-earth-sand flex items-center justify-center text-earth-terracotta">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-earth-charcoal">Google Maps Export & Offline Mode</h3>
            <p className="text-xs text-earth-charcoal/80 font-light leading-relaxed">
              Headed deep into Patagonia valleys or offline Kyoto alleys? One-click exports sync all optimized pins into your personal Google Maps profile. Download our beautiful editorial guide to read and navigate entirely offline.
            </p>
          </div>

          <div className="bg-earth-cream border border-earth-sand/60 p-3 rounded flex justify-between items-center text-[10px] font-mono mt-4">
            <span className="text-earth-charcoal/70">Google Maps Sync</span>
            <span className="text-[8px] bg-earth-terracotta text-earth-cream px-1.5 py-0.5 rounded font-bold font-sans">SYNCED</span>
          </div>
        </div>

      </div>
    </section>
  );
};

// --- GROUND TRUTH FRAMEWORK ---
export const GroundTruthCallout: React.FC = () => {
  return (
    <section className="bg-earth-charcoal text-earth-cream py-16 px-6 md:py-24 border-y border-earth-sand/15 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-earth-terracotta/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-left">
            <span className="font-mono text-xs text-earth-terracotta font-extrabold uppercase tracking-widest block">The Ground-Truth Standard</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
              AI is the Tastemaker. <br />
              <span className="italic text-earth-terracotta">Our Verified Operator Network is the Executor.</span>
            </h2>
            <p className="text-xs sm:text-sm text-earth-cream/80 font-light leading-relaxed">
              Generic travel apps generate static AI ideas that lead to dead ends—non-existent restaurants, shut-down train lines, or unbookable lodges. 
            </p>
            <p className="text-xs sm:text-sm text-earth-cream/85 font-light leading-relaxed">
              At Lodestone, our intelligence engine is hard-linked to actual operator databases. AI acts as the creative curator matching your personal style coordinates, but every flight option, ryokan reservation, and local experience is cross-checked and grounded against live, verified real-world booking channels before it is presented to you.
            </p>
          </div>
          
          <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-sm space-y-6 text-left">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-earth-terracotta/20 text-earth-terracotta rounded mt-1">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">AI Style Tastemaker</h4>
                <p className="text-[11px] text-earth-cream/70 font-light leading-relaxed mt-0.5">
                  Analyzes your calibration answers, leave days, and micro-budget parameters to curate tailored, highly creative pacing grids.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 border-t border-white/10 pt-4">
              <div className="p-2 bg-earth-moss/20 text-earth-moss rounded mt-1">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Grounded Truth Sync</h4>
                <p className="text-[11px] text-earth-cream/70 font-light leading-relaxed mt-0.5">
                  Queries verified supplier logs and airline desks to prove availability, filter out seasonal closures, and lock down exact prices.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 border-t border-white/10 pt-4">
              <div className="p-2 bg-blue-500/20 text-blue-300 rounded mt-1">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Frictionless Booking Import</h4>
                <p className="text-[11px] text-earth-cream/70 font-light leading-relaxed mt-0.5">
                  Simply forward external tickets, hotel PDFs, or flight receipts to your Lodestone address to fuse external reservations into your master route.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- THE AGENCY CRAFT (ELENA PROFILE) ---
export const AgencyCraft: React.FC = () => {
  return (
    <section id="agency-craft" className="bg-gradient-to-b from-white via-indigo-50/20 to-white py-24 lg:py-32 relative overflow-hidden border-t border-earth-sand/20">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-200/15 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Header block with elegant display typography */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <span className="font-mono text-[10px] text-rose-600 font-black uppercase tracking-widest block bg-rose-100/80 border border-rose-200 px-3.5 py-1.5 rounded-full w-max mx-auto">
            Meet Elena — Your Best Friend & Travel Agent
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-earth-charcoal tracking-tight font-normal leading-tight">
            Like a Best Friend Obsessed with <br />
            <span className="italic font-semibold">Your Next Big Adventure</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-400 mx-auto rounded-full" />
          <p className="text-xs sm:text-sm text-earth-charcoal/80 max-w-2xl mx-auto leading-relaxed font-light">
            We threw away the corporate playbook. Think of us as your hyper-connected, adventure-loving best friend who knows your secret coffee orders, gets your visa sorted, and is always excited to drag you to some hidden waterfall or rooftop sake bar.
          </p>
        </div>

        {/* 4 Pillars of Personalized Best Friend Agency Service */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Pillar 1 */}
          <div className="bg-gradient-to-br from-indigo-50/90 via-sky-50/70 to-white border border-indigo-100 rounded-2xl p-6 lg:p-8 space-y-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:scale-[1.02]">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center border border-indigo-200/50">
                <Heart className="w-6 h-6 fill-indigo-200" />
              </div>
              <div className="space-y-2 text-left">
                <span className="font-mono text-[9px] uppercase tracking-wider text-indigo-700 font-black block">01 : DEEP EMPATHY</span>
                <h3 className="font-serif text-lg font-bold text-indigo-950">We Just "Get" You</h3>
                <p className="text-xs text-indigo-900/80 leading-relaxed font-light">
                  Hate crowded mornings? Need an ocean run before breakfast? We map your biological rhythm, leaves, and quirks perfectly so every recommendation feels like it was suggested by someone who's known you for ten years.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-indigo-200/40 text-left">
              <span className="text-[10px] font-mono text-indigo-800 font-bold block">💖 Custom rhythm matching</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/70 to-white border border-amber-100 rounded-2xl p-6 lg:p-8 space-y-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:scale-[1.02]">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-200/50">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-2 text-left">
                <span className="font-mono text-[9px] uppercase tracking-wider text-amber-700 font-black block">02 : ALWAYS ON DUTY</span>
                <h3 className="font-serif text-lg font-bold text-amber-950">Always On The Lookout</h3>
                <p className="text-xs text-amber-900/80 leading-relaxed font-light">
                  While you are busy working, we are hunting. When a flight price drops, a rare omakase counter seat frees up, or a hidden beach cove opens for private sunrise access, we grab it for you.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-amber-200/40 text-left">
              <span className="text-[10px] font-mono text-amber-800 font-bold block">✨ Instant seat & price snags</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-gradient-to-br from-rose-50/90 via-pink-50/70 to-white border border-rose-100 rounded-2xl p-6 lg:p-8 space-y-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:scale-[1.02]">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center border border-rose-200/50">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-2 text-left">
                <span className="font-mono text-[9px] uppercase tracking-wider text-rose-700 font-black block">03 : EXCITING DRIFT</span>
                <h3 className="font-serif text-lg font-bold text-rose-950">Excitedly Tailored Trips</h3>
                <p className="text-xs text-rose-900/80 leading-relaxed font-light">
                  "You have GOT to see this sunset cove!" Elena bubbles with exciting local secrets she can’t wait to drag you to. Absolute custom design, visa checks, and local secrets blended together.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-rose-200/40 text-left">
              <span className="text-[10px] font-mono text-rose-800 font-bold block">🗺️ Handpicked hidden local spots</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="bg-gradient-to-br from-emerald-50/90 via-teal-50/70 to-white border border-emerald-100 rounded-2xl p-6 lg:p-8 space-y-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:scale-[1.02]">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-200/50">
                <Shield className="w-6 h-6" />
              </div>
              <div className="space-y-2 text-left">
                <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-700 font-black block">04 : ZERO WORRY</span>
                <h3 className="font-serif text-lg font-bold text-emerald-950">Direct Rates & Visa Audits</h3>
                <p className="text-xs text-emerald-900/80 leading-relaxed font-light">
                  We guard your budget fiercely like a true friend. We scan and audit visa requirements, land border crossings, and booking receipts with zero markup, giving you a safe, clear pathway.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-emerald-200/40 text-left">
              <span className="text-[10px] font-mono text-emerald-800 font-bold block">🔒 Clean direct prices & visa audits</span>
            </div>
          </div>

        </div>

        {/* Interactive Flow Diagram */}
        <div className="bg-gradient-to-r from-amber-50/50 via-rose-50/45 to-sky-50/40 border border-earth-sand/60 rounded-2xl p-6 lg:p-10 space-y-6 max-w-5xl mx-auto shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-mono text-[9px] text-rose-600 uppercase tracking-wider font-extrabold block">HOW THE MAGIC HAPPENS</span>
            <h4 className="font-serif text-lg font-bold text-earth-charcoal">From Custom Chat to Your Next Great Escape</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="space-y-2 text-left bg-white/95 border border-indigo-100 p-6 rounded-2xl shadow-sm relative transition-all hover:-translate-y-0.5">
              <div className="absolute top-4 right-4 text-xs font-mono font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">01</div>
              <h5 className="font-serif text-sm font-bold text-indigo-950">1. Share Your Vibe</h5>
              <p className="text-[11px] text-indigo-900/80 leading-relaxed font-light">
                Tell Elena your leaves, budget, and exact level of adventure. She gets your style instantly and starts matching you with beautiful spots.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-2 text-left bg-white/95 border border-amber-100 p-6 rounded-2xl shadow-sm relative transition-all hover:-translate-y-0.5">
              <div className="absolute top-4 right-4 text-xs font-mono font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">02</div>
              <h5 className="font-serif text-sm font-bold text-amber-950">2. Elena Hunts Secrets</h5>
              <p className="text-[11px] text-amber-900/80 leading-relaxed font-light">
                Elena filters real visa requirements, locks direct airline desks, and builds your custom daily tempos with local gems you can’t wait for.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-2 text-left bg-white/95 border border-rose-100 p-6 rounded-2xl shadow-sm relative transition-all hover:-translate-y-0.5">
              <div className="absolute top-4 right-4 text-xs font-mono font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">03</div>
              <h5 className="font-serif text-sm font-bold text-rose-950">3. Adopt & Wander!</h5>
              <p className="text-[11px] text-rose-900/80 leading-relaxed font-light">
                Instantly load the slow-tempo route into your dashboard, customize details with one-click, and step out onto your dream beach.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// --- PRE-MADE CURATED ITINERARIES ---
interface CuratedItinerariesProps {
  onAdoptItinerary: (destId: string) => void;
}
export const CuratedItineraries: React.FC<CuratedItinerariesProps> = ({ onAdoptItinerary }) => {
  return (
    <section id="itineraries" className="bg-earth-sand/20 py-20 lg:py-28 border-y border-earth-sand/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="font-mono text-xs text-earth-terracotta font-bold uppercase tracking-widest">Featured Departures</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-earth-charcoal tracking-tight leading-tight">
            Pre-Calibrated Route Curations
          </h2>
          <p className="text-sm text-earth-charcoal/70 font-light">
            Select one of our highly refined master layouts. Clicking "Adopt & Customize" pre-fills your travel profile coordinates and boots you straight into your custom planning dashboard with Elena.
          </p>
        </div>

        {/* Grid of Itineraries */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {DESTINATIONS.map(dest => {
            const costEst = dest.averageDailyCost * dest.suggestedDuration + 1500;
            return (
              <div 
                key={dest.id} 
                className="bg-earth-cream border border-earth-sand rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all hover:scale-[1.01] group text-left"
                id={`featured-itinerary-card-${dest.id}`}
              >
                <div>
                  {/* Destination Image */}
                  <div className="relative h-56 w-full overflow-hidden bg-earth-sand/30">
                    <img 
                      src={dest.imageUrl} 
                      alt={dest.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-earth-cream/90 backdrop-blur-xs border border-earth-sand px-3 py-1 text-[10px] font-mono uppercase tracking-widest font-extrabold rounded-sm text-earth-charcoal">
                      {dest.suggestedDuration} Days / {dest.suggestedDuration - 1} Nights
                    </div>
                    <div className="absolute bottom-4 right-4 bg-earth-charcoal text-earth-cream px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wide">
                      Est: ${costEst.toLocaleString()} Total
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-earth-terracotta uppercase tracking-wider font-extrabold block">
                        {dest.country} • {dest.idealPace <= 40 ? 'Slow & Mindful' : dest.idealPace <= 65 ? 'Balanced Exploration' : 'High Energy Activity'}
                      </span>
                      <h3 className="font-serif text-2xl text-earth-charcoal font-normal tracking-tight group-hover:text-earth-terracotta transition-colors">
                        {dest.name}
                      </h3>
                    </div>

                    <p className="text-xs text-earth-charcoal/70 leading-relaxed font-light line-clamp-3">
                      {dest.tagline} {dest.description}
                    </p>

                    {/* Travel Coordinates Metrics */}
                    <div className="bg-earth-moss-light p-3.5 border border-earth-sand/60 rounded space-y-2.5">
                      <span className="font-mono text-[9px] text-earth-charcoal/50 block font-bold uppercase tracking-wider">Style Coordinates Alignment:</span>
                      
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] font-mono">
                        <div className="flex justify-between">
                          <span className="text-earth-charcoal/60">Gastronomy:</span>
                          <span className="font-bold text-earth-charcoal">{dest.interestMatch.food}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-earth-charcoal/60">Heritage:</span>
                          <span className="font-bold text-earth-charcoal">{dest.interestMatch.culture}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-earth-charcoal/60">Nature:</span>
                          <span className="font-bold text-earth-charcoal">{dest.interestMatch.nature}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-earth-charcoal/60">Daily Pace:</span>
                          <span className="font-bold text-earth-charcoal">{dest.idealPace}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Accommodation Preview */}
                    <div className="text-[11px] text-earth-charcoal/80 flex items-start gap-2 pt-1">
                      <span className="font-bold font-serif text-earth-terracotta italic text-sm">Lodging:</span>
                      <span className="font-light">{dest.recommendedAccommodation}</span>
                    </div>
                  </div>
                </div>

                {/* Adopt Action Button */}
                <div className="px-6 pb-6 pt-2 border-t border-earth-sand/30">
                  <button
                    onClick={() => onAdoptItinerary(dest.id)}
                    className="w-full py-3.5 bg-earth-terracotta hover:bg-earth-terracotta-dark text-earth-cream font-mono text-[11px] font-bold uppercase tracking-wider transition-all rounded-sm flex items-center justify-center gap-1.5"
                    id={`btn-adopt-itinerary-${dest.id}`}
                  >
                    <span>Adopt & Customize Route</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// --- PRICING PLANS ---
interface PricingPlansProps {
  onStartCalibration: () => void;
}
export const PricingPlans: React.FC<PricingPlansProps> = ({ onStartCalibration }) => {
  return (
    <section id="plans" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 space-y-16">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="font-mono text-xs text-earth-terracotta font-bold uppercase tracking-widest">Plans & Access Tiers</span>
        <h2 className="font-serif text-3xl sm:text-4xl text-earth-charcoal tracking-tight">
          Transparent pricing for every tier of travel
        </h2>
        <div className="w-12 h-0.5 bg-earth-terracotta mx-auto" />
        <p className="text-xs sm:text-sm text-earth-charcoal/70 font-light max-w-xl mx-auto leading-relaxed">
          Choose the degree of ground coordination you need. From client-side mapping to complete concierge-backed departure protection.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        
        {/* Card 1 */}
        <div className="bg-earth-cream border border-earth-sand rounded-sm p-8 flex flex-col justify-between hover:shadow-md transition-all relative">
          <div className="space-y-6 text-left">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest font-extrabold text-earth-charcoal/50">PLANNING CORE</span>
              <h3 className="font-serif text-2xl text-earth-charcoal mt-1">Free Tier</h3>
              <p className="text-xs text-earth-charcoal/60 font-light mt-1">Perfect for solo organizers and draft creators.</p>
            </div>

            <div className="flex items-baseline space-x-1">
              <span className="font-serif text-4xl text-earth-charcoal font-normal">$0</span>
              <span className="text-[11px] font-mono text-earth-charcoal/50">/ forever</span>
            </div>

            <div className="w-full h-px bg-earth-sand/50" />

            <ul className="space-y-3.5 text-xs text-earth-charcoal/80 font-light">
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Access to custom itinerary builder</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Interactive Route Optimizations</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Real-time budget guardrail allocation</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Offline Google Maps pin exports</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <button
              onClick={onStartCalibration}
              className="w-full py-3 border border-earth-charcoal/20 hover:border-earth-charcoal hover:bg-earth-sand/10 text-earth-charcoal font-mono text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all"
              id="btn-plan-free"
            >
              Start Free Planning
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-earth-moss-light border-2 border-earth-terracotta rounded-sm p-8 flex flex-col justify-between shadow-md relative transform lg:-translate-y-2">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-earth-terracotta text-earth-cream font-mono text-[9px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full">
            Most Popular
          </div>
          
          <div className="space-y-6 text-left">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest font-extrabold text-earth-terracotta">AUTOPILOT PLUS</span>
              <h3 className="font-serif text-2xl text-earth-charcoal mt-1">Pro Access</h3>
              <p className="text-xs text-earth-charcoal/60 font-light mt-1">For active travelers securing verified rooms & experiences.</p>
            </div>

            <div className="flex items-baseline space-x-1">
              <span className="font-serif text-4xl text-earth-charcoal font-normal">$19</span>
              <span className="text-[11px] font-mono text-earth-charcoal/50">/ active trip</span>
            </div>

            <div className="w-full h-px bg-earth-sand/50" />

            <ul className="space-y-3.5 text-xs text-earth-charcoal/90 font-light">
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>All planning tools & map capabilities</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span className="font-semibold text-earth-charcoal">Direct booking & PDF receipt import engine</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Automated stay, flight & dinner reservation execution</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span className="font-semibold text-earth-charcoal">24/7 Transit Emergency Support coverage</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Unified single-invoice billing format</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <button
              onClick={onStartCalibration}
              className="w-full py-3.5 bg-earth-terracotta hover:bg-earth-terracotta-dark text-earth-cream font-mono text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
              id="btn-plan-pro"
            >
              Adopt Pro Coordinates
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-earth-cream border border-earth-sand rounded-sm p-8 flex flex-col justify-between hover:shadow-md transition-all relative">
          <div className="space-y-6 text-left">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest font-extrabold text-earth-charcoal/50">EXPERT CO-PILOT</span>
              <h3 className="font-serif text-2xl text-earth-charcoal mt-1">Concierge Elite</h3>
              <p className="text-xs text-earth-charcoal/60 font-light mt-1">For ultra-bespoke itineraries backed by expert stewards.</p>
            </div>

            <div className="flex items-baseline space-x-1">
              <span className="font-serif text-4xl text-earth-charcoal font-normal">$399</span>
              <span className="text-[11px] font-mono text-earth-charcoal/50">/ active trip</span>
            </div>

            <div className="w-full h-px bg-earth-sand/50" />

            <ul className="space-y-3.5 text-xs text-earth-charcoal/80 font-light">
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span className="font-semibold text-earth-charcoal">All Pro features included</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span className="font-semibold text-earth-charcoal">Live on-the-ground travel agents helping 24/7</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Unlimited custom activity sourcing & secure bookings</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Direct phone, WhatsApp & app channels with Elena's team</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Real-time flight delay tracking & automatic re-routing</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <button
              onClick={onStartCalibration}
              className="w-full py-3 border border-earth-charcoal hover:bg-earth-charcoal hover:text-earth-cream text-earth-charcoal font-mono text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all"
              id="btn-plan-concierge"
            >
              Secure Concierge Desk
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

// --- REVIEWS ---
export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="bg-earth-beige/60 py-20 lg:py-28 border-y border-earth-sand/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="font-mono text-xs text-earth-terracotta font-bold uppercase tracking-widest">Client Testimonials</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-earth-charcoal tracking-tight font-normal leading-tight">
            Calibrated Departures, <br /><span className="italic text-earth-terracotta">Realized Truths</span>
          </h2>
          <div className="w-12 h-0.5 bg-earth-terracotta mx-auto" />
          <p className="text-xs sm:text-sm text-earth-charcoal/70 font-light max-w-xl mx-auto leading-relaxed">
            Read how explorers use Lodestone to scrap the standard cookie-cutter group plans and sync exact daily pacing with Gion bar tours, slow beach strolls, and vetted flights.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Review 1 */}
          <div className="bg-white border border-earth-sand rounded-sm p-8 flex flex-col justify-between hover:shadow-md transition-all relative">
            <div className="space-y-4 text-left">
              <div className="flex text-earth-terracotta">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-earth-terracotta" />
                ))}
              </div>
              <p className="text-xs text-earth-charcoal/90 italic leading-relaxed font-light">
                "I was terrified Kyoto would feel like a series of endless tourist traps. Elena completely rewrote my calendar. She dropped the crowded 5th museum and substituted a 400-year-old teahouse ceremony. Absolute magic."
              </p>
            </div>
            
            <div className="flex items-center space-x-3.5 pt-6 border-t border-earth-sand/50 mt-6 text-left">
              <div className="w-10 h-10 bg-earth-sand rounded-full flex items-center justify-center text-xs font-mono font-bold text-earth-charcoal">
                AH
              </div>
              <div>
                <h4 className="text-xs font-bold text-earth-charcoal">Aris Thorne</h4>
                <div className="flex items-center space-x-1.5 text-[10px] font-mono text-earth-charcoal/50">
                  <span>The Mindful Wanderer</span>
                  <span>•</span>
                  <span className="text-earth-terracotta font-bold">Kyoto</span>
                </div>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-white border border-earth-sand rounded-sm p-8 flex flex-col justify-between hover:shadow-md transition-all relative">
            <div className="space-y-4 text-left">
              <div className="flex text-earth-terracotta">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-earth-terracotta" />
                ))}
              </div>
              <p className="text-xs text-earth-charcoal/90 italic leading-relaxed font-light">
                "The interactive drag-and-drop sandbox sold me, but the live experience was even better. We forwarded our flight arrival receipt, and the Lodestone engine instantly adapted the hotel check-ins and Gion alleyway bar crawl to prevent jetlag fatigue."
              </p>
            </div>
            
            <div className="flex items-center space-x-3.5 pt-6 border-t border-earth-sand/50 mt-6 text-left">
              <div className="w-10 h-10 bg-earth-sand rounded-full flex items-center justify-center text-xs font-mono font-bold text-earth-charcoal">
                MC
              </div>
              <div>
                <h4 className="text-xs font-bold text-earth-charcoal">Marcus Cole</h4>
                <div className="flex items-center space-x-1.5 text-[10px] font-mono text-earth-charcoal/50">
                  <span>Midnight Explorer</span>
                  <span>•</span>
                  <span className="text-earth-terracotta font-bold">Tuscany</span>
                </div>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-white border border-earth-sand rounded-sm p-8 flex flex-col justify-between hover:shadow-md transition-all relative">
            <div className="space-y-4 text-left">
              <div className="flex text-earth-terracotta">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-earth-terracotta" />
                ))}
              </div>
              <p className="text-xs text-earth-charcoal/90 italic leading-relaxed font-light">
                "Group travel with 6 friends with different sleep patterns is a logistical nightmare. Lodestone synchronized our style coordinates seamlessly. We slept in, did a quiet beach sunrise solo, and all met up for late-night sake and ramen."
              </p>
            </div>
            
            <div className="flex items-center space-x-3.5 pt-6 border-t border-earth-sand/50 mt-6 text-left">
              <div className="w-10 h-10 bg-earth-sand rounded-full flex items-center justify-center text-xs font-mono font-bold text-earth-charcoal">
                SV
              </div>
              <div>
                <h4 className="text-xs font-bold text-earth-charcoal">Sofia Valenz</h4>
                <div className="flex items-center space-x-1.5 text-[10px] font-mono text-earth-charcoal/50">
                  <span>Group Coordinator</span>
                  <span>•</span>
                  <span className="text-earth-terracotta font-bold">Okinawa</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- FAQS ---
export const Faqs: React.FC = () => {
  return (
    <section id="faq" className="bg-earth-sand/10 py-20 lg:py-28 border-t border-earth-sand/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-4">
          <span className="font-mono text-xs text-earth-terracotta font-bold uppercase tracking-widest">Have Questions?</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-earth-charcoal tracking-tight">
            Frequently Calibrated Queries
          </h2>
          <div className="w-12 h-0.5 bg-earth-terracotta mx-auto" />
        </div>

        <div className="space-y-6">
          
          <div className="bg-earth-moss-light border border-earth-sand p-6 rounded-sm text-left">
            <h4 className="font-serif text-lg font-bold text-earth-charcoal mb-2">How are we different from standard planners?</h4>
            <p className="text-xs text-earth-charcoal/80 font-light leading-relaxed">
              Standard planners give you general, static recommendations. Lodestone calculates routes dynamically based on your budget caps, visa parameters, and pacing density. Furthermore, we are your real-world agents—we have human staff on the ground to secure room allocations, process deposits, and rescue you from flight disruptions in real time.
            </p>
          </div>

          <div className="bg-earth-moss-light border border-earth-sand p-6 rounded-sm text-left">
            <h4 className="font-serif text-lg font-bold text-earth-charcoal mb-2">Can I modify an itinerary once adopted?</h4>
            <p className="text-xs text-earth-charcoal/80 font-light leading-relaxed">
              Absolutely. Adopting an itinerary pre-fills your profile hub, but you retain 100% agency. You can swap days, add custom spots, or toggle individual itinerary blocks between "Automated" (handled by Elena) and "Manual" (completely spontaneous).
            </p>
          </div>

          <div className="bg-earth-moss-light border border-earth-sand p-6 rounded-sm text-left">
            <h4 className="font-serif text-lg font-bold text-earth-charcoal mb-2">How much do your services cost?</h4>
            <p className="text-xs text-earth-charcoal/80 font-light leading-relaxed">
              Calibrating your style profile and editing itineraries is 100% free. If you choose to toggle blocks to "Automated" and let our agents book rooms or tickets, we earn transparent standard affiliate percentages directly from properties—meaning there are no surprise fees added to your bill.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

// --- EDITORIAL FOOTER ---
export const EditorialFooter: React.FC = () => {
  return (
    <footer className="bg-earth-charcoal text-earth-cream/50 py-12 px-6 border-t border-earth-sand/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="font-serif font-bold text-xl tracking-wide text-white block">LODESTONE</span>
          <p className="text-[11px] font-light max-w-sm">
            Engineered automatically to match your style coordinates. Backed by professional concierge staff on the ground.
          </p>
        </div>
        <p className="font-mono text-[9px] tracking-wide text-center">
          &copy; 2026 Lodestone Travel LLC. All rights reserved. Crafted for intentional departures.
        </p>
      </div>
    </footer>
  );
};
