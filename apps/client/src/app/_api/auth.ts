import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://task-master-production-e56f.up.railway.app'
    : 'http://localhost:3001';

// 登入
export const postLogin = async (body: {
  access_token: string;
  provider: 'google';
}) => {
  const response = await axios.post(`${API_BASE_URL}/api/auth/login`, body);
  return response.data;
};
