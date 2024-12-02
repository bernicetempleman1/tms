/**
 * Author: Bernice Templeman
 * Date: 2 December 2024
 * File: task.ts
 * Description: Task interface
 *
 */
//Reference: Krasso, R. (2024). Lean, MEAN, and Pragmatic: A Guide to Full-Stack JavaScript Development (page 172)

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate: string;
  dateCreated?: string;
  dateModified?: string;
  projectId: number;
}

export type AddTaskDTO = Omit<Task, '_id' |'dateCreated' | 'dateModified'| 'projectId'>;
export type UpdateTaskDTO = Omit<Task, '_id' | 'dateCreated' | 'dateModified' | 'dueDate'|'projectId'>;
