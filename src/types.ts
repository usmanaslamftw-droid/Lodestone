export interface TravelStyleProfile {
  pace: number; // 0 to 100 (Slow & Immersive to Packed & Maximalist)
  restRatio: number; // 0 to 100 (Rest/Nothing to Action-packed)
  socialMode: 'solo' | 'couple' | 'group' | 'locals';
  budgetTier: 'backpacker' | 'boutique' | 'luxury';
  interests: {
    food: number; // 0-100
    nature: number; // 0-100
    culture: number; // 0-100
    nightlife: number; // 0-100
    adventure: number; // 0-100
    wellness: number; // 0-100
  };
  structurePreference: number; // 0 to 100 (Spontaneous & Unstructured to Highly Scheduled)
  accommodation: 'boutique_hotel' | 'social_hostel' | 'luxury_resort' | 'local_guesthouse';
  rareGems?: number; // 0 to 100 (Known Tourist Spots vs Rare Local Gems)
}

export interface FeasibilityInputs {
  nationality: string;
  homeCity: string;
  leaveDays: number;
  budgetLimit: number;
}

export interface VisaRule {
  type: 'visa-free' | 'e-visa' | 'visa-on-arrival' | 'embassy-required';
  stayDays: number;
  cost: number;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  tagline: string;
  description: string;
  narrative: string; // Long magazine-style narrative
  imageUrl: string;
  idealPace: number; // 0-100
  idealRestRatio: number; // 0-100
  interestMatch: {
    food: number;
    nature: number;
    culture: number;
    nightlife: number;
    adventure: number;
    wellness: number;
  };
  visaRequirements: Record<string, VisaRule>; // passport country -> rule
  averageDailyCost: number; // USD per day
  suggestedDuration: number; // days
  recommendedAccommodation: string;
}

export interface ItineraryBlock {
  id: string;
  day: number;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  title: string;
  description: string;
  location: string;
  isAutomated: boolean; // toggle state
  automationStatus: 'Unconfirmed' | 'Booking Requested' | 'Confirmed' | 'Manual';
  bookingDetails?: {
    provider?: string;
    reference?: string;
    price?: string;
    time?: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface BookingStatus {
  id: string;
  category: 'flight' | 'stay' | 'activity' | 'visa';
  title: string;
  status: 'pending' | 'in_progress' | 'confirmed';
  details: string;
  updatedAt: string;
}

export interface Trip {
  id: string;
  destinationId: string;
  destinationName: string;
  country: string;
  imageUrl: string;
  startDate: string;
  duration: number;
  itinerary: ItineraryBlock[];
  bookingStatuses: BookingStatus[];
  isBooked: boolean;
}
