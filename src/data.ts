import { Destination, ItineraryBlock, TravelStyleProfile } from './types';

export const NATIONALITIES = [
  'United States',
  'United Kingdom',
  'Singapore',
  'India',
  'Germany',
  'Australia',
  'Canada'
];

export const INTERESTS_LIST = [
  { id: 'food', label: 'Culinary & Dining', icon: 'Utensils' },
  { id: 'nature', label: 'Nature & Landscapes', icon: 'Trees' },
  { id: 'culture', label: 'History & Arts', icon: 'Milestone' },
  { id: 'nightlife', label: 'Local Vibe & Socials', icon: 'Sparkles' },
  { id: 'adventure', label: 'Active Sports & Hiking', icon: 'Compass' },
  { id: 'wellness', label: 'Slow Pace & Restorative', icon: 'Heart' }
];

export const ACCOMMODATIONS_LIST = [
  { id: 'boutique_hotel', label: 'Curation-led Boutique Hotels', desc: 'Independently owned, design-forward, deeply integrated into the neighborhood.' },
  { id: 'social_hostel', label: 'Design-Forward Hostels', desc: 'Private rooms with vibrant, shared social structures and local events.' },
  { id: 'luxury_resort', label: 'Historic Luxury & Estate Stays', desc: 'Immersive properties prioritizing space, heritage, and quiet grandeur.' },
  { id: 'local_guesthouse', label: 'Heritage Homestays & Farm Stays', desc: 'Direct, warm hosting by local families or agricultural stewards.' }
];

export const SOCIAL_MODES_LIST = [
  { id: 'solo', label: 'Solo Wanderer', desc: 'Total agency over your days, structured for introspection.' },
  { id: 'couple', label: 'Shared Quietude', desc: 'Calibrated for intimate connection, shared tables, and slow moments.' },
  { id: 'group', label: 'Collective Spirit', desc: 'Social energy, larger quarters, and flexible shared pathways.' },
  { id: 'locals', label: 'Locally Anchored', desc: 'Deep interaction with community stewards, artisans, and guides.' }
];

