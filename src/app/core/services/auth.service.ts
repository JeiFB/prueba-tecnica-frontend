import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUrl = 'http://localhost:8080/auth';
  private userUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ access_token: string; refresh_token: string }>(
      `${this.authUrl}/login`,
      credentials
    ).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
      })
    );
  }

  register(data: any) { // Se puede crear un DTO para el registro
    return this.http.post(`${this.userUrl}/`, data);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
}
