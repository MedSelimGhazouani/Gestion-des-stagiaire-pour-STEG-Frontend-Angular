export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface InternTask {
  id?: string;
  internId: string;
  taskDate: string;          // ISO (yyyy-MM-dd)
  description?: string;
  status: TaskStatus;
}
