//Leah Harris
//Component to delete tasks
//Ref: Lean, Mean and Pragmatic Textbook

import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-task-delete',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `

  <div class="task-page">
    <h1 class="task-page__title">Delete Tasks</h1>

    @if(tasks && tasks.length > 0) {
      <table class="task-page__table">
        <thead class="task-page__head">
          <tr class="task-page__table-row">
            <th class="task-page__header">Title</th>
            <th class="task-page__header">Description</th>
            <th class="task-page__header">Status</th>
            <th class="task-page__header">Priority</th>
            <th class="task-page__header">Due Date</th>
            <th class="task-page__header">Project ID</th>
            <th class="task-page__header">Function</th>
          </tr>
        </thead>

        <tbody class="task-page__table-body">
          <tr *ngFor="let task of tasks" class="task-page__table-row">
            <td class="task-page__cell">{{ task.title }}</td>
            <td class="task-page__cell">{{ task.description }}</td>
            <td class="task-page__cell">{{ task.status }}</td>
            <td class="task-page__cell">{{ task.priority }}</td>
            <td class="task-page__cell">{{ task.dueDate }}</td>
            <td class="task-page__cell">{{ task.projectId }}</td>
            <td class="task-page__cell task-page__cell--functions">
              <a (click)="deleteTask(task._id)" class="task-page__icon-link"><i class="fas fa-trash-alt"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
    } @else {
      <p class="task-page__no-tasks">No tasks found...</p>
    }
  </div>
  `,
  styles: ``
})
export class TaskDeleteComponent {

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
    this.taskService.getTasks().subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        console.log(`Tasks: ${JSON.stringify(this.tasks)}`);
      },
      error: (err: any) => {
        console.error(`Error occurred while retrieving tasks: ${err}`);
        this.tasks = [];
      }
    });
  }

  deleteTask(taskId: string) {
    if(!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        console.log(`Task with ID ${taskId} was deleted successfully`);
        this.tasks = this.tasks.filter((g) => g._id !== taskId);
      },
      error: (err: any) => {
        console.error(`Error occurred while deleting task with ID ${taskId}: ${err}`);
      }
    });
  }
}
