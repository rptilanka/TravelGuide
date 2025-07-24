// Database Types for the Guide Platform

export interface GuideProfile {
  id: string;
  // Personal Information
  firstName: string;
  lastName: string;
  name: string; // Combined first + last
  email: string;
  phone: string;
  dateOfBirth: string;
  
  // Location & Languages
  city: string;
  country: string;
  location: string; // Combined city, country
  languages: string[];
  
  // Professional Details
  specializations: string[];
  experience: number;
  pricePerHour: number;
  description: string;
  
  // Profile Data
  profilePhoto: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  availability: boolean;
  
  // Metadata
  joinDate: string;
  totalTours: number;
  responseTime: string;
  gallery: string[];
  certifications: string[];
  achievements: string[];
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  guideId: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  date: string;
  trip: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  guideId: string;
  userId: string;
  userName: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  message: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Database {
  guides: GuideProfile[];
  reviews: Review[];
  bookings: Booking[];
  lastUpdated: string;
}

export interface DatabaseResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
