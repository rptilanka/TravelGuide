'use client';

import { useState, useEffect } from 'react';
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

interface BookingRequest {
  id: string;
  travelerName: string;
  date: string;
  duration: number;
  tourType: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  amount: number;
}

export default function GuideDashboard() {
  const [profile, setProfile] = useState<GuideProfile | null>(null);
  const [bookingRequests] = useState<BookingRequest[]>([
    {
      id: '1',
      travelerName: 'John Smith',
      date: '2025-07-25',
      duration: 4,
      tourType: 'Cultural Tour',
      message: 'Looking forward to exploring the local culture!',
      status: 'pending',
      amount: 160
    },
    {
      id: '2',
      travelerName: 'Sarah Johnson',
      date: '2025-07-28',
      duration: 6,
      tourType: 'Food Tour',
      message: 'Can\'t wait to try authentic local cuisine.',
      status: 'pending',
      amount: 240
    }
  ]);

  useEffect(() => {
    // Load guide profile (in real app, this would be from API)
    const savedProfiles = JSON.parse(localStorage.getItem('guideProfiles') || '[]');
    if (savedProfiles.length > 0) {
      setProfile(savedProfiles[0]); // Get the first profile for demo
    } else {
      // Create a demo profile if none exists
      const demoProfile: GuideProfile = {
        id: 'demo_guide',
        name: 'Alex Thompson',
        email: 'alex@example.com',
        city: 'Colombo',
        country: 'Sri Lanka',
        languages: ['English', 'Sinhala', 'Tamil'],
        specializations: ['Cultural Tours', 'Historical Tours', 'Food Tours'],
        experience: 5,
        pricePerHour: 40,
        description: 'Passionate local guide with deep knowledge of Sri Lankan culture and history. I love sharing authentic experiences with travelers.',
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
          'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop'
        ],
        certifications: ['Tourism Board Certified', 'First Aid Certified'],
        achievements: ['Top Rated Guide', '50+ Tours', 'Excellent Reviews']
      };
      setProfile(demoProfile);
    }
  }, []);

  const handleBookingResponse = (bookingId: string, response: 'accepted' | 'declined') => {
    // Handle booking response (in real app, this would be an API call)
    alert(`Booking ${response} successfully!`);
  };

  const toggleAvailability = () => {
    if (profile) {
      setProfile({
        ...profile,
        availability: !profile.availability
      });
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Guide Dashboard</h1>
            <p className="text-gray-600">Welcome back, {profile.name.split(' ')[0]}!</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleAvailability}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                profile.availability
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {profile.availability ? 'Available' : 'Unavailable'}
            </button>
            <Link
              href={`/guides/${profile.id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              View Public Profile
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg card-hover">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tours</p>
                <p className="text-2xl font-bold text-gray-900">{profile.totalTours}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg card-hover">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-900">{profile.rating}/5.0</p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg card-hover">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{profile.reviewCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg card-hover">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">${profile.pricePerHour * 40}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Booking Requests */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Pending Booking Requests</h2>
              <div className="space-y-4">
                {bookingRequests.filter(req => req.status === 'pending').map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{booking.travelerName}</h3>
                        <p className="text-sm text-gray-600">{booking.tourType} • {booking.duration} hours</p>
                        <p className="text-sm text-gray-600">Date: {booking.date}</p>
                        <p className="text-sm text-gray-700 mt-2">&ldquo;{booking.message}&rdquo;</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">${booking.amount}</p>
                        <div className="flex space-x-2 mt-2">
                          <button
                            onClick={() => handleBookingResponse(booking.id, 'accepted')}
                            className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleBookingResponse(booking.id, 'declined')}
                            className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {bookingRequests.filter(req => req.status === 'pending').length === 0 && (
                  <p className="text-gray-500 text-center py-8">No pending booking requests</p>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm text-gray-700">New review received from Maria Garcia</p>
                  <span className="text-xs text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-sm text-gray-700">Booking request from John Smith</p>
                  <span className="text-xs text-gray-500">5 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <p className="text-sm text-gray-700">Profile viewed 15 times today</p>
                  <span className="text-xs text-gray-500">1 day ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Profile Overview */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Overview</h2>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-lg">
                  {profile.profilePhoto ? (
                    <Image
                      src={profile.profilePhoto}
                      alt={profile.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-bold">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-gray-900">{profile.name}</h3>
                <p className="text-gray-600">{profile.city}, {profile.country}</p>
                <div className="flex justify-center items-center mt-2">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm text-gray-600">{profile.rating} ({profile.reviewCount} reviews)</span>
                </div>
                {profile.verified && (
                  <div className="mt-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      ✓ Verified Guide
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <Link
                  href="/guide/edit-profile"
                  className="w-full block text-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Response time</span>
                  <span className="font-semibold">{profile.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-semibold">{profile.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Languages</span>
                  <span className="font-semibold">{profile.languages.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Specializations</span>
                  <span className="font-semibold">{profile.specializations.length}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/guide/calendar"
                  className="w-full block text-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                >
                  Manage Calendar
                </Link>
                <Link
                  href="/guide/tours"
                  className="w-full block text-center px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  Create Tour Package
                </Link>
                <Link
                  href="/guide/earnings"
                  className="w-full block text-center px-4 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors"
                >
                  View Earnings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
