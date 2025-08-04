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

-- Disable Row Level Security for guides table (for development)
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

-- Disable Row Level Security for reviews table (for development)
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
