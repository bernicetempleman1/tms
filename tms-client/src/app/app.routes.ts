import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TaskCreateComponent } from './task/task-create/task-create.component';
import { TaskUpdateComponent } from './task/task-update/task-update.component';
import { ProjectReadByIdComponent } from './project/project-read-by-id/project-read-by-id.component';
import { ProjectDeleteComponent } from './project/project-delete/project-delete.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'tasks/create',
    component: TaskCreateComponent,
  },
  {
    path: 'tasks/update',
    component: TaskUpdateComponent,
  },
  {
    path: 'projects/:projectId',
    component: ProjectReadByIdComponent,
  },
  {
    path: 'projects/delete',
    component: ProjectDeleteComponent,
  },
];
