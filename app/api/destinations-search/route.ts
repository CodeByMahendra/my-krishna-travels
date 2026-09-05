import { NextResponse } from "next/server";

export interface DestinationSuggestion {
  id: string;
  name: string;
  city?: string;
  state?: string;
  country?: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
}

// Curated verified destinations with exact coordinates for instant fallback
const fallbackDestinations: (DestinationSuggestion & { aliases: string[] })[] = [
  {
    id: "mahakaleshwar-temple",
    name: "Mahakaleshwar Jyotirlinga Temple",
    city: "Ujjain",
    state: "Madhya Pradesh",
    country: "India",
    formattedAddress: "Jaisinghpura, Ujjain, Madhya Pradesh, India",
    latitude: 23.1827,
    longitude: 75.7682,
    aliases: ["mahakal", "mahakaleshwar", "mahakaleswar", "ujjain mahakal", "mahakal mandir"],
  },
  {
    id: "mahakal-lok",
    name: "Shri Mahakal Mahalok Corridor",
    city: "Ujjain",
    state: "Madhya Pradesh",
    country: "India",
    formattedAddress: "Near Rudrasagar Lake, Ujjain, Madhya Pradesh, India",
    latitude: 23.1835,
    longitude: 75.7690,
    aliases: ["mahakal lok", "mahakal corridor", "rudrasagar", "ujjain"],
  },
  {
    id: "ujjain-city",
    name: "Ujjain City",
    city: "Ujjain",
    state: "Madhya Pradesh",
    country: "India",
    formattedAddress: "Ujjain District, Madhya Pradesh, India",
    latitude: 23.1765,
    longitude: 75.7885,
    aliases: ["ujjain", "ujain", "avantika"],
  },
  {
    id: "omkareshwar-temple",
    name: "Omkareshwar Jyotirlinga Temple",
    city: "Khandwa",
    state: "Madhya Pradesh",
    country: "India",
    formattedAddress: "Mandhata Island, Narmada River, Khandwa, Madhya Pradesh, India",
    latitude: 22.2464,
    longitude: 76.1517,
    aliases: ["omkareshwar", "omkar", "mamleshwar", "narmada"],
  },
  {
    id: "kashi-vishwanath",
    name: "Kashi Vishwanath Temple",
    city: "Varanasi",
    state: "Uttar Pradesh",
    country: "India",
    formattedAddress: "Vishwanath Gali, Varanasi, Uttar Pradesh, India",
    latitude: 25.3109,
    longitude: 83.0107,
    aliases: ["kashi", "banaras", "benares", "varanasi", "vishwanath"],
  },
  {
    id: "ayodhya-ram-mandir",
    name: "Shri Ram Janmabhoomi Mandir",
    city: "Ayodhya",
    state: "Uttar Pradesh",
    country: "India",
    formattedAddress: "Sai Nagar, Ayodhya, Uttar Pradesh, India",
    latitude: 26.7922,
    longitude: 82.1998,
    aliases: ["ayodhya", "ram mandir", "ram janmabhoomi", "saryu"],
  },
  {
    id: "mathura-vrindavan",
    name: "Mathura & Vrindavan (Banke Bihari)",
    city: "Mathura",
    state: "Uttar Pradesh",
    country: "India",
    formattedAddress: "Vrindavan, Mathura District, Uttar Pradesh, India",
    latitude: 27.5706,
    longitude: 77.6593,
    aliases: ["vrindavan", "mathura", "banke bihari", "prem mandir", "gokul", "barsana"],
  },
  {
    id: "kedarnath",
    name: "Kedarnath Dham Temple",
    city: "Rudraprayag",
    state: "Uttarakhand",
    country: "India",
    formattedAddress: "Garhwal Himalayas, Rudraprayag, Uttarakhand, India",
    latitude: 30.7346,
    longitude: 79.0669,
    aliases: ["kedarnath", "kedar", "chardham"],
  },
  {
    id: "badrinath",
    name: "Badrinath Dham Temple",
    city: "Chamoli",
    state: "Uttarakhand",
    country: "India",
    formattedAddress: "Alaknanda River Valley, Chamoli, Uttarakhand, India",
    latitude: 30.7433,
    longitude: 79.4938,
    aliases: ["badrinath", "badri", "chardham"],
  },
  {
    id: "kashmir-srinagar",
    name: "Srinagar & Dal Lake",
    city: "Srinagar",
    state: "Jammu and Kashmir",
    country: "India",
    formattedAddress: "Kashmir Valley, Jammu and Kashmir, India",
    latitude: 34.0837,
    longitude: 74.7973,
    aliases: ["kashmir", "srinagar", "dal lake", "gulmarg", "pahalgam", "sonamarg"],
  },
  {
    id: "manali-himachal",
    name: "Manali & Solang Valley",
    city: "Kullu",
    state: "Himachal Pradesh",
    country: "India",
    formattedAddress: "Kullu Valley, Himachal Pradesh, India",
    latitude: 32.2432,
    longitude: 77.1892,
    aliases: ["manali", "himachal", "solang", "atal tunnel", "rohtang", "kullu"],
  },
  {
    id: "goa-beaches",
    name: "Goa (North & South Beaches)",
    city: "Panaji",
    state: "Goa",
    country: "India",
    formattedAddress: "Coastal Goa, India",
    latitude: 15.2993,
    longitude: 74.1240,
    aliases: ["goa", "calangute", "baga", "panjim", "anjuna"],
  },
  {
    id: "kerala-alleppey",
    name: "Alleppey & Munnar Backwaters",
    city: "Alappuzha",
    state: "Kerala",
    country: "India",
    formattedAddress: "Backwaters & Hill Station, Kerala, India",
    latitude: 9.4981,
    longitude: 76.3388,
    aliases: ["kerala", "alleppey", "munnar", "alappuzha", "thekkady"],
  },
  {
    id: "rajasthan-jaipur",
    name: "Jaipur & Udaipur",
    city: "Jaipur",
    state: "Rajasthan",
    country: "India",
    formattedAddress: "Rajasthan, India",
    latitude: 26.9124,
    longitude: 75.7873,
    aliases: ["rajasthan", "jaipur", "udaipur", "jodhpur", "jaisalmer"],
  },
  {
    id: "dubai-uae",
    name: "Dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    formattedAddress: "Dubai, United Arab Emirates",
    latitude: 25.2048,
    longitude: 55.2708,
    aliases: ["dubai", "burj khalifa", "uae", "united arab emirates"],
  },
  {
    id: "bali-indonesia",
    name: "Bali (Ubud & Kuta)",
    city: "Denpasar",
    state: "Bali",
    country: "Indonesia",
    formattedAddress: "Bali Island, Indonesia",
    latitude: -8.4095,
    longitude: 115.1889,
    aliases: ["bali", "indonesia", "ubud", "denpasar", "nusa penida"],
  },
  {
    id: "maldives-island",
    name: "Maldives",
    city: "Malé",
    country: "Maldives",
    formattedAddress: "Indian Ocean, Maldives",
    latitude: 4.1755,
    longitude: 73.5093,
    aliases: ["maldives", "male", "atoll"],
  },
];

