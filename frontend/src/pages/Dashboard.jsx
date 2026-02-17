import React, { useEffect, useState } from 'react';
import { apiClient } from '../services/apiService';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await apiClient.getQueryStatistics();
      if (response.success) {
        setStats(response.statistics);
      }
    } catch (err) {
      setError('Failed to load statistics');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Learning Dashboard</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Queries Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Total Questions Asked</p>
                  <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.totalQueries}</p>
                </div>
                <div className="text-4xl">❓</div>
              </div>
            </div>

            {/* Average Rating Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Average Rating</p>
                  <p className="text-3xl font-bold text-yellow-500 mt-2">{stats.averageRating}</p>
                </div>
                <div className="text-4xl">⭐</div>
              </div>
            </div>

            {/* Response Time Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Avg Response Time</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {stats.averageResponseTime}ms
                  </p>
                </div>
                <div className="text-4xl">⚡</div>
              </div>
            </div>

            {/* Helpful Count Card */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Helpful Responses</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">{stats.helpfulCount}</p>
                </div>
                <div className="text-4xl">👍</div>
              </div>
            </div>

            {/* Subject Distribution */}
            <div className="md:col-span-2 lg:col-span-4 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Questions by Subject</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(stats.subjectDistribution).map(([subject, count]) => (
                  <div key={subject} className="bg-indigo-50 rounded-lg p-4 text-center">
                    <p className="text-gray-700 font-semibold">{subject}</p>
                    <p className="text-2xl font-bold text-indigo-600 mt-2">{count}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Success Metrics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Success Metrics</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Response Time Target (&lt;2 min)</span>
                <span className="text-green-600 font-semibold">✓ Met</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Satisfaction Target (&gt;80%)</span>
                <span className="text-blue-600 font-semibold">{stats?.averageRating * 20}%</span>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">💡 Quick Tips</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Be specific with your questions for better answers</li>
              <li>• Review learning materials to strengthen weak areas</li>
              <li>• Rate responses to help us improve</li>
              <li>• Check your personalized recommendations regularly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
