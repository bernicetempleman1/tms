/**
 * Author: Bernice Templeman
 * Date: 2 December 2024
 * File: project-read-by-id-component.spec.ts
 * Description: Tests for Display a project
 *
 */
//Reference: Krasso, R. (2024). Lean, MEAN, and Pragmatic: A Guide to Full-Stack JavaScript Development (page 172)

import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { TaskReadComponent } from './task-read.component';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

//tests for project read
describe('TaskReadComponent', () => {
  let component: TaskReadComponent;
  let fixture: ComponentFixture<TaskReadComponent>;
  let projectService: TaskService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        TaskReadComponent,
      ],
      providers: [
        TaskService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TaskReadComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(TaskService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // should create the component and initialize the form
  it('should create the component and initialize the form', () => {
    expect(component).toBeTruthy();
    expect(component.taskForm).toBeTruthy();
    expect(component.taskForm.controls['projectId']).toBeTruthy();
    expect(component.taskForm.controls['title']).toBeTruthy();
    expect(component.taskForm.controls['description']).toBeTruthy();
    expect(component.taskForm.controls['dueDate']).toBeTruthy();
    expect(component.taskForm.controls['dateCreated']).toBeTruthy();
    expect(component.taskForm.controls['dateModified']).toBeTruthy();
    expect(component.taskForm.controls['priority']).toBeTruthy();
    expect(component.taskForm.controls['status']).toBeTruthy();
  });

  //should have a valid form when all fields filled correctly
  it('should have a valid form when all fields are filled correctly', () => {
    component.taskForm.controls['projectId'].setValue(1);
    component.taskForm.controls['title'].setValue('Test Project');
    component.taskForm.controls['description'].setValue('Test Description');
    component.taskForm.controls['dueDate'].setValue('2021-01-01T00:00:00.000Z');
    component.taskForm.controls['dateCreated'].setValue('2020-12-20T00:00:00.000Z');
    component.taskForm.controls['dateModified'].setValue('2021-01-02T00:00:00.000Z');
    component.taskForm.controls['priority'].setValue('High');
    component.taskForm.controls['status'].setValue('In Progress');
    expect(component.taskForm.valid).toBeTrue();
  });

  // should display title
  it('should display title "Task Read"', () => {
    //Assign DOM to variable
    const compiled = fixture.nativeElement;
    //Select HTML element
    const title = compiled.querySelector('h1');

    //Check text content of h1 element
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Task Read');
  });
});
