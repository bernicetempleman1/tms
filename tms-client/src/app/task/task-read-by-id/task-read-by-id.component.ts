//Leah Harris
//task-read-by-id.component
//Description: Find a task and read by id

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from '../task';


@Component({
  selector: 'app-task-read-by-id',
  standalone: true,
  //Add Imports
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="task-details-page">
      <h1 class="task-details-page__title">Search Task</h1>
      <h4 class="task-details-page__subtitle">Explore detailed information about your task.</h4>


      <form [formGroup]="searchForm" class="task-details-page__form" (ngSubmit)="onSubmit()">
        <div class="task-details-page__form-group">
          <label class="task-details-page__form-label" for="taskId">Input Task ID</label>
          <input type="text" id="taskId" class="task-details-page__form-control" formControlName="taskId"/>
        </div>
        <button type="submit" class="task-details-page__btn" (click)="onSubmit()">Search</button>
      </form>



        @if(task) {
          <div class="task-details-page__card">
            <h2>{{ task.title }}</h2>
            <p><strong>Description:</strong> {{ task.description }} </p>
            <p><strong>Status:</strong> {{ task.status }} </p>
            <p><strong>Priority:</strong> {{ task.priority }} </p>
            <p><strong>Due Date:</strong> {{ task.dueDate }} </p>
            <p><strong>Project ID:</strong> {{ task.projectId }} </p>
          </div>
        }
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
    background-color: #452d5e;
  }

  .task-add-page__card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-top: 20px;
  }
  `
})
export class TaskReadByIdComponent {
  searchForm: FormGroup;
  //property to hold task data Initialized as null
  task: Task | null = null;

  //Initialize form
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private taskService: TaskService) {
    this.searchForm = this.fb.group({
      //Require taskId value
      taskId: [null, Validators.required],
    });
  }

  //onSubmit method with button click
  onSubmit(){
    //assign form control value to taskId
    const taskId = this.searchForm.controls['taskId'].value;

    if(!taskId) {
      console.error('No task found');
      return
    }


    if(taskId) {
      //Fetch task data from taskService
      this.taskService.getTask(taskId).subscribe({
        next: (task: Task) => {
          this.task = task;
          console.log('Task Details: ', this.task);
        },
        error: (error) => {
          console.error('Error fetching task details');
        },
      });
    };
  };
};
