'use client';

import { useState, useEffect } from 'react';
import { Guide, SearchFilters } from '@/types';
import GuideCard from '@/components/GuideCard';
import Link from 'next/link';
import { SupabaseGuideDB, SupabaseDatabaseUtils } from '@/lib/database/supabase';

// Static data for filters
const locations = [
  'Madrid', 'Dubai', 'Kyoto', 'Florence', 'Berlin', 'Paris', 'Barcelona', 'Rome', 'London', 'Amsterdam',
  'Colombo', 'Kandy', 'Galle', 'Sigiriya', 'Nuwara Eliya', 'Anuradhapura', 'Polonnaruwa', 'Ella',
  'Mirissa', 'Tissamaharama', 'Negombo', 'Bentota', 'Hikkaduwa', 'Trincomalee', 'Jaffna', 'Ratnapura'
];

const languages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Japanese', 'Arabic', 'Mandarin', 'Portuguese', 'Dutch',
  'Sinhala', 'Tamil', 'Hindi'
];

const specializations = [
  'Historical Tours', 'Cultural Tours', 'Food Tours', 'Adventure Tours', 'Art Tours', 
  'Museum Tours', 'Photography Tours', 'Wine Tours', 'Shopping Tours', 'Architecture Tours',
  'Temple Tours', 'Desert Safari', 'Cooking Classes', 'Fashion Tours', 'Beer Tours',
  'Wildlife Safari', 'Tea Plantation Tours', 'Archaeological Sites', 'Ancient Cities', 'Nature Tours',
  'Beach Tours', 'Ayurveda Tours', 'Spice Garden Tours', 'Whale Watching', 'Bird Watching',
  'Mountain Hiking', 'Train Tours', 'Waterfall Tours', 'Fishing Tours', 'Seafood Tours',
  'Handicraft Tours', 'Village Tours', 'Traditional Arts', 'Wellness Tours'
];

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [filteredGuides, setFilteredGuides] = useState<Guide[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(false);

  // Load guides from database
  useEffect(() => {
    const loadGuides = async () => {
      setIsLoading(true);
      try {
        // Initialize database tables if needed
        await SupabaseDatabaseUtils.initializeTables();
        
        // Load guides from Supabase database
        const result = await SupabaseGuideDB.getAllGuides();
        
        if (result.success && result.data) {
          setGuides(result.data);
          setFilteredGuides(result.data);
          console.log(`Loaded ${result.data.length} guides from Supabase database`);
        } else {
          console.error('Failed to load guides');
          setGuides([]);
          setFilteredGuides([]);
        }
      } catch (error) {
        console.error('Error loading guides:', error);
        setGuides([]);
        setFilteredGuides([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadGuides();

    // Listen for database updates
    const handleDatabaseUpdate = () => {
      loadGuides();
    };
    
    window.addEventListener('databaseUpdated', handleDatabaseUpdate);
    window.addEventListener('guidesUpdated', handleDatabaseUpdate);

    return () => {
      window.removeEventListener('databaseUpdated', handleDatabaseUpdate);
      window.removeEventListener('guidesUpdated', handleDatabaseUpdate);
    };
  }, []);

  // Filter guides based on current filters
  useEffect(() => {
    setIsLoading(true);
    
    const filterGuides = () => {
      let filtered = [...guides];

      // Search filter
      if (searchTerm) {
        filtered = filtered.filter(guide =>
          guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          guide.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          guide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          guide.specializations.some(spec => 
            spec.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          guide.languages.some(lang => 
            lang.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }

      // Location filter
      if (filters.location) {
        filtered = filtered.filter(guide => 
          guide.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }

      // Languages filter
      if (filters.languages && filters.languages.length > 0) {
        filtered = filtered.filter(guide =>
          filters.languages!.some(lang => guide.languages.includes(lang))
        );
      }

      // Specializations filter
      if (filters.specializations && filters.specializations.length > 0) {
        filtered = filtered.filter(guide =>
          filters.specializations!.some(spec => guide.specializations.includes(spec))
        );
      }

      // Price range filter
      if (filters.priceRange) {
        filtered = filtered.filter(guide =>
          guide.pricePerHour >= filters.priceRange!.min &&
          guide.pricePerHour <= filters.priceRange!.max
        );
      }

      // Rating filter
      if (filters.minRating) {
        filtered = filtered.filter(guide => guide.rating >= filters.minRating!);
      }

      // Availability filter
      if (filters.availability) {
        const isAvailable = filters.availability === 'available';
        filtered = filtered.filter(guide => guide.availability === isAvailable);
      }

      // Sort guides
      switch (sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.pricePerHour - b.pricePerHour);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.pricePerHour - a.pricePerHour);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'experience':
          filtered.sort((a, b) => b.experience - a.experience);
          break;
        case 'reviews':
          filtered.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        default:
          // Featured - keep original order
          break;
      }

      return filtered;
    };

    const timeoutId = setTimeout(() => {
      setFilteredGuides(filterGuides());
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters, searchTerm, sortBy, guides]);

  const updateFilter = (key: keyof SearchFilters, value: string | number | boolean | undefined | { min?: number; max?: number }) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: 'languages' | 'specializations', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key]?.includes(value)
        ? prev[key]?.filter(item => item !== value)
        : [...(prev[key] || []), value]
    }));
  };

  const clearAllFilters = () => {
    setFilters({});
    setSearchTerm('');
    setSortBy('featured');
  };

  const hasActiveFilters = Object.keys(filters).length > 0 || searchTerm || sortBy !== 'featured';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Find Your Perfect Guide
              </h1>
              <p className="text-gray-600">
                Discover {filteredGuides.length} amazing local guides ready to show you their city
              </p>
            </div>
            
            {/* Quick Stats */}
            <div className="flex gap-6 text-sm text-gray-600">
              <div className="text-center">
                <div className="font-semibold text-gray-900">{guides.length}</div>
                <div>Total Guides</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">{locations.length}</div>
                <div>Cities</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-gray-900">{languages.length}</div>
                <div>Languages</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search guides, locations..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={filters.location || ''}
                  onChange={(e) => updateFilter('location', e.target.value || undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range (per hour)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange?.min || ''}
                    onChange={(e) => updateFilter('priceRange', {
                      ...filters.priceRange,
                      min: Number(e.target.value) || 0
                    })}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange?.max || ''}
                    onChange={(e) => updateFilter('priceRange', {
                      ...filters.priceRange,
                      max: Number(e.target.value) || 1000
                    })}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.minRating || ''}
                  onChange={(e) => updateFilter('minRating', Number(e.target.value) || undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.0">4.0+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                </select>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  value={filters.availability || ''}
                  onChange={(e) => updateFilter('availability', e.target.value || undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Guides</option>
                  <option value="available">Available Now</option>
                  <option value="unavailable">Currently Unavailable</option>
                </select>
              </div>

              {/* Languages */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Languages ({filters.languages?.length || 0} selected)
                </label>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {languages.map(language => (
                    <label key={language} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.languages?.includes(language) || false}
                        onChange={() => toggleArrayFilter('languages', language)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{language}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Specializations ({filters.specializations?.length || 0} selected)
                </label>
                <div className="max-h-32 overflow-y-auto space-y-2">
                  {specializations.map(spec => (
                    <label key={spec} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.specializations?.includes(spec) || false}
                        onChange={() => toggleArrayFilter('specializations', spec)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{spec}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            {/* Sort and Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-lg font-medium text-gray-900">
                  {isLoading ? 'Searching...' : `${filteredGuides.length} guides found`}
                </h3>
                {hasActiveFilters && (
                  <p className="text-sm text-gray-600 mt-1">
                    Filtered results shown
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="featured">Featured</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="experience">Most Experienced</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {/* No Results */}
            {!isLoading && filteredGuides.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No guides found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Guides Grid */}
            {!isLoading && filteredGuides.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredGuides.map(guide => (
                  <div key={guide.id} className="transform transition-all duration-300 hover:-translate-y-1">
                    <GuideCard guide={guide} />
                  </div>
                ))}
              </div>
            )}

            {/* Call to Action */}
            {!isLoading && filteredGuides.length > 0 && (
              <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">Can&apos;t find the perfect guide?</h3>
                <p className="text-blue-100 mb-6">
                  Join our community of local experts and share your knowledge with travelers
                </p>
                <Link
                  href="/guide/signup"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Become a Guide
                  <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
