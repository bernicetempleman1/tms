//166
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
//import { environment } from '../../environments/environment';
//import { ErrorHandler } from '@angular/core';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="task-add-page">
      <h1 class="task-add-page__title">Add New Task</h1>
      <h4 class="task-add-page__subtitle">
        Fill in the details to add a new task.
      </h4>
      <div class="task-add-page__card">
        <form [formGroup]="taskForm" class="task-add-page__form">
          <div class="task-add-page__form-group">
            <label for="title" class="task-add-page__form-label"
              >Task Title</label
            >
            <input
              type="text"
              id="title"
              class="task-add-page__form-control"
              formControlName="title"
            />
          </div>

          <div class="task-add-page__form-group">
            <label for="description" class="task-add-page__form-label"
              >Description</label
            >
            <input
              type="text"
              id="description"
              class="task-add-page__form-control"
              formControlName="description"
            />
          </div>

          <div class="task-add-page__form-group">
            <label for="priority" class="task-add-page__form-label"
              >Task Priority</label
            >
            <select
              id="priority"
              class="task-add-page__form-control"
              formControlName="priority"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div class="task-add-page__form-group">
            <label for="status" class="task-add-page__form-label"
              >Task Status</label
            >
            <select
              id="status"
              class="project-add-page__form-control"
              formControlName="status"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div class="task-add-page__form-group">
            <label for="taskId" class="task-add-page__form-label"
              >Project</label
            >
            <select
              id="projectId"
              class="task-add-page__form-control"
              formControlName="projectId"
            >
              @for (project of projects; track project) {
              <option [value]="project.projectId">{{ project.name }}</option>
              }
            </select>
          </div>
          <div class="task-add-page__form-group">
            <label for="dueDate" class="task-add-page__form-label"
              >Due Date</label
            >
            <input
              type="date"
              id="dueDate"
              class="task-add-page__form-control"
              formControlName="dueDate"
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
  styles: `
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
})
export class TaskCreateComponent {
  //errorMessage: string;

  projects: any[] = [];

  taskForm: FormGroup = this.fb.group({
    title: [
      null,
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    description: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    ],
    priority: [null, Validators.required],
    status: [null, Validators.required],
    projectId: [null, Validators.required],
    dueDate: [null, Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private projectService: ProjectService
  ) {
    this.projectService.getProjects().subscribe({
      next: (projects: any) => {
        this.projects = projects;
      },
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log('task-create: add task');
      const projectId = this.taskForm.controls['projectId'].value;
      const dueDate = new Date(
        this.taskForm.controls['dueDate'].value
      ).toISOString();
      const newTask: AddTaskDTO = {
        title: this.taskForm.controls['title'].value,
        description: this.taskForm.controls['description'].value,
        priority: this.taskForm.controls['priority'].value,
        status: this.taskForm.controls['status'].value,
        dueDate: this.taskForm.controls['dueDate'].value,
      };
      console.log('task-create: add task');

      this.taskService.addTask(projectId, newTask).subscribe({
        next: (result: any) => {
          console.log(`Task created successfully: ${result.message}`);
          this.router.navigate(['/tasks']);
        },
        error: (err: any) => {
          console.error('Error creating task', err);
        },
      });
    }
  }
}

//******************** */
/*
  taskForm: FormGroup = this.fb.group({
    title: [
      null,
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    description: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    ],
    priority: [null, Validators.required],
    status: [null, Validators.required],
    projectId: [null, Validators.required],
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    //private taskService: TaskService,
    //private projectService: ProjectService
  ) {
    this.errorMessage = '';
    //this.projectService.getProjects().subscribe({next: (projects: any) => { this.projects = projects;}, });
  }

  addTask() {
    if (!this.taskForm.valid) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    const newTask = {
      title: this.taskForm.controls['title'].value,
      description: this.taskForm.controls['description'].value,
      priority: this.taskForm.controls['priority'].value,
      status: this.taskForm.controls['status'].value,
      dueDate: this.taskForm.controls['dueDate'].value,
      projectId: this.taskForm.controls['projectId'].value,
    };

    console.log('New Task', newTask);

    this.http
      .post(`${environment.apiBaseUrl}/api/tasks/`, {
        task: newTask,
      })
      .subscribe({
        next: (task: Task) => {
          console.log('Task created', task);
          this.router.navigate(['/tasks']);
        },
        error: (error: Error) => {
          console.error('Error creating task', error);
          this.errorMessage = error.message;
        },
      });
  }
}


/************************************************** */
/*
projects: any[] = [];

  taskForm: FormGroup = this.fb.group({
    title: [
      null,
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    description: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    ],
    priority: [null, Validators.required],
    status: [null, Validators.required],
    projectId: [null, Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private taskService: TaskService,
    private projectService: ProjectService
  ) {
    this.projectService.getProjects().subscribe({
      next: (projects: any) => {
        this.projects = projects;
      },
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log('task-create: add task');
      const projectId = this.taskForm.controls['projectId'].value;
      const dueDate = new Date(
        this.taskForm.controls['dueDate'].value
      ).toISOString();
      const newTask: AddTaskDTO = {
        title: this.taskForm.controls['title'].value,
        description: this.taskForm.controls['description'].value,
        priority: this.taskForm.controls['priority'].value,
        status: this.taskForm.controls['status'].value,
        dueDate: this.taskForm.controls['dueDate'].value,
      };
      console.log('task-create: add task');

      this.taskService.addTask(projectId, newTask).subscribe({
        next: (result: any) => {
          console.log(`Task created successfully: ${result.message}`);
          this.router.navigate(['/tasks']);
        },
        error: (err: any) => {
          console.error('Error creating task', err);
        },
      });
    }
  }
}
/************************************************** */

/*
errorMessage: string;

  newUserForm: FormGroup = this.fb.group({
    username: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
    ],
    password: [
      null,
      Validators.compose([
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}'),
      ]),
    ],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    role: [null, Validators.required],
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.errorMessage = '';
  }

  addUser() {
    if (!this.newUserForm.valid) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    const newUser = {
      username: this.newUserForm.value.username,
      passwordHash: this.newUserForm.value.password,
      email: this.newUserForm.value.email,
      role: this.newUserForm.value.role,
    };

    console.log('New User', newUser);

    this.http
      .post(`${environment.apiBaseUrl}/users`, {
        user: newUser,
      })
      .subscribe({
        next: (user) => {
          console.log('User created', user);
          this.router.navigate(['/user-management/users']);
        },
        error: (error) => {
          console.error('Error creating user', error);
          this.errorMessage = error.message;
        },
      });
  }
}

*/
