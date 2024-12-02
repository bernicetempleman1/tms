/**
 * Author: Bernice Templeman
 * Date: 2 December 2024
 * File: project.ts
 * Description: Project interface
 *
 */
//Reference: Krasso, R. (2024). Lean, MEAN, and Pragmatic: A Guide to Full-Stack JavaScript Development (page 172)


import { ProjectDeleteComponent } from "./project-delete/project-delete.component";

/*
Project
a. _id
b. projectId
c. name
d. description
e. startDate
f. endDate
g. dateCreated
h. dateModified

Business Rules
1. A task belongs to one project
2. A project can have many tasks

Database Constraints
• title in the Tasks collection must be unique
• status in the Tasks collection must be one of the following, “Pending”, “In Progress”, “Completed”.
• priority in the Tasks collection must be one of the following: “Low”, “Medium”, “High”.
• startDate in the Projects collection must be a valid date
• endDate in the Projects collection, if provided, must be a valid date and be after the startDate

Angular Form Business Rules
1. A task must have a title, status, and priority
 2. A project must have a name and a start date
 3. The status of a task can only be one of the following: “Pending”, “In Progress”, “Completed”
 4. The priority of a task can only be one of the following: “Low”, “Medium”, “High”
 5. The startDate of a project must be a valid date
 6. The endDate of a project, if provided, must be a valid date and must be after the startDate

*/
export interface Project {
  _id: string;
  projectId: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  dateCreated?: string;
  dateModified?: string;
}

export type AddProjectDTO = Omit<Project, '_id' | 'description' | 'dateCreated' | 'dateModified'| 'startDate' | 'endDate'>;
export type UpdateProjectDTO = Omit<Project, '_id' | 'dateCreated' | 'dateModified'| 'startDate' | 'endDate'| 'projectId'>;
