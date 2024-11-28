//155

import { Component } from '@angular/core';
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

@Component({
  selector: 'app-task-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="task-details-page">
      <h1 class="task-details-page__title">Task Update</h1>
      <h4 class="task-details-page__subtitle">
        Explore the detailed information about your selected task, including
        its type and status.
      </h4>
      <div class="task-details-page__card">
        <form [formGroup]="taskForm" class="task-details-page__form">
          <div class="task-details-page__form-group">
            <label for="title" class="task-details-page__form-label"
              >Task title</label
            >
            <input
              type="text"
              id="title"
              class="task-details-page__form-control"
              formControlName="title"
            />
          </div>
          <div class="task-details-page__form-group">
            <label for="priority" class="task-details-page__form-label"
              >task Priority</label
            >
            <select
              id="priority"
              class="task-details-page__form-control"
              formControlName="priority"
            >
            <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div class="task-details-page__form-group">
            <label for="status" class="task-details-page__form-label"
              >Task Status</label
            >
            <select
              id="status"
              class="task-details-page__form-control"
              formControlName="status"
            >
            <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <button type="submit" class="task-details-page__btn">
            Save Changes
          </button>
        </form>
      </div>
      <br />
      <a class="task-details-page__link" routerLink="/tasks">Return</a>
    </div>
  `,
  styles: ``,
})
export class TaskUpdateComponent {
  taskId: string;
  task: Task;
  taskForm: FormGroup = this.fb.group({
    title: [
      null,
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    priority: [null, Validators.required],
    status: [null, Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {
    this.taskId = this.route.snapshot.paramMap.get('taskId') || '';
    this.task = {} as Task;
    if (this.taskId === '') {
      this.router.navigate(['/tasks']);
      return;
    }
    this.taskService.getTask(this.taskId).subscribe({
      next: (task: Task) => {
        this.task = task;
        this.taskForm.setValue({
          title: task.title,
          priority: task.priority,
          status: task.status,
        });
      },
    });
  }
}

