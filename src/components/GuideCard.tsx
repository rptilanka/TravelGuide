import { Guide } from '@/types';
import Link from 'next/link';

interface GuideCardProps {
  guide: Guide;
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden card-hover animate-fadeIn">
      {/* Guide Avatar */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
        {/* Avatar with initials */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-2xl font-bold animate-float">
            {guide.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        {guide.verified && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            ✓ Verified
          </div>
        )}
        {!guide.availability && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Unavailable
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Guide Info */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900">{guide.name}</h3>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-gray-600 font-medium">{guide.rating}</span>
              <span className="text-gray-400 text-sm ml-1">({guide.reviewCount})</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 mb-2">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{guide.location}</span>
            <span className="text-gray-400 mx-2">•</span>
            <span className="text-sm">{guide.experience} years exp.</span>
          </div>
        </div>

        {/* Languages */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {guide.languages.slice(0, 3).map((language) => (
              <span
                key={language}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
              >
                {language}
              </span>
            ))}
            {guide.languages.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                +{guide.languages.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {guide.specializations.slice(0, 2).map((specialization) => (
              <span
                key={specialization}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {specialization}
              </span>
            ))}
            {guide.specializations.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                +{guide.specializations.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {guide.description}
        </p>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">${guide.pricePerHour}</span>
            <span className="text-gray-600 text-sm">/hour</span>
          </div>
          <Link
            href={`/guides/${guide.id}`}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              guide.availability
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {guide.availability ? 'View Profile' : 'Unavailable'}
          </Link>
        </div>
      </div>
    </div>
  );
}
