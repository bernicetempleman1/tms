/**
 * Author: Bernice Templeman
 * Date: 2 December 2024
 * File: task-menu-component.ts
 * Description: Tests for Display a project
 *
 */
//Reference: Krasso, R. (2024). Lean, MEAN, and Pragmatic: A Guide to Full-Stack JavaScript Development (page 172)
// 183
import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, of } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="task-page">
      <h1 class="task-page__title">Task Menu</h1>
      <div class="task-page__search-container">
        <input
          type="text"
          placeholder="Search tasks by title"
          [formControl]="txtSearchControl"
          class="project-page__search"
        />
      </div>

      <button class="task-page__button" routerLink="/tasks/create">
        Add Task
      </button>

      <button class="task-page__button" routerLink="/tasks/update">
        Update Task
      </button>

      <button class="task-page__button" routerLink="/tasks/delete">
        Delete Task
      </button>

      <button class="task-page__button" routerLink="/tasks/read">
        Task Details
      </button>

      <button class="task-page__button" routerLink="/tasks/list">
        List All Tasks
      </button>

      <button class="task-page__button" routerLink="/tasks/search">
        Search Tasks
      </button>

      @if (serverMessage) {
      <div
        [ngClass]="{
          'message-alert': serverMessageType === 'error',
          'message-success': serverMessageType === 'success'
        }"
      >
        {{ serverMessage }}
      </div>
      } @if (tasks && tasks.length > 0) {
      <table class="task-page__table">
        <thead class="task-page__table-head">
          <tr class="task-page__table-row">
            <th class="task-page__table-header">Task ID</th>
            <th class="task-page__table-header">Title</th>
          </tr>
        </thead>
        <tbody class="task-page__table-body">
          @for (task of tasks; track task) {
          <tr>
            <td class="task-page__table-cell">{{ task._id }}</td>
            <td class="task-page__table-cell">{{ task.title }}</td>
          </tr>
          }
        </tbody>
      </table>
      } @else {
      <p class="task-page__no-tasks">No tasks found, consider adding one...</p>
      }
    </div>
  `,
  styles: `
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
background-color: #FFE484;
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
color: #6c757d;
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
`,
})
export class TaskMenuComponent {
  allTasks: Task[] = [];
  tasks: Task[] = [];
  filterType: string = '';
  serverMessage: string | null = null;
  serverMessageType: 'success' | 'error' | null = null;
  txtSearchControl = new FormControl('');

  constructor(private taskService: TaskService) {
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        this.allTasks = tasks;
        console.log(`tasks: ${JSON.stringify(this.tasks)}`);
      },
      error: (err: any) => {
        console.error(`Error occurred while retrieving tasks: ${err}`);
        this.tasks = [];
      },
    });

    this.txtSearchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((val) => this.filterTasks(val || ''));
  }

  filterTasks(title: string) {
    this.tasks = this.allTasks.filter((p) =>
      p.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  private clearMessageAfterDelay() {
    setTimeout(() => {
      this.serverMessage = null;
      this.serverMessageType = null;
    }, 3000);
  }
}
