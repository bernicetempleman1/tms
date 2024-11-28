export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  dateCreated?: string;
  dateModified?: string;
  projectId: number;
}

export type AddTaskDTO = Omit<Task, '_id' |'projectId'|'dateCreated' | 'dateModified'>;
export type UpdateTaskDTO = Omit<Task, '_id' | 'dateCreated' | 'dateModified'>;
