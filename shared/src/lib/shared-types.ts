export enum TaskStatus {
  PENDING = 'pending',
  TODO = 'todo',
  PROGRESS = 'progress',
  DONE = 'done',
}

export type TaskType = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: number;
  created_at: string;
  updated_at: string;
  expired_at: string;
};
