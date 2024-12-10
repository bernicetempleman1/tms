/**
 * Author: Bernice Templeman
 * Date: 9 December 2024
 * File: project-create.component.spec.ts
 * Description: Create a project
 *
 */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProjectService } from '../project.service';
import { AddProjectDTO } from '../project';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class="project-add-page">
      <h1 class="project-add-page__title">Add New Project</h1>
      <h4 class="project-add-page__subtitle">
        Fill in the details to create a new project.
      </h4>
      @if (errorMessage) {
      <div class="message message--error">{{ errorMessage }}</div>
      }
      <div class="project-add-page__card">
        <form [formGroup]="projectForm" class="project-add-page__form">
          <div class="project-add-page__form-group">
            <label for="name" class="project-add-page__form-label">
              Project Name
            </label>
            <input
              type="text"
              id="name"
              class="project-add-page__form-control"
              formControlName="name"/>
          </div>

          <div class="project-add-page__form-group">
            <label for="description" class="project-add-page__form-label">
              Project Description
            </label>
            <textarea
              id="description"
              rows="10"
              class="project-add-page__form-control"
              formControlName="description"></textarea>
          </div>

          <div class="project-add-page__form-group">
            <label for="startDate" class="project-add-page__form-label">
              Start Date
            </label>
            <input
              type="datetime-local"
              id="startDate"
              class="project-add-page__formcontrol"
              formControlName="startDate"/>
          </div>

          <div class="project-add-page__form-group">
            <label for="endDate" class="project-add-page__form-label">
              End Date
            </label>
            <input
              type="datetime-local"
              id="endDate"
              class="project-add-page__formcontrol"
              formControlName="endDate"/>
          </div>

          <button
            type="submit"
            class="project-add-page__btn"
            (click)="onSubmit()">
            Add Project
          </button>
        </form>
      </div>
      <br />
      <a class="project-add-page__link" routerLink="/projects">Return</a>
    </div>
  `,
  styles: [
    `
      .project-add-page {
        max-width: 80%;
        margin: 0 auto;
        padding: 20px;
      }
      .project-add-page__title {
        text-align: center;
        color: #563d7c;
      }
      .project-add-page__subtitle {
        text-align: center;
        color: #563d7c;
        font-size: 0.9rem;
        font-style: italic;
        margin-bottom: 20px;
      }
      .project-add-page__card {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin-top: 20px;
      }
      .project-add-page__form {
        display: flex;
        flex-direction: column;
      }
      .project-add-page__form-group {
        margin-bottom: 15px;
      }
      .project-add-page__form-label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
      .project-add-page__form-control {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .project-add-page__btn {
        padding: 10px 15px;
        background-color: #563d7c;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        align-self: flex-start;
      }
      .project-add-page__btn:hover {
        background-color: #452a63;
      }
      .project-add-page__link {
        color: #563d7c;
        text-decoration: none;
        display: block;
      }
      .project-add-page__link:hover {
        text-decoration: underline;
      }
    `,
  ],
})

export class ProjectCreateComponent {
  errorMessage: string = '';
  projectForm: FormGroup = this.fb.group({
    name: [
      null,
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    description: [
      null,
      Validators.compose([ Validators.minLength(10)]),
    ],
    startDate: [null],
    endDate: [null],
  });
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private projectService: ProjectService
  ) {}
  onSubmit() {
    if (!this.projectForm.valid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
    if (this.projectForm.valid) {
      const startDate = new Date(
        this.projectForm.controls['startDate'].value
      ).toISOString();
      const endDate = new Date(
        this.projectForm.controls['endDate'].value
      ).toISOString();

      const newProject: AddProjectDTO = {
        name: this.projectForm.controls['name'].value,
        description: this.projectForm.controls['description'].value,
        startDate: this.projectForm.controls['startDate'].value,
        endDate: this.projectForm.controls['endDate'].value,
      };
      console.log('Creating Project', newProject);
      this.projectService.addProject(newProject).subscribe({
        next: (result: any) => {
          console.log(`Project created successfully: ${result.message}`);
          this.router.navigate(['/projects']);
        },
        error: (error) => {
          console.error('Error creating project', error);
        },
      });
    }
  }
}
