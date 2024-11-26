import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../task.service';
import { AddTaskDTO } from '../task';

@Component({
 selector: 'app-task-create',
 standalone: true,
 imports: [ReactiveFormsModule, CommonModule, RouterLink],
 template: `
 <div class="task-create-page">
 <h1 class="task-create-page__title">Create New Task</h1>
 <h4 class="task-create-page__subtitle">Fill in the details to create a new task.</h4>

 <div class="task-create-page__card">
 <form [formGroup]="taskForm" class="task-create-page__form">
 <div class="task-create-page__form-group">
 <label for="name" class="task-create-page__form-label">Task Name</label>
 <input type="text" id="name" class="task-create-page__form-control" formControlName="name">
 </div>
 <div class="task-create-page__form-group">
 <label for="location" class="task-create-page__form-label">Task Location</label>
 <input type="text" id="location" class="task-create-page__form-control" formControlName="location">
 </div>
 <div class="task-create-page__form-group">
 <label for="description" class="task-create-page__form-label">Task Description</label>
 <textarea id="description" rows="10" class="task-create-page__form-control" formControlName="description"></textarea>
 </div>
 <div class="task-create-page__form-group">
 <label for="dateCreated" class="task-create-page__form-label">Date Created</label>
 <input type="datetime-local" id="dateCreated" class="task-create-page__formcontrol" formControlName="dateCreated">
 </div>
 <button type="submit" class="task-create-page__btn" (click)="onSubmit()">Add Task</button>
 </form>
 </div>
 <br />
 <a class="task-create-page__link" routerLink="/tasks">Return</a>
 </div>
 `,
 styles: `
 .task-create-page {
 max-width: 80%;
 margin: 0 auto;
 padding: 20px;

 .task-create-page__title {
 text-align: center;
 color: #563d7c;
 }
 .task-create-page__subtitle {
 text-align: center;
 color: #563d7c;
 font-size: .9rem;
 font-style: italic;
 margin-bottom: 20px;
 }
 .task-create-page__card {
 background: #fff;
 border-radius: 8px;
 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
 padding: 20px;
 margin-top: 20px;
 }
 .task-create-page__form {
 display: flex;
 flex-direction: column;
 }
 .task-create-page__f
 form-group {
 margin-bottom: 15px;
 }
 .task-create-page__form-label {
 display: block;
 margin-bottom: 5px;
 font-weight: bold;
 }
 .task-create-page__form-control {
 width: 100%;
 padding: 8px;
 border: 1px solid #ccc;
 border-radius: 4px;
 }
 .task-create-page__btn {
 padding: 10px 15px;
 background-color: #563d7c;
 color: #fff;
 border: none;
 border-radius: 4px;
 cursor: pointer;
 align-self: flex-start;
 }
 .task-create-page__btn:hover {
 background-color: #452a63;
 }
 .task-create-page__link {
 color: #563d7c;
 text-decoration: none;
 display: block;
 }
 .task-create-page__link:hover {
 text-decoration: underline;
 }
 `
})

export class TaskCreateComponent {

 taskForm: FormGroup = this.fb.group({
 name: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
 location: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
 description: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
 dateCreated: [null, Validators.required]
 });
 constructor(private fb: FormBuilder, private router: Router, private taskService:
TaskService) {}
 onSubmit() {
 if (this.taskForm.valid) {
 const dateCreated = new
Date(this.taskForm.controls['dateCreated'].value).toISOString();
 const newTask: AddTaskDTO = {
 name: this.taskForm.controls['name'].value,
 location: this.taskForm.controls['location'].value,
 description: this.taskForm.controls['description'].value,
 dateCreated: dateCreated
 };
 console.log('Creating Task', newTask);
 this.taskService.addTask(newTask).subscribe({
 next: (result: any) => {
 console.log(`Task created successfully: ${result.message}`);
 this.router.navigate(['/tasks']);
 }
 error: (error) => {
 console.error('Error creating task', error);
 }
 });
 }
 }
}
