const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = {
  setToken: (token) => {
    localStorage.setItem('authToken', token);
  },

  getToken: () => {
    return localStorage.getItem('authToken');
  },

  removeToken: () => {
    localStorage.removeItem('authToken');
  },

  getHeaders: () => {
    const token = apiClient.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  },

  // Student endpoints
  registerStudent: async (formData) => {
    const response = await fetch(`${API_BASE_URL}/students/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    return response.json();
  },

  loginStudent: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/students/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  getStudentProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/students/profile`, {
      headers: apiClient.getHeaders(),
    });
    return response.json();
  },

  updateStudentProfile: async (updates) => {
    const response = await fetch(`${API_BASE_URL}/students/profile`, {
      method: 'PUT',
      headers: apiClient.getHeaders(),
      body: JSON.stringify(updates),
    });
    return response.json();
  },

  // Query endpoints
  submitQuery: async (queryData) => {
    const response = await fetch(`${API_BASE_URL}/queries/submit`, {
      method: 'POST',
      headers: apiClient.getHeaders(),
      body: JSON.stringify(queryData),
    });
    return response.json();
  },

  getStudentQueries: async (page = 1, limit = 10) => {
    const response = await fetch(
      `${API_BASE_URL}/queries/my-queries?page=${page}&limit=${limit}`,
      {
        headers: apiClient.getHeaders(),
      }
    );
    return response.json();
  },

  submitQueryFeedback: async (queryId, feedbackData) => {
    const response = await fetch(`${API_BASE_URL}/queries/${queryId}/feedback`, {
      method: 'POST',
      headers: apiClient.getHeaders(),
      body: JSON.stringify(feedbackData),
    });
    return response.json();
  },

  getRecommendations: async () => {
    const response = await fetch(`${API_BASE_URL}/queries/recommendations/personalized`, {
      headers: apiClient.getHeaders(),
    });
    return response.json();
  },

  getQueryStatistics: async () => {
    const response = await fetch(`${API_BASE_URL}/queries/statistics`, {
      headers: apiClient.getHeaders(),
    });
    return response.json();
  },

  // Learning material endpoints
  getLearningMaterials: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(
      `${API_BASE_URL}/learning-materials?${queryParams}`,
      {
        headers: apiClient.getHeaders(),
      }
    );
    return response.json();
  },

  getLearningMaterialById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/learning-materials/${id}`, {
      headers: apiClient.getHeaders(),
    });
    return response.json();
  },
};

export default apiClient;
