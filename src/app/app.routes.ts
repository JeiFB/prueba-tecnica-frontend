// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./features/tasks/tasks.module').then(m => m.TasksModule)
  },
  // ruta por defecto
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // atrapar todo lo demás
  { path: '**', redirectTo: 'login' }
];
