import { Injectable } from '@angular/core';
import {
  Observable,
  //of    //for OPTION 2
} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { TASKS } from '../mock-tasks';    //for OPTION 1 & OPTION 2
import { Task } from '../Task';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = "http://localhost:5000/tasks";

  constructor(private http: HttpClient) { }

  //OPTION 1> no need to use an Observable since TASKS is a constant object, not the result of an asynchronous call
  // getTasks(): Task[] {
  //   return TASKS;
  // }  

  //OPTION 2> using TASKS as if it was an observable
  // getTasks(): Observable<Task[]> {
  //   const tasks = of(TASKS);
  //   return tasks;
  // }

  //OPTION 3> using an asynchronous call
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  updateTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }

}
