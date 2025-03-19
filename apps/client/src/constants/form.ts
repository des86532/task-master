import { TaskStatus } from '@task-master/shared';
import { getLocalTimeZone, today, CalendarDate } from '@internationalized/date';

export type FormData = {
  title: string;
  priority: number;
  status: TaskStatus;
  expired_at: CalendarDate;
  description: string;
};

export const initialFormData: FormData = {
  title: '',
  priority: 0,
  status: TaskStatus.PENDING,
  expired_at: today(getLocalTimeZone()),
  description: '',
};
