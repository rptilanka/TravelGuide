export interface Guide {
  id: string;
  name: string;
  photo?: string;
  rating: number;
  reviewCount: number;
  languages: string[];
  specializations: string[];
  location: string;
  pricePerHour: number;
  experience: number;
  description: string;
  availability: boolean;
  verified: boolean;
}

export interface Review {
  id: string;
  guideId: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  comment: string;
  date: string;
  trip: string;
}

export interface BookingRequest {
  guideId: string;
  userName: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  message: string;
  totalPrice: number;
}

export interface SearchFilters {
  location?: string;
  languages?: string[];
  specializations?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  minRating?: number;
  availability?: string;
  search?: string;
  sortBy?: string;
}
