import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ChartComponent } from '../../../shared/chart/chart.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableComponent } from '../../../shared/table/table.component';

import { ProjectService } from '../../../project/project.service';
import { CommonModule } from '@angular/common';
import { Project } from '../../../project/project';

@Component({
  selector: 'app-project-report',
  standalone: true,
  imports: [ReactiveFormsModule, ChartComponent, TableComponent],
  template: `
    <h1>Project Report</h1>
    <div class="project-container">
      <form class="form" [formGroup]="priorityForm" (ngSubmit)="onSubmit()">
        @if (errorMessage) {
        <div class="message message--error">{{ errorMessage }}</div>
        }


        <div class="form__actions">
          <button class="button button--primary" type="submit">Get Project Report</button>
        </div>
      </form>

      @if (totalProjects.length > 0) {
      <div class="card chart-card">
      <app-table
          [title]="'Project Report'"
          [data]="totalProjects"
          [headers]="['Name', 'Description', 'Project Id', 'Start Date', 'End Date']"
          [recordsPerPage]="5"
          [sortableColumns]="['Name', 'Description', 'Project Id', 'Start Date', 'End Date']"
          [headerBackground]="'default'">
        </app-table>

      </div>
      }
    </div>
  `,
  styles: `
  .project-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .form, .chart-card {
      width: 50%;
      margin: 20px 0;
      padding: 10px;
      align-items: center;
    }

    app-table {
      padding: 50px;
    }
  `,
})
export class ProjectReportComponent {
  totalProjects: any[] = [];
  errorMessage: string;

  priorityForm = this.fb.group({
    priority: [null, Validators.compose([Validators.required])],
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {

    this.errorMessage = '';
  }

  onSubmit() {

    this.http.get(`${environment.apiBaseUrl}/api/projects`).subscribe({
      next: (data: any) => {
        if (data.length === 0) {
          console.error('No data found for projects');
          return;
        }

        this.totalProjects = data;
        console.log('this.totalProjects: ', this.totalProjects);
        for(let data of this.totalProjects) { // Set up table
          data['Name'] = data['name'];
          data['Description'] = data['description'];
          data['Project Id'] = data['projectId'];
          data['Start Date'] = new Date (data['startDate']).toLocaleDateString(); // Format the date
          data['End Date'] = new Date (data['endDate']).toLocaleDateString(); // Format the date

        }

        // Trigger change detection
        this.cdr.markForCheck();
        this.cdr.detectChanges();
        this.errorMessage = ''; // Reset error message

      },
      error: (err) => {
        console.error('Error fetching sales by project data:', err);
      }
    });
  }
}
