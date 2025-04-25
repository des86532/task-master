import { TaskType } from '@task-master/shared';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://task-master-production-e56f.up.railway.app'
    : 'http://localhost:3001';

export const TASK_API = {
  // 取得所有任務
  allTask: `${API_BASE_URL}/api/tasks`,
  // 取得單一任務
  oneTask: (id: number) => `${API_BASE_URL}/api/tasks/${id}`,
  // 任務 summary
  taskSummary: `${API_BASE_URL}/api/tasks/stats`,
  // 任務每月 summary
  taskSummaryMonthly: `${API_BASE_URL}/api/tasks/stats-monthly`,
};

// 建立新任務
export const createTask = async (task: Partial<TaskType>) => {
  const response = await fetch(TASK_API.allTask, {
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
  const response = await fetch(TASK_API.oneTask(id), {
    method: 'DELETE',
  });

  const responseText = await response.text();

  if (responseText.length > 0) {
    return response.json();
  }
};

// Put 更新任務
export const updateTask = async (id: number, task: Partial<TaskType>) => {
  const response = await fetch(TASK_API.oneTask(id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

// Patch更新任務
export const patchTask = async (id: number, task: Partial<TaskType>) => {
  const response = await fetch(TASK_API.oneTask(id), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

// 修改大量任務
export const patchManyTask = async (ids: number[], task: Partial<TaskType>) => {
  const response = await fetch(TASK_API.allTask, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids, task }),
  });
  return response.json();
};
