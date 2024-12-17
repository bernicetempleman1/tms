// Developer: Meher Salim
// File: project-update.component.ts
// Description: Update project details
// Credits:
//    Lean, Mean, and Pragmatic - A Guide to Full-Stack JavaScript Development
//    Bernice Templeman

import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project, UpdateProjectDTO } from '../project';

@Component({
  selector: 'app-project-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],

  template: `
    <div class="project-details-page">

      <h1 class="project-details-page__title">Project Update</h1>

      <h4 class="project-details-page__subtitle">
        Explore the detailed information about your selected project, 
        including its location, plants, and maintenance schedule.
      </h4>

      <div class="project-details-page__card">
        <form [formGroup]="projectForm" class="project-details-page__form">
          <div class="project-details-page__form-group">
            <label for="name" class="project-details-page__form-label">Project Name</label>
            <input type="text" id="name" class="project-details-page__form-control" formControlName="name"/>
          </div>

          <div class="project-details-page__form-group">
            <label for="description" class="project-details-page__form-label">Project Description</label>
            <textarea id="description" rows="10" class="project-details-page__form-control" formControlName="description"></textarea>
          </div>

          <button type="submit" class="project-details-page__btn" (click)="onSubmit()">Save Changes</button>
        </form>
      </div>

      <br />

      <a class="project-details-page__link" routerLink="/projects">Return</a>
    </div>
  `,
  styles: [
    `
      .project-details-page {
        max-width: 80%;
        margin: 0 auto;
        padding: 20px;
      }
      .project-details-page__title {
        text-align: center;
        color: #563d7c;
      }
      .project-details-page__subtitle {
        text-align: center;
        color: #563d7c;
        font-size: 0.9rem;
        font-style: italic;
        margin-bottom: 20px;
      }
      .project-details-page__card {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin-top: 20px;
      }
      .project-details-page__form {
        display: flex;
        flex-direction: column;
      }
      .project-details-page__form-group {
        margin-bottom: 15px;
      }
      .project-details-page__form-label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
      }
      .project-details-page__form-control {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .project-details-page__btn {
        padding: 10px 15px;
        background-color: #563d7c;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        align-self: flex-start;
      }
      .project-details-page__btn:hover {
        background-color: #452a63;
      }
      .project-details-page__link {
        color: #563d7c;
        text-decoration: none;
        display: block;
      }
      .project-details-page__link:hover {
        text-decoration: underline;
      }
      .project-page__table-row:hover {
        background-color: #6c757d;
        color: white;
      }
    `,
  ],
})
export class ProjectUpdateComponent {
  projectId: number;
  project: Project;

  projectForm: FormGroup = this.fb.group({
    name: [ null, Validators.compose([Validators.required, Validators.minLength(3)])],
    description: [ null, Validators.compose([Validators.required, Validators.minLength(10)])],
  });

  constructor( private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private projectService: ProjectService ) {
    let l_projectId = this.route.snapshot.paramMap.get('projectId') || '';
    this.projectId = parseInt(l_projectId, 10);
    this.project = {} as Project;

    console.log('Project ID', this.projectId);

    if (isNaN(this.projectId)) {
      this.router.navigate(['/projects']);
      return;
    }

    this.projectService.getProject(this.projectId).subscribe({
      next: (project: Project) => {
        if (!project) {
          this.router.navigate(['/projects']);
          return;
        }
        
        this.project = project;
        console.log('Project Details', this.project);
      },
      error: (error) => {
        console.error('Error fetching project details', error);
      },
      complete: () => {
        this.projectForm.controls['name'].setValue(this.project.name);
        this.projectForm.controls['description'].setValue(this.project.description);
      }
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      let l_project: UpdateProjectDTO = {
        name: this.projectForm.controls['name'].value,
        description: this.projectForm.controls['description'].value,
      };

      console.log('Updating Project', l_project);

      this.projectService.updateProject(l_project, this.projectId).subscribe({
        next: (result: any) => {
          console.log(`ProjectId: ${result.projectId} ${result.message}`);
          this.router.navigate(['/projects']);
        },
        error: (error) => {
          console.error('Error updating project', error);
        }
      });
    }
  }
}
