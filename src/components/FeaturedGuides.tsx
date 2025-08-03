'use client';

import { useState, useEffect } from 'react';
import { SupabaseGuideDB } from '@/lib/database/supabase';
import { Guide } from '@/types';
import GuideCard from './GuideCard';
import Link from 'next/link';

export default function FeaturedGuides() {
  const [featuredGuides, setFeaturedGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedGuides = async () => {
      try {
        const result = await SupabaseGuideDB.getAllGuides();
        if (result.success && result.data) {
          // Get top-rated guides and limit to 6
          const topGuides = result.data
            .filter(guide => guide.verified)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 6);
          setFeaturedGuides(topGuides);
        }
      } catch (error) {
        console.error('Error loading featured guides:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedGuides();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading featured guides...</p>
          </div>
        </div>
      </section>
    );
  }

  if (featuredGuides.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Local Guides
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              No featured guides available at the moment. Check back soon!
            </p>
            <Link
              href="/guides"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              Browse All Guides
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    );
  }

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
