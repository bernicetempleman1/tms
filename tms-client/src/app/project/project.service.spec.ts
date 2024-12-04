/**
 * Author: Bernice Templeman
 * Date: 2 December 2024
 * File: project.service.spec.ts
 * Description: project services
 *
 */
//Reference: Krasso, R. (2024). Lean, MEAN, and Pragmatic: A Guide to Full-Stack JavaScript Development (page 172)


import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectService } from './project.service';
import { Project, UpdateProjectDTO } from './project';
import { environment } from '../../environments/environment';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });

    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all projects', () => {
    const dummyProjects: Project[] = [
      { _id: '1', projectId: 1, name: 'Garden 1', description: 'Description 1' },
      { _id: '2', projectId: 2, name: 'Garden 2', description: 'Description 2' },
  ];

  service.getProjects().subscribe(projects => {
    expect(projects.length).toBe(2);
    expect(projects).toEqual(dummyProjects);
  });

  const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/projects`);
  expect(req.request.method).toBe('GET');
  req.flush(dummyProjects);
});

it('should retrieve a single project by ID', () => {
  const dummyProject: Project = { _id: '1', projectId: 1, name: 'Garden 1', description: 'Description 1' };
  service.getProject(1).subscribe(project => {
    expect(project).toEqual(dummyProject);
  });

  const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/projects/1`);
  expect(req.request.method).toBe('GET');
  req.flush(dummyProject);
});

it('should add a new project', () => {
  const newProject: Project = { _id: '3', projectId: 3, name: 'Garden 3', description: 'Description 3' };
  service.addProject(newProject).subscribe(project => {
    expect(project).toEqual(newProject);
  });

  const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/projects`);
  expect(req.request.method).toBe('POST');
  req.flush(newProject);
});

it('should update an existing project', () => {
  const updateProjectDTO: UpdateProjectDTO = { name: 'Updated Garden', description: 'Updated Description' };
  const updatedProject: Project = { _id: '1', projectId: 1, name: 'Updated Garden', description: 'Updated Description' };
  service.updateProject(updateProjectDTO, 1).subscribe(project => {
  expect(project).toEqual(updatedProject);
  });
  const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/projects/1`);
  expect(req.request.method).toBe('PATCH');
  req.flush(updatedProject);
  });

it('should delete a project by ID', () => {
  service.deleteProject(1).subscribe(response => {
    expect(response).toEqual({});
  });

  const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/projects/1`);
  expect(req.request.method).toBe('DELETE');
  req.flush({});
});

});
