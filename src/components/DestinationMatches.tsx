import React from 'react';
import { Destination, TravelStyleProfile, FeasibilityInputs } from '../types';
import { computeDestinationMatches } from '../data';
import { ShieldAlert, CheckCircle, HelpCircle, ArrowRight, Sliders, Globe, AlertCircle, Sun, Moon } from 'lucide-react';

interface DestinationMatchesProps {
  profile: TravelStyleProfile;
  feasibility: FeasibilityInputs;
  onSelectDestination: (dest: Destination) => void;
  onBackToFeasibility: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const DestinationMatches: React.FC<DestinationMatchesProps> = ({
  profile,
  feasibility,
  onSelectDestination,
  onBackToFeasibility,
  isDark,
  onToggleTheme
}) => {
  const matches = computeDestinationMatches(profile, feasibility);

  // Generate dynamic, readable justification text based on user weights vs destination attributes
  const getStyleJustification = (dest: Destination) => {
    const reasons: string[] = [];

    // Pace comparison
    const paceDiff = Math.abs(profile.pace - dest.idealPace);
    if (paceDiff <= 15) {
      reasons.push(`Pace coordinates match (${dest.idealPace}% vs your ${profile.pace}% preference), accommodating your exact energy thresholds.`);
    } else if (profile.pace > dest.idealPace) {
      reasons.push(`Provides a calm skeleton (${dest.idealPace}% pace) allowing you to add more active excursions.`);
    } else {
      reasons.push(`Offers an energetic backdrop (${dest.idealPace}% pace) to lift you out of stagnant routines.`);
    }

    // Rest ratio
    const restDiff = Math.abs(profile.restRatio - dest.idealRestRatio);
    if (restDiff <= 15) {
      reasons.push(`Includes your desired balance of ${Math.round(profile.restRatio / 10)} restful 'do nothing' days.`);
    }

    // Core Interests overlap
    const sortedInterests = Object.keys(profile.interests)
      .map(key => ({
        key,
        userVal: profile.interests[key as keyof typeof profile.interests],
        destVal: dest.interestMatch[key as keyof typeof dest.interestMatch]
      }))
      .sort((a, b) => b.userVal - a.userVal);

    // Grab top overlapping interest
    const topOverlap = sortedInterests.find(i => i.userVal >= 65 && i.destVal >= 80);
    if (topOverlap) {
      const labels: Record<string, string> = {
        food: 'culinary mastery and local food traditions',
        nature: 'wilderness isolation and raw geological wonders',
        culture: 'deep-dive ancient history and art preservation',
        nightlife: 'authentic local taverns and late-night social energy',
        adventure: 'active high-endurance sports and wilderness trails',
        wellness: 'nervous-system reset, thermal waters, and body wellness'
      };
      reasons.push(`Directly satisfies your top weighting in ${labels[topOverlap.key]}.`);
    }

    return reasons.slice(0, 2).join(' ');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-earth-sand pb-6">
        <div className="space-y-2 w-full md:w-auto">
          <div className="flex justify-between items-center md:justify-start md:space-x-4">
            <button
              onClick={onBackToFeasibility}
              className="text-xs font-mono font-bold text-earth-terracotta hover:opacity-80 uppercase flex items-center transition-all"
              id="btn-back-to-feasibility"
            >
              ← Back to Profile Hub Settings
            </button>
            
            {/* Circular Theme Toggler */}
            <button
              onClick={onToggleTheme}
              className="p-1.5 rounded-full border border-earth-sand hover:bg-earth-sand/30 text-earth-charcoal transition-all md:hidden"
              aria-label="Toggle visual layout theme"
              title="Switch Theme"
              id="btn-theme-toggle-matches-mobile"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-earth-terracotta" />}
            </button>
          </div>
          
          <h1 className="font-serif text-4xl italic text-earth-charcoal tracking-tight font-normal leading-tight">
            Your Calibrated Matches
          </h1>
          <p className="text-sm text-earth-charcoal/70 font-light max-w-xl">
            Our system has run your parameters through our destination registries. Below is your ranked shortlist with transparent compatibility scores.
          </p>
        </div>

        {/* Mini Profile Indicator with Theme Toggle */}
        <div className="flex items-center space-x-4 bg-earth-sand/40 border border-earth-sand px-4 py-2.5 rounded-sm text-xs w-full md:w-auto justify-between">
          <div>
            <span className="font-mono text-[9px] text-earth-charcoal/50 block font-bold">PROFILE COORDINATES</span>
            <span className="font-sans font-semibold text-earth-charcoal">{feasibility.nationality} Passport • {feasibility.leaveDays} Days Leave • ${feasibility.budgetLimit.toLocaleString()} Cap</span>
          </div>
          
          {/* Circular Theme Toggler (Desktop) */}
          <button
            onClick={onToggleTheme}
            className="hidden md:block p-1.5 rounded-full border border-earth-sand hover:bg-earth-sand/30 text-earth-charcoal transition-all"
            aria-label="Toggle visual layout theme"
            title="Switch Theme"
            id="btn-theme-toggle-matches"
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-earth-terracotta" />}
          </button>
        </div>
      </div>

      {/* Ranked Card List */}
      <div className="space-y-12">
        {matches.map(({ destination, overallScore, feasibility: fResult }) => {
          const styleJustification = getStyleJustification(destination);
          
          return (
            <div 
              key={destination.id} 
              className="bg-earth-moss-light border border-earth-sand overflow-hidden shadow-xs hover:shadow-md transition-all rounded-sm flex flex-col lg:grid lg:grid-cols-12"
              id={`match-card-${destination.id}`}
            >
              {/* Left Column: Image with overlays (5 columns) */}
              <div className="lg:col-span-5 relative aspect-video lg:aspect-auto min-h-[250px] lg:min-h-full">
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Vintage overall score badge */}
                <div className="absolute top-4 left-4 bg-earth-charcoal text-earth-cream border-2 border-earth-sand p-3 shadow-lg flex flex-col items-center justify-center rounded-sm min-w-[70px]">
                  <span className="font-serif text-xl font-bold leading-none">{overallScore}%</span>
                  <span className="font-mono text-[8px] uppercase tracking-wider font-semibold mt-1">MATCH</span>
                </div>

                {/* World Travel Guy photo caption */}
                <div className="absolute bottom-4 left-4 bg-earth-charcoal/70 backdrop-blur-xs text-earth-cream text-[10px] font-mono uppercase tracking-widest px-3 py-1 px-3 py-1.5">
                  {destination.name}, {destination.country}
                </div>
              </div>

              {/* Right Column: Editorial Details (7 columns) */}
              <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-6">
                
                {/* Top Section: Headings and Narrative */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-earth-terracotta font-extrabold block">
                      RECOMMENDED STAY: {destination.suggestedDuration} DAYS
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-earth-charcoal leading-tight">
                      {destination.name}
                    </h2>
                    <p className="font-serif italic text-xs text-earth-charcoal/80 leading-relaxed font-normal">
                      "{destination.tagline}"
                    </p>
                  </div>

                  <p className="text-xs md:text-sm text-earth-charcoal/80 font-light leading-relaxed line-clamp-3">
                    {destination.description}
                  </p>
                </div>

                {/* Center Section: "Why this matches you" Calibration Callout */}
                <div className="bg-earth-sand/25 border-l-2 border-earth-terracotta p-4 rounded-r-sm space-y-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-earth-terracotta font-extrabold flex items-center space-x-1">
                    <Sliders className="w-3 h-3" />
                    <span>Calibrated Alignment Matrix</span>
                  </span>
                  <p className="text-xs text-earth-charcoal leading-relaxed">
                    {styleJustification}
                  </p>
                </div>

                {/* Bottom Section: Feasibility Indicators & Badges */}
                <div className="border-t border-earth-sand/60 pt-4 space-y-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-earth-charcoal/50 font-extrabold block">
                    Transparent Feasibility Scorecard
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Badge 1: Visa Status */}
                    <div className="flex items-start space-x-2 bg-earth-cream/40 p-2.5 border border-earth-sand rounded-sm">
                      <Globe className="w-3.5 h-3.5 text-earth-moss mt-0.5" />
                      <div>
                        <span className="font-mono text-[9px] text-earth-charcoal/60 block leading-none mb-1">VISA STATUS</span>
                        <span className={`font-sans font-bold text-[10px] uppercase ${
                          fResult.visaRule.type === 'visa-free' || fResult.visaRule.type === 'e-visa' || fResult.visaRule.type === 'visa-on-arrival'
                            ? 'text-earth-moss'
                            : 'text-amber-400'
                        }`}>
                          {fResult.visaRule.type.replace('-', ' ')}
                        </span>
                        <span className="font-mono text-[8px] text-earth-charcoal/50 block">Stay: {fResult.visaRule.stayDays}d • Fee: ${fResult.visaRule.cost}</span>
                      </div>
                    </div>

                    {/* Badge 2: Vacation Fit */}
                    <div className="flex items-start space-x-2 bg-earth-cream/40 p-2.5 border border-earth-sand rounded-sm">
                      <div className="mt-0.5">
                        {fResult.durationFits ? (
                          <div className="w-3.5 h-3.5 bg-earth-moss/10 rounded-full flex items-center justify-center text-earth-moss text-[9px] font-bold">✓</div>
                        ) : (
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                        )}
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-earth-charcoal/60 block leading-none mb-1">VACATION FIT</span>
                        <span className="font-sans font-bold text-[10px] text-earth-charcoal block">
                          {destination.suggestedDuration} Days Target
                        </span>
                        <span className={`font-mono text-[8px] block ${fResult.durationFits ? 'text-earth-moss font-semibold' : 'text-amber-400 font-semibold'}`}>
                          {fResult.durationFits ? 'Fits Leave Bounds' : `Need ${destination.suggestedDuration - feasibility.leaveDays} more days`}
                        </span>
                      </div>
                    </div>

                    {/* Badge 3: Cost Mechanics */}
                    <div className="flex items-start space-x-2 bg-earth-cream/40 p-2.5 border border-earth-sand rounded-sm">
                      <div className="mt-0.5">
                        {fResult.budgetFits ? (
                          <div className="w-3.5 h-3.5 bg-earth-moss/10 rounded-full flex items-center justify-center text-earth-moss text-[9px] font-bold">✓</div>
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                        )}
                      </div>
                      <div>
                        <span className="font-mono text-[9px] text-earth-charcoal/60 block leading-none mb-1">COST MECHANIC</span>
                        <span className="font-sans font-bold text-[10px] text-earth-charcoal block">
                          Est. Total: ${fResult.totalEstCost.toLocaleString()}
                        </span>
                        <span className={`font-mono text-[8px] block ${fResult.budgetFits ? 'text-earth-moss font-semibold' : 'text-amber-400 font-semibold'}`}>
                          {fResult.budgetFits ? 'Within Budget Cap' : `Exceeds cap by $${Math.abs(feasibility.budgetLimit - fResult.totalEstCost).toLocaleString()}`}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Final CTA: Launch Trip Builder */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => onSelectDestination(destination)}
                    className="inline-flex items-center justify-center px-5 py-3 bg-earth-terracotta hover:bg-earth-terracotta-dark text-earth-cream text-xs uppercase tracking-wider font-semibold transition-all rounded-sm group"
                    id={`btn-select-dest-${destination.id}`}
                  >
                    Assemble Custom Itinerary
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
