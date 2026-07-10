import React, { useState } from 'react';
import { TravelStyleProfile, FeasibilityInputs } from '../types';
import { RadarChart } from './RadarChart';
import { 
  Sliders, Compass, Sparkles, ChevronLeft, ArrowRight, 
  Home, Users, Landmark, Utensils, Waves, Moon, Sun, 
  ShieldCheck, DollarSign, Globe, Calendar, Award 
} from 'lucide-react';
import { SOCIAL_MODES_LIST, ACCOMMODATIONS_LIST, NATIONALITIES } from '../data';

interface ProfileHubProps {
  initialProfile: TravelStyleProfile;
  initialFeasibility: FeasibilityInputs;
  onSave: (profile: TravelStyleProfile, feasibility: FeasibilityInputs) => void;
  onBackToLanding: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

type TabType = 'interests' | 'budget_visa' | 'rhythms_comfort';

export const CalibrationQuiz: React.FC<ProfileHubProps> = ({ 
  initialProfile, 
  initialFeasibility,
  onSave,
  onBackToLanding,
  isDark,
  onToggleTheme
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('interests');
  const [profile, setProfile] = useState<TravelStyleProfile>({ ...initialProfile });
  const [feasibility, setFeasibility] = useState<FeasibilityInputs>({ ...initialFeasibility });

  const handleSliderChange = (field: keyof TravelStyleProfile | string, val: number) => {
    if (field.startsWith('interests.')) {
      const interestKey = field.split('.')[1] as keyof TravelStyleProfile['interests'];
      setProfile(prev => ({
        ...prev,
        interests: {
          ...prev.interests,
          [interestKey]: val
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [field]: val
      }));
    }
  };

  const handleSelectChange = (field: 'socialMode' | 'accommodation' | 'budgetTier', value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeasibilityChange = (field: keyof FeasibilityInputs, value: any) => {
    setFeasibility(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    onSave(profile, feasibility);
  };

  return (
    <div className="min-h-screen bg-earth-cream text-earth-charcoal font-sans px-4 py-6 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Magazine Style Header */}
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-10 border-b border-earth-sand pb-5">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBackToLanding}
            className="text-xs font-mono font-bold text-earth-terracotta hover:opacity-80 uppercase flex items-center transition-all"
            id="btn-back-home"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Home
          </button>
        </div>
        
        <div className="flex items-center space-x-6">
          <span className="font-serif italic text-3xl tracking-tighter text-earth-charcoal">Lodestone</span>
          <div className="h-4 w-px bg-earth-sand" />
          
          {/* Circular Editorial Theme Toggler */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full border border-earth-sand hover:bg-earth-sand/30 text-earth-charcoal transition-all"
            aria-label="Toggle visual layout theme"
            title="Switch Theme"
            id="btn-theme-toggle"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-earth-terracotta" />}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        
        {/* Title Block */}
        <div className="space-y-4 mb-10 text-center lg:text-left relative">
          <div className="inline-flex items-center space-x-2 bg-earth-terracotta/10 text-earth-terracotta border border-earth-terracotta/20 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest font-extrabold uppercase mb-2">
            <span className="w-2 h-2 rounded-full bg-earth-terracotta animate-ping" />
            <span>Deterministic Travel Alignment Active</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-earth-charcoal tracking-tight font-normal leading-none">
            Calibrate Your <span className="italic text-earth-terracotta font-serif font-light block sm:inline">Departure Signature</span>
          </h1>
          <p className="text-xs sm:text-sm text-earth-charcoal/70 max-w-3xl font-light leading-relaxed">
            Unlike static builders or generic templates, Lodestone maps your travel style mathematically. Tune your intention matrices, available leave limits, and target cost caps below to generate live, grounded supplier itineraries.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-earth-terracotta to-transparent rounded" />
        </div>

        {/* Dashboard-Style Layout with Side Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: Live Radar & Profile Coordinates Summary (5 Cols) */}
          <div className="lg:col-span-5 bg-earth-moss-light border border-earth-sand p-6 rounded-sm space-y-6 flex flex-col items-center">
            <div className="w-full border-b border-earth-sand pb-3 text-center lg:text-left">
              <h3 className="font-serif italic text-lg text-earth-charcoal font-normal">Your Travel Signature</h3>
              <p className="text-[10px] font-mono uppercase tracking-wider text-earth-terracotta mt-0.5">
                Real-Time Coordinate Alignment
              </p>
            </div>

            {/* Radar Visualizer */}
            <div className="flex justify-center py-4 bg-earth-cream/10 rounded-sm w-full border border-earth-sand/30">
              <RadarChart data={profile.interests} size={285} />
            </div>

            {/* Live Parameters Board */}
            <div className="w-full bg-earth-cream/20 p-4 rounded border border-earth-sand/50 space-y-3.5 text-xs font-light">
              <h4 className="font-serif italic text-sm text-earth-charcoal border-b border-earth-sand/30 pb-1.5 font-normal">Active Alignment Check</h4>
              
              <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                <div>
                  <span className="text-earth-charcoal/50 block text-[9px] font-mono uppercase">Departure</span>
                  <span className="font-semibold text-earth-charcoal">{feasibility.homeCity} ({feasibility.nationality})</span>
                </div>
                <div>
                  <span className="text-earth-charcoal/50 block text-[9px] font-mono uppercase">Total Limit</span>
                  <span className="font-semibold text-earth-charcoal">${feasibility.budgetLimit.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-earth-charcoal/50 block text-[9px] font-mono uppercase">Standard Lodging</span>
                  <span className="font-semibold text-earth-charcoal">
                    {profile.accommodation === 'boutique_hotel' && 'Boutique'}
                    {profile.accommodation === 'luxury_resort' && 'Luxury Estate'}
                    {profile.accommodation === 'social_hostel' && 'Social Hostel'}
                    {profile.accommodation === 'local_guesthouse' && 'Heritage Guesthouse'}
                  </span>
                </div>
                <div>
                  <span className="text-earth-charcoal/50 block text-[9px] font-mono uppercase">Rare Gems Ratio</span>
                  <span className="font-semibold text-earth-charcoal">{profile.rareGems || 50}% Off-Grid</span>
                </div>
                <div>
                  <span className="text-earth-charcoal/50 block text-[9px] font-mono uppercase font-semibold text-earth-terracotta">Tempo & Structure</span>
                  <span className="font-semibold text-earth-charcoal text-[11px]">{profile.pace}% Pace / {profile.restRatio}% Rest / {profile.structurePreference}% Sync</span>
                </div>
                <div>
                  <span className="text-earth-charcoal/50 block text-[9px] font-mono uppercase">Max Available</span>
                  <span className="font-semibold text-earth-charcoal">{feasibility.leaveDays} Days Limit</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Settings Hub Tabs & Controls (7 Cols) */}
          <div className="lg:col-span-7 bg-earth-moss-light border border-earth-sand p-6 sm:p-8 rounded-sm space-y-8 flex flex-col justify-between min-h-[580px]">
            
            <div className="space-y-6">
              {/* Settings Nav Bar */}
              <div className="flex border-b border-earth-sand space-x-1 sm:space-x-4 pb-0.5">
                <button
                  onClick={() => setActiveTab('interests')}
                  className={`py-2 px-3 text-xs sm:text-sm font-serif italic transition-all border-b-2 -mb-0.5 ${
                    activeTab === 'interests'
                      ? 'border-earth-terracotta text-earth-charcoal font-bold'
                      : 'border-transparent text-earth-charcoal/60 hover:text-earth-charcoal'
                  }`}
                  id="tab-btn-interests"
                >
                  Interests & Gradients
                </button>
                <button
                  onClick={() => setActiveTab('budget_visa')}
                  className={`py-2 px-3 text-xs sm:text-sm font-serif italic transition-all border-b-2 -mb-0.5 ${
                    activeTab === 'budget_visa'
                      ? 'border-earth-terracotta text-earth-charcoal font-bold'
                      : 'border-transparent text-earth-charcoal/60 hover:text-earth-charcoal'
                  }`}
                  id="tab-btn-budget-visa"
                >
                  Budget, Visa & Origin
                </button>
                <button
                  onClick={() => setActiveTab('rhythms_comfort')}
                  className={`py-2 px-3 text-xs sm:text-sm font-serif italic transition-all border-b-2 -mb-0.5 ${
                    activeTab === 'rhythms_comfort'
                      ? 'border-earth-terracotta text-earth-charcoal font-bold'
                      : 'border-transparent text-earth-charcoal/60 hover:text-earth-charcoal'
                  }`}
                  id="tab-btn-rhythms-comfort"
                >
                  Comfort & Tempo
                </button>
              </div>

              {/* TAB 1: INTERESTS & GRADIENTS */}
              {activeTab === 'interests' && (
                <div className="space-y-6 animate-fadeIn" id="panel-tab-interests">
                  <p className="text-xs text-earth-charcoal/70 font-light">
                    Adjust weights to configure your core dimensions. These gradients directly calculate your match compatibility percentages.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Culinary */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-earth-charcoal flex items-center gap-1.5">
                          <Utensils className="w-3.5 h-3.5 text-earth-terracotta" /> Culinary & Dining
                        </span>
                        <span className="font-mono text-earth-terracotta font-semibold">{profile.interests.food}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={profile.interests.food}
                        onChange={(e) => handleSliderChange('interests.food', parseInt(e.target.value))}
                        className="w-full h-1 bg-earth-sand rounded appearance-none cursor-pointer accent-earth-terracotta"
                      />
                    </div>

                    {/* Nature */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-earth-charcoal flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-earth-terracotta" /> Nature & Wild
                        </span>
                        <span className="font-mono text-earth-terracotta font-semibold">{profile.interests.nature}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={profile.interests.nature}
                        onChange={(e) => handleSliderChange('interests.nature', parseInt(e.target.value))}
                        className="w-full h-1 bg-earth-sand rounded appearance-none cursor-pointer accent-earth-terracotta"
                      />
                    </div>

                    {/* History */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-earth-charcoal flex items-center gap-1.5">
                          <Landmark className="w-3.5 h-3.5 text-earth-terracotta" /> History & Arts
                        </span>
                        <span className="font-mono text-earth-terracotta font-semibold">{profile.interests.culture}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={profile.interests.culture}
                        onChange={(e) => handleSliderChange('interests.culture', parseInt(e.target.value))}
                        className="w-full h-1 bg-earth-sand rounded appearance-none cursor-pointer accent-earth-terracotta"
                      />
                    </div>

                    {/* Wellness */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-earth-charcoal flex items-center gap-1.5">
                          <Waves className="w-3.5 h-3.5 text-earth-terracotta" /> Wellness & Rest
                        </span>
                        <span className="font-mono text-earth-terracotta font-semibold">{profile.interests.wellness}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={profile.interests.wellness}
                        onChange={(e) => handleSliderChange('interests.wellness', parseInt(e.target.value))}
                        className="w-full h-1 bg-earth-sand rounded appearance-none cursor-pointer accent-earth-terracotta"
                      />
                    </div>

                    {/* Nightlife */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-earth-charcoal flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-earth-terracotta" /> Local Social Atmosphere
                        </span>
                        <span className="font-mono text-earth-terracotta font-semibold">{profile.interests.nightlife}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={profile.interests.nightlife}
                        onChange={(e) => handleSliderChange('interests.nightlife', parseInt(e.target.value))}
                        className="w-full h-1 bg-earth-sand rounded appearance-none cursor-pointer accent-earth-terracotta"
                      />
                    </div>

                    {/* Adventure */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-earth-charcoal flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-earth-terracotta" /> Adventure & Action
                        </span>
                        <span className="font-mono text-earth-terracotta font-semibold">{profile.interests.adventure}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={profile.interests.adventure}
                        onChange={(e) => handleSliderChange('interests.adventure', parseInt(e.target.value))}
                        className="w-full h-1 bg-earth-sand rounded appearance-none cursor-pointer accent-earth-terracotta"
                      />
                    </div>
                  </div>

                  {/* Rare Gems vs Known Spots Coordinate */}
                  <div className="pt-4 border-t border-earth-sand/30 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-semibold text-earth-charcoal flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-earth-terracotta" /> Discovery Mode
                      </h4>
                      <span className="font-mono text-[10px] bg-earth-terracotta/20 text-earth-terracotta px-2 py-0.5 font-bold rounded">
                        {profile.rareGems === undefined ? 50 : profile.rareGems}% Off-Grid
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={profile.rareGems === undefined ? 50 : profile.rareGems}
                      onChange={(e) => handleSliderChange('rareGems', parseInt(e.target.value))}
                      className="w-full h-1.5 bg-earth-sand rounded appearance-none cursor-pointer accent-earth-terracotta"
                    />
                    <div className="flex justify-between text-[9px] text-earth-charcoal/50 font-mono">
                      <span>FAMOUS ICONIC LANDMARKS</span>
                      <span>LOCAL SECRETS & RARE GEMS</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: BUDGET, VISA & ORIGIN */}
              {activeTab === 'budget_visa' && (
                <div className="space-y-6 animate-fadeIn" id="panel-tab-budget-visa">
                  <p className="text-xs text-earth-charcoal/70 font-light">
                    Establish your geographic departure boundaries and maximum financial targets.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Nationality / Passport */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-earth-charcoal flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-earth-terracotta" /> Passport (Visa Checker)
                      </label>
                      <select
                        value={feasibility.nationality}
                        onChange={(e) => handleFeasibilityChange('nationality', e.target.value)}
                        className="w-full p-2.5 bg-earth-cream border border-earth-sand rounded-sm text-xs font-medium text-earth-charcoal focus:outline-none focus:border-earth-terracotta"
                      >
                        {NATIONALITIES.map(nat => (
                          <option key={nat} value={nat} className="bg-earth-moss-light text-earth-charcoal">{nat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Origin / Home City */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-earth-charcoal flex items-center gap-1.5">
                        <Home className="w-3.5 h-3.5 text-earth-terracotta" /> Departure Origin City
                      </label>
                      <input
                        type="text"
                        value={feasibility.homeCity}
                        onChange={(e) => handleFeasibilityChange('homeCity', e.target.value)}
                        className="w-full p-2 bg-earth-cream border border-earth-sand rounded-sm text-xs text-earth-charcoal focus:outline-none focus:border-earth-terracotta"
                        placeholder="e.g. New York, London"
                      />
                    </div>

                    {/* Target Daily Cost Tier */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-earth-charcoal flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-earth-terracotta" /> Daily Spend Tier
                      </label>
                      <select
                        value={profile.budgetTier}
                        onChange={(e: any) => handleSelectChange('budgetTier', e.target.value)}
                        className="w-full p-2.5 bg-earth-cream border border-earth-sand rounded-sm text-xs font-medium text-earth-charcoal focus:outline-none focus:border-earth-terracotta"
                      >
                        <option value="backpacker" className="bg-earth-moss-light text-earth-charcoal">Backpacker Base (Under $150/day)</option>
                        <option value="boutique" className="bg-earth-moss-light text-earth-charcoal">Boutique Curation ($200-$400/day)</option>
                        <option value="luxury" className="bg-earth-moss-light text-earth-charcoal">Premium Luxury ($500+/day)</option>
                      </select>
                    </div>

                    {/* Maximum Total Budget Limit Slider */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-earth-charcoal flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-earth-terracotta" /> Maximum Target Budget (Limit)
                        </span>
                        <span className="font-mono text-earth-terracotta font-bold bg-earth-cream/40 px-2 py-0.5 rounded-sm">
                          ${feasibility.budgetLimit.toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1000"
                        max="20000"
                        step="500"
                        value={feasibility.budgetLimit}
                        onChange={(e) => handleFeasibilityChange('budgetLimit', parseInt(e.target.value))}
                        className="w-full h-1.5 bg-earth-sand rounded appearance-none cursor-pointer accent-earth-terracotta"
                      />
                      <div className="flex justify-between text-[9px] text-earth-charcoal/50 font-mono">
                        <span>$1,000 CAP</span>
                        <span>$10,000 CAP</span>
                        <span>$20,000+ UNLIMITED</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: COMFORT & RHYTHMS */}
              {activeTab === 'rhythms_comfort' && (
                <div className="space-y-6 animate-fadeIn" id="panel-tab-rhythms-comfort">
                  <p className="text-xs text-earth-charcoal/70 font-light">
                    Adjust available days, lodging standard details, and pacing densities.
                  </p>

                  <div className="space-y-5">
                    {/* Days Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-earth-charcoal flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-earth-terracotta" /> Max Available Leave Days
                        </span>
                        <span className="font-mono text-earth-terracotta font-bold bg-earth-cream/40 px-2 py-0.5 rounded">
                          {feasibility.leaveDays} Days
                        </span>
                      </div>
                      <input
                        type="range"
                        min="3"
                        max="30"
                        value={feasibility.leaveDays}
                        onChange={(e) => handleFeasibilityChange('leaveDays', parseInt(e.target.value))}
                        className="w-full h-1.5 bg-earth-sand rounded appearance-none cursor-pointer accent-earth-terracotta"
                      />
                      <div className="flex justify-between text-[9px] text-earth-charcoal/50 font-mono">
                        <span>3 DAYS</span>
                        <span>14 DAYS</span>
                        <span>30 DAYS</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {/* Lodging Dropdown */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-earth-charcoal">Lodging Standard</label>
                        <select
                          value={profile.accommodation}
                          onChange={(e: any) => handleSelectChange('accommodation', e.target.value)}
                          className="w-full p-2.5 bg-earth-cream border border-earth-sand rounded-sm text-xs font-medium text-earth-charcoal focus:outline-none focus:border-earth-terracotta"
                        >
                          {ACCOMMODATIONS_LIST.map(item => (
                            <option key={item.id} value={item.id} className="bg-earth-moss-light text-earth-charcoal">
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Companionship Dropdown */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-earth-charcoal">Social Stance</label>
                        <select
                          value={profile.socialMode}
                          onChange={(e: any) => handleSelectChange('socialMode', e.target.value)}
                          className="w-full p-2.5 bg-earth-cream border border-earth-sand rounded-sm text-xs font-medium text-earth-charcoal focus:outline-none focus:border-earth-terracotta"
                        >
                          {SOCIAL_MODES_LIST.map(item => (
                            <option key={item.id} value={item.id} className="bg-earth-moss-light text-earth-charcoal">
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-earth-sand/30 space-y-6">
                      {/* Unified Master Slider */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <div>
                            <span className="font-mono text-[10px] text-earth-terracotta font-extrabold uppercase tracking-widest block">Consolidated Intensity Matrix</span>
                            <h4 className="text-sm font-bold text-earth-charcoal font-serif italic mt-0.5">Tempo, Rigorousness & Rest Ratio</h4>
                          </div>
                          <span className="font-mono text-sm font-black text-earth-terracotta bg-earth-terracotta/10 px-3 py-1 rounded-sm">
                            {Math.round((profile.pace + (100 - profile.restRatio) + profile.structurePreference) / 3)}% Intensity
                          </span>
                        </div>

                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={Math.round((profile.pace + (100 - profile.restRatio) + profile.structurePreference) / 3)}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setProfile(prev => ({
                              ...prev,
                              pace: Math.max(15, val),
                              restRatio: Math.max(10, 100 - val),
                              structurePreference: Math.max(10, val)
                            }));
                          }}
                          className="w-full h-2 bg-earth-sand rounded appearance-none cursor-pointer accent-earth-terracotta"
                          id="master-intensity-slider"
                        />

                        {/* Presets and descriptions */}
                        <div className="flex justify-between text-[10px] text-earth-charcoal/50 font-mono tracking-wider gap-4">
                          <div className="text-left max-w-[150px]">
                            <span className="font-bold text-earth-charcoal block">MINDFUL WANDERER</span>
                            <span className="text-[9px] font-light leading-snug">Slow dawn pacing, high rest margin, total freedom</span>
                          </div>
                          <div className="text-center max-w-[150px]">
                            <span className="font-bold text-earth-charcoal block">BALANCED CURATION</span>
                            <span className="text-[9px] font-light leading-snug">Harmonious rhythm, pre-allocated highlights, flexible gaps</span>
                          </div>
                          <div className="text-right max-w-[150px]">
                            <span className="font-bold text-earth-charcoal block">MAXIMIZED COLLECTOR</span>
                            <span className="text-[9px] font-light leading-snug">Dawn-to-dusk routes, military sync, dense itinerary blocks</span>
                          </div>
                        </div>

                        {/* Real-time Sub-metrics indicators */}
                        <div className="grid grid-cols-3 gap-3 bg-earth-cream/45 p-3 rounded border border-earth-sand/50 text-[10px] mt-4">
                          <div className="text-center space-y-1">
                            <span className="text-earth-charcoal/50 font-mono uppercase text-[8px] block">Daily Pace Weight</span>
                            <span className="font-bold text-earth-charcoal block text-xs">{profile.pace}%</span>
                            <span className="text-[8px] text-earth-charcoal/70 block leading-tight">
                              {profile.pace <= 35 ? '🐌 Slow & Quiet' : profile.pace <= 70 ? '🚶 Steady & Curated' : '🏃 Highly Packed'}
                            </span>
                          </div>
                          <div className="text-center space-y-1 border-x border-earth-sand/60">
                            <span className="text-earth-charcoal/50 font-mono uppercase text-[8px] block font-semibold text-earth-terracotta">Rest Margin</span>
                            <span className="font-bold text-earth-charcoal block text-xs">{profile.restRatio}%</span>
                            <span className="text-[8px] text-earth-charcoal/70 block leading-tight">
                              {profile.restRatio >= 65 ? '🏖 Plentiful Downtime' : profile.restRatio >= 35 ? '⚖ Balanced Breathers' : '⚡ Constant Action'}
                            </span>
                          </div>
                          <div className="text-center space-y-1">
                            <span className="text-earth-charcoal/50 font-mono uppercase text-[8px] block">Scheduling Rigor</span>
                            <span className="font-bold text-earth-charcoal block text-xs">{profile.structurePreference}%</span>
                            <span className="text-[8px] text-earth-charcoal/70 block leading-tight">
                              {profile.structurePreference <= 35 ? '🍃 Totally Spontaneous' : profile.structurePreference <= 70 ? '📋 Scheduled Highlights' : '⏱ Hour-By-Hour Marks'}
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>

            {/* Bottom Form Actions */}
            <div className="pt-6 border-t border-earth-sand/30 flex justify-end">
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto px-8 py-4 bg-earth-terracotta hover:bg-earth-terracotta-dark text-earth-cream font-mono text-xs uppercase font-bold tracking-widest transition-all rounded-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.01]"
                id="btn-confirm-all-profile"
              >
                <span>Calculate Lodestone Matches</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
