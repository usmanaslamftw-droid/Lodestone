import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { 
  HeroSection, SocialProofStrip, TouristTrapShield, WanderlogFeatures,
  GroundTruthCallout, AgencyCraft, CuratedItineraries, PricingPlans,
  Reviews, Faqs, EditorialFooter
} from './LandingSections';
import { InteractiveSandbox } from './InteractiveSandbox';
import { InteractivePlayground } from './InteractivePlayground';

interface LandingPageProps {
  onStartCalibration: () => void;
  onAdoptItinerary: (destId: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onStartCalibration, 
  onAdoptItinerary, 
  isDark, 
  onToggleTheme 
}) => {
  // Playground state for interactive concierge simulation
  const [playgroundStep, setPlaygroundStep] = useState<number>(0);
  const [playgroundText, setPlaygroundText] = useState<string>('');
  const [playgroundMessages, setPlaygroundMessages] = useState<Array<{sender: 'agent' | 'user', text: string}>>([
    { sender: 'agent', text: "Welcome to Lodestone! I'm Elena, your dedicated trip concierge. I see you're eyeing Kyoto for a slow 6-day immersive escape." },
    { sender: 'agent', text: "Should I book the Private Teahouse Zen Master class for Thursday afternoon? It fits perfectly inside your custom budget guardrails." }
  ]);
  const [playgroundLoading, setPlaygroundLoading] = useState<boolean>(false);

  // Interactive Sandbox Itinerary Builder state
  const INITIAL_TIMELINE = [
    { id: 't1', time: '09:30 AM', title: '🛫 Flight Arrival (JAL Flight 042)', desc: 'Standard business class flight booking imported via forwarded voucher.', category: 'flight', energy: 10, rating: 50 },
    { id: 't2', time: '01:00 PM', title: '🏛 5th Museum (Mandatory Tour Stop)', desc: 'Exhausting guided group tour of historic artifacts with 45 strangers.', category: 'trap', energy: -40, rating: 15 },
    { id: 't3', time: '03:30 PM', title: '🚌 Souvenir Partner Shop Stop', desc: 'Mandatory commercial stopover organized by the megabus operator.', category: 'trap', energy: -30, rating: 5 },
    { id: 't4', time: '09:00 PM', title: '🏮 Secret Bar Crawl (Gion Alleys)', desc: 'Late-night ramen and sake crawl through hidden alleys. (Elena custom calibrated)', category: 'nature', energy: 20, rating: 95 }
  ];

  const AVAILABLE_BLOCKS = [
    { id: 'a1', title: '🌊 Golden Beach Sunset (Solo Sanctuary)', desc: 'Stroll on a secluded golden coast with sea breeze and soft sand.', category: 'downtime', energy: 45, rating: 98 },
    { id: 'a2', title: '🍵 Private Tea Ceremony (Zen Master)', desc: 'An intimate matcha ritual inside a 400-year-old teahouse.', category: 'culture', energy: 30, rating: 96 },
    { id: 'a3', title: '🚶 Slow Alleyway Wander (Hidden Kyoto)', desc: 'Wander quietly through preserved ancient wooden residential quarters.', category: 'downtime', energy: 25, rating: 92 },
    { id: 'a4', title: '🍣 Counter Omakase Dinner (Seat Sync)', desc: 'Secured chef-counter reservation with live seat inventory synchronization.', category: 'gastronomy', energy: 35, rating: 99 }
  ];

  const [timeline, setTimeline] = useState(INITIAL_TIMELINE);
  const [pool, setPool] = useState(AVAILABLE_BLOCKS);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  
  // Weather Simulator State & Matrix
  const [selectedWeather, setSelectedWeather] = useState<'sunny' | 'rainy' | 'snowy' | 'windy'>('sunny');

  const getWeatherMatch = (itemId: string, weather: 'sunny' | 'rainy' | 'snowy' | 'windy') => {
    switch (itemId) {
      case 't1': // Flight Arrival
        if (weather === 'sunny') return { score: 100, label: "Perfect Flying Conditions", color: "text-emerald-600 bg-emerald-50 border-emerald-100" };
        if (weather === 'windy') return { score: 85, label: "Mild Turbulence Expected", color: "text-amber-600 bg-amber-50 border-amber-100" };
        if (weather === 'snowy') return { score: 80, label: "Potential Runway De-icing Delays", color: "text-amber-600 bg-amber-50 border-amber-100" };
        return { score: 95, label: "Standard Instrument Flight", color: "text-emerald-600 bg-emerald-50 border-emerald-100" };
      
      case 't2': // 5th Museum (Trap)
        if (weather === 'rainy') return { score: 55, label: "Better indoors, but still crowded & stuffy", color: "text-amber-600 bg-amber-50 border-amber-100" };
        if (weather === 'sunny') return { score: 20, label: "Wasting perfect weather indoors!", color: "text-rose-600 bg-rose-50 border-rose-100" };
        return { score: 35, label: "Uninspiring stuffy tour stop", color: "text-rose-600 bg-rose-50 border-rose-100" };
        
      case 't3': // Souvenir Shop (Trap)
        if (weather === 'rainy') return { score: 30, label: "Indoors but depressing tourist trap", color: "text-rose-600 bg-rose-50 border-rose-100" };
        return { score: 10, label: "Forced retail trap during premium travel time", color: "text-rose-600 bg-rose-50 border-rose-100" };
        
      case 't4': // Secret Bar Crawl
        if (weather === 'sunny') return { score: 98, label: "Glorious warm alleyway crawling", color: "text-emerald-600 bg-emerald-50 border-emerald-100" };
        if (weather === 'rainy') return { score: 88, label: "Cozy neon wet alleys", color: "text-emerald-600 bg-emerald-50 border-emerald-100" };
        if (weather === 'snowy') return { score: 82, label: "Crisp cold sake warming", color: "text-amber-600 bg-amber-50 border-amber-100" };
        return { score: 90, label: "Breezy sake tour", color: "text-emerald-600 bg-emerald-50 border-emerald-100" };

      case 'a1': // Golden Beach Sunset
        if (weather === 'sunny') return { score: 100, label: "Flawless golden hour rays", color: "text-emerald-600 bg-emerald-50 border-emerald-100" };
        if (weather === 'rainy') return { score: 15, label: "Wet, cold and windy beach (Not recommended)", color: "text-rose-600 bg-rose-50 border-rose-100" };
        if (weather === 'snowy') return { score: 30, label: "Beautiful snowy dunes but freezing!", color: "text-rose-600 bg-rose-50 border-rose-100" };
        return { score: 65, label: "Breezy seaside wander", color: "text-amber-600 bg-amber-50 border-amber-100" };

      case 'a2': // Private Tea Ceremony
        if (weather === 'rainy') return { score: 100, label: "Raindrops on zen garden moss (Hypnotic atmosphere)", color: "text-emerald-600 bg-emerald-50 border-emerald-100" };
        if (weather === 'snowy') return { score: 98, label: "Warm tatami mats with snow outside", color: "text-emerald-600 bg-emerald-50 border-emerald-100" };
        return { score: 92, label: "Serene meditative retreat", color: "text-emerald-600 bg-emerald-50 border-emerald-100" };

      case 'a3': // Slow Alleyway Wander
        if (weather === 'sunny') return { score: 95, label: "Perfect stroll temperature", color: "text-emerald-600 bg-emerald-50 border-emerald-100" };
        if (weather === 'rainy') return { score: 40, label: "Slippery wet cobbles without umbrella", color: "text-rose-600 bg-rose-50 border-rose-100" };
        if (weather === 'snowy') return { score: 75, label: "Beautiful snow blanket but chilly", color: "text-amber-600 bg-amber-50 border-amber-100" };
        return { score: 85, label: "Fresh brisk walk", color: "text-emerald-600 bg-emerald-50 border-emerald-100" };

      case 'a4': // Counter Omakase Dinner
        if (weather === 'rainy') return { score: 100, label: "Perfect cozy dining hideout", color: "text-emerald-600 bg-emerald-50 border-emerald-100" };
        return { score: 98, label: "World class counter seat comfort", color: "text-emerald-600 bg-emerald-50 border-emerald-100" };

      default:
        return { score: 80, label: "Balanced Experience Match", color: "text-emerald-600 bg-emerald-50 border-emerald-100" };
    }
  };

  const handleDragStart = (id: string) => {
    setDraggedItemId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnSlot = (targetId: string) => {
    if (!draggedItemId) return;

    // Find the item in pool or timeline
    const poolItem = pool.find(item => item.id === draggedItemId);
    const timelineItemIndex = timeline.findIndex(item => item.id === draggedItemId);

    if (poolItem) {
      // Swapping target timeline item with pool item
      const targetIndex = timeline.findIndex(item => item.id === targetId);
      if (targetIndex !== -1) {
        const targetTimelineItem = timeline[targetIndex];
        const newTimeline = [...timeline];
        newTimeline[targetIndex] = {
          ...poolItem,
          id: poolItem.id,
          time: targetTimelineItem.time // Keep the original slot's time
        };
        setTimeline(newTimeline);

        // Put the replaced timeline item back into the pool
        const newPool = pool.filter(item => item.id !== draggedItemId);
        newPool.push(targetTimelineItem);
        setPool(newPool);
      }
    } else if (timelineItemIndex !== -1) {
      // Reordering within the timeline
      const targetIndex = timeline.findIndex(item => item.id === targetId);
      if (targetIndex !== -1 && targetIndex !== timelineItemIndex) {
        const newTimeline = [...timeline];
        const temp = newTimeline[timelineItemIndex];
        newTimeline[timelineItemIndex] = { ...newTimeline[targetIndex], time: temp.time };
        newTimeline[targetIndex] = { ...temp, time: newTimeline[targetIndex].time };
        setTimeline(newTimeline);
      }
    }
    setDraggedItemId(null);
  };

  const handleDirectReplace = (poolItemId: string, timelineSlotId: string) => {
    const poolItem = pool.find(item => item.id === poolItemId);
    const targetIndex = timeline.findIndex(item => item.id === timelineSlotId);
    if (poolItem && targetIndex !== -1) {
      const targetTimelineItem = timeline[targetIndex];
      const newTimeline = [...timeline];
      newTimeline[targetIndex] = {
        ...poolItem,
        id: poolItem.id,
        time: targetTimelineItem.time
      };
      setTimeline(newTimeline);

      const newPool = pool.filter(item => item.id !== poolItemId);
      newPool.push(targetTimelineItem);
      setPool(newPool);
    }
  };

  const handleResetItinerarySandbox = () => {
    setTimeline(INITIAL_TIMELINE);
    setPool(AVAILABLE_BLOCKS);
    setDraggedItemId(null);
  };

  const handlePlaygroundAction = (action: 'book' | 'custom') => {
    if (playgroundLoading) return;
    setPlaygroundLoading(true);

    if (action === 'book') {
      const userMsg = { sender: 'user' as const, text: "Yes, please secure it! Keep it under $200." };
      setPlaygroundMessages(prev => [...prev, userMsg]);
      
      setTimeout(() => {
        setPlaygroundMessages(prev => [
          ...prev, 
          { sender: 'agent', text: "Done! I contacted Master Takahashi. Your private entry is secured for 2:00 PM on Day 4. Booking ID: #LDS-KYT-904. Block updated in your Kyoto timeline." }
        ]);
        setPlaygroundStep(1);
        setPlaygroundLoading(false);
      }, 1200);
    } else {
      const userMsg = { sender: 'user' as const, text: "Can you find a cheaper street food alternative?" };
      setPlaygroundMessages(prev => [...prev, userMsg]);

      setTimeout(() => {
        setPlaygroundMessages(prev => [
          ...prev, 
          { sender: 'agent', text: "Of course! Master Takahashi's private entry is shelved. I've instead secured Chef Kenji's counter at Nishiki Market—just $35 total, zero markups. Your Kyoto itinerary budget has refreshed!" }
        ]);
        setPlaygroundStep(1);
        setPlaygroundLoading(false);
      }, 1200);
    }
  };

  const handlePlaygroundSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playgroundText.trim() || playgroundLoading) return;

    const userMsg = { sender: 'user' as const, text: playgroundText };
    setPlaygroundMessages(prev => [...prev, userMsg]);
    setPlaygroundText('');
    setPlaygroundLoading(true);

    setTimeout(() => {
      setPlaygroundMessages(prev => [
        ...prev,
        { sender: 'agent', text: "Perfect request. I've noted this guideline down and synced it with your core travel style coordinates. Our booking engine is ready!" }
      ]);
      setPlaygroundLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-earth-cream text-earth-charcoal font-sans transition-colors duration-300">
      
      {/* Sticky Editorial Header */}
      <header className="sticky top-0 z-50 bg-earth-cream/90 backdrop-blur-md border-b border-earth-sand/60 px-6 py-4 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-serif italic text-2xl tracking-tighter text-earth-charcoal font-bold">Lodestone</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-wider uppercase font-bold text-earth-charcoal/70">
          <a href="#features" className="hover:text-earth-terracotta transition-colors">Features</a>
          <a href="#itineraries" className="hover:text-earth-terracotta transition-colors">Curations</a>
          <a href="#playground" className="hover:text-earth-terracotta transition-colors">Interactive Live Agent</a>
          <a href="#plans" className="hover:text-earth-terracotta transition-colors">Plans</a>
          <a href="#faq" className="hover:text-earth-terracotta transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center space-x-5">
          {/* Theme Toggler */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full border border-earth-sand hover:bg-earth-sand/30 text-earth-charcoal transition-all"
            aria-label="Toggle visual layout theme"
            title="Switch Theme"
            id="btn-theme-toggle-landing"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-earth-terracotta" />}
          </button>
          
          <button
            onClick={onStartCalibration}
            className="font-sans font-semibold text-xs tracking-wider uppercase border-b-2 border-earth-terracotta hover:text-earth-terracotta transition-colors pb-0.5"
            id="btn-nav-calibrate"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* 1. Hero Section */}
      <HeroSection onStartCalibration={onStartCalibration} />

      {/* 2. Social Proof Strip */}
      <SocialProofStrip />

      {/* 3. Agency Craft (Elena / Best Friend Concierge) */}
      <AgencyCraft />

      {/* 4. Tourist Trap Shield (EasyTripAI-style Curation) */}
      <TouristTrapShield onStartCalibration={onStartCalibration} />

      {/* 5. Interactive Calibration Sandbox with Weather-Vibe Match Score */}
      <InteractiveSandbox
        timeline={timeline}
        pool={pool}
        selectedWeather={selectedWeather}
        setSelectedWeather={setSelectedWeather}
        getWeatherMatch={getWeatherMatch}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDropOnSlot={handleDropOnSlot}
        handleDirectReplace={handleDirectReplace}
        handleResetItinerarySandbox={handleResetItinerarySandbox}
      />

      {/* 6. Wanderlog-Style Feature Showcase */}
      <WanderlogFeatures />

      {/* 7. Interactive Concierge Playground */}
      <InteractivePlayground
        playgroundStep={playgroundStep}
        setPlaygroundStep={setPlaygroundStep}
        playgroundText={playgroundText}
        setPlaygroundText={setPlaygroundText}
        playgroundMessages={playgroundMessages}
        setPlaygroundMessages={setPlaygroundMessages}
        playgroundLoading={playgroundLoading}
        setPlaygroundLoading={setPlaygroundLoading}
        handlePlaygroundAction={handlePlaygroundAction}
        handlePlaygroundSendCustom={handlePlaygroundSendCustom}
      />

      {/* 8. Pre-Made Curated Itineraries Section */}
      <CuratedItineraries onAdoptItinerary={onAdoptItinerary} />

      {/* 9. Ground-Truth Framework Callout */}
      <GroundTruthCallout />

      {/* 10. Reviews Section */}
      <Reviews />

      {/* 11. Pricing Plans Section */}
      <PricingPlans onStartCalibration={onStartCalibration} />

      {/* 12. FAQs Section */}
      <Faqs />

      {/* 13. Master Call To Action */}
      <section className="bg-earth-charcoal text-earth-cream py-20 px-6 text-center border-t border-earth-sand/20 space-y-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="font-mono text-xs text-earth-terracotta font-extrabold uppercase tracking-widest block">Compose Your Journey</span>
          <h2 className="font-serif text-4xl sm:text-5xl tracking-tight text-white font-normal leading-tight">
            Ready for your next <span className="italic">departure?</span>
          </h2>
          <p className="text-xs sm:text-sm text-earth-cream/70 font-light max-w-xl mx-auto leading-relaxed">
            Skip the hours of tabs, conflicting blog recommendations, and stressful flight/stay bookings. Let Lodestone compose your ultimate itinerary automatically.
          </p>
          
          <div className="pt-4">
            <button
              onClick={onStartCalibration}
              className="px-8 py-4 bg-earth-terracotta hover:bg-earth-terracotta-dark text-earth-cream font-mono text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md hover:scale-[1.01]"
              id="btn-final-cta"
            >
              Calibrate From Scratch
            </button>
          </div>
        </div>
      </section>

      {/* 14. Editorial Footer */}
      <EditorialFooter />

    </div>
  );
};
