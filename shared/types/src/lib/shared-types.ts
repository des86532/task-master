import { z } from 'zod';

export enum TaskStatus {
  PENDING = 'pending',
  TODO = 'todo',
  PROGRESS = 'progress',
  DONE = 'done',
}

const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.nativeEnum(TaskStatus),
  priority: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  expired_at: z.string(),
});

export type TaskType = z.infer<typeof TaskSchema>;
