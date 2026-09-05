import { NextResponse } from "next/server";
import { searchLocalDestinations, DestinationItem } from "@/data/destinationsSearchData";

export interface SearchResultItem {
  id: string;
  name: string;
  displayName: string;
  category: "City" | "State" | "Country" | "Region" | "Place";
  country: string;
  state?: string;
  tag?: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() || "";

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  // 1. Instant local database match (0ms latency, typo-tolerant)
  const localMatches = searchLocalDestinations(query);
  const results: SearchResultItem[] = localMatches.map((item) => ({
    id: item.id,
    name: item.name,
    displayName: item.state
      ? `${item.name}, ${item.state}, ${item.country}`
      : item.category === "Country"
      ? item.name
      : `${item.name}, ${item.country}`,
    category: item.category,
    country: item.country,
    state: item.state,
    tag: item.tag,
  }));

  // 2. If we have fewer than 6 results or user is searching for something specific,
  // query live OpenStreetMap / Photon geocoding API for global live fetch!
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 sec max timeout

    const liveRes = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&lang=en`,
      {
        signal: controller.signal,
        headers: { "User-Agent": "MyKrishnaTravels/1.0" },
      }
    );
    clearTimeout(timeoutId);

    if (liveRes.ok) {
      const data = await liveRes.json();
      const features = data?.features || [];

      for (const feat of features) {
        const props = feat.properties || {};
        const name = props.name;
        const country = props.country || "India";
        const state = props.state;
        const osmType = props.osm_value || props.type || "";

        if (!name) continue;

        let category: SearchResultItem["category"] = "Place";
        if (osmType === "country" || props.type === "country") category = "Country";
        else if (osmType === "state" || osmType === "administrative" || props.type === "state") category = "State";
        else if (osmType === "city" || osmType === "town" || props.type === "city") category = "City";

        const displayName = [name, state, country].filter(Boolean).join(", ");

        // Prevent duplicate entries
        const isDuplicate = results.some(
          (r) =>
            r.name.toLowerCase() === name.toLowerCase() ||
            r.displayName.toLowerCase() === displayName.toLowerCase()
        );

        if (!isDuplicate) {
          results.push({
            id: `live-${props.osm_id || Math.random().toString(36).substring(7)}`,
            name,
            displayName,
            category,
            country,
            state,
            tag: `${category} in ${country}`,
          });
        }
      }
    }
  } catch (err) {
    // Graceful fallback to local results if external network is slow/offline
    console.warn("Live geocoding fallback warning:", err);
  }

  return NextResponse.json({ results: results.slice(0, 8) });
}
