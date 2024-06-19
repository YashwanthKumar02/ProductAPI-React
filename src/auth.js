import axios from "./api/axios";

// Function to set authentication token in axios headers
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post('/auth/login', { username, password });
    localStorage.setItem('token', response.data.token);
    setAuthToken(response.data.token);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const register = async (username, password) => {
  try {
    const response = await axios.post('/auth/register', { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'An error occurred' };
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
};
