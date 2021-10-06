import { Component, OnInit } from '@angular/core';
import { Task } from '../../Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

    //OPTION 1> version w/o Observable (if returning TASKS, which is a constant object)
    // this.tasks = this.taskService.getTasks();

    //OPTION 2, OPTION 3> versions with Observable
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => {
          //console.log("deleted");
          this.tasks = this.tasks.filter(t => t.id !== task.id);
        }
      )
  }

}
