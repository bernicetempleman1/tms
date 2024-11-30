import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { TaskUpdateComponent } from './task-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from '../task.service';
import { ProjectService } from '../../project/project.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { UpdateTaskDTO, Task } from '../task';

describe('TaskUpdateComponent', () => {
  let component: TaskUpdateComponent;
  let fixture: ComponentFixture<TaskUpdateComponent>;
  let taskService: TaskService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        TaskUpdateComponent,
      ],
      providers: [
        TaskService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TaskUpdateComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