// Curated destinations with rich editorial text, real metrics, and visa rules
export const DESTINATIONS: Destination[] = [
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    tagline: 'The quiet pause of ancient wooden temples, stone gardens, and culinary dedication.',
    description: 'A sanctuary of cultural refinement where historic temples exist in perfect conversation with seasonal nature.',
    narrative: `Kyoto isn’t a city of loud attractions; it is a repository of details. It demands that you slow down and adjust your frequency. In the preserved streets of Higashiyama, the scent of cedar wood and incense hangs heavy in the morning mist. This is the Japan of tatami mats, moss-grown stone basins, and centuries-old culinary lineages. Our partners in Kyoto are local masters—from multi-generational tea families who guide you through privately owned, non-public tea rooms, to Zen monks who open temple doors before sunrise. If you seek deep aesthetic contemplation, slow dawn walks, and masterfully quiet service, Kyoto matches your frequency.`,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200',
    idealPace: 40, // Medium-Slow
    idealRestRatio: 50, // Moderate rest
    interestMatch: {
      food: 90,
      nature: 70,
      culture: 95,
      nightlife: 25,
      adventure: 45,
      wellness: 80
    },
    averageDailyCost: 220,
    suggestedDuration: 6,
    recommendedAccommodation: 'A preserved wooden Machiya (townhouse) with a private interior moss garden, or an elegant riverside ryokan.',
    visaRequirements: {
      'United States': { type: 'visa-free', stayDays: 90, cost: 0 },
      'United Kingdom': { type: 'visa-free', stayDays: 90, cost: 0 },
      'Singapore': { type: 'visa-free', stayDays: 90, cost: 0 },
      'Germany': { type: 'visa-free', stayDays: 90, cost: 0 },
      'Australia': { type: 'visa-free', stayDays: 90, cost: 0 },
      'Canada': { type: 'visa-free', stayDays: 90, cost: 0 },
      'India': { type: 'e-visa', stayDays: 90, cost: 25 }
    }
  },
  {
    id: 'amalfi',
    name: 'Amalfi Coast',
    country: 'Italy',
    tagline: 'Terraced lemon orchards cascading down sheer cliffs to meet a cobalt Tyrrhenian sea.',
    description: 'An iconic marine landscape defined by sensory leisure, sun-baked terracotta plazas, and coastal heritage.',
    narrative: `The Amalfi Coast exists in the high registry of romantic travel, but the key is experiencing it away from the crowd-corrupted main transits. To understand Amalfi, one must stay in the quieter nodes—like Ravello, suspended hundreds of meters above the sea amidst the scent of umbrella pines, or Praiano, where fishermen still pull wooden boats onto the shingle at twilight. Our calibrated itineraries avoid generic coach tours, instead offering private classic wooden gozzo boats to secluded coves and introducing you to family-run lemon farms that have shaped the terraced cliffs for four generations.`,
    imageUrl: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=1200',
    idealPace: 25, // Very Slow & Immersive
    idealRestRatio: 80, // High Rest
    interestMatch: {
      food: 95,
      nature: 80,
      culture: 85,
      nightlife: 40,
      adventure: 30,
      wellness: 85
    },
    averageDailyCost: 380,
    suggestedDuration: 7,
    recommendedAccommodation: 'A former 13th-century monastery perched high on the Ravello cliffside, offering sweeping marine vistas.',
    visaRequirements: {
      'United States': { type: 'visa-free', stayDays: 90, cost: 0 },
      'United Kingdom': { type: 'visa-free', stayDays: 90, cost: 0 },
      'Singapore': { type: 'visa-free', stayDays: 90, cost: 0 },
      'Germany': { type: 'visa-free', stayDays: 90, cost: 0 },
      'Australia': { type: 'visa-free', stayDays: 90, cost: 0 },
      'Canada': { type: 'visa-free', stayDays: 90, cost: 0 },
      'India': { type: 'embassy-required', stayDays: 90, cost: 85 }
    }
  },
  {
    id: 'oaxaca',
    name: 'Oaxaca de Juárez',
    country: 'Mexico',
    tagline: 'The culinary heartbeat of Mesoamerica, shaped by clay-shaping hands and smoky agave.',
    description: 'An artistic bastion where pre-Hispanic cultures, vibrant contemporary galleries, and complex moles converge.',
    narrative: `Oaxaca is a feast of texture and deep flavor. In the courtyards of colonial stone townhouses, weavers from Teotitlán del Valle share stories of organic cochineal dye, while in open-air markets, the steam rises from cauldrons of black mole that take weeks to mature. This is a place that celebrates slow, handmade heritage. Rather than superficial walking tours, we calibrate your days to connect you with traditional mezcaleros in the dry valleys and indigenous ceramic artists in remote villages. It is an exploration that is deeply respectful, highly tactile, and culinary-forward.`,
    imageUrl: 'https://images.unsplash.com/photo-1512813583145-baaa340ef29f?q=80&w=1200',
    idealPace: 50, // Balanced Pace
    idealRestRatio: 40, // Active days interspersed
    interestMatch: {
      food: 100,
      nature: 60,
      culture: 98,
      nightlife: 65,
      adventure: 50,
      wellness: 70
    },
    averageDailyCost: 110,
    suggestedDuration: 5,
    recommendedAccommodation: 'A courtyard-style colonial boutique hotel restored with raw Oaxacan textiles and exposed limestone.',
    visaRequirements: {
      'United States': { type: 'visa-free', stayDays: 180, cost: 0 },
      'United Kingdom': { type: 'visa-free', stayDays: 180, cost: 0 },
      'Singapore': { type: 'visa-free', stayDays: 180, cost: 0 },
      'Germany': { type: 'visa-free', stayDays: 180, cost: 0 },
      'Australia': { type: 'visa-free', stayDays: 180, cost: 0 },
      'Canada': { type: 'visa-free', stayDays: 180, cost: 0 },
      'India': { type: 'embassy-required', stayDays: 180, cost: 40 }
    }
  },
  {
    id: 'patagonia',
    name: 'Patagonia Wilderness',
    country: 'Argentina & Chile',
    tagline: 'The edge of the habitable earth—windswept glacial peaks, deep blue lakes, and wild steppes.',
    description: 'An active, raw immersion into some of the most dramatic geological formations and wilderness on the planet.',
    narrative: `For those whose pulse quickens with the rustle of dry tundra wind and the sight of granite towers rising above ice fields, Patagonia is the ultimate coordinates. In the shadows of the Fitz Roy range or the horns of Torres del Paine, the sheer scale of the landscape humbles every traveler. We design this for the active explorer, utilizing a network of private wilderness lodges that serve as comfortable base camps after high-endurance trail days. Our local partners are mountain guides who understand weather shifts like the back of their hands and can safely steer you to remote vistas untouched by tourist crowds.`,
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200',
    idealPace: 85, // Packed & Active
    idealRestRatio: 20, // Low Rest
    interestMatch: {
      food: 60,
      nature: 100,
      culture: 50,
      nightlife: 15,
      adventure: 100,
      wellness: 40
    },
    averageDailyCost: 280,
    suggestedDuration: 8,
    recommendedAccommodation: 'An eco-dome structure nestled at the base of the mountains, featuring warm timbers and panoramic glass windows looking at the peaks.',
    visaRequirements: {
      'United States': { type: 'visa-free', stayDays: 90, cost: 0 },
      'United Kingdom': { type: 'visa-free', stayDays: 90, cost: 0 },
      'Singapore': { type: 'visa-free', stayDays: 90, cost: 0 },
      'Germany': { type: 'visa-free', stayDays: 90, cost: 0 },
      'Australia': { type: 'visa-free', stayDays: 90, cost: 0 },
      'Canada': { type: 'visa-free', stayDays: 90, cost: 0 },
      'India': { type: 'e-visa', stayDays: 90, cost: 50 }
    }
  },
  {
    id: 'bali',
    name: 'Ubud & Outer Bali',
    country: 'Indonesia',
    tagline: 'The restorative rhythm of emerald rice terraces, forest hot springs, and spiritual crafts.',
    description: 'A deeply wellness-centered haven surrounded by active volcanic peaks, quiet temples, and community rituals.',
    narrative: `Bali is often marketed as a generic beach destination, but its spiritual and restorative soul resides in the interior highlands and the quiet coastal hamlets of the north. Around Ubud, the morning light filters through coconut palms to illuminate dew-soaked rice fields. The culture is a daily, living weave of floral offerings, stone carving, and temple festivals. Our network of wellness practitioners, traditional healers, and master carvers allows you to step inside this heritage with genuine reverence. It is calibrated for those who need a nervous-system reset, physical renewal, and a connection to ancient communal rhythms.`,
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200',
    idealPace: 30, // Slow
    idealRestRatio: 75, // High Rest
    interestMatch: {
      food: 80,
      nature: 88,
      culture: 90,
      nightlife: 45,
      adventure: 55,
      wellness: 98
    },
    averageDailyCost: 85,
    suggestedDuration: 8,
    recommendedAccommodation: 'A private forest villa perched above the Ayung River valley, styled with local bamboo architecture.',
    visaRequirements: {
      'United States': { type: 'visa-on-arrival', stayDays: 30, cost: 35 },
      'United Kingdom': { type: 'visa-on-arrival', stayDays: 30, cost: 35 },
      'Singapore': { type: 'visa-free', stayDays: 30, cost: 0 },
      'Germany': { type: 'visa-on-arrival', stayDays: 30, cost: 35 },
      'Australia': { type: 'visa-on-arrival', stayDays: 30, cost: 35 },
      'Canada': { type: 'visa-on-arrival', stayDays: 30, cost: 35 },
      'India': { type: 'visa-on-arrival', stayDays: 30, cost: 35 }
    }
  },
  {
    id: 'reykjavik',
    name: 'Iceland South Coast',
    country: 'Iceland',
    tagline: 'Cascading waterfalls, obsidian-black beaches, and thermal lagoons under dancing skies.',
    description: 'A striking, hyper-scenic exploration of primal volcanic energy, glaciers, and clean Nordic aesthetics.',
    narrative: `Iceland is a land of visceral, cinematic contrast—where black sands meet white surf, and volcanic heat bubbles beneath glacier sheets. Reykjavik, the creative capital, serves as a cozy, design-led gateway. We construct your loop along the South Coast to include secret geothermal hot springs hidden in moss valleys, private super-jeep tours to glacier tongues, and twilight waits for the aurora borealis. This is designed for travelers who appreciate high-end Scandinavian design, architectural hospitality, and raw, active wilderness days.`,
    imageUrl: 'https://images.unsplash.com/photo-1504893524553-ac55fce698be?q=80&w=1200',
    idealPace: 70, // Active
    idealRestRatio: 35, // Medium-Low Rest
    interestMatch: {
      food: 75,
      nature: 100,
      culture: 80,
      nightlife: 55,
      adventure: 90,
      wellness: 75
    },
    averageDailyCost: 320,
    suggestedDuration: 6,
    recommendedAccommodation: 'A minimalist architectural lodge surrounded by lava fields, with floor-to-ceiling glass stargazing panels.',
    visaRequirements: {
      'United States': { type: 'visa-free', stayDays: 90, cost: 0 },
      'United Kingdom': { type: 'visa-free', stayDays: 90, cost: 0 },
      'Singapore': { type: 'visa-free', stayDays: 90, cost: 0 },
      'Germany': { type: 'visa-free', stayDays: 90, cost: 0 },
      'Australia': { type: 'visa-free', stayDays: 90, cost: 0 },
      'Canada': { type: 'visa-free', stayDays: 90, cost: 0 },
      'India': { type: 'embassy-required', stayDays: 90, cost: 85 }
    }
  }
];

