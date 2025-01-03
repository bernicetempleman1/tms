/**
 * Author: Professor Krasso
 * Date: 7 August 2024
 * File: app.js
 * Description: Application setup. Autogenerated using Express generator.
 *
 */

// require statements
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { notFoundHandler, errorHandler } = require("../error-handler");
const mongoose = require("mongoose");

// Importing the index router
const indexRouter = require("../routes/index");
const taskRouter = require("../routes/task");
const projectRouter = require("../routes/project");

// Variable declaration for the express app
let app = express();

// Mongoose connection added by BT 11/26/2024
const connectionString =
  "mongodb+srv://tms_user:s3cret@bellevueuniversity.lftytpq.mongodb.net/?retryWrites=true&w=majority&appName=BellevueUniversity";
const dbName = "tms"; // Database name

// Function to connect to the database
async function connectToDatabase() {
  try {
    await mongoose.connect(connectionString, {
      dbName: dbName,
    });

    console.log(`Connection to the '${dbName}' database was successful`);
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
  }
}
connectToDatabase(); // Call the function to connect to the database

// CORS configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // This allows all origins
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  ); // Allowed request methods
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); // Allowed headers
  next();
});

// Express app configuration
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routing configuration
app.use("/api", indexRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/projects", projectRouter);

//Add a GET route for the root URL (“/”). This route should return an HTML response with a fully designed landing page that represents the “in-n-out-books” project.
app.get("/", async (req, res, next) => {
  // HTML content for the landing page
  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Task Management System</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css2?family=Emblema+One&family=Lora&display=swap"
      rel="stylesheet"
    />
    <style>
      /* CSS Reset */
      body,
      header,
      nav,
      main,
      footer,
      img,
      h1,
      h3,
      ul,
      aside,
      figure,
      figcaption,
      video {
        margin: 0;
        padding: 0;
        border: 0;
      }

      /* Style rules for body and images */
      body {
        background-color: #f6eee4;
      }

      img,
      video {
        max-width: 100%;
        display: block;
      }

      /* Style rules for mobile viewport*/
      .mobile,
      .mobile-tablet {
        display: block;
      }

      /* Style rules to show mobile class and hide tab-desk class */
      .tab-desk,
      .desktop {
        display: block;
      }

      /* Style  rules for header area */
      .mobile h1,
      .mobile h3 {
        padding: 2%;
        text-align: center;
      }

      .mobile h1 {
        font-family: "Emblema One";
      }

      .mobile h3 {
        font-family: "Lora", serif;
      }

      h1,
      h3 {
        padding: 2%;
        text-align: center;
      }

      h1 {
        font-family: "Emblema One";
      }

      h3 {
        font-family: "Lora", serif;
      }

      /* Style rules for navigation area */
      nav {
        background: #2a1f14;
      }

      /* Style rules for main content */
      main {
        padding: 2%;
        font-family: "Lora", serif;
      }

      main p {
        font-size: 1.25em;
      }

      main h3 {
        padding-top: 2%;
      }

      main ul {
        list-style: square;
      }

      .link {
        color: #4d3319;
        text-decoration: none;
        font-weight: bold;
        font-style: italic;
      }
      /* Style rules for footer content */
      footer {
        text-align: center;
        font-size: 0.85em;
        background-color: #2a1f14;
        color: #f6eee4;
        padding: 1% 0%;
      }

      /* Media Query for Tablet Viewport */
      @media screen and (min-width: 620px), print {
        /* Tablet Viewport: Show tab-desk class, hide mobile class */
        .tab-desk {
          display: block;
        }

        .mobile {
          display: none;
        }

        /* Tablet Viewport: Style rules for nav area */

        nav a:hover {
          color: #800080;
          text-decoration: underline;
        }
      }

      /* Media Query for Desktop Viewport */
      @media screen and (min-width: 1000px), print {
        /* Desktop Viewport: Show desktop class, hide mobile-tablet class */

        .desktop {
          display: block;
        }

        .mobile-tablet {
          display: none;
        }
      }

      /* Media  Query for Large Desktop Viewports */
      @media screen and (min-width: 1921px) {
        body {
          background: linear-gradient(#f6eee4, #78593a);
        }

        #wrapper {
          width: 1920px;
          margin: 0 auto;
        }

        main {
          background-color: #f6eee4;
        }
      }

      /* Media Query for Print */
      @media print {
        body {
          background-color: white;
          color: black;
        }
      }

      body,
      h1,
      h2,
      h3 {
        margin: 0;
        padding: 0;
        border: 0;
      }
      body {
        background: #43b3ae;
        color: #000;
        margin: 1.25rem;
        font-size: 1.25rem;
      }
      h1,
      h2,
      h3, h4 {
        color:  #563d7c; /* Bootstrap's purple color */;
        font-family: "Emblema One", cursive;
      }
      h1,
      h2 {
        text-align: center;
      }
      h3 {
        text-align: center;
        color: #ffffff;
      }

      .container {
        width: 50%;
        margin: 0 auto;
        font-family: "Lora", serif;
      }
      .book {
        border: 1px solid #ffff;
        padding: 1rem;
        margin: 1rem 0;
      }
      .book h3 {
        margin-top: 0;
      }
      main a {
        color: #000;
        text-decoration: none;
      }
      main a:hover {
        color: #563d7c;
        text-decoration: underline;
      }

      .navbar {
        overflow: hidden;
        background-color: #333;
      }

      .navbar a {
        float: left;
        font-size: 16px;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
      }

      .subnav {
        float: left;
        overflow: hidden;
        color: white;
      }

      .subnav .subnavbtn {
        font-size: 16px;
        border: none;
        outline: none;
        color: white;
        padding: 14px 16px;
        background-color: inherit;
        font-family: inherit;
        margin: 0;
      }

      .navbar a:hover,
      .subnav:hover .subnavbtn {
        background-color: #563d7c;
        color: white;
      }

      .subnav-content {
        display: none;
        position: absolute;
        left: 0;
        background-color: #563d7c;
        color: white;
        width: 100%;
        z-index: 1;
      }

      .subnav-content a {
        float: left;
        color: black;
        text-decoration: none;
      }

      .subnav-content a:hover {
        background-color: #eee;
        color: black;
      }

      .subnav:hover .subnav-content {
        display: block;
      }
      .container {
        display: grid;
        place-items: center;
      }
    </style>
  </head>
  <body>
    <div id="wrapper">
      <!-- Use the header area for the website name or logo -->
      <header>
        <div class="tab-desk"></div>
        <div>
          <h1>Task Management System</h1>
          <h2>TMS</h2>
        </div>
      </header>

      <!-- Use the nav area to add hyperlinks to other pages within the website-->

      <div class="navbar">
        <a href="">>Home</a>
        <a href="/api/tasks">Tasks</a>
        <a href="/api/tasks">Projects</a>


      </div>

      <!-- Use the main area to add the main content to the webpage -->
      <main>
        <div id="welcome">
          <!-- 1st paragraph element: Use the first paragraph below for a welcome message and mission statement. -->
          <h3 class="landing-page__title">
        Welcome to the Task Management System
      </h3>
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
        <br />
      </main>

      <!-- Use the footer area to add webpage footer content-->
      <footer>
        <p>&copy; Copyright 2024. All Rights Reserved.</p>
      </footer>
    </div>
  </body>
</html>
`; // end HTML content for the landing page
  res.send(html); // Sends the HTML content to the client
});

// Use the error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Export the app
module.exports = app;
