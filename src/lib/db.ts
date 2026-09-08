import { db, doc, setDoc, getDoc, collection, getDocs, query, where } from './firebase';
import { TravelStyleProfile, FeasibilityInputs, ItineraryBlock, Destination } from '../types';

export interface UserProfileData {
  profile: TravelStyleProfile;
  feasibility: FeasibilityInputs;
  updatedAt: string;
}

export interface SavedItinerary {
  id: string;
  userId: string;
  destination: Destination;
  itinerary: ItineraryBlock[];
  createdAt: string;
}

export interface LikedSpot {
  id: string;
  userId: string;
  title: string;
  location: string;
  description: string;
  category: string;
  imageUrl?: string;
  createdAt: string;
}

// User Profile Operations
function getLocalProfile(uid: string): UserProfileData | null {
  try {
    const data = localStorage.getItem(`calibrated_db_profile_${uid}`);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function setLocalProfile(uid: string, data: UserProfileData): void {
  try {
    localStorage.setItem(`calibrated_db_profile_${uid}`, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
}

function getLocalItineraries(uid: string): SavedItinerary[] {
  try {
    const data = localStorage.getItem(`calibrated_db_itineraries_${uid}`);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setLocalItineraries(uid: string, list: SavedItinerary[]): void {
  try {
    localStorage.setItem(`calibrated_db_itineraries_${uid}`, JSON.stringify(list));
  } catch (err) {
    console.error(err);
  }
}

function getLocalLikedSpots(uid: string): LikedSpot[] {
  try {
    const data = localStorage.getItem(`calibrated_db_liked_spots_${uid}`);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setLocalLikedSpots(uid: string, list: LikedSpot[]): void {
  try {
    localStorage.setItem(`calibrated_db_liked_spots_${uid}`, JSON.stringify(list));
  } catch (err) {
    console.error(err);
  }
}

export async function saveUserProfile(uid: string, profile: TravelStyleProfile, feasibility: FeasibilityInputs): Promise<void> {
  const profileData: UserProfileData = {
    profile,
    feasibility,
    updatedAt: new Date().toISOString()
  };
  
  // Always save locally first as a backup
  setLocalProfile(uid, profileData);

  if (uid.startsWith('offline_')) {
    return;
  }

  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, profileData, { merge: true });
  } catch (err) {
    console.warn("Firestore saveUserProfile failed, falling back to localStorage:", err);
  }
}

export async function getUserProfile(uid: string): Promise<UserProfileData | null> {
  if (uid.startsWith('offline_')) {
    return getLocalProfile(uid);
  }

  try {
    const userRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as UserProfileData;
      setLocalProfile(uid, data);
      return data;
    }
  } catch (err) {
    console.warn("Firestore getUserProfile failed, falling back to localStorage:", err);
  }
  return getLocalProfile(uid);
}

// Curated Saved Itineraries
export async function saveUserItinerary(uid: string, destination: Destination, itinerary: ItineraryBlock[]): Promise<string> {
  const itineraryId = `${uid}_${destination.id}_${Date.now()}`;
  const newItinerary: SavedItinerary = {
    id: itineraryId,
    userId: uid,
    destination,
    itinerary,
    createdAt: new Date().toISOString()
  };

  // Add to local backup
  const currentLocal = getLocalItineraries(uid);
  setLocalItineraries(uid, [newItinerary, ...currentLocal]);

  if (uid.startsWith('offline_')) {
    return itineraryId;
  }

  try {
    const itineraryRef = doc(db, 'itineraries', itineraryId);
    await setDoc(itineraryRef, newItinerary);
  } catch (err) {
    console.warn("Firestore saveUserItinerary failed, falling back to localStorage:", err);
  }

  return itineraryId;
}

export async function getUserItineraries(uid: string): Promise<SavedItinerary[]> {
  if (uid.startsWith('offline_')) {
    return getLocalItineraries(uid);
  }

  try {
    const itinerariesCol = collection(db, 'itineraries');
    const q = query(itinerariesCol, where('userId', '==', uid));
    const querySnapshot = await getDocs(q);
    
    const results: SavedItinerary[] = [];
    querySnapshot.forEach((doc) => {
      results.push(doc.data() as SavedItinerary);
    });
    
    const sorted = results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setLocalItineraries(uid, sorted);
    return sorted;
  } catch (err) {
    console.warn("Firestore getUserItineraries failed, falling back to localStorage:", err);
    return getLocalItineraries(uid);
  }
}

// Liked Spots Operations
export async function likeSpot(uid: string, spot: Omit<LikedSpot, 'userId' | 'createdAt'>): Promise<void> {
  const newLiked: LikedSpot = {
    ...spot,
    userId: uid,
    createdAt: new Date().toISOString()
  };

  const currentLocal = getLocalLikedSpots(uid);
  if (!currentLocal.some(s => s.id === spot.id)) {
    setLocalLikedSpots(uid, [...currentLocal, newLiked]);
  }

  if (uid.startsWith('offline_')) {
    return;
  }

  try {
    const spotRef = doc(db, 'users', uid, 'likedSpots', spot.id);
    await setDoc(spotRef, newLiked);
  } catch (err) {
    console.warn("Firestore likeSpot failed, falling back to localStorage:", err);
  }
}

export async function unlikeSpot(uid: string, spotId: string): Promise<void> {
  const currentLocal = getLocalLikedSpots(uid);
  setLocalLikedSpots(uid, currentLocal.filter(s => s.id !== spotId));

  if (uid.startsWith('offline_')) {
    return;
  }

  try {
    const spotRef = doc(db, 'users', uid, 'likedSpots', spotId);
    await setDoc(spotRef, { deleted: true }, { merge: true });
  } catch (err) {
    console.warn("Firestore unlikeSpot failed, falling back to localStorage:", err);
  }
}

export async function getLikedSpots(uid: string): Promise<LikedSpot[]> {
  if (uid.startsWith('offline_')) {
    return getLocalLikedSpots(uid);
  }

  try {
    const spotsCol = collection(db, 'users', uid, 'likedSpots');
    const querySnapshot = await getDocs(spotsCol);
    const results: LikedSpot[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (!data.deleted) {
        results.push(data as LikedSpot);
      }
    });
    setLocalLikedSpots(uid, results);
    return results;
  } catch (err) {
    console.warn("Firestore getLikedSpots failed, falling back to localStorage:", err);
    return getLocalLikedSpots(uid);
  }
}
