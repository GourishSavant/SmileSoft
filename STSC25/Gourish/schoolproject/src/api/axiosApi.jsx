import axios from 'axios';


const axiosApi = axios.create({
  baseURL: 'http://localhost:5000', // Backend base URL
  withCredentials: true,           // Include credentials (e.g., cookies)
});

// Request Interceptor - Attach Authorization Token
axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken'); // Retrieve token
    console.log("Using token for request:", token);

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add token to headers
    } else {
      console.log('No access token available.');
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);


// Response Interceptor - Handle Unauthorized or Errors
axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized! Please login again.');
      // Optionally clear token and redirect to login
      localStorage.removeItem('accesstoken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
export default axiosApi;