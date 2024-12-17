import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ChartComponent } from '../../../shared/chart/chart.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableComponent } from '../../../shared/table/table.component';
import { DatePipe } from '@angular/common';

import { TaskService } from '../../../task/task.service';
import { CommonModule } from '@angular/common';
import { Task } from '../../../task/task';

@Component({
  selector: 'app-task-report',
  standalone: true,
  imports: [ReactiveFormsModule, ChartComponent, TableComponent],
  template: `
    <h1>Task Report</h1>
    <div class="task-container">
      <form class="form" [formGroup]="priorityForm" (ngSubmit)="onSubmit()">
        @if (errorMessage) {
        <div class="message message--error">{{ errorMessage }}</div>
        }


        <div class="form__actions">
          <button class="button button--primary" type="submit">Get Task Report</button>
        </div>
      </form>

      @if (totalTasks.length > 0) {
      <div class="card chart-card">
      <app-table
          [title]="'Task Report'"
          [data]="totalTasks"
          [headers]="['Title', 'Description', 'Priority', 'Status', 'Due Date']"
          [recordsPerPage]="5"
          [sortableColumns]="['Title', 'Description', 'Priority', 'Status', 'Due Date']"
          [headerBackground]="'default'">
        </app-table>

      </div>
      }
    </div>
  `,
  styles: `
  .task-container {
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
export class TaskReportComponent {
  totalTasks: any[] = [];
  selectedPriority: string = '';
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
    this.http.get(`${environment.apiBaseUrl}/api/tasks`).subscribe({
      next: (data: any) => {
        if (data.length === 0) {

          console.error('No data found for tasks. ');

          return;
        }
        this.totalTasks = data;
        console.log('this.totalTasks: ', this.totalTasks);
        for(let data of this.totalTasks) { // Set up table
          data['Title'] = data['title'];
          data['Description'] = data['description'];
          data['Priority'] = data['priority'];
          data['Status'] = data['status'];
          data['Due Date'] = new Date (data['dueDate']).toLocaleDateString(); // Format the date
        }
        // Trigger change detection
        this.cdr.markForCheck();
        this.cdr.detectChanges();
        this.errorMessage = ''; // Reset error message

      },
      error: (err) => {
        console.error('Error fetching sales by priority data:', err);
      }
    });
  }
}
