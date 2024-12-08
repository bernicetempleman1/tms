// Developer: Meher Salim
// File: task-list.component.ts
// Description: Display all tasks
// Credits: Lean, Mean, and Pragmatic - A Guide to Full-Stack JavaScript Development

import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="task-page">
      <h1 class="task-page__title">Task List</h1>

      <table *ngIf="tasks && tasks.length > 0" class="task-page__table">
        <thead class="task-page__table-head">
          <tr class="task-page__table-row">
            <th class="task-page__table-header">Title</th>
            <th class="task-page__table-header">Status</th>
            <th class="task-page__table-header">Priority</th>
            <th class="task-page__table-header">Due Date</th>
            <th class="task-page__table-header">Project ID</th>
          </tr>
        </thead>
        <tbody class="task-page__table-body">
          <tr *ngFor="let task of tasks" class="task-page__table-row">
            <td class="task-page__table-cell">{{ task.title }}</td>
            <td class="task-page__table-cell">{{ task.status }}</td>
            <td class="task-page__table-cell">{{ task.priority }}</td>
            <td class="task-page__table-cell">{{ task.dueDate }}</td>
            <td class="task-page__table-cell">{{ task.projectId }}</td>
          </tr>
        </tbody>
      </table>
      <p *ngIf="!tasks || tasks.length === 0" class="task-page__no-tasks">
        No tasks found.
      </p>
    </div>
  `,
  styles: [
    `
      .task-page {
        max-width: 80%;
        margin: 0 auto;
        padding: 20px;
      }
      .task-page__title {
        text-align: center;
        color: #563d7c;
      }
      .task-page__table {
        width: 80%;
        margin: 1;
        border-collapse: collapse;
      }
      .task-page__table-header {
        background-color: #ffe484;
        color: #000;
        border: 1px solid black;
        padding: 5px;
        text-align: left;
      }
      .task-page__table-cell {
        border: 1px solid black;
        padding: 5px;
        text-align: left;
      }
      .task-page__table-cell--functions {
        text-align: center;
      }
      .task-page__no-tasks {
        text-align: center;
        color: #6c757d;
      }
      .task-page__table-row:hover {
        background-color: #6c757d;
        color: white;
      }
    `,
  ],
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        console.log(`Tasks: ${JSON.stringify(this.tasks)}`);
      },
      error: (err: any) => {
        console.error(`Error occurred while retrieving tasks: ${err}`);
        this.tasks = [];
      },
    });
  }
}
