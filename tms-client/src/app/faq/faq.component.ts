import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [],
  template: `
    <div class="faq">
      <h2 class="faq__title">Frequently Asked Questions</h2>
      <p class="faq__description">
        Here are some common questions and answers about the Task Management System:
      </p>

      <div class="faq__cards">
        <div class="card faq__card">
          <div class="card__header faq__card-header">
            What is the purpose of the Task Collection?
          </div>
          <div
            class="card__body faq__card-body</p>
          </div>"
          >
            <p class="faq__card-content">
              The Task Collection stores information about tasks, including
              their title, description, project id, status, priority, due date,
              and timestamps for when the task was created and last updated.
            </p>
          </div>
        </div>

        <div class="card faq__card">
          <div class="card__header faq__card-header">
            What kind of data is stored in the Project Collection?
          </div>
          <div class="card__body faq__card-body">
            <p class="faq__card-content">
              The Project Collection stores data related to projects, including
              the name, description, start date, end date, and timestamps for
              when the task was created and last updated.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .faq {
      padding: 20px;
      font-family: 'Roboto', sans-serif; /* Use global font */
      color: #333; /* Default text color */
    }

    .faq__title {
      color: #20c997; /* Match card header background color */
    }

    .faq__description {
      margin-bottom: 20px;
    }

    .faq__cards {
      display: flex;
      gap: 20px;
      flex-wrap: wrap; /* Ensure cards wrap on smaller screens */
    }

    .faq__card {
      flex: 1 1 calc(50% - 20px); /* Two cards per row with a gap of 20px */
      margin-bottom: 20px;
    }

    .faq__card-header {
      background-color: #20c997; /* Match card header background color */
      color: white;
      padding: 15px;
      font-size: 1.25em;
    }

    .faq__card-body {
      padding: 15px;
    }

    .faq__card-content {
      margin: 10px 0;
    }
  `,
})
export class FaqComponent {}
