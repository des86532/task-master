import type { ChatMessage } from '@task-master/shared';
import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://task-master-production-e56f.up.railway.app'
    : 'http://localhost:3001';

// 發送訊息
export const postChatMessage = async (messages: ChatMessage[]) => {
  const response = await axios.post(`${API_BASE_URL}/api/chat`, messages);
  return response.data;
};

// 生成子任務
export const generateSubTasks = async (description: string) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/chat/generate-subtasks`,
    { description }
  );
  // Axios throws an error for non-2xx status codes by default
  return response.data;
};
