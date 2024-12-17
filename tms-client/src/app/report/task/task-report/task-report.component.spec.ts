import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskReportComponent } from './task-report.component';

import { TaskService } from '../../../task/task.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Task } from '../../../task/task';
import { By } from '@angular/platform-browser';
import { throwError } from 'rxjs';

describe('TaskReportComponent', () => {
  let component: TaskReportComponent;
  let fixture: ComponentFixture<TaskReportComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule, RouterTestingModule, TaskReportComponent ],
      }). compileComponents();

      fixture = TestBed.createComponent(TaskReportComponent);
      component = fixture.componentInstance;
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
