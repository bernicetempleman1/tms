
import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';
import { Task } from '../task';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { HighlightRecentDirective } from '../highlight-recent.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-read-menu',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    HighlightRecentDirective,
    FormsModule,
  ],
  providers: [DatePipe],
  template: `
    <div class="task-page">
      <h1 class="task-page__title">Task Read Menu</h1>

      <button class="task-page__button" routerLink="/tasks/read/details">Search and Read Task by Task Id</button>

      <div class="task-page__filter-container">
        <input
          type="text"
          placeholder="Filter by task name"
          [formControl]="textSearchControl"
          class="task-page__filter"
        />
      </div>

      <div
        *ngIf="serverMessage"
        [ngClass]="{
          'message-alert': serverMessageType === 'error',
          'message-success': serverMessageType === 'success'
        }"
      >
        {{ serverMessage }}
      </div>

      <div *ngIf="tasks && tasks.length > 0; else noTasks">
        <table class="task-page__table">
          <thead class="task-page__table-head">
            <tr class="task-page__table-row">
              <th class="task-page__table-header">Title</th>
              <th class="task-page__table-header">Task Id</th>
              <th class="task-page__table-header">Read</th>
            </tr>
          </thead>
          <tbody class="task-page__table-body">
            @for (task of tasks; track task) {
            <tr class="task-page__table-row">
                <td class="task-page__table-cell">{{ task.title }}</td>
                <td class="task-page__table-cell">{{ task._id }}</td>
                <td class="task-page__table-cell task-page__table-cell--functions">
                <a
                  routerLink="/tasks/read/{{ task._id }}"
                  class="task-page__iconlink"
                  ><i class="fas fa-sticky-note" ></i
                ></a>
              </td>
            </tr>
            }
          </tbody>
        </table>
      </div>

      <ng-template #noTasks>
        <p class="task-search-page__no-tasks">No tasks found.</p>
      </ng-template>
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
      .task-page__table-row:hover {
        background-color: #6c757d;
        color: white;
      }
    `,
  ],
})
export class TaskReadMenuComponent {
  textSearchControl = new FormControl('');
  allTasks: Task[] = [];
  tasks: Task[] = [];
  filterType: string = '';
  serverMessage: string | null = null;
  serverMessageType: 'success' | 'error' | null = null;
  filterPriority: string = ''; //added by BT
  filterStatus: string = ''; // added by BT

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
      },
    });

    this.textSearchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((val) => this.filterTasks(val || ''));
  }

  //Filter
  filterTasks(title: string) {
    this.tasks = this.allTasks.filter((g) =>
      g.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  // Message
  private clearMessageAfterDelay() {
    setTimeout(() => {
      this.serverMessage = null;
      this.serverMessageType = null;
    }, 3000);
  }
}
