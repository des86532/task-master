import { TaskStatus } from '@task-master/shared';

export const TASK_STATUS = {
  [TaskStatus.PENDING]: {
    key: TaskStatus.PENDING,
    label: 'Pending',
  },
  [TaskStatus.PROGRESS]: {
    key: TaskStatus.PROGRESS,
    label: 'In Progress',
  },
  [TaskStatus.COMPLETED]: {
    key: TaskStatus.COMPLETED,
    label: 'Completed',
  },
};

export const TASK_STATUS_TAB_OPTIONS = [
  {
    key: 'all',
    label: 'All',
  },
  {
    key: TASK_STATUS[TaskStatus.PENDING].key,
    label: TASK_STATUS[TaskStatus.PENDING].label,
  },
  {
    key: TASK_STATUS[TaskStatus.PROGRESS].key,
    label: TASK_STATUS[TaskStatus.PROGRESS].label,
  },
  {
    key: TASK_STATUS[TaskStatus.COMPLETED].key,
    label: TASK_STATUS[TaskStatus.COMPLETED].label,
  },
];

export type TabKey = (typeof TASK_STATUS_TAB_OPTIONS)[number]['key'];
