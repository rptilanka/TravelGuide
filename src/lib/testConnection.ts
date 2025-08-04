import { createClient } from '@supabase/supabase-js'

// Test database connection with explicit credentials
const supabaseUrl = 'https://ewxwztujvfewsdurxpyy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3eHd6dHVqdmZld3NkdXJ4cHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5Nzg3NzEsImV4cCI6MjA2OTU1NDc3MX0.kVBGsVfEOEJqGJOsEO6CZXJf5sFV7BsLQGGZJfKGVSM'

export async function testSupabaseConnection() {
  console.log('🧪 Testing Supabase connection...')
  console.log('🔗 URL:', supabaseUrl)
  console.log('🔑 Key:', supabaseKey ? '✅ Present' : '❌ Missing')
  
  const testClient = createClient(supabaseUrl, supabaseKey)
  
  try {
    // Test 1: Basic connection
    console.log('\n📋 Test 1: Basic select query...')
    const { data, error, status, statusText } = await testClient
      .from('guides')
      .select('*')
      .limit(5)
    
    console.log('📊 Response Status:', status)
    console.log('📊 Status Text:', statusText)
    console.log('📊 Data:', data)
    console.log('❌ Error:', error)
    
    if (error) {
      console.log('❌ Error Code:', error.code)
      console.log('❌ Error Message:', error.message)
      console.log('❌ Error Details:', error.details)
      console.log('❌ Error Hint:', error.hint)
    }
    
    // Test 2: Check table structure
    console.log('\n📋 Test 2: Check if table exists...')
    const { data: tableInfo, error: tableError } = await testClient
      .from('guides')
      .select('count')
      .limit(0)
    
    console.log('📊 Table Check Data:', tableInfo)
    console.log('❌ Table Check Error:', tableError)
    
    // Test 3: Try to insert a test record
    console.log('\n📋 Test 3: Try insert test...')
    const { data: insertData, error: insertError } = await testClient
      .from('guides')
      .insert([{
        id: 'test-connection-123',
        name: 'Test Guide',
        email: 'test@example.com',
        location: 'Test Location',
        price_per_hour: 25
      }])
      .select()
    
    console.log('📊 Insert Data:', insertData)
    console.log('❌ Insert Error:', insertError)
    
    // Clean up test record
    if (insertData && insertData.length > 0) {
      await testClient
        .from('guides')
        .delete()
        .eq('id', 'test-connection-123')
      console.log('🧹 Cleaned up test record')
    }
    
    return { success: !error, error: error?.message }
  } catch (err) {
    console.error('💥 Connection test failed:', err)
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}
