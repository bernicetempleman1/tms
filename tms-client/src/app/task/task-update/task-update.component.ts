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
import { UpdateTaskDTO } from '../task';

@Component({
  selector: 'app-task-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="task-details-page">
      <h1 class="task-details-page__title">Task Update</h1>
      <h4 class="task-details-page__subtitle">
        Explore the detailed information about your selected task, including its
        priority and status.
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
              >Task Priority</label
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
  styles: `
.task-details-page {
max-width: 80%;
margin: 0 auto;
padding: 20px;
}
.task-details-page__title {
text-align: center;
color: #563d7c;
}
.task-details-page__subtitle {
text-align: center;
color: #563d7c;
font-size: 0.9rem;
font-style: italic;
margin-bottom: 20px;
}
.task-details-page__card {
background: #fff;
border-radius: 8px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
padding: 20px;
margin-top: 20px;
}
.task-details-page__form {
display: flex;
flex-direction: column;
}
.task-details-page__form-group {
  margin-bottom: 15px;
}
.task-details-page__form-label {
display: block;
margin-bottom: 5px;
font-weight: bold;
}
.task-details-page__form-control {
width: 100%;
padding: 8px;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
}
.task-details-page__btn {
padding: 10px 15px;
background-color: #563d7c;
color: #fff;
border: none;
border-radius: 4px;
cursor: pointer;
align-self: flex-start;
}
.task-details-page__btn:hover {
background-color: #452a63;
}
.task-details-page__link {
color: #563d7c;
text-decoration: none;
display: block;
}
.task-details-page__link:hover {
text-decoration: underline;
}
  `,
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
  onSubmit() {
    if (this.taskForm.valid) {
      const updateTaskDTO = {
        title: this.taskForm.controls['title'].value,
        status: this.taskForm.controls['status'].value,
        priority: this.taskForm.controls['priority'].value,

      };
      console.log('Update Task DTO:', updateTaskDTO);
      this.taskService.updateTask(this.taskId, updateTaskDTO).subscribe({
        next: (result: any) => {
          console.log(`TaskId: ${result.taskId} ${result.message}`);
          this.router.navigate(['/tasks']);
        },
        error: (err: any) => {
          console.error('Error updating task', err);
        },
      });
    } else {
      console.log('Not valid task');
    }
  }
}
