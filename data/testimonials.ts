export interface Testimonial {
  id: string;
  name: string;
  location: string;
  destination: string;
  rating: number;
  date: string;
  avatar: string;
  review: string;
  verified: boolean;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "review-1",
    name: "Rohan & Priya Sharma",
    location: "Delhi",
    destination: "Kashmir Paradise Escape",
    rating: 5,
    date: "January 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    review: "My Krishna Travels planned our Kashmir honeymoon trip flawlessly! From the houseboat stay in Srinagar to the Gondola tickets in Gulmarg, everything was arranged seamlessly. The driver was polite and very punctual.",
    verified: true,
  },
  {
    id: "review-2",
    name: "Vikram Malhotra",
    location: "Mumbai",
    destination: "Dubai Glamour Tour",
    rating: 5,
    date: "December 2025",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    review: "We booked our family Dubai trip through WhatsApp. The team gave us immediate support whenever we had questions. Hotel recommendations were top notch and desert safari was an unforgettable memory for our kids!",
    verified: true,
  },
  {
    id: "review-3",
    name: "Ananya Patel & Family",
    location: "Ahmedabad",
    destination: "Kerala Backwater Bliss",
    rating: 5,
    date: "February 2026",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    review: "Customized itinerary according to our senior parents' comfort. Munnar tea estates and the Alleppey houseboat dinner were highlights. Transparent communication right from quote stage.",
    verified: true,
  },
  {
    id: "review-4",
    name: "Siddharth & Friends",
    location: "Bengaluru",
    destination: "Manali & Solang Holiday",
    rating: 5,
    date: "January 2026",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    review: "Superb organization for our college friends gang! River rafting in Kullu and Atal tunnel drive were super smooth. Best budget friendly yet premium package.",
    verified: true,
  },
];
