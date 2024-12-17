//Leah Harris
//Component to delete tasks
//Ref: Lean, Mean and Pragmatic Textbook

import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-delete',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="task-page">
      <h1 class="task-page__title">Delete Tasks</h1>

      @if(tasks && tasks.length > 0) {
      <table class="task-page__table">
        <thead class="task-page__table-head">
          <tr class="task-page__table-row">
            <th class="task-page__table-header">Title</th>
            <th class="task-page__table-header">Description</th>
            <th class="task-page__table-header">Status</th>
            <th class="task-page__table-header">Priority</th>
            <th class="task-page__table-header">Due Date</th>
            <th class="task-page__table-header">Project ID</th>
            <th class="task-page__table-header">Function</th>
          </tr>
        </thead>

        <tbody class="task-page__table-body">
          <tr *ngFor="let task of tasks" class="task-page__table-row">
            <td class="task-page__table-cell">{{ task.title }}</td>
            <td class="task-page__table-cell">{{ task.description }}</td>
            <td class="task-page__table-cell">{{ task.status }}</td>
            <td class="task-page__table-cell">{{ task.priority }}</td>
            <td class="task-page__table-cell">{{ task.dueDate | date: 'shortDate' }}</td>
            <td class="task-page__table-cell">{{ task.projectId }}</td>
            <td class="task-page__table-cell task-page__cell--functions">
              <a (click)="deleteTask(task._id)" class="task-page__icon-link"
                ><i class="fas fa-trash-alt"></i
              ></a>
            </td>
          </tr>
        </tbody>
      </table>
      } @else {
      <p class="task-page__no-tasks">No tasks found...</p>
      }
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
        width: 100%;
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
      .task-page__icon-link {
        cursor: pointer;
        color: green;
        text-decoration: none;
        margin: 0 5px;
      }
      .task-page__icon-link:hover {
        color: #000;
      }
      .task-page__no-tasks {
        text-align: center;
        color: #6c757d;
      }
      .task-page__button {
        background-color: #563d7c;
        color: #fff;
        border: none;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        margin: 10px 2px;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s;
      }
      .task-page__button:hover {
        background-color: #6c757d;
      }
      .message-alert {
        padding: 15px;
        margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;
        color: #a94442;
        background-color: #f2dede;
        border-color: #ebccd1;
      }
      .message-success {
        padding: 15px;
        margin-bottom: 20px;
        border: 1px solid transparent;
        border-radius: 4px;
        color: #3c763d;
        background-color: #dff0d8;
        border-color: #d6e9c6;
      }
      .task-page__filter-container {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
      }
      .task-page__filter {
        flex: 1;
        padding: 0.5rem;
        margin-right: 0.5rem;
      }
      .task-page__filter-button {
        background-color: #563d7c;
        color: #fff;
        border: none;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        margin: 10px 2px;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s;
      }
      .task-page__filter-button:hover {
        background-color: #6c757d;
      }
      .task-page__highlight-info {
        text-align: center;
        color: #6c757d;
        margin-bottom: 1rem;
      }
      .task-page__table-row:hover {
        background-color: #6c757d;
        color: white;
      }
    `,
  ],
})
export class TaskDeleteComponent {
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

  deleteTask(taskId: string) {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        console.log(`Task with ID ${taskId} was deleted successfully`);
        this.tasks = this.tasks.filter((g) => g._id !== taskId);
      },
      error: (err: any) => {
        console.error(
          `Error occurred while deleting task with ID ${taskId}: ${err}`
        );
      },
    });
  }
}
