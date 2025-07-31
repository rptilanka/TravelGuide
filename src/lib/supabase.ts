import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ewxwztujvfewsdurxpyy.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key-here'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for Supabase
export interface SupabaseGuide {
  id: string
  name: string
  email: string
  phone: string
  photo?: string
  rating: number
  review_count: number
  languages: string[]
  specializations: string[]
  location: string
  price_per_hour: number
  experience: number
  description: string
  availability: boolean
  verified: boolean
  created_at: string
  updated_at: string
}

export interface SupabaseReview {
  id: string
  guide_id: string
  reviewer_name: string
  rating: number
  comment: string
  created_at: string
}
