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

/*



  describe('GET /api/tasks', () => {
    it('should get all tasks', async () => {
      Task.find.mockResolvedValue([{ title: 'Rose' }]); // Mock the find method
      const response = await request(app).get('/api/tasks');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].name).toBe('Rose');
    });

    it('should handle errors', async () => {
      Task.find.mockRejectedValue(new Error('Database error')); // Mock an error
      const response = await request(app).get('/api/tasks');
      expect(response.status).toBe(500);
    });
  });

  describe('GET /api/tasks/:taskId', () => {
    it('should get a task by ID', async () => {
      Task.findOne.mockResolvedValue({ title: 'Rose' }); // Mock the findOne method
      const response = await request(app).get(
        '/api/tasks/507f1f77bcf86cd799439011'
      ); // Use a valid ObjectId
      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Rose');
    });
    it('should handle errors', async () => {
      Task.findOne.mockRejectedValue(new Error('Database error')); // Mock an error
      const response = await request(app).get(
        '/api/tasks/507f1f77bcf86cd799439011'
      ); // Use a valid ObjectId
      expect(response.status).toBe(500);
    });
  });
  describe('POST /api/tasks/:taskId', () => {
    it('should create a task successfully', async () => {
      Task.prototype.save.mockResolvedValue({
        _id: '507f1f77bcf86cd799439011',
      }); // Mock the save method
      const response = await request(app).post('/api/tasks/1').send({
        title: 'Rose',
        priority: 'Flower',
        dueDate: '2023-04-15T00:00:00.000Z',
        status: 'projected', // Ensure all required properties are included
      });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Task created successfully');
    });

    it('should return validation errors for invalid type', async () => {
      const response = await request(app).post('/api/tasks/1').send({
        title: 'Rose',
        priority: 'InvalidType', // Invalid: not in enum
        dueDate: '2023-04-15T00:00:00.000Z',
        status: 'projected',
      });
      expect(response.status).toBe(400);
      const errorMessages = response.body.message;
      expect(errorMessages).toContain(
        'must be equal to one of the allowed values'
      );
    });
  });
  describe('PATCH /api/tasks/:taskId', () => {
    it('should update a task successfully', async () => {
      const mockproject = {
        _id: '507f1f77bcf86cd799439011',
        title: 'Rose',
        priority: 'High',
        status: 'Completed',
        set: jest.fn(),
        save: jest.fn().mockResolvedValue(true),
      };
      Task.findOne.mockResolvedValue(mockTask);
      const response = await request(app)
        .patch('/api/tasks/507f1f77bcf86cd799439011')
        .send({
          title: 'Rose',
          priority: 'Flower',
          status: 'Growing', // Ensure all required properties are included
        });
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('project updated successfully');
    });

    it('should return validation errors for invalid data', async () => {
      const mockproject = {
        _id: '507f1f77bcf86cd799439011',
        title: 'Rose',
        priority: 'Flower',
        status: 'Growing',
        set: jest.fn(),
        save: jest.fn().mockResolvedValue(true),
      };

      project.findOne.mockResolvedValue(mockproject);
      const response = await request(app)
        .patch('/api/projects/507f1f77bcf86cd799439011')
        .send({
          title: 'R', // Invalid: too short
          priority: 'InvalidType', // Invalid: not in enum
          status: 'InvalidStatus', // Invalid: not in enum
        });
      expect(response.status).toBe(400);
      const errorMessages = response.body.message;
      expect(errorMessages).toContain('must NOT have fewer than 3 characters');
    });
  });

  ***************************************8
it ('should have a valid form when all fields are filled correctly', () => {
component.plantForm.controls['name'].setValue('Test Plant');
component.plantForm.controls['type'].setValue('Flower');
component.plantForm.controls['status'].setValue('Planted');
expect(component.plantForm.valid).toBeTruthy();
});
it('should call updatePlant and navigate on successful form submission', fakeAsync(() => {
const updatePlantDTO = {
name: 'Test Plant',
type: 'Flower',
status: 'Planted'
};
const mockResponse: Plant = {
_id: '1',
gardenId: 1,
name: 'Test Plant',
type: 'Flower',
status: 'Planted',
datePlanted: '2023-01-01',
dateHarvested: '2023-01-15',
dateCreated: '2023-01-01',
dateModified: '2023-01-15'
};
spyOn(plantService, 'updatePlant').and.returnValue(of(mockResponse));
spyOn(router, 'navigate');
component.plantForm.controls['name'].setValue(updatePlantDTO.name);
component.plantForm.controls['type'].setValue(updatePlantDTO.type);
component.plantForm.controls['status'].setValue(updatePlantDTO.status);
component.onSubmit();
tick();
expect(plantService.updatePlant).toHaveBeenCalledWith('1', updatePlantDTO);
expect(router.navigate).toHaveBeenCalledWith(['/plants']);
}));
it('should handle error on form submission failure', fakeAsync(() => {
spyOn(plantService, 'updatePlant').and.returnValue(throwError('Error updating plant'));
spyOn(console, 'error');
component.plantForm.controls['name'].setValue('Test Plant');
component.plantForm.controls['type'].setValue('Flower');
component.plantForm.controls['status'].setValue('Planted');
component.onSubmit();
tick();
expect(plantService.updatePlant).toHaveBeenCalled();
expect(console.error).toHaveBeenCalledWith('Error updating plant', 'Error updating plant');
}));
*/
