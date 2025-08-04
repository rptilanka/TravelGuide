-- ===============================================
-- TRAVEL GUIDE DATABASE SETUP SCRIPT
-- ===============================================
-- Copy and paste this entire script into Supabase SQL Editor
-- and click "Run" to set up your database properly

-- Drop existing tables if they exist (optional - only if you want to start fresh)
-- DROP TABLE IF EXISTS reviews CASCADE;
-- DROP TABLE IF EXISTS guides CASCADE;

-- Create guides table
CREATE TABLE IF NOT EXISTS guides (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  photo TEXT DEFAULT '/images/guides/default-avatar.jpg',
  rating DECIMAL(2,1) DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  languages TEXT[] DEFAULT '{}',
  specializations TEXT[] DEFAULT '{}',
  location TEXT NOT NULL,
  price_per_hour INTEGER NOT NULL,
  experience INTEGER DEFAULT 0,
  description TEXT,
  availability BOOLEAN DEFAULT true,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- IMPORTANT: Disable Row Level Security for development
ALTER TABLE guides DISABLE ROW LEVEL SECURITY;

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guide_id TEXT REFERENCES guides(id) ON DELETE CASCADE,
  reviewer_name TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- IMPORTANT: Disable Row Level Security for development
ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_guides_location ON guides(location);
CREATE INDEX IF NOT EXISTS idx_guides_rating ON guides(rating);
CREATE INDEX IF NOT EXISTS idx_guides_price ON guides(price_per_hour);
CREATE INDEX IF NOT EXISTS idx_reviews_guide_id ON reviews(guide_id);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for guides table
DROP TRIGGER IF EXISTS update_guides_updated_at ON guides;
CREATE TRIGGER update_guides_updated_at
    BEFORE UPDATE ON guides
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to update guide's review count and rating
CREATE OR REPLACE FUNCTION update_guide_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE guides 
    SET 
        review_count = (SELECT COUNT(*) FROM reviews WHERE guide_id = NEW.guide_id),
        rating = (SELECT COALESCE(AVG(rating), 5.0) FROM reviews WHERE guide_id = NEW.guide_id)
    WHERE id = NEW.guide_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for reviews table
DROP TRIGGER IF EXISTS update_guide_stats ON reviews;
CREATE TRIGGER update_guide_stats
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_guide_rating();

-- Insert some sample data for testing
INSERT INTO guides (id, name, email, phone, photo, rating, review_count, languages, specializations, location, price_per_hour, experience, description, availability, verified) VALUES
('1', 'Ahmed Hassan', 'ahmed@example.com', '+94-77-123-4567', '/images/guides/ahmed.jpg', 4.8, 25, ARRAY['English', 'Arabic', 'Sinhala'], ARRAY['Historical Tours', 'Cultural Experiences', 'Photography'], 'Colombo, Sri Lanka', 25, 5, 'Passionate guide with deep knowledge of Sri Lankan history and culture. I love showing visitors the hidden gems of Colombo and sharing stories that bring our heritage to life.', true, true),
('2', 'Priyanka Silva', 'priyanka@example.com', '+94-77-234-5678', '/images/guides/priyanka.jpg', 4.9, 32, ARRAY['English', 'Sinhala', 'Tamil'], ARRAY['Nature Tours', 'Wildlife Safari', 'Adventure Sports'], 'Kandy, Sri Lanka', 30, 7, 'Nature enthusiast and wildlife expert. I specialize in eco-tours around Kandy and the surrounding hill country, with a focus on sustainable tourism.', true, true),
('3', 'Chaminda Perera', 'chaminda@example.com', '+94-77-345-6789', '/images/guides/chaminda.jpg', 4.7, 18, ARRAY['English', 'Sinhala'], ARRAY['Beach Tours', 'Surfing', 'Coastal Exploration'], 'Galle, Sri Lanka', 20, 4, 'Local surfer and beach guide from Galle. I know all the best spots along the southern coast and can teach surfing to beginners.', true, true),
('4', 'Sanduni Wickramasinghe', 'sanduni@example.com', '+94-77-456-7890', '/images/guides/sanduni.jpg', 4.6, 22, ARRAY['English', 'Sinhala', 'German'], ARRAY['Temple Tours', 'Meditation', 'Spiritual Journeys'], 'Anuradhapura, Sri Lanka', 22, 6, 'Spiritual guide specializing in temple tours and meditation experiences. I help visitors connect with the ancient Buddhist heritage of Sri Lanka.', true, true),
('5', 'Kumara Rajapaksa', 'kumara@example.com', '+94-77-567-8901', '/images/guides/kumara.jpg', 4.5, 15, ARRAY['English', 'Sinhala'], ARRAY['Mountain Hiking', 'Tea Plantation Tours', 'Scenic Photography'], 'Nuwara Eliya, Sri Lanka', 28, 8, 'Mountain guide with extensive experience in the hill country. I offer hiking tours, tea plantation visits, and photography expeditions.', true, true),
('6', 'Nimal Fernando', 'nimal@example.com', '+94-77-678-9012', '/images/guides/nimal.jpg', 4.4, 12, ARRAY['English', 'Sinhala'], ARRAY['City Tours', 'Food Tours', 'Local Markets'], 'Colombo, Sri Lanka', 18, 3, 'Food enthusiast and city guide. I love taking visitors on culinary adventures through Colombo''s best street food and local markets.', true, true)
ON CONFLICT (id) DO NOTHING;

-- Verify the setup
SELECT 'Setup completed successfully!' as status;
SELECT COUNT(*) as total_guides FROM guides;
SELECT COUNT(*) as total_reviews FROM reviews;

-- Show sample data
SELECT id, name, location, rating, verified FROM guides LIMIT 3;
