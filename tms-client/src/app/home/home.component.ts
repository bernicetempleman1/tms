import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <div class="landing-page">
      <h1 class="landing-page__title">
        Welcome to the Task Management System
      </h1>
      <p class="landing-page__paragraph">
        This application is designed to help you manage your projects
        efficiently. You can add, update, delete, and view details of your
        projects with ease.
      </p>
      <p class="landing-page__paragraph">
        The Task Management System is built using the MEAN stack, which
        includes MongoDB, Express.js, Angular, and Node.js. This stack provides
        a robust and scalable solution for building modern web applications.
      </p>
      <p class="landing-page__paragraph">
        In this demonstration, you will learn how to perform CRUD (Create, Read,
        Update, Delete) operations on project and task data. This is a fundamental skill
        for any web developer, and mastering it will give you a strong
        foundation in full-stack development.
      </p>
      <p class="landing-page__paragraph">
        Follow along with the examples and exercises in this course to gain
        hands-on experience with the MEAN stack. By the end of this course, you
        will have a fully functional Task Management System that you can
        use as a reference for your own projects.
      </p>
    </div>
  `,
  styles: [
    `
      .landing-page {
        max-width: 80%;
        margin: 0 auto;
        padding: 20px;
      }
      .landing-page__title {
        color: #563d7c; /* Bootstrap's purple color */
      }
      .landing-page__paragraph {
        font-size: 1.2em;
        line-height: 1.5;
        margin-bottom: 20px;
      }
    `,
  ],
})
export class HomeComponent {}