// Generate default itineraries for destinations
export const getItineraryForDestination = (destId: string): ItineraryBlock[] => {
  const commonBlocks: Record<string, Omit<ItineraryBlock, 'id'>[]> = {
    kyoto: [
      {
        day: 1,
        timeOfDay: 'morning',
        title: 'Arrival & Preserved Alleyways Walk',
        description: 'Check in to your preserved Machiya. Settle into the rhythmic silence. At twilight, a quiet walk through the cobblestone alleys of Gion with our neighborhood historian to discuss Machiya architecture.',
        location: 'Higashiyama & Gion',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'Calibrated Machiya Collection', reference: 'KTO-9201-MC', price: '$240/night', time: '14:00' }
      },
      {
        day: 1,
        timeOfDay: 'evening',
        title: 'Introductions over Obanzai Dining',
        description: 'Savor traditional multi-dish Kyoto Obanzai in a 140-year-old wooden house, highlighting seasonal local heirloom vegetables.',
        location: 'Kamogawa River District',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'Suzu Obanzai Dining', reference: 'RES-88301', price: '$75/person', time: '19:00' }
      },
      {
        day: 2,
        timeOfDay: 'morning',
        title: 'Zen Meditation & Moss Garden Access',
        description: 'Early morning private entry to an active Zen sub-temple. Join the resident monk for a session of Zazen meditation, followed by green tea overlooking an ancient moss garden.',
        location: 'Daitoku-ji Complex',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'Daitoku-ji temple guides', reference: 'EXP-1033', price: '$120', time: '07:30' }
      },
      {
        day: 2,
        timeOfDay: 'afternoon',
        title: 'Heirloom Tea Calibration',
        description: 'A private tea tasting curated by a 5th-generation tea blender. Learn to perceive variables of water temperature, clay vessel shapes, and shade-growing durations.',
        location: 'Uji-aligned Tea Salon',
        isAutomated: false,
        automationStatus: 'Manual'
      },
      {
        day: 3,
        timeOfDay: 'morning',
        title: 'Bamboo Forest Early Path',
        description: 'Wander the Arashiyama bamboo forest at sunrise, hours before general visitors arrive. Listen to the wind through the tall hollow stalks.',
        location: 'Arashiyama',
        isAutomated: false,
        automationStatus: 'Manual'
      },
      {
        day: 3,
        timeOfDay: 'afternoon',
        title: 'Private Woodblock Printing Studio',
        description: 'Visit the studio of Kyoto’s last traditional woodblock carvers. Learn the precision hand-cutting process and try printing your own sheet on mulberry paper.',
        location: 'Teramachi Workshop',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'Teramachi Master Workshop', reference: 'ART-9940', price: '$110', time: '14:30' }
      }
    ],
    amalfi: [
      {
        day: 1,
        timeOfDay: 'morning',
        title: 'Arrival & Ravello Suspenders',
        description: 'Arrive at your clifftop sanctuary. Breath in the scent of coastal lemon tree wood and the Tyrrhenian sea.',
        location: 'Ravello Heights',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'Monastero San Giovanni Lodge', reference: 'AMF-381-MS', price: '$420/night', time: '15:00' }
      },
      {
        day: 1,
        timeOfDay: 'evening',
        title: 'Terrace Dining in the Clouds',
        description: 'Taste hand-rolled scialatielli pasta tossed with fresh clams and salted lemons, framed by panoramic coastal views.',
        location: 'Cumpà Cosimo Terrace',
        isAutomated: false,
        automationStatus: 'Manual'
      },
      {
        day: 2,
        timeOfDay: 'morning',
        title: 'Lemon Terraces Historic Path',
        description: 'Walk through the ancient lemon groves of the Valle dei Mulini with Salvatore, whose family has farmed these vertical stone walls since the 1880s.',
        location: 'Minori & Maiori Terraces',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'Salvatore Lemon Farm Estates', reference: 'EXP-Lemon-01', price: '$85', time: '09:00' }
      },
      {
        day: 2,
        timeOfDay: 'afternoon',
        title: 'Private Wooden Gozzo Marine Explorer',
        description: 'Board a custom classic Italian wooden motor boat. Cruise along dramatic cliff structures, anchoring in hidden marine caverns for deep ocean swims.',
        location: 'Praiano Marine Front',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'Amalfi Marine Charters', reference: 'BOAT-8811', price: '$450', time: '14:00' }
      },
      {
        day: 3,
        timeOfDay: 'morning',
        title: 'Path of the Gods (Spontaneous Walk)',
        description: 'Savour a light espresso and hike the spectacular high-ridge trail connecting Bomerano to Nocelle. Totally self-paced, spectacular high vistas.',
        location: 'Sentiero degli Dei',
        isAutomated: false,
        automationStatus: 'Manual'
      }
    ],
    oaxaca: [
      {
        day: 1,
        timeOfDay: 'morning',
        title: 'Arrival & Historic Barrio Walk',
        description: 'Check into your restored colonial house. Settle in and join our textile historian for a walk through the quiet quarters of Barrio de Jalatlaco.',
        location: 'Jalatlaco Quarter',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'Hotel Casa de las Flores', reference: 'OAX-109-CF', price: '$130/night', time: '15:00' }
      },
      {
        day: 1,
        timeOfDay: 'evening',
        title: 'Introductory Ancestral Cooking',
        description: 'Enjoy a custom multi-course mole tasting menu that showcases the pre-Hispanic culinary roots of the region.',
        location: 'Alfonsina Kitchen',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'Alfonsina Ancestral Tasting', reference: 'RES-OAX-991', price: '$65', time: '19:30' }
      },
      {
        day: 2,
        timeOfDay: 'morning',
        title: 'Artisan Clay Modeling Workshop',
        description: 'Visit a traditional family pottery studio in San Bartolo Coyotepec to learn the secrets of working with unique local black clay, shaping pieces entirely by hand.',
        location: 'San Bartolo Coyotepec',
        isAutomated: false,
        automationStatus: 'Manual'
      },
      {
        day: 2,
        timeOfDay: 'afternoon',
        title: 'Traditional Mezcal Palenque Immersion',
        description: 'Travel into the dry valley of Santiago Matatlán to visit a small-batch organic mezcal palenque. Taste distillations from rare, wild agaves crushed by stone wheels.',
        location: 'Santiago Matatlán Valleys',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'Palenque de Don Mateo', reference: 'EXP-MEZ-48', price: '$90', time: '14:00' }
      }
    ],
    patagonia: [
      {
        day: 1,
        timeOfDay: 'morning',
        title: 'Arrival & Steppe Briefing',
        description: 'Check in to your warm timber lodge with expansive mountain views. Join your mountain safety lead for a weather briefing and equipment fit.',
        location: 'El Chaltén Valleys',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'Patagonia Wilderness Eco-Lodge', reference: 'PAT-009-WL', price: '$310/night', time: '14:00' }
      },
      {
        day: 1,
        timeOfDay: 'afternoon',
        title: 'Laguna Capri Trail Check',
        description: 'A moderate introductory trek through pristine southern beech forests to Laguna Capri. Sweeping previews of Mount Fitz Roy’s jagged peaks.',
        location: 'Los Glaciares National Park',
        isAutomated: false,
        automationStatus: 'Manual'
      },
      {
        day: 2,
        timeOfDay: 'morning',
        title: 'Fitz Roy Base High-Endurance Expedition',
        description: 'A challenging, guided hike up to Laguna de los Tres. Touch glacial meltwater at the direct base of Mount Fitz Roy’s vertical granite walls.',
        location: 'Mount Fitz Roy Base',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'Los Glaciares Mountain Guiding', reference: 'EXP-MNT-91', price: '$150', time: '06:00' }
      },
      {
        day: 3,
        timeOfDay: 'morning',
        title: 'Viedma Ice Field Kayaking & Crampon Walk',
        description: 'Navigate blue ice structures in heavy expeditions kayaks, then step onto the glacier ice sheet with specialized crampons for a walk across glacial crevasses.',
        location: 'Viedma Glacier Face',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'Viedma Glacier Expeditions', reference: 'ICE-3301', price: '$260', time: '08:00' }
      }
    ],
    bali: [
      {
        day: 1,
        timeOfDay: 'morning',
        title: 'Arrival & Riverside Welcome',
        description: 'Check in to your beautiful river-facing bamboo suite. Listen to the flowing water below and breathe in the rich, tropical air.',
        location: 'Ayung River Valley',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'Serene River Bamboo Retreat', reference: 'BAL-882-BR', price: '$180/night', time: '14:00' }
      },
      {
        day: 1,
        timeOfDay: 'evening',
        title: 'Quiet Blessing Ritual',
        description: 'Join local priest Pak Mangku for a quiet, respectful cleansing ritual at a secluded forest water temple.',
        location: 'Sebatu Sacred Pools',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'Sebatu Sanctuary Guides', reference: 'EXP-BAL-42', price: '$50', time: '17:00' }
      },
      {
        day: 2,
        timeOfDay: 'morning',
        title: 'Tegallalang Slow Terraces & Farm Tea',
        description: 'Walk through deep emerald rice terraces at sunrise. Enjoy a cup of freshly brewed herbal tea made from morning-harvested ginger and lemongrass.',
        location: 'Tegallalang Estates',
        isAutomated: false,
        automationStatus: 'Manual'
      },
      {
        day: 2,
        timeOfDay: 'afternoon',
        title: 'Traditional Bamboo Carpentry Masterclass',
        description: 'Visit the studio of master bamboo builders. Learn how raw structural poles are harvested, cured, and bent into sculptural organic architecture.',
        location: 'Sibang Master Workshops',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'Sibang Crafts Collective', reference: 'ART-BAL-202', price: '$95', time: '13:30' }
      }
    ],
    reykjavik: [
      {
        day: 1,
        timeOfDay: 'morning',
        title: 'Arrival & Volcanic Field Transfer',
        description: 'Arrive in Iceland, pick up your winter-equipped 4x4, and drive through the steam-vented lava fields to your minimalist architectural lodge.',
        location: 'Reykjanes Lava Fields',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'Lava Ridge Glass Lodge', reference: 'ICE-901-GL', price: '$350/night', time: '15:00' }
      },
      {
        day: 1,
        timeOfDay: 'evening',
        title: 'Volcanic Cinders Soak',
        description: 'Soak in the mineral-rich geothermal silica waters of a private, quiet lagoon away from tourist paths, watching the northern sky.',
        location: 'Grindavík Quiet Lagoons',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'Lava Lagoons Spa', reference: 'SPA-8830', price: '$90', time: '19:00' }
      },
      {
        day: 2,
        timeOfDay: 'morning',
        title: 'Black Sand Basalt Exploration',
        description: 'Drive along the black ash plains of Reynisfjara. Observe the hexagonal rock columns and towering basalt stacks in the churning Atlantic.',
        location: 'Reynisfjara Marine Front',
        isAutomated: false,
        automationStatus: 'Manual'
      },
      {
        day: 2,
        timeOfDay: 'afternoon',
        title: 'Private Super-Jeep Glacier Crawl',
        description: 'Board a custom expedition super-jeep to scale the active slopes of Katla volcano and explore a private ice cave sculpted by glacial rivers.',
        location: 'Mýrdalsjökull Glacier Face',
        isAutomated: true,
        automationStatus: 'Confirmed',
        bookingDetails: { provider: 'South Coast Glacier Guides', reference: 'EXP-ICE-48', price: '$220', time: '13:00' }
      }
    ]
  };

  const blocks = commonBlocks[destId] || [];
  return blocks.map((b, i) => ({
    ...b,
    id: `${destId}-block-${i + 1}`
  })) as ItineraryBlock[];
};

