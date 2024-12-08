/**
 * Author: Bernice Templeman
 * Date: 2 December 2024
 * File: app.routes.ts
 * Description: application routes
 *
 */
//Reference: Krasso, R. (2024). Lean, MEAN, and Pragmatic: A Guide to Full-Stack JavaScript Development (page 172)


import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { ProjectReadByIdComponent } from './project/project-read-by-id/project-read-by-id.component';
import { ProjectDeleteComponent } from './project/project-delete/project-delete.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectSearchComponent } from './project/project-search/project-search.component';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { ProjectUpdateComponent } from './project/project-update/project-update.component';
import { ProjectUpdateMenuComponent } from './project/project-update-menu/project-update-menu.component';
import { ProjectReadMenuComponent } from './project/project-read-menu/project-read-menu.component';

import { TaskCreateComponent } from './task/task-create/task-create.component';
import { TaskUpdateMenuComponent } from './task/task-update-menu/task-update-menu.component';
import { TaskUpdateComponent } from './task/task-update/task-update.component';
import { TaskDeleteComponent } from './task/task-delete/task-delete.component';
import { TaskReadByIdComponent } from './task/task-read-by-id/task-read-by-id.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskSearchComponent } from './task/task-search/task-search.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'tasks',
    component: TaskSearchComponent,
  },
  {
    path: 'tasks/create',
    component: TaskCreateComponent,
  },
  {
    path: 'tasks/update',
    component: TaskUpdateMenuComponent,
  },
  {
    path: 'tasks/update/:taskId',
    component: TaskUpdateComponent,
  },
  {
    path: 'tasks/delete',
    component: TaskDeleteComponent,
  },
  {
    path: 'tasks/list',
    component: TaskListComponent,
  },
  {
    path: 'tasks/read',
    component: TaskReadByIdComponent,
  },
  {
    path: 'tasks/search',
    component: TaskSearchComponent,
  },

  {
    path: 'projects',
    component: ProjectSearchComponent,
  },
  {
    path: 'projects/read',
    component: ProjectReadMenuComponent,
  },
  {
    path: 'projects/read/:projectId',
    component: ProjectReadByIdComponent,
  },
  {
    path: 'projects/delete',
    component: ProjectDeleteComponent,
  },
  {
    path: 'projects/create',
    component: ProjectCreateComponent,
  },
  {
    path: 'projects/update',
    component: ProjectUpdateMenuComponent,
  },
  {
    path: 'projects/update/:projectId',
    component: ProjectUpdateComponent,
  },
  {
    path: 'projects/list',
    component: ProjectListComponent,
  },
  {
    path: 'projects/search',
    component: ProjectSearchComponent,
  },
];
