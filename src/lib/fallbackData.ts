import { Guide } from '@/types';

// Fallback guide data for when database is not available
export const fallbackGuides: Guide[] = [
  {
    id: "fallback-1",
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    phone: "+20 123 456 7890",
    photo: "/images/guides/ahmed.jpg",
    rating: 4.9,
    reviewCount: 156,
    languages: ["English", "Arabic", "French"],
    specializations: ["Historical Sites", "Cultural Tours", "Food Tours"],
    location: "Cairo, Egypt",
    pricePerHour: 25,
    experience: 8,
    description: "Passionate about sharing Cairo's rich history and vibrant culture with visitors from around the world.",
    availability: true,
    verified: true
  },
  {
    id: "fallback-2",
    name: "Elena Rodriguez",
    email: "elena@example.com",
    phone: "+34 654 321 987",
    photo: "/images/guides/elena.jpg",
    rating: 4.8,
    reviewCount: 203,
    languages: ["Spanish", "English", "Portuguese"],
    specializations: ["Art Tours", "Architecture", "Local Cuisine"],
    location: "Barcelona, Spain",
    pricePerHour: 35,
    experience: 6,
    description: "Art enthusiast and local food expert who loves showing visitors the hidden gems of Barcelona.",
    availability: true,
    verified: true
  },
  {
    id: "fallback-3",
    name: "Thomas Mueller",
    email: "thomas@example.com",
    phone: "+49 172 345 678",
    photo: "/images/guides/thomas.jpg",
    rating: 4.7,
    reviewCount: 178,
    languages: ["German", "English", "Dutch"],
    specializations: ["Historical Tours", "Beer Culture", "Museums"],
    location: "Munich, Germany",
    pricePerHour: 40,
    experience: 10,
    description: "History buff and beer connoisseur offering authentic Bavarian experiences in Munich.",
    availability: true,
    verified: true
  },
  {
    id: "fallback-4",
    name: "Marie Dubois",
    email: "marie@example.com",
    phone: "+33 6 12 34 56 78",
    photo: "/images/guides/marie.jpg",
    rating: 4.9,
    reviewCount: 234,
    languages: ["French", "English", "Italian"],
    specializations: ["Fashion", "Art", "Gastronomy"],
    location: "Paris, France",
    pricePerHour: 50,
    experience: 12,
    description: "Fashion industry professional turned tour guide, specializing in Parisian style and culinary experiences.",
    availability: true,
    verified: true
  },
  {
    id: "fallback-5",
    name: "Hiroshi Tanaka",
    email: "hiroshi@example.com",
    phone: "+81 90 1234 5678",
    photo: "/images/guides/hiroshi.jpg",
    rating: 4.8,
    reviewCount: 189,
    languages: ["Japanese", "English"],
    specializations: ["Traditional Culture", "Temples", "Modern Tokyo"],
    location: "Tokyo, Japan",
    pricePerHour: 45,
    experience: 7,
    description: "Cultural ambassador passionate about bridging traditional Japanese culture with modern Tokyo life.",
    availability: true,
    verified: true
  },
  {
    id: "fallback-6",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 555 123 4567",
    photo: "/images/guides/sarah.jpg",
    rating: 4.7,
    reviewCount: 167,
    languages: ["English"],
    specializations: ["Urban Photography", "Street Art", "Local Music"],
    location: "New York, USA",
    pricePerHour: 55,
    experience: 5,
    description: "NYC native and photographer offering unique perspectives on the city's vibrant street culture and art scene.",
    availability: true,
    verified: true
  }
];

export const getFallbackGuides = (): Guide[] => {
  console.log('📚 Using fallback guide data');
  return fallbackGuides;
};
