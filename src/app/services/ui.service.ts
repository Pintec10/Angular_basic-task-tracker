import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddTask: boolean = false;
  private subject = new Subject<any>(); //forwards notifications from a single observable to one or more observers

  constructor() { }

  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);    //forwards the value of showAddTask
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
