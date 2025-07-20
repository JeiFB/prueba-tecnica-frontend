export interface Task {
    id?: number;
    title: string;
    description?: string;
    dueDate: string;       // ISO date
    status: 'TO_DO' | 'IN_PROGRESS' | 'DONE';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
  }