//Leah Harris
//file: project-search.component.ts
//description: Component to search and filter projects

import { Component } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime, map, of } from 'rxjs';
import { HighlightRecentDirective } from '../highlight-recent.directive';

@Component({
  selector: 'app-project-search',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    HighlightRecentDirective,
  ],

  template: `
   <div class="project-page">
     <h1 class="project-page__title">Project Search</h1>

     <div class="project-page__search-container">
       <input type="text" placeholder="Search project by name" [formControl]="txtSearchControl" class="project-page__search"/>
     </div>

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
      .project-page__table-row:hover {
        background-color: #6c757d;
        color: white;
      }
    `,
  ],
})
export class ProjectSearchComponent {
  //Array for filtered projects
  projects: Project[] = [];
  //array for all projects
  allProjects: Project [] = [];


  //Create a form instance
  txtSearchControl = new FormControl('');

  //Inject project service and fetch data
  constructor(private projectService: ProjectService) {
    this.projectService.getProjects().subscribe({
      next: (projects: Project[]) => {
        this.projects = projects;
        this.allProjects = projects;
        console.log(`Projects: ${JSON.stringify(this.projects)}`);
      },
      //Log error for failed request
      error: (err: any) => {
        console.error(`Error occurred while retrieving projects: ${err}`);
      },
    });

    //Get latest value of textSearchControl with .5 second delay and call the filterProjects method
    this.txtSearchControl.valueChanges.pipe(debounceTime(500)).subscribe(val=> this.filterProjects(val || ''));
  }

  //Method to filter projects by name(case-insensitive)
  filterProjects(name: string) {
    this.projects = this.allProjects.filter(g => g.name.toLowerCase().includes(name.toLowerCase()));
  }
}
