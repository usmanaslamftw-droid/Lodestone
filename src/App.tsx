import { useState, useEffect } from 'react';
import { TravelStyleProfile, FeasibilityInputs, Destination, ItineraryBlock, ChatMessage, BookingStatus } from './types';
import { INITIAL_PROFILE, INITIAL_FEASIBILITY, DESTINATIONS, getItineraryForDestination } from './data';
import { LandingPage } from './components/LandingPage';
import { CalibrationQuiz } from './components/CalibrationQuiz';
import { DestinationMatches } from './components/DestinationMatches';
import { Dashboard } from './components/Dashboard';

import { auth } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getUserProfile, saveUserProfile } from './lib/db';
import { AuthScreen } from './components/AuthScreen';
import { SpotifyPortal } from './components/SpotifyPortal';

export default function App() {
  // 1. Core State
  const [screen, setScreen] = useState<'landing' | 'onboarding' | 'matches' | 'dashboard' | 'auth' | 'portal'>('landing');
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<TravelStyleProfile>(INITIAL_PROFILE);
  const [feasibility, setFeasibility] = useState<FeasibilityInputs>(INITIAL_FEASIBILITY);
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryBlock[]>([]);
  const [bookingStatuses, setBookingStatuses] = useState<BookingStatus[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  
  // Theme Toggle State
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('lodestone_theme');
    return saved !== 'light'; // Default to dark blue
  });

  // 2. Firebase Auth Observer & LocalStorage Restore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Load custom calibrated coordinates from Firestore
        try {
          const dbData = await getUserProfile(currentUser.uid);
          if (dbData) {
            setProfile(dbData.profile);
            setFeasibility(dbData.feasibility);
          } else {
            // If they just logged in but have no db profile yet, save local calibrated profile
            await saveUserProfile(currentUser.uid, profile, feasibility);
          }
        } catch (err) {
          console.error("Error restoring user profile from Firestore:", err);
        }
        
        // Restore active destination or screen
        const savedScreen = localStorage.getItem('calibrated_screen');
        if (savedScreen === 'dashboard' || savedScreen === 'matches') {
          const savedActiveDest = localStorage.getItem('calibrated_active_dest');
          if (savedActiveDest) {
            setActiveDestination(JSON.parse(savedActiveDest));
            const savedItinerary = localStorage.getItem('calibrated_itinerary');
            if (savedItinerary) setItinerary(JSON.parse(savedItinerary));
            setScreen(savedScreen as any);
            return;
          }
        }
        setScreen('portal');
      } else {
        const savedProfile = localStorage.getItem('calibrated_profile');
        const savedFeasibility = localStorage.getItem('calibrated_feasibility');
        if (savedProfile) setProfile(JSON.parse(savedProfile));
        if (savedFeasibility) setFeasibility(JSON.parse(savedFeasibility));
        setScreen('landing');
      }
    });

    const savedBookings = localStorage.getItem('calibrated_bookings');
    const savedChats = localStorage.getItem('calibrated_chats');
    const savedIsBooked = localStorage.getItem('calibrated_is_booked');

    if (savedBookings) setBookingStatuses(JSON.parse(savedBookings));
    if (savedChats) setChatMessages(JSON.parse(savedChats));
    if (savedIsBooked) setIsBooked(JSON.parse(savedIsBooked));

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove('light-theme');
      document.body.classList.remove('light-theme');
      localStorage.setItem('lodestone_theme', 'dark');
    } else {
      document.documentElement.classList.add('light-theme');
      document.body.classList.add('light-theme');
      localStorage.setItem('lodestone_theme', 'light');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const saveToStorage = (key: string, val: any) => {
    localStorage.setItem(key, JSON.stringify(val));
  };

  // 3. Navigation/Form Handlers
  const handleSaveUnifiedProfile = (newProfile: TravelStyleProfile, newFeasibility: FeasibilityInputs) => {
    setProfile(newProfile);
    setFeasibility(newFeasibility);
    saveToStorage('calibrated_profile', newProfile);
    saveToStorage('calibrated_feasibility', newFeasibility);
    setScreen('matches');
    localStorage.setItem('calibrated_screen', 'matches');
  };

  const handleAdoptItinerary = (destinationId: string) => {
    const dest = DESTINATIONS.find(d => d.id === destinationId);
    if (!dest) return;

    const adoptedProfile: TravelStyleProfile = {
      socialMode: 'couple',
      budgetTier: dest.averageDailyCost < 150 ? 'backpacker' : dest.averageDailyCost < 300 ? 'boutique' : 'luxury',
      interests: { ...dest.interestMatch },
      pace: dest.idealPace,
      restRatio: dest.idealRestRatio,
      structurePreference: 50,
      accommodation: dest.id === 'kyoto' ? 'boutique_hotel' : dest.id === 'amalfi' ? 'luxury_resort' : 'boutique_hotel',
      rareGems: dest.id === 'kyoto' ? 40 : dest.id === 'patagonia' ? 85 : 60
    };

    const adoptedFeasibility: FeasibilityInputs = {
      nationality: 'United States',
      homeCity: 'New York',
      leaveDays: dest.suggestedDuration,
      budgetLimit: Math.round(dest.averageDailyCost * dest.suggestedDuration + 1500)
    };

    setProfile(adoptedProfile);
    setFeasibility(adoptedFeasibility);
    saveToStorage('calibrated_profile', adoptedProfile);
    saveToStorage('calibrated_feasibility', adoptedFeasibility);

    // Call select destination which loads itinerary, seeds chats, and directs to dashboard
    handleSelectDestinationWithConfig(dest, adoptedFeasibility);
  };

  const handleSelectDestinationWithConfig = (dest: Destination, configFeasibility: FeasibilityInputs) => {
    setActiveDestination(dest);
    saveToStorage('calibrated_active_dest', dest);

    const newItinerary = getItineraryForDestination(dest.id);
    setItinerary(newItinerary);
    saveToStorage('calibrated_itinerary', newItinerary);

    const initialBookings: BookingStatus[] = [
      {
        id: 'flight',
        category: 'flight',
        title: 'Air Transit routing',
        status: 'pending',
        details: `Evaluating flight channels from ${configFeasibility.homeCity} to ${dest.name} airports. Seeking minimal stops.`,
        updatedAt: new Date().toLocaleDateString()
      },
      {
        id: 'stay',
        category: 'stay',
        title: 'Preserved Lodging Status',
        status: 'pending',
        details: `Checking exact room allocations at ${dest.recommendedAccommodation}.`,
        updatedAt: new Date().toLocaleDateString()
      },
      {
        id: 'visa',
        category: 'visa',
        title: 'Visa Clearance Evaluation',
        status: dest.visaRequirements[configFeasibility.nationality]?.type === 'visa-free' ? 'confirmed' : 'pending',
        details: dest.visaRequirements[configFeasibility.nationality]?.type === 'visa-free'
          ? `Passport carries Visa-Free entry for up to ${dest.visaRequirements[configFeasibility.nationality]?.stayDays} days. Pre-approved.`
          : `Requires ${dest.visaRequirements[configFeasibility.nationality]?.type.replace('-', ' ')} validation. Sourcing forms.`,
        updatedAt: new Date().toLocaleDateString()
      }
    ];
    setBookingStatuses(initialBookings);
    saveToStorage('calibrated_bookings', initialBookings);

    const initialChats: ChatMessage[] = [
      {
        id: 'welcome-1',
        sender: 'assistant',
        text: `Greetings from New York! I am Elena, your designated ground travel steward. I’ve finalized our ground registries and loaded your personalized ${dest.name} itinerary layout.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: 'welcome-2',
        sender: 'assistant',
        text: `Take a look at your Day-by-day blocks. You have full agency: toggle any block to 'Automated' and my desk will coordinate the deposits and room reservations, or toggle it 'Manual' if you prefer complete walk-in spontaneity. What do you think of this balance?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setChatMessages(initialChats);
    saveToStorage('calibrated_chats', initialChats);

    setIsBooked(false);
    saveToStorage('calibrated_is_booked', false);

    setScreen('dashboard');
    localStorage.setItem('calibrated_screen', 'dashboard');
  };

  const handleSelectDestination = (dest: Destination) => {
    handleSelectDestinationWithConfig(dest, feasibility);
  };

  // 4. Interactive Itinerary Automation Toggle
  const handleToggleBlockAutomation = (blockId: string) => {
    const updated = itinerary.map(block => {
      if (block.id === blockId) {
        const nextIsAutomated = !block.isAutomated;
        return {
          ...block,
          isAutomated: nextIsAutomated,
          automationStatus: nextIsAutomated ? 'Booking Requested' : 'Manual' as any
        };
      }
      return block;
    });
    setItinerary(updated);
    saveToStorage('calibrated_itinerary', updated);

    // Elena responds reactively to the user toggled event!
    const toggledBlock = itinerary.find(b => b.id === blockId);
    if (toggledBlock) {
      const nextState = !toggledBlock.isAutomated;
      const responseText = nextState 
        ? `I received your toggle request for "${toggledBlock.title}" (Day ${toggledBlock.day}). I've moved this to my desk and am reaching out to our contacts on the ground in ${activeDestination?.name} to secure this slot. I'll update your status tracker below as soon as they confirm availability.`
        : `Understood! I've removed "${toggledBlock.title}" from our booking list. You will have full hands-on control over this slot on your own terms.`;

      setTimeout(() => {
        const systemResponse: ChatMessage = {
          id: `reactive-toggle-${Date.now()}`,
          sender: 'assistant',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => {
          const combined = [...prev, systemResponse];
          saveToStorage('calibrated_chats', combined);
          return combined;
        });
      }, 700);
    }
  };

  // 5. Chat Communication Layer
  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const nextChats = [...chatMessages, userMsg];
    setChatMessages(nextChats);
    saveToStorage('calibrated_chats', nextChats);

    // Schedule realistic human concierge response from Elena
    setTimeout(() => {
      let stewardReply = '';
      const lowercase = text.toLowerCase();

      if (lowercase.includes('flight') || lowercase.includes('transit')) {
        stewardReply = `I am reviewing flight combinations right now. I always bypass budget charter connections to avoid sudden cancellations. Let me know if you prefer carrier departures or if you carry specific points partnerships (like Star Alliance/OneWorld).`;
      } else if (lowercase.includes('hotel') || lowercase.includes('stay') || lowercase.includes('room') || lowercase.includes('machiya')) {
        stewardReply = `GROUND STATUS REPORT: Our contacts at the ${activeDestination?.name} boutique properties confirmed they have openings. I can secure a quiet corner suite away from the main stairs for you. Should I finalize this selection?`;
      } else if (lowercase.includes('visa') || lowercase.includes('passport')) {
        stewardReply = `Understood. For your passport nationality, we handle all submission files directly. If you can provide a clear photograph of your information page, our visa specialist will review details tonight.`;
      } else {
        stewardReply = `I’ve noted your message. I am actively refining our ground connections for your ${activeDestination?.name} trip. Let me know if you want to alter the pace slider or if we should add a private driver option for Day 2.`;
      }

      const stewardMsg: ChatMessage = {
        id: `steward-msg-${Date.now()}`,
        sender: 'assistant',
        text: stewardReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages(prev => {
        const combined = [...prev, stewardMsg];
        saveToStorage('calibrated_chats', combined);
        return combined;
      });
    }, 1000);
  };

  // 6. Confirm & Lock Bookings (Post-Booking Transition)
  const handleConfirmBooking = () => {
    setIsBooked(true);
    saveToStorage('calibrated_is_booked', true);

    // Progress statuses to in_progress or confirmed
    const updatedStatuses = bookingStatuses.map(status => {
      if (status.category === 'visa' && status.status === 'confirmed') return status;
      return {
        ...status,
        status: 'in_progress' as any,
        details: `ground coordinators are processing deposits. Securing rooms and lines.`,
        updatedAt: new Date().toLocaleDateString()
      };
    });
    setBookingStatuses(updatedStatuses);
    saveToStorage('calibrated_bookings', updatedStatuses);

    // Advance automated blocks to Booking Requested or Confirmed
    const updatedItinerary = itinerary.map(b => {
      if (b.isAutomated) {
        return {
          ...b,
          automationStatus: 'Confirmed' as any
        };
      }
      return b;
    });
    setItinerary(updatedItinerary);
    saveToStorage('calibrated_itinerary', updatedItinerary);

    // Elena posts confirmation
    const confirmMessage: ChatMessage = {
      id: `confirm-msg-${Date.now()}`,
      sender: 'assistant',
      text: `TRIP LOCKED & SECURED! I have received your final authorization. I have initiated the deposit transfers for your automated activities and the rooms. I’ve also flagged our ground partners to anticipate your arrival. Check the Concierge Status Tracker on the right to observe details as they settle into confirmed states.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => {
      const combined = [...prev, confirmMessage];
      saveToStorage('calibrated_chats', combined);
      return combined;
    });
  };

  const handleResetTrip = () => {
    setActiveDestination(null);
    setItinerary([]);
    setBookingStatuses([]);
    setChatMessages([]);
    setIsBooked(false);
    setScreen(user ? 'portal' : 'matches');

    localStorage.removeItem('calibrated_active_dest');
    localStorage.removeItem('calibrated_itinerary');
    localStorage.removeItem('calibrated_bookings');
    localStorage.removeItem('calibrated_chats');
    localStorage.removeItem('calibrated_is_booked');
    localStorage.setItem('calibrated_screen', user ? 'portal' : 'matches');
  };

  return (
    <div className="min-h-screen bg-earth-cream selection:bg-earth-terracotta/20 selection:text-earth-terracotta">
      {screen === 'landing' && (
        <LandingPage 
          onStartCalibration={() => setScreen(user ? 'portal' : 'auth')} 
          onAdoptItinerary={(destId) => {
            if (user) {
              handleAdoptItinerary(destId);
            } else {
              setScreen('auth');
            }
          }}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
          onLoginClick={() => setScreen(user ? 'portal' : 'auth')}
          user={user}
        />
      )}

      {screen === 'auth' && (
        <AuthScreen
          onAuthSuccess={(u) => {
            setUser(u);
            setScreen('portal');
          }}
          onBackToLanding={() => setScreen('landing')}
          isDark={isDark}
        />
      )}

      {screen === 'portal' && user && (
        <SpotifyPortal
          user={user}
          currentProfile={profile}
          currentFeasibility={feasibility}
          onUpdateProfile={(p) => {
            setProfile(p);
            saveToStorage('calibrated_profile', p);
          }}
          onUpdateFeasibility={(f) => {
            setFeasibility(f);
            saveToStorage('calibrated_feasibility', f);
          }}
          onPlayItinerary={handleSelectDestination}
          onLogout={async () => {
            await signOut(auth);
            setUser(null);
            setScreen('landing');
          }}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
        />
      )}

      {screen === 'onboarding' && (
        <CalibrationQuiz
          initialProfile={profile}
          initialFeasibility={feasibility}
          onSave={handleSaveUnifiedProfile}
          onBackToLanding={() => setScreen('landing')}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
        />
      )}

      {screen === 'matches' && (
        <DestinationMatches
          profile={profile}
          feasibility={feasibility}
          onSelectDestination={handleSelectDestination}
          onBackToFeasibility={() => {
            setScreen('onboarding');
            localStorage.setItem('calibrated_screen', 'onboarding');
          }}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
        />
      )}

      {screen === 'dashboard' && activeDestination && (
        <Dashboard
          destination={activeDestination}
          itinerary={itinerary}
          profile={profile}
          feasibility={feasibility}
          bookingStatuses={bookingStatuses}
          chatMessages={chatMessages}
          isBooked={isBooked}
          onToggleBlockAutomation={handleToggleBlockAutomation}
          onSendMessage={handleSendMessage}
          onUpdateProfile={(p) => {
            setProfile(p);
            saveToStorage('calibrated_profile', p);
          }}
          onUpdateFeasibility={(f) => {
            setFeasibility(f);
            saveToStorage('calibrated_feasibility', f);
          }}
          onConfirmBooking={handleConfirmBooking}
          onResetTrip={handleResetTrip}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
        />
      )}
    </div>
  );
}
