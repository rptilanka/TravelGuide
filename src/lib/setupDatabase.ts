import { supabase } from './supabase';

export async function setupDatabase() {
  console.log('🔧 Setting up database...');
  
  try {
    // First, create the guides table
    const { error: guidesTableError } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });

    if (guidesTableError) {
      console.error('❌ Error creating guides table:', guidesTableError);
    } else {
      console.log('✅ Guides table created successfully');
    }

    // Disable RLS on guides table
    const { error: rlsError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE guides DISABLE ROW LEVEL SECURITY;'
    });

    if (rlsError) {
      console.error('❌ Error disabling RLS:', rlsError);
    } else {
      console.log('✅ RLS disabled on guides table');
    }

    // Create reviews table
    const { error: reviewsTableError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS reviews (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          guide_id TEXT REFERENCES guides(id) ON DELETE CASCADE,
          reviewer_name TEXT NOT NULL,
          rating INTEGER CHECK (rating >= 1 AND rating <= 5),
          comment TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (reviewsTableError) {
      console.error('❌ Error creating reviews table:', reviewsTableError);
    } else {
      console.log('✅ Reviews table created successfully');
    }

    // Disable RLS on reviews table
    const { error: reviewsRlsError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE reviews DISABLE ROW LEVEL SECURITY;'
    });

    if (reviewsRlsError) {
      console.error('❌ Error disabling RLS on reviews:', reviewsRlsError);
    } else {
      console.log('✅ RLS disabled on reviews table');
    }

    return { success: true, message: 'Database setup completed successfully' };
  } catch (error) {
    console.error('💥 Database setup failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error during setup' 
    };
  }
}

// Alternative setup using direct SQL execution (if RPC is not available)
export async function simpleSetup() {
  console.log('🔧 Running simple database setup...');
  
  try {
    // Try to disable RLS directly using a simple query
    const { error: rlsError } = await supabase
      .from('guides')
      .select('count')
      .limit(0);
    
    if (rlsError && rlsError.code === '42P01') {
      console.log('📋 Table does not exist. Please run the SQL setup manually in Supabase.');
      return { 
        success: false, 
        error: 'Tables do not exist. Please run the SQL script in Supabase SQL Editor: database_setup.sql' 
      };
    }
    
    if (rlsError && rlsError.code === '42501') {
      console.log('🔒 RLS is blocking access. Please disable RLS in Supabase.');
      return { 
        success: false, 
        error: 'Row Level Security is enabled. Please disable RLS or set up proper policies.' 
      };
    }
    
    return { success: true, message: 'Database is accessible' };
  } catch (error) {
    console.error('💥 Simple setup failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
