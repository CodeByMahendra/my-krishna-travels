export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export const blogPostsData: BlogPost[] = [
  {
    id: "blog-1",
    slug: "kashmir-travel-guide-best-time-itinerary",
    title: "Complete Kashmir Travel Guide: Best Time to Visit & Must-See Attractions",
    excerpt: "Everything you need to know before visiting Kashmir, from Gulmarg snow seasons to Dal Lake houseboat tips.",
    content: `
Kashmir is known as 'Paradise on Earth' for a reason. Surrounded by towering snow-clad peaks, pine valleys, and clear blue lakes, it offers an incredible retreat for travellers of all ages.

### Best Time to Visit Kashmir
- **Spring & Summer (March to June):** Pleasant weather, lush greenery, blooming tulip gardens in Srinagar, and refreshing lake breezes.
- **Autumn (September to November):** Golden Chinar trees across Srinagar and Pahalgam creating magical romantic landscapes.
- **Winter (December to February):** A winter wonderland for snow lovers, skiing enthusiasts in Gulmarg, and frozen lake photography.

### Top Places You Must Visit
1. **Srinagar:** Experience a traditional house boat stay on Dal Lake or Nigeen Lake with early morning floating market tours.
2. **Gulmarg:** Take the famous Gondola Cable Car to Phase 1 (Kongdoori) and Phase 2 (Apharwat Peak).
3. **Pahalgam:** Explore Betaab Valley, Aru Valley, and Chandanwari along the Lidder River.
4. **Sonamarg:** Trek or pony ride up to Thajiwas Glacier.

### Tips for Planning a Hassle-Free Kashmir Trip
- Book pre-arranged private cabs to avoid local transport negotiations.
- Ensure your itinerary accounts for mountain travel times.
- Keep valid Govt ID proofs handy for security checkpoints.
    `,
    author: "My Krishna Travels Team",
    date: "February 15, 2026",
    readTime: "5 min read",
    category: "Destination Guide",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "blog-2",
    slug: "5-tips-customized-family-vacation-budget",
    title: "5 Essential Tips to Plan a Customized Family Vacation Within Your Budget",
    excerpt: "Learn how to get maximum value, flexible itineraries, and comfortable hotel stays for family trips.",
    content: `
Planning a family vacation requires balancing comfort, budget, activities for children, and relaxing pace for elders. Here are our top 5 expert recommendations:

### 1. Opt for Customized Itineraries Over Fixed Group Tours
Fixed group tours follow strict schedules that may tire children or elderly parents. Customized itineraries allow you to pace daily sightseeing according to your family's comfort.

### 2. Choose Family-Friendly Central Hotels
Staying closer to city centers or key sightseeing spots saves transportation time and allows easy returns for mid-day rests.

### 3. Book 3 to 6 Weeks in Advance
Securing hotel rooms and dedicated private cabs early gets you lower rates and avoids last-minute surge pricing.

### 4. Include Pre-Booked Transfers
Having a dedicated vehicle waiting at airports or railway stations eliminates hassle and luggage stress.

### 5. Talk to a Personal Travel Advisor
At My Krishna Travels, our team works directly with you over WhatsApp to build a balanced itinerary matching your exact family budget.
    `,
    author: "Travel Expert",
    date: "January 28, 2026",
    readTime: "4 min read",
    category: "Travel Tips",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
  },
];
