'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [searchLocation, setSearchLocation] = useState('');

  return (
    <section className="relative text-white min-h-screen">
      {/* Background with enhanced transparency for animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-teal-500/70">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-float">
              Discover Amazing Places with 
              <span className="text-yellow-400 animate-pulse-glow"> Local Guides</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Connect with verified local experts who will show you authentic experiences 
              and hidden gems in their cities.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-2 shadow-xl mb-8 card-hover">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Where do you want to explore?"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full px-6 py-4 text-gray-900 text-lg rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Link
                  href={`/guides${searchLocation ? `?location=${encodeURIComponent(searchLocation)}` : ''}`}
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold text-lg whitespace-nowrap animate-pulse-glow transform hover:scale-105"
                >
                  All Guides
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                <div className="text-3xl font-bold text-yellow-400 mb-2 animate-float">500+</div>
                <div className="text-blue-100">Expert Guides</div>
              </div>
              <div className="text-center animate-fadeIn" style={{ animationDelay: '0.7s' }}>
                <div className="text-3xl font-bold text-yellow-400 mb-2 animate-float" style={{ animationDelay: '1s' }}>50+</div>
                <div className="text-blue-100">Cities Covered</div>
              </div>
              <div className="text-center animate-fadeIn" style={{ animationDelay: '0.9s' }}>
                <div className="text-3xl font-bold text-yellow-400 mb-2 animate-float" style={{ animationDelay: '2s' }}>10k+</div>
                <div className="text-blue-100">Happy Travelers</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fadeIn" style={{ animationDelay: '1s' }}>
            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 card-hover">
              <div className="space-y-6">
                {/* Sample Guide Card Preview */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white font-bold text-xl">
                      SM
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">Sarah Martinez</h3>
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="text-gray-600 ml-1">4.9</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">Historical Tours • Food Tours</p>
                      <p className="text-gray-700 text-sm">8 years experience in Madrid</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">€45/hour</span>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                      View Profile
                    </button>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-white">
                    <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Verified local guides
                  </div>
                  <div className="flex items-center text-white">
                    <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Personalized experiences
                  </div>
                  <div className="flex items-center text-white">
                    <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Instant booking
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
