/**
 * Author: Bernice Templeman
 * Date: 2 December 2024
 * File: task-read.ts
 * Description: Update task
 *
 */
//Reference: Krasso, R. (2024). Lean, MEAN, and Pragmatic: A Guide to Full-Stack JavaScript Development (page 155}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

//update task component
@Component({
  selector: 'app-task-read',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, FormsModule],
  template: `
    <div class="task-page">
      <h1 class="task-page__title">Task Read</h1>
      <h4 class="task-page__subtitle">
        Read information about your selected task, including its priority and
        status.
      </h4>
      @if (errorMessage) {
      <div class="message message--error">{{ errorMessage }}</div>
      }
      <div class="task-page__card">
        <form [formGroup]="taskForm" class="task-page__form">
          <div class="task-page__form-group">
            <label for="-id" class="task-page__form-label">Task Id</label>
            <input
              type="text"
              id="taskId"
              class="task-page__form-control"
              formControlName="taskId"
              readonly
              value="{{ task._id}}"
            />
          </div>

          <div class="task-page__form-group">
            <label for="title" class="task-page__form-label">Task Title</label>
            <input
              type="text"
              id="title"
              class="task-page__form-control"
              formControlName="title"
              readonly
              value="{{ task.title}}"
            />
          </div>

          <div class="task-page__form-group">
            <label for="description" class="task-page__form-label"
              >Task Description</label
            >
            <input
              type="text"
              id="description"
              class="task-page__form-control"
              formControlName="description"
              value="{{ task.description}}"
              readonly
            />
          </div>

          <div class="task-page__form-group">
            <label
              for="status"
              class="task-page__form-label"
              >Task Status</label
            >
            <input
              id="status"
              class="task-page__form-control"
              formControlName="status"
              readonly
              value="{{ task.status}}"
            />
          </div>

          <div class="task-page__form-group">
            <label
              for="priority"
              class="task-page__form-label"
              >Task Priority</label
            >
            <input
              id="priority"
              class="task-page__form-control"
              required
              formControlName="priority"
              readonly
              value="{{ task.priority}}"
            />
          </div>

          <div class="task-page__form-group">
            <label for="dueDate" class="task-page__form-label"
              >Due Date</label
            >
            <input
              type="text"
              id="dueDate"
              class="task-page__form-control"
              formControlName="dueDate"
              readonly
              value="{{ task.dueDate | date: 'short'}}"
            />
          </div>

          <div class="task-page__form-group">
            <label for="dateCreated" class="task-page__form-label"
              >Date Created</label
            >
            <input
              type="text"
              id="dateCreated"
              class="task-page__form-control"
              formControlName="dateCreated"
              readonly
              value="{{ task.dateCreated | date: 'short'}}"
            />
          </div>

          <div class="task-page__form-group">
            <label for="dateModified" class="task-page__form-label"
              >Date Modified</label
            >
            <input
              type="text"
              id="dateModified"
              class="task-page__form-control"
              formControlName="dateModified"
              readonly
              value="{{ task.dateModified | date: 'short'}}"
            />
          </div>

          <div class="task-page__form-group">
            <label for="projectId" class="task-page__form-label"
              >Project Id</label
            >
            <input
              type="number"
              id="projectId"
              class="task-page__form-control"
              formControlName="projectId"
              readonly
              value="{{ task.projectId}}"
            />
          </div>
        </form>
      </div>
      <br />
      <a class="task-page__link" routerLink="/tasks/read">Return</a>
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
      .task-page__subtitle {
        text-align: center;
        color: #563d7c;
        font-size: 0.9rem;
        font-style: italic;
        margin-bottom: 20px;
      }
      .task-page__card {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin-top: 20px;
      }
      .task-page__form {
        display: flex;
        flex-direction: column;
      }
      .task-page__form-group {
        margin-bottom: 15px;
      }
      .task-page__form-label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
      .task-page__form-control {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }
      .task-page__btn {
        padding: 10px 15px;
        background-color: #563d7c;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        align-self: flex-start;
      }
      .task-page__btn:hover {
        background-color: #452a63;
      }
      .task-page__link {
        color: #563d7c;
        text-decoration: none;
        display: block;
      }
      .task-page__link:hover {
        text-decoration: underline;
      }
      .task-page__table-row:hover {
        background-color: #6c757d;
        color: white;
      }
    `,
  ],
})

// export
export class TaskReadComponent {
  taskId: string;
  task: Task;
  errorMessage: string;
  allTasks: Task[] = [];
  tasks: Task[] = [];
  filterType: string = '';

  taskForm: FormGroup = this.fb.group({
    taskId: [null],
    title: [ null],
    description: [ null],
    priority: [null],
    status: [null],
    dueDate: [null],
    dateCreated: [null],
    dateModified: [null],
    projectId: [
      null,
      Validators.compose([Validators.required]),
    ],
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {
    this.taskId = this.route.snapshot.paramMap.get('taskId') || '';
    this.task = {} as Task;
    this.errorMessage = '';

    if (this.taskId === '') {
      this.router.navigate(['/tasks/read']);
      return;
    }

    // get tasks
    this.taskService.getTask(this.taskId).subscribe({
      next: (task: Task) => {
        this.task = task;
        this.taskForm.setValue({
          taskId: task._id,
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
          dateCreated: task.dateCreated,
          dateModified: task.dateModified,
          projectId: task.projectId

        });
      },
    });
  }
}
