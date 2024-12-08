// Developer: Meher Salim
// File: task-list.component.ts
// Description: Display all tasks
// Credits: Lean, Mean, and Pragmatic - A Guide to Full-Stack JavaScript Development

import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { Task } from '../task';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  providers: [DatePipe],
  template: `
    <div class="task-search-page">
      <h1 class="task-search-page__title">Search Tasks</h1>

      <div class="task-search-page__filter-container">
        <input type="text" placeholder="Type here" [formControl]="textSearchControl" class="task-search-page__filter"/>

        <p>Want to add or create a task?</p>
        <button class="task-search-page__button" routerLink="/tasks/create">
          Create Task
        </button>

        <div *ngIf="serverMessage" [ngClass]="{
          'message-alert': serverMessageType === 'error',
          'message-success': serverMessageType === 'success'
        }">{{ serverMessage }}</div>

        <div *ngIf="tasks && tasks.length > 0; else noTasks">
          <table class="task-search-page__table">
            <thead class="task-search-page__table-head">
              <tr class="task-search-page__table-row">
                <th class="task-search-page__table-header">Title</th>
                <th class="task-search-page__table-header">Status</th>
                <th class="task-search-page__table-header">Priority</th>
                <th class="task-search-page__table-header">Due Date</th>
                <th class="task-search-page__table-header">Project</th>
              </tr>
            </thead>
            <tbody class="task-search-page__table-body">
              @for (task of tasks; track task) {
              <tr class="task-search-page__table-row">
                <td class="task-search-page__table-cell">{{ task.title }}</td>
                <td class="task-search-page__table-cell">{{ task.status }}</td>
                <td class="task-search-page__table-cell">{{ task.priority }}</td>
                <td class="task-search-page__table-cell">{{ task.dueDate | date: 'short' }}</td>
                <td class="task-search-page__table-cell">{{ task.projectId }}</td>
              </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      <ng-template #noTasks>
        <p class="task-search-page__no-tasks">No tasks found.</p>
      </ng-template>
    </div>
  `,
  styles: `
    .task-search-page {
      padding: 20px;
      font-family: Arial, sans-serif;
      color: #333;
      background-color: #f9f9f9;
    }

    .task-search-page__title {
      font-size: 2rem;
      margin-bottom: 20px;
      color: #1e90ff;
      text-align: center;
    }

    .task-search-page__filter-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-bottom: 30px;
      align-items: center;
    }

    .task-search-page__filter {
      width: 80%;
      max-width: 400px;
      padding: 10px;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .task-search-page__button {
      padding: 10px 15px;
      font-size: 1rem;
      color: white;
      background-color: #563d7c;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      text-transform: uppercase;
      transition: background-color 0.3s ease;
    }

    .task-search-page__button:hover {
      background-color: #0077cc;
    }

    .message-alert {
      color: #d9534f;
      background-color: #f8d7da;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #f5c6cb;
      margin-top: 10px;
      text-align: center;
    }

    .message-success {
      color: #28a745;
      background-color: #d4edda;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #c3e6cb;
      margin-top: 10px;
      text-align: center;
    }

    .task-search-page__table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    .task-search-page__table-head {
      background-color: #FFE484;
      color: #000;
      border: 1px solid black;
      padding: 5px;
      text-align: left;
    }

    .task-search-page__table-header {
      padding: 10px;
      text-align: left;
      font-size: 1rem;
    }

    .task-search-page__table-row {
      border-bottom: 1px solid #ddd;
    }

    .task-search-page__table-cell {
      border: 1px solid black;
      padding: 5px;
      text-align: left;
    }

    .task-search-page__table-row:hover {
      background-color: #f1f1f1;
    }

    .task-search-page__no-tasks {
      font-size: 1.2rem;
      color: #888;
      text-align: center;
      margin-top: 20px;
    }
  `
})

export class TaskSearchComponent {
  textSearchControl = new FormControl ('');
  allTasks: Task[] = [];
  tasks: Task[] = [];
  filterType: string = '';
  serverMessage: string | null = null;
  serverMessageType: 'success' | 'error' | null = null;

  constructor(private taskService: TaskService, private datePipe: DatePipe) {
    this.tasks = this.allTasks;
    
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        this.allTasks = tasks;
        console.log(`Tasks: ${JSON.stringify(this.tasks)}`);
      },
      error: (err: any) => {
        console.error(`Error occurred while retrieving tasks: ${err}`);
        this.tasks = [];
      }
    });

    this.textSearchControl.valueChanges.pipe(debounceTime(500)).subscribe(val => this.filterTasks(val || ''));
  }

  //Filter
  filterTasks(title: string) {
    this.tasks = this.allTasks.filter(g => g.title.toLowerCase().includes(title.toLowerCase()));
  }

  // Message
  private clearMessageAfterDelay() {
    setTimeout(() => {
      this.serverMessage = null;
      this.serverMessageType = null;
    }, 3000);
  }
}
