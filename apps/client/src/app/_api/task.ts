import { TaskType } from '@task-master/shared/types';
const API_BASE_URL = 'http://localhost:3001';

export const TASK_API = {
  getAllTask: () => `${API_BASE_URL}/api/tasks`,
  getOneTask: (id: number) => `${API_BASE_URL}/api/tasks/${id}`,
};

// 建立新任務
export const createTask = async (task: Partial<TaskType>) => {
  const response = await fetch(TASK_API.getAllTask(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
};
