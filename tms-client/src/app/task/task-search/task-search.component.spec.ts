// Developer: Meher Salim
// File: task.list.component.spec.ts
// Description: Tests for displaying all tasks
// Credits: Lean, Mean, and Pragmatic - A Guide to Full-Stack JavaScript Development

import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { TaskService } from '../task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Task } from '../task';
import { TaskSearchComponent } from './task-search.component';
import { tick } from '@angular/core/testing';

describe('TaskSearchComponent', () => {
  let component: TaskSearchComponent;
  let fixture: ComponentFixture<TaskSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskSearchComponent, HttpClientTestingModule, RouterTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test should filer tasks that match the search term
  it('should filter tasks that match the search term', fakeAsync(() => {
    const mockTasks: Task[] = [
      {
        _id: "650c1f1e1c9d440000a1b1c1",
        title: "Complete project documentation",
        description: "Write the documentation for the project",
        status: "In Progress",
        priority: "High",
        dueDate: "2021-01-10T00:00:00.000Z",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-05T00:00:00.000Z",
        projectId: 1,
      },
      {
        _id: "650c1f1e1c9d440000a1b1c2",
        title: "Complete github repository setup",
        description: "Setup the Github repository with the base code",
        status: "In Progress",
        priority: "High",
        dueDate: "2021-01-10T00:00:00.000Z",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-05T00:00:00.000Z",
        projectId: 1,
      },
    ];
  
    component.tasks = mockTasks;
    component.allTasks = mockTasks;
    fixture.detectChanges();
  
    component.textSearchControl.setValue('github');
    tick(500);
    fixture.detectChanges();
  
    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].title).toBe('Complete github repository setup');
  }));

  // Test should filter tasks when multiple tasks match the search term
  it('should filter tasks when multiple tasks match the search term', fakeAsync(() => {
    const mockTasks: Task[] = [
      {
        _id: "650c1f1e1c9d440000a1b1c1",
        title: "Complete project documentation",
        description: "Write the documentation for the project",
        status: "In Progress",
        priority: "High",
        dueDate: "2021-01-10T00:00:00.000Z",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-05T00:00:00.000Z",
        projectId: 1,
      },
      {
        _id: "650c1f1e1c9d440000a1b1c2",
        title: "Complete github repository setup",
        description: "Setup the Github repository with the base code",
        status: "In Progress",
        priority: "High",
        dueDate: "2021-01-10T00:00:00.000Z",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-05T00:00:00.000Z",
        projectId: 1,
      },
    ];
  
    component.tasks = mockTasks;
    component.allTasks = mockTasks;
    fixture.detectChanges();
  
    component.textSearchControl.setValue('Complete');
    tick(500);
    fixture.detectChanges();
  
    expect(component.tasks.length).toBe(2);
  }));

  // Test should return no tasks when the search term matches nothing
  it('should return no tasks when the search term matches nothing', fakeAsync(() => {
    const mockTasks: Task[] = [
      {
        _id: "650c1f1e1c9d440000a1b1c1",
        title: "Complete project documentation",
        description: "Write the documentation for the project",
        status: "In Progress",
        priority: "High",
        dueDate: "2021-01-10T00:00:00.000Z",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-05T00:00:00.000Z",
        projectId: 1,
      },
      {
        _id: "650c1f1e1c9d440000a1b1c2",
        title: "Complete github repository setup",
        description: "Setup the Github repository with the base code",
        status: "In Progress",
        priority: "High",
        dueDate: "2021-01-10T00:00:00.000Z",
        dateCreated: "2021-01-01T00:00:00.000Z",
        dateModified: "2021-01-05T00:00:00.000Z",
        projectId: 1,
      },
    ];
  
    component.tasks = mockTasks;
    component.allTasks = mockTasks;
    fixture.detectChanges();
  
    component.textSearchControl.setValue('Nonexistent');
    tick(500);
    fixture.detectChanges();
  
    expect(component.tasks.length).toBe(0);
  }));
});
