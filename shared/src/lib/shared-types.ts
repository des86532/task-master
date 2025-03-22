export enum TaskStatus {
  PENDING = 'pending',
  PROGRESS = 'progress',
  COMPLETED = 'completed',
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

export type TaskSummaryType = {
  pending: number;
  progress: number;
  completed: {
    day: number;
    week: number;
    month: number;
  };
};

export type MonthTaskStatsType = {
  startDate: string;
  endDate: string;
  pending: number;
  progress: number;
  completed: number;
};

export interface ChatMessage {
  id?: string;
  role: string;
  content: string;
  timestamp: number;
}
