import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ChartComponent } from '../shared/chart/chart.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartComponent, DatePipe],
  template: `
    <h2>Dashboard</h2>
    <div class="dashboard">
      <div class="dashboard__table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            @for (data of taskData; track data) {
            <tr>
              <td>{{ data.title }}</td>
              <td>{{ data.priority }}</td>
              <td>{{ data.status }}</td>
            </tr>
            }
          </tbody>
        </table>
      </div>

      <div class="dashboard__table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            @for (data of projectData; track data) {
            <tr>
              <td>{{ data.name }}</td>
              <td>{{ data.startDate }}</td>
              <td>{{ data.endDate | date : 'short' }}</td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: `
  .dashboard {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .charts-container {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }

  .card {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(50% - 10px);
    height: 300px;
    padding: 10px;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .card app-chart {
    width: 100%;
    height: 100%;
  }

  .dashboard__table-container {
    width: 100%;
  }

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #000;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    animation: spin 1s linear infinite;
    margin: auto;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  `,
})
export class DashboardComponent implements OnInit {
  tableData: any[] = [];
  projectData: any[] = [];
  taskData: any[] = [];

  reportCounts: number[] = [];
  reportTypes: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.loadTaskData();
    this.loadProjectData();
  }

  loadTaskData() {
    this.http.get(`${environment.apiBaseUrl}/api/tasks`).subscribe({
      next: (data: any) => {
        console.log(data);
        this.taskData = data;
      },
    });
  }

  loadProjectData() {
    this.http.get(`${environment.apiBaseUrl}/api/projects`).subscribe({
      next: (data: any) => {
        console.log(data);
        this.projectData = data;
      },
    });
  }
}

