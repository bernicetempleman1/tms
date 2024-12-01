//155
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task } from './task';
import { environment } from '../../environments/environment';
import { AddTaskDTO } from './task';
import { UpdateTaskDTO } from './task';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve a list of tasks from the API', () => {
    const mockTasks: Task[] = [
      {
        _id: '1',
        projectId: 1,
        description: "testing",
        dueDate: "2023-01-01",
        title: 'Rose',
        priority: 'High',
        status: 'Completed',
      },
      {
        _id: '2',
        projectId: 1,
        description: "testing",
        dueDate: "2023-01-01",
        title: 'Tulip',
        priority: 'High',
        status: 'In Progress',
      },
    ];
    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTasks);
    });
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });
});
