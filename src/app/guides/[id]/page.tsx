'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface GuideProfile {
  id: string;
  name: string;
  email: string;
  city: string;
  country: string;
  languages: string[];
  specializations: string[];
  experience: number;
  pricePerHour: number;
  description: string;
  profilePhoto: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  availability: boolean;
  joinDate: string;
  totalTours: number;
  responseTime: string;
  gallery: string[];
  certifications: string[];
  achievements: string[];
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  trip: string;
  userPhoto?: string;
}

export default function GuideProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [guide, setGuide] = useState<GuideProfile | null>(null);
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      userName: 'Emma Johnson',
      rating: 5,
      comment: 'Alex was an incredible guide! His knowledge of Sri Lankan culture and history brought every location to life. The temple tour was absolutely magical.',
      date: '2025-07-10',
      trip: 'Cultural Temple Tour',
      userPhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b820?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '2',
      userName: 'Michael Chen',
      rating: 5,
      comment: 'Amazing food tour! Alex knew all the best local spots that tourists never find. The authentic flavors and stories made this unforgettable.',
      date: '2025-07-05',
      trip: 'Authentic Food Tour',
      userPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '3',
      userName: 'Sarah Williams',
      rating: 4,
      comment: 'Great historical tour through Colombo. Alex is very knowledgeable and passionate about his city. Would definitely book again!',
      date: '2025-06-28',
      trip: 'Colombo Historical Tour',
      userPhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ]);
  const [selectedDate, setSelectedDate] = useState('');
  const [tourDuration, setTourDuration] = useState(4);
  const [tourType, setTourType] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    // Create a demo guide profile (in real app, this would fetch from API)
    const demoGuide: GuideProfile = {
      id: params.id as string,
      name: 'Alex Thompson',
      email: 'alex@example.com',
      city: 'Colombo',
      country: 'Sri Lanka',
      languages: ['English', 'Sinhala', 'Tamil'],
      specializations: ['Cultural Tours', 'Historical Tours', 'Food Tours', 'Temple Tours'],
      experience: 5,
      pricePerHour: 40,
      description: 'Welcome to Sri Lanka! I\'m Alex, a passionate local guide with over 5 years of experience sharing the beauty and culture of my homeland. Born and raised in Colombo, I have deep knowledge of our rich history, vibrant culture, and hidden gems that most tourists never discover.\n\nI specialize in cultural and historical tours, taking you through ancient temples, colonial architecture, bustling markets, and authentic local eateries. My goal is to provide you with an authentic Sri Lankan experience that goes beyond typical tourist attractions.\n\nI speak fluent English, Sinhala, and Tamil, ensuring smooth communication throughout your journey. Whether you\'re interested in learning about Buddhism, tasting traditional cuisine, or exploring our colonial heritage, I\'ll customize the tour to match your interests and pace.',
      profilePhoto: '/images/guides/alex-thompson.svg',
      rating: 4.8,
      reviewCount: 24,
      verified: true,
      availability: true,
      joinDate: '2024-01-15',
      totalTours: 67,
      responseTime: '< 2 hours',
      gallery: [
        'https://images.unsplash.com/photo-1552928474-e1bfc2e96e9c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1539650116574-75c0c6d73c0e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
      ],
      certifications: ['Sri Lanka Tourism Board Certified', 'First Aid Certified', 'Cultural Heritage Specialist'],
      achievements: ['Top Rated Guide 2024', '50+ Tours Completed', 'Excellent Review Score', 'Cultural Expert']
    };
    setGuide(demoGuide);
  }, [params.id]);

  const handleBooking = () => {
    if (!selectedDate || !tourType) {
      alert('Please select a date and tour type');
      return;
    }
    
    setIsBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      alert('Booking request sent successfully! Alex will respond within 2 hours.');
      router.push('/bookings');
    }, 2000);
  };

  if (!guide) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading guide profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-64 bg-gradient-to-r from-blue-600 to-teal-500 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl font-bold">{guide.name}</h1>
              <p className="text-blue-100">{guide.city}, {guide.country}</p>
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(guide.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-white">{guide.rating} ({guide.reviewCount} reviews)</span>
              </div>
            </div>
            {guide.verified && (
              <div className="absolute top-6 right-6 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                ✓ Verified Guide
              </div>
            )}
          </div>

          {/* Profile Content */}
          <div className="relative px-6 pb-6">
            {/* Profile Photo */}
            <div className="absolute -top-20 left-6">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200">
                {guide.profilePhoto ? (
                  <Image
                    src={guide.profilePhoto}
                    alt={guide.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-3xl font-bold">
                    {guide.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-24">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* About */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About {guide.name.split(' ')[0]}</h2>
                    <div className="prose text-gray-600 whitespace-pre-line">
                      {guide.description}
                    </div>
                  </div>

                  {/* Specializations */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {guide.specializations.map((spec, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {guide.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Certifications & Achievements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Certifications</h4>
                        <ul className="space-y-1">
                          {guide.certifications.map((cert, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                              {cert}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Achievements</h4>
                        <ul className="space-y-1">
                          {guide.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-600">
                              <span className="text-yellow-500 mr-2">🏆</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Gallery */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Photo Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {guide.gallery.map((photo, index) => (
                        <div key={index} className="aspect-square rounded-xl overflow-hidden">
                          <Image
                            src={photo}
                            alt={`Gallery ${index + 1}`}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Booking & Stats */}
                <div className="space-y-6">
                  {/* Booking Card */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 sticky top-8">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-gray-900">${guide.pricePerHour}</div>
                      <div className="text-gray-600">per hour</div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tour Type
                        </label>
                        <select
                          value={tourType}
                          onChange={(e) => setTourType(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select a tour type</option>
                          {guide.specializations.map((spec, index) => (
                            <option key={index} value={spec}>{spec}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duration: {tourDuration} hours
                        </label>
                        <input
                          type="range"
                          min="2"
                          max="8"
                          value={tourDuration}
                          onChange={(e) => setTourDuration(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>2h</span>
                          <span>8h</span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>${guide.pricePerHour} × {tourDuration} hours</span>
                          <span>${guide.pricePerHour * tourDuration}</span>
                        </div>
                        <div className="flex justify-between font-bold text-gray-900">
                          <span>Total</span>
                          <span>${guide.pricePerHour * tourDuration}</span>
                        </div>
                      </div>

                      <button
                        onClick={handleBooking}
                        disabled={isBooking || !guide.availability}
                        className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isBooking ? 'Sending Request...' : guide.availability ? 'Request Booking' : 'Currently Unavailable'}
                      </button>

                      <Link
                        href="/contact"
                        className="w-full block text-center py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Contact Guide
                      </Link>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Experience</span>
                        <span className="font-semibold">{guide.experience} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Tours</span>
                        <span className="font-semibold">{guide.totalTours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Response Time</span>
                        <span className="font-semibold">{guide.responseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Member Since</span>
                        <span className="font-semibold">{guide.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews ({guide.reviewCount})</h2>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    {review.userPhoto ? (
                      <Image
                        src={review.userPhoto}
                        alt={review.userName}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold">
                        {review.userName.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{review.trip}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
