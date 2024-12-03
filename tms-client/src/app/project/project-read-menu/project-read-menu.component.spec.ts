/**
 * Author: Bernice Templeman
 * Date: 2 December 2024
 * File: project-read-menu-component.spec.ts
 * Description: Tests for Display a project
 *
 */
//Reference: Krasso, R. (2024). Lean, MEAN, and Pragmatic: A Guide to Full-Stack JavaScript Development (page 172)

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProjectReadMenuComponent } from './project-read-menu.component';
import { ProjectService } from '../project.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Project } from '../project';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ProjectMenuComponent', () => {
  let component: ProjectReadMenuComponent;
  let fixture: ComponentFixture<ProjectReadMenuComponent>;
  let projectService: ProjectService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ProjectReadMenuComponent,
      ], //Import ProjectMenuComponent
      providers: [ProjectService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectReadMenuComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title "Project Details Menu"', () => {
    //Assign DOM to variable
    const compiled = fixture.nativeElement;
    //Select HTML element
    const title = compiled.querySelector('h1');

    //Check text content of h1 element
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Project Details Menu');
  });
});
