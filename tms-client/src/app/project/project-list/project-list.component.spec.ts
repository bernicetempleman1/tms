/**
 * Author: Bernice Templeman
 * Date: 11 November 2024
 * File: project-list.component.ts
 * Description:  project menu
 *
 */
//Reference: Krasso, R. (2024). Lean, MEAN, and Pragmatic: A Guide to Full-Stack JavaScript Development (page 172

import { ProjectListComponent } from './project-list.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProjectService } from '../project.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Project } from '../project';
import { of, throwError } from 'rxjs';
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
    const mockProjects: Project[] = [
      {
        _id: '1',
        name: 'Rose',
        startDate: '2023-01-01',
        projectId: 1,
      },
      {
        _id: '2',
        name: 'Tulip',
        startDate: '2023-01-02',
        projectId: 2,
      }
    ];

    component.projects = mockProjects;
    fixture.detectChanges(); // Trigger change detection

    const projectRows = fixture.debugElement.queryAll(By.css('.project-page__table-body .project-page__table-row'));

    expect(projectRows.length).toBeGreaterThan(0);
  });

  it('should display "No projects found" when there are no tasks', () => {
    component.projects = [];
    fixture.detectChanges();
    const noProjectsMessage = fixture.debugElement.query(By.css('.project-page__no-projects'));
    expect(noProjectsMessage).toBeTruthy();
    expect(noProjectsMessage.nativeElement.textContent).toContain('No projects found');
  });

});
