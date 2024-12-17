import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReportComponent } from './project-report.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Project } from '../../../project/project';
import { By } from '@angular/platform-browser';
import { throwError } from 'rxjs';

describe('ProjectReportComponent', () => {
  let component: ProjectReportComponent;
  let fixture: ComponentFixture<ProjectReportComponent>;

  beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [ HttpClientTestingModule, RouterTestingModule, ProjectReportComponent ],
        }). compileComponents();

        fixture = TestBed.createComponent(ProjectReportComponent);
        component = fixture.componentInstance;
      });



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
