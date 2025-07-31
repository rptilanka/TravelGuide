'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GuideDB } from '@/lib/database';

interface GuideSignupForm {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  dateOfBirth: string;
  
  // Location & Languages
  city: string;
  country: string;
  languages: string[];
  
  // Professional Details
  specializations: string[];
  experience: number;
  pricePerHour: number;
  description: string;
  
  // Documents
  profilePhoto: File | null;
  idDocument: File | null;
  certifications: File[];
  
  // Agreement
  agreeTerms: boolean;
  agreeVerification: boolean;
}

const AVAILABLE_LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Japanese', 'Arabic', 
  'Mandarin', 'Portuguese', 'Dutch', 'Sinhala', 'Tamil', 'Hindi', 'Russian'
];

const SPECIALIZATIONS = [
  'Historical Tours', 'Cultural Tours', 'Food Tours', 'Adventure Tours', 'Art Tours',
  'Museum Tours', 'Photography Tours', 'Wine Tours', 'Shopping Tours', 'Architecture Tours',
  'Temple Tours', 'Desert Safari', 'Cooking Classes', 'Fashion Tours', 'Beer Tours',
  'Wildlife Safari', 'Tea Plantation Tours', 'Archaeological Sites', 'Ancient Cities', 'Nature Tours',
  'Beach Tours', 'Ayurveda Tours', 'Spice Garden Tours', 'Whale Watching', 'Bird Watching',
  'Mountain Hiking', 'Train Tours', 'Waterfall Tours', 'Fishing Tours', 'Seafood Tours',
  'Handicraft Tours', 'Village Tours', 'Traditional Arts', 'Wellness Tours'
];

export default function GuideSignupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<GuideSignupForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    city: '',
    country: '',
    languages: [],
    specializations: [],
    experience: 1,
    pricePerHour: 30,
    description: '',
    profilePhoto: null,
    idDocument: null,
    certifications: [],
    agreeTerms: false,
    agreeVerification: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
               type === 'number' ? Number(value) : value
    }));
  };

  const handleMultiSelect = (field: 'languages' | 'specializations', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleFileUpload = (field: 'profilePhoto' | 'idDocument', file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!formData.agreeTerms || !formData.agreeVerification) {
      alert('Please agree to all terms and verification requirements');
      return;
    }

    setIsLoading(true);
    
    // Create guide profile using database
    const guideData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      city: formData.city,
      country: formData.country,
      languages: formData.languages,
      specializations: formData.specializations,
      experience: formData.experience,
      pricePerHour: formData.pricePerHour,
      description: formData.description,
      profilePhoto: '/images/guides/alex-thompson.svg', // Default avatar
      gallery: [],
      certifications: [],
    };

    // Simulate API call
    setTimeout(async () => {
      try {
        // Create guide profile in database
        const result = await GuideDB.createGuide(guideData);
        
        setIsLoading(false);
        
        if (result.success && result.data) {
          const guide = result.data;
          
          // Save to pending for profile setup (optional enhancement step)
          localStorage.setItem('pendingGuideProfile', JSON.stringify({
            ...formData,
            guideId: guide.id
          }));
          
          // Dispatch multiple events to ensure guides page updates
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('guidesUpdated'));
            window.dispatchEvent(new CustomEvent('databaseUpdated', { 
              detail: { type: 'guide_created', guideId: guide.id }
            }));
          }, 100);
          
          // Show success message and redirect
          alert(`🎉 Congratulations! Your guide profile has been created successfully!\n\nProfile ID: ${guide.id}\nName: ${guide.name}\nLocation: ${guide.location}\n\nYour profile is now live in our guides directory and travelers can find and book you!`);
          router.push('/guides'); // Redirect to guides page to see the new profile
        } else {
          alert(`Failed to create profile: ${result.error}`);
        }
      } catch (error) {
        setIsLoading(false);
        alert(`Error creating profile: ${error}`);
      }
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Become a Guide
          </h1>
          <p className="text-xl text-gray-600">
            Share your passion and earn money by guiding travelers
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-12 h-12 rounded-full text-white font-bold ${
                  step <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Personal Info</span>
            <span>Location & Skills</span>
            <span>Professional Details</span>
            <span>Verification</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors animate-pulse-glow"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Location & Skills */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Location & Skills</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages You Speak * (Select multiple)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {AVAILABLE_LANGUAGES.map((language) => (
                      <label key={language} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.languages.includes(language)}
                          onChange={() => handleMultiSelect('languages', language)}
                          className="mr-2"
                        />
                        <span className="text-sm">{language}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors animate-pulse-glow"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Professional Details */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Details</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Specializations * (Select multiple)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto border p-4 rounded-xl">
                    {SPECIALIZATIONS.map((spec) => (
                      <label key={spec} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.specializations.includes(spec)}
                          onChange={() => handleMultiSelect('specializations', spec)}
                          className="mr-2"
                        />
                        <span className="text-sm">{spec}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience *
                    </label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      min="1"
                      max="50"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price per Hour (USD) *
                    </label>
                    <input
                      type="number"
                      name="pricePerHour"
                      value={formData.pricePerHour}
                      onChange={handleInputChange}
                      min="10"
                      max="500"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tell Us About Yourself *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Describe your experience, passion for guiding, and what makes you special..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors animate-pulse-glow"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Verification */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Verification & Documents</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Photo *
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('profilePhoto', e.target.files?.[0] || null)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Upload a clear, professional photo of yourself
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ID Document *
                    </label>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload('idDocument', e.target.files?.[0] || null)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Upload your passport, driver&apos;s license, or national ID
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        required
                        className="mr-3"
                      />
                      <span className="text-sm">
                        I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                      </span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="agreeVerification"
                        checked={formData.agreeVerification}
                        onChange={handleInputChange}
                        required
                        className="mr-3"
                      />
                      <span className="text-sm">
                        I understand that my account will need to be verified before I can start guiding
                      </span>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors animate-pulse-glow disabled:opacity-50"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Guide Account'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Already have account */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
