import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../../core/services/task.service';
import { Task } from '../../../../shared/models/tasks';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  taskId!: number;

  statuses = ['TO_DO','IN_PROGRESS','DONE'];
  priorities = ['LOW','MEDIUM','HIGH'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    // 1. Inicializar formulario
    this.form = this.fb.group({
      title:       ['', [Validators.required]],
      description: [''],
      dueDate:     [null, [Validators.required]],
      status:      ['', [Validators.required]],
      priority:    ['', [Validators.required]]
    });

    // 2. Detectar si viene id para editar
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.taskId = +id;
        this.taskService.get(this.taskId).subscribe((task: Task) => {
          this.form.patchValue({
            title:       task.title,
            description: task.description,
            dueDate:     new Date(task.dueDate),
            status:      task.status,
            priority:    task.priority
          });
        });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const payload: Task = {
      ...this.form.value,
      dueDate: this.form.value.dueDate.toISOString().substring(0,10)
    };

    const obs = this.isEdit
      ? this.taskService.update(this.taskId, payload)
      : this.taskService.create(payload);

    obs.subscribe(() => this.router.navigate(['/tasks']));
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
