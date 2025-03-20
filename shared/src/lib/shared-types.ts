export enum TaskStatus {
  PENDING = 'pending',
  PROGRESS = 'progress',
  DONE = 'done',
}

export type TaskType = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: number;
  subTasks: SubTaskType[];
  created_at: string;
  updated_at: string;
  expired_at: string;
  willExpireInThreeDays: boolean;
  isExpired: boolean;
};

export type SubTaskType = {
  id?: number;
  title: string;
  status: boolean;
  created_at?: string;
  updated_at?: string;
};

export interface ChatMessage {
  id?: string;
  role: string;
  content: string;
  timestamp: number;
}