function searchFallback(query: string): DestinationSuggestion[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  return fallbackDestinations
    .filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(clean);
      const cityMatch = item.city?.toLowerCase().includes(clean);
      const stateMatch = item.state?.toLowerCase().includes(clean);
      const countryMatch = item.country?.toLowerCase().includes(clean);
      const addrMatch = item.formattedAddress.toLowerCase().includes(clean);
      const aliasMatch = item.aliases.some(
        (a) => a.toLowerCase().includes(clean) || clean.includes(a.toLowerCase())
      );
      return nameMatch || cityMatch || stateMatch || countryMatch || addrMatch || aliasMatch;
    })
    .map(({ aliases, ...dest }) => dest)
    .slice(0, 6);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim() || "";

    // Require minimum 2 characters
    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const apiKey = process.env.OPENROUTESERVICE_API_KEY;

    // 1. If OPENROUTESERVICE_API_KEY is available, call OpenRouteService Geocoding Autocomplete
    if (apiKey && apiKey.trim().length > 0) {
      try {
        const url = new URL("https://api.openrouteservice.org/geocode/autocomplete");
        url.searchParams.set("api_key", apiKey.trim());
        url.searchParams.set("text", query);
        url.searchParams.set("size", "8");

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const response = await fetch(url.toString(), {
          signal: controller.signal,
          headers: {
            Accept: "application/json, application/geo+json",
            Authorization: apiKey.trim(),
          },
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const features = Array.isArray(data?.features) ? data.features : [];

          const orsResults: DestinationSuggestion[] = [];
          const seenCoordinates = new Set<string>();

          for (const feat of features) {
            const coords = feat?.geometry?.coordinates; // GeoJSON: [longitude, latitude]
            if (!coords || coords.length < 2) continue;

            const lon = coords[0];
            const lat = coords[1];

            const coordKey = `${lat.toFixed(4)},${lon.toFixed(4)}`;
            if (seenCoordinates.has(coordKey)) continue;
            seenCoordinates.add(coordKey);

            const props = feat?.properties || {};
            const name = props.name || props.label || query;
            const city = props.locality || props.county || props.localadmin || "";
            const state = props.region || props.macroregion || "";
            const country = props.country || "";

            const locationParts = [city, state, country].filter(
              (part) => part && part.toLowerCase() !== name.toLowerCase()
            );
            const subtitle = locationParts.length > 0 ? locationParts.join(", ") : (props.label || "");

            orsResults.push({
              id: props.id || `ors-${orsResults.length}-${Math.random().toString(36).substring(5)}`,
              name,
              city: city || undefined,
              state: state || undefined,
              country: country || undefined,
              formattedAddress: subtitle,
              latitude: lat,
              longitude: lon,
            });
          }

          if (orsResults.length > 0) {
            return NextResponse.json({ results: orsResults });
          }
        } else {
          console.warn(`[OpenRouteService] HTTP ${response.status} from API, checking fallback.`);
        }
      } catch (orsError: any) {
        console.warn("[OpenRouteService] Live fetch error or timeout:", orsError?.message || orsError);
      }
    }

    // 2. Graceful Fallback (if key is missing, or ORS is rate-limited/down, or returned 0 results)
    const fallbackMatches = searchFallback(query);
    return NextResponse.json({
      results: fallbackMatches,
      ...(apiKey ? {} : { notice: "Set OPENROUTESERVICE_API_KEY in .env.local for full global search" }),
    });
  } catch (error: any) {
    console.error("[Destinations Search] Unexpected error:", error);
    return NextResponse.json({ results: [], error: "Search failed gracefully" });
  }
}
