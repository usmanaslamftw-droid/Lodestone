import React, { useState, useEffect } from 'react';
import { Destination, TravelStyleProfile, FeasibilityInputs } from '../types';
import { DESTINATIONS, SOCIAL_MODES_LIST, ACCOMMODATIONS_LIST, computeDestinationMatches } from '../data';
import { 
  saveUserProfile, 
  saveUserItinerary, 
  likeSpot, 
  unlikeSpot, 
  getLikedSpots, 
  getUserItineraries,
  SavedItinerary,
  LikedSpot 
} from '../lib/db';
import { RadarChart } from './RadarChart';
import { 
  Heart, 
  Search, 
  Home, 
  Sliders, 
  Compass, 
  MapPin, 
  User, 
  LogOut, 
  Plus, 
  Clock, 
  Sparkles, 
  Bookmark, 
  ChevronRight, 
  ChevronLeft, 
  Calendar,
  DollarSign
} from 'lucide-react';

interface SpotifyPortalProps {
  user: any;
  currentProfile: TravelStyleProfile;
  currentFeasibility: FeasibilityInputs;
  onUpdateProfile: (p: TravelStyleProfile) => void;
  onUpdateFeasibility: (f: FeasibilityInputs) => void;
  onPlayItinerary: (destination: Destination) => void;
  onLogout: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const SpotifyPortal: React.FC<SpotifyPortalProps> = ({
  user,
  currentProfile,
  currentFeasibility,
  onUpdateProfile,
  onUpdateFeasibility,
  onPlayItinerary,
  onLogout,
  isDark,
  onToggleTheme
}) => {
  const [activeView, setActiveView] = useState<'home' | 'discover' | 'equalizer' | 'library' | 'liked'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Localized profile states to support the live "Equalizer" adjustment
  const [profile, setProfile] = useState<TravelStyleProfile>({ ...currentProfile });
  const [feasibility, setFeasibility] = useState<FeasibilityInputs>({ ...currentFeasibility });
  const [likedSpots, setLikedSpots] = useState<LikedSpot[]>([]);
  const [savedItineraries, setSavedItineraries] = useState<SavedItinerary[]>([]);
  const [savingStatus, setSavingStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Re-run matching calculations based on the live coordinates
  const matches = computeDestinationMatches(profile, feasibility);

  // Fetch from DB on load
  useEffect(() => {
    if (user?.uid) {
      loadUserData();
    }
  }, [user?.uid]);

  const loadUserData = async () => {
    try {
      const spots = await getLikedSpots(user.uid);
      setLikedSpots(spots);
      const itineraries = await getUserItineraries(user.uid);
      setSavedItineraries(itineraries);
    } catch (err) {
      console.error("Error loading user lists from Firestore:", err);
    }
  };

  // Sync profile edits with root states & persist to Firestore
  const handleUpdateProfileField = async (field: string, val: number) => {
    let updatedProfile: TravelStyleProfile;
    if (field.startsWith('interests.')) {
      const interestKey = field.split('.')[1] as keyof TravelStyleProfile['interests'];
      updatedProfile = {
        ...profile,
        interests: {
          ...profile.interests,
          [interestKey]: val
        }
      };
    } else {
      updatedProfile = {
        ...profile,
        [field]: val
      };
    }
    
    setProfile(updatedProfile);
    onUpdateProfile(updatedProfile);
    debouncedProfileSave(updatedProfile, feasibility);
  };

  const handleUpdateSelectField = (field: 'socialMode' | 'accommodation' | 'budgetTier', value: any) => {
    const updatedProfile = {
      ...profile,
      [field]: value
    };
    setProfile(updatedProfile);
    onUpdateProfile(updatedProfile);
    debouncedProfileSave(updatedProfile, feasibility);
  };

  const handleUpdateFeasibilityField = (field: keyof FeasibilityInputs, value: any) => {
    const updatedFeasibility = {
      ...feasibility,
      [field]: value
    };
    setFeasibility(updatedFeasibility);
    onUpdateFeasibility(updatedFeasibility);
    debouncedProfileSave(profile, updatedFeasibility);
  };

  // Simple Debounce/Feedback simulator for Firestore writes
  let saveTimeout: any = null;
  const debouncedProfileSave = (p: TravelStyleProfile, f: FeasibilityInputs) => {
    setSavingStatus('saving');
    if (saveTimeout) clearTimeout(saveTimeout);
    saveTimeout = setTimeout(async () => {
      try {
        await saveUserProfile(user.uid, p, f);
        setSavingStatus('saved');
        setTimeout(() => setSavingStatus('idle'), 1500);
      } catch (err) {
        console.error("Failed storing user profile in DB:", err);
        setSavingStatus('idle');
      }
    }, 1000);
  };

  // Like / Unlike experiences
  const handleToggleLikeSpot = async (spot: { id: string; title: string; location: string; description: string; category: string }) => {
    const isAlreadyLiked = likedSpots.some(s => s.id === spot.id);
    try {
      if (isAlreadyLiked) {
        await unlikeSpot(user.uid, spot.id);
        setLikedSpots(prev => prev.filter(s => s.id !== spot.id));
      } else {
        await likeSpot(user.uid, spot);
        setLikedSpots(prev => [...prev, { ...spot, userId: user.uid, createdAt: new Date().toISOString() }]);
      }
    } catch (err) {
      console.error("Error updating spot in database:", err);
    }
  };

  // Save full itinerary to database
  const handleSavePlaylist = async (dest: Destination) => {
    try {
      setSavingStatus('saving');
      const dItinerary = DESTINATIONS.find(d => d.id === dest.id);
      if (!dItinerary) return;
      
      const fakeBlocks = dItinerary ? [{ id: '1', day: 1, timeOfDay: 'morning' as const, title: 'Explore ' + dItinerary.name, description: dItinerary.tagline, location: dItinerary.country, isAutomated: true, automationStatus: 'Confirmed' as const }] : [];

      await saveUserItinerary(user.uid, dest, fakeBlocks);
      const freshItineraries = await getUserItineraries(user.uid);
      setSavedItineraries(freshItineraries);
      setSavingStatus('saved');
      setTimeout(() => setSavingStatus('idle'), 1500);
    } catch (err) {
      console.error("Error saving itinerary to database:", err);
      setSavingStatus('idle');
    }
  };

  // Click: loads active journey and triggers top-level Odyssey interactive trip planner
  const handlePlay = (dest: Destination) => {
    onPlayItinerary(dest);
  };

  // Curated individual Experiences representing activities/locations we can extract from the database
  const featuredTracks = [
    { id: 'kyoto_zazen', title: 'Zazen Dawn Meditation', location: 'Daitoku-ji Temple, Kyoto', description: 'Early morning private Zazen session with a resident monk overlooking a silent 400-year-old moss garden.', category: 'Culture', pace: 'Leisurely Pace', destId: 'kyoto' },
    { id: 'amalfi_gozzo', title: 'Classic Gozzo Coastal Cruise', location: 'Praiano Coast, Italy', description: 'Boarding a custom classic wooden motor boat to explore cliff formations and hidden coves.', category: 'Nature', pace: 'Balanced Pace', destId: 'amalfi' },
    { id: 'oaxaca_mezcal', title: 'Ancestral Agave Tasting', location: 'Santiago Matatlán, Mexico', description: 'Tasting rare, small-batch organic mezcals crushed by stone wheels and distilled by local artisans.', category: 'Food', pace: 'Vibrant Pace', destId: 'oaxaca' },
    { id: 'patagonia_trek', title: 'Laguna de los Tres Climb', location: 'Fitz Roy Base, Argentina', description: 'High-endurance ascent to glacier views directly at the base of Mount Fitz Roy\'s sheer granite horns.', category: 'Adventure', pace: 'Active Pace', destId: 'patagonia' },
    { id: 'bali_sebatu', title: 'Sacred Water Cleansing', location: 'Sebatu Temple, Ubud', description: 'A quiet, respectful purification ritual in forest hot springs led by temple stewards.', category: 'Wellness', pace: 'Leisurely Pace', destId: 'bali' },
    { id: 'iceland_superjeep', title: 'Katla Glacier Ice Cave Crawl', location: 'Katla Volcano, Iceland', description: 'Super-jeep traversal of volcanic ashes to descend into custom ice caves carved by hot springs.', category: 'Adventure', pace: 'Active Pace', destId: 'reykjavik' }
  ];

  // Filter spots by query if in search/discover mode
  const filteredTracks = featuredTracks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-earth-cream text-earth-charcoal font-sans flex flex-col justify-between transition-colors duration-300" id="spotify-tastemaker-portal">
      
      {/* Main Container: Sidebar + Central Section */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR */}
        <aside className="w-64 bg-earth-beige dark:bg-[#121212] p-6 flex flex-col justify-between hidden md:flex border-r border-earth-sand/30 dark:border-neutral-900 transition-colors duration-300" id="sidebar-portal">
          <div className="space-y-6">
            
            {/* Identity */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-earth-terracotta flex items-center justify-center text-white">
                <Compass className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <h2 className="font-serif italic text-lg tracking-tight text-earth-charcoal dark:text-white leading-none">Lodestone</h2>
                <span className="text-[9px] font-mono uppercase tracking-widest text-earth-terracotta font-bold">Tastemaker Hub</span>
              </div>
            </div>

            {/* Nav Menu */}
            <nav className="space-y-4 pt-4">
              <button
                onClick={() => setActiveView('home')}
                className={`w-full flex items-center gap-4 text-xs font-mono uppercase tracking-wider font-bold transition-all py-1 ${
                  activeView === 'home' ? 'text-earth-terracotta dark:text-white' : 'text-earth-charcoal/60 dark:text-neutral-400 hover:text-earth-terracotta dark:hover:text-white'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Discover Hub</span>
              </button>
              
              <button
                onClick={() => setActiveView('discover')}
                className={`w-full flex items-center gap-4 text-xs font-mono uppercase tracking-wider font-bold transition-all py-1 ${
                  activeView === 'discover' ? 'text-earth-terracotta dark:text-white' : 'text-earth-charcoal/60 dark:text-neutral-400 hover:text-earth-terracotta dark:hover:text-white'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Explore Spots</span>
              </button>
              
              <button
                onClick={() => setActiveView('equalizer')}
                className={`w-full flex items-center gap-4 text-xs font-mono uppercase tracking-wider font-bold transition-all py-1 ${
                  activeView === 'equalizer' ? 'text-earth-terracotta dark:text-white' : 'text-earth-charcoal/60 dark:text-neutral-400 hover:text-earth-terracotta dark:hover:text-white'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Style Equalizer</span>
              </button>
            </nav>

            <hr className="border-earth-sand/20 dark:border-neutral-900" />

            {/* Library list */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-earth-charcoal/50 dark:text-neutral-500 uppercase tracking-widest block font-bold">
                Your Curations
              </span>
              
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                <button
                  onClick={() => setActiveView('liked')}
                  className={`w-full text-left flex items-center gap-2.5 text-xs transition-all ${
                    activeView === 'liked' ? 'text-earth-terracotta dark:text-white' : 'text-earth-charcoal/60 dark:text-neutral-400 hover:text-earth-terracotta dark:hover:text-white'
                  }`}
                >
                  <div className="w-5 h-5 rounded bg-gradient-to-br from-indigo-500 to-rose-400 flex items-center justify-center text-white">
                    <Heart className="w-3 h-3 fill-current" />
                  </div>
                  <span className="truncate font-medium">Liked Experiences ({likedSpots.length})</span>
                </button>

                {savedItineraries.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handlePlay(item.destination)}
                    className="w-full text-left flex items-center gap-2.5 text-xs text-earth-charcoal/60 dark:text-neutral-400 hover:text-earth-terracotta dark:hover:text-white transition-all group"
                  >
                    <div className="w-5 h-5 rounded bg-earth-terracotta/20 dark:bg-earth-terracotta/35 flex items-center justify-center text-earth-terracotta dark:text-white group-hover:bg-earth-terracotta group-hover:text-white transition-all">
                      <Compass className="w-3 h-3" />
                    </div>
                    <span className="truncate font-medium">{item.destination.name} Odyssey</span>
                  </button>
                ))}

                {savedItineraries.length === 0 && (
                  <p className="text-[10px] text-earth-charcoal/40 dark:text-neutral-600 font-light italic">No saved itineraries yet. Explore and save journeys to cache.</p>
                )}
              </div>
            </div>

          </div>

          {/* User Footer Account details */}
          <div className="space-y-4 border-t border-earth-sand/20 dark:border-neutral-900 pt-4">
            {savingStatus === 'saving' && (
              <div className="text-[9px] font-mono text-earth-terracotta animate-pulse flex items-center gap-1.5 justify-center bg-earth-sand/10 dark:bg-neutral-950 p-2 rounded border border-earth-sand/20 dark:border-neutral-900">
                <span className="w-1.5 h-1.5 bg-earth-terracotta rounded-full animate-ping" />
                WRITING TO CLOUD DATABASE...
              </div>
            )}
            {savingStatus === 'saved' && (
              <div className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 justify-center bg-earth-sand/10 dark:bg-neutral-950 p-2 rounded border border-earth-sand/20 dark:border-neutral-900">
                ✓ ALL CHANGES PERSISTED SECURELY
              </div>
            )}

            <div className="flex items-center justify-between gap-2 bg-earth-sand/10 dark:bg-neutral-950 p-3 rounded-sm border border-earth-sand/20 dark:border-neutral-900">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-full bg-earth-sand/20 dark:bg-neutral-800 border border-earth-sand/30 dark:border-neutral-700 flex items-center justify-center text-earth-terracotta text-xs font-bold font-mono">
                  {user.email ? user.email[0].toUpperCase() : 'U'}
                </div>
                <div className="truncate text-left">
                  <p className="text-xs font-bold text-earth-charcoal dark:text-white truncate leading-none mb-1">
                    {user.displayName || 'Tastemaker'}
                  </p>
                  <p className="text-[9px] font-mono text-earth-charcoal/50 dark:text-neutral-500 uppercase tracking-wider leading-none">
                    Verified Steward
                  </p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="text-earth-charcoal/40 dark:text-neutral-500 hover:text-earth-terracotta transition-colors p-1"
                title="Log Out"
                id="btn-logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* CENTRAL PANEL */}
        <main className="flex-1 bg-earth-cream overflow-y-auto px-6 py-6 md:px-8 flex flex-col justify-between transition-colors duration-300" id="central-discover-feed">
          
          {/* Header Bar */}
          <div className="flex justify-between items-center mb-6 border-b border-earth-sand/20 dark:border-neutral-800 pb-4">
            
            {/* View navigation indicator */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveView('home')}
                  className="w-8 h-8 rounded-full bg-earth-sand/20 dark:bg-black/50 flex items-center justify-center hover:bg-earth-sand/35 dark:hover:bg-black transition-all"
                >
                  <ChevronLeft className="w-4 h-4 text-earth-charcoal/80 dark:text-neutral-300" />
                </button>
                <button
                  onClick={() => setActiveView('equalizer')}
                  className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black transition-all"
                >
                  <ChevronRight className="w-4 h-4 text-neutral-300" />
                </button>
              </div>

              {/* Live coordinates summary */}
              <div className="hidden lg:flex items-center gap-3 bg-earth-sand/20 dark:bg-black/40 px-3 py-1.5 rounded-full border border-earth-sand/30 dark:border-neutral-900 text-[10px] font-mono text-earth-charcoal/70 dark:text-neutral-400">
                <span className="text-earth-terracotta font-semibold">Pace: {profile.pace}%</span>
                <span>•</span>
                <span className="text-earth-terracotta font-semibold">Rest: {profile.restRatio}%</span>
                <span>•</span>
                <span className="text-earth-charcoal dark:text-neutral-300">{profile.socialMode.toUpperCase()}</span>
                <span>•</span>
                <span className="text-earth-charcoal dark:text-neutral-300">{profile.budgetTier.toUpperCase()}</span>
              </div>
            </div>

            {/* Right Controls: Theme Toggler and Profile Summary */}
            <div className="flex items-center gap-3">
              <button
                onClick={onToggleTheme}
                className="text-xs bg-earth-sand/20 dark:bg-black/30 border border-earth-sand/30 dark:border-neutral-800 px-3 py-1.5 rounded-full hover:bg-earth-sand/40 dark:hover:bg-black/60 font-mono transition-all text-earth-charcoal/85 dark:text-neutral-300"
              >
                {isDark ? '🎨 Light Design Mode' : '🌙 Premium Dark Mode'}
              </button>

              <div className="md:hidden flex items-center gap-2 bg-earth-beige dark:bg-black px-3 py-1.5 rounded-full text-xs border border-earth-sand/30 dark:border-neutral-900">
                <User className="w-3.5 h-3.5 text-earth-terracotta" />
                <button onClick={onLogout} className="text-earth-charcoal/60 dark:text-neutral-400 hover:text-earth-terracotta dark:hover:text-white font-mono text-[9px] uppercase tracking-wider font-bold">Logout</button>
              </div>
            </div>

          </div>

          {/* DYNAMIC VIEW RENDER */}
          <div className="flex-1 space-y-8 text-left">
            
            {activeView === 'home' && (
              <>
                {/* Greeting / Hero Box */}
                <div className="bg-gradient-to-r from-earth-sand/20 via-earth-sand/10 to-earth-terracotta/10 dark:from-neutral-900 dark:via-neutral-900/90 dark:to-earth-terracotta/10 p-6 md:p-8 rounded-sm border border-earth-sand/30 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
                  <div className="space-y-3 z-10">
                    <span className="font-mono text-[10px] bg-earth-terracotta/20 border border-earth-terracotta/30 text-earth-terracotta px-2.5 py-1 rounded-sm uppercase tracking-widest font-extrabold">
                      Tastemaker Discovery
                    </span>
                    <h2 className="font-serif text-3xl italic font-normal tracking-tight text-earth-charcoal dark:text-white leading-tight">
                      Good evening, {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
                    </h2>
                    <p className="text-xs text-earth-charcoal/70 dark:text-neutral-400 max-w-xl font-light leading-relaxed">
                      We’ve calibrated our verified travel matching index to your style coordinates. Change your 
                      <span className="text-earth-charcoal dark:text-white font-semibold"> Style Equalizer</span> at any time on the left sidebar to live-re-sort our recommended travel itineraries and experience spots.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-earth-sand/15 dark:bg-black/60 p-4 border border-earth-sand/30 dark:border-neutral-800 rounded z-10">
                    <RadarChart data={profile.interests} size={110} />
                    <div className="space-y-1">
                      <p className="font-mono text-[9px] text-earth-charcoal/50 dark:text-neutral-500 font-bold uppercase tracking-wider">YOUR RADAR COORDINATES</p>
                      <p className="text-[10px] font-sans font-semibold text-earth-terracotta">Culinary: {profile.interests.food}%</p>
                      <p className="text-[10px] font-sans font-semibold text-earth-charcoal/70 dark:text-neutral-400">Culture: {profile.interests.culture}%</p>
                      <p className="text-[10px] font-sans font-semibold text-earth-charcoal/70 dark:text-neutral-400">Nature: {profile.interests.nature}%</p>
                    </div>
                  </div>
                  
                  {/* Backdrop glowing gradient */}
                  <div className="absolute right-0 top-0 w-80 h-80 bg-earth-terracotta/5 rounded-full blur-3xl pointer-events-none" />
                </div>

                {/* Horizontal Quick Grid (Recently Calibrated / Daily Mixes) */}
                <div className="space-y-3">
                  <h3 className="font-serif text-xl italic font-normal text-earth-charcoal dark:text-white">Your Top Calibrated Itineraries</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {matches.slice(0, 3).map((match) => (
                      <div 
                        key={match.destination.id}
                        className="bg-earth-sand/10 dark:bg-neutral-900/60 border border-earth-sand/20 dark:border-neutral-800 hover:border-earth-terracotta/30 hover:shadow-sm p-3 rounded flex items-center justify-between group transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img 
                            src={match.destination.imageUrl} 
                            alt={match.destination.name} 
                            className="w-12 h-12 rounded object-cover border border-earth-sand/20 dark:border-neutral-800"
                            referrerPolicy="no-referrer"
                          />
                          <div className="truncate text-left">
                            <h4 className="text-xs font-bold text-earth-charcoal dark:text-white truncate leading-tight">{match.destination.name} Odyssey</h4>
                            <p className="text-[9px] font-mono text-earth-terracotta font-semibold mt-0.5 leading-none">
                              {match.overallScore}% MATCH RATIO
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleSavePlaylist(match.destination)}
                            className="p-1.5 text-earth-charcoal/60 dark:text-neutral-400 hover:text-earth-terracotta dark:hover:text-white transition-colors"
                            title="Save to Library"
                          >
                            <Bookmark className="w-3.5 h-3.5" />
                          </button>
                          
                          <button
                            onClick={() => handlePlay(match.destination)}
                            className="px-2.5 py-1.5 rounded bg-earth-terracotta flex items-center gap-1 text-white text-[10px] font-mono uppercase tracking-wider font-bold transition-all hover:bg-earth-terracotta-dark shadow-xs"
                            title="Launch Odyssey Itinerary"
                          >
                            <Compass className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grid Section: Curated Travel Albums based on coordinates */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-earth-sand/20 dark:border-neutral-800 pb-2">
                    <h3 className="font-serif text-xl italic font-normal text-earth-charcoal dark:text-white">Made For You — Curated Itineraries</h3>
                    <button onClick={() => setActiveView('discover')} className="text-[10px] font-mono uppercase tracking-wider font-bold text-earth-charcoal/60 dark:text-neutral-400 hover:text-earth-terracotta dark:hover:text-white">See all curations</button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {matches.map((match) => (
                      <div 
                        key={match.destination.id}
                        className="bg-earth-sand/5 dark:bg-neutral-900/30 border border-earth-sand/15 dark:border-neutral-900 hover:border-earth-terracotta/20 p-3.5 rounded-sm flex flex-col justify-between hover:bg-earth-sand/10 dark:hover:bg-neutral-900/60 transition-all group"
                      >
                        <div className="relative aspect-square w-full rounded overflow-hidden border border-earth-sand/20 dark:border-neutral-800 mb-3">
                          <img 
                            src={match.destination.imageUrl} 
                            alt={match.destination.name} 
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                            referrerPolicy="no-referrer"
                          />
                          
                          {/* Travel Action Overlay */}
                          <div className="absolute inset-0 bg-black/45 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                            <button
                              onClick={() => handlePlay(match.destination)}
                              className="px-3 py-1.5 rounded-sm bg-earth-terracotta flex items-center gap-1.5 text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all"
                            >
                              <Compass className="w-3.5 h-3.5" />
                              <span>Explore</span>
                            </button>
                          </div>
                          
                          {/* Match badge */}
                          <div className="absolute top-2 left-2 bg-black/85 backdrop-blur-xs border border-neutral-800 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold text-earth-terracotta">
                            {match.overallScore}% MATCH
                          </div>
                        </div>

                        <div className="space-y-1 text-left">
                          <h4 className="text-xs font-bold text-earth-charcoal dark:text-white truncate leading-tight">{match.destination.name} Odyssey</h4>
                          <p className="text-[9px] text-earth-charcoal/60 dark:text-neutral-500 font-light truncate leading-none">{match.destination.tagline}</p>
                          <p className="text-[9px] font-mono text-earth-charcoal/70 dark:text-neutral-400 pt-1 leading-none">
                            {match.destination.suggestedDuration} days • ${match.destination.averageDailyCost}/day
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hot Tracks Grid (Activities and Spots) */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-earth-sand/20 dark:border-neutral-800 pb-2">
                    <h3 className="font-serif text-xl italic font-normal text-earth-charcoal dark:text-white">Recommended Experience Spots</h3>
                    <span className="text-[10px] font-mono text-earth-charcoal/50 dark:text-neutral-500 font-medium">INDIVIDUAL EXPERIENCE CHANNELS</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {featuredTracks.map((track) => {
                      const isLiked = likedSpots.some(s => s.id === track.id);
                      return (
                        <div 
                          key={track.id}
                          className="bg-earth-sand/5 dark:bg-neutral-900/20 border border-earth-sand/15 dark:border-neutral-900 hover:border-earth-terracotta/25 hover:bg-earth-sand/10 dark:hover:bg-neutral-900/40 p-4 rounded-sm flex justify-between gap-4 items-start transition-all shadow-xs hover:shadow-md"
                        >
                          <div className="space-y-2 text-left flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-mono uppercase bg-earth-sand/20 dark:bg-neutral-800 px-2 py-0.5 rounded text-earth-charcoal dark:text-neutral-300">
                                {track.category}
                              </span>
                              <span className="text-[9px] font-mono text-earth-terracotta font-semibold">
                                {track.pace}
                              </span>
                            </div>
                            
                            <h4 className="text-xs font-bold text-earth-charcoal dark:text-white leading-tight">{track.title}</h4>
                            <p className="text-[10px] font-mono text-earth-charcoal/60 dark:text-neutral-500 flex items-center gap-1 truncate">
                              <MapPin className="w-3 h-3 text-earth-charcoal/40 dark:text-neutral-600" />
                              {track.location}
                            </p>
                            <p className="text-[10px] text-earth-charcoal/80 dark:text-neutral-400 font-light leading-relaxed">
                              {track.description}
                            </p>
                          </div>

                          <div className="flex flex-col justify-between h-full items-end">
                            <button
                              onClick={() => handleToggleLikeSpot(track)}
                              className={`p-2 transition-transform active:scale-95 ${
                                isLiked ? 'text-earth-terracotta' : 'text-earth-charcoal/40 dark:text-neutral-500 hover:text-earth-terracotta dark:hover:text-white'
                              }`}
                              title={isLiked ? "Unlike Spot" : "Like Spot"}
                            >
                              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                            </button>
                            
                            <button
                              onClick={() => {
                                const dest = DESTINATIONS.find(d => d.id === track.destId);
                                if (dest) handlePlay(dest);
                              }}
                              className="text-[9px] font-mono uppercase tracking-wider bg-earth-sand/20 dark:bg-neutral-800 hover:bg-earth-terracotta dark:hover:bg-neutral-700 text-earth-charcoal dark:text-white hover:text-white px-2.5 py-1.5 rounded transition-colors border border-earth-sand/30 dark:border-neutral-700/60"
                            >
                              Explore Spot
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* SEARCH VIEW */}
            {activeView === 'discover' && (
              <div className="space-y-6">
                <div className="max-w-md bg-earth-sand/10 dark:bg-neutral-900 p-2 border border-earth-sand/20 dark:border-neutral-800 rounded flex items-center gap-3">
                  <Search className="w-4 h-4 text-earth-charcoal/60 dark:text-neutral-400 ml-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by spot name, region, or category (e.g. Kyoto, Culture)..."
                    className="flex-1 bg-transparent border-none outline-none text-xs text-earth-charcoal dark:text-white placeholder-earth-charcoal/45 dark:placeholder-neutral-500"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-lg italic text-earth-charcoal dark:text-white">Matching Experience Spots ({filteredTracks.length})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {filteredTracks.map(track => {
                      const isLiked = likedSpots.some(s => s.id === track.id);
                      return (
                        <div key={track.id} className="bg-earth-sand/10 dark:bg-neutral-900/40 p-4 border border-earth-sand/20 dark:border-neutral-800/80 rounded flex justify-between items-start">
                          <div className="space-y-1.5 text-left">
                            <span className="text-[8px] font-mono uppercase bg-earth-sand/20 dark:bg-neutral-800 px-2 py-0.5 rounded text-earth-charcoal/60 dark:text-neutral-400">{track.category}</span>
                            <h4 className="text-xs font-bold text-earth-charcoal dark:text-white">{track.title}</h4>
                            <p className="text-[10px] font-mono text-earth-charcoal/50 dark:text-neutral-500">{track.location}</p>
                            <p className="text-[10px] text-earth-charcoal/70 dark:text-neutral-400 font-light leading-relaxed">{track.description}</p>
                          </div>
                          
                          <button
                            onClick={() => handleToggleLikeSpot(track)}
                            className={`p-2 transition-all ${isLiked ? 'text-earth-terracotta' : 'text-earth-charcoal/40 dark:text-neutral-500 hover:text-earth-terracotta dark:hover:text-white'}`}
                          >
                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* EQUALIZER VIEW */}
            {activeView === 'equalizer' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Equalizer Column 1: Coordinate Sliders (7 cols) */}
                <div className="lg:col-span-7 bg-earth-sand/10 dark:bg-neutral-900 p-6 md:p-8 border border-earth-sand/20 dark:border-neutral-800 rounded-sm space-y-6">
                  <div className="border-b border-earth-sand/20 dark:border-neutral-800 pb-3 flex justify-between items-center">
                    <h3 className="font-serif text-lg italic text-earth-charcoal dark:text-white">Style Equalizer Fine-Tuning</h3>
                    <span className="text-[9px] font-mono text-earth-terracotta uppercase tracking-widest font-bold">Live Calibrator</span>
                  </div>

                  <div className="space-y-5">
                    
                    {/* Pace Slider */}
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between text-xs font-semibold text-earth-charcoal dark:text-neutral-200">
                        <span>Desired Daily Pace (Tempo)</span>
                        <span className="font-mono text-earth-terracotta font-bold">{profile.pace}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={profile.pace}
                        onChange={(e) => handleUpdateProfileField('pace', parseInt(e.target.value))}
                        className="w-full h-1 bg-earth-sand/30 dark:bg-neutral-800 rounded appearance-none cursor-pointer accent-earth-terracotta"
                      />
                      <p className="text-[9px] text-earth-charcoal/50 dark:text-neutral-500 font-light leading-none">
                        0% = total static rest • 100% = packed vertical transit hours
                      </p>
                    </div>

                    {/* Rest Ratio Slider */}
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between text-xs font-semibold text-earth-charcoal dark:text-neutral-200">
                        <span>Rest & Restoration Ratio</span>
                        <span className="font-mono text-earth-terracotta font-bold">{profile.restRatio}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={profile.restRatio}
                        onChange={(e) => handleUpdateProfileField('restRatio', parseInt(e.target.value))}
                        className="w-full h-1 bg-earth-sand/30 dark:bg-neutral-800 rounded appearance-none cursor-pointer accent-earth-terracotta"
                      />
                    </div>

                    {/* Structure Preference Slider */}
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between text-xs font-semibold text-earth-charcoal dark:text-neutral-200">
                        <span>Schedules & Structure Depth</span>
                        <span className="font-mono text-earth-terracotta font-bold">{profile.structurePreference}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={profile.structurePreference}
                        onChange={(e) => handleUpdateProfileField('structurePreference', parseInt(e.target.value))}
                        className="w-full h-1 bg-earth-sand/30 dark:bg-neutral-800 rounded appearance-none cursor-pointer accent-earth-terracotta"
                      />
                    </div>

                    <div className="h-px bg-earth-sand/20 dark:bg-neutral-800 my-4" />
                    
                    {/* Interest Equalizers */}
                    <span className="text-[9px] font-mono text-earth-charcoal/50 dark:text-neutral-500 uppercase tracking-widest font-bold block">
                      Interest Waveform Coordinates
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      
                      {/* Culinary */}
                      <div className="space-y-1.5 text-left">
                        <div className="flex justify-between text-earth-charcoal/80 dark:text-neutral-300">
                          <span>Culinary Mix</span>
                          <span className="font-mono text-earth-terracotta">{profile.interests.food}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={profile.interests.food}
                          onChange={(e) => handleUpdateProfileField('interests.food', parseInt(e.target.value))}
                          className="w-full h-1 bg-earth-sand/30 dark:bg-neutral-800 rounded appearance-none cursor-pointer accent-earth-terracotta"
                        />
                      </div>

                      {/* Nature */}
                      <div className="space-y-1.5 text-left">
                        <div className="flex justify-between text-earth-charcoal/80 dark:text-neutral-300">
                          <span>Nature & Wilderness</span>
                          <span className="font-mono text-earth-terracotta">{profile.interests.nature}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={profile.interests.nature}
                          onChange={(e) => handleUpdateProfileField('interests.nature', parseInt(e.target.value))}
                          className="w-full h-1 bg-earth-sand/30 dark:bg-neutral-800 rounded appearance-none cursor-pointer accent-earth-terracotta"
                        />
                      </div>

                      {/* History & Arts */}
                      <div className="space-y-1.5 text-left">
                        <div className="flex justify-between text-earth-charcoal/80 dark:text-neutral-300">
                          <span>History & Culture Archive</span>
                          <span className="font-mono text-earth-terracotta">{profile.interests.culture}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={profile.interests.culture}
                          onChange={(e) => handleUpdateProfileField('interests.culture', parseInt(e.target.value))}
                          className="w-full h-1 bg-earth-sand/30 dark:bg-neutral-800 rounded appearance-none cursor-pointer accent-earth-terracotta"
                        />
                      </div>

                      {/* Wellness */}
                      <div className="space-y-1.5 text-left">
                        <div className="flex justify-between text-earth-charcoal/80 dark:text-neutral-300">
                          <span>Wellness & Rebalance</span>
                          <span className="font-mono text-earth-terracotta">{profile.interests.wellness}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={profile.interests.wellness}
                          onChange={(e) => handleUpdateProfileField('interests.wellness', parseInt(e.target.value))}
                          className="w-full h-1 bg-earth-sand/30 dark:bg-neutral-800 rounded appearance-none cursor-pointer accent-earth-terracotta"
                        />
                      </div>

                    </div>

                    {/* Companion Mode Selector */}
                    <div className="space-y-2 pt-2 text-left">
                      <label className="text-xs text-earth-charcoal dark:text-neutral-200 font-semibold block">Social Companion Structure</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {SOCIAL_MODES_LIST.map((mode) => (
                          <button
                            key={mode.id}
                            onClick={() => handleUpdateSelectField('socialMode', mode.id)}
                            className={`p-2 border rounded-sm text-center text-[10px] uppercase font-mono font-bold transition-all ${
                              profile.socialMode === mode.id
                                ? 'border-earth-terracotta bg-earth-sand/20 dark:bg-neutral-800 text-earth-terracotta'
                                : 'border-earth-sand/25 dark:border-neutral-800 bg-earth-sand/5 dark:bg-neutral-950 text-earth-charcoal/60 dark:text-neutral-400 hover:border-earth-terracotta/30'
                            }`}
                          >
                            {mode.label}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
                  {/* Equalizer Column 2: Live Match Index Rendering (5 cols) */}
                <div className="lg:col-span-5 bg-earth-sand/10 dark:bg-neutral-900 p-6 border border-earth-sand/20 dark:border-neutral-800 rounded-sm space-y-6 text-left">
                  <h3 className="font-serif text-lg italic text-earth-charcoal dark:text-white border-b border-earth-sand/20 dark:border-neutral-800 pb-3">Real-time Recalibration</h3>
                  
                  <div className="flex justify-center py-4 bg-earth-sand/5 dark:bg-black/25 rounded border border-earth-sand/20 dark:border-neutral-800/60">
                    <RadarChart data={profile.interests} size={240} />
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[10px] font-mono text-earth-charcoal/50 dark:text-neutral-500 uppercase tracking-widest font-bold">Sorted Recommendations</h4>
                    {matches.slice(0, 4).map(m => (
                      <div key={m.destination.id} className="flex justify-between items-center bg-earth-sand/10 dark:bg-black/40 p-2.5 rounded border border-earth-sand/20 dark:border-neutral-800 text-xs">
                        <span className="font-semibold text-earth-charcoal dark:text-white">{m.destination.name} Odyssey</span>
                        <span className="font-mono font-bold text-earth-terracotta bg-earth-terracotta/10 border border-earth-terracotta/20 px-2 py-0.5 rounded-sm text-[10px]">
                          {m.overallScore}% ALIGNED
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-earth-sand/5 dark:bg-neutral-950 rounded border border-earth-sand/20 dark:border-neutral-800 text-[10px] text-earth-charcoal/70 dark:text-neutral-400 font-light leading-relaxed">
                    Firestore automatic write queue will trigger in the background once you pause slider adjustments, ensuring your style profile stays fully synchronized.
                  </div>
                </div>

              </div>
            )}

            {/* LIKED SPOT TRACKS VIEW */}
            {activeView === 'liked' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-earth-sand/35 via-earth-sand/15 to-earth-terracotta/10 dark:from-indigo-900/40 dark:to-purple-900/20 p-6 md:p-8 border border-earth-sand/20 dark:border-neutral-800 rounded-sm flex items-center gap-6 text-left">
                  <div className="w-16 h-16 rounded bg-gradient-to-br from-indigo-500 to-rose-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    <Heart className="w-8 h-8 fill-current" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase bg-earth-sand/30 dark:bg-neutral-800/80 px-2 py-1 rounded text-earth-charcoal dark:text-neutral-300 font-bold tracking-widest">
                      Your Liked Spots
                    </span>
                    <h2 className="font-serif text-2xl italic font-normal text-earth-charcoal dark:text-white mt-1">Liked Experiences</h2>
                    <p className="text-xs text-earth-charcoal/70 dark:text-neutral-400 font-light mt-0.5">{likedSpots.length} experiences saved to database</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {likedSpots.length === 0 ? (
                    <div className="text-center py-12 bg-earth-sand/5 dark:bg-neutral-900/20 border border-earth-sand/15 dark:border-neutral-900 rounded text-xs text-earth-charcoal/50 dark:text-neutral-500">
                      No experience spots liked yet. Browse our discover feed and click the heart icon on any spots!
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {likedSpots.map(spot => (
                        <div key={spot.id} className="bg-earth-sand/10 dark:bg-neutral-900/40 p-4 border border-earth-sand/20 dark:border-neutral-800 rounded flex justify-between items-start text-left">
                          <div className="space-y-1.5">
                            <span className="text-[8px] font-mono uppercase bg-earth-sand/20 dark:bg-neutral-800 px-2 py-0.5 rounded text-earth-charcoal/60 dark:text-neutral-400">{spot.category}</span>
                            <h4 className="text-xs font-bold text-earth-charcoal dark:text-white">{spot.title}</h4>
                            <p className="text-[10px] font-mono text-earth-charcoal/50 dark:text-neutral-500 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {spot.location}
                            </p>
                            <p className="text-[10px] text-earth-charcoal/70 dark:text-neutral-400 font-light leading-relaxed">{spot.description}</p>
                          </div>
                          
                          <button
                            onClick={() => handleToggleLikeSpot(spot)}
                            className="p-1.5 text-earth-terracotta hover:text-earth-charcoal/70 dark:hover:text-neutral-400 transition-colors"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </main>
      </div>

    </div>
  );
};
