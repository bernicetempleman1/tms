// Developer: Meher Salim
// File: project-create.component.spec.ts
// Description: Update project details
// Credits:
//    Lean, Mean, and Pragmatic - A Guide to Full-Stack JavaScript Development
//    Bernice Templeman

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ProjectCreateComponent } from './project-create.component';
import { ProjectService } from '../project.service';
import { AddProjectDTO, Project } from '../project';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('ProjectCreateComponent', () => {
  let component: ProjectCreateComponent;
  let fixture: ComponentFixture<ProjectCreateComponent>;
  let projectService: ProjectService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    // Set up testing module with necessary imports and providers.
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientModule, RouterTestingModule, ProjectCreateComponent ],
      providers: [ ProjectService, // Mock ProjectService for dependency injection
        { 
          provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' }}} // Mock ActivatedRoute with a fixed project ID 
        },
      ]
    }).compileComponents();

    // Initialize component and inject dependencies
    fixture = TestBed.createComponent(ProjectCreateComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  // Verify component was created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Simulate form input and verify form validity
  it('should have a valid form when all fields are filled correctly', () => {
    // Set values for form controls and verify form validity
    component.projectForm.controls['name'].setValue('Test Project Name');
    component.projectForm.controls['description'].setValue('Test Project Description');
    component.projectForm.controls['startDate'].setValue('2024-09-04T21:39:36.605Z');
    component.projectForm.controls['endDate'].setValue('2024-12-04T21:39:36.605Z');
    expect(component.projectForm.valid).toBeTrue();
  })

  // Simulate valid form submission
  it('should call addProject and navigate on successful form submission', () => {
    // Mock data for AddProjectDTO
    const addProjectDTO: AddProjectDTO = {
      name: 'Test Project',
      description: 'Test Description',
      startDate: '2024-09-04T21:39:36.605Z',
      endDate: '2024-12-04T21:39:36.605Z'
    };

    // Mock expected response
    const mockProject: Project = {
      _id: '1',
      projectId: 1,
      name: 'Test Project',
      description: 'Test Description',
      startDate: '2024-09-04T21:39:36.605Z',
      endDate: '2024-12-04T21:39:36.605Z',
      dateCreated: '2023-04-15T00:00:00.000Z',
      dateModified: undefined,
    };

    // Spy on addProject method and return mock data
    spyOn(projectService, 'addProject').and.returnValue(of(mockProject));
    // Spy on router navigation
    spyOn(router, 'navigate');

    // Set form values
    component.projectForm.controls['name'].setValue(addProjectDTO.name);
    component.projectForm.controls['description'].setValue(addProjectDTO.description);
    component.projectForm.controls['startDate'].setValue(addProjectDTO.startDate);
    component.projectForm.controls['endDate'].setValue(addProjectDTO.endDate);

    // Submit form
    component.onSubmit();

    // Verify addProject method was called with correct DTO
    expect(projectService.addProject).toHaveBeenCalledWith(addProjectDTO);
    // Verify that naviate method was called with correct route
    expect(router.navigate).toHaveBeenCalledWith(['/projects']);
  });

  // Simulate invalid form submission
  it('should handle error on form submission failure', () => {
    // Set up spy for addProject method to throw error
    spyOn(projectService, 'addProject').and.returnValue(throwError('Error creating project'));
    spyOn(console, 'error');

    // Set form values
    component.projectForm.controls['name'].setValue('Test Project Name');
    component.projectForm.controls['description'].setValue('Test Project Description');
    component.projectForm.controls['startDate'].setValue('2024-09-04T21:39:36.605Z');
    component.projectForm.controls['endDate'].setValue('2024-12-04T21:39:36.605Z');

    // Submit form
    component.onSubmit();

    // Verify addProject method was called
    expect(projectService.addProject).toHaveBeenCalled();
    // Verify console.error was called with correct error message
    expect(console.error).toHaveBeenCalledWith('Error creating project', 'Error creating project');
  });

  // Verify component template renders title correctly
  it('should display title "Add New task"', () => {
    //Assign DOM to variable
    const compiled = fixture.nativeElement;
    //Select HTML element
    const title = compiled.querySelector('h1');

    //Check text content of h1 element
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Add New Project');
  });

  // Verify component template renders Project Name tooltip correctly
  it('should display the correct tooltip for the Project Name input', () => {
    // Get Project Name input element
    const nameInput = fixture.debugElement.query(By.css('#name'));

    // Verify tooltip text
    expect(nameInput.attributes['title']).toBe('Must be at least 3 characters.');
  });

  // Verify component template renders Project Description tooltip correctly
  it('should display the correct tooltip for the Project Description textarea', () => {
    // Get Project Description textarea element
    const descriptionTextarea = fixture.debugElement.query(By.css('#description'));

    // Verify tooltip text
    expect(descriptionTextarea.nativeElement.getAttribute('title')).toBe('Must be at least 10 characters.');
  });
});
