/**
 * Author: Bernice Templeman
 * Date: 11 November 2024
 * File: project-menu.component.spec.ts
 * Description: Tests for project menu
 *
 */
//Reference: Krasso, R. (2024). Lean, MEAN, and Pragmatic: A Guide to Full-Stack JavaScript Development (page 172)

import { ProjectSearchComponent } from './project-search.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProjectService } from '../project.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Project } from '../project';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

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

});
