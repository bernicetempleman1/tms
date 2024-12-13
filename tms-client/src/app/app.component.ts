/**
 * Author: Bernice Templeman
 * Date: 2 December 2024
 * File: app.component.spec.ts
 * Description: application component
 *
 */
//Reference: Krasso, R. (2024). Lean, MEAN, and Pragmatic: A Guide to Full-Stack JavaScript Development (page 172)

import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="app">
      <nav class="app__side-menu">
        <div class="app__side-menu-header">
          <h2 class="app__side-menu-title">{{ title }}</h2>
        </div>

        <a class="app__side-menu-link" routerLink="/">Home</a>

        <div
          class="app__side-menu-section"
          (click)="toggleSection($event, 'taskManagement')"
        >
          <div class="app__side-menu-link">Task Management</div>

          @if (sections.taskManagement) {
          <div class="app__side-menu-sub-links">
            @for (link of TaskManagement; track link) {
            <a
              class="app__side-menu-link app__side-menu-sub-link"
              [routerLink]="link.url"
              >{{ link.name }}</a
            >
            }
          </div>
          }
        </div>

        <div
          class="app__side-menu-section"
          (click)="toggleSection($event, 'projectManagement')"
        >
          <div class="app__side-menu-link">Project Management</div>

          @if (sections.projectManagement) {
          <div class="app__side-menu-sub-links">
            @for (link of ProjectManagement; track link) {
            <a
              class="app__side-menu-link app__side-menu-sub-link"
              [routerLink]="link.url"
              >{{ link.name }}</a
            >
            }
          </div>
          }
        </div>

        <div
          class="app__side-menu-section"
          (click)="toggleSection($event, 'taskReports')"
        >
          <div class="app__side-menu-link">Task Reports</div>

          @if (sections.taskReports) {
          <div class="app__side-menu-sub-links">
            @for (link of taskReports; track link) {
            <a
              class="app__side-menu-link app__side-menu-sub-link"
              [routerLink]="link.url"
              >{{ link.name }}</a
            >
            }
          </div>
          }
        </div>

        <div
          class="app__side-menu-section"
          (click)="toggleSection($event, 'projectReports')"
        >
          <div class="app__side-menu-link">Project Reports</div>

          @if (sections.projectReports) {
          <div class="app__side-menu-sub-links">
            @for (link of projectReports; track link) {
            <a
              class="app__side-menu-link app__side-menu-sub-link"
              [routerLink]="link.url"
              >{{ link.name }}</a
            >
            }
          </div>
          }
        </div>

        <a class="app__side-menu-link" routerLink="/support">Support</a>
        <a class="app__side-menu-link" routerLink="/faq">FAQ</a>
      </nav>

      <div class="app__main-content">

        <header class="app__header">
          <div class="app__header-content">
            <div class="app__header-title"></div>
            <h4>Welcome TMS user!</h4>

          </div>

        </header>

        <main class="app__main">
          <router-outlet></router-outlet>
        </main>
      </div>

      <footer class="app__footer">
        &copy; 2024 Task Management System (TMS)
      </footer>

    </div>
  `,
  styles: `
    .app {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      min-width: 200vh;
    }

    .app__side-menu {
      width: 250px;
      background-color: white; /* White background */
      color: #4e4a4a; /* Text color */
      padding: 0;
      height: 100vh;
      position: fixed;
      border-top-right-radius: 8px; /* Rounded top-right corner */
      border-bottom-right-radius: 8px; /* Rounded bottom-right corner */
      box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1); /* Card-like shadow on the right */
    }

    .app__side-menu-header {
      background-color: #20c997; /* Match avatar background color */
      padding: 20px 10px; /* Reverted padding */
      border-bottom: 1px solid #ddd;
    }

    .app__side-menu-title {
      margin: 0;
      color: white; /* White text color */
    }

    .app__side-menu-link {
      display: block;
      padding: 10px 20px;
      color: #4e4a4a; /* Text color */
      text-decoration: none;
      border-bottom: 1px solid #ddd;
    }

    .app__side-menu-link:hover {
      background-color: #f2f5f7; /* Hover background color */
    }

    .app__side-menu-section {
      cursor: pointer;
    }

    .app__side-menu-sub-links {
      padding-left: 20px; /* Indentation for sub-links */
    }

    .app__side-menu-sub-link {
      padding: 5px 20px;
    }

    .app__side-menu-sub-link:hover {
      background-color: #e9ecef; /* Hover background color for sub-links */
    }


    .app__main-content {
      margin-left: 250px; /* Align with the width of the side menu */
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: #f2f5f7; /* Main content background color */
      color: #4e4a4a; /* Text color */
    }

    .app__header {
      background-color: #20c997; /* Header background color */
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-size: auto;
    }

    .app__header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .app__header-title {
      font-size: 1.5em;
      color: white; /* White text color */
    }

    .app__main {
      flex: 1;
      padding: 20px;
    }

    .app__footer {
      text-align: center;
      background-color: white; /* Footer background color */
      color: #4e4a4a; /* Text color */
      padding: 10px;
      margin-top: auto;
      border-top-left-radius: 8px; /* Rounded top-left corner */
      border-top-right-radius: 8px; /* Rounded top-right corner */
      box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1); /* Card-like shadow on the top */
    }

    .lighter-hr {
      border: 0;
      height: 1px;
      background: #e0e0e0;
      background-size: auto;
    }
  `,
})
export class AppComponent {
  title = 'TMS'; // Title of the application displayed in the side menu
  dropdownVisible = false; // Variable to keep track of the visibility of the user dropdown menu

  // Object to keep track of the visibility of the sub-sections in the side menu
  sections: any = {
    projectReports: false,
    taskReports: false,
    projectManagement: false,
    taskManagement: false,
  };

  // Array to hold the task management links in the side menu. Must be an
  TaskManagement = [
    { name: 'Create Task', url: '/tasks/create' },
    { name: 'Read a Task', url: '/tasks/read' },
    { name: 'Update Task', url: '/tasks/update' },
    { name: 'Delete Task', url: '/tasks/delete' },
    { name: 'List All Tasks', url: '/tasks/list' },
    { name: 'Search Tasks', url: '/tasks/search' },
    // Add more reports as needed
  ];

  // Array to hold the task management links in the side menu. Must be an
  ProjectManagement = [
    { name: 'Create Project', url: '/projects/create' },
    { name: 'Read a Project', url: '/projects/read' },
    { name: 'Update Project', url: '/projects/update' },
    { name: 'Delete Project', url: '/projects/delete' },
    { name: 'List All Project', url: '/projects/list' },
    { name: 'Search Project', url: '/projects/search' },
    // Add more reports as needed
  ];

  // Array to hold the sales reports links in the side menu. These links are visible to all users
  taskReports = [
    { name: 'Tasks by Priority', url: '/reports/tasks/tasks-by-priority' },
    // Add more reports as needed
  ];

  projectReports = [
    {
      name: 'Projects by End Date',
      url: '/reports/projects/projects-by-end-date',
    },
    // Add more reports as needed
  ];

  // Function to toggle the user dropdown menu
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  // Function to toggle the visibility of the sub-sections in the side menu
  toggleSection(event: MouseEvent, section: string) {
    const target = event.target as HTMLElement;
    if (
      target.classList.contains('app__side-menu-link') &&
      !target.classList.contains('app__side-menu-sub-link')
    ) {
      this.sections[section] = !this.sections[section];
    }
  }
}
