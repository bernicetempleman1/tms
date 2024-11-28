import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TaskUpdateMenuComponent } from './task-update-menu.component';
import { TaskService } from '../task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Task } from '../task';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('TaskUpdateMenuComponent', () => {
  let component: TaskUpdateMenuComponent;
  let fixture: ComponentFixture<TaskUpdateMenuComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, TaskUpdateMenuComponent], //Import ProjectMenuComponent
      providers: [TaskService]
}).compileComponents();


    fixture = TestBed.createComponent(TaskUpdateMenuComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
