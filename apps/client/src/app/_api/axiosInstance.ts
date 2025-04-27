import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
// Check if running in a browser environment before accessing window or localStorage
if (typeof window !== 'undefined') {
  const token = window.localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

export default axios;
