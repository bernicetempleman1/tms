/**
 * Author: Bernice Templeman
 * Date: 2 December 2024
 * File: task-menu-component.spec.ts
 * Description: Tests for Display Task Menu
 *
 */
//Reference: Krasso, R. (2024). Lean, MEAN, and Pragmatic: A Guide to Full-Stack JavaScript Development (page 172)

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TaskMenuComponent } from './task-menu.component';
import { TaskService } from '../task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Task } from '../task';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('TaskMenuComponent', () => {
  let component: TaskMenuComponent;
  let fixture: ComponentFixture<TaskMenuComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TaskMenuComponent,
      ], //Import ProjectMenuComponent
      providers: [TaskService],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskMenuComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title "Task Menu"', () => {
    //Assign DOM to variable
    const compiled = fixture.nativeElement;
    //Select HTML element
    const title = compiled.querySelector('h1');

    //Check text content of h1 element
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Task Menu');
  });
});
