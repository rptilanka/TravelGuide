import { SupabaseGuideDB } from './database/supabase';

export const sampleGuides = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    phone: '+94-77-123-4567',
    photo: '/images/guides/ahmed.jpg',
    rating: 4.8,
    reviewCount: 25,
    languages: ['English', 'Arabic', 'Sinhala'],
    specializations: ['Historical Tours', 'Cultural Experiences', 'Photography'],
    location: 'Colombo, Sri Lanka',
    pricePerHour: 25,
    experience: 5,
    description: 'Passionate guide with deep knowledge of Sri Lankan history and culture. I love showing visitors the hidden gems of Colombo and sharing stories that bring our heritage to life.',
    availability: true,
    verified: true
  },
  {
    id: '2',
    name: 'Priyanka Silva',
    email: 'priyanka@example.com',
    phone: '+94-77-234-5678',
    photo: '/images/guides/priyanka.jpg',
    rating: 4.9,
    reviewCount: 32,
    languages: ['English', 'Sinhala', 'Tamil'],
    specializations: ['Nature Tours', 'Wildlife Safari', 'Adventure Sports'],
    location: 'Kandy, Sri Lanka',
    pricePerHour: 30,
    experience: 7,
    description: 'Nature enthusiast and wildlife expert. I specialize in eco-tours around Kandy and the surrounding hill country, with a focus on sustainable tourism.',
    availability: true,
    verified: true
  },
  {
    id: '3',
    name: 'Chaminda Perera',
    email: 'chaminda@example.com',
    phone: '+94-77-345-6789',
    photo: '/images/guides/chaminda.jpg',
    rating: 4.7,
    reviewCount: 18,
    languages: ['English', 'Sinhala'],
    specializations: ['Beach Tours', 'Surfing', 'Coastal Exploration'],
    location: 'Galle, Sri Lanka',
    pricePerHour: 20,
    experience: 4,
    description: 'Local surfer and beach guide from Galle. I know all the best spots along the southern coast and can teach surfing to beginners.',
    availability: true,
    verified: true
  },
  {
    id: '4',
    name: 'Sanduni Wickramasinghe',
    email: 'sanduni@example.com',
    phone: '+94-77-456-7890',
    photo: '/images/guides/sanduni.jpg',
    rating: 4.6,
    reviewCount: 22,
    languages: ['English', 'Sinhala', 'German'],
    specializations: ['Temple Tours', 'Meditation', 'Spiritual Journeys'],
    location: 'Anuradhapura, Sri Lanka',
    pricePerHour: 22,
    experience: 6,
    description: 'Spiritual guide specializing in temple tours and meditation experiences. I help visitors connect with the ancient Buddhist heritage of Sri Lanka.',
    availability: true,
    verified: true
  },
  {
    id: '5',
    name: 'Kumara Rajapaksa',
    email: 'kumara@example.com',
    phone: '+94-77-567-8901',
    photo: '/images/guides/kumara.jpg',
    rating: 4.5,
    reviewCount: 15,
    languages: ['English', 'Sinhala'],
    specializations: ['Mountain Hiking', 'Tea Plantation Tours', 'Scenic Photography'],
    location: 'Nuwara Eliya, Sri Lanka',
    pricePerHour: 28,
    experience: 8,
    description: 'Mountain guide with extensive experience in the hill country. I offer hiking tours, tea plantation visits, and photography expeditions.',
    availability: true,
    verified: true
  },
  {
    id: '6',
    name: 'Nimal Fernando',
    email: 'nimal@example.com',
    phone: '+94-77-678-9012',
    photo: '/images/guides/nimal.jpg',
    rating: 4.4,
    reviewCount: 12,
    languages: ['English', 'Sinhala'],
    specializations: ['City Tours', 'Food Tours', 'Local Markets'],
    location: 'Colombo, Sri Lanka',
    pricePerHour: 18,
    experience: 3,
    description: 'Food enthusiast and city guide. I love taking visitors on culinary adventures through Colombo\'s best street food and local markets.',
    availability: true,
    verified: true
  }
];

export async function populateSampleData() {
  console.log('Populating sample data...');
  
  try {
    for (const guide of sampleGuides) {
      const result = await SupabaseGuideDB.createGuide(guide);
      if (result.success) {
        console.log(`Created guide: ${guide.name}`);
      } else {
        console.log(`Failed to create guide ${guide.name}:`, result.error);
      }
    }
    console.log('Sample data population completed');
  } catch (error) {
    console.error('Error populating sample data:', error);
  }
}
