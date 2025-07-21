import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from '../../../../core/services/task.service';
import { Task } from '../../../../shared/models/tasks';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TASK_STATUSES, TASK_PRIORITIES } from '../../../../shared/constants/task.constants';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  displayedColumns = ['title', 'dueDate', 'status', 'priority', 'user', 'actions'];

  filterForm: FormGroup;
  statuses = TASK_STATUSES;
  priorities = TASK_PRIORITIES;

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      status: [''],
      priority: [''],
      fromDate: [''],
      toDate: ['']
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.tasks$ = this.taskService.list();
  }

  filterTasks() {
    const filters = { ...this.filterForm.value };
    // Formatear fechas a 'yyyy-MM-dd'
    if (filters.fromDate) {
      filters.fromDate = this.formatDate(filters.fromDate);
    }
    if (filters.toDate) {
      filters.toDate = this.formatDate(filters.toDate);
    }
    // Elimina filtros vacíos
    Object.keys(filters).forEach(key => {
      if (!filters[key]) filters[key] = null;
    });
    this.tasks$ = this.taskService.filter(filters);
  }

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }

  getStatusLabel(value: string): string {
    return this.statuses.find(s => s.value === value)?.label || value;
  }

  getPriorityLabel(value: string): string {
    return this.priorities.find(p => p.value === value)?.label || value;
  }

  delete(id: number) {
    if (confirm('¿Eliminar esta tarea?')) {
      this.taskService.delete(id).subscribe(() => this.load());
    }
  }
}