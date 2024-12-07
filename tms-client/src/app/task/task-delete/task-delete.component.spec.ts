//Leah Harris
//task-delete component tests

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskService } from '../task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskDeleteComponent } from './task-delete.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Task } from '../task';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

describe('TaskDeleteComponent', () => {
  let component: TaskDeleteComponent;
  let fixture: ComponentFixture<TaskDeleteComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDeleteComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    taskService = TestBed.inject(TaskService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Test to display H1 title
  it('should display "Delete Tasks" as the title', () => {
    //Select the DOM
    const compile = fixture.nativeElement;

    //Assign element to variable
    const title = compile.querySelector('h1');

    //expected text content
    expect(title).toBeTruthy();
    expect(title.textContent).toBe('Delete Tasks');
  });

  //Test to display data
  it('should display records in the DOM', () => {
    const mockTasks: Task[] = [
      { _id: '1', title: 'Task 1', status: 'In Progress', description: 'task 1 description', priority: 'High', dueDate: '2021-01-10T00:00:00.000Z', projectId: 1 },
      { _id: '2', title: 'Task 2', status: 'In Progress', description: 'task 2 description', priority: 'Low', dueDate: '2021-01-10T00:00:00.000Z', projectId: 2 }
    ];

    component.tasks = mockTasks;
    //Detect changes
    fixture.detectChanges();

    //Select table rows
    const taskRows = fixture.debugElement.queryAll(By.css('.task-page__table-body .task-page__table-row' ));
    //Check that table rows are greater than 0
    expect(taskRows.length).toBeGreaterThan(0);

  })

  //Test to delete a task
  it('should successfully delete a task', () => {
    //Create mock data
    const mockTasks: Task[] = [
      { _id: '1', title: 'Task 1', status: 'In Progress', description: 'task 1 description', priority: 'High', dueDate: '2021-01-10T00:00:00.000Z', projectId: 1 },
      { _id: '2', title: 'Task 2', status: 'In Progress', description: 'task 2 description', priority: 'Low', dueDate: '2021-01-10T00:00:00.000Z', projectId: 2 }
    ];

    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(taskService, 'deleteTask').and.returnValue(of({}));
    component.tasks = mockTasks;

    component.deleteTask('1');
    //update the view
    fixture.detectChanges();

    //Expect task to be deleted
    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0]._id).toBe('2');

  });
});
