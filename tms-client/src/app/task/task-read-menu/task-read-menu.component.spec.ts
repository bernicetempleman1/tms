

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TaskReadMenuComponent } from './task-read-menu.component';
import { TaskService } from '../task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Task } from '../task';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('TaskReadMenuComponent', () => {
  let component: TaskReadMenuComponent;
  let fixture: ComponentFixture<TaskReadMenuComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, TaskReadMenuComponent], //Import ProjectMenuComponent
      providers: [TaskService]
}).compileComponents();


    fixture = TestBed.createComponent(TaskReadMenuComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title "Task Read Menu"', () => {
    //Assign DOM to variable
    const compiled = fixture.nativeElement;
    //Select HTML element
    const title = compiled.querySelector('h1');

    //Check text content of h1 element
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Task Read Menu');
  });


});
