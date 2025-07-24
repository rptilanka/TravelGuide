'use client';

import { useState } from 'react';
// import { locations, languages, specializations } from '@/data/sampleData';

const locations = ['Madrid', 'Dubai', 'Kyoto', 'Florence', 'Berlin', 'Paris', 'Colombo', 'Kandy', 'Galle', 'Sigiriya'];
const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Japanese', 'Sinhala', 'Tamil', 'Hindi'];
const specializations = ['Historical Tours', 'Cultural Tours', 'Food Tours', 'Adventure Tours', 'Temple Tours', 'Wildlife Safari'];

export default function SearchSection() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedLocation) params.append('location', selectedLocation);
    if (selectedLanguage) params.append('language', selectedLanguage);
    if (selectedSpecialization) params.append('specialization', selectedSpecialization);
    
    window.location.href = `/guides?${params.toString()}`;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Guide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Search by location, language, or specialty to find the ideal local guide for your travel experience
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                📍 Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="">Select a city</option>
                {(locations || []).map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                🌐 Language
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="">Select a language</option>
                {(languages || []).map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>

            {/* Specialty Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                🎯 Specialty
              </label>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="">Select a specialty</option>
                {(specializations || []).map((specialization) => (
                  <option key={specialization} value={specialization}>
                    {specialization}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleSearch}
              className="px-12 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg"
            >
              Search Guides
            </button>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Historical Tours in Rome', 'Food Tours in Paris', 'Adventure Tours in Dubai', 'Art Tours in Florence', 'Cultural Tours in Kyoto', 'Wildlife Safari in Sri Lanka', 'Temple Tours in Kandy', 'Tea Plantation Tours in Ella'].map((search) => (
              <button
                key={search}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full hover:border-blue-500 hover:text-blue-600 transition-colors text-sm"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
