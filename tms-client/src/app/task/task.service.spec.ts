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

  it('should retrieve a list of plants from the API', () => {
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


  /*

it('should update an existing plant via the API', () => {
const updatedPlant: UpdatePlantDTO = { name: 'Sunflower', type: 'Flower', status:
'Harvested' };
const mockResponse: Plant = { _id: '3', gardenId: 1, ...updatedPlant, datePlanted: '2023-01-
03', dateHarvested: '2023-01-04' };
service.updatePlant('1', updatedPlant).subscribe(plant => {
expect(plant).toEqual(mockResponse);
});
const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/plants/1`);
expect(req.request.method).toBe('PATCH');
expect(req.request.body).toEqual(updatedPlant);
req.flush(mockResponse);
});

it('should delete an existing plant via the API', () => {
service.deletePlant('1').subscribe(response => {
expect(response).toBeNull();
});
const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/plants/1`);
expect(req.request.method).toBe('DELETE');
req.flush(null);
});

  it('should add a new plant via the API', () => {
    const newPlant: AddPlantDTO = { name: 'Sunflower', type: 'Flower', status: 'Planted' };
    const mockResponse: Plant = { _id: '3', gardenId: 1, ...newPlant, datePlanted: '2023-01-03' };
    service.addPlant(1, newPlant).subscribe(plant => {
    expect(plant).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/plants/1`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newPlant);
    req.flush(mockResponse);
    });






  it('should add a new task via the API', () => {
    const newTask: AddTaskDTO = {
      title: 'Sunflower',
      priority: 'High',
      status: 'In Progress',
    };
    const mockResponse: Task = {
      _id: '3',
      projectId: 1,
      ...newTask,
    };
    service.addTask(newTask).subscribe((Task) => {
      expect(task).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/tasks`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTask);
    req.flush(mockResponse);
  });

  it('should update an existing task via the API', () => {
    const updatedTask: UpdateTaskDTO = {
      title: 'Sunflower',
      priority: 'High',
      status: 'In Progress',
      description: 'testing',
      dueDate: '2021-01-10T00:00:00.000Z',
      projectId: '1',
    };
    const mockResponse: Task = {
      _id: '3',
      projectId: 1,
      title: 'Sunflower',
      priority: 'High',
      status: 'In Progress',
      ...updatedTask,
    };
    service.updateTask('1', updatedTask).subscribe((task) => {
      expect(task).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/tasks/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedTask);
    req.flush(mockResponse);
  });

    */
});
