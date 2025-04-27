import axiosInstance from './axiosInstance';
import { TaskType } from '@task-master/shared';

export const TASK_API = {
  // 取得所有任務
  allTask: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks`,
  // 取得單一任務
  oneTask: (id: number) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks/${id}`,
  // 任務 summary
  taskSummary: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks/stats`,
  // 任務每月 summary
  taskSummaryMonthly: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasks/stats-monthly`,
};

// 建立新任務
export const createTask = async (task: Partial<TaskType>) => {
  const response = await axiosInstance.post(TASK_API.allTask, task);
  return response.data;
};

// 刪除任務
export const deleteTask = async (id: number) => {
  const response = await axiosInstance.delete(TASK_API.oneTask(id));

  if (response.data.length > 0) {
    return response.data;
  }
};

// Put 更新任務
export const updateTask = async (id: number, task: Partial<TaskType>) => {
  const response = await axiosInstance.put(TASK_API.oneTask(id), task);
  return response.data;
};

// Patch更新任務
export const patchTask = async (id: number, task: Partial<TaskType>) => {
  const response = await axiosInstance.patch(TASK_API.oneTask(id), task);
  return response.data;
};

// 修改大量任務
export const patchManyTask = async (ids: number[], task: Partial<TaskType>) => {
  const response = await axiosInstance.patch(TASK_API.allTask, { ids, task });
  return response.data;
};
