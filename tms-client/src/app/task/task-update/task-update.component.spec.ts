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

  it('should have a valid form when all fields are filled correctly', () => {
    component.taskForm.controls['title'].setValue('Test Plant');
    component.taskForm.controls['priority'].setValue('High');
    component.taskForm.controls['status'].setValue('Completed');
    expect(component.taskForm.valid).toBeTruthy();
  });

  it('should call updateTask and navigate on successful form submission', fakeAsync(() => {
    const updateTaskDTO = {
      title: 'Test Plant',
      priority: 'High',
      status: 'Completed',
    };
    const mockResponse: Task = {
      _id: '1',
      projectId: 1,
      title: 'Test Plant',
      priority: 'High',
      status: 'Planted',
      dueDate: '2023-04-15T00:00:00.000Z',
    };
    spyOn(taskService, 'updateTask').and.returnValue(of(mockResponse));
    spyOn(router, 'navigate');
    component.taskForm.controls['title'].setValue(updateTaskDTO.title);
    component.taskForm.controls['priority'].setValue(updateTaskDTO.priority);
    component.taskForm.controls['status'].setValue(updateTaskDTO.status);
    component.onSubmit();
    tick();
    expect(taskService.updateTask).toHaveBeenCalledWith('1', updateTaskDTO);
    expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
  }));

  it('should handle error on form submission failure', fakeAsync(() => {
    spyOn(taskService, 'updateTask').and.returnValue(
      throwError('Error updating task')
    );
    spyOn(console, 'error');
    component.taskForm.controls['title'].setValue('Test Plant');
    component.taskForm.controls['priority'].setValue('High');
    component.taskForm.controls['status'].setValue('Completed');
    component.onSubmit();
    tick();
    expect(taskService.updateTask).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'Error updating task',
      'Error updating task'
    );
  }));
});

