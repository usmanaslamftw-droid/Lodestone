import React, { useState } from 'react';
import { Destination, ItineraryBlock, TravelStyleProfile, FeasibilityInputs, BookingStatus, ChatMessage } from '../types';
import { TripBuilder } from './TripBuilder';
import { ConciergeLayer } from './ConciergeLayer';
import { RadarChart } from './RadarChart';
import { Sliders, HelpCircle, MessageSquare, PhoneCall, ShieldCheck, UserCheck, Calendar, Clock, MapPin, Globe, Compass, Activity, ArrowLeft, Sun, Moon } from 'lucide-react';
import { SOCIAL_MODES_LIST, ACCOMMODATIONS_LIST } from '../data';

interface DashboardProps {
  destination: Destination;
  itinerary: ItineraryBlock[];
  profile: TravelStyleProfile;
  feasibility: FeasibilityInputs;
  bookingStatuses: BookingStatus[];
  chatMessages: ChatMessage[];
  isBooked: boolean;
  onToggleBlockAutomation: (blockId: string) => void;
  onSendMessage: (text: string) => void;
  onUpdateProfile: (profile: TravelStyleProfile) => void;
  onUpdateFeasibility: (feasibility: FeasibilityInputs) => void;
  onConfirmBooking: () => void;
  onResetTrip: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  destination,
  itinerary,
  profile,
  feasibility,
  bookingStatuses,
  chatMessages,
  isBooked,
  onToggleBlockAutomation,
  onSendMessage,
  onUpdateProfile,
  onUpdateFeasibility,
  onConfirmBooking,
  onResetTrip,
  isDark,
  onToggleTheme
}) => {
  const [activeTab, setActiveTab] = useState<'itinerary' | 'concierge' | 'profile'>('itinerary');
  const [editProfile, setEditProfile] = useState<TravelStyleProfile>({ ...profile });
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleSliderChange = (field: keyof TravelStyleProfile | string, val: number) => {
    if (field.startsWith('interests.')) {
      const interestKey = field.split('.')[1] as keyof TravelStyleProfile['interests'];
      setEditProfile(prev => ({
        ...prev,
        interests: {
          ...prev.interests,
          [interestKey]: val
        }
      }));
    } else {
      setEditProfile(prev => ({
        ...prev,
        [field]: val
      }));
    }
  };

  const handleSelectChange = (field: 'socialMode' | 'accommodation' | 'budgetTier', value: any) => {
    setEditProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfileUpdates = () => {
    onUpdateProfile(editProfile);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  return (
    <div className="bg-earth-cream text-earth-charcoal font-sans min-h-screen">
      
      {/* Editorial Dashboard Banner */}
      <div className="bg-earth-moss-light border-b border-earth-sand px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          {/* Left: Identity and Path back */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <button 
                onClick={onResetTrip}
                className="text-xs font-semibold text-earth-charcoal/50 hover:text-earth-terracotta tracking-wider uppercase flex items-center"
              >
                <ArrowLeft className="w-3 h-3 mr-1" /> All Destinations
              </button>
              <span className="text-earth-charcoal/30">•</span>
              <span className="font-mono text-[9px] bg-earth-sand px-2 py-0.5 rounded text-earth-terracotta font-semibold tracking-wider">
                LODESTONE DASHBOARD
              </span>
            </div>
            
            <h1 className="font-serif text-3xl italic text-earth-charcoal tracking-tight font-normal flex items-center gap-2 leading-tight">
              <span>{destination.name} Odyssey</span>
              <span className="font-sans font-light text-base text-earth-charcoal/60">by {feasibility.homeCity}</span>
            </h1>
          </div>

          {/* Right: Active Trip Status bar & Theme Toggler */}
          <div className="flex items-center space-x-4">
            {/* Circular Theme Toggler */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-full border border-earth-sand bg-earth-cream hover:bg-earth-sand/30 text-earth-charcoal transition-all"
              aria-label="Toggle visual layout theme"
              title="Switch Theme"
              id="btn-theme-toggle-dashboard"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-earth-terracotta" />}
            </button>

            <div className="flex items-center space-x-3 bg-earth-cream border border-earth-sand px-4 py-3 rounded-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-earth-terracotta animate-pulse" />
              <div>
                <p className="font-mono text-[9px] uppercase tracking-wider text-earth-charcoal/50 font-bold leading-none mb-1">
                  TRIP SYSTEM STATUS
                </p>
                <p className="font-sans font-bold text-xs text-earth-charcoal">
                  {isBooked ? 'Confirmed & Ground Bookings Active' : 'Calibrated Skeleton Outline'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-earth-moss-light border-b border-earth-sand px-6">
        <div className="max-w-7xl mx-auto flex space-x-8">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`py-4 text-xs font-mono uppercase font-bold tracking-wider border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'itinerary' 
                ? 'border-earth-terracotta text-earth-terracotta' 
                : 'border-transparent text-earth-charcoal/50 hover:text-earth-charcoal'
            }`}
            id="tab-btn-itinerary"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Lodestone Itinerary</span>
          </button>
          <button
            onClick={() => setActiveTab('concierge')}
            className={`py-4 text-xs font-mono uppercase font-bold tracking-wider border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'concierge' 
                ? 'border-earth-terracotta text-earth-terracotta' 
                : 'border-transparent text-earth-charcoal/50 hover:text-earth-charcoal'
            }`}
            id="tab-btn-concierge"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Concierge Desk</span>
            {chatMessages.length > 2 && (
              <span className="w-2 h-2 rounded-full bg-earth-terracotta block" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 text-xs font-mono uppercase font-bold tracking-wider border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'profile' 
                ? 'border-earth-terracotta text-earth-terracotta' 
                : 'border-transparent text-earth-charcoal/50 hover:text-earth-charcoal'
            }`}
            id="tab-btn-profile"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Travel Style Profile</span>
          </button>
        </div>
      </div>

      {/* Dynamic Tab Render */}
      <main className="py-6">
        {activeTab === 'itinerary' && (
          <TripBuilder
            destination={destination}
            itinerary={itinerary}
            onToggleBlockAutomation={onToggleBlockAutomation}
            onOpenAssistant={() => setActiveTab('concierge')}
            onScheduleCall={() => setActiveTab('concierge')}
            onBackToMatches={onResetTrip}
            onConfirmBooking={onConfirmBooking}
            isBooked={isBooked}
          />
        )}

        {activeTab === 'concierge' && (
          <ConciergeLayer
            bookingStatuses={bookingStatuses}
            chatMessages={chatMessages}
            onSendMessage={onSendMessage}
            destinationName={destination.name}
          />
        )}

        {activeTab === 'profile' && (
          <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start" id="editable-profile-tab">
            
            {/* Left: Dynamic Radar representation (5 cols) */}
            <div className="md:col-span-5 bg-earth-moss-light border border-earth-sand p-6 rounded shadow-xs space-y-6">
              <h3 className="font-serif font-bold text-lg text-earth-charcoal border-b border-earth-sand pb-3">Style Matrix</h3>
              <RadarChart data={editProfile.interests} size={300} />
              <div className="p-4 bg-earth-sand/20 rounded border border-earth-sand text-[11px] leading-relaxed font-light text-earth-charcoal/80">
                Any slider updates made on the right will instantly redraw your Style coordinates and recalibrate our itinerary guidelines.
              </div>
            </div>

            {/* Right: Fine tuning Sliders (7 cols) */}
            <div className="md:col-span-7 bg-earth-moss-light border border-earth-sand p-6 md:p-8 rounded shadow-xs space-y-6">
              <div className="flex justify-between items-center border-b border-earth-sand pb-3">
                <h3 className="font-serif font-bold text-lg text-earth-charcoal">Fine-Tune Profile Coordinates</h3>
                <button
                  onClick={handleSaveProfileUpdates}
                  className="px-4 py-2 bg-earth-terracotta hover:bg-earth-terracotta-dark text-earth-cream font-mono text-[10px] uppercase font-bold tracking-wider transition-colors rounded-sm"
                  id="btn-save-profile-updates"
                >
                  Save Style
                </button>
              </div>

              {showSaveSuccess && (
                <div className="bg-earth-moss-light border border-earth-moss text-earth-moss p-3 rounded text-xs font-semibold uppercase tracking-wider text-center transition-all">
                  ✓ Profile Coordinates Recalibrated Successfully
                </div>
              )}

              {/* Sliders Grid */}
              <div className="space-y-5">
                {/* Sliders 1: Pace */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Desired Daily Pace</span>
                    <span className="font-mono text-earth-terracotta font-bold">{editProfile.pace}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editProfile.pace}
                    onChange={(e) => handleSliderChange('pace', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-earth-sand rounded appearance-none cursor-pointer accent-earth-terracotta"
                  />
                </div>

                {/* Slider 2: RestRatio */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Rest Days Ratio</span>
                    <span className="font-mono text-earth-terracotta font-bold">{editProfile.restRatio}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editProfile.restRatio}
                    onChange={(e) => handleSliderChange('restRatio', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-earth-sand rounded appearance-none cursor-pointer accent-earth-terracotta"
                  />
                </div>

                {/* Slider 3: Structure Preference */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Structure & Scheduled Blueprint</span>
                    <span className="font-mono text-earth-terracotta font-bold">{editProfile.structurePreference}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editProfile.structurePreference}
                    onChange={(e) => handleSliderChange('structurePreference', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-earth-sand rounded appearance-none cursor-pointer accent-earth-terracotta"
                  />
                </div>

                {/* Interests divider */}
                <div className="h-px bg-earth-sand my-4" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-earth-charcoal/40 font-bold block">
                  INTEREST GRADIENTS
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                  {/* Culinary */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Culinary & Dining</span>
                      <span className="font-mono text-earth-terracotta">{editProfile.interests.food}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={editProfile.interests.food}
                      onChange={(e) => handleSliderChange('interests.food', parseInt(e.target.value))}
                      className="w-full h-1 bg-earth-sand rounded appearance-none cursor-pointer accent-earth-terracotta"
                    />
                  </div>

                  {/* Nature */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Nature & Wilderness</span>
                      <span className="font-mono text-earth-terracotta">{editProfile.interests.nature}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={editProfile.interests.nature}
                      onChange={(e) => handleSliderChange('interests.nature', parseInt(e.target.value))}
                      className="w-full h-1 bg-earth-sand rounded appearance-none cursor-pointer accent-earth-terracotta"
                    />
                  </div>

                  {/* Culture */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>History & Arts</span>
                      <span className="font-mono text-earth-terracotta">{editProfile.interests.culture}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={editProfile.interests.culture}
                      onChange={(e) => handleSliderChange('interests.culture', parseInt(e.target.value))}
                      className="w-full h-1 bg-earth-sand rounded appearance-none cursor-pointer accent-earth-terracotta"
                    />
                  </div>

                  {/* Wellness */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Wellness & Rest</span>
                      <span className="font-mono text-earth-terracotta">{editProfile.interests.wellness}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={editProfile.interests.wellness}
                      onChange={(e) => handleSliderChange('interests.wellness', parseInt(e.target.value))}
                      className="w-full h-1 bg-earth-sand rounded appearance-none cursor-pointer accent-earth-terracotta"
                    />
                  </div>
                </div>

                {/* Stays selector */}
                <div className="space-y-3 pt-4">
                  <label className="text-xs font-semibold block">Social Companionship Mode</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {SOCIAL_MODES_LIST.map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => handleSelectChange('socialMode', mode.id)}
                        className={`p-2.5 border rounded-sm text-center text-[10px] uppercase font-mono font-bold transition-all ${
                          editProfile.socialMode === mode.id
                            ? 'border-earth-terracotta bg-earth-sand text-earth-terracotta'
                            : 'border-earth-sand bg-white hover:border-earth-charcoal/35'
                        }`}
                      >
                        {mode.label.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};
