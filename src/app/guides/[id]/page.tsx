'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SupabaseGuideDB, SupabaseReviewDB } from '@/lib/database/supabase';
import { Guide, Review } from '@/types';

export default function GuideProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [tourDuration, setTourDuration] = useState(4);
  const [tourType, setTourType] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const loadGuideData = async () => {
      const guideId = params.id as string;
      
      try {
        setLoading(true);
        
        // Fetch guide data
        const guideResult = await SupabaseGuideDB.getGuideById(guideId);
        if (guideResult.success && guideResult.data) {
          setGuide(guideResult.data);
        } else {
          setError('Guide not found');
          return;
        }
        
        // Fetch reviews
        const reviewsResult = await SupabaseReviewDB.getReviewsByGuideId(guideId);
        if (reviewsResult.success && reviewsResult.data) {
          // Convert Supabase reviews to app format
          const convertedReviews: Review[] = reviewsResult.data.map((review: any) => ({
            id: review.id,
            guideId: review.guide_id,
            userName: review.reviewer_name,
            rating: review.rating,
            comment: review.comment,
            date: new Date(review.created_at).toLocaleDateString(),
            trip: 'Tour Experience' // Default value since we don't store this
          }));
          setReviews(convertedReviews);
        }
      } catch (err: any) {
        console.error('Error loading guide data:', err);
        setError('Failed to load guide data');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadGuideData();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading guide details...</p>
        </div>
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Guide Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The guide you are looking for does not exist.'}</p>
          <Link 
            href="/guides" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Guides
          </Link>
        </div>
      </div>
    );
  }

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
              <p className="text-blue-100">{guide.location}</p>
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
                {guide.photo ? (
                  <Image
                    src={guide.photo}
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
