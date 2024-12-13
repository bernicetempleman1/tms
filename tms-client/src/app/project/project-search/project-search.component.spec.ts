//Leah Harris
//File: project-search.component.spec.ts
//Description: Test file for the project-search component

import { ProjectSearchComponent } from './project-search.component';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { ProjectService } from '../project.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Project } from '../project';
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
    //Select h1 element
    const title = compiled.querySelector('h1');

    //Check text content of h1 element
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Project Search');
  });

  // Test should filer tasks that match the search term
  it('should filter projects that match the search term', fakeAsync(() => {
    //Create array of mock projects
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

    //Add mock array to component properties
    component.projects = mockProjects;
    component.allProjects = mockProjects;
    //trigger change detection
    fixture.detectChanges();

    //set Value of the search control
    component.txtSearchControl.setValue('github');
    //Simulate debounce time
    tick(500);
    //trigger change detection
    fixture.detectChanges();

    //Compare expected results
    expect(component.projects.length).toBe(1);
    expect(component.projects[0].name).toBe('Complete github repository setup');
  }));

  // Test should filter tasks when multiple tasks match the search term
  it('should filter tasks when multiple tasks match the search term', fakeAsync(() => {
    //Create an array of mock projects
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

    //Add mock array to component properties
    component.projects = mockProjects;
    component.allProjects = mockProjects;
    //Trigger change detection
    fixture.detectChanges();

    //Set value of textSearchControl
    component.txtSearchControl.setValue('Complete');
    //Simulate delay
    tick(500);
    //detect changes
    fixture.detectChanges();

    //Compare results
    expect(component.projects.length).toBe(2);
  }));

  // Test should return no tasks when the search term matches nothing
  it('should return no projects when the search term matches nothing', fakeAsync(() => {
    //Create an array of mock projects
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

    //Add mock array to component
    component.projects = mockProjects;
    component.allProjects = mockProjects;
    //Trigger change detection
    fixture.detectChanges();

    //Set value of txtSearchControl
    component.txtSearchControl.setValue('Nonexistent');
    //Simulate delay
    tick(500);
    //Detect changes
    fixture.detectChanges();

    //Compare results
    expect(component.projects.length).toBe(0);
  }));

  it('should be case-insensitive when searching for projects', fakeAsync(() => {
    //Create an array with mock projects
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
     //Add mock array to component properties
     component.projects = mockProjects;
     component.allProjects = mockProjects;
     //Trigger change detection
     fixture.detectChanges();

     //Set value of the search form
     component.txtSearchControl.setValue('PROJECT');
     //simulate debounce time
     tick(500);
     //trigger change detection
     fixture.detectChanges();
     expect(component.projects.length).toBe(1);
     expect(component.projects[0].name).toBe('Complete project documentation');
  }));
});
