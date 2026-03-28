const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Ошибка запроса');
  }
  return response.json();
};

export const api = {
  checkHealth: async () => {
    const response = await fetch(`${API_URL.replace('/api', '')}/health`);
    return handleResponse(response);
  },
  
  getTestData: async () => {
    const response = await fetch(`${API_URL}/test`);
    return handleResponse(response);
  },
};