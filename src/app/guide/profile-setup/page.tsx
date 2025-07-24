'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

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

export default function GuideProfileSetup() {
  const router = useRouter();
  const [profile, setProfile] = useState<GuideProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Load pending guide data from registration
    const pendingData = localStorage.getItem('pendingGuideProfile');
    if (pendingData) {
      const data = JSON.parse(pendingData);
      
      // Create a complete profile
      const newProfile: GuideProfile = {
        id: `guide_${Date.now()}`,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        city: data.city,
        country: data.country,
        languages: data.languages,
        specializations: data.specializations,
        experience: data.experience,
        pricePerHour: data.pricePerHour,
        description: data.description,
        profilePhoto: '/images/guides/alex-thompson.svg', // Using existing avatar as default
        rating: 5.0, // Default for new guides
        reviewCount: 0,
        verified: false, // Will be verified by admin
        availability: true,
        joinDate: new Date().toISOString().split('T')[0],
        totalTours: 0,
        responseTime: '< 1 hour',
        gallery: [],
        certifications: [],
        achievements: ['New Guide']
      };
      
      setProfile(newProfile);
      setIsLoading(false);
      
      // Clear the pending data
      localStorage.removeItem('pendingGuideProfile');
    } else {
      // Redirect if no pending data
      router.push('/guide/signup');
    }
  }, [router]);

  const handleSaveProfile = () => {
    if (profile) {
      // Update existing profile in localStorage
      const existingGuides = JSON.parse(localStorage.getItem('guideProfiles') || '[]');
      const profileIndex = existingGuides.findIndex((guide: GuideProfile) => guide.id === profile.id);
      
      if (profileIndex !== -1) {
        // Update existing profile
        existingGuides[profileIndex] = profile;
        localStorage.setItem('guideProfiles', JSON.stringify(existingGuides));
        
        // Dispatch custom event to notify guides page of update
        window.dispatchEvent(new CustomEvent('guidesUpdated'));
        
        alert('Profile updated successfully! Your enhanced profile is now live in the guides directory!');
      } else {
        // Fallback: add as new profile if not found
        existingGuides.push(profile);
        localStorage.setItem('guideProfiles', JSON.stringify(existingGuides));
        
        // Dispatch custom event to notify guides page of update
        window.dispatchEvent(new CustomEvent('guidesUpdated'));
        
        alert('Profile created successfully! Your account is pending verification. You can now be found in the guides directory!');
      }
      
      router.push('/guide/dashboard');
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && profile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile({
          ...profile,
          profilePhoto: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addToGallery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && profile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile({
          ...profile,
          gallery: [...profile.gallery, e.target?.result as string]
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Setting up your profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">No profile data found. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Enhance Your Guide Profile
          </h1>
          <p className="text-xl text-gray-600">
            Your profile is already live! Add photos and additional details to make it even more impressive
          </p>
        </div>

        {/* Profile Preview Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-blue-600 to-teal-500 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-4 left-6 text-white">
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-blue-100">{profile.city}, {profile.country}</p>
            </div>
          </div>

          {/* Profile Content */}
          <div className="relative px-6 pb-6">
            {/* Profile Photo */}
            <div className="absolute -top-16 left-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200">
                  {profile.profilePhoto ? (
                    <Image
                      src={profile.profilePhoto}
                      alt={profile.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-2xl font-bold">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="pt-20">
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-8">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'gallery', label: 'Gallery' },
                    { id: 'details', label: 'Details' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">About Me</h3>
                      <p className="text-gray-600 leading-relaxed">{profile.description}</p>
                      
                      <div className="mt-6">
                        <h4 className="text-md font-semibold text-gray-900 mb-3">Specializations</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.specializations.map((spec, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-md font-semibold text-gray-900 mb-3">Languages</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.languages.map((lang, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Experience</span>
                          <span className="font-semibold">{profile.experience} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price/hour</span>
                          <span className="font-semibold">${profile.pricePerHour}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Response time</span>
                          <span className="font-semibold">{profile.responseTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Member since</span>
                          <span className="font-semibold">{profile.joinDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status</span>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                            Pending Verification
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Photo Gallery</h3>
                    <label className="px-4 py-2 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-700 transition-colors">
                      Add Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={addToGallery}
                        className="hidden"
                      />
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {profile.gallery.map((photo, index) => (
                      <div key={index} className="aspect-square rounded-xl overflow-hidden">
                        <Image
                          src={photo}
                          alt={`Gallery ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    ))}
                    {profile.gallery.length === 0 && (
                      <div className="col-span-full text-center py-12">
                        <p className="text-gray-500">No photos yet. Add some to showcase your tours!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Statistics</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Tours</span>
                          <span className="font-semibold">{profile.totalTours}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reviews</span>
                          <span className="font-semibold">{profile.reviewCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rating</span>
                          <span className="font-semibold">{profile.rating}/5.0</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
                      <div className="space-y-2">
                        {profile.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mr-2">
                              <span className="text-xs">🏆</span>
                            </div>
                            <span className="text-gray-700">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => router.push('/guide/signup')}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-colors"
                >
                  Back to Registration
                </button>
                <div className="flex space-x-4">
                  <button
                    onClick={() => router.push('/guides')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    View Guides Directory
                  </button>
                  <button
                    onClick={() => router.push('/guide/dashboard')}
                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-colors"
                  >
                    Skip for Now
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors animate-pulse-glow"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
