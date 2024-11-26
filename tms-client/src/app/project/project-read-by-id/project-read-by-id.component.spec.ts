import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReadByIdComponent } from './project-read-by-id.component';

describe('ProjectReadByIdComponent', () => {
  let component: ProjectReadByIdComponent;
  let fixture: ComponentFixture<ProjectReadByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectReadByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectReadByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
