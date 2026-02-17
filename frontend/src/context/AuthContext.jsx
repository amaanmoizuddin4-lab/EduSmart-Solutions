import React, { createContext, useContext, useEffect, useReducer } from 'react';

import { apiClient } from '../services/apiService';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check if token exists and user is logged in
    const token = apiClient.getToken();
    if (token) {
      try {
        // Try to fetch profile to validate token
        apiClient
          .getStudentProfile()
          .then(res => {
            if (res.success && res.student) {
              dispatch({ type: 'LOGIN', payload: res.student });
            } else {
              apiClient.removeToken();
              dispatch({ type: 'SET_LOADING', payload: false });
            }
          })
          .catch(() => {
            apiClient.removeToken();
            dispatch({ type: 'SET_LOADING', payload: false });
          });
      } catch (error) {
        apiClient.removeToken();
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await apiClient.loginStudent(email, password);

      if (response.success) {
        apiClient.setToken(response.token);
        dispatch({ type: 'LOGIN', payload: response.student });
        return response;
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
        return response;
      }
    } catch (error) {
      const errorMsg = 'Login failed. Please try again.';
      dispatch({ type: 'SET_ERROR', payload: errorMsg });
      return { success: false, message: errorMsg };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await apiClient.registerStudent(userData);

      if (response.success) {
        apiClient.setToken(response.token);
        dispatch({ type: 'LOGIN', payload: response.student });
        return response;
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
        return response;
      }
    } catch (error) {
      const errorMsg = 'Registration failed. Please try again.';
      dispatch({ type: 'SET_ERROR', payload: errorMsg });
      return { success: false, message: errorMsg };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = () => {
    apiClient.removeToken();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
