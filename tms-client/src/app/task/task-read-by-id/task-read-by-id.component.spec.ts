import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskReadByIdComponent } from './task-read-by-id.component';

describe('TaskReadByIdComponent', () => {
  let component: TaskReadByIdComponent;
  let fixture: ComponentFixture<TaskReadByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskReadByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskReadByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
