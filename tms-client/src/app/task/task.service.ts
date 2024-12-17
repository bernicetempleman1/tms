/**
 * Author: Bernice Templeman
 * Date: 2 December 2024
 * File: task.service.ts
 * Description: Task services
 *
 */
//Reference: Krasso, R. (2024). Lean, MEAN, and Pragmatic: A Guide to Full-Stack JavaScript Development (page 172)

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Task } from './task';
import { AddTaskDTO } from './task';
import { UpdateTaskDTO } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}
  getTasks() {
    return this.http.get<Task[]>(`${environment.apiBaseUrl}/api/tasks`);
  }

  getTask(taskId: string) {
    return this.http.get<Task>(`${environment.apiBaseUrl}/api/tasks/${taskId}`);
  }

//7.33
  addTask(projectId: number, task: AddTaskDTO) {
    console.log("task.service.ts: add task");
    return this.http.post<Task>(
      `${environment.apiBaseUrl}/api/tasks/${projectId}`,
      task
    );
  }

  updateTask(taskId: string, updateTask: UpdateTaskDTO) {
    console.log(updateTask);
    return this.http.patch<Task>(
      `${environment.apiBaseUrl}/api/tasks/${taskId}`,
      updateTask
    );
  }

  deleteTask(taskId: string) {
    return this.http.delete(`${environment.apiBaseUrl}/api/tasks/${taskId}`);
  }

  getTaskPriorities() {
    return this.http.get<Task[]>(`${environment.apiBaseUrl}/api/tasks/priorities`);

  }
}
