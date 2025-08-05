import { supabase, SupabaseGuide, SupabaseReview } from '@/lib/supabase'
import { Guide, Review } from '@/types'
import { getFallbackGuides } from '@/lib/fallbackData'

// Convert Supabase guide to app guide format
const convertSupabaseGuide = (supabaseGuide: SupabaseGuide): Guide => ({
  id: supabaseGuide.id,
  name: supabaseGuide.name,
  email: supabaseGuide.email,
  phone: supabaseGuide.phone,
  photo: supabaseGuide.photo || '/images/guides/default-avatar.jpg',
  rating: supabaseGuide.rating,
  reviewCount: supabaseGuide.review_count,
  languages: supabaseGuide.languages,
  specializations: supabaseGuide.specializations,
  location: supabaseGuide.location,
  pricePerHour: supabaseGuide.price_per_hour,
  experience: supabaseGuide.experience,
  description: supabaseGuide.description,
  availability: supabaseGuide.availability,
  verified: supabaseGuide.verified
})

// Convert app guide to Supabase guide format
const convertToSupabaseGuide = (guide: Partial<Guide>): Partial<SupabaseGuide> => ({
  id: guide.id,
  name: guide.name,
  email: guide.email,
  phone: guide.phone,
  photo: guide.photo,
  rating: guide.rating || 5.0,
  review_count: guide.reviewCount || 0,
  languages: guide.languages || [],
  specializations: guide.specializations || [],
  location: guide.location,
  price_per_hour: guide.pricePerHour,
  experience: guide.experience,
  description: guide.description,
  availability: guide.availability !== false,
  verified: guide.verified !== false
})

export class SupabaseGuideDB {
  // Get all guides
  static async getAllGuides() {
    try {
      console.log('🔍 Attempting to fetch guides from Supabase...');
      console.log('📍 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
      
      // Check if Supabase is properly configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.error('❌ Supabase environment variables not configured');
        console.log('🔄 Using fallback data due to missing environment variables');
        const fallbackData = getFallbackGuides();
        return { 
          success: true, 
          data: fallbackData,
          warning: 'Database not configured. Using sample data. Please check environment variables.'
        };
      }
      
      // Check if using placeholder keys
      if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'your-anon-key-here') {
        console.warn('⚠️ Using placeholder Supabase key');
        console.log('🔄 Using fallback data due to placeholder credentials');
        const fallbackData = getFallbackGuides();
        return { 
          success: true, 
          data: fallbackData,
          warning: 'Database credentials not configured. Using sample data.'
        };
      }
      
      console.log('🚀 Making Supabase query...');
      const { data, error } = await supabase
        .from('guides')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('📊 Supabase response data:', data);
      console.log('❌ Supabase response error:', error);
      console.log('🔢 Data length:', data ? data.length : 'null');

      // Always use fallback data if there's any error or no data
      if (error || !data || data.length === 0) {
        if (error) {
          // Only log if error has meaningful content
          if (error.message || error.code || Object.keys(error).length > 0) {
            console.warn('⚠️ Database error:', error);
          } else {
            console.warn('⚠️ Empty error object received from Supabase - likely table does not exist');
          }
        }
        
        console.log('🔄 Using fallback data');
        const fallbackData = getFallbackGuides();
        return { 
          success: true, 
          data: fallbackData,
          warning: 'Database unavailable or empty. Using sample data for development.'
        };
      }

      const guides = data.map(convertSupabaseGuide)
      console.log('✅ Successfully loaded guides from database:', guides.length);
      return { success: true, data: guides }
    } catch (error: unknown) {
      console.error('💥 Exception in getAllGuides:', error);
      
      // Always fallback to sample data on any exception
      console.log('🔄 Using fallback data due to exception');
      const fallbackData = getFallbackGuides();
      return { 
        success: true, 
        data: fallbackData,
        warning: 'Database connection failed. Using sample data for development.'
      };
    }
  }

  // Get guide by ID
  static async getGuideById(id: string) {
    try {
      const { data, error } = await supabase
        .from('guides')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching guide:', error)
        return { success: false, error: error.message }
      }

      const guide = data ? convertSupabaseGuide(data) : null
      return { success: true, data: guide }
    } catch (error: unknown) {
      console.error('Error in getGuideById:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
    }
  }

  // Create new guide
  static async createGuide(guideData: Partial<Guide>) {
    try {
      // Generate ID if not provided
      const id = guideData.id || `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      
      const supabaseGuide = convertToSupabaseGuide({ ...guideData, id })

      const { data, error } = await supabase
        .from('guides')
        .insert([supabaseGuide])
        .select()
        .single()

      if (error) {
        console.error('Error creating guide:', error)
        return { success: false, error: error.message }
      }

      const guide = data ? convertSupabaseGuide(data) : null
      return { success: true, data: guide }
    } catch (error: unknown) {
      console.error('Error in createGuide:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
    }
  }

  // Update guide
  static async updateGuide(id: string, updates: Partial<Guide>) {
    try {
      const supabaseUpdates = convertToSupabaseGuide(updates)

      const { data, error } = await supabase
        .from('guides')
        .update({ ...supabaseUpdates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating guide:', error)
        return { success: false, error: error.message }
      }

      const guide = data ? convertSupabaseGuide(data) : null
      return { success: true, data: guide }
    } catch (error: unknown) {
      console.error('Error in updateGuide:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
    }
  }

  // Delete guide
  static async deleteGuide(id: string) {
    try {
      const { error } = await supabase
        .from('guides')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting guide:', error)
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error: unknown) {
      console.error('Error in deleteGuide:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
    }
  }

  // Search guides
  static async searchGuides(filters: {
    location?: string
    language?: string
    specialization?: string
    minPrice?: number
    maxPrice?: number
    minRating?: number
    searchTerm?: string
  }) {
    try {
      let query = supabase.from('guides').select('*')

      // Apply filters
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`)
      }

      if (filters.language) {
        query = query.contains('languages', [filters.language])
      }

      if (filters.specialization) {
        query = query.contains('specializations', [filters.specialization])
      }

      if (filters.minPrice !== undefined) {
        query = query.gte('price_per_hour', filters.minPrice)
      }

      if (filters.maxPrice !== undefined) {
        query = query.lte('price_per_hour', filters.maxPrice)
      }

      if (filters.minRating !== undefined) {
        query = query.gte('rating', filters.minRating)
      }

      if (filters.searchTerm) {
        query = query.or(`name.ilike.%${filters.searchTerm}%,description.ilike.%${filters.searchTerm}%,location.ilike.%${filters.searchTerm}%`)
      }

      const { data, error } = await query.order('rating', { ascending: false })

      if (error) {
        console.error('Error searching guides:', error)
        return { success: false, error: error.message }
      }

      const guides = data?.map(convertSupabaseGuide) || []
      return { success: true, data: guides }
    } catch (error: unknown) {
      console.error('Error in searchGuides:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
    }
  }
}