export const INITIAL_PROFILE: TravelStyleProfile = {
  pace: 35,
  restRatio: 60,
  socialMode: 'couple',
  budgetTier: 'boutique',
  interests: {
    food: 80,
    nature: 70,
    culture: 90,
    nightlife: 30,
    adventure: 40,
    wellness: 75
  },
  structurePreference: 45,
  accommodation: 'boutique_hotel',
  rareGems: 50
};

export const INITIAL_FEASIBILITY = {
  nationality: 'United States',
  homeCity: 'New York',
  leaveDays: 10,
  budgetLimit: 4000
};

// Simple but real matching engine that computes compatibility scores
export const computeDestinationMatches = (
  profile: TravelStyleProfile,
  feasibility: { nationality: string; leaveDays: number; budgetLimit: number }
) => {
  return DESTINATIONS.map(dest => {
    // 1. Feasibility analysis
    const visaInfo = dest.visaRequirements[feasibility.nationality] || { type: 'embassy-required', stayDays: 30, cost: 100 };
    
    // Duration feasibility (is suggested duration within leave days?)
    const durationScore = feasibility.leaveDays >= dest.suggestedDuration ? 100 : Math.max(0, 100 - (dest.suggestedDuration - feasibility.leaveDays) * 20);
    
    // Budget feasibility (is daily cost * duration + visa cost within budget limit?)
    const totalEstCost = (dest.averageDailyCost * dest.suggestedDuration) + visaInfo.cost + 600; // adding $600 estimated base flight proxy
    const budgetScore = feasibility.budgetLimit >= totalEstCost ? 100 : Math.max(0, 100 - ((totalEstCost - feasibility.budgetLimit) / totalEstCost) * 150);
    
    // 2. Profile alignment calculation
    const paceDiff = Math.abs(profile.pace - dest.idealPace);
    const paceScore = 100 - paceDiff;
    
    const restDiff = Math.abs(profile.restRatio - dest.idealRestRatio);
    const restScore = 100 - restDiff;

    // Interest alignment: Dot product of interests normalized
    let interestSum = 0;
    let interestCount = 0;
    Object.keys(profile.interests).forEach(key => {
      const uInterest = profile.interests[key as keyof typeof profile.interests];
      const dInterest = dest.interestMatch[key as keyof typeof dest.interestMatch];
      // compute distance
      interestSum += (100 - Math.abs(uInterest - dInterest));
      interestCount++;
    });
    const interestScore = interestSum / interestCount;

    // Total calibrated match percentage
    const profileMatchScore = (paceScore * 0.25) + (restScore * 0.25) + (interestScore * 0.50);
    const feasibilityPenalty = ((100 - durationScore) * 0.4) + ((100 - budgetScore) * 0.6);
    const overallScore = Math.round(Math.max(0, Math.min(100, profileMatchScore - (feasibilityPenalty * 0.3))));

    return {
      destination: dest,
      overallScore,
      profileMatchScore: Math.round(profileMatchScore),
      feasibility: {
        totalEstCost: Math.round(totalEstCost),
        durationFits: feasibility.leaveDays >= dest.suggestedDuration,
        budgetFits: feasibility.budgetLimit >= totalEstCost,
        visaRule: visaInfo,
        durationScore,
        budgetScore
      }
    };
  }).sort((a, b) => b.overallScore - a.overallScore);
};
