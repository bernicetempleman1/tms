// Developer: Meher Salim
// File: project-update.component.spec.ts
// Description: Update project details
// Credits:
//    Lean, Mean, and Pragmatic - A Guide to Full-Stack JavaScript Development
//    Bernice Templeman

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ProjectUpdateComponent } from './project-update.component';
import { ProjectService } from '../project.service';
import { Project, UpdateProjectDTO } from '../project';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProjectUpdateComponent', () => {
  let component: ProjectUpdateComponent;
  let fixture: ComponentFixture<ProjectUpdateComponent>;
  let projectService: ProjectService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientModule, RouterTestingModule, ProjectUpdateComponent ],
      providers: [
        ProjectService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } }}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ProjectUpdateComponent);
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
    component.projectForm.controls['name'].setValue('Test Project Name');
    component.projectForm.controls['description'].setValue('Test Description');

    expect(component.projectForm.valid).toBeTrue();
  });

  it('should call updateProject and navigate on successful form submission', fakeAsync(() => {
    const updateProjectDTO: UpdateProjectDTO = {
      name: 'Test Project Name',
      description: 'Test Description'
    };

    const mockProject: Project = {
      _id: '1',
      projectId: 1,
      name: 'Test Project Name',
      description: 'Test Description',
      startDate: '2024-09-11T21:39:36.605Z',
      endDate: '2024-09-04T21:39:36.605Z'
    };

    spyOn(projectService, 'updateProject').and.returnValue(of(mockProject));
    spyOn(router, 'navigate');

    component.projectForm.controls['name'].setValue(updateProjectDTO.name);
    component.projectForm.controls['description'].setValue(updateProjectDTO.description);

    component.onSubmit();
    tick();

    expect(projectService.updateProject).toHaveBeenCalledWith(updateProjectDTO, component.projectId);
    expect(router.navigate).toHaveBeenCalledWith(['/projects']);
  }));

  it('should handle error on form submission failure', fakeAsync(() => {
    spyOn(projectService, 'updateProject').and.returnValue(throwError('Error updating project'));
    spyOn(console, 'error');

    component.projectForm.controls['name'].setValue('Test Project Name');
    component.projectForm.controls['description'].setValue('Test Description');

    component.onSubmit();
    tick();

    expect(projectService.updateProject).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error updating project', 'Error updating project');
  }));

  it('should not call updateProject if the form is invalid', () => {
    spyOn(projectService, 'updateProject');
    
    component.projectForm.controls['name'].setValue('');
    component.projectForm.controls['description'].setValue('');
  
    component.onSubmit();
  
    expect(component.projectForm.invalid).toBeTrue();
    expect(projectService.updateProject).not.toHaveBeenCalled();
  });

  it('should populate form with project data on fetch success', fakeAsync(() => {
    const mockProject: Project = {
      _id: '1',
      projectId: 1,
      name: 'Existing Project',
      description: 'Existing Description',
      startDate: '2024-09-11T21:39:36.605Z',
      endDate: '2024-09-04T21:39:36.605Z',
    };
  
    // Mock projectService.getProject to return mockProject data
    spyOn(projectService, 'getProject').and.returnValue(of(mockProject));
  
    // Recreate the component and trigger initialization
    fixture = TestBed.createComponent(ProjectUpdateComponent);
    component = fixture.componentInstance;
  
    fixture.detectChanges(); // Run ngOnInit and lifecycle hooks
    tick(); // Flush pending async operations like observables
  
    // Trigger change detection to ensure the form updates
    fixture.detectChanges();
  
    // Assert the form controls are populated correctly
    expect(projectService.getProject).toHaveBeenCalledWith(1);
    expect(component.projectForm.controls['name'].value).toBe('Existing Project');
    expect(component.projectForm.controls['description'].value).toBe('Existing Description');
  }));

  it('should mark form invalid for empty fields', () => {
    component.projectForm.controls['name'].setValue('');
    component.projectForm.controls['description'].setValue('');
    expect(component.projectForm.invalid).toBeTrue();
    expect(component.projectForm.controls['name'].errors).toEqual({ required: true });
    expect(component.projectForm.controls['description'].errors).toEqual({ required: true });
  });

  it('should validate name with less than 3 characters as invalid', () => {
    component.projectForm.controls['name'].setValue('AB');
    component.projectForm.controls['description'].setValue('Valid Description');
    
    expect(component.projectForm.invalid).toBeTrue();
    expect(component.projectForm.controls['name'].errors?.['minlength']).toBeTruthy();
  });

  it('should validate description with less than 10 characters as invalid', () => {
    component.projectForm.controls['name'].setValue('Valid Name');
    component.projectForm.controls['description'].setValue('Short');
    
    expect(component.projectForm.invalid).toBeTrue();
    expect(component.projectForm.controls['description'].errors?.['minlength']).toBeTruthy();
  });
});

