import type { ChatMessage } from '@task-master/shared';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://task-master-production-e56f.up.railway.app'
    : 'http://localhost:3001';

// 發送訊息
export const postChatMessage = async (messages: ChatMessage[]) => {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: 'Post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messages),
  });

  return response.json();
};

// 生成子任務
export const generateSubTasks = async (description: string) => {
  const response = await fetch(`${API_BASE_URL}/api/chat/generate-subtasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate subtasks');
  }

  return response.json();
};
