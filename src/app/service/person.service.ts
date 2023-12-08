import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserForm } from '../model/forms/create-user.form';
import { ReqresResponse } from '../model/base/reqres.response';
import { CreateUserResponse } from '../model/responses/create-user.response';
import { Observable, first } from 'rxjs';
import { EditUserform } from '../model/forms/edit-user.form';
import { EditUserResponse } from '../model/responses/edit-user.response';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = 'https://reqres.in/api';

  public createUser(
    user: CreateUserForm
  ): Observable<ReqresResponse<CreateUserResponse>> {
    return this.http
      .post<ReqresResponse<CreateUserResponse>>(`${this.apiUrl}/users`, user)
      .pipe(first());
  }

  public editUser(
    user: EditUserform
  ): Observable<ReqresResponse<EditUserResponse>> {
    return this.http
      .put<ReqresResponse<EditUserResponse>>(
        `${this.apiUrl}/users/${user.id}`,
        user
      )
      .pipe(first());
  }

  public getUserById(id: number): CreateUserResponse | undefined {
    return this.users.find((user) => user.id === id);
  }

  public updateUser(user: CreateUserResponse): Observable<CreateUserResponse> {
    return this.http.put<CreateUserResponse>(
      `${this.apiUrl}/users/${user.id}`,
      user
    );
  }

  public deleteUser(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  getPersonData(): CreateUserResponse[] {
    return [
      {
        id: 1,
        name: 'John',
        job: 'Leader',
        createdAt: new Date('2023-10-07T22:05:44.431Z'),
      },
      {
        id: 2,
        name: 'Marcus',
        job: 'Developer',
        createdAt: new Date('2023-03-07T23:15:38.431Z'),
      },
      {
        id: 3,
        name: 'Julia',
        job: 'Developer',
        createdAt: new Date('2023-11-07T20:30:12.431Z'),
      },
      {
        id: 4,
        name: 'Carlos',
        job: 'Developer',
        createdAt: new Date('2023-07-07T21:12:22.431Z'),
      },
      {
        id: 5,
        name: 'Ilanna',
        job: 'Lawyer',
        createdAt: new Date('2023-04-07T21:15:38.431Z'),
      },
      {
        id: 6,
        name: 'Bruno',
        job: 'DBA',
        createdAt: new Date('2023-04-07T21:15:38.431Z'),
      },
      {
        id: 7,
        name: 'César',
        job: 'Engineer',
        createdAt: new Date('2023-04-07T21:15:38.431Z'),
      },
    ];
  }

  private users: CreateUserResponse[] = this.getPersonData();
}
