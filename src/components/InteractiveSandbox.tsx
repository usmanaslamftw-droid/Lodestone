import React from 'react';
import { RotateCcw } from 'lucide-react';

interface SandboxItem {
  id: string;
  time?: string;
  title: string;
  desc: string;
  category: string;
  energy: number;
  rating: number;
}

interface InteractiveSandboxProps {
  timeline: SandboxItem[];
  pool: SandboxItem[];
  selectedWeather: 'sunny' | 'rainy' | 'snowy' | 'windy';
  setSelectedWeather: (weather: 'sunny' | 'rainy' | 'snowy' | 'windy') => void;
  getWeatherMatch: (itemId: string, weather: 'sunny' | 'rainy' | 'snowy' | 'windy') => { score: number; label: string; color: string };
  handleDragStart: (id: string) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDropOnSlot: (targetId: string) => void;
  handleDirectReplace: (poolItemId: string, timelineSlotId: string) => void;
  handleResetItinerarySandbox: () => void;
}

export const InteractiveSandbox: React.FC<InteractiveSandboxProps> = ({
  timeline,
  pool,
  selectedWeather,
  setSelectedWeather,
  getWeatherMatch,
  handleDragStart,
  handleDragOver,
  handleDropOnSlot,
  handleDirectReplace,
  handleResetItinerarySandbox,
}) => {
  const getCategoryStyle = (cat: string) => {
    switch (cat) {
      case 'flight':
        return {
          bg: 'bg-gradient-to-r from-sky-50 to-white hover:from-sky-100/50',
          border: 'border-l-sky-500 border-sky-100',
          text: 'text-sky-950',
          badge: 'bg-sky-100 text-sky-800 border-sky-300',
          emoji: '🛫'
        };
      case 'trap':
        return {
          bg: 'bg-gradient-to-r from-rose-50 to-white hover:from-rose-100/50',
          border: 'border-l-rose-500 border-rose-100',
          text: 'text-rose-950',
          badge: 'bg-rose-100 text-rose-800 border-rose-300',
          emoji: '🏛️'
        };
      case 'downtime':
        return {
          bg: 'bg-gradient-to-r from-emerald-50 to-white hover:from-emerald-100/50',
          border: 'border-l-emerald-500 border-emerald-100',
          text: 'text-emerald-950',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          emoji: '🌊'
        };
      case 'culture':
        return {
          bg: 'bg-gradient-to-r from-purple-50 to-white hover:from-purple-100/50',
          border: 'border-l-purple-500 border-purple-100',
          text: 'text-purple-950',
          badge: 'bg-purple-100 text-purple-800 border-purple-300',
          emoji: '🍵'
        };
      case 'gastronomy':
      case 'nature':
      default:
        return {
          bg: 'bg-gradient-to-r from-amber-50 to-white hover:from-amber-100/50',
          border: 'border-l-amber-500 border-amber-100',
          text: 'text-amber-950',
          badge: 'bg-amber-100 text-amber-800 border-amber-300',
          emoji: '🏮'
        };
    }
  };

  const touristTrapCount = timeline.filter(item => item.category === 'trap').length;
  const downtimeCount = timeline.filter(item => item.category === 'downtime').length;
  const cultureCount = timeline.filter(item => item.category === 'culture' || item.category === 'gastronomy').length;
  
  // Dynamic scoring
  const serenityScore = Math.max(8, 100 - (touristTrapCount * 45) + (downtimeCount * 15) + (cultureCount * 10));
  const autonomyScore = Math.max(5, 100 - (touristTrapCount * 40));
  const stressLevel = Math.max(2, touristTrapCount * 45 + (timeline.length - downtimeCount) * 10);
  const confidenceScore = Math.min(100, Math.max(15, 100 - (touristTrapCount * 30)));

  // Calculate overall weather score
  const averageWeatherScore = Math.round(
    timeline.reduce((acc, item) => acc + getWeatherMatch(item.id, selectedWeather).score, 0) / timeline.length
  );

  let statusDetails = {
    title: "Exhausted Megabus Tour Group Zone",
    color: "text-rose-800 bg-rose-50/90 border-rose-200/80",
    barColor: "bg-rose-500",
    tip: "🚨 Critical Fatigue Zone! Your day is clogged with rigid tourist stopovers and souvenir traps. Drag in serene local experiences to rescue your flow!"
  };

  if (touristTrapCount === 1) {
    statusDetails = {
      title: "Partially Calibrated Custom Flow",
      color: "text-amber-800 bg-amber-50/90 border-amber-200/80",
      barColor: "bg-amber-500",
      tip: "⚖️ Improving. You have custom blocks balanced with one last commercial stop. Swap it out to achieve absolute Lodestone calibration!"
    };
  } else if (touristTrapCount === 0) {
    statusDetails = {
      title: "Absolute Lodestone Harmony",
      color: "text-emerald-800 bg-emerald-50/90 border-emerald-200/80",
      barColor: "bg-emerald-500",
      tip: "🍃 Perfection Achieved! Zero tourist traps, healthy downtime blocks, and absolute self-paced local secrets."
    };
  }

  return (
    <section className="bg-gradient-to-b from-white to-earth-beige/40 py-20 px-4 sm:px-6 relative overflow-hidden border-t border-earth-sand/30">
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-100/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-sky-100/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header block */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="font-mono text-[10px] text-earth-moss font-black uppercase tracking-widest block bg-earth-moss/10 px-3 py-1 rounded-full w-max mx-auto">
            Live Interactive Demo
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-earth-charcoal tracking-tight font-normal leading-tight">
            Tastemake Your Flow in Real Time
          </h2>
          <div className="w-12 h-0.5 bg-earth-moss mx-auto" />
          <p className="text-xs sm:text-sm text-earth-charcoal/70 leading-relaxed font-light">
            Don’t let schedules lock you down. **Drag-and-drop** any local gem from the Pool (left) directly onto the Timeline slots (right). Instantly view your calculated pacing, weather compatibility match, and stress index respond to your choices.
          </p>
        </div>

        {/* Sandbox Workspace Card - Expanded for less crowding */}
        <div className="bg-white border border-earth-sand/70 rounded-2xl p-6 lg:p-10 shadow-lg space-y-8 max-w-6xl mx-auto">
          
          {/* Context bar with Reset */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-earth-sand/15 to-earth-cream/10 p-5 border border-earth-sand/50 rounded-lg">
            <div className="space-y-1 text-left">
              <h4 className="text-xs font-bold text-earth-charcoal uppercase tracking-wider">Sandbox Navigation Cockpit</h4>
              <p className="text-[11px] text-earth-charcoal/70 leading-relaxed max-w-2xl font-light">
                Tip: Swap out those dreadful "Rigid Tourist Traps" with ocean sun loungers or private tea ceremonies to watch your travel harmony and weather score skyrocket. Click the buttons for a quick-replace option on mobile!
              </p>
            </div>
            <button
              onClick={handleResetItinerarySandbox}
              className="inline-flex items-center space-x-1.5 px-4 py-2 border border-earth-terracotta text-earth-terracotta bg-white hover:bg-earth-terracotta hover:text-white rounded-md text-[10px] font-mono uppercase tracking-wider font-extrabold transition-all shadow-sm shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sandbox</span>
            </button>
          </div>

          {/* Weather Selection Panel */}
          <div className="bg-gradient-to-r from-indigo-50/50 via-sky-50/30 to-pink-50/30 border border-indigo-100 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left shadow-xs">
            <div className="space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-widest font-black text-indigo-700 block">🌦️ Real-Time Climate Simulator</span>
              <h5 className="text-xs font-bold text-earth-charcoal uppercase">Simulate Destination Weather</h5>
              <p className="text-[10px] text-earth-charcoal/70 font-light leading-relaxed max-w-xl">
                Is your agenda resilient to storm forecasts? Change the local weather below to verify whether the daily activities align beautifully with the environment.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              {(['sunny', 'rainy', 'snowy', 'windy'] as const).map((w) => {
                const isActive = selectedWeather === w;
                const label = { sunny: '☀️ Sunny', rainy: '🌧️ Rainy', snowy: '❄️ Snowy', windy: '🌀 Windy' }[w];
                return (
                  <button
                    key={w}
                    onClick={() => setSelectedWeather(w)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      isActive 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md scale-105' 
                        : 'bg-white border-earth-sand hover:bg-earth-cream text-earth-charcoal'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Sourced Tastemaker Pool */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-earth-sand/50">
                <span className="font-mono text-[10px] uppercase tracking-wider text-earth-charcoal/70 font-extrabold block">
                  A: Custom Local Experience Pool
                </span>
                <span className="font-mono text-[9px] text-earth-charcoal/40 uppercase">Drag Stamps</span>
              </div>

              <div className="space-y-4 max-h-[490px] overflow-y-auto pr-2">
                {pool.length === 0 ? (
                  <div className="text-center p-12 border-2 border-dashed border-earth-sand rounded-xl bg-earth-cream/15">
                    <p className="text-[11px] text-earth-charcoal/50 font-mono italic">
                      All vetted experience cards are currently integrated into your timeline!
                    </p>
                  </div>
                ) : (
                  pool.map((item) => {
                    const style = getCategoryStyle(item.category);
                    const weatherMatch = getWeatherMatch(item.id, selectedWeather);
                    return (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={() => handleDragStart(item.id)}
                        className={`border ${style.border} rounded-xl p-5 space-y-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-all relative overflow-hidden group border-l-4 ${style.bg} text-left`}
                        title="Drag this over to any timeline slot on the right!"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-base shrink-0">{style.emoji}</span>
                              <span className="font-serif text-sm text-earth-charcoal font-bold group-hover:text-earth-terracotta transition-colors">
                                {item.title}
                              </span>
                            </div>
                          </div>
                          <span className={`font-mono text-[8px] px-2.5 py-0.5 rounded-full border uppercase font-extrabold shrink-0 tracking-wider ${style.badge}`}>
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[10px] text-earth-charcoal/70 leading-relaxed font-light">
                          {item.desc}
                        </p>
                        
                        <div className={`flex items-center space-x-1 px-2.5 py-0.5 rounded border text-[8px] font-mono w-max font-bold ${weatherMatch.color}`}>
                          <span>{selectedWeather === 'sunny' ? '☀️' : selectedWeather === 'rainy' ? '🌧️' : selectedWeather === 'snowy' ? '❄️' : '🌀'}</span>
                          <span>{weatherMatch.score}% Weather Fit</span>
                        </div>

                        <div className="pt-2.5 border-t border-earth-sand/40 flex flex-wrap gap-1.5 items-center">
                          <span className="text-[8px] text-earth-charcoal/40 font-mono block uppercase">Quick Swap Slot:</span>
                          {timeline.map((slot, index) => (
                            <button
                              key={slot.id}
                              onClick={() => handleDirectReplace(item.id, slot.id)}
                              className="text-[8px] font-mono text-earth-terracotta hover:bg-earth-terracotta hover:text-white border border-earth-terracotta/35 px-2 py-0.5 bg-white rounded transition-colors"
                            >
                              Slot {index + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="bg-gradient-to-r from-sky-50 to-white border border-sky-100 p-4 rounded-xl space-y-2 text-left shadow-xs">
                <span className="font-mono text-[9px] uppercase tracking-widest font-black text-sky-800 block">✈️ Flight voucher sync</span>
                <p className="text-[10px] text-sky-950/80 leading-relaxed font-light">
                  Forward flight bookings directly to Lodestone. The parser extracts fixed coordinates (JAL Flight 042 arriving at 09:30 AM) and locks it onto the calendar while keeping surrounding slots completely fluid.
                </p>
              </div>
            </div>

            {/* Right Column: Custom Interactive Timeline */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-earth-sand/50">
                <span className="font-mono text-[10px] uppercase tracking-wider text-earth-charcoal/70 font-extrabold block">
                  B: Your Current Daily Calendar Layout
                </span>
                <span className="font-mono text-[10px] text-earth-terracotta font-bold uppercase tracking-wider">Drop Experience Stamps Here</span>
              </div>

              <div className="space-y-4">
                {timeline.map((slot, idx) => {
                  const style = getCategoryStyle(slot.category);
                  const weatherMatch = getWeatherMatch(slot.id, selectedWeather);
                  return (
                    <div
                      key={slot.id}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDropOnSlot(slot.id)}
                      className={`border ${style.border} border-l-4 rounded-xl p-5 transition-all duration-300 relative group shadow-xs ${style.bg}`}
                    >
                      <div className="flex justify-between items-center gap-4">
                        <div className="flex items-center space-x-4">
                          <span className="font-mono text-[10px] font-bold text-earth-terracotta bg-white px-3 py-1.5 border border-earth-sand/60 rounded-md shadow-xs shrink-0 block">
                            {slot.time}
                          </span>
                          <div className="text-left space-y-0.5">
                            <div className="flex items-center space-x-1.5">
                              <span className="text-base shrink-0">{style.emoji}</span>
                              <h4 className="font-serif text-sm font-semibold text-earth-charcoal">
                                {slot.title}
                              </h4>
                            </div>
                            <p className="text-[10px] text-earth-charcoal/60 leading-relaxed font-light">
                              {slot.desc}
                            </p>

                            <div className={`mt-2 flex items-center space-x-1.5 px-2 py-0.5 rounded-md text-[9px] font-mono border w-max font-bold ${weatherMatch.color}`}>
                              <span>{selectedWeather === 'sunny' ? '☀️' : selectedWeather === 'rainy' ? '🌧️' : selectedWeather === 'snowy' ? '❄️' : '🌀'}</span>
                              <span>Match Compatibility: {weatherMatch.score}% — {weatherMatch.label}</span>
                            </div>
                          </div>
                        </div>
                        
                        <span className={`font-mono text-[8px] px-2.5 py-1 rounded-full border uppercase tracking-wider font-extrabold shrink-0 ${style.badge}`}>
                          {slot.category === 'trap' ? '🚨 Rigid Trap' : '✓ Calibrated'}
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-earth-terracotta/10 border-2 border-dashed border-earth-terracotta/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200">
                        <span className="font-mono text-[10px] text-earth-terracotta font-bold uppercase tracking-widest bg-white border border-earth-terracotta/30 px-4 py-1.5 shadow-md rounded-md">
                          Drop to Replace Slot {idx + 1}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live Metric Display Deck */}
              <div className="bg-earth-sand/10 border border-earth-sand rounded-xl p-5 space-y-4">
                
                <div className={`p-4 border rounded-xl text-xs text-left leading-relaxed ${statusDetails.color} shadow-xs`}>
                  <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest block mb-0.5">
                    CALCULATED PACING STATE: {statusDetails.title}
                  </span>
                  <p className="font-light">{statusDetails.tip}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-2">
                  <div className="space-y-1.5 text-left">
                    <span className="text-[9px] font-mono uppercase text-earth-charcoal/60 block font-bold">Autonomy Level</span>
                    <span className="font-bold text-lg text-earth-charcoal block leading-none">{autonomyScore}%</span>
                    <div className="w-full h-2 bg-earth-sand/60 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${statusDetails.barColor}`} style={{ width: `${autonomyScore}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <span className="text-[9px] font-mono uppercase text-earth-charcoal/60 block font-bold">Serenity Index</span>
                    <span className="font-bold text-lg text-earth-charcoal block leading-none">{serenityScore}%</span>
                    <div className="w-full h-2 bg-earth-sand/60 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${statusDetails.barColor}`} style={{ width: `${serenityScore}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left bg-gradient-to-br from-indigo-50/50 to-pink-50/10 p-1.5 rounded-lg border border-indigo-100/60 shadow-2xs">
                    <span className="text-[9px] font-mono uppercase text-indigo-800 block font-black">☀️ Weather Match</span>
                    <span className="font-black text-lg text-indigo-950 block leading-none">{averageWeatherScore}%</span>
                    <div className="w-full h-2 bg-indigo-100/60 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-indigo-600 transition-all duration-300 animate-pulse" style={{ width: `${averageWeatherScore}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <span className="text-[9px] font-mono uppercase text-earth-charcoal/60 block font-bold">Logistics Stress</span>
                    <span className="font-bold text-lg text-earth-charcoal block leading-none">{stressLevel}%</span>
                    <div className="w-full h-2 bg-earth-sand/60 rounded-full overflow-hidden">
                      <div className="h-full bg-earth-charcoal transition-all duration-300" style={{ width: `${stressLevel}%` }} />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <span className="text-[9px] font-mono uppercase text-earth-charcoal/60 block font-bold">Confidence</span>
                    <span className="font-bold text-lg text-earth-charcoal block leading-none">{confidenceScore}%</span>
                    <div className="w-full h-2 bg-earth-sand/60 rounded-full overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${statusDetails.barColor}`} style={{ width: `${confidenceScore}%` }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
