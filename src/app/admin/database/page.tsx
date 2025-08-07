'use client';

import { useState, useEffect } from 'react';
import { SupabaseGuideDB, SupabaseReviewDB, SupabaseDatabaseUtils } from '../../../lib/database/supabase';
import { populateSampleData } from '../../../lib/sampleData';
import { testSupabaseConnection } from '../../../lib/testConnection';
import { Guide } from '../../../types';

export default function DatabaseAdmin() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [stats, setStats] = useState<{
    totalGuides: number;
    totalReviews: number;
    totalBookings: number;
    lastUpdated: string;
  }>({
    totalGuides: 0,
    totalReviews: 0,
    totalBookings: 0,
    lastUpdated: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');
  const [error, setError] = useState<string | null>(null);
  const [isPopulating, setIsPopulating] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setConnectionStatus('connecting');
    setError(null);
    try {
      console.log('Testing database connection...');
      
      // Test database connection
      const initResult = await SupabaseDatabaseUtils.initializeTables();
      if (!initResult.success) {
        throw new Error(initResult.error || 'Failed to initialize tables');
      }
      
      setConnectionStatus('connected');
      console.log('Database connection successful');
      
      // Load guides from Supabase
      const guidesResult = await SupabaseGuideDB.getAllGuides();
      if (guidesResult.success && guidesResult.data) {
        setGuides(guidesResult.data);
        console.log('Loaded guides:', guidesResult.data.length);
      } else {
        console.error('Failed to load guides');
        setError('Failed to load guides');
      }
      
      // Get database stats from Supabase
      const dbStats = await SupabaseDatabaseUtils.getStats();
      setStats({
        ...dbStats,
        totalBookings: 0, // Not implemented yet
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error loading data:', error);
      setConnectionStatus('disconnected');
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePopulateSampleData = async () => {
    setIsPopulating(true);
    try {
      await populateSampleData();
      await loadData(); // Reload data after populating
    } catch (error) {
      console.error('Error populating sample data:', error);
      setError(error instanceof Error ? error.message : 'Failed to populate sample data');
    } finally {
      setIsPopulating(false);
    }
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    try {
      console.log('🧪 Starting connection test...');
      const result = await testSupabaseConnection();
      console.log('🧪 Test result:', result);
      if (result.success) {
        alert('✅ Database connection test successful!');
      } else {
        alert('❌ Database connection test failed: ' + result.error);
      }
    } catch (error) {
      console.error('❌ Test error:', error);
      alert('❌ Test failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsTesting(false);
    }
  };

  const clearDatabase = async () => {
    if (confirm('Are you sure you want to clear all guides from the database? This action cannot be undone!')) {
      try {
        // Delete all guides one by one
        for (const guide of guides) {
          await SupabaseGuideDB.deleteGuide(guide.id);
        }
        alert('Database cleared successfully!');
        loadData();
      } catch (error) {
        console.error('Error clearing database:', error);
        alert('Failed to clear database');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading database information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Database Administration</h1>
          <p className="mt-2 text-gray-600">Manage guides and database operations</p>
        </div>

        {/* Connection Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Database Connection</h2>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-3 ${
              connectionStatus === 'connected' ? 'bg-green-500' : 
              connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="capitalize font-medium">{connectionStatus}</span>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
          
          {connectionStatus === 'disconnected' && (
            <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-md">
              <h3 className="font-semibold text-yellow-800 mb-2">🔧 Database Setup Required</h3>
              <p className="text-yellow-700 text-sm mb-3">
                The database tables are not accessible. This is usually because:
              </p>
              <ul className="text-yellow-700 text-sm list-disc ml-5 mb-3">
                <li>Tables don&apos;t exist (run the SQL setup script)</li>
                <li>Row Level Security (RLS) is enabled (disable it for development)</li>
                <li>Incorrect database credentials</li>
              </ul>
              <p className="text-yellow-700 text-sm">
                <strong>Manual Fix:</strong> Go to your Supabase dashboard → SQL Editor → 
                Run the contents of <code>database_setup.sql</code> file
              </p>
            </div>
          )}
        </div>

        {/* Database Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900">Total Guides</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalGuides}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900">Total Reviews</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.totalReviews}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900">Last Updated</h3>
            <p className="text-sm text-gray-600 mt-2">
              {new Date(stats.lastUpdated).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Database Operations */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Database Operations</h2>
          <div className="space-y-4">
            <div>
              <button
                onClick={handleTestConnection}
                disabled={isTesting}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 mr-3"
              >
                {isTesting ? 'Testing...' : 'Test Connection'}
              </button>
              <p className="text-sm text-gray-600 mt-1">
                Run detailed connection and permission tests
              </p>
            </div>
            <div>
              <button
                onClick={handlePopulateSampleData}
                disabled={isPopulating}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isPopulating ? 'Populating...' : 'Populate Sample Data'}
              </button>
              <p className="text-sm text-gray-600 mt-1">
                Add sample guide data to the database for testing
              </p>
            </div>
            <div>
              <button
                onClick={loadData}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Refresh Data
              </button>
              <p className="text-sm text-gray-600 mt-1">
                Reload data from the database
              </p>
            </div>
            <div>
              <button
                onClick={clearDatabase}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Clear Database
              </button>
              <p className="text-sm text-gray-600 mt-1">
                Remove all guides from the database (cannot be undone)
              </p>
            </div>
          </div>
        </div>

        {/* Guides List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Current Guides ({guides.length})</h2>
          {guides.length === 0 ? (
            <p className="text-gray-600">No guides found in database. Try populating sample data.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Location</th>
                    <th className="text-left py-2">Rating</th>
                    <th className="text-left py-2">Price/Hour</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {guides.map((guide) => (
                    <tr key={guide.id} className="border-b">
                      <td className="py-2">{guide.name}</td>
                      <td className="py-2">{guide.location}</td>
                      <td className="py-2">{guide.rating}/5</td>
                      <td className="py-2">${guide.pricePerHour}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          guide.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {guide.verified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
