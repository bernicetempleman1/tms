//Leah Harris
//file name: project-list.component.ts
//Description: Component to display all projects

import { Component } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
  ],

  template: `
 <div class="project-page">
   <h1 class="project-page__title">Project List</h1>

   @if(projects && projects.length > 0) {
     <table class="project-page__table">
      <thead class="project-page__table-head">
        <tr class="project-page__table-row">
          <th class="project-page__header">Project ID</th>
          <th class="project-page__header">Name</th>
          <th class="project-page__header">Description</th>
          <th class="project-page__header">Start Date</th>
          <th class="project-page__header">End Date</th>
        </tr>
      </thead>

    <tbody class="project-page__table-body">
      @for(project of projects; track project) {
        <tr class="project-page__table-row">
         <td class="project-page__table-cell">{{ project.projectId }}</td>
         <td class="project-page__table-cell">{{ project.name }}</td>
         <td class="project-page__table-cell">{{ project.description }}</td>
         <td class="project-page__table-cell">{{ project.startDate }}</td>
         <td class="project-page__table-cell">{{ project.endDate }}</td>
        </tr>
      }
    </tbody>
    </table>
   } @else {
    <p>No Projects Found</p>
   }
 </div>
  `,
  styles: [
    `
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
      .project-page__table-head {
        background-color: #ffe484;
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

      .project-page__table-row:hover {
        background-color: #6c757d;
        color: white;
      }
    `,
  ],
})
export class ProjectListComponent {
  projects: Project[] = [];
  errorMessage: string = '';

  constructor(private projectService: ProjectService) {
    this.projectService.getProjects().subscribe({
      next: (projects: Project[]) => {
        this.projects = projects;
        console.log(`Projects: ${JSON.stringify(this.projects)}`);
      },
      error: (err: any) => {
        console.error(`Error occurred while retrieving projects: ${err}`);
        this.errorMessage = err.message;
      }
    });
  }
}
