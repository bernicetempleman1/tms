import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCreateComponent } from './task-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from '../task.service';
import { ProjectService } from '../../project/project.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AddTaskDTO, Task } from '../task';
import { environment } from '../../../environments/environment';

describe('TaskCreateComponent', () => {
  let component: TaskCreateComponent;
  let fixture: ComponentFixture<TaskCreateComponent>;
  let taskService: TaskService;
  let projectService: ProjectService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        TaskCreateComponent,
      ],
      providers: [
        TaskService,
        ProjectService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCreateComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    projectService = TestBed.inject(ProjectService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled correctly', () => {
    component.taskForm.controls['title'].setValue('Test project');
    component.taskForm.controls['description'].setValue('Test project');
    component.taskForm.controls['priority'].setValue('High');
    component.taskForm.controls['status'].setValue('In Progress');
    component.taskForm.controls['projectId'].setValue(1);
    component.taskForm.controls['dueDate'].setValue('2023-04-15T00:00:00.000Z');
    expect(component.taskForm.valid).toBeTrue();
  });

  it('should call addPlant and navigate on successful form submission', () => {
    const addTaskDTO: AddTaskDTO = {
      title: 'Test Task',
      description: 'testing',
      priority: 'High',
      status: 'Completed',
      dueDate: '2023-04-15T00:00:00.000Z',
    };
    const mockTask: Task = {
      _id: '1',
      projectId: 1,
      title: 'Test Task',
      description: 'testing',
      priority: 'High',
      status: 'Completed',
      dueDate: '2023-04-15T00:00:00.000Z',
      dateCreated: '2023-04-15T00:00:00.000Z',
      dateModified: undefined,
    };
    spyOn(taskService, 'addTask').and.returnValue(of(mockTask));
    spyOn(router, 'navigate');
    component.taskForm.controls['title'].setValue(addTaskDTO.title);
    component.taskForm.controls['description'].setValue(addTaskDTO.description);
    component.taskForm.controls['priority'].setValue(addTaskDTO.priority);
    component.taskForm.controls['status'].setValue(addTaskDTO.status);
    component.taskForm.controls['dueDate'].setValue('2023-04-15T00:00:00.000Z');
    component.taskForm.controls['projectId'].setValue(1);

    component.onSubmit();
    expect(taskService.addTask).toHaveBeenCalledWith(1, addTaskDTO);
    expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
  });

  it('should handle error on form submission failure', () => {
    spyOn(taskService, 'addTask').and.returnValue(
      throwError('Error creating task')
    );
    spyOn(console, 'error');
    component.taskForm.controls['title'].setValue('Test Task');
    component.taskForm.controls['description'].setValue('Description');
    component.taskForm.controls['priority'].setValue('High');
    component.taskForm.controls['status'].setValue('Completed');
    component.taskForm.controls['dueDate'].setValue('2023-04-15T00:00:00.000Z');
    component.taskForm.controls['projectId'].setValue(1);
    component.onSubmit();
    expect(taskService.addTask).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'Error creating task',
      'Error creating task'
    );
  });
});