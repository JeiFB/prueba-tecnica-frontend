import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from '../../../../core/services/task.service';
import { Task } from '../../../../shared/models/tasks';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  displayedColumns = ['title', 'dueDate', 'status', 'priority', 'user', 'actions'];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.tasks$ = this.taskService.list();
  }

  delete(id: number) {
    if (confirm('¿Eliminar esta tarea?')) {
      this.taskService.delete(id).subscribe(() => this.load());
    }
  }
}