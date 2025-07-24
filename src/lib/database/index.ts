import { Database, GuideProfile, Review, Booking, DatabaseResponse } from './types';

// In-memory database simulation using localStorage for persistence
// In production, this would connect to a real database

const DB_KEY = 'guide_platform_db';

// Initialize empty database structure
const initializeDatabase = (): Database => ({
  guides: [],
  reviews: [],
  bookings: [],
  lastUpdated: new Date().toISOString()
});

// Load database from localStorage
const loadDatabase = (): Database => {
  if (typeof window === 'undefined') {
    return initializeDatabase();
  }
  
  try {
    const stored = localStorage.getItem(DB_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading database:', error);
  }
  
  return initializeDatabase();
};

// Save database to localStorage
const saveDatabase = (db: Database): void => {
  if (typeof window === 'undefined') return;
  
  try {
    db.lastUpdated = new Date().toISOString();
    localStorage.setItem(DB_KEY, JSON.stringify(db));
    
    // Dispatch custom event for real-time updates
    window.dispatchEvent(new CustomEvent('databaseUpdated', { 
      detail: { type: 'database_update', timestamp: db.lastUpdated }
    }));
  } catch (error) {
    console.error('Error saving database:', error);
  }
};

// Generate unique ID
const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Guide Database Operations
export class GuideDB {
  
  // Create a new guide profile
  static async createGuide(guideData: Partial<GuideProfile>): Promise<DatabaseResponse<GuideProfile>> {
    try {
      const db = loadDatabase();
      const now = new Date().toISOString();
      
      // Check if guide with email already exists
      const existingGuide = db.guides.find(guide => guide.email === guideData.email);
      if (existingGuide) {
        return {
          success: false,
          error: 'Guide with this email already exists'
        };
      }
      
      const newGuide: GuideProfile = {
        id: generateId(),
        firstName: guideData.firstName || '',
        lastName: guideData.lastName || '',
        name: `${guideData.firstName || ''} ${guideData.lastName || ''}`.trim(),
        email: guideData.email || '',
        phone: guideData.phone || '',
        dateOfBirth: guideData.dateOfBirth || '',
        city: guideData.city || '',
        country: guideData.country || '',
        location: `${guideData.city || ''}, ${guideData.country || ''}`,
        languages: guideData.languages || [],
        specializations: guideData.specializations || [],
        experience: guideData.experience || 0,
        pricePerHour: guideData.pricePerHour || 40,
        description: guideData.description || '',
        profilePhoto: guideData.profilePhoto || '/images/guides/default-avatar.jpg',
        rating: 5.0, // Default rating for new guides
        reviewCount: 0,
        verified: false,
        availability: true,
        joinDate: now.split('T')[0],
        totalTours: 0,
        responseTime: '< 1 hour',
        gallery: guideData.gallery || [],
        certifications: guideData.certifications || [],
        achievements: ['New Guide'],
        createdAt: now,
        updatedAt: now
      };
      
      db.guides.push(newGuide);
      saveDatabase(db);
      
      return {
        success: true,
        data: newGuide,
        message: 'Guide profile created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to create guide: ${error}`
      };
    }
  }
  
  // Get all guides
  static async getAllGuides(): Promise<DatabaseResponse<GuideProfile[]>> {
    try {
      const db = loadDatabase();
      return {
        success: true,
        data: db.guides
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to fetch guides: ${error}`
      };
    }
  }
  
  // Get guide by ID
  static async getGuideById(id: string): Promise<DatabaseResponse<GuideProfile>> {
    try {
      const db = loadDatabase();
      const guide = db.guides.find(g => g.id === id);
      
      if (!guide) {
        return {
          success: false,
          error: 'Guide not found'
        };
      }
      
      return {
        success: true,
        data: guide
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to fetch guide: ${error}`
      };
    }
  }
  
  // Update guide profile
  static async updateGuide(id: string, updates: Partial<GuideProfile>): Promise<DatabaseResponse<GuideProfile>> {
    try {
      const db = loadDatabase();
      const guideIndex = db.guides.findIndex(g => g.id === id);
      
      if (guideIndex === -1) {
        return {
          success: false,
          error: 'Guide not found'
        };
      }
      
      const updatedGuide = {
        ...db.guides[guideIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      // Update combined fields
      if (updates.firstName || updates.lastName) {
        updatedGuide.name = `${updatedGuide.firstName} ${updatedGuide.lastName}`.trim();
      }
      
      if (updates.city || updates.country) {
        updatedGuide.location = `${updatedGuide.city}, ${updatedGuide.country}`;
      }
      
      db.guides[guideIndex] = updatedGuide;
      saveDatabase(db);
      
      return {
        success: true,
        data: updatedGuide,
        message: 'Guide profile updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to update guide: ${error}`
      };
    }
  }
  
  // Delete guide
  static async deleteGuide(id: string): Promise<DatabaseResponse<boolean>> {
    try {
      const db = loadDatabase();
      const initialLength = db.guides.length;
      db.guides = db.guides.filter(g => g.id !== id);
      
      if (db.guides.length === initialLength) {
        return {
          success: false,
          error: 'Guide not found'
        };
      }
      
      saveDatabase(db);
      
      return {
        success: true,
        data: true,
        message: 'Guide deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to delete guide: ${error}`
      };
    }
  }
  
  // Search guides
  static async searchGuides(searchTerm: string): Promise<DatabaseResponse<GuideProfile[]>> {
    try {
      const db = loadDatabase();
      const term = searchTerm.toLowerCase();
      
      const results = db.guides.filter(guide =>
        guide.name.toLowerCase().includes(term) ||
        guide.location.toLowerCase().includes(term) ||
        guide.description.toLowerCase().includes(term) ||
        guide.specializations.some(spec => spec.toLowerCase().includes(term)) ||
        guide.languages.some(lang => lang.toLowerCase().includes(term))
      );
      
      return {
        success: true,
        data: results
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to search guides: ${error}`
      };
    }
  }
}

// Review Database Operations
export class ReviewDB {
  static async createReview(reviewData: Partial<Review>): Promise<DatabaseResponse<Review>> {
    try {
      const db = loadDatabase();
      const now = new Date().toISOString();
      
      const newReview: Review = {
        id: generateId(),
        guideId: reviewData.guideId || '',
        userId: reviewData.userId || '',
        userName: reviewData.userName || '',
        userPhoto: reviewData.userPhoto,
        rating: reviewData.rating || 5,
        comment: reviewData.comment || '',
        date: reviewData.date || now.split('T')[0],
        trip: reviewData.trip || '',
        createdAt: now
      };
      
      db.reviews.push(newReview);
      
      // Update guide's rating and review count
      const guide = db.guides.find(g => g.id === newReview.guideId);
      if (guide) {
        const guideReviews = db.reviews.filter(r => r.guideId === guide.id);
        const avgRating = guideReviews.reduce((sum, r) => sum + r.rating, 0) / guideReviews.length;
        guide.rating = Math.round(avgRating * 10) / 10; // Round to 1 decimal
        guide.reviewCount = guideReviews.length;
        guide.updatedAt = now;
      }
      
      saveDatabase(db);
      
      return {
        success: true,
        data: newReview,
        message: 'Review created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to create review: ${error}`
      };
    }
  }
  
  static async getReviewsByGuideId(guideId: string): Promise<DatabaseResponse<Review[]>> {
    try {
      const db = loadDatabase();
      const reviews = db.reviews.filter(r => r.guideId === guideId);
      
      return {
        success: true,
        data: reviews
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to fetch reviews: ${error}`
      };
    }
  }
}

// Booking Database Operations
export class BookingDB {
  static async createBooking(bookingData: Partial<Booking>): Promise<DatabaseResponse<Booking>> {
    try {
      const db = loadDatabase();
      const now = new Date().toISOString();
      
      const newBooking: Booking = {
        id: generateId(),
        guideId: bookingData.guideId || '',
        userId: bookingData.userId || '',
        userName: bookingData.userName || '',
        email: bookingData.email || '',
        phone: bookingData.phone || '',
        startDate: bookingData.startDate || '',
        endDate: bookingData.endDate || '',
        groupSize: bookingData.groupSize || 1,
        message: bookingData.message || '',
        totalPrice: bookingData.totalPrice || 0,
        status: 'pending',
        createdAt: now,
        updatedAt: now
      };
      
      db.bookings.push(newBooking);
      saveDatabase(db);
      
      return {
        success: true,
        data: newBooking,
        message: 'Booking created successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to create booking: ${error}`
      };
    }
  }
  
  static async getBookingsByGuideId(guideId: string): Promise<DatabaseResponse<Booking[]>> {
    try {
      const db = loadDatabase();
      const bookings = db.bookings.filter(b => b.guideId === guideId);
      
      return {
        success: true,
        data: bookings
      };
    } catch (error) {
      return {
        success: false,
        error: `Failed to fetch bookings: ${error}`
      };
    }
  }
}

// Database utilities
export const DatabaseUtils = {
  // Clear all data (for testing)
  clearDatabase: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DB_KEY);
    }
  },
  
  // Export database as JSON
  exportDatabase: (): Database => {
    return loadDatabase();
  },
  
  // Import database from JSON
  importDatabase: (data: Database): void => {
    saveDatabase(data);
  },
  
  // Get database stats
  getStats: () => {
    const db = loadDatabase();
    return {
      totalGuides: db.guides.length,
      totalReviews: db.reviews.length,
      totalBookings: db.bookings.length,
      lastUpdated: db.lastUpdated
    };
  }
};
