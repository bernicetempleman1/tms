//Leah Harris
//project-list component tests
//description: Test file for listing all projects component

import { ProjectListComponent } from './project-list.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProjectService } from '../project.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Project } from '../project';
import { By } from '@angular/platform-browser';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let projectService: ProjectService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ProjectListComponent,
      ],
      providers: [ProjectService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title "Project List"', () => {
    //Assign DOM to variable
    const compiled = fixture.nativeElement;
    //Select HTML element
    const name = compiled.querySelector('h1');

    //Check text content of h1 element
    expect(name).toBeTruthy();
    expect(name.textContent).toContain('Project List');
  });

  it('should display records in the DOM', () => {
    //Create a mock array for testing
    const mockProjects: Project[] = [
      {
        projectId: 1,
        name: 'Mock project 1',
        description: 'Description of the first mock project',
        startDate: '2023-09-04T21:39:36.605Z',
        endDate: '2025-09-04T21:39:36.605Z'
      },
      {
        projectId: 1,
        name: 'Mock project 2',
        description: 'Description of the second mock project',
        startDate: '2023-09-04T21:39:36.605Z',
        endDate: '2025-09-04T21:39:36.605Z'
      }
    ];

    //Assign mockProjects array to the component
    component.projects = mockProjects;
    fixture.detectChanges(); // Trigger change detection

    //Select the table body and row elements
    const projectRows = fixture.debugElement.queryAll(By.css('.project-page__table-body .project-page__table-row'));

    //Expect table rows to be greater than zero
    expect(projectRows.length).toBeGreaterThan(0);
  });

  it('should display "No Projects Found" when there are no projects', () => {
    //Create empty array for projects in the component
    component.projects = [];
    //Select the DOM
    const compiled = fixture.nativeElement;

    //trigger change detection
    fixture.detectChanges();

    //Select the p element
    const noProjectsMessage = compiled.querySelector('p');

    //Compare the expected results
    expect(noProjectsMessage).toBeTruthy();
    expect(noProjectsMessage.textContent).toContain('No Projects Found');
  });
});
