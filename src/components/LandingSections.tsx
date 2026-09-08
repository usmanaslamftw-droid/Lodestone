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
        <div className="inline-flex items-center space-x-2 bg-earth-moss-light text-earth-charcoal border border-earth-sand px-3.5 py-2 rounded-full text-xs font-mono tracking-wider shadow-xs">
          <span className="w-2 h-2 rounded-full bg-earth-terracotta animate-pulse" />
          <span className="text-[10px] font-bold uppercase">Your Hyper-Connected Travel Best Friend & Curation Engine</span>
        </div>
        
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-earth-charcoal leading-[1.08] tracking-tight font-normal">
          Like a Best Friend Obsessed With <br />
          <span className="italic text-earth-terracotta font-semibold">Your Next Big Adventure.</span>
        </h1>
        
        <p className="text-base sm:text-lg text-earth-charcoal/80 font-light leading-relaxed">
          We threw away the corporate travel playbook. Think of Lodestone as your hyper-connected, adventure-loving best friend who knows your secret coffee orders, gets your visa sorted, and is always excited to drag you to hidden coves, rooftop sake bars, and bespoke boutique escapes — powered by precision algorithm matching and optional ground stewardship when you want on-the-ground execution.
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4 pt-4">
          <button
            onClick={onStartCalibration}
            className="inline-flex items-center justify-center px-7 py-4 bg-earth-terracotta hover:bg-earth-terracotta-dark text-white font-semibold text-sm tracking-wide transition-all shadow-md group rounded-sm"
            id="btn-hero-start"
          >
            Start Your Best Friend Calibration
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <a
            href="#itineraries"
            className="inline-flex items-center justify-center px-7 py-4 border border-earth-sand hover:border-earth-charcoal bg-earth-moss-light/60 font-semibold text-sm tracking-wide text-earth-charcoal transition-colors rounded-sm"
          >
            Explore Curated Routes
          </a>
        </div>
      </div>

      {/* Hero Image Collage */}
      <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-6 relative">
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          {/* Main Picture */}
          <div className="relative overflow-hidden shadow-xl border-4 border-earth-sand/40 aspect-[4/3] rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=1200"
              alt="Cobblestone Amalfi coast view with sea"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 bg-[#0B0F17]/90 text-slate-100 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 backdrop-blur-xs rounded-xs border border-slate-800">
              Praiano Coastline, Campania
            </div>
          </div>

          {/* Overlapping Secondary Picture */}
          <div className="absolute -bottom-8 -left-8 w-1/2 overflow-hidden shadow-xl border-4 border-earth-sand/40 aspect-square hidden sm:block rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600"
              alt="Kyoto traditional alley"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Real-time agent activity widget */}
          <div className="absolute -top-6 -right-6 bg-earth-moss-light text-earth-charcoal text-xs border border-earth-sand px-4 py-3.5 shadow-xl rounded-sm max-w-[270px] space-y-2">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-earth-terracotta animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-wider font-extrabold text-earth-terracotta">CURATION ALGORITHM LIVE</span>
            </div>
            <p className="text-[11px] leading-relaxed text-earth-charcoal/80 font-light text-left">
              <strong className="font-serif italic font-bold">Matching Index 98%</strong> — Calibrating 3 boutique nights in Amalfi at a 45% daily pace for a traveler from Chicago.
            </p>
            <div className="text-[9px] font-mono text-earth-charcoal/50 text-left">Status: Optimal route & rest ratio locked</div>
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
    <section className="bg-earth-sand/10 border-t border-earth-sand/30 py-20 px-4 sm:px-6 relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="font-mono text-[10px] text-earth-terracotta font-black uppercase tracking-widest block bg-earth-sand/30 border border-earth-sand px-3.5 py-1 rounded-full w-max mx-auto">
            Immunity From Overrated Traps
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-earth-charcoal tracking-tight font-normal leading-tight">
            We Shield You From Overrated Tourist Traps
          </h2>
          <div className="w-16 h-1 bg-earth-terracotta mx-auto rounded-full" />
          <p className="text-xs sm:text-sm text-earth-charcoal/80 max-w-2xl mx-auto leading-relaxed font-light">
            Corporate group agencies herd tourists into commission-driven souvenirs, stuffy buses, and crowded monument gift shops. Lodestone uses intelligent curation algorithms to filter out travel noise and spotlight authentic local gems.
          </p>
        </div>

        {/* Trap Shield Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Traps Filtered Card */}
          <div className="bg-earth-moss-light border border-earth-sand/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs relative overflow-hidden text-left">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-earth-terracotta font-extrabold uppercase tracking-wider bg-earth-terracotta/10 border border-earth-terracotta/30 px-3 py-1 rounded-md">
                🛑 TOURIST TRAPS FILTERED
              </span>
              <span className="text-xl">🚍</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-earth-charcoal">Overpriced & Commission-Driven</h3>
              <p className="text-xs text-earth-charcoal/70 leading-relaxed font-light">
                Avoid rigid schedules designed solely to squeeze kickbacks out of unsuspecting tourist buses.
              </p>
            </div>
            <ul className="space-y-2 pt-2 border-t border-earth-sand/30">
              {[
                "Forced 06:00 AM cattle-call tours in crowded group shuttles",
                "Overpriced commercial gift counters with fake local goods",
                "Stuffy, repetitive '5th museum' stops with zero historical value",
                "No options to rest or change course when heavy rain hits"
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-2.5 text-xs text-earth-charcoal/80 font-light">
                  <span className="text-earth-terracotta shrink-0 font-bold mt-0.5">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vetted Experience Card */}
          <div className="bg-earth-moss-light border border-earth-sand/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs relative overflow-hidden text-left">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-earth-moss font-extrabold uppercase tracking-wider bg-earth-moss/10 border border-earth-moss/30 px-3 py-1 rounded-md">
                ✨ CURATED LODESTONE FLOW
              </span>
              <span className="text-xl">🍃</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-earth-charcoal">Pure, Curated Local Tempos</h3>
              <p className="text-xs text-earth-charcoal/70 leading-relaxed font-light">
                Tailor-designed trails that breathe naturally and adapt dynamically based on your preferences and local rhythm.
              </p>
            </div>
            <ul className="space-y-2 pt-2 border-t border-earth-sand/30">
              {[
                "Slow-tempo strolls on secluded coastlines and quiet alleys",
                "Matching the environment's current daily climate score automatically",
                "Zero hidden markups with direct rate transparency from local operators",
                "Authentic culinary counters matched with verified seating availability"
              ].map((item, i) => (
                <li key={i} className="flex items-start space-x-2.5 text-xs text-earth-charcoal/80 font-light">
                  <span className="text-earth-moss shrink-0 font-bold mt-0.5">✓</span>
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
        <span className="font-mono text-xs text-earth-terracotta font-bold uppercase tracking-widest">Master Curation Suite</span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-earth-charcoal tracking-tight leading-tight">
          Precision Curation Meets Intelligent Route Optimizations
        </h2>
        <div className="w-16 h-0.5 bg-earth-terracotta mx-auto my-4" />
        <p className="text-sm sm:text-base text-earth-charcoal/70 leading-relaxed font-light">
          We combine interactive, map-first itinerary building with an algorithmic matching engine and optional ground stewardship packages. Everything you need is structured in one clean, responsive workspace.
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
              <span className="bg-earth-terracotta/10 px-1 rounded">MATCHED</span>
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
            <h3 className="font-serif text-lg font-bold text-earth-charcoal">Curated Itineraries & Ground Stewardship</h3>
            <p className="text-xs text-earth-charcoal/80 font-light leading-relaxed">
              Focus on pure curation and algorithmic precision. Enjoy self-guided exploration, or upgrade to our Ground Stewardship package whenever you need verified local concierge execution and boots-on-the-ground support.
            </p>
          </div>

          <div className="bg-earth-cream border border-earth-sand/60 p-3.5 rounded font-mono text-[10px] text-earth-charcoal/70 space-y-2 mt-4">
            <div className="flex justify-between items-center text-[9px] border-b border-earth-sand/40 pb-1">
              <span className="font-bold text-earth-charcoal">STEWARDSHIP PACKAGE</span>
              <span className="text-[8px] bg-earth-terracotta/10 text-earth-terracotta px-1.5 py-0.5 rounded font-extrabold uppercase">OPTIONAL</span>
            </div>
            <div className="flex items-center justify-between text-earth-charcoal/90">
              <span className="flex items-center gap-1">🏨 Ryokan Terrace Verification</span>
              <span className="text-earth-moss font-bold">VERIFIED</span>
            </div>
            <div className="flex items-center justify-between text-earth-charcoal/90">
              <span className="flex items-center gap-1">🚄 Ground Steward Sync</span>
              <span className="text-earth-moss font-bold">AVAILABLE</span>
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
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
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
    <section className="bg-[#0B0F17] text-slate-100 py-16 px-6 md:py-24 border-y border-earth-sand/30 relative overflow-hidden">
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
    <section id="agency-craft" className="bg-earth-sand/10 py-24 lg:py-32 relative overflow-hidden border-t border-earth-sand/20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Header block with elegant display typography */}
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <span className="font-mono text-[10px] text-earth-terracotta font-black uppercase tracking-widest block bg-earth-sand/30 border border-earth-sand px-3.5 py-1.5 rounded-full w-max mx-auto">
            Algorithm Curation & Ground Verification
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-earth-charcoal tracking-tight font-normal leading-tight">
            Curated By Intelligent Algorithms. <br />
            <span className="italic font-semibold">Grounded By Real Human Stewardship.</span>
          </h2>
          <div className="w-24 h-1 bg-earth-terracotta mx-auto rounded-full" />
          <p className="text-xs sm:text-sm text-earth-charcoal/80 max-w-2xl mx-auto leading-relaxed font-light">
            We focus heavily on curation and perfect algorithm matching for bespoke itineraries. For travelers who desire boots-on-the-ground support, our optional Ground Stewardship package offers ground verification of items and local concierge assistance.
          </p>
        </div>

        {/* 4 Pillars of Curation & Ground Stewardship */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Pillar 1 */}
          <div className="bg-earth-moss-light border border-earth-sand rounded-2xl p-6 lg:p-8 space-y-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-earth-cream text-earth-terracotta flex items-center justify-center border border-earth-sand">
                <Heart className="w-6 h-6 fill-earth-terracotta/20" />
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-earth-terracotta font-black block">01 : ALGORITHMIC MATCHING</span>
                <h3 className="font-serif text-lg font-bold text-earth-charcoal">Style Coordinates Sync</h3>
                <p className="text-xs text-earth-charcoal/80 leading-relaxed font-light">
                  Our algorithm maps your biological rhythm, leave dates, and interest vectors to curate daily tempos that feel completely custom-designed.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-earth-sand/40">
              <span className="text-[10px] font-mono text-earth-terracotta font-bold block">💖 Custom rhythm & pace matching</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-earth-moss-light border border-earth-sand rounded-2xl p-6 lg:p-8 space-y-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-earth-cream text-earth-terracotta flex items-center justify-center border border-earth-sand">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-earth-terracotta font-black block">02 : GROUND STEWARDSHIP</span>
                <h3 className="font-serif text-lg font-bold text-earth-charcoal">Optional Execution Package</h3>
                <p className="text-xs text-earth-charcoal/80 leading-relaxed font-light">
                  Need on-the-ground item verification, room holds, or local table seats? Add our Ground Stewardship package whenever you want live human assistance.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-earth-sand/40">
              <span className="text-[10px] font-mono text-earth-terracotta font-bold block">✨ Optional live steward add-on</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-earth-moss-light border border-earth-sand rounded-2xl p-6 lg:p-8 space-y-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-earth-cream text-earth-terracotta flex items-center justify-center border border-earth-sand">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-earth-terracotta font-black block">03 : GROUND VERIFICATION</span>
                <h3 className="font-serif text-lg font-bold text-earth-charcoal">Item & Venue Audit</h3>
                <p className="text-xs text-earth-charcoal/80 leading-relaxed font-light">
                  Our network performs real ground verification of items, ensuring venue availability, opening hours, and local quality standards before you arrive.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-earth-sand/40">
              <span className="text-[10px] font-mono text-earth-terracotta font-bold block">🗺️ Ground item & route verification</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="bg-earth-moss-light border border-earth-sand rounded-2xl p-6 lg:p-8 space-y-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-earth-cream text-earth-moss flex items-center justify-center border border-earth-sand">
                <Shield className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-earth-moss font-black block">04 : ZERO WORRY</span>
                <h3 className="font-serif text-lg font-bold text-earth-charcoal">Direct Transparency</h3>
                <p className="text-xs text-earth-charcoal/80 leading-relaxed font-light">
                  Enjoy complete transparency with direct operator pricing, clear budget guardrails, and no surprise markups on your itinerary assets.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-earth-sand/40">
              <span className="text-[10px] font-mono text-earth-moss font-bold block">🔒 Direct rate transparency & safety</span>
            </div>
          </div>

        </div>

        {/* Interactive Flow Diagram */}
        <div className="bg-earth-moss-light border border-earth-sand rounded-2xl p-6 lg:p-10 space-y-6 max-w-5xl mx-auto shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <span className="font-mono text-[9px] text-earth-terracotta uppercase tracking-wider font-extrabold block">HOW THE CURATION FLOW WORKS</span>
            <h4 className="font-serif text-lg font-bold text-earth-charcoal">From Style Calibration To Your Perfect Journey</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="space-y-2 text-left bg-earth-cream border border-earth-sand p-6 rounded-xl relative transition-all">
              <div className="absolute top-4 right-4 text-xs font-mono font-black text-earth-terracotta bg-earth-sand/30 px-2.5 py-1 rounded-full">01</div>
              <h5 className="font-serif text-sm font-bold text-earth-charcoal">1. Calibrate Coordinates</h5>
              <p className="text-[11px] text-earth-charcoal/80 leading-relaxed font-light">
                Input your leave days, budget ceiling, and desired daily pace. The curation engine matches your exact style profile.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-2 text-left bg-earth-cream border border-earth-sand p-6 rounded-xl relative transition-all">
              <div className="absolute top-4 right-4 text-xs font-mono font-black text-earth-terracotta bg-earth-sand/30 px-2.5 py-1 rounded-full">02</div>
              <h5 className="font-serif text-sm font-bold text-earth-charcoal">2. Precision Route Matching</h5>
              <p className="text-[11px] text-earth-charcoal/80 leading-relaxed font-light">
                Our algorithm structures logical transit routes, filters out tourist traps, and constructs a bespoke daily itinerary.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-2 text-left bg-earth-cream border border-earth-sand p-6 rounded-xl relative transition-all">
              <div className="absolute top-4 right-4 text-xs font-mono font-black text-earth-terracotta bg-earth-sand/30 px-2.5 py-1 rounded-full">03</div>
              <h5 className="font-serif text-sm font-bold text-earth-charcoal">3. Optional Ground Stewardship</h5>
              <p className="text-[11px] text-earth-charcoal/80 leading-relaxed font-light">
                Enjoy your itinerary self-guided, or attach our optional Ground Stewardship package for on-the-ground item verification and live steward support.
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
                    <div className="absolute bottom-4 right-4 bg-[#0B0F17] text-slate-100 border border-slate-800 px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wide">
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
          Transparent pricing for curation & ground stewardship
        </h2>
        <div className="w-12 h-0.5 bg-earth-terracotta mx-auto" />
        <p className="text-xs sm:text-sm text-earth-charcoal/70 font-light max-w-xl mx-auto leading-relaxed">
          Start with our core algorithmic curation for free, or add our Ground Stewardship & Item Verification package for on-the-ground execution.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        
        {/* Card 1 */}
        <div className="bg-earth-cream border border-earth-sand rounded-sm p-8 flex flex-col justify-between hover:shadow-md transition-all relative">
          <div className="space-y-6 text-left">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest font-extrabold text-earth-charcoal/50">ALGORITHMIC CURATION</span>
              <h3 className="font-serif text-2xl text-earth-charcoal mt-1">Core Curation</h3>
              <p className="text-xs text-earth-charcoal/60 font-light mt-1">Perfect for self-guided travelers who want precision itinerary matching.</p>
            </div>

            <div className="flex items-baseline space-x-1">
              <span className="font-serif text-4xl text-earth-charcoal font-normal">$0</span>
              <span className="text-[11px] font-mono text-earth-charcoal/50">/ forever</span>
            </div>

            <div className="w-full h-px bg-earth-sand/50" />

            <ul className="space-y-3.5 text-xs text-earth-charcoal/80 font-light">
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Full access to algorithmic curation engine</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Route optimization & transit calculations</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Leave day & budget ceiling guardrails</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Google Maps pin exports & offline mode</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <button
              onClick={onStartCalibration}
              className="w-full py-3 border border-earth-charcoal/30 hover:border-earth-charcoal hover:bg-earth-sand/20 text-earth-charcoal font-mono text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all"
              id="btn-plan-free"
            >
              Start Free Curation
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-earth-moss-light border-2 border-earth-terracotta rounded-sm p-8 flex flex-col justify-between shadow-md relative transform lg:-translate-y-2">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-earth-terracotta text-white font-mono text-[9px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full">
            Recommended Add-On
          </div>
          
          <div className="space-y-6 text-left">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest font-extrabold text-earth-terracotta">ITEM VERIFICATION</span>
              <h3 className="font-serif text-2xl text-earth-charcoal mt-1">Ground Verification</h3>
              <p className="text-xs text-earth-charcoal/60 font-light mt-1">For travelers wanting local item audits and direct rate confirmation.</p>
            </div>

            <div className="flex items-baseline space-x-1">
              <span className="font-serif text-4xl text-earth-charcoal font-normal">$19</span>
              <span className="text-[11px] font-mono text-earth-charcoal/50">/ active trip</span>
            </div>

            <div className="w-full h-px bg-earth-sand/50" />

            <ul className="space-y-3.5 text-xs text-earth-charcoal/90 font-light">
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>All Core Curation features included</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span className="font-semibold text-earth-charcoal">Ground verification of itinerary items & venues</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Direct rate transparency & PDF ticket parsing</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Live climate & season availability checks</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Unified receipt summary</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <button
              onClick={onStartCalibration}
              className="w-full py-3.5 bg-earth-terracotta hover:bg-earth-terracotta-dark text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all shadow-sm"
              id="btn-plan-pro"
            >
              Add Ground Verification
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-earth-cream border border-earth-sand rounded-sm p-8 flex flex-col justify-between hover:shadow-md transition-all relative">
          <div className="space-y-6 text-left">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest font-extrabold text-earth-charcoal/50">FULL STEWARDSHIP</span>
              <h3 className="font-serif text-2xl text-earth-charcoal mt-1">Ground Stewardship</h3>
              <p className="text-xs text-earth-charcoal/60 font-light mt-1">For bespoke journeys backed by dedicated human stewards on the ground.</p>
            </div>

            <div className="flex items-baseline space-x-1">
              <span className="font-serif text-4xl text-earth-charcoal font-normal">$399</span>
              <span className="text-[11px] font-mono text-earth-charcoal/50">/ active trip</span>
            </div>

            <div className="w-full h-px bg-earth-sand/50" />

            <ul className="space-y-3.5 text-xs text-earth-charcoal/80 font-light">
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span className="font-semibold text-earth-charcoal">All Ground Verification features</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span className="font-semibold text-earth-charcoal">Dedicated 24/7 human ground steward on call</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>On-the-ground booking, room holds & dinner deposits</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Direct WhatsApp & messaging channel with your steward</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-earth-terracotta shrink-0" />
                <span>Emergency transit assistance & real-time re-routing</span>
              </li>
            </ul>
          </div>

          <div className="pt-8">
            <button
              onClick={onStartCalibration}
              className="w-full py-3 border border-blue-500/50 hover:border-blue-500 hover:bg-blue-600 hover:text-white text-blue-400 font-mono text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all"
              id="btn-plan-concierge"
            >
              Add Ground Stewardship
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
            Calibrated Departures, <br /><span className="italic text-earth-terracotta">Matched To Perfection</span>
          </h2>
          <div className="w-12 h-0.5 bg-earth-terracotta mx-auto" />
          <p className="text-xs sm:text-sm text-earth-charcoal/70 font-light max-w-xl mx-auto leading-relaxed">
            Read how explorers use Lodestone's matching algorithm to scrap cookie-cutter plans and sync exact daily pacing with Gion teahouses, slow coast strolls, and verified local spots.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Review 1 */}
          <div className="bg-earth-moss-light border border-earth-sand rounded-sm p-8 flex flex-col justify-between hover:shadow-md transition-all relative">
            <div className="space-y-4 text-left">
              <div className="flex text-earth-terracotta">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-earth-terracotta" />
                ))}
              </div>
              <p className="text-xs text-earth-charcoal/90 italic leading-relaxed font-light">
                "I was terrified Kyoto would feel like an endless tourist trap. Lodestone's matching algorithm calculated my ideal 40% daily pace and substituted crowded spots for a 400-year-old teahouse ceremony. Absolute perfection."
              </p>
            </div>
            
            <div className="flex items-center space-x-3.5 pt-6 border-t border-earth-sand/50 mt-6 text-left">
              <div className="w-10 h-10 bg-earth-sand rounded-full flex items-center justify-center text-xs font-mono font-bold text-earth-charcoal">
                AH
              </div>
              <div>
                <h4 className="text-xs font-bold text-earth-charcoal">Aris Thorne</h4>
                <div className="flex items-center space-x-1.5 text-[10px] font-mono text-earth-charcoal/50">
                  <span>Mindful Explorer</span>
                  <span>•</span>
                  <span className="text-earth-terracotta font-bold">Kyoto</span>
                </div>
              </div>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-earth-moss-light border border-earth-sand rounded-sm p-8 flex flex-col justify-between hover:shadow-md transition-all relative">
            <div className="space-y-4 text-left">
              <div className="flex text-earth-terracotta">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-earth-terracotta" />
                ))}
              </div>
              <p className="text-xs text-earth-charcoal/90 italic leading-relaxed font-light">
                "The curation matching was spot on. We opted for the Ground Verification add-on for our Tuscany trip, and having every local trattoria verified before we landed made the trip completely stress-free."
              </p>
            </div>
            
            <div className="flex items-center space-x-3.5 pt-6 border-t border-earth-sand/50 mt-6 text-left">
              <div className="w-10 h-10 bg-earth-sand rounded-full flex items-center justify-center text-xs font-mono font-bold text-earth-charcoal">
                MC
              </div>
              <div>
                <h4 className="text-xs font-bold text-earth-charcoal">Marcus Cole</h4>
                <div className="flex items-center space-x-1.5 text-[10px] font-mono text-earth-charcoal/50">
                  <span>Authentic Seeker</span>
                  <span>•</span>
                  <span className="text-earth-terracotta font-bold">Tuscany</span>
                </div>
              </div>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-earth-moss-light border border-earth-sand rounded-sm p-8 flex flex-col justify-between hover:shadow-md transition-all relative">
            <div className="space-y-4 text-left">
              <div className="flex text-earth-terracotta">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-earth-terracotta" />
                ))}
              </div>
              <p className="text-xs text-earth-charcoal/90 italic leading-relaxed font-light">
                "Group travel with friends who have different sleep and budget preferences used to be a nightmare. Lodestone's algorithm balanced our leave days and budget ceilings effortlessly."
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
            <h4 className="font-serif text-lg font-bold text-earth-charcoal mb-2">How does the curation algorithm work?</h4>
            <p className="text-xs text-earth-charcoal/80 font-light leading-relaxed">
              Our algorithm analyzes your style profile, preferred daily pace, available leave days, and budget ceilings. It calculates route transit times, filters out tourist traps, and generates a logical, beautiful itinerary tailored strictly to your parameters.
            </p>
          </div>

          <div className="bg-earth-moss-light border border-earth-sand p-6 rounded-sm text-left">
            <h4 className="font-serif text-lg font-bold text-earth-charcoal mb-2">What is the Ground Stewardship package?</h4>
            <p className="text-xs text-earth-charcoal/80 font-light leading-relaxed">
              Ground Stewardship is an additional package for travelers who want human execution. While our core curation matches your ideal route, the Ground Stewardship package connects you with dedicated human stewards on the ground to perform item verification, hold rooms, manage deposits, and assist during emergencies.
            </p>
          </div>

          <div className="bg-earth-moss-light border border-earth-sand p-6 rounded-sm text-left">
            <h4 className="font-serif text-lg font-bold text-earth-charcoal mb-2">Can I modify an itinerary once generated?</h4>
            <p className="text-xs text-earth-charcoal/80 font-light leading-relaxed">
              Yes, completely. You retain 100% agency over your itinerary. You can swap days, add custom spots, export to Google Maps, or attach ground stewardship whenever you need extra verification.
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
    <footer className="bg-[#05080E] text-slate-400 py-12 px-6 border-t border-earth-sand/30">
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
