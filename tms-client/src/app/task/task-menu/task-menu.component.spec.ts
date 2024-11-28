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
      imports: [HttpClientTestingModule, RouterTestingModule, TaskMenuComponent], //Import ProjectMenuComponent
      providers: [TaskService]
}).compileComponents();


    fixture = TestBed.createComponent(TaskMenuComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
