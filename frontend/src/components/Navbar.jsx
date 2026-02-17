import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
            EduSmart
          </div>

          {isAuthenticated && (
            <div className="hidden md:flex gap-6">
              <button
                onClick={() => navigate('/dashboard')}
                className="hover:text-blue-200 transition"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate('/chat')}
                className="hover:text-blue-200 transition"
              >
                Ask Questions
              </button>
              <button
                onClick={() => navigate('/materials')}
                className="hover:text-blue-200 transition"
              >
                Learning Materials
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated && user && (
            <>
              <div className="text-sm">
                <p className="font-semibold">{user.name}</p>
                <p className="text-blue-200">Grade {user.grade}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <button
                onClick={() => navigate('/login')}
                className="hover:text-blue-200 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
