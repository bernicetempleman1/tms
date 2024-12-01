//page 172
import { Component } from '@angular/core';

import { ProjectService } from '../project.service';
import { Project } from '../project';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime, map, of } from 'rxjs';

@Component({
  selector: 'app-project-delete',
  standalone: true,


/*
   _id: "650c1f1e1c9d440000a1b1c1",
    name: "Project Alpha",
    description: "Initial phase of the project",
    startDate: "2021-01-01T00:00:00.000Z",
    endDate: "2021-06-01T00:00:00.000Z",
    dateCreated: "2021-01-01T00:00:00.000Z",
    dateModified: "2021-01-05T00:00:00.000Z",
    projectId: "1",

  */

  imports: [RouterLink, CommonModule, ReactiveFormsModule],

  template: `
    <div class="project-page">
      <h1 class="project-page__title">Project Menu</h1>

      <div class="project-page__search-container">
        <input
          type="text"
          placeholder="Search projects by name"
          [formControl]="txtSearchControl"
          class="project-page__search"
        />
      </div>

      <button class="project-page__button" routerLink="/projects/create">
        Add Project
      </button>

      <button class="project-page__button" routerLink="/projects/update">
        Update Project
      </button>

      <button class="project-page__button" routerLink="/projects/delete">
        Delete Project
      </button>

      <button class="project-page__button" routerLink="/projects/read">
        Project Details
      </button>

      <button class="project-page__button" routerLink="/projects/list">
        List All Projects
      </button>

      @if (serverMessage) {
      <div
        [ngClass]="{
          'message-alert': serverMessageType === 'error',
          'message-success': serverMessageType === 'success'
        }"
      >
        {{ serverMessage }}
      </div>
      } @if (projects.length > 0) {
      <table class="project-page__table">
        <thead class="project-page__table-head">
          <tr class="project-page__table-row">
            <th class="project-page__table-header">Project ID</th>
            <th class="project-page__table-header">Name</th>
            <th class="project-page__table-header">Description</th>
            <th class="project-page__table-header">Date Created</th>
            <th class="task-page__table-header">Functions</th>
          </tr>
        </thead>
        <tbody class="project-page__table-body">
          @for (project of projects; track project) {
          <tr class="project-page__table-row">
            <td class="project-page__table-cell">{{ project.projectId }}</td>
            <td class="project-page__table-cell">{{ project.name }}</td>
            <td class="project-page__table-cell">{{ project.description }}</td>
            <td class="project-page__table-cell">{{ project.dateCreated }}</td>
            <td
              class="project-page__table-cell project-page__table-cell--functions"
            >

              <a
                (click)="deleteProject(project.projectId)"
                class="project-page__icon-link"
                ><i class="fas fa-trash-alt"></i
              ></a>
            </td>
          </tr>
          }
        </tbody>
      </table>
      } @else {
      <p class="project-page__no-projects">
        No projects found, consider adding one...
      </p>
      }
    </div>
  `,
  styles: `
.project-page {
max-width: 80%;
margin: 0 auto;
padding: 20px;
}
.project-page__title {
text-align: center;
color: #563d7c;
}
.project-page__table {
width: 100%;
border-collapse: collapse;
}
.project-page__table-header {
background-color: #FFE484;
color: #000;
border: 1px solid black;
padding: 5px;
text-align: left;
}

.project-page__table-cell {
border: 1px solid black;
padding: 5px;
text-align: left;
}
.project-page__table-cell--functions {
text-align: center;
}
.project-page__icon-link {
cursor: pointer;
color: #6c757d;
text-decoration: none;
margin: 0 5px;
}
.project-page__icon-link:hover {
color: #000;
}
.project-page__no-projects {
text-align: center;
color: #6c757d;
}
.project-page__button {
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
.project-page__button:hover {
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
.project-page__search-container {
display: flex;
align-items: center;
margin-bottom: 1rem;
}
.project-page__search {
flex: 1;
padding: 0.5rem;
margin-right: 0.5rem;
}
`,
})


export class ProjectDeleteComponent {
  projects: Project[] = [];
  allProjects: Project[] = [];
  serverMessage: string | null = null;
  serverMessageType: 'success' | 'error' | null = null;

  txtSearchControl = new FormControl('');

  constructor(private projectService: ProjectService) {
    this.projectService.getProjects().subscribe({
      next: (projects: Project[]) => {
        this.projects = projects;
        this.allProjects = projects;
        console.log(`Projects: ${JSON.stringify(this.projects)}`);
      },
      error: (err: any) => {
        console.error(`Error occurred while retrieving projects: ${err}`);
      },
    });

    this.txtSearchControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((val) => this.filterProjects(val || ''));
  }

  filterProjects(name: string) {
    this.projects = this.allProjects.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // delete project
  deleteProject(projectId: number) {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    this.projectService.deleteProject(projectId).subscribe({
      next: () => {
        console.log(`Project with ID ${projectId} deleted successfully`);
        this.projects = this.projects.filter((g) => g.projectId !== projectId);
        this.serverMessageType = 'success';
        this.serverMessage = `Project with ID ${projectId} deleted successfully`;
        this.clearMessageAfterDelay();
      },
      error: (err: any) => {
        console.error(
          `Error occurred while deleting project with ID ${projectId}: ${err}`
        );
        this.serverMessageType = 'error';
        this.serverMessage = `Error occurred while deleting project with ID ${projectId}. Please
  try again later.`;
        this.clearMessageAfterDelay();
      },
    });
  }

  private clearMessageAfterDelay() {
    setTimeout(() => {
      this.serverMessage = null;
      this.serverMessageType = null;
    }, 3000);
  }
}

