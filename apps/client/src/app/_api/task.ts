const API_BASE_URL = 'http://localhost:3001';

export const TASK_API = {
  getAllTask: () => `${API_BASE_URL}/api/tasks`,
  getOneTask: (id: number) => `${API_BASE_URL}/api/cards/${id}`,
};
