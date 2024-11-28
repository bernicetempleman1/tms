import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { ProjectMenuComponent } from './project/project-menu/project-menu.component';
import { ProjectReadByIdComponent } from './project/project-read-by-id/project-read-by-id.component';
import { ProjectDeleteComponent } from './project/project-delete/project-delete.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectSearchComponent } from './project/project-search/project-search.component';
import { ProjectCreateComponent } from './project/project-create/project-create.component';
import { ProjectUpdateComponent } from './project/project-update/project-update.component';

import { TaskMenuComponent } from './task/task-menu/task-menu.component';
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
    component: TaskMenuComponent,
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
    component: ProjectMenuComponent,
  },
  {
    path: 'projects/read',
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
