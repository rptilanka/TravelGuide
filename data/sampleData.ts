import { GuideProfile, Review } from '../src/lib/database/types';

export const sampleGuides: Partial<GuideProfile>[] = [
  {
    firstName: 'Sarah',
    lastName: 'Martinez',
    email: 'sarah.martinez@example.com',
    phone: '+34 612 345 678',
    city: 'Madrid',
    country: 'Spain',
    languages: ['English', 'Spanish', 'French'],
    specializations: ['Historical Tours', 'Cultural Tours', 'Food Tours'],
    experience: 8,
    pricePerHour: 45,
    description: 'Passionate local guide with deep knowledge of Madrid\'s history and culture. I love sharing the hidden gems and authentic experiences that make our city special.',
    profilePhoto: '/images/guides/sarah.jpg'
  },
  {
    firstName: 'Ahmed',
    lastName: 'Hassan',
    email: 'ahmed.hassan@example.com',
    phone: '+971 50 123 4567',
    city: 'Dubai',
    country: 'UAE',
    languages: ['English', 'Arabic', 'German'],
    specializations: ['Adventure Tours', 'Desert Safari', 'Photography Tours'],
    experience: 6,
    pricePerHour: 60,
    description: 'Adventure enthusiast and professional photographer. I specialize in desert experiences and capturing the perfect moments of your journey.',
    profilePhoto: '/images/guides/ahmed.jpg'
  },
  {
    firstName: 'Hiroshi',
    lastName: 'Tanaka',
    email: 'hiroshi.tanaka@example.com',
    phone: '+81 90 1234 5678',
    city: 'Kyoto',
    country: 'Japan',
    languages: ['Japanese', 'English', 'Mandarin'],
    specializations: ['Temple Tours', 'Traditional Culture', 'Garden Tours'],
    experience: 12,
    pricePerHour: 55,
    description: 'Traditional culture expert with over a decade of experience. I\'ll guide you through the spiritual heart of Japan and its timeless traditions.',
    profilePhoto: '/images/guides/hiroshi.jpg'
  },
  {
    firstName: 'Elena',
    lastName: 'Rossi',
    email: 'elena.rossi@example.com',
    phone: '+39 338 123 4567',
    city: 'Florence',
    country: 'Italy',
    languages: ['Italian', 'English', 'Spanish'],
    specializations: ['Art Tours', 'Wine Tours', 'Cooking Classes'],
    experience: 10,
    pricePerHour: 50,
    description: 'Art historian and culinary expert. Let me show you the Renaissance masterpieces and authentic Italian flavors that define Florence.',
    profilePhoto: '/images/guides/elena.jpg'
  },
  {
    firstName: 'Thomas',
    lastName: 'Schmidt',
    email: 'thomas.schmidt@example.com',
    phone: '+49 151 123 45678',
    city: 'Berlin',
    country: 'Germany',
    languages: ['German', 'English', 'Dutch'],
    specializations: ['Historical Tours', 'Architecture Tours', 'Beer Tours'],
    experience: 7,
    pricePerHour: 40,
    description: 'History buff and architecture enthusiast. I\'ll take you through Berlin\'s complex past and vibrant present with engaging stories.',
    profilePhoto: '/images/guides/thomas.jpg'
  },
  {
    firstName: 'Marie',
    lastName: 'Dubois',
    email: 'marie.dubois@example.com',
    phone: '+33 6 12 34 56 78',
    city: 'Paris',
    country: 'France',
    languages: ['French', 'English', 'Italian'],
    specializations: ['Fashion Tours', 'Museum Tours', 'Luxury Shopping'],
    experience: 9,
    pricePerHour: 65,
    description: 'Fashion industry insider and art lover. Experience Paris through the lens of haute couture and artistic excellence.',
    profilePhoto: '/images/guides/marie.jpg'
  },
  {
    firstName: 'Kumara',
    lastName: 'Perera',
    email: 'kumara.perera@example.com',
    phone: '+94 77 123 4567',
    city: 'Colombo',
    country: 'Sri Lanka',
    languages: ['Sinhala', 'English', 'Tamil'],
    specializations: ['Cultural Tours', 'Temple Tours', 'Wildlife Safari', 'Tea Plantation Tours'],
    experience: 11,
    pricePerHour: 35,
    description: 'Born and raised in Sri Lanka, I\'m passionate about sharing the rich culture, ancient history, and natural beauty of my island nation.',
    profilePhoto: '/images/guides/kumara.jpg'
  }
];

export const sampleReviews: Partial<Review>[] = [
  {
    guideId: '', // Will be set when guides are created
    userId: 'user_1',
    userName: 'John Smith',
    rating: 5,
    comment: 'Amazing tour! Sarah showed us parts of Madrid I never would have found on my own. Her knowledge of local history is incredible.',
    trip: 'Madrid Historical Walking Tour',
    date: '2024-12-15'
  },
  {
    guideId: '', // Will be set when guides are created
    userId: 'user_2',
    userName: 'Lisa Chen',
    rating: 5,
    comment: 'The desert safari with Ahmed was the highlight of our Dubai trip. Professional photographer and excellent guide!',
    trip: 'Dubai Desert Adventure',
    date: '2024-12-10'
  },
  {
    guideId: '', // Will be set when guides are created
    userId: 'user_3',
    userName: 'Michael Brown',
    rating: 5,
    comment: 'Hiroshi provided deep insights into Japanese culture and traditions. The temple tour was spiritually enriching.',
    trip: 'Kyoto Temple Experience',
    date: '2024-12-08'
  }
];
