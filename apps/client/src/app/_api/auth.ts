import axiosInstance from './axiosInstance';

// 登入
export const postLogin = async (body: {
  access_token: string;
  provider: 'google';
}) => {
  const response = await axiosInstance.post('/api/auth/login', body);
  return response.data;
};
