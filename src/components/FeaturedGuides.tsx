// import { sampleGuides } from '@/data/sampleData';
import GuideCard from './GuideCard';
import Link from 'next/link';

const sampleGuides = [
  {
    id: '1',
    name: 'Sarah Martinez',
    rating: 4.9,
    reviewCount: 127,
    languages: ['English', 'Spanish', 'French'],
    specializations: ['Historical Tours', 'Cultural Tours', 'Food Tours'],
    location: 'Madrid',
    pricePerHour: 45,
    experience: 8,
    description: 'Passionate local guide with deep knowledge of Madrid\'s history and culture.',
    availability: true,
    verified: true
  },
  {
    id: '7',
    name: 'Kumara Perera',
    rating: 4.8,
    reviewCount: 142,
    languages: ['Sinhala', 'English', 'Tamil'],
    specializations: ['Cultural Tours', 'Temple Tours', 'Wildlife Safari', 'Tea Plantation Tours'],
    location: 'Colombo',
    pricePerHour: 35,
    experience: 11,
    description: 'Born and raised in Sri Lanka, passionate about sharing rich culture and natural beauty.',
    availability: true,
    verified: true
  },
  {
    id: '8',
    name: 'Nimal Rajapakse',
    rating: 4.9,
    reviewCount: 98,
    languages: ['Sinhala', 'English'],
    specializations: ['Historical Tours', 'Archaeological Sites', 'Ancient Cities'],
    location: 'Kandy',
    pricePerHour: 30,
    experience: 8,
    description: 'Archaeology graduate specializing in Sri Lanka\'s ancient kingdoms and heritage sites.',
    availability: true,
    verified: true
  },
  {
    id: '9',
    name: 'Sanduni Fernando',
    rating: 4.7,
    reviewCount: 76,
    languages: ['Sinhala', 'English', 'Tamil'],
    specializations: ['Wildlife Safari', 'Nature Tours', 'Photography Tours'],
    location: 'Galle',
    pricePerHour: 40,
    experience: 6,
    description: 'Wildlife photographer and nature guide specializing in Sri Lankan biodiversity.',
    availability: true,
    verified: true
  }
];

export default function FeaturedGuides() {
  const featuredGuides = sampleGuides?.slice(0, 6) || [];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Local Guides
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our top-rated guides who are passionate about sharing their cities with you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/guides"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            View All Guides
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
