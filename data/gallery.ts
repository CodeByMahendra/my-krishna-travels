export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  category: "Mountains" | "Beaches" | "Culture" | "International" | "Hotels";
  image: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: "g1",
    title: "Snowy Gulmarg Gondola",
    location: "Kashmir",
    category: "Mountains",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g2",
    title: "Prisintine Baga Sunset",
    location: "Goa",
    category: "Beaches",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g3",
    title: "Luxury Houseboat Backwaters",
    location: "Kerala",
    category: "Hotels",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g4",
    title: "Burj Khalifa & Fountain Show",
    location: "Dubai",
    category: "International",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g5",
    title: "Amber Fort Royal Architecture",
    location: "Rajasthan",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g6",
    title: "Ubud Rice Terraces",
    location: "Bali",
    category: "International",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g7",
    title: "Solang Valley Mountain Pass",
    location: "Himachal Pradesh",
    category: "Mountains",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g8",
    title: "Overwater Bungalows",
    location: "Maldives",
    category: "International",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
  },
];
