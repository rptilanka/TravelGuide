'use client';

import { useState, useEffect } from 'react';
import { SupabaseGuideDB, SupabaseReviewDB, SupabaseDatabaseUtils } from '../../../lib/database/supabase';
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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setConnectionStatus('connecting');
    try {
      // Test database connection
      await SupabaseDatabaseUtils.initializeTables();
      setConnectionStatus('connected');
      
      // Load guides from Supabase
      const guidesResult = await SupabaseGuideDB.getAllGuides();
      if (guidesResult.success && guidesResult.data) {
        setGuides(guidesResult.data);
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
    }
    setLoading(false);
  };

  const clearDatabase = async () => {
    if (confirm('Are you sure you want to clear all guides from the database? This action cannot be undone!')) {
      try {
        // Delete all guides one by one (Supabase doesn't have a clear all function)
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

  const exportData = () => {
    const data = {
      guides: guides,
      stats: stats,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `supabase-guide-database-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Database Administration</h1>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-500' : 
                connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
              }`}></div>
              <span className="text-sm font-medium">
                Supabase {connectionStatus === 'connected' ? 'Connected' : 
                connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
              </span>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900">Total Guides</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.totalGuides}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900">Total Reviews</h3>
              <p className="text-3xl font-bold text-green-600">{stats.totalReviews}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900">Total Bookings</h3>
              <p className="text-3xl font-bold text-purple-600">{stats.totalBookings}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900">Last Updated</h3>
              <p className="text-sm text-gray-600">{new Date(stats.lastUpdated).toLocaleString()}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <button
              onClick={loadData}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Refresh Data
            </button>
            <button
              onClick={exportData}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Export Database
            </button>
            <button
              onClick={clearDatabase}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Clear Database
            </button>
          </div>
        </div>

        {/* Guides List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All Guides</h2>
          
          {guides.length === 0 ? (
            <p className="text-gray-600">No guides found in database.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Location</th>
                    <th className="px-4 py-2 text-left">Rating</th>
                    <th className="px-4 py-2 text-left">Verified</th>
                    <th className="px-4 py-2 text-left">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {guides.map((guide) => (
                    <tr key={guide.id} className="border-t">
                      <td className="px-4 py-2 text-xs font-mono">{guide.id}</td>
                      <td className="px-4 py-2 font-medium">{guide.name}</td>
                      <td className="px-4 py-2 text-sm">{guide.email}</td>
                      <td className="px-4 py-2 text-sm">{guide.location}</td>
                      <td className="px-4 py-2">
                        <span className="text-yellow-600">★</span> {guide.rating} ({guide.reviewCount})
                      </td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${guide.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {guide.verified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-600">
                        N/A
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
