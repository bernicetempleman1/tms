import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProjectMenuComponent } from './project-menu.component';
import { ProjectService } from '../project.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Project } from '../project';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ProjectMenuComponent', () => {
  let component: ProjectMenuComponent;
  let fixture: ComponentFixture<ProjectMenuComponent>;
  let projectService: ProjectService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ProjectMenuComponent], //Import ProjectMenuComponent
      providers: [ProjectService]
}).compileComponents();


    fixture = TestBed.createComponent(ProjectMenuComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  /*
  _id: "650c1f1e1c9d440000a1b1c1",
    name: "Project Alpha",
    description: "Initial phase of the project",
    startDate: "2021-01-01T00:00:00.000Z",
    endDate: "2021-06-01T00:00:00.000Z",
    dateCreated: "2021-01-01T00:00:00.000Z",
    dateModified: "2021-01-05T00:00:00.000Z",
    projectId: "1",

  it('should display records in the DOM', () => {
    const mockProjects: Project[] = [
    { _id: '1', projectId: 1, name: 'Rose', description: 'Flower',  startDate: '2023-01-01', endDate: '2023-01-02',dateCreated: '2023-01-01', dateModified: '2023-01-01' },
    { _id: '2', projectId: 2, name: 'Tulip', description: 'Flower', startDate: '2023-01-01', endDate: '2023-01-02',dateCreated: '2023-01-01', dateModified: '2023-01-01' },
    ];
    component.projects = mockProjects;
    fixture.detectChanges(); // Trigger change detection
    const projectRows = fixture.debugElement.queryAll(By.css('.project-page__table-body .projectpage__table-row'));
    expect(projectRows.length).toBeGreaterThan(0); // Check that there are project rows in the DOM
    });
/*
    it('should handle error when fetching projects', () => {
      spyOn(projectService, 'getProjects').and.returnValue(throwError('Error fetching projects'));
      fixture.detectChanges(); // Trigger the component's constructor
      expect(component.projects.length).toBe(0);
      });


      it('should delete a project', () => {
        const mockProjects: Project[] = [
        { _id: '1', projectId: 1, name: 'Rose', description: 'Flower'  },
        { _id: '2', projectId: 1, name: 'Tulip', description: 'Flower' }];
        spyOn(window, 'confirm').and.returnValue(true);
        spyOn(projectService, 'deleteProject').and.returnValue(of({}));
        component.projects = mockProjects;
        component.deleteProject(1);
        fixture.detectChanges(); // Update the view with the deletion state
        expect(component.projects.length).toBe(1);
        expect(component.projects[0]._id).toBe('2');
        });
          */


});



