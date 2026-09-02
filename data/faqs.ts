export interface FAQItem {
  id: string;
  category: "Customization" | "Booking" | "Hotels & Transport" | "General";
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    category: "Customization",
    question: "How can I plan a customized trip with My Krishna Travels?",
    answer: "You can click on 'Plan My Trip' or use our 'Customize Your Trip' form to share your preferred destination, travel dates, budget, and number of travellers. Our travel specialist will curate a customized itinerary and share it with you over WhatsApp or Email.",
  },
  {
    id: "faq-2",
    category: "Customization",
    question: "Can I modify an existing tour package itinerary?",
    answer: "Yes! All our tour packages are 100% customizable. You can add extra days, upgrade hotels, change sightseeing locations, or add special activities according to your preferences.",
  },
  {
    id: "faq-3",
    category: "Booking",
    question: "How do I get a free quote for my trip?",
    answer: "You can request a free quote by clicking any 'Get Free Quote' button, filling out the quick enquiry form on our homepage, or directly sending us a message on WhatsApp.",
  },
  {
    id: "faq-4",
    category: "Booking",
    question: "Can I contact you directly through WhatsApp?",
    answer: "Absolutely! WhatsApp is our primary fast customer support channel. You can click the floating WhatsApp button on our website to start a direct chat with our travel expert immediately.",
  },
  {
    id: "faq-5",
    category: "Hotels & Transport",
    question: "Do you arrange both hotel accommodation and local transportation?",
    answer: "Yes, we provide end-to-end travel management including hotel accommodation, private transfers, dedicated sightseeing cabs, driver allowances, toll taxes, and meals as specified in your package.",
  },
  {
    id: "faq-6",
    category: "General",
    question: "How early should I book my trip?",
    answer: "For domestic destinations like Kashmir, Manali, and Kerala, we recommend booking 2 to 4 weeks in advance. For peak seasons (snow season, long weekends, Diwali, New Year) or international trips like Dubai, Bali, and Maldives, booking 4 to 8 weeks in advance ensures the best hotel rates and flight deals.",
  },
  {
    id: "faq-7",
    category: "General",
    question: "Can you plan family, honeymoon, couple, and group trips?",
    answer: "Yes! We specialize in tailored itineraries for honeymoon couples, family vacations, friends groups, corporate retreats, and solo travelers.",
  },
  {
    id: "faq-8",
    category: "Booking",
    question: "What is your cancellation and refund policy?",
    answer: "We maintain clear and transparent cancellation guidelines depending on how many days prior to travel the request is made. Details can be found on our Cancellation & Refund Policy page or provided by your travel consultant during itinerary confirmation.",
  },
];
