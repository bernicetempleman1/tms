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

//tests for project delete
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

  //should create
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //should handle error when fetching projects
  it('should handle error when fetching projects', () => {
    spyOn(projectService, 'getProjects').and.returnValue(
      throwError('Error fetching projects')
    );
    fixture.detectChanges(); // Trigger the component's constructor
    expect(component.projects.length).toBe(0);
  });

  //should delete a project
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

  // should display title
  it('should display title "Delete Project"', () => {
    //Assign DOM to variable
    const compiled = fixture.nativeElement;
    //Select HTML element
    const title = compiled.querySelector('h1');

    //Check text content of h1 element
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Delete Project');
  });
});
