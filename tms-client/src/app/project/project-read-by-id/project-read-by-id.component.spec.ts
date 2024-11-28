import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ProjectReadByIdComponent } from './project-read-by-id.component';
import { ProjectService } from '../project.service';
import { Project, UpdateProjectDTO } from '../project';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProjectReadByIdComponent', () => {
  let component: ProjectReadByIdComponent;
  let fixture: ComponentFixture<ProjectReadByIdComponent>;
  let projectService: ProjectService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        ProjectReadByIdComponent,
      ],
      providers: [
        ProjectService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ProjectReadByIdComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled correctly', () => {
    component.projectForm.controls['name'].setValue('Test Garden');
    component.projectForm.controls['description'].setValue('Test Description');
    expect(component.projectForm.valid).toBeTrue();
  });

  it('should call updateProjecy and navigate on successful form submission', fakeAsync(() => {
    const updateProjectDTO: UpdateProjectDTO = {
      name: 'Test Garden',
      description: 'Test Description',
    };
    const mockProject: Project = {
      _id: '1',
      projectId: 1,
      name: 'Test Garden',
      description: 'Test Description',
      dateCreated: '2024-09-04T21:39:36.605Z',
    };
    spyOn(projectService, 'updateProject').and.returnValue(of(mockProject));
    spyOn(router, 'navigate');
    component.projectForm.controls['name'].setValue(updateProjectDTO.name);
    component.projectForm.controls['description'].setValue(
      updateProjectDTO.description
    );
    component.onSubmit();
    tick();
    expect(projectService.updateProject).toHaveBeenCalledWith(
      updateProjectDTO,
      component.projectId
    );
    expect(router.navigate).toHaveBeenCalledWith(['/projects']);
  }));

  it('should handle error on form submission failure', fakeAsync(() => {
    spyOn(projectService, 'updateProject').and.returnValue(
      throwError('Error updating project')
    );
    spyOn(console, 'error');
    component.projectForm.controls['name'].setValue('Test Garden');
    component.projectForm.controls['description'].setValue('Test Description');
    component.onSubmit();
    tick();
    expect(projectService.updateProject).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'Error updating project',
      'Error updating project'
    );
  }));
});
