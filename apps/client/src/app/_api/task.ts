import { TaskType } from '@task-master/shared/types';

const API_BASE_URL = 'http://localhost:3001';

export const TASK_API = {
  // 取得所有任務
  getAllTask: () => `${API_BASE_URL}/api/tasks`,
  // 取得單一任務
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

// 刪除任務
export const deleteTask = async (id: number) => {
  const response = await fetch(TASK_API.getOneTask(id), {
    method: 'DELETE',
  });

  const responseText = await response.text();

  if (responseText.length > 0) {
    return response.json();
  }
};

// 更新任務
export const updateTask = async (id: number, task: Partial<TaskType>) => {
  const response = await fetch(TASK_API.getOneTask(id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
};
