
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';
import { environment } from '../../environments/environment';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        HttpClientTestingModule // Add HttpClientModule to the imports array
      ]
    })
    .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadReports on initialization', () => {
    spyOn(component, 'loadReports');
    component.ngOnInit();
    expect(component.loadReports).toHaveBeenCalled();
  });

  it('should call loadTaskData when loadReports is called', () => {
    spyOn(component, 'loadTaskData');
    component.loadReports();
    expect(component.loadTaskData).toHaveBeenCalled();
  });

 
});
