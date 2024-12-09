/**
 * Author: Bernice Templeman
 * Date: 11 November 2024
 * File: project-menu.component.spec.ts
 * Description: Tests for project menu
 *
 */
//Reference: Krasso, R. (2024). Lean, MEAN, and Pragmatic: A Guide to Full-Stack JavaScript Development (page 172)

import { ProjectSearchComponent } from './project-search.component';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { ProjectService } from '../project.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Project } from '../project';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { tick } from '@angular/core/testing';

describe('ProjectSearchComponent', () => {
  let component: ProjectSearchComponent;
  let fixture: ComponentFixture<ProjectSearchComponent>;
  let projectService: ProjectService;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ProjectSearchComponent,
      ],
      providers: [ProjectService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title "Project Search"', () => {
    //Assign DOM to variable
    const compiled = fixture.nativeElement;
    //Select HTML element
    const title = compiled.querySelector('h1');

    //Check text content of h1 element
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Project Search');
  });

  // Test should filer tasks that match the search term
  it('should filter tasks that match the search term', fakeAsync(() => {
    const mockProjects: Project[] = [
      {
        _id: "650c1f1e1c9d440000a1b1c1",
        name: "Complete project documentation",
        description: "Write the documentation for the project",

        startDate: "2021-01-10T00:00:00.000Z",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-05T00:00:00.000Z",
        projectId: 1,
      },
      {
        _id: "650c1f1e1c9d440000a1b1c2",
        name: "Complete github repository setup",
        description: "Setup the Github repository with the base code",

        startDate: "2021-01-10T00:00:00.000Z",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-05T00:00:00.000Z",
        projectId: 2,
      },
    ];

    component.projects = mockProjects;
    component.allProjects = mockProjects;
    fixture.detectChanges();

    component.txtSearchControl.setValue('github');
    tick(500);
    fixture.detectChanges();

    expect(component.projects.length).toBe(1);
    expect(component.projects[0].name).toBe('Complete github repository setup');
  }));

  // Test should filter tasks when multiple tasks match the search term
  it('should filter tasks when multiple tasks match the search term', fakeAsync(() => {
    const mockProjects: Project[] = [
      {
        _id: "650c1f1e1c9d440000a1b1c1",
        name: "Complete project documentation",
        description: "Write the documentation for the project",

        startDate: "2021-01-10T00:00:00.000Z",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-05T00:00:00.000Z",
        projectId: 1,
      },
      {
        _id: "650c1f1e1c9d440000a1b1c2",
        name: "Complete github repository setup",
        description: "Setup the Github repository with the base code",

        startDate: "2021-01-10T00:00:00.000Z",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-05T00:00:00.000Z",
        projectId: 2,
      },
    ];

    component.projects = mockProjects;
    component.allProjects = mockProjects;
    fixture.detectChanges();

    component.txtSearchControl.setValue('Complete');
    tick(500);
    fixture.detectChanges();

    expect(component.projects.length).toBe(2);
  }));

  // Test should return no tasks when the search term matches nothing
  it('should return no projects when the search term matches nothing', fakeAsync(() => {
    const mockProjects: Project[] = [
      {
        _id: "650c1f1e1c9d440000a1b1c1",
        name: "Complete project documentation",
        description: "Write the documentation for the project",

        startDate: "2021-01-10T00:00:00.000Z",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-05T00:00:00.000Z",
        projectId: 1,
      },
      {
        _id: "650c1f1e1c9d440000a1b1c2",
        name: "Complete github repository setup",
        description: "Setup the Github repository with the base code",

        startDate: "2021-01-10T00:00:00.000Z",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-05T00:00:00.000Z",
        projectId: 2,
      },
    ];

    component.projects = mockProjects;
    component.allProjects = mockProjects;
    fixture.detectChanges();

    component.txtSearchControl.setValue('Nonexistent');
    tick(500);
    fixture.detectChanges();

    expect(component.projects.length).toBe(0);
  }));

});
