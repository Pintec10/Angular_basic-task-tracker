import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text: string;
  dayTime: string;
  reminder: boolean;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(
      value => this.showAddTask = value
    );
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text) {
      alert("Please add a description for the task!");
    }

    const newTask = {
      text: this.text,
      day: this.dayTime,
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask);

    this.text = "";
    this.dayTime = "";
    this.reminder = false;
  }

}
