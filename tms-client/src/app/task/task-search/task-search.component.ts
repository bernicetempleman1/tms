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

@Component({
  selector: 'app-task-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="task-search-page">
      <h1 class="task-search-page__title">Search Tasks</h1>

      <div class="task-search-page__filter-container">
        <input type="text" placeholder="Type here" [formControl]="textSearchControl" class="task-search-page__filter"/>

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
                <td class="task-search-page__table-cell">{{ task.dueDate }}</td>
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
    .plant-page {
      max-width: 80%;
      margin: 0 auto;
      padding: 20px;
    }
    .plant-page__title {
      text-align: center;
      color: #563d7c;
    }
    .plant-page__table {
      width: 100%;
      border-collapse: collapse;
    }
    .plant-page__table-header {
      background-color: #FFE484;
      color: #000;
      border: 1px solid black;
      padding: 5px;
      text-align: left;
    }
    .plant-page__table-cell {
      border: 1px solid black;
      padding: 5px;
      text-align: left;
    }
    .plant-page__table-cell--functions {
      text-align: center;
    }
    .plant-page__icon-link {
      cursor: pointer;
      color: #6c757d;
      text-decoration: none;
      margin: 0 5px;
    }
    .plant-page__icon-link:hover {
      color: #000;
    }
    .plant-page__no-plants {
      text-align: center;
      color: #6c757d;
    }
    .plant-page__button {
      background-color: #563d7c;
      color: #ﬀf;
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
    .plant-page__button:hover {
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
      background-color: #dﬀ0d8;
      border-color: #d6e9c6;
    }
    .plant-page__filter-container {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }
    .plant-page__filter {
      flex: 1;
      padding: 0.5rem;
      margin-right: 0.5rem;
    }
    .plant-page__filter-button {
      background-color: #563d7c;
      color: #ﬀf;
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
    .plant-page__filter-button:hover {
      background-color: #6c757d;
    }
    .plant-page__highlight-info {
      text-align: center;
      color: #6c757d;
      margin-bottom: 1rem;
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

  constructor(private taskService: TaskService) {
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
