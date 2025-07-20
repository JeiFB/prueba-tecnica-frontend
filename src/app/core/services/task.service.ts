import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from "../../shared/models/tasks";
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private baseUrl = 'http://localhost:8080/tasks';

  constructor(private http: HttpClient) {}

  /** Listar todas las tareas */
  list(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  /** Obtener una tarea por ID */
  get(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${id}`);
  }

  /** Crear nueva tarea */
  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task);
  }

  /** Actualizar una tarea existente */
  update(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${id}`, task);
  }

  /** Eliminar tarea */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
