export enum TaskStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
  dueDate: Date;
  status: TaskStatus;
  priority: TaskPriority;
}