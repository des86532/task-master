import type { ChatMessage } from '@task-master/shared';
import axiosInstance from './axiosInstance';

// 發送訊息
export const postChatMessage = async (messages: ChatMessage[]) => {
  const response = await axiosInstance.post('/api/chat', messages);
  return response.data;
};

// 生成子任務
export const generateSubTasks = async (description: string) => {
  const response = await axiosInstance.post('/api/chat/generate-subtasks', {
    description,
  });
  return response.data;
};
