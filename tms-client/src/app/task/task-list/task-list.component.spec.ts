// Developer: Meher Salim
// File: task.list.component.spec.ts
// Description: Tests for displaying all tasks
// Credits: Lean, Mean, and Pragmatic - A Guide to Full-Stack JavaScript Development

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Task } from '../task';
import { By } from '@angular/platform-browser';
import { throwError } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule, TaskListComponent ],
      providers: [TaskService]
    }). compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
  });

  // Test if the component has been created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test if records are displayed in the DOM
  it('should display records in the DOM', () => {
    const mockTasks: Task[] = [
      { 
        _id: '1', 
        title: 'Rose', 
        priority: 'Flower', 
        status: 'Planted', 
        dueDate: '2023-01-01', 
        projectId: 1, 
      },
      { 
        _id: '2', 
        title: 'Tulip', 
        priority: 'Flower', 
        status: 'Planted', 
        dueDate: '2023-01-02', 
        projectId: 1, 
      }
    ];

    component.tasks = mockTasks;
    fixture.detectChanges(); // Trigger change detection

    const taskRows = fixture.debugElement.queryAll(By.css('.task-page__table-body .task-page__table-row'));
  
    expect(taskRows.length).toBeGreaterThan(0);
  });

  // Test error handling when fetching tasks
  it('should handle error when fetching tasks', () => {
    spyOn(taskService, 'getTasks').and.returnValue(throwError('Error fetching plants'));

    fixture.detectChanges();

    expect(component.tasks.length).toBe(0);
  });

  // Test if "No tasks found" is displayed when there are no tasks
  it('should display "No tasks found" when there are no tasks', () => {
    component.tasks = [];
    fixture.detectChanges();

    const noTasksMessage = fixture.debugElement.query(By.css('.task-page__no-tasks'));
    expect(noTasksMessage).toBeTruthy();
    expect(noTasksMessage.nativeElement.textContent).toContain('No tasks found');
  });

  // Test if tasks are displayed with formatted due dates
  it('should display tasks with formatted due dates', () => {
    const mockTasks: Task[] = [
      { 
        _id: '1', 
        title: 'Rose', 
        priority: 'Flower', 
        status: 'Planted', 
        dueDate: '2023-01-01', 
        projectId: 1, 
      },
      { 
        _id: '2', 
        title: 'Tulip', 
        priority: 'Flower', 
        status: 'Planted', 
        dueDate: '2023-01-02', 
        projectId: 1, 
      }
    ];

    component.tasks = mockTasks;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const dueDateCells = compiled.querySelectorAll('.task-page__table-cell:nth-child(4)');

    expect(dueDateCells.length).toBe(2);
    expect(dueDateCells[0].textContent).toContain('1/1/23');
    expect(dueDateCells[1].textContent).toContain('1/2/23');
  });
});
