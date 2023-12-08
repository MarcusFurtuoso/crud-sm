import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first, tap } from 'rxjs';
import { LoginForm } from '../model/forms/login.form';
import { RegisterForm } from '../model/forms/register.form';
import { LoginResponse } from '../model/responses/login.response';
import { LocalStorageService } from './local-storage.service';
import { RegisterResponse } from '../model/responses/register.response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'https://reqres.in/api';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(loginForm: LoginForm): Observable<LoginResponse> {
    const url: string = `${this.apiUrl}/login`;

    return this.http
      .post<LoginResponse>(url, loginForm)
      .pipe(
        tap((res) =>
          this.localStorageService.setItemForLocalStorage('token', res.token)
        )
      );
  }

  public register(registerForm: RegisterForm): Observable<RegisterResponse> {
    const url: string = `${this.apiUrl}/register`;

    return this.http
      .post<RegisterResponse>(url, registerForm)
      .pipe(
        tap((res) =>
          this.localStorageService.setItemForLocalStorage('token', res.token)
        )
      );
  }

  public logout(): void {
    localStorage.clear();
  }

  public isLogged(): boolean {
    return !!localStorage.getItem('token');
  }
}