export class SupabaseReviewDB {
  // Get reviews for a guide
  static async getReviewsByGuideId(guideId: string) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('guide_id', guideId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching reviews:', error)
        return { success: false, error: error.message }
      }

      return { success: true, data: data || [] }
    } catch (error: unknown) {
      console.error('Error in getReviewsByGuideId:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
    }
  }

  // Create review
  static async createReview(reviewData: Partial<Review> & { guideId: string }) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([{
          guide_id: reviewData.guideId,
          reviewer_name: reviewData.reviewerName || reviewData.userName,
          rating: reviewData.rating,
          comment: reviewData.comment
        }])
        .select()
        .single()

      if (error) {
        console.error('Error creating review:', error)
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (error: unknown) {
      console.error('Error in createReview:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
    }
  }
}

export class SupabaseDatabaseUtils {
  // Get database stats
  static async getStats() {
    try {
      console.log('📊 Getting database stats...');
      
      const { count: guideCount, error: guideError } = await supabase
        .from('guides')
        .select('*', { count: 'exact', head: true })

      if (guideError) {
        console.error('❌ Error getting guide count:', guideError);
      }

      const { count: reviewCount, error: reviewError } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })

      if (reviewError) {
        console.error('❌ Error getting review count:', reviewError);
      }

      console.log('📊 Stats - Guides:', guideCount, 'Reviews:', reviewCount);

      return {
        totalGuides: guideCount || 0,
        totalReviews: reviewCount || 0
      }
    } catch (error) {
      console.error('💥 Error getting stats:', error);
      return {
        totalGuides: 0,
        totalReviews: 0
      }
    }
  }

  // Check if tables exist and create if needed
  static async initializeTables() {
    try {
      console.log('🔍 Checking database tables...');
      
      // Test basic connection first
      const { data: connectionTest, error: connectionError } = await supabase
        .from('guides')
        .select('count')
        .limit(0)

      console.log('🔗 Connection test result:', { connectionTest, connectionError });

      if (connectionError) {
        console.error('❌ Connection error:', connectionError);
        
        if (connectionError.code === 'PGRST116') {
          console.log('📋 Tables need to be created. Please run the SQL setup script.');
          return { success: false, error: 'Database tables not found. Please set up the database schema using the SQL script in database_setup.sql' }
        }

        if (connectionError.code === '42P01') {
          return { success: false, error: 'Table "guides" does not exist. Please run the database setup SQL script.' }
        }

        return { success: false, error: `Database error: ${connectionError.message} (Code: ${connectionError.code})` }
      }

      console.log('✅ Database tables are accessible');
      return { success: true }
    } catch (error: unknown) {
      console.error('💥 Error initializing tables:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
    }
  }
}
