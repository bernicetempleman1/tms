/**
 * Author: Bernice Templeman
 * Date: 2 December 2024
 * File: task-create-component.ts
 * Description: Create a Task
 *
 */
//Reference: Krasso, R. (2024). Lean, MEAN, and Pragmatic: A Guide to Full-Stack JavaScript Development (page 166)
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../task.service';
import { Project } from '../../project/project';
import { ProjectService } from '../../project/project.service';
import { AddTaskDTO } from '../task';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="task-add-page">
      <h1 class="task-add-page__title">Add New Task</h1>
      <h4 class="task-add-page__subtitle">
        Fill in the details to add a new task.
      </h4>
      @if (errorMessage) {
      <div class="message message--error">{{ errorMessage }}</div>
      }

      <div class="task-add-page__card">
        <form [formGroup]="taskForm" class="task-add-page__form">
          <div class="task-add-page__form-group">
            <label
              for="title"
              class="task-add-page__form-label"
              title="Must be 3 or more characters"
              >Task Title<span class="required">*</span></label
            >
            <input
              type="text"
              id="title"
              class="task-add-page__form-control"
              formControlName="title"
              required
              placeholder="Enter the title of the task: 3+ characters"
            />
          </div>

          <div class="task-add-page__form-group">
            <label
              for="description"
              class="task-add-page__form-label"
              title="Must be 3 or more characters"
              >Description<span class="required">*</span></label
            >
            <input
              type="text"
              id="description"
              class="task-add-page__form-control"
              formControlName="description"
              placeholder="Enter a description of the project: 3+ characters"
              required
            />
          </div>

          <div class="task-add-page__form-group">
            <label
              for="status"
              class="task-add-page__form-label"
              title="Select a Status"
              >Task Status<span class="required">*</span></label
            >
            <select
              id="status"
              class="task-add-page__form-control"
              formControlName="status"
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div class="task-add-page__form-group">
            <label
              for="priority"
              class="task-add-page__form-label"
              title="Select a Priority"
              >Task Priority<span class="required">*</span></label
            >
            <select
              id="priority"
              class="task-add-page__form-control"
              formControlName="priority"
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div class="task-add-page__form-group">
            <label
              for="projectId"
              class="task-add-page__form-label"
              title="Select the Project this task belongs to"
              >Project<span class="required">*</span></label
            >
            <select
              id="projectId"
              class="task-add-page__form-control"
              formControlName="projectId"
              required
            >
              @for (project of projects; track project) {
              <option [value]="project.projectId">{{ project.name }}</option>
              }
            </select>
          </div>

          <div class="task-add-page__form-group">
            <label
              for="dueDate"
              class="task-add-page__form-label"
              title="Select a due date"
              >Due Date<span class="required">*</span></label
            >
            <input
              type="date"
              id="dueDate"
              class="task-add-page__form-control"
              formControlName="dueDate"
              required
            />
          </div>

          <button type="submit" (click)="onSubmit()" class="task-add-page__btn">
            Add Task
          </button>
        </form>
      </div>
      <br />
      <a class="task-add-page__link" routerLink="/tasks">Return</a>
    </div>
  `,
  styles: [
    `
      .task-add-page {
        max-width: 80%;
        margin: 0 auto;
        padding: 20px;
      }
      .task-add-page__title {
        text-align: center;
        color: #563d7c;
      }
      .task-add-page__subtitle {
        text-align: center;
        color: #563d7c;
        font-size: 0.9rem;
        font-style: italic;
        margin-bottom: 20px;
      }
      .task-add-page__card {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin-top: 20px;
      }
      .task-add-page__form {
        display: flex;
        flex-direction: column;
      }
      .task-add-page__form-group {
        margin-bottom: 15px;
      }
      .task-add-page__form-label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
      .task-add-page__form-control {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }
      .task-add-page__btn {
        padding: 10px 15px;
        background-color: #563d7c;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        align-self: flex-start;
      }
      .task-add-page__btn:hover {
        background-color: #452d5e;
      }
      .task-add-page__link {
        color: #563d7c;
        text-decoration: none;
        display: block;
      }
      .task-add-page__link:hover {
        text-decoration: underline;
      }
    `,
  ],
})
//export
export class TaskCreateComponent {
  errorMessage: string = '';

  projects: any[] = [];

  taskForm: FormGroup = this.fb.group({
    title: [
      null,
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    description: [
      null,
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    priority: [null, Validators.required],
    status: [null, Validators.required],
    dueDate: [null, Validators.required],
    projectId: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private projectService: ProjectService
  ) {
    this.errorMessage = '';
    this.projectService.getProjects().subscribe({
      next: (projects: any) => {
        this.projects = projects;
      },
    });
  }

  onSubmit() {
    //check if not valid
    if (!this.taskForm.valid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
    //if valid
    if (this.taskForm.valid) {
      console.log('task-create: add task');
      const projectId = this.taskForm.controls['projectId'].value;
      const dueDate = new Date(
        this.taskForm.controls['dueDate'].value
      ).toISOString();
      const newTask: AddTaskDTO = {
        title: this.taskForm.controls['title'].value,
        description: this.taskForm.controls['description'].value,
        status: this.taskForm.controls['status'].value,
        priority: this.taskForm.controls['priority'].value,
        dueDate: this.taskForm.controls['dueDate'].value,
      };
      console.log('task-create: add task');

      //call task service to add task
      this.taskService.addTask(projectId, newTask).subscribe({
        next: (result: any) => {
          console.log(`Task created successfully: ${result.message}`);
          this.router.navigate(['/tasks']);
        },
        error: (err: any) => {
          console.error('Error creating task', err);
        },
      });
    } else {
      console.error('Error creating task. task-create: form not valid');
    }
  }
}
