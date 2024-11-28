import { Project } from './project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  getProjects() {
    return this.http.get<Project[]>(`${environment.apiBaseUrl}/api/projects`);
  }

  getProject(projectId: number) {
    return this.http.get<Project>(
      `${environment.apiBaseUrl}/api/projects/${projectId}`
    );
  }
  addProject(project: Project) {
    return this.http.post<Project>(
      `${environment.apiBaseUrl}/api/projects`,
      project
    );
  }


  updateProject(project: UpdateProjectDTO, projectId: number) {
    return this.http.patch<Project>(`${environment.apiBaseUrl}/api/projects/${projectId}`, project);
    }

  deleteProject(projectId: number) {
    return this.http.delete(
      `${environment.apiBaseUrl}/api/projects/${projectId}`
    );
  }
}

export type UpdateProjectDTO = Omit<Project, '_id' | 'projectId' | 'dateCreated' |
'dateModified'>;
