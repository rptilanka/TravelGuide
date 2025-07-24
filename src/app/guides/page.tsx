'use client';

import { useState, useEffect } from 'react';
import { Guide, SearchFilters } from '@/types';
import GuideCard from '@/components/GuideCard';
import Link from 'next/link';

// Extended sample guides data
const sampleGuides: Guide[] = [
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
    id: '2',
    name: 'Ahmed Hassan',
    rating: 4.8,
    reviewCount: 89,
    languages: ['English', 'Arabic', 'German'],
    specializations: ['Adventure Tours', 'Desert Safari', 'Photography Tours'],
    location: 'Dubai',
    pricePerHour: 60,
    experience: 6,
    description: 'Adventure enthusiast and professional photographer.',
    availability: true,
    verified: true
  }
];

export default function GuidesPage() {
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>(sampleGuides);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Guides</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGuides.map(guide => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </div>
    </div>
  );
}
