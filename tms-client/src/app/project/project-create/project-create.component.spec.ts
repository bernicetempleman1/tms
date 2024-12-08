/**
 * Author: Bernice Templeman
 * Date: 9 December 2024
 * File: project-create.component.spec.ts
 * Description: Tests for Create a project
 *
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCreateComponent } from './project-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ProjectService } from '../project.service';
import { AddProjectDTO, Project } from '../project';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProjectCreateComponent', () => {

  let component: ProjectCreateComponent;
  let fixture: ComponentFixture<ProjectCreateComponent>;
  let projectService: ProjectService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        ProjectCreateComponent,
      ],
      providers: [
        ProjectService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCreateComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  //should display title
  it('should display title "Add New task"', () => {
    //Assign DOM to variable
    const compiled = fixture.nativeElement;
    //Select HTML element
    const title = compiled.querySelector('h1');

    //Check text content of h1 element
    expect(title).toBeTruthy();
    expect(title.textContent).toContain('Add New Project');
  });

  it('should have a valid form when all fields are filled correctly', () => {
    component.projectForm.controls['name'].setValue('Test Project');
    component.projectForm.controls['description'].setValue('Test Description');
    component.projectForm.controls['startDate'].setValue(
      '2024-09-04T21:39:36.605Z'
    );
    component.projectForm.controls['endDate'].setValue(
      '2024-12-04T21:39:36.605Z'
    );
    expect(component.projectForm.valid).toBeTrue();
  });

  //should handle errors on form submission failure
  it('should handle error on form submission failure', () => {
    spyOn(projectService, 'addProject').and.returnValue(
      throwError('Error creating project')
    );
    spyOn(console, 'error');
    component.projectForm.controls['name'].setValue('Test Task');
    component.projectForm.controls['description'].setValue('Description');
    component.projectForm.controls['startDate'].setValue('2023-04-15T00:00:00.000Z');
    component.projectForm.controls['endDate'].setValue('2023-04-15T00:00:00.000Z');
    component.onSubmit();
    expect(projectService.addProject).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'Error creating project',
      'Error creating project'
    );
  });


  it('should call addProject and navigate on successful form submission', () => {
    const addProjectDTO: AddProjectDTO = {
      name: 'Test Project',
      description: 'Test Description',
      startDate: '2024-09-04T21:39:36.605Z',
      endDate: '2024-09-05T21:39:36.605Z',
    };

    const mockProject: Project = {
      _id: '1',
      projectId: 1,
      name: 'Test Project',
      description: 'Test Description',
      startDate: '2024-09-04T21:39:36.605Z',
      endDate: '2024-09-05T21:39:36.605Z',
    };
    spyOn(projectService, 'addProject').and.returnValue(of(mockProject));
    spyOn(router, 'navigate');
    component.projectForm.controls['name'].setValue(addProjectDTO.name);
    component.projectForm.controls['description'].setValue(
      addProjectDTO.description
    );
    component.projectForm.controls['startDate'].setValue(
      addProjectDTO.startDate
    );
    component.projectForm.controls['endDate'].setValue(
      addProjectDTO.endDate
    );
    component.onSubmit();
    expect(projectService.addProject).toHaveBeenCalledWith(addProjectDTO);
    expect(router.navigate).toHaveBeenCalledWith(['/projects']);
  });

  it('should handle error on form submission failure', () => {
    spyOn(projectService, 'addProject').and.returnValue(
      throwError('Error creating project')
    );
    spyOn(console, 'error');
    component.projectForm.controls['name'].setValue('Test Project');
    component.projectForm.controls['description'].setValue('Test Description');
    component.projectForm.controls['startDate'].setValue(
      '2024-09-04T21:39:36.605Z'
    );
    component.projectForm.controls['endDate'].setValue(
      '2024-12-04T21:39:36.605Z'
    );
    component.onSubmit();
    expect(projectService.addProject).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      'Error creating project',
      'Error creating project'
    );
  });

});
