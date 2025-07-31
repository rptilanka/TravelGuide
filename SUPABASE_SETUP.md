# Supabase Setup Instructions

## Step 1: Run the Database Setup

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database_setup.sql` into the SQL Editor
4. Run the script to create the tables and triggers

## Step 2: Update Environment Variables

The `.env` file should contain:
```
DATABASE_URL = postgresql://postgres.ewxwztujvfewsdurxpyy:pahan1234@aws-0-us-east-2.pooler.supabase.com:6543/postgres
NEXT_PUBLIC_SUPABASE_URL=https://ewxwztujvfewsdurxpyy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

## Step 3: Get Your Supabase Anon Key

1. Go to Settings > API in your Supabase project
2. Copy the `anon public` key
3. Replace `your-actual-anon-key-here` with the actual key in `.env`

## Step 4: Test the Application

1. Start the development server: `npm run dev`
2. Navigate to `/guide/signup` to create a new guide profile
3. Navigate to `/guides` to see the guide directory (should load from Supabase)
4. Click on a guide to view their detailed profile

## Database Schema

The application uses two main tables:

### `guides` table
- Stores guide profile information
- Auto-generates timestamps
- Includes rating and review count (auto-updated by triggers)

### `reviews` table
- Stores reviews for guides
- Automatically updates guide ratings when reviews are added
- Foreign key relationship with guides table

## Features

- ✅ Dynamic data from Supabase database
- ✅ No more localStorage/mock data
- ✅ Real-time guide creation and listing
- ✅ Auto-updating ratings and review counts
- ✅ Database triggers for data consistency
- ✅ Clean database schema with proper relationships
