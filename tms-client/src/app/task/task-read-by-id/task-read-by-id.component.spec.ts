//Leah Harris
//task-read-by-id.component.spec

import { ComponentFixture, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskReadByIdComponent } from './task-read-by-id.component';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Task } from '../task';

describe('TaskReadByIdComponent', () => {
  let component: TaskReadByIdComponent;
  let fixture: ComponentFixture<TaskReadByIdComponent>;
  let taskService: TaskService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //Add Imports
      imports: [TaskReadByIdComponent, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      //Add providers
      providers: [
        TaskService,
        {
          provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskReadByIdComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit form when no task is selected', () => {
    //Call spyOn method
    spyOn(component, 'onSubmit').and.callThrough();

    //assign DOM to element
    const compiled = fixture.nativeElement;
    //select submit button
    const submitButton = compiled.querySelector('.task-details-page__btn');
    //Simulate a click event
    submitButton.click();

    //Compare expected results
    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.searchForm.valid).toBeFalse();
  });

  it('should display task details when valid form is submitted', () => {
    //Create mock task
    const mockTask: Task = {
      _id: '1',
      projectId: 1,
      title: 'Test Task',
      description: 'testing',
      priority: 'High',
      status: 'Completed',
      dueDate: '2023-04-15T00:00:00.000Z',
      dateCreated: '2023-04-15T00:00:00.000Z',
      dateModified: undefined,
    };

    //Mock task service
    spyOn(taskService, 'getTask').and.returnValue(of(mockTask));

    //Fill the form with mock taskId
    component.searchForm.controls['taskId'].setValue('1');

    //Submit the form
    component.onSubmit();
    fixture.detectChanges();

    //assign template elements to variables

    const compiled = fixture.nativeElement;
    const title = compiled.querySelector('h2');
    const description = compiled.querySelector('p:nth-child(2)');
    const status = compiled.querySelector('p:nth-child(3)');
    const priority = compiled.querySelector('p:nth-child(4)');
    const dueDate = compiled.querySelector('p:nth-child(5)');
    const projectId = compiled.querySelector('p:nth-child(6)');

    //Expected layout
    expect(title.textContent).toContain(mockTask.title);
    expect(description.textContent).toContain(mockTask.description);
    expect(status.textContent).toContain(mockTask.status);
    expect(priority.textContent).toContain(mockTask.priority);
    expect(dueDate.textContent).toContain(mockTask.dueDate);
    expect(projectId.textContent).toContain(mockTask.projectId);
  });

  it('should display title "Search Task"', () => {
    //Assign DOM to variable
    const compiled = fixture.nativeElement;
    //Select HTML element
    const title = compiled.querySelector('h1');

    //Check text content of h1 element
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Search Task');
  });
 });


