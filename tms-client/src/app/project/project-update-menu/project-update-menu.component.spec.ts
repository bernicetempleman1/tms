/**
 * Author: Bernice Templeman
 * Date: 11 November 2024
 * File: project-menu.component.spec.ts
 * Description: Tests for project menu
 *
 */
//Reference: Krasso, R. (2024). Lean, MEAN, and Pragmatic: A Guide to Full-Stack JavaScript Development (page 172)

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProjectUpdateMenuComponent } from './project-update-menu.component';
import { ProjectService } from '../project.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

const mockProjects = [
  { projectId: 1, name: 'Project Alpha', description: 'First project', dateCreated: '2023-12-01' },
  { projectId: 2, name: 'Project Beta', description: 'Second project', dateCreated: '2023-11-20' },
];

class MockProjectService {
  getProjects() {
    return of(mockProjects);
  }
}

describe('ProjectMenuComponent', () => {
  let component: ProjectUpdateMenuComponent;
  let fixture: ComponentFixture<ProjectUpdateMenuComponent>;
  let projectService: ProjectService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule ],
      providers: [{ provide: ProjectService, useClass: MockProjectService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectUpdateMenuComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
  });

  // Component should initialize
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Verify that the component displays the title
  it('should display title "Project Update Menu"', () => {
    const compiled = fixture.nativeElement;
    const title = compiled.querySelector('h1');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Project Update Menu');
  });
  
  // Initial rendering of template content
  it('should show the correct title in rendered DOM', () => {
    const compiled = fixture.nativeElement;
    const title = compiled.querySelector('h1');
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Project Update Menu');
  });

  it('should show no projects when projects list is empty', () => {
    component.projects = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.project-page__no-projects')).toBeTruthy();
  });

  it('should show projects table if projects are present', () => {
    component.projects = mockProjects;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.project-page__table')).toBeTruthy();
  });

  //Verify that no message is shown when serverMessage is null */
  it('should not show server messages when there is no serverMessage', () => {
    component.serverMessage = null;
    component.serverMessageType = null;

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.message-alert')).toBeNull();
    expect(compiled.querySelector('.message-success')).toBeNull();
  });
});