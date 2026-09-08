import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { 
  HeroSection, SocialProofStrip, TouristTrapShield, WanderlogFeatures,
  GroundTruthCallout, AgencyCraft, CuratedItineraries, PricingPlans,
  Reviews, Faqs, EditorialFooter
} from './LandingSections';
import { InteractivePlayground } from './InteractivePlayground';

interface LandingPageProps {
  onStartCalibration: () => void;
  onAdoptItinerary: (destId: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onLoginClick: () => void;
  user: any;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onStartCalibration, 
  onAdoptItinerary, 
  isDark, 
  onToggleTheme,
  onLoginClick,
  user
}) => {
  // Playground state for interactive concierge simulation
  const [playgroundStep, setPlaygroundStep] = useState<number>(0);
  const [playgroundText, setPlaygroundText] = useState<string>('');
  const [playgroundMessages, setPlaygroundMessages] = useState<Array<{sender: 'agent' | 'user', text: string}>>([
    { sender: 'agent', text: "Welcome to Lodestone! I'm Elena, your dedicated trip concierge. I see you're eyeing Kyoto for a slow 6-day immersive escape." },
    { sender: 'agent', text: "Should I book the Private Teahouse Zen Master class for Thursday afternoon? It fits perfectly inside your custom budget guardrails." }
  ]);
  const [playgroundLoading, setPlaygroundLoading] = useState<boolean>(false);

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
      <header className="sticky top-0 z-50 bg-earth-cream/95 backdrop-blur-md border-b border-earth-sand/30 px-6 py-4 max-w-7xl mx-auto flex items-center justify-between transition-colors duration-300">
        <div className="flex items-center space-x-2">
          <span className="font-serif italic text-2xl tracking-tighter text-earth-charcoal font-bold">Lodestone</span>
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-wider uppercase font-bold text-earth-charcoal/80">
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
            className="p-2 rounded-full border border-earth-sand/40 bg-earth-moss-light hover:bg-earth-sand/40 text-earth-charcoal transition-all shadow-xs"
            aria-label="Toggle visual layout theme"
            title="Switch Theme"
            id="btn-theme-toggle-landing"
          >
            {isDark ? <Sun className="w-4 h-4 text-cyan-400" /> : <Moon className="w-4 h-4 text-earth-terracotta" />}
          </button>
          
          {user ? (
            <button
              onClick={onLoginClick}
              className="font-sans font-semibold text-xs tracking-wider uppercase border-b-2 border-earth-terracotta text-earth-terracotta hover:text-earth-terracotta-dark transition-colors pb-0.5"
              id="btn-nav-portal"
            >
              Enter Portal
            </button>
          ) : (
            <>
              <button
                onClick={onLoginClick}
                className="font-sans font-semibold text-xs tracking-wider uppercase text-earth-charcoal/70 dark:text-neutral-300 hover:text-earth-terracotta transition-colors"
                id="btn-nav-login"
              >
                Login
              </button>
              <button
                onClick={onStartCalibration}
                className="font-sans font-semibold text-xs tracking-wider uppercase border-b-2 border-earth-terracotta hover:text-earth-terracotta transition-colors pb-0.5"
                id="btn-nav-calibrate"
              >
                Get Started
              </button>
            </>
          )}
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

      {/* 5. Wanderlog-Style Feature Showcase */}
      <WanderlogFeatures />

      {/* 6. Interactive Concierge Playground */}
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

      {/* 7. Pre-Made Curated Itineraries Section */}
      <CuratedItineraries onAdoptItinerary={onAdoptItinerary} />

      {/* 8. Ground-Truth Framework Callout */}
      <GroundTruthCallout />

      {/* 9. Reviews Section */}
      <Reviews />

      {/* 10. Pricing Plans Section */}
      <PricingPlans onStartCalibration={onStartCalibration} />

      {/* 11. FAQs Section */}
      <Faqs />

      {/* 12. Master Call To Action */}
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
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* 13. Editorial Footer */}
      <EditorialFooter />

    </div>
  );
};
