/**
 * Author: Bernice Templeman
 * Date: 11 November 2024
 * File: project-delete.component.spec.ts
 * Description: Tests forDelete a project
 *
 */
//Reference: Krasso, R. (2024). Lean, MEAN, and Pragmatic: A Guide to Full-Stack JavaScript Development (page 172)

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProjectDeleteComponent } from './project-delete.component';
import { ProjectService } from '../project.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Project } from '../project';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ProjectDeleteComponent', () => {
  let component: ProjectDeleteComponent;
  let fixture: ComponentFixture<ProjectDeleteComponent>;
  let projectService: ProjectService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ProjectDeleteComponent,
      ], //Import ProjectMenuComponent
      providers: [ProjectService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDeleteComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle error when fetching projects', () => {
    spyOn(projectService, 'getProjects').and.returnValue(
      throwError('Error fetching projects')
    );
    fixture.detectChanges(); // Trigger the component's constructor
    expect(component.projects.length).toBe(0);
  });

  it('should delete a project', () => {
    const mockProjects: Project[] = [
      { _id: '1', projectId: 1, name: 'Rose', description: 'Flower' },
      { _id: '2', projectId: 2, name: 'Tulip', description: 'Flower' },
    ];
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(projectService, 'deleteProject').and.returnValue(of({}));
    component.projects = mockProjects;
    component.deleteProject(1);
    fixture.detectChanges(); // Update the view with the deletion state
    expect(component.projects.length).toBe(1);
    expect(component.projects[0]._id).toBe('2');
  });

});
